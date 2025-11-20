import { Market } from '@/data/mockData';
import { AIAnalysis } from '../types/analysis';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// This prompt is themed to our "AI Arena"
const systemPrompt = `
You are "POLY AI", a rogue AI financial analyst built for the "POLYx402 AI Prediction Arena". 
Your job is to analyze a *single* crypto prediction market and give a sharp, actionable insight.

RULES:
1.  Analyze the 'title', 'yesOdds', 'noOdds', and 'description'.
2.  Your analysis must be 1-2 paragraphs.
3.  Your "summary" must be a single, punchy "one-liner" like a game taunt.
4.  You MUST output only a valid JSON object in this exact format:
{
  "insight": "Your 1-2 paragraph analysis here.",
  "confidence": "Your confidence (high, medium, or low).",
  "summary": "Your 1-sentence taunt/summary.",
  "actionable": "A boolean (true/false) on whether this is a clear signal."
}
`;

export async function getAIAnalysis(
  market: Market,
  apiKey: string
): Promise<AIAnalysis> {
  const userPrompt = `
Analyze this crypto market. Is it a good bet or a "noob trap"?
Give me the alpha.

Market Data:
${JSON.stringify(market, null, 2)}
`;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000', // Required by OpenRouter
        'X-Title': 'POLYx402 AI Arena' // Required by OpenRouter
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free', // Using the free Mistral model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: "json_object" } // Enforce JSON output
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} ${err}`);
    }

    const jsonResponse = await response.json();
    const aiResponseContent = jsonResponse.choices[0].message.content;
    
    // Parse the JSON string from the AI
    const analysis: AIAnalysis = JSON.parse(aiResponseContent);
    return analysis;

  } catch (error) {
    console.error('Error in getAIAnalysis:', error);
    throw new Error('Failed to get AI analysis. Is your API key set?');
  }
}