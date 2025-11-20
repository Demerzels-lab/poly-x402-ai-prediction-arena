import { Market } from '@/data/mockData';

// The AI's response format
export interface AIAnalysis {
  insight: string;
  confidence: 'high' | 'medium' | 'low';
  summary: string;
  actionable: boolean;
}

// The request body we will send to our API
export interface AnalyzeRequest {
  market: Market;
}