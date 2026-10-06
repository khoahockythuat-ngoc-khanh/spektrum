'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { Card, CoreCardCategory, Topic } from '../types';

type DrawCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: Card) => void;
  topic?: Topic | null;
  question?: string;
};

type SuggestedPictogram = {
  id: number;
  labelVi: string;
  labelEn: string;
  category: CoreCardCategory;
  emoji: string;
  imageUrl: string;
};

const PALETTE = [
  { name: 'Đen', color: '#1a1a1a' },
  { name: 'Đỏ', color: '#e53e3e' },
  { name: 'Xanh dương', color: '#3182ce' },
  { name: 'Xanh lá', color: '#38a169' },
  { name: 'Cam', color: '#dd6b20' },
  { name: 'Tím', color: '#805ad5' },
];

const BRUSH_SIZES = [
  { label: 'Nhỏ', size: 5 },
  { label: 'Vừa', size: 10 },
  { label: 'To', size: 18 },
];

export function DrawCardModal({ isOpen, onClose, onSelectCard, topic, question }: DrawCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1a1a1a');
  const [brushSize, setBrushSize] = useState(10);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestedPictogram[]>([]);

  // Initialize Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHasDrawn(false);
    setError(null);
    setSuggestions([]);
  }, [isOpen]);

  if (!isOpen) return null;

  function saveHistoryState() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-9), current]);
  }

  function handleUndo() {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevHistory = [...history];
    const lastState = prevHistory.pop();
    setHistory(prevHistory);

    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
    }
    if (prevHistory.length === 0) {
      setHasDrawn(false);
    }
  }

  function handleClear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveHistoryState();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setError(null);
  }

  function getCanvasCoords(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function startDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    saveHistoryState();
    setIsDrawing(true);
    setHasDrawn(true);
    setError(null);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function draw(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}
    setIsDrawing(false);
  }

  async function handleRecognize() {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    setLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const res = await fetch('/api/ai/recognize-sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataUrl,
          topicTitle: topic?.title || '',
          question: question || '',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Nhận diện hình ảnh thất bại.');
      }

      const data = (await res.json()) as { suggestions: SuggestedPictogram[] };
      if (!data.suggestions || data.suggestions.length === 0) {
        throw new Error('AI chưa nhận diện được hình vẽ. Bé thử vẽ thêm nét rõ hơn nhé!');
      }

      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi khi nhận diện hình vẽ.');
    } finally {
      setLoading(false);
    }
  }

  function handleChooseCard(item: SuggestedPictogram) {
    const newCard: Card = [item.emoji, item.labelVi, item.category, item.imageUrl];
    onSelectCard(newCard);
    onClose();
  }

  return (
    <div className="spektrum-draw-overlay" role="dialog" aria-modal="true" aria-label="Bảng vẽ thẻ AAC">
      <div className="spektrum-draw-modal">
        <header className="spektrum-draw-header">
          <div className="spektrum-draw-title">
            <span className="draw-title-icon" aria-hidden="true">🎨</span>
            <div>
              <h3>Bé vẽ điều muốn nói</h3>
              <p>Dùng ngón tay hoặc bút vẽ lên bảng, AI sẽ tạo thẻ cho bé nhé!</p>
            </div>
          </div>
          <button className="spektrum-draw-close-btn" onClick={onClose} type="button" aria-label="Đóng">
            ✕
          </button>
        </header>

        {/* Content area: Drawing canvas OR Suggestions result */}
        {suggestions.length > 0 ? (
          <div className="spektrum-draw-result-view">
            <div className="draw-result-badge">✨ AI tìm thấy các thẻ phù hợp:</div>
            <div className="draw-suggestions-grid">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  className={`draw-suggested-card ${item.category}`}
                  onClick={() => handleChooseCard(item)}
                  type="button"
                >
                  <div className="suggested-card-image-wrap">
                    <img
                      src={item.imageUrl}
                      alt={item.labelVi}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback instanceof HTMLElement) fallback.style.display = 'flex';
                      }}
                    />
                    <span className="suggested-fallback-emoji" style={{ display: 'none' }}>
                      {item.emoji}
                    </span>
                  </div>
                  <strong>{item.labelVi}</strong>
                  <span className="suggested-card-action">Chọn thẻ này ✓</span>
                </button>
              ))}
            </div>
            <div className="draw-result-actions">
              <button className="draw-btn secondary" onClick={() => setSuggestions([])} type="button">
                ↺ Vẽ lại
              </button>
            </div>
          </div>
        ) : (
          <div className="spektrum-draw-canvas-view">
            <div className="spektrum-canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="spektrum-touch-canvas"
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerCancel={stopDrawing}
              />

              {loading && (
                <div className="spektrum-draw-loading-overlay">
                  <div className="spektrum-draw-spinner" />
                  <p>AI đang xem bức vẽ của bé...</p>
                  <small>Đang tìm thẻ ARASAAC phù hợp</small>
                </div>
              )}
            </div>

            {error && (
              <div className="spektrum-draw-error" role="alert">
                ⚠️ {error}
              </div>
            )}

            {/* Drawing Toolbar */}
            <div className="spektrum-draw-toolbar">
              {/* Palette */}
              <div className="spektrum-tool-group palette">
                {PALETTE.map((p) => (
                  <button
                    key={p.color}
                    type="button"
                    className={`palette-color-dot ${!isEraser && color === p.color ? 'active' : ''}`}
                    style={{ backgroundColor: p.color }}
                    onClick={() => {
                      setColor(p.color);
                      setIsEraser(false);
                    }}
                    aria-label={`Màu ${p.name}`}
                  />
                ))}
                <button
                  type="button"
                  className={`eraser-btn ${isEraser ? 'active' : ''}`}
                  onClick={() => setIsEraser(true)}
                  aria-label="Tẩy xoá"
                >
                  🧹 Tẩy
                </button>
              </div>

              {/* Brush sizes */}
              <div className="spektrum-tool-group sizes">
                {BRUSH_SIZES.map((b) => (
                  <button
                    key={b.size}
                    type="button"
                    className={`brush-size-btn ${brushSize === b.size ? 'active' : ''}`}
                    onClick={() => setBrushSize(b.size)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Undo and Clear */}
              <div className="spektrum-tool-group actions">
                <button
                  type="button"
                  className="canvas-action-btn"
                  onClick={handleUndo}
                  disabled={history.length === 0}
                  aria-label="Hoàn tác nét vẽ"
                >
                  ↩ Hoàn tác
                </button>
                <button
                  type="button"
                  className="canvas-action-btn danger"
                  onClick={handleClear}
                  disabled={!hasDrawn}
                  aria-label="Xoá toàn bộ bảng vẽ"
                >
                  🗑 Xoá hết
                </button>
              </div>
            </div>

            {/* Footer Buttons */}
            <footer className="spektrum-draw-footer">
              <button className="draw-btn secondary" onClick={onClose} type="button">
                Hủy bỏ
              </button>
              <button
                className="draw-btn primary"
                disabled={!hasDrawn || loading}
                onClick={handleRecognize}
                type="button"
              >
                ✨ Nhận diện thẻ
              </button>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
