import { aiAgents } from '@/data/mockData';
import AgentDetailClient from './AgentDetailClient';

// Generate static params for AI agents only
export function generateStaticParams() {
  return aiAgents.map((agent) => ({
    id: agent.id,
  }));
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  return <AgentDetailClient id={params.id} />;
}
