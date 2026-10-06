export type TopicId =
  | 'school'
  | 'food'
  | 'activities'
  | 'feelings'
  | 'family'
  | 'home'
  | 'toys'
  | 'health'
  | 'park'
  | 'shopping'
  | 'animals'
  | 'vehicles';
export type CoreCardCategory = 'topic' | 'action' | 'emotion';
export type CardCategory = CoreCardCategory | 'quick';
export type Card = readonly [icon: string, label: string, category: CardCategory, imageUrl?: string];
export type BankCard = readonly [icon: string, label: string];
export type CardBank = Record<CoreCardCategory, readonly BankCard[]>;

export type CardDefinition = {
  id: string;
  icon: string;
  label: string;
  category: CoreCardCategory;
  pictogramLabel: string;
  aliases: readonly string[];
  contexts: readonly string[];
};

export type Topic = {
  id: TopicId;
  icon: string;
  homePictogram: string;
  title: string;
  subtitle: string;
  homeTags: readonly string[];
  questions: readonly string[];
  cards: readonly Card[];
};

export type Screen = 'home' | 'loading' | 'parent' | 'child' | 'spoken' | 'followup' | 'conversation' | 'summary' | 'history';
export type LoadingDestination = 'parent' | 'child' | 'followup';

export type ConversationTurn = {
  id?: string;
  topicId?: TopicId;
  question: string;
  response: string;
  cards: string[];
  cardIds?: string[];
  parentTime: string;
  childTime: string;
};

export type Message = {
  role: 'parent' | 'child';
  text: string;
  time: string;
};

export type SessionSummary = {
  id?: number;
  topicId?: TopicId;
  topic: string;
  icon: string;
  cards: string[];
  cardIds?: string[];
  turns: number;
  structuredTurns?: ConversationTurn[];
  responseSeconds: number;
  aiSuggestions: number;
  duration: string;
  startedAt?: number | null;
  endedAt?: number;
};

export type HistoryItem = SessionSummary & {
  id: number;
  date: string;
  time: string;
};

export type ChildProfile = {
  childName: string;
  version: number;
  updatedAt: string;
  topicCounts: Partial<Record<TopicId, number>>;
  cardCounts: Record<string, number>;
  questionCounts: Record<string, number>;
  recentCardIds: string[];
};

export type AiProfileContext = {
  childName: string;
  frequentCards: string[];
  recentCards: string[];
  frequentTopics: string[];
  repeatedQuestions: string[];
};
