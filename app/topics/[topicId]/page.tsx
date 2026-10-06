import { notFound } from 'next/navigation';

import { ConversationApp } from '../../../src/features/conversation/ConversationApp';
import { TOPICS } from '../../../src/features/conversation/data/topics';

type TopicPageProps = {
  params: Promise<{
    topicId: string;
  }>;
};

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topicId: topic.id }));
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topicId } = await params;
  const topic = TOPICS.find((item) => item.id === topicId);

  if (!topic) notFound();

  return <ConversationApp key={topic.id} initialTopicId={topic.id} />;
}
