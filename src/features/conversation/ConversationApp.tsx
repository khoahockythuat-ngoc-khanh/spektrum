'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AiLoadingScreen } from './components/AiLoadingScreen';
import { ChildAACScreen } from './components/ChildAACScreen';
import { ConversationScreen } from './components/ConversationScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { HomeScreen } from './components/HomeScreen';
import { ParentFollowupScreen } from './components/ParentFollowupScreen';
import { ParentQuestionScreen } from './components/ParentQuestionScreen';
import { SpokenResponseScreen } from './components/SpokenResponseScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { cardIdsForLabels, cardToId } from './data/cardCatalog';
import { TOPICS } from './data/topics';
import { requestAiCards, requestAiFollowups } from './logic/ai';
import { getFollowupQuestions } from './logic/followups';
import { loadChildProfile, profileToAiContext, recordConversationTurn, recordTopicUse, saveChildProfile } from './logic/profile';
import { speak } from './logic/speech';
import type { Card, ChildProfile, ConversationTurn, HistoryItem, LoadingDestination, Message, Screen, SessionSummary, Topic, TopicId } from './types';
import { nowTime, todayLabel } from '../../lib/time';

type ConversationAppProps = {
  initialTopicId?: TopicId;
  initialScreen?: 'home' | 'history';
};

export function ConversationApp({ initialTopicId, initialScreen = 'home' }: ConversationAppProps) {
  const router = useRouter();
  const routedTopic = initialTopicId
    ? TOPICS.find((item) => item.id === initialTopicId) || null
    : null;
  const [screen, setScreen] = useState<Screen>(() => (
    initialScreen === 'history' ? 'history' : routedTopic ? 'loading' : 'home'
  ));
  const [topic, setTopic] = useState<Topic | null>(routedTopic);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(routedTopic?.questions[0] || '');
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [selectedFollowupQuestion, setSelectedFollowupQuestion] = useState('');
  const [aiCards, setAiCards] = useState<Card[] | null>(null);
  const [aiFollowupQuestions, setAiFollowupQuestions] = useState<string[] | null>(null);
  const [loadingTarget, setLoadingTarget] = useState<LoadingDestination | null>(routedTopic ? 'parent' : null);
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  const [profile, setProfile] = useState<ChildProfile>(() => loadChildProfile());
  const [sessionStart] = useState<number | null>(() => routedTopic ? Date.now() : null);
  const recordedRoutedTopic = useRef(false);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem('talktogether-history') || '[]');
      setHistories(Array.isArray(stored) ? stored as HistoryItem[] : []);
    } catch {
      setHistories([]);
    }
  }, []);

  useEffect(() => {
    if (!routedTopic || recordedRoutedTopic.current) return;
    recordedRoutedTopic.current = true;
    setProfile((current) => {
      const next = recordTopicUse(current, routedTopic);
      saveChildProfile(next);
      return next;
    });
  }, [routedTopic]);

  useEffect(() => {
    if (!routedTopic) return;
    const timer = window.setTimeout(() => {
      setScreen('parent');
      setLoadingTarget(null);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [routedTopic]);

  const question = currentQuestion || topic?.questions?.[questionIndex] || '';
  const response = useMemo(() => selectedCards.map((item) => item[1]).join(' · '), [selectedCards]);

  const messages = useMemo<Message[]>(() => {
    return turns.flatMap((turn) => [
      { role: 'parent', text: turn.question, time: turn.parentTime },
      { role: 'child', text: turn.response, time: turn.childTime },
    ]);
  }, [turns]);

  const latestTurn = turns[turns.length - 1];
  const fallbackFollowupSuggestions = useMemo(
    () => getFollowupQuestions(topic, latestTurn?.response || response),
    [topic, latestTurn, response],
  );
  const followupSuggestions = aiFollowupQuestions || fallbackFollowupSuggestions;
  const spokenResponse = screen === 'spoken' && response ? response : latestTurn?.response || response;

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }

  async function openChildWithQuestion(nextQuestion: string): Promise<void> {
    if (!topic) return;
    setSelectedCards([]);
    setAiCards(null);
    setLoadingTarget('child');
    setScreen('loading');

    const [cards] = await Promise.all([
      requestAiCards(topic, nextQuestion, profileToAiContext(profile)),
      delay(850),
    ]);

    setAiCards(cards);
    setLoadingTarget(null);
    setScreen('child');
  }

  async function openFollowupWithAi(): Promise<void> {
    if (!topic) return;
    const turnResponse = latestTurn?.response || response;
    const turnQuestion = latestTurn?.question || question;

    setSelectedFollowupQuestion('');
    setAiFollowupQuestions(null);
    setLoadingTarget('followup');
    setScreen('loading');

    const [questions] = await Promise.all([
      requestAiFollowups(topic, turnQuestion, turnResponse, turns, profileToAiContext(profile)),
      delay(850),
    ]);

    setAiFollowupQuestions(questions);
    setLoadingTarget(null);
    setScreen('followup');
  }

  function chooseTopic(chosen: Topic): void {
    router.push(`/topics/${chosen.id}`);
  }

  function pickQuestion(index: number | null, continueNow = false): void {
    if (index == null) return;
    const nextQuestion = topic?.questions?.[index] || '';
    setQuestionIndex(index);
    setCurrentQuestion(nextQuestion);
    if (continueNow) {
      void openChildWithQuestion(nextQuestion);
    }
  }

  function toggleCard(card: Card): void {
    setSelectedCards((current) => {
      const exists = current.some((item) => item[1] === card[1]);
      if (exists) return current.filter((item) => item[1] !== card[1]);
      return [...current, card].slice(-4);
    });
  }

  function quickResponse(card: Card): void {
    setSelectedCards([card]);
  }

  function resetChildResponse(): void {
    setSelectedCards([]);
  }

  function saveCurrentTurn(sentence: string): void {
    const turn: ConversationTurn = {
      id: `turn-${Date.now()}`,
      topicId: topic?.id,
      question,
      response: sentence,
      cards: selectedCards.map((item) => item[1]),
      cardIds: selectedCards.map(cardToId),
      parentTime: nowTime(),
      childTime: nowTime(),
    };
    setTurns((current) => {
      const lastTurn = current[current.length - 1];
      if (lastTurn?.question === question) return [...current.slice(0, -1), turn];
      return [...current, turn];
    });

    if (topic) {
      setProfile((current) => {
        const next = recordConversationTurn(current, topic, question, selectedCards);
        saveChildProfile(next);
        return next;
      });
    }
  }

  function handleSpeak(sentence: string): void {
    if (!sentence) return;
    saveCurrentTurn(sentence);
    speak(sentence);
    window.setTimeout(() => setScreen('spoken'), 250);
  }

  function endConversation(sentence = ''): void {
    if (sentence) saveCurrentTurn(sentence);
    setSelectedFollowupQuestion('');
    setAiCards(null);
    setAiFollowupQuestions(null);
    setLoadingTarget(null);
    setScreen('conversation');
  }

  function continueWithFollowupQuestion(): void {
    if (!selectedFollowupQuestion) return;
    const nextQuestion = selectedFollowupQuestion;
    setCurrentQuestion(selectedFollowupQuestion);
    setSelectedCards([]);
    setAiCards(null);
    setAiFollowupQuestions(null);
    setSelectedFollowupQuestion('');
    void openChildWithQuestion(nextQuestion);
  }

  const durationSeconds = Math.max(12, Math.round((Date.now() - (sessionStart || Date.now())) / 1000));
  const durationLabel = durationSeconds < 60 ? `${durationSeconds} giây` : `${Math.floor(durationSeconds / 60)} phút ${durationSeconds % 60} giây`;
  const session: SessionSummary = {
    topicId: topic?.id,
    topic: topic?.title || '',
    icon: topic?.icon || '💬',
    cards: turns.flatMap((turn) => turn.cards),
    cardIds: turns.flatMap((turn) => turn.cardIds || cardIdsForLabels(turn.cards)),
    turns: messages.length,
    structuredTurns: turns,
    responseSeconds: 8,
    aiSuggestions: Math.max(1, turns.length),
    duration: durationLabel,
    startedAt: sessionStart,
    endedAt: Date.now(),
  };

  function saveSession(): void {
    const item: HistoryItem = {
      ...session,
      id: Date.now(),
      date: todayLabel(),
      time: nowTime(),
    };
    const next = [item, ...histories].slice(0, 12);
    setHistories(next);
    localStorage.setItem('talktogether-history', JSON.stringify(next));
    router.push('/history');
  }

  function resetHome(): void {
    setTopic(null);
    setCurrentQuestion('');
    setSelectedCards([]);
    setAiCards(null);
    setAiFollowupQuestions(null);
    setTurns([]);
    setSelectedFollowupQuestion('');
    setScreen('home');
    router.push('/topics');
  }

  return (
    <div className="app-shell">
      <div className="ipad-stage">
        {screen === 'loading' && <AiLoadingScreen destination={loadingTarget} />}
        {screen === 'home' && <HomeScreen onSelect={chooseTopic} onHistory={() => router.push('/history')} histories={histories} />}
        {screen === 'parent' && topic && (
          <ParentQuestionScreen
            topic={topic}
            questionIndex={questionIndex}
            onPickQuestion={pickQuestion}
            onDone={() => pickQuestion(questionIndex, true)}
            onEndConversation={() => endConversation()}
            onBack={resetHome}
          />
        )}
        {screen === 'child' && topic && (
          <ChildAACScreen
            topic={topic}
            question={question}
            selected={selectedCards}
            aiCards={aiCards}
            onToggle={toggleCard}
            onQuick={quickResponse}
            onReset={resetChildResponse}
            onSpeak={handleSpeak}
            onEndConversation={endConversation}
            onBack={() => setScreen(turns.length > 0 ? 'followup' : 'parent')}
          />
        )}
        {screen === 'spoken' && (
          <SpokenResponseScreen
            response={spokenResponse}
            onReplay={() => speak(spokenResponse)}
            onEndConversation={() => endConversation()}
            onContinue={() => {
              void openFollowupWithAi();
            }}
            onBack={() => setScreen('child')}
          />
        )}
        {screen === 'followup' && latestTurn && (
          <ParentFollowupScreen
            question={latestTurn.question}
            response={latestTurn.response}
            suggestions={followupSuggestions}
            selectedQuestion={selectedFollowupQuestion}
            onSelectQuestion={setSelectedFollowupQuestion}
            onContinue={continueWithFollowupQuestion}
            onFinish={() => endConversation()}
            onBack={() => setScreen('spoken')}
          />
        )}
        {screen === 'conversation' && topic && (
          <ConversationScreen
            topic={topic}
            messages={messages}
            onFinish={() => setScreen('summary')}
            onBack={() => setScreen(latestTurn ? 'followup' : 'parent')}
          />
        )}
        {screen === 'summary' && <SummaryScreen session={session} onSave={saveSession} onHome={resetHome} />}
        {screen === 'history' && (
          <HistoryScreen
            histories={histories}
            onBack={resetHome}
            onClear={() => {
              setHistories([]);
              localStorage.removeItem('talktogether-history');
            }}
          />
        )}
      </div>
    </div>
  );
}
