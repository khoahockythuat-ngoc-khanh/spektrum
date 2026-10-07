'use client';

import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { CARD_CATEGORY_ORDER, CATEGORY_LABELS, QUICK_RESPONSES } from '../data/constants';
import { getCardPageCount, getCardsForQuestion } from '../logic/cards';
import { pictogramPath } from '../logic/pictograms';
import type { Card, Topic } from '../types';
import { TurnActionButtons } from './shared';
import { DrawCardModal } from './DrawCardModal';

type ChildAACScreenProps = {
  topic: Topic;
  question: string;
  selected: readonly Card[];
  aiCards?: readonly Card[] | null;
  onToggle: (card: Card) => void;
  onQuick: (card: Card) => void;
  onReset: () => void;
  onSpeak: (sentence: string) => void;
  onEndConversation: (sentence?: string) => void;
  onBack: () => void;
};

export function ChildAACScreen({ topic, question, selected, aiCards, onToggle, onQuick, onReset, onSpeak, onEndConversation, onBack }: ChildAACScreenProps) {
  const [cardPage, setCardPage] = useState(0);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [customCards, setCustomCards] = useState<Card[]>([]);

  const fallbackPageCount = getCardPageCount(topic, question);
  const hasAiCards = Boolean(aiCards?.length);
  const cardPageCount = hasAiCards ? fallbackPageCount + 1 : fallbackPageCount;
  const cardsForQuestion = hasAiCards && cardPage === 0
    ? [...(aiCards || [])]
    : getCardsForQuestion(topic, question, hasAiCards ? cardPage - 1 : cardPage);

  const cardColumns = CARD_CATEGORY_ORDER.map((category) => {
    const categoryCustom = customCards.filter((c) => c[2] === category);
    const baseCards = cardsForQuestion.filter((card) => card[2] === category);
    return {
      category,
      label: CATEGORY_LABELS[category],
      cards: [...categoryCustom, ...baseCards].slice(0, 4),
    };
  });
  const sentence = selected.map((card) => card[1]).join(' · ');
  const hasMoreCards = cardPageCount > 1;

  useEffect(() => {
    setCardPage(0);
  }, [question, topic.id, hasAiCards]);

  function showMoreCards(): void {
    if (!hasMoreCards) return;
    setCardPage((current) => (current + 1) % cardPageCount);
  }

  return (
    <main className="screen child-screen aac-board-screen spektrum-child-screen">
      <header className="spektrum-topbar">
        <div className="spektrum-brand-group">
          <button className="spektrum-back-button" onClick={onBack} type="button" aria-label="Quay lại">
            ‹
          </button>
          <img className="spektrum-logo" src="/brand/spektrum-primary-logo.png" alt="Spektrum" />
        </div>

        <section className="spektrum-question-pill" aria-label="Câu hỏi của cha mẹ">
          <span aria-hidden="true">♡</span>
          <strong>{question}</strong>
        </section>

        <div className="spektrum-user-tools">
          <button
            className="spektrum-sound-button"
            disabled={!sentence}
            onClick={() => onSpeak(sentence)}
            type="button"
            aria-label="Nói câu này"
          >
            🔊
          </button>
          <div className="spektrum-profile" aria-label="Hồ sơ trẻ">
            <span aria-hidden="true">👦🏻</span>
            <strong>Bảo An</strong>
          </div>
        </div>
      </header>

      <section className="spektrum-card-stage">
        <section className="aac-columns" aria-label="Thẻ trả lời của trẻ">
          {cardColumns.map(({ category, label, cards }) => (
            <div className="aac-column" key={category}>
              <h2 className={`aac-column-title ${category}`}>
                <span aria-hidden="true" />
                {label}
              </h2>
              <div className="aac-column-cards">
                {cards.map((card) => {
                  const active = selected.some((item) => item[1] === card[1]);
                  return (
                    <button
                      key={card[1]}
                      className={`aac-card ${card[2]} ${active ? 'active' : ''}`}
                      onClick={() => onToggle(card)}
                      aria-label={`${label}: ${card[1]}`}
                    >
                      {active && <span className="aac-card-check" aria-hidden="true">✓</span>}
                      <span className="aac-symbol">
                        <img
                          className="aac-pictogram"
                          src={card[3] || pictogramPath(card[1])}
                          alt=""
                          aria-hidden="true"
                          onError={(event: SyntheticEvent<HTMLImageElement>) => {
                            event.currentTarget.hidden = true;
                            event.currentTarget.style.display = 'none';
                            const fallback = event.currentTarget.nextElementSibling;
                            if (fallback instanceof HTMLElement) fallback.hidden = false;
                          }}
                        />
                        <span className="aac-emoji-fallback" hidden aria-hidden="true">{card[0]}</span>
                      </span>
                      <strong>{card[1]}</strong>
                      {/* <small>{label}</small> */}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </section>

      <section className="spektrum-quick-row" aria-label="Trả lời nhanh">
        <span>Trả lời nhanh:</span>
        <div className="quick-row">
          {QUICK_RESPONSES.map(([icon, label]) => {
            const quickCard: Card = [icon, label, 'quick'];
            const active = selected.some((item) => item[1] === label);
            return (
              <button
                key={label}
                className={active ? 'active' : ''}
                onClick={() => onQuick(quickCard)}
                type="button"
                aria-label={`Trả lời nhanh: ${label}`}
              >
                <span className="quick-icon">{icon}</span>
                <strong>{label}</strong>
              </button>
            );
          })}
          <button
            className="quick-draw-button"
            onClick={() => setIsDrawModalOpen(true)}
            type="button"
            aria-label="Vẽ thẻ"
          >
            <span className="quick-icon">🎨</span>
            <strong>Vẽ thẻ</strong>
          </button>
        </div>
      </section>

      <footer className="spektrum-bottom-actions">
        <button
          className="spektrum-footer-button danger"
          disabled={!sentence}
          onClick={onReset}
          type="button"
        >
          <span aria-hidden="true">⌫</span>
          <strong>Xóa câu</strong>
        </button>

        <div className="spektrum-footer-right">
          <button
            className="spektrum-footer-button neutral"
            onClick={showMoreCards}
            type="button"
            disabled={!hasMoreCards}
            aria-label="Thêm thẻ trả lời"
          >
            <span aria-hidden="true">↻</span>
            <strong>Thêm thẻ</strong>
          </button>
          <TurnActionButtons
            doneDisabled={!sentence}
            onDone={() => onSpeak(sentence)}
            onEnd={() => onEndConversation(sentence)}
          />
        </div>
      </footer>

      <DrawCardModal
        isOpen={isDrawModalOpen}
        onClose={() => setIsDrawModalOpen(false)}
        onSelectCard={(newCard) => {
          setCustomCards((prev) => [newCard, ...prev.filter((c) => c[1] !== newCard[1])]);
          onToggle(newCard);
        }}
        topic={topic}
        question={question}
      />
    </main>
  );
}
