import type { SyntheticEvent } from 'react';

import { PARENT_QUESTION_LIMIT } from '../data/constants';
import { TOPICS } from '../data/topics';
import { pictogramPath } from '../logic/pictograms';
import type { HistoryItem, Topic } from '../types';

type HomeScreenProps = {
  onSelect: (topic: Topic) => void;
  onHistory: () => void;
  histories: readonly HistoryItem[];
};

const STICKER_LABELS = ['Vui', 'Rất thích', 'Tô màu', 'Cần giúp'] as const;

export function HomeScreen({ onSelect, onHistory, histories }: HomeScreenProps) {
  return (
    <main className="screen home-screen polished-home">
      <header className="polished-home-topbar">
        <img className="polished-home-logo" src="/brand/spektrum-primary-logo.png" alt="Spektrum" />
        <div className="polished-home-profile">
          <button className="history-pill polished-history-pill" onClick={onHistory} type="button">
            <span aria-hidden="true">✦</span>
            <strong>{histories.length ? `${histories.length} cuộc trò chuyện` : 'Bắt đầu hôm nay'}</strong>
          </button>
          <div className="polished-profile-name">
            <span className="polished-profile-avatar" aria-hidden="true">👦🏻</span>
            <strong>Bảo An</strong>
          </div>
        </div>
      </header>

      <section className="polished-hero">
        <div>
          <h1>Chào mừng con đến với Spektrum!</h1>
          <p>Hôm nay con muốn học và trò chuyện về chủ đề gì nào? Hãy chọn một thẻ bên dưới nhé!</p>
        </div>
        <div className="polished-hero-actions">
          <button className="spektrum-footer-button neutral" type="button" aria-label="Thêm chủ đề">
            <span aria-hidden="true">↻</span>
            <strong>Thêm chủ đề</strong>
          </button>
          <button className="polished-streak" onClick={onHistory} type="button" aria-label="Xem lịch sử trò chuyện">
            <span aria-hidden="true">✦</span>
            <strong>Chuỗi 5 ngày</strong>
          </button>
        </div>
      </section>

      <section className="topic-list polished-topic-list" aria-label="Chọn chủ đề trò chuyện">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            className="topic-card polished-topic-card"
            data-topic={topic.id}
            onClick={() => onSelect(topic)}
            aria-label={`${topic.title}: ${topic.subtitle}`}
          >
            <span className="polished-topic-icon">
              <img
                src={pictogramPath(topic.homePictogram)}
                alt=""
                aria-hidden="true"
                onError={(event: SyntheticEvent<HTMLImageElement>) => {
                  event.currentTarget.hidden = true;
                  const fallback = event.currentTarget.nextElementSibling;
                  if (fallback instanceof HTMLElement) fallback.hidden = false;
                }}
              />
              <span className="topic-emoji-fallback" hidden aria-hidden="true">{topic.icon}</span>
            </span>
            <span className="topic-count polished-topic-count">
              <span aria-hidden="true">☆</span>
              {PARENT_QUESTION_LIMIT}
            </span>
            <span className="topic-copy polished-topic-copy">
              <strong>{topic.title}</strong>
              <small>{topic.subtitle}</small>
            </span>
            <span className="topic-tags polished-topic-tags">
              {topic.homeTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              <span className="polished-topic-arrow">›</span>
            </span>
          </button>
        ))}
      </section>

      <section className="polished-sticker-panel" aria-label="Bộ sưu tập sticker">
        <div className="polished-section-title">
          <span aria-hidden="true">♧</span>
          <strong>Bộ sưu tập sticker</strong>
          <button type="button">Xem tất cả</button>
        </div>
        <div className="polished-sticker-grid">
          {STICKER_LABELS.map((label) => (
            <span className="polished-sticker" key={label}>
              <img
                src={pictogramPath(label)}
                alt=""
                aria-hidden="true"
                onError={(event: SyntheticEvent<HTMLImageElement>) => {
                  event.currentTarget.hidden = true;
                  const fallback = event.currentTarget.nextElementSibling;
                  if (fallback instanceof HTMLElement) fallback.hidden = false;
                }}
              />
              <span hidden aria-hidden="true">✨</span>
            </span>
          ))}
        </div>
      </section>

      <section className="polished-tip-panel">
        <div className="polished-section-title">
          <span aria-hidden="true">♢</span>
          <strong>Gợi ý cho Ba Mẹ & Thầy Cô</strong>
        </div>
        <p>Hãy để trẻ tự do chọn chủ đề hôm nay. Sau khi chọn, khuyến khích trẻ diễn đạt mong muốn bằng cách chạm trực tiếp vào các hình ảnh trực quan trên màn hình.</p>
      </section>

      <footer className="polished-home-footer">
        <span>© 2026 Spektrum - Để những điều chưa thành lời vẫn được lắng nghe</span>
        <span>Pictograms: ARASAAC / Sergio Palao</span>
      </footer>
    </main>
  );
}
