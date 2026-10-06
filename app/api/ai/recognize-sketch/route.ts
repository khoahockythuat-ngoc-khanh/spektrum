import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import type { CoreCardCategory } from '../../../../src/features/conversation/types';

export const runtime = 'nodejs';

type RecognizeRequest = {
  image?: string;
  topicTitle?: string;
  question?: string;
};

type GeminiSketchAnalysis = {
  labelVi: string;
  labelEn: string;
  category: CoreCardCategory;
  emoji: string;
  searchKeywords?: string[];
};

type ArasaacSearchResult = {
  _id?: number;
  id?: number;
  keywords?: Array<{ keyword: string; type?: number }>;
};

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';
const VISION_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

function readLocalEnv(name: string): string {
  if (process.env[name]) return process.env[name] || '';

  const envPath = path.join(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return '';

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  const prefix = `${name}=`;
  const line = lines.find((item) => item.trim().startsWith(prefix));
  if (!line) return '';

  return line
    .trim()
    .slice(prefix.length)
    .trim()
    .replace(/^['"]|['"]$/g, '');
}

async function searchArasaac(keyword: string): Promise<ArasaacSearchResult[]> {
  const url = `https://api.arasaac.org/v1/pictograms/en/search/${encodeURIComponent(keyword.trim().toLowerCase())}`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as ArasaacSearchResult[]) : [];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RecognizeRequest;
    const { image, topicTitle = '', question = '' } = body;

    if (!image || typeof image !== 'string') {
      return NextResponse.json({ error: 'Thiếu dữ liệu hình ảnh.' }, { status: 400 });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const apiKey = readLocalEnv('GEMINI_API_KEY');

    if (!apiKey) {
      return NextResponse.json({ error: 'Chưa cấu hình GEMINI_API_KEY.' }, { status: 500 });
    }

    const configuredModel = readLocalEnv('GEMINI_MODEL') || 'gemini-2.5-flash';
    const modelsToTry = [configuredModel, ...VISION_MODELS.filter((m) => m !== configuredModel)];

    let analysis: GeminiSketchAnalysis | null = null;
    let lastError = '';

    for (const model of modelsToTry) {
      try {
        const response = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{
                text: [
                  'Bạn là chuyên gia AI nhận diện nét vẽ phác thảo (sketch/doodle) của trẻ em chậm nói / tự kỷ trong ứng dụng giao tiếp AAC (Augmentative and Alternative Communication).',
                  'Nhiệm vụ của bạn là quan sát hình vẽ đơn giản của trẻ, kết hợp với ngữ cảnh trò chuyện hiện tại, để suy đoán trẻ đang muốn biểu đạt điều gì.',
                  'Hãy chọn từ ngữ đơn giản, gần gũi với trẻ em Việt Nam.',
                  'Bắt buộc trả về duy nhất một JSON object hợp lệ theo schema yêu cầu.',
                ].join(' '),
              }],
            },
            contents: [{
              parts: [
                {
                  inlineData: {
                    mimeType: 'image/png',
                    data: base64Data,
                  },
                },
                {
                  text: [
                    `Ngữ cảnh hiện tại: Chủ đề = "${topicTitle}", Câu hỏi = "${question}".`,
                    'Hãy nhận diện hình vẽ và trả về JSON có cấu trúc:',
                    '{',
                    '  "labelVi": "Tên tiếng Việt ngắn gọn (1-3 từ, ví dụ: Quả táo, Con chó, Đi chơi, Vui)",',
                    '  "labelEn": "Tên tiếng Anh đơn giản (1-2 từ để tìm trong kho ARASAAC, ví dụ: apple, dog, play, happy)",',
                    '  "category": "topic" | "action" | "emotion",',
                    '  "emoji": "1 emoji tương ứng",',
                    '  "searchKeywords": ["từ khoá tiếng Anh 1", "từ khoá tiếng Anh 2"]',
                    '}',
                  ].join('\n'),
                },
              ],
            }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (response.ok) {
          const result = (await response.json()) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            analysis = JSON.parse(text) as GeminiSketchAnalysis;
            break;
          }
        } else {
          const errBody = await response.text();
          lastError = `${model}: ${errBody}`;
        }
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
      }
    }

    if (!analysis) {
      return NextResponse.json({
        error: `Không thể kết nối Gemini Vision (${lastError || 'Lỗi nhận diện'}).`,
      }, { status: 502 });
    }

    // Now query ARASAAC API using labelEn and searchKeywords
    const candidateKeywords = [
      analysis.labelEn,
      ...(analysis.searchKeywords || []),
    ].filter(Boolean);

    const foundIds = new Set<number>();
    const suggestions: Array<{
      id: number;
      labelVi: string;
      labelEn: string;
      category: CoreCardCategory;
      emoji: string;
      imageUrl: string;
    }> = [];

    for (const kw of candidateKeywords) {
      if (suggestions.length >= 3) break;
      const list = await searchArasaac(kw);
      for (const item of list) {
        const id = item._id ?? item.id;
        if (id && !foundIds.has(id)) {
          foundIds.add(id);
          const kwText = item.keywords?.[0]?.keyword || kw;
          suggestions.push({
            id,
            labelVi: suggestions.length === 0 ? analysis.labelVi : `${analysis.labelVi} (${kwText})`,
            labelEn: kwText,
            category: analysis.category || 'topic',
            emoji: analysis.emoji || '✨',
            imageUrl: `https://static.arasaac.org/pictograms/${id}/${id}_500.png`,
          });
          if (suggestions.length >= 3) break;
        }
      }
    }

    // If ARASAAC didn't find anything for specific keywords, fallback to general search or return the main prediction
    if (suggestions.length === 0) {
      suggestions.push({
        id: Date.now(),
        labelVi: analysis.labelVi,
        labelEn: analysis.labelEn,
        category: analysis.category || 'topic',
        emoji: analysis.emoji || '✨',
        imageUrl: '', // fallback to emoji
      });
    }

    return NextResponse.json({
      success: true,
      analysis,
      suggestions,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Lỗi xử lý server.',
    }, { status: 500 });
  }
}
