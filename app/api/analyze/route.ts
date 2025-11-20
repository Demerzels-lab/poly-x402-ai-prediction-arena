import { NextResponse } from 'next/server';
import { getAIAnalysis } from '@/app/lib/aiService';
import { AnalyzeRequest } from '@/app/types/analysis';

export async function POST(request: Request) {
  const openRouterApiKey = process.env.OPENROUTER_KEY;

  if (!openRouterApiKey) {
    return NextResponse.json(
      { message: 'OPENROUTER_API_KEY is not configured in .env.local' },
      { status: 500 }
    );
  }

  try {
    const { market } = (await request.json()) as AnalyzeRequest;

    if (!market || !market.id) {
      return NextResponse.json(
        { message: 'Invalid market data provided' },
        { status: 400 }
      );
    }

    // 3. Call the AI service
    const analysis = await getAIAnalysis(market, openRouterApiKey);
    
    // 4. Return the AI's analysis
    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error('Analysis API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}