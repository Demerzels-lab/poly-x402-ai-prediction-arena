export interface AIAgent {
  id: string;
  name: string;
  icon: string;
  logo: string;
  color: string;
  portfolio: number;
  roi: number;
  winRate: number;
  totalPredictions: number;
  profitLoss: number;
  accuracy: number;
}

export interface PredictionFeed {
  id: string;
  aiName: string;
  prediction: string;
  confidence: number;
  result: 'WIN' | 'LOSS' | 'PENDING';
  amount: number;
  timestamp: string;
  color: string;
  reasoning: string;
}

export interface Market {
  id: string;
  title: string;
  category: string;
  yesOdds: number;
  noOdds: number;
  volume: number;
  topAIConfidence: Array<{
    name: string;
    confidence: number;
    stance: 'YES' | 'NO';
  }>;
  description: string;
}

export const aiAgents: AIAgent[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🤖',
    logo: 'gpt.png',
    color: '#00f0ff',
    portfolio: 14780.00,
    roi: 47.8,
    winRate: 61.5,
    totalPredictions: 231,
    profitLoss: 4780.00,
    accuracy: 61.5
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🎯',
    logo: 'claude.svg',
    color: '#ff00ff',
    portfolio: 15230.00,
    roi: 52.3,
    winRate: 67.5,
    totalPredictions: 231,
    profitLoss: 5230.00,
    accuracy: 67.5
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '💎',
    logo: 'gemini.png',
    color: '#b026ff',
    portfolio: 13890.00,
    roi: 38.9,
    winRate: 58.0,
    totalPredictions: 231,
    profitLoss: 3890.00,
    accuracy: 58.0
  },
  {
    id: 'manus',
    name: 'Manus',
    icon: '🧠',
    logo: 'manus.png',
    color: '#00ffaa',
    portfolio: 14120.00,
    roi: 41.2,
    winRate: 59.7,
    totalPredictions: 231,
    profitLoss: 4120.00,
    accuracy: 59.7
  },
  {
    id: 'grok',
    name: 'Grok',
    icon: '⚡',
    logo: 'grok.png',
    color: '#ff6b00',
    portfolio: 13370.00,
    roi: 33.7,
    winRate: 55.4,
    totalPredictions: 231,
    profitLoss: 3370.00,
    accuracy: 55.4
  },
  {
    id: 'llama',
    name: 'LLaMA',
    icon: '🦙',
    logo: 'meta-llama.png',
    color: '#ff0080',
    portfolio: 12910.00,
    roi: 29.1,
    winRate: 52.4,
    totalPredictions: 231,
    profitLoss: 2910.00,
    accuracy: 52.4
  },
  {
    id: 'mistral',
    name: 'Mistral',
    icon: '🌪️',
    logo: 'mistral.png',
    color: '#0080ff',
    portfolio: 13540.00,
    roi: 35.4,
    winRate: 56.7,
    totalPredictions: 231,
    profitLoss: 3540.00,
    accuracy: 56.7
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🔍',
    logo: 'perplexity.png',
    color: '#00fff0',
    portfolio: 14460.00,
    roi: 44.6,
    winRate: 63.2,
    totalPredictions: 231,
    profitLoss: 4460.00,
    accuracy: 63.2
  }
];

export const generatePredictionFeeds = (): PredictionFeed[] => {
  const enhancedPredictions = [
    {
      prediction: 'Bitcoin ATH $150K+ Q4 2025',
      reasoning: 'Strong institutional adoption, ETF inflows, halving effect',
      confidence: [85, 92, 78, 89, 76, 71, 82, 87]
    },
    {
      prediction: 'Avatar 3 Box Office $3B+ worldwide',
      reasoning: 'Franchise popularity, advanced technology, marketing power',
      confidence: [92, 89, 85, 87, 83, 79, 86, 90]
    },
    {
      prediction: 'Tesla Stock $800+ per share',
      reasoning: 'FSD progress, robotaxi potential, market position',
      confidence: [78, 82, 74, 80, 72, 69, 76, 81]
    },
    {
      prediction: 'Apple Vision Pro 5M+ sales 2025',
      reasoning: 'Price reduction, app ecosystem growth, enterprise adoption',
      confidence: [68, 71, 65, 73, 62, 58, 69, 75]
    },
    {
      prediction: 'GPT-5 launch Q3 2025',
      reasoning: 'OpenAI roadmap, competitive pressure, capability leaps',
      confidence: [91, 87, 83, 89, 85, 82, 88, 93]
    },
    {
      prediction: 'NVIDIA stock split again 2025',
      reasoning: 'AI boom momentum, high share price, investor accessibility',
      confidence: [85, 89, 81, 87, 79, 75, 83, 88]
    },
    {
      prediction: 'Ethereum $8K+ breakthrough',
      reasoning: 'Ethereum 2.0 upgrades, DeFi growth, institutional interest',
      confidence: [79, 83, 75, 81, 73, 70, 77, 84]
    },
    {
      prediction: 'Meta stock $800+ recovery',
      reasoning: 'Metaverse adoption, AI advertising revenue, VR mainstream',
      confidence: [72, 76, 68, 74, 66, 63, 71, 78]
    },
    {
      prediction: 'Olympics 2025 record viewership',
      reasoning: 'Global sports appetite, technological broadcast innovation',
      confidence: [82, 85, 78, 83, 76, 73, 80, 87]
    },
    {
      prediction: 'Nintendo Switch 2 launch success',
      reasoning: 'Hardware upgrade demand, backwards compatibility, exclusive titles',
      confidence: [94, 91, 87, 93, 89, 86, 92, 96]
    },
    {
      prediction: 'GTA 6 no delay to 2026',
      reasoning: 'Development progress, marketing timeline, fan anticipation',
      confidence: [76, 79, 72, 77, 74, 71, 75, 81]
    },
    {
      prediction: 'US avoids recession 2025',
      reasoning: 'Economic indicators, Fed policy effectiveness, consumer spending',
      confidence: [69, 73, 65, 71, 67, 64, 70, 75]
    },
    {
      prediction: 'Climate temperature record 2025',
      reasoning: 'Global warming trend, El Niño effects, emission levels',
      confidence: [88, 92, 84, 90, 86, 83, 89, 94]
    },
    {
      prediction: 'Solana $500+ price target',
      reasoning: 'DeFi ecosystem growth, institutional adoption, scalability',
      confidence: [74, 78, 70, 76, 72, 69, 75, 80]
    },
    {
      prediction: 'Google stock $200+ milestone',
      reasoning: 'Gemini AI dominance, cloud growth acceleration, ad revenue',
      confidence: [81, 85, 77, 83, 79, 76, 82, 87]
    },
    {
      prediction: 'Fed rates below 3% end 2025',
      reasoning: 'Economic slowdown signals, inflation control, market pressure',
      confidence: [63, 67, 59, 65, 61, 58, 64, 69]
    },
    {
      prediction: 'SpaceX Mars mission launch',
      reasoning: 'Starship development, technical milestones, timeline pressure',
      confidence: [58, 62, 54, 60, 56, 53, 59, 64]
    },
    {
      prediction: 'Mbappe Ballon d\'Or winner 2025',
      reasoning: 'Real Madrid performance, World Cup qualifiers, goal scoring',
      confidence: [77, 81, 73, 79, 75, 72, 78, 83]
    }
  ];

  const feeds: PredictionFeed[] = [];
  
  for (let i = 0; i < 60; i++) {
    const agent = aiAgents[i % aiAgents.length];
    const predictionData = enhancedPredictions[i % enhancedPredictions.length];
    const confidence = predictionData.confidence[i % aiAgents.length];
    
    const result: 'WIN' | 'LOSS' | 'PENDING' = 
      i < 15 ? 'PENDING' : (Math.random() > 0.4 ? 'WIN' : 'LOSS');
    
    feeds.push({
      id: `feed-${i}`,
      aiName: agent.name,
      prediction: predictionData.prediction,
      confidence: confidence,
      result,
      amount: 0.01,
      timestamp: new Date(Date.now() - i * 45000).toISOString(),
      color: agent.color,
      reasoning: predictionData.reasoning
    });
  }

  return feeds;
};

export const markets2025: Market[] = [
  // CRYPTO MARKETS (20 predictions)
  {
    id: 'btc-ath-2025',
    title: 'Bitcoin will reach All-Time High $150,000+ in Q4 2025?',
    category: 'Crypto',
    yesOdds: 68,
    noOdds: 32,
    volume: 2450000,
    topAIConfidence: [
      { name: 'Claude', confidence: 75, stance: 'YES' },
      { name: 'ChatGPT', confidence: 72, stance: 'YES' },
      { name: 'Mistral', confidence: 69, stance: 'YES' }
    ],
    description: 'Prediction: Bitcoin reaches new all-time high $150K+ in Q4 2025 with institutional adoption and halving effect.'
  },
  {
    id: 'eth-5k-2025',
    title: 'Ethereum will break $5,000 before August 2025?',
    category: 'Crypto',
    yesOdds: 62,
    noOdds: 38,
    volume: 1890000,
    topAIConfidence: [
      { name: 'Manus', confidence: 71, stance: 'YES' },
      { name: 'Perplexity', confidence: 65, stance: 'YES' },
      { name: 'Claude', confidence: 58, stance: 'YES' }
    ],
    description: 'Market for ETH reaching $5K with Ethereum 2.0 upgrades and massive DeFi adoption in 2025.'
  },
  {
    id: 'sol-300-2025',
    title: 'Solana (SOL) will reach $300+ price in 2025?',
    category: 'Crypto',
    yesOdds: 45,
    noOdds: 55,
    volume: 987000,
    topAIConfidence: [
      { name: 'Grok', confidence: 58, stance: 'NO' },
      { name: 'LLaMA', confidence: 52, stance: 'NO' },
      { name: 'ChatGPT', confidence: 49, stance: 'YES' }
    ],
    description: 'Prediction: Solana reaches $300 with rapidly growing DeFi and NFT ecosystem.'
  },
  {
    id: 'ada-cardano-2025',
    title: 'Cardano (ADA) will outperform Bitcoin in ROI 2025?',
    category: 'Crypto',
    yesOdds: 23,
    noOdds: 77,
    volume: 654000,
    topAIConfidence: [
      { name: 'Claude', confidence: 82, stance: 'NO' },
      { name: 'Mistral', confidence: 79, stance: 'NO' },
      { name: 'Manus', confidence: 76, stance: 'NO' }
    ],
    description: 'Market whether ADA will deliver higher returns than Bitcoin in 2025.'
  },
  {
    id: 'doge-1dollar-2025',
    title: 'Dogecoin will reach $1 before December 2025?',
    category: 'Crypto',
    yesOdds: 15,
    noOdds: 85,
    volume: 543000,
    topAIConfidence: [
      { name: 'Grok', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 87, stance: 'NO' },
      { name: 'LLaMA', confidence: 84, stance: 'NO' }
    ],
    description: 'Prediction: DOGE reaches $1 milestone with community support and mainstream adoption.'
  },

  // TECH STOCKS (15 predictions)
  {
    id: 'nvidia-split-2025',
    title: 'NVIDIA will do another stock split in 2025?',
    category: 'Stocks',
    yesOdds: 78,
    noOdds: 22,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 85, stance: 'YES' },
      { name: 'Mistral', confidence: 82, stance: 'YES' },
      { name: 'Perplexity', confidence: 79, stance: 'YES' }
    ],
    description: 'Market about NVIDIA second stock split possibility following AI boom momentum.'
  },
  {
    id: 'tesla-500-2025',
    title: 'Tesla stock will reach $500+ per share in 2025?',
    category: 'Stocks',
    yesOdds: 42,
    noOdds: 58,
    volume: 1456000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 61, stance: 'NO' },
      { name: 'Manus', confidence: 58, stance: 'NO' },
      { name: 'Gemini', confidence: 55, stance: 'NO' }
    ],
    description: 'Prediction: Tesla stock price reaches $500 with FSD production and robotaxi deployment.'
  },
  {
    id: 'apple-4trillion-2025',
    title: 'Apple will become the first $4 trillion company in 2025?',
    category: 'Stocks',
    yesOdds: 67,
    noOdds: 33,
    volume: 2100000,
    topAIConfidence: [
      { name: 'Claude', confidence: 73, stance: 'YES' },
      { name: 'ChatGPT', confidence: 70, stance: 'YES' },
      { name: 'Mistral', confidence: 68, stance: 'YES' }
    ],
    description: 'Apple market cap reaches $4T with Vision Pro success and AI integration across all products.'
  },
  {
    id: 'meta-400-2025',
    title: 'Meta stock will exceed $400 per share in 2025?',
    category: 'Stocks',
    yesOdds: 55,
    noOdds: 45,
    volume: 987000,
    topAIConfidence: [
      { name: 'Manus', confidence: 62, stance: 'YES' },
      { name: 'Perplexity', confidence: 59, stance: 'YES' },
      { name: 'Grok', confidence: 56, stance: 'YES' }
    ],
    description: 'Prediction: META reaches $400 with metaverse adoption and AI advertising revenue.'
  },
  {
    id: 'google-200-2025',
    title: 'Google (GOOGL) will reach $200+ per share in 2025?',
    category: 'Stocks',
    yesOdds: 71,
    noOdds: 29,
    volume: 1345000,
    topAIConfidence: [
      { name: 'Claude', confidence: 78, stance: 'YES' },
      { name: 'ChatGPT', confidence: 75, stance: 'YES' },
      { name: 'Mistral', confidence: 72, stance: 'YES' }
    ],
    description: 'Google market reaching $200+ with Gemini AI dominance and cloud growth acceleration.'
  },

  // ENTERTAINMENT & MOVIES (10 predictions)
  {
    id: 'avatar3-highest-2025',
    title: 'Avatar 3 will be the highest-grossing movie 2025?',
    category: 'Entertainment',
    yesOdds: 73,
    noOdds: 27,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 81, stance: 'YES' },
      { name: 'ChatGPT', confidence: 78, stance: 'YES' },
      { name: 'Manus', confidence: 75, stance: 'YES' }
    ],
    description: 'Avatar 3 prediction to dominate 2025 box office with revolutionary underwater technology.'
  },
  {
    id: 'avengers-2025',
    title: 'Marvel will announce new Avengers movie for 2026-2027?',
    category: 'Entertainment',
    yesOdds: 86,
    noOdds: 14,
    volume: 1234000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 92, stance: 'YES' },
      { name: 'Claude', confidence: 89, stance: 'YES' },
      { name: 'Mistral', confidence: 87, stance: 'YES' }
    ],
    description: 'Market for new Avengers movie announcement as culmination of Multiverse Saga.'
  },
  {
    id: 'dune3-production-2025',
    title: 'Dune: Part Three will start production in 2025?',
    category: 'Entertainment',
    yesOdds: 79,
    noOdds: 21,
    volume: 876000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 85, stance: 'YES' },
      { name: 'Claude', confidence: 82, stance: 'YES' },
      { name: 'Manus', confidence: 79, stance: 'YES' }
    ],
    description: 'Denis Villeneuve prediction to start Dune: Part Three production after Part Two success.'
  },
  {
    id: 'starwars-movie-2025',
    title: 'Star Wars will release new theatrical movie in 2025?',
    category: 'Entertainment',
    yesOdds: 34,
    noOdds: 66,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Grok', confidence: 71, stance: 'NO' },
      { name: 'LLaMA', confidence: 68, stance: 'NO' },
      { name: 'ChatGPT', confidence: 65, stance: 'NO' }
    ],
    description: 'Market for Star Wars theatrical release possibility in 2025 after long hiatus.'
  },
  {
    id: 'netflix-sub-300m-2025',
    title: 'Netflix will reach 300 million subscribers in 2025?',
    category: 'Entertainment',
    yesOdds: 52,
    noOdds: 48,
    volume: 967000,
    topAIConfidence: [
      { name: 'Claude', confidence: 59, stance: 'YES' },
      { name: 'ChatGPT', confidence: 56, stance: 'YES' },
      { name: 'Mistral', confidence: 53, stance: 'YES' }
    ],
    description: 'Netflix prediction to reach 300M subscribers with password sharing crackdown and content expansion.'
  },

  // AI & TECH BREAKTHROUGHS (15 predictions)
  {
    id: 'gpt5-release-2025',
    title: 'OpenAI will launch GPT-5 before Q3 2025?',
    category: 'Tech',
    yesOdds: 81,
    noOdds: 19,
    volume: 1890000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 87, stance: 'YES' },
      { name: 'Claude', confidence: 84, stance: 'YES' },
      { name: 'Mistral', confidence: 81, stance: 'YES' }
    ],
    description: 'Market for GPT-5 release with breakthrough reasoning and multimodal capabilities.'
  },
  {
    id: 'apple-vision-pro-5m-2025',
    title: 'Apple Vision Pro will sell 5M+ units in 2025?',
    category: 'Tech',
    yesOdds: 28,
    noOdds: 72,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 76, stance: 'NO' },
      { name: 'Manus', confidence: 73, stance: 'NO' },
      { name: 'ChatGPT', confidence: 70, stance: 'NO' }
    ],
    description: 'Apple Vision Pro sales prediction to reach 5M units with price reduction and app ecosystem growth.'
  },
  {
    id: 'google-gemini-ultra-2025',
    title: 'Google Gemini Ultra will beat GPT-4o in benchmark?',
    category: 'Tech',
    yesOdds: 65,
    noOdds: 35,
    volume: 1456000,
    topAIConfidence: [
      { name: 'Gemini', confidence: 78, stance: 'YES' },
      { name: 'Claude', confidence: 72, stance: 'YES' },
      { name: 'Perplexity', confidence: 69, stance: 'YES' }
    ],
    description: 'Market for top AI model competition between Google and OpenAI in 2025.'
  },
  {
    id: 'tesla-fsd-level5-2025',
    title: 'Tesla will achieve true Level 5 FSD in 2025?',
    category: 'Tech',
    yesOdds: 19,
    noOdds: 81,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 87, stance: 'NO' },
      { name: 'ChatGPT', confidence: 84, stance: 'NO' },
      { name: 'Manus', confidence: 81, stance: 'NO' }
    ],
    description: 'Tesla prediction to achieve true Level 5 Full Self-Driving autonomous without intervention.'
  },
  {
    id: 'quantum-breakthrough-2025',
    title: 'Will there be a major quantum computing breakthrough in 2025?',
    category: 'Tech',
    yesOdds: 42,
    noOdds: 58,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 65, stance: 'NO' },
      { name: 'Mistral', confidence: 62, stance: 'NO' },
      { name: 'Perplexity', confidence: 59, stance: 'NO' }
    ],
    description: 'Market for significant quantum computing breakthrough that will transform technology industry.'
  },

  // SPORTS & OLYMPICS 2025 (10 predictions)
  {
    id: 'olympics-2025-records',
    title: '10+ world records will be broken at Olympics Paris 2025?',
    category: 'Sports',
    yesOdds: 67,
    noOdds: 33,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'YES' },
      { name: 'ChatGPT', confidence: 71, stance: 'YES' },
      { name: 'Manus', confidence: 68, stance: 'YES' }
    ],
    description: '10+ new world records prediction at Olympics 2025 with latest technology and training methods.'
  },
  {
    id: 'usain-bolt-comeback-2025',
    title: 'Usain Bolt will announce comeback for Olympics 2025?',
    category: 'Sports',
    yesOdds: 8,
    noOdds: 92,
    volume: 876000,
    topAIConfidence: [
      { name: 'Grok', confidence: 95, stance: 'NO' },
      { name: 'LLaMA', confidence: 93, stance: 'NO' },
      { name: 'ChatGPT', confidence: 91, stance: 'NO' }
    ],
    description: 'Market for Usain Bolt comeback possibility for his last Olympics at age 39.'
  },
  {
    id: 'nba-ratings-2025',
    title: 'NBA Finals 2025 will have highest TV ratings in 5 years?',
    category: 'Sports',
    yesOdds: 48,
    noOdds: 52,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 56, stance: 'NO' },
      { name: 'ChatGPT', confidence: 53, stance: 'NO' },
      { name: 'Mistral', confidence: 50, stance: 'YES' }
    ],
    description: 'NBA Finals 2025 TV ratings prediction to reach highest peak with new rivalries.'
  },
  {
    id: 'fifa-wc-expansion-2025',
    title: 'FIFA will announce World Cup expansion to 64 teams?',
    category: 'Sports',
    yesOdds: 23,
    noOdds: 77,
    volume: 967000,
    topAIConfidence: [
      { name: 'Claude', confidence: 82, stance: 'NO' },
      { name: 'Perplexity', confidence: 79, stance: 'NO' },
      { name: 'Manus', confidence: 76, stance: 'NO' }
    ],
    description: 'Market for FIFA announcement possibility of World Cup expansion from 48 to 64 teams.'
  },
  {
    id: 'formula1-vegas-2025',
    title: 'Formula 1 Las Vegas GP 2025 will be the race with highest attendance?',
    category: 'Sports',
    yesOdds: 34,
    noOdds: 66,
    volume: 789000,
    topAIConfidence: [
      { name: 'Grok', confidence: 71, stance: 'NO' },
      { name: 'LLaMA', confidence: 68, stance: 'NO' },
      { name: 'Claude', confidence: 65, stance: 'NO' }
    ],
    description: 'F1 Las Vegas GP prediction to have highest attendance beating Monaco and Silverstone.'
  },

  // ECONOMIC FORECASTS (10 predictions)
  {
    id: 'us-recession-2025',
    title: 'US will experience technical recession (2 quarters) in 2025?',
    category: 'Economy',
    yesOdds: 31,
    noOdds: 69,
    volume: 1890000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'NO' },
      { name: 'Perplexity', confidence: 71, stance: 'NO' },
      { name: 'Mistral', confidence: 68, stance: 'NO' }
    ],
    description: 'Market for US technical recession possibility with 2 consecutive quarters negative growth.'
  },
  {
    id: 'fed-rate-below-3-2025',
    title: 'Federal Reserve rate will drop below 3% before end of 2025?',
    category: 'Economy',
    yesOdds: 56,
    noOdds: 44,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 63, stance: 'YES' },
      { name: 'ChatGPT', confidence: 60, stance: 'YES' },
      { name: 'Manus', confidence: 57, stance: 'YES' }
    ],
    description: 'Fed funds rate prediction to drop significantly below 3% due to economic slowdown and inflation control.'
  },
  {
    id: 'inflation-2percent-2025',
    title: 'US inflation will stabilize at 2% target throughout Q3-Q4 2025?',
    category: 'Economy',
    yesOdds: 41,
    noOdds: 59,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 66, stance: 'NO' },
      { name: 'Claude', confidence: 63, stance: 'NO' },
      { name: 'Mistral', confidence: 60, stance: 'NO' }
    ],
    description: 'Market for US inflation reaching and maintaining Fed 2% target by end of 2025.'
  },
  {
    id: 'oil-120-2025',
    title: 'Crude oil will reach $120+ per barrel in 2025?',
    category: 'Economy',
    yesOdds: 27,
    noOdds: 73,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 78, stance: 'NO' },
      { name: 'ChatGPT', confidence: 75, stance: 'NO' },
      { name: 'Manus', confidence: 72, stance: 'NO' }
    ],
    description: 'Crude oil prediction to reach $120+ due to geopolitical tensions and supply constraints.'
  },
  {
    id: 'gold-3000-2025',
    title: 'Gold will break $3,000 per ounce in 2025?',
    category: 'Economy',
    yesOdds: 38,
    noOdds: 62,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 68, stance: 'NO' },
      { name: 'Mistral', confidence: 65, stance: 'NO' },
      { name: 'Perplexity', confidence: 62, stance: 'NO' }
    ],
    description: 'Market for gold reaching $3,000/oz with global uncertainty and dollar weakness.'
  },

  // GAMING INDUSTRY (10 predictions)
  {
    id: 'gta6-delay-2026',
    title: 'GTA 6 will be delayed again to 2026?',
    category: 'Gaming',
    yesOdds: 24,
    noOdds: 76,
    volume: 1456000,
    topAIConfidence: [
      { name: 'Grok', confidence: 81, stance: 'NO' },
      { name: 'LLaMA', confidence: 78, stance: 'NO' },
      { name: 'ChatGPT', confidence: 75, stance: 'NO' }
    ],
    description: 'GTA 6 prediction to face another delay from 2025 target release to 2026.'
  },
  {
    id: 'nintendo-switch2-2025',
    title: 'Nintendo will launch Switch 2 in 2025?',
    category: 'Gaming',
    yesOdds: 89,
    noOdds: 11,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 94, stance: 'YES' },
      { name: 'ChatGPT', confidence: 91, stance: 'YES' },
      { name: 'Mistral', confidence: 88, stance: 'YES' }
    ],
    description: 'Market for Nintendo Switch 2 launch in 2025 with backwards compatibility and upgraded specs.'
  },
  {
    id: 'steam-deck2-announce-2025',
    title: 'Valve will announce Steam Deck 2 in 2025?',
    category: 'Gaming',
    yesOdds: 67,
    noOdds: 33,
    volume: 876000,
    topAIConfidence: [
      { name: 'Manus', confidence: 74, stance: 'YES' },
      { name: 'Claude', confidence: 71, stance: 'YES' },
      { name: 'Perplexity', confidence: 68, stance: 'YES' }
    ],
    description: 'Valve prediction to announce second generation Steam Deck with improved performance and battery life.'
  },
  {
    id: 'esports-olympics-2025',
    title: 'Esports will officially included in Olympics 2025?',
    category: 'Gaming',
    yesOdds: 15,
    noOdds: 85,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 86, stance: 'NO' },
      { name: 'Mistral', confidence: 83, stance: 'NO' }
    ],
    description: 'Market for esports becoming official Olympics 2025 sport after exhibition at Paris 2024.'
  },
  {
    id: 'minecraft-2-announce-2025',
    title: 'Microsoft will announce Minecraft 2 in 2025?',
    category: 'Gaming',
    yesOdds: 12,
    noOdds: 88,
    volume: 967000,
    topAIConfidence: [
      { name: 'Grok', confidence: 92, stance: 'NO' },
      { name: 'LLaMA', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 86, stance: 'NO' }
    ],
    description: 'Microsoft prediction to announce Minecraft 2 as next-gen successor of world\'s most popular game.'
  },

  // CLIMATE & ENVIRONMENT (10 predictions)
  {
    id: 'global-temp-record-2025',
    title: '2025 will be the hottest year in recorded history?',
    category: 'Climate',
    yesOdds: 73,
    noOdds: 27,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 81, stance: 'YES' },
      { name: 'Perplexity', confidence: 78, stance: 'YES' },
      { name: 'Mistral', confidence: 75, stance: 'YES' }
    ],
    description: 'Market for 2025 breaking highest global temperature record beating 2023 and 2024.'
  },
  {
    id: 'ev-50percent-2025',
    title: 'Electric vehicles will reach 50%+ market share in Norway 2025?',
    category: 'Climate',
    yesOdds: 94,
    noOdds: 6,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 97, stance: 'YES' },
      { name: 'ChatGPT', confidence: 95, stance: 'YES' },
      { name: 'Manus', confidence: 92, stance: 'YES' }
    ],
    description: 'Norway prediction to reach 50%+ EV market share as first country with majority electric car sales.'
  },
  {
    id: 'renewable-30percent-global-2025',
    title: 'Renewable energy will reach 30%+ global electricity generation?',
    category: 'Climate',
    yesOdds: 61,
    noOdds: 39,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 68, stance: 'YES' },
      { name: 'Mistral', confidence: 65, stance: 'YES' },
      { name: 'Perplexity', confidence: 62, stance: 'YES' }
    ],
    description: 'Market for renewable energy (solar, wind, hydro) reaching 30% of total global electricity generation.'
  },
  {
    id: 'carbon-capture-breakthrough-2025',
    title: 'Will there be a major carbon capture technology breakthrough in 2025?',
    category: 'Climate',
    yesOdds: 34,
    noOdds: 66,
    volume: 789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 71, stance: 'NO' },
      { name: 'Mistral', confidence: 68, stance: 'NO' },
      { name: 'Manus', confidence: 65, stance: 'NO' }
    ],
    description: 'Significant breakthrough prediction in cost-effective and scalable carbon capture technology.'
  },
  {
    id: 'arctic-ice-minimum-2025',
    title: 'Arctic sea ice will reach new record minimum in 2025?',
    category: 'Climate',
    yesOdds: 42,
    noOdds: 58,
    volume: 654000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 65, stance: 'NO' },
      { name: 'Claude', confidence: 62, stance: 'NO' },
      { name: 'Mistral', confidence: 59, stance: 'NO' }
    ],
    description: 'Market for Arctic sea ice extent reaching new minimum record beating 2012.'
  },

  // ADDITIONAL 48 MARKETS TO REACH 100 TOTAL

  // MORE CRYPTO (8 markets)
  {
    id: 'bnb-1000-2025',
    title: 'Binance Coin (BNB) will reach $1,000+ in 2025?',
    category: 'Crypto',
    yesOdds: 36,
    noOdds: 64,
    volume: 789000,
    topAIConfidence: [
      { name: 'Grok', confidence: 69, stance: 'NO' },
      { name: 'LLaMA', confidence: 66, stance: 'NO' },
      { name: 'ChatGPT', confidence: 63, stance: 'NO' }
    ],
    description: 'Prediction: BNB reaches $1,000 with Binance Smart Chain ecosystem growth and supportive regulations.'
  },
  {
    id: 'xrp-5dollar-2025',
    title: 'Ripple (XRP) will reach $5 after win vs SEC?',
    category: 'Crypto',
    yesOdds: 43,
    noOdds: 57,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 61, stance: 'NO' },
      { name: 'Claude', confidence: 58, stance: 'NO' },
      { name: 'Mistral', confidence: 55, stance: 'NO' }
    ],
    description: 'Market for massive XRP rally after regulatory clarity and SEC lawsuit victory.'
  },
  {
    id: 'avalanche-200-2025',
    title: 'Avalanche (AVAX) will outperform Solana in ROI 2025?',
    category: 'Crypto',
    yesOdds: 29,
    noOdds: 71,
    volume: 543000,
    topAIConfidence: [
      { name: 'Claude', confidence: 76, stance: 'NO' },
      { name: 'ChatGPT', confidence: 73, stance: 'NO' },
      { name: 'Manus', confidence: 70, stance: 'NO' }
    ],
    description: 'Competition AVAX vs SOL in subnet technology and DeFi ecosystem growth in 2025.'
  },
  {
    id: 'polygon-3dollar-2025',
    title: 'Polygon (MATIC) will reach $3+ with zkEVM adoption?',
    category: 'Crypto',
    yesOdds: 52,
    noOdds: 48,
    volume: 876000,
    topAIConfidence: [
      { name: 'Manus', confidence: 59, stance: 'YES' },
      { name: 'Perplexity', confidence: 56, stance: 'YES' },
      { name: 'Claude', confidence: 53, stance: 'YES' }
    ],
    description: 'Prediction MATIC rally with zkEVM technology adoption and Ethereum scaling solutions.'
  },
  {
    id: 'chainlink-100-2025',
    title: 'Chainlink (LINK) will reach $100+ with oracle expansion?',
    category: 'Crypto',
    yesOdds: 41,
    noOdds: 59,
    volume: 654000,
    topAIConfidence: [
      { name: 'Claude', confidence: 64, stance: 'NO' },
      { name: 'ChatGPT', confidence: 61, stance: 'NO' },
      { name: 'Mistral', confidence: 58, stance: 'NO' }
    ],
    description: 'Market LINK reach $100 with expanded oracle services and traditional finance integration.'
  },
  {
    id: 'shiba-inu-001-2025',
    title: 'Shiba Inu will reach $0.01 in bull run 2025?',
    category: 'Crypto',
    yesOdds: 8,
    noOdds: 92,
    volume: 432000,
    topAIConfidence: [
      { name: 'Grok', confidence: 96, stance: 'NO' },
      { name: 'LLaMA', confidence: 94, stance: 'NO' },
      { name: 'ChatGPT', confidence: 91, stance: 'NO' }
    ],
    description: 'Prediction SHIB reach $0.01 with massive token burns and Shibarium development.'
  },
  {
    id: 'sui-10dollar-2025',
    title: 'Sui Network will reach $10+ with Move programming adoption?',
    category: 'Crypto',
    yesOdds: 35,
    noOdds: 65,
    volume: 567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 70, stance: 'NO' },
      { name: 'Manus', confidence: 67, stance: 'NO' },
      { name: 'Perplexity', confidence: 64, stance: 'NO' }
    ],
    description: 'Market SUI token rally with Move programming language adoption and developer ecosystem growth.'
  },
  {
    id: 'aptos-50dollar-2025',
    title: 'Aptos will reach $50+ as Solana killer in 2025?',
    category: 'Crypto',
    yesOdds: 31,
    noOdds: 69,
    volume: 789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'NO' },
      { name: 'ChatGPT', confidence: 71, stance: 'NO' },
      { name: 'Mistral', confidence: 68, stance: 'NO' }
    ],
    description: 'Prediction APT rivalry with Solana in high-performance blockchain and DeFi adoption.'
  },

  // MORE TECH STOCKS (8 markets)
  {
    id: 'amd-300-2025',
    title: 'AMD stock will reach $300+ with AI chip competition?',
    category: 'Stocks',
    yesOdds: 47,
    noOdds: 53,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 56, stance: 'NO' },
      { name: 'ChatGPT', confidence: 53, stance: 'NO' },
      { name: 'Manus', confidence: 50, stance: 'YES' }
    ],
    description: 'Market AMD reach $300 with competition AI chips against NVIDIA and data center growth.'
  },
  {
    id: 'palantir-100-2025',
    title: 'Palantir will reach $100+ with AI government contracts?',
    category: 'Stocks',
    yesOdds: 38,
    noOdds: 62,
    volume: 876000,
    topAIConfidence: [
      { name: 'Perplexity', confidence: 67, stance: 'NO' },
      { name: 'Claude', confidence: 64, stance: 'NO' },
      { name: 'Mistral', confidence: 61, stance: 'NO' }
    ],
    description: 'Prediction PLTR rally with expanded government AI contracts and commercial sector growth.'
  },
  {
    id: 'snowflake-400-2025',
    title: 'Snowflake will reach $400+ with cloud data growth?',
    category: 'Stocks',
    yesOdds: 44,
    noOdds: 56,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 61, stance: 'NO' },
      { name: 'ChatGPT', confidence: 58, stance: 'NO' },
      { name: 'Manus', confidence: 55, stance: 'NO' }
    ],
    description: 'Market SNOW reach $400 with cloud data warehouse expansion and enterprise adoption.'
  },
  {
    id: 'arm-200-2025',
    title: 'ARM Holinngs will reach $200+ with AI chip licensing?',
    category: 'Stocks',
    yesOdds: 56,
    noOdds: 44,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 63, stance: 'YES' },
      { name: 'Mistral', confidence: 60, stance: 'YES' },
      { name: 'ChatGPT', confidence: 57, stance: 'YES' }
    ],
    description: 'Prediction ARM stock rally with AI chip architecture licensing and mobile processor dominance.'
  },
  {
    id: 'coinbase-500-2025',
    title: 'Coinbase will reach $500+ with crypto bull run 2025?',
    category: 'Stocks',
    yesOdds: 49,
    noOdds: 51,
    volume: 1456000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 54, stance: 'NO' },
      { name: 'Claude', confidence: 51, stance: 'NO' },
      { name: 'Perplexity', confidence: 48, stance: 'YES' }
    ],
    description: 'Market COIN rally with crypto bull run, institutional adoption, and Bitcoin ETF flows.'
  },
  {
    id: 'mongodb-700-2025',
    title: 'MongoDB will reach $700+ with AI database demand?',
    category: 'Stocks',
    yesOdds: 42,
    noOdds: 58,
    volume: 789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 63, stance: 'NO' },
      { name: 'Manus', confidence: 60, stance: 'NO' },
      { name: 'ChatGPT', confidence: 57, stance: 'NO' }
    ],
    description: 'Prediction MDB rally with AI applications driving database demand and cloud migration.'
  },
  {
    id: 'roblox-100-2025',
    title: 'Roblox will reach $100+ with metaverse adoption?',
    category: 'Stocks',
    yesOdds: 33,
    noOdds: 67,
    volume: 654000,
    topAIConfidence: [
      { name: 'Grok', confidence: 72, stance: 'NO' },
      { name: 'LLaMA', confidence: 69, stance: 'NO' },
      { name: 'Claude', confidence: 66, stance: 'NO' }
    ],
    description: 'Market RBLX reach $100 with metaverse platform growth and virtual economy expansion.'
  },
  {
    id: 'unity-80-2025',
    title: 'Unity Software will recover to $80+ after leadership change?',
    category: 'Stocks',
    yesOdds: 39,
    noOdds: 61,
    volume: 543000,
    topAIConfidence: [
      { name: 'Claude', confidence: 66, stance: 'NO' },
      { name: 'ChatGPT', confidence: 63, stance: 'NO' },
      { name: 'Mistral', confidence: 60, stance: 'NO' }
    ],
    description: 'Prediction Unity stock recovery with new management and game engine market stabilization.'
  },

  // MORE ENTERTAINMENT (6 markets)
  {
    id: 'deadpool3-2billion-2025',
    title: 'Deadpool 3 will gross $2+ billion worldwide in 2025?',
    category: 'Entertainment',
    yesOdds: 67,
    noOdds: 33,
    volume: 1234000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 74, stance: 'YES' },
      { name: 'Claude', confidence: 71, stance: 'YES' },
      { name: 'Manus', confidence: 68, stance: 'YES' }
    ],
    description: 'Prediction Deadpool 3 with Hugh Jackman achieve $2B box office with MCU debut.'
  },
  {
    id: 'spotify-sub-500m-2025',
    title: 'Spotify will reach 500 juta subscribers in 2025?',
    category: 'Entertainment',
    yesOdds: 58,
    noOdds: 42,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 65, stance: 'YES' },
      { name: 'Perplexity', confidence: 62, stance: 'YES' },
      { name: 'ChatGPT', confidence: 59, stance: 'YES' }
    ],
    description: 'Market Spotify reach 500M subs with global expansion and AI-powered recommendations.'
  },
  {
    id: 'disney-200-2025',
    title: 'Disney stock will reach $200+ with streaming turnaround?',
    category: 'Entertainment',
    yesOdds: 45,
    noOdds: 55,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 60, stance: 'NO' },
      { name: 'ChatGPT', confidence: 57, stance: 'NO' },
      { name: 'Mistral', confidence: 54, stance: 'NO' }
    ],
    description: 'Prediction DIS rally with Disney+ profitability and theme park recovery growth.'
  },
  {
    id: 'tiktok-ban-2025',
    title: 'TikTok will in-ban completely in US in 2025?',
    category: 'Entertainment',
    yesOdds: 31,
    noOdds: 69,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'NO' },
      { name: 'Perplexity', confidence: 71, stance: 'NO' },
      { name: 'ChatGPT', confidence: 68, stance: 'NO' }
    ],
    description: 'Market tentang TikTok ban probability with national security concerns vs user backlash.'
  },
  {
    id: 'youtube-premium-200m-2025',
    title: 'YouTube Premium will reach 200M subscribers in 2025?',
    category: 'Entertainment',
    yesOdds: 52,
    noOdds: 48,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 57, stance: 'YES' },
      { name: 'ChatGPT', confidence: 54, stance: 'YES' },
      { name: 'Manus', confidence: 51, stance: 'YES' }
    ],
    description: 'Prediction YouTube Premium growth with ad-blocker crackdown and exclusive content.'
  },
  {
    id: 'warner-bros-40-2025',
    title: 'Warner Bros Discovery will reach $40+ with debt reduction?',
    category: 'Entertainment',
    yesOdds: 37,
    noOdds: 63,
    volume: 654000,
    topAIConfidence: [
      { name: 'Grok', confidence: 68, stance: 'NO' },
      { name: 'LLaMA', confidence: 65, stance: 'NO' },
      { name: 'Claude', confidence: 62, stance: 'NO' }
    ],
    description: 'Market WBD stock recovery with debt paydown and streaming service optimization.'
  },

  // MORE SPORTS (6 markets)
  {
    id: 'mbappe-ballon-dor-2025',
    title: 'Kylian Mbappe will win Ballon d\'Or 2025?',
    category: 'Sports',
    yesOdds: 58,
    noOdds: 42,
    volume: 1234000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 65, stance: 'YES' },
      { name: 'Claude', confidence: 62, stance: 'YES' },
      { name: 'Manus', confidence: 59, stance: 'YES' }
    ],
    description: 'Prediction Mbappe will win Ballon d\'Or with performance in Real Madrid and World Cup qualifiers.'
  },
  {
    id: 'curry-50-3pointers-2025',
    title: 'Stephen Curry will make 50+ threes in single game 2025?',
    category: 'Sports',
    yesOdds: 12,
    noOdds: 88,
    volume: 789000,
    topAIConfidence: [
      { name: 'Grok', confidence: 93, stance: 'NO' },
      { name: 'LLaMA', confidence: 90, stance: 'NO' },
      { name: 'ChatGPT', confidence: 87, stance: 'NO' }
    ],
    description: 'Market Curry breaking his own record with 50+ three-pointers in satu game NBA.'
  },
  {
    id: 'ronaldo-1000-goals-2025',
    title: 'Cristiano Ronaldo will reach 1,000 career goals in 2025?',
    category: 'Sports',
    yesOdds: 73,
    noOdds: 27,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 81, stance: 'YES' },
      { name: 'ChatGPT', confidence: 78, stance: 'YES' },
      { name: 'Perplexity', confidence: 75, stance: 'YES' }
    ],
    description: 'Prediction Ronaldo reach milestone 1,000 goals with form in Al-Nassr and Portugal.'
  },
  {
    id: 'verstappen-4th-title-2025',
    title: 'Max Verstappen will win F1 championship #4 in 2025?',
    category: 'Sports',
    yesOdds: 71,
    noOdds: 29,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 78, stance: 'YES' },
      { name: 'Mistral', confidence: 75, stance: 'YES' },
      { name: 'ChatGPT', confidence: 72, stance: 'YES' }
    ],
    description: 'Market Verstappen mendominasi F1 2025 with Red Bull RB21 and experience advantage.'
  },
  {
    id: 'olympics-2025-china-1st-2025',
    title: 'China will finish #1 in medal count Olympics 2025?',
    category: 'Sports',
    yesOdds: 44,
    noOdds: 56,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 61, stance: 'NO' },
      { name: 'ChatGPT', confidence: 58, stance: 'NO' },
      { name: 'Perplexity', confidence: 55, stance: 'NO' }
    ],
    description: 'Prediction China vs USA in medal count Olympics 2025 with home field advantage considerations.'
  },
  {
    id: 'novak-25th-slam-2025',
    title: 'Novak Djokovic will win Grand Slam #25 in 2025?',
    category: 'Sports',
    yesOdds: 42,
    noOdds: 58,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 63, stance: 'NO' },
      { name: 'ChatGPT', confidence: 60, stance: 'NO' },
      { name: 'Manus', confidence: 57, stance: 'NO' }
    ],
    description: 'Market Djokovic extending GOAT legacy with 25th Grand Slam title at age 38.'
  },

  // MORE ECONOMY (6 markets)
  {
    id: 'china-gdp-5percent-2025',
    title: 'China GDP growth will exceed 5% in 2025?',
    category: 'Economy',
    yesOdds: 61,
    noOdds: 39,
    volume: 1456000,
    topAIConfidence: [
      { name: 'Claude', confidence: 68, stance: 'YES' },
      { name: 'Perplexity', confidence: 65, stance: 'YES' },
      { name: 'ChatGPT', confidence: 62, stance: 'YES' }
    ],
    description: 'Prediction China GDP growth >5% with economic stimulus and property sector recovery.'
  },
  {
    id: 'japan-rate-hike-2025',
    title: 'Bank of Japan will raise interest rates above 1% in 2025?',
    category: 'Economy',
    yesOdds: 34,
    noOdds: 66,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 71, stance: 'NO' },
      { name: 'Mistral', confidence: 68, stance: 'NO' },
      { name: 'ChatGPT', confidence: 65, stance: 'NO' }
    ],
    description: 'Market BoJ policy normalization with rate hike significant setelah decades of low rates.'
  },
  {
    id: 'eu-recession-2025',
    title: 'European Union will experience recession in 2025?',
    category: 'Economy',
    yesOdds: 28,
    noOdds: 72,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 77, stance: 'NO' },
      { name: 'Perplexity', confidence: 74, stance: 'NO' },
      { name: 'ChatGPT', confidence: 71, stance: 'NO' }
    ],
    description: 'Prediction EU recession probability with energy crisis resolution and ECB policy effects.'
  },
  {
    id: 'turkey-inflation-15-2025',
    title: 'Turkey inflation will drop below 15% by end of 2025?',
    category: 'Economy',
    yesOdds: 46,
    noOdds: 54,
    volume: 789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 59, stance: 'NO' },
      { name: 'ChatGPT', confidence: 56, stance: 'NO' },
      { name: 'Mistral', confidence: 53, stance: 'NO' }
    ],
    description: 'Market Turkey inflation control with central bank policy normalization and lira stability.'
  },
  {
    id: 'india-gdp-8percent-2025',
    title: 'Inina GDP growth will reach 8%+ in 2025?',
    category: 'Economy',
    yesOdds: 52,
    noOdds: 48,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 57, stance: 'YES' },
      { name: 'Perplexity', confidence: 54, stance: 'YES' },
      { name: 'ChatGPT', confidence: 51, stance: 'YES' }
    ],
    description: 'Prediction India GDP growth acceleration with infrastructure investment and manufacturing growth.'
  },
  {
    id: 'brics-currency-2025',
    title: 'BRICS will launch common currency alternative in 2025?',
    category: 'Economy',
    yesOdds: 19,
    noOdds: 81,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 86, stance: 'NO' },
      { name: 'ChatGPT', confidence: 83, stance: 'NO' },
      { name: 'Mistral', confidence: 80, stance: 'NO' }
    ],
    description: 'Market BRICS common currency initiative as USD alternative with political coordination challenges.'
  },

  // MORE GAMING (6 markets)
  {
    id: 'call-of-duty-2025-biggest',
    title: 'Call of Duty 2025 will be biggest game launch ever?',
    category: 'Gaming',
    yesOdds: 54,
    noOdds: 46,
    volume: 1234000,
    topAIConfidence: [
      { name: 'ChatGPT', confidence: 61, stance: 'YES' },
      { name: 'Claude', confidence: 58, stance: 'YES' },
      { name: 'Manus', confidence: 55, stance: 'YES' }
    ],
    description: 'Prediction CoD 2025 breaking launch records with next-gen graphics and cross-platform integration.'
  },
  {
    id: 'fortnite-1billion-users-2025',
    title: 'Fortnite will reach 1 billion registered users in 2025?',
    category: 'Gaming',
    yesOdds: 47,
    noOdds: 53,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 58, stance: 'NO' },
      { name: 'ChatGPT', confidence: 55, stance: 'NO' },
      { name: 'Perplexity', confidence: 52, stance: 'NO' }
    ],
    description: 'Market Fortnite reaching 1B users with metaverse expansion and creator economy growth.'
  },
  {
    id: 'sony-ps6-announce-2025',
    title: 'Sony will oficially announce PlayStation 6 in 2025?',
    category: 'Gaming',
    yesOdds: 23,
    noOdds: 77,
    volume: 876000,
    topAIConfidence: [
      { name: 'Grok', confidence: 82, stance: 'NO' },
      { name: 'LLaMA', confidence: 79, stance: 'NO' },
      { name: 'Claude', confidence: 76, stance: 'NO' }
    ],
    description: 'Prediction Sony announcing PS6 development even though PS5 still in prime lifecycle.'
  },
  {
    id: 'microsoft-xbox-handheld-2025',
    title: 'Microsoft will launch Xbox handheld device in 2025?',
    category: 'Gaming',
    yesOdds: 41,
    noOdds: 59,
    volume: 654000,
    topAIConfidence: [
      { name: 'Claude', confidence: 64, stance: 'NO' },
      { name: 'ChatGPT', confidence: 61, stance: 'NO' },
      { name: 'Mistral', confidence: 58, stance: 'NO' }
    ],
    description: 'Market Xbox handheld competition with Steam Deck and Nintendo Switch dominance.'
  },
  {
    id: 'pokemon-go-2billion-2025',
    title: 'Pokemon GO will hit $2 billion revenue milestone in 2025?',
    category: 'Gaming',
    yesOdds: 36,
    noOdds: 64,
    volume: 543000,
    topAIConfidence: [
      { name: 'Claude', confidence: 69, stance: 'NO' },
      { name: 'ChatGPT', confidence: 66, stance: 'NO' },
      { name: 'Manus', confidence: 63, stance: 'NO' }
    ],
    description: 'Prediction Pokemon GO lifetime revenue achieve $2B with AR improvements and new features.'
  },
  {
    id: 'league-of-legends-worlds-2025',
    title: 'LoL World Championship 2025 will have 200M+ peak viewers?',
    category: 'Gaming',
    yesOdds: 58,
    noOdds: 42,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 65, stance: 'YES' },
      { name: 'ChatGPT', confidence: 62, stance: 'YES' },
      { name: 'Perplexity', confidence: 59, stance: 'YES' }
    ],
    description: 'Market LoL Worlds viewership record with global audience growth and production quality improvements.'
  },

  // MORE CLIMATE & TECH (10 markets)
  {
    id: 'tesla-10million-cars-2025',
    title: 'Tesla will deliver 10 million cars annually before end of 2025?',
    category: 'Climate',
    yesOdds: 18,
    noOdds: 82,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 87, stance: 'NO' },
      { name: 'ChatGPT', confidence: 84, stance: 'NO' },
      { name: 'Mistral', confidence: 81, stance: 'NO' }
    ],
    description: 'Prediction Tesla production scale-up achieve 10M annual deliveries with gigafactory expansion.'
  },
  {
    id: 'solar-cost-1cent-2025',
    title: 'Solar energy cost will below in below $0.01/kWh in 2025?',
    category: 'Climate',
    yesOdds: 34,
    noOdds: 66,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 71, stance: 'NO' },
      { name: 'Perplexity', confidence: 68, stance: 'NO' },
      { name: 'Mistral', confidence: 65, stance: 'NO' }
    ],
    description: 'Market solar cost breakthrough in below 1 cent per kWh with technology improvements.'
  },
  {
    id: 'chatgpt-10-billion-users-2025',
    title: 'ChatGPT will reach 10 billion total users in 2025?',
    category: 'Tech',
    yesOdds: 29,
    noOdds: 71,
    volume: 1789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 76, stance: 'NO' },
      { name: 'ChatGPT', confidence: 73, stance: 'NO' },
      { name: 'Manus', confidence: 70, stance: 'NO' }
    ],
    description: 'Prediction ChatGPT user growth reach 10B with global expansion and integration everywhere.'
  },
  {
    id: 'spacex-mars-mission-2025',
    title: 'SpaceX will successfully launch first Mars mission in 2025?',
    category: 'Tech',
    yesOdds: 31,
    noOdds: 69,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'NO' },
      { name: 'ChatGPT', confidence: 71, stance: 'NO' },
      { name: 'Perplexity', confidence: 68, stance: 'NO' }
    ],
    description: 'Market SpaceX Mars mission timeline with Starship development and technical challenges.'
  },

  // FINAL 16 MARKETS TO REACH 100 TOTAL

  // POLITICS & WORLD EVENTS (8 markets)
  {
    id: 'trump-2024-win-2025',
    title: 'Donald Trump will win US Presidential Election 2024?',
    category: 'Politics',
    yesOdds: 52,
    noOdds: 48,
    volume: 2345000,
    topAIConfidence: [
      { name: 'Claude', confidence: 57, stance: 'YES' },
      { name: 'ChatGPT', confidence: 54, stance: 'YES' },
      { name: 'Perplexity', confidence: 51, stance: 'YES' }
    ],
    description: 'Prediction Trump vs Biden rematch with polling data and swing states analysis.'
  },
  {
    id: 'ukraine-war-end-2025',
    title: 'Ukraine-Russia war will end with peace deal in 2025?',
    category: 'Politics',
    yesOdds: 34,
    noOdds: 66,
    volume: 1987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 71, stance: 'NO' },
      { name: 'Perplexity', confidence: 68, stance: 'NO' },
      { name: 'ChatGPT', confidence: 65, stance: 'NO' }
    ],
    description: 'Market about Ukraine conflict resolution with diplomatic negotiations and geopolitical factors.'
  },
  {
    id: 'xi-putin-meeting-2025',
    title: 'Xi Jinping and Putin will meet bilaterally 5+ times in 2025?',
    category: 'Politics',
    yesOdds: 67,
    noOdds: 33,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'YES' },
      { name: 'ChatGPT', confidence: 71, stance: 'YES' },
      { name: 'Mistral', confidence: 68, stance: 'YES' }
    ],
    description: 'Prediction intensity of China-Russia diplomatic relations with frequency of leader meetings.'
  },
  {
    id: 'nato-new-member-2025',
    title: 'NATO will accept new member country in 2025?',
    category: 'Politics',
    yesOdds: 41,
    noOdds: 59,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 64, stance: 'NO' },
      { name: 'Perplexity', confidence: 61, stance: 'NO' },
      { name: 'ChatGPT', confidence: 58, stance: 'NO' }
    ],
    description: 'Market NATO expansion with potential candidates and geopolitical considerations.'
  },
  {
    id: 'taiwan-election-2025',
    title: 'Taiwan will elect pro-independence president in 2025?',
    category: 'Politics',
    yesOdds: 58,
    noOdds: 42,
    volume: 1567000,
    topAIConfidence: [
      { name: 'Claude', confidence: 65, stance: 'YES' },
      { name: 'ChatGPT', confidence: 62, stance: 'YES' },
      { name: 'Perplexity', confidence: 59, stance: 'YES' }
    ],
    description: 'Prediction Taiwan presidential election outcome with China relations implications.'
  },
  {
    id: 'iran-nuclear-deal-2025',
    title: 'Iran will return to nuclear compliance deal in 2025?',
    category: 'Politics',
    yesOdds: 29,
    noOdds: 71,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 76, stance: 'NO' },
      { name: 'Perplexity', confidence: 73, stance: 'NO' },
      { name: 'ChatGPT', confidence: 70, stance: 'NO' }
    ],
    description: 'Market Iran nuclear program compliance with international sanctions and diplomatic pressure.'
  },
  {
    id: 'india-china-border-2025',
    title: 'Will India-China resolve border dispute peacefully in 2025?',
    category: 'Politics',
    yesOdds: 22,
    noOdds: 78,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 83, stance: 'NO' },
      { name: 'ChatGPT', confidence: 80, stance: 'NO' },
      { name: 'Mistral', confidence: 77, stance: 'NO' }
    ],
    description: 'Prediction resolution of Ladakh border tensions with diplomatic breakthrough possibilities.'
  },
  {
    id: 'brexit-rejoin-talk-2025',
    title: 'UK will oficially start EU rejoin inscussions in 2025?',
    category: 'Politics',
    yesOdds: 15,
    noOdds: 85,
    volume: 789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 90, stance: 'NO' },
      { name: 'ChatGPT', confidence: 87, stance: 'NO' },
      { name: 'Perplexity', confidence: 84, stance: 'NO' }
    ],
    description: 'Market UK rejoining EU discussions with public sentiment and political feasibility analysis.'
  },

  // FINAL MIXED CATEGORIES (8 markets)
  {
    id: 'openai-ipo-2025',
    title: 'OpenAI will go public with IPO in 2025?',
    category: 'Tech',
    yesOdds: 43,
    noOdds: 57,
    volume: 1789000,
    topAIConfidence: [
      { name: 'Claude', confidence: 62, stance: 'NO' },
      { name: 'ChatGPT', confidence: 59, stance: 'NO' },
      { name: 'Mistral', confidence: 56, stance: 'NO' }
    ],
    description: 'Prediction OpenAI IPO timeline with valuation expectations and market readiness.'
  },
  {
    id: 'vr-headset-50m-2025',
    title: 'Will VR headsets sell 50M+ units globally in 2025?',
    category: 'Tech',
    yesOdds: 35,
    noOdds: 65,
    volume: 1234000,
    topAIConfidence: [
      { name: 'Claude', confidence: 70, stance: 'NO' },
      { name: 'ChatGPT', confidence: 67, stance: 'NO' },
      { name: 'Manus', confidence: 64, stance: 'NO' }
    ],
    description: 'Market VR adoption rate with Meta Quest, Apple Vision Pro, and competitor growth.'
  },
  {
    id: 'autonomous-taxi-commercial-2025',
    title: 'Will full autonomous taxis be commercially available in 5+ cities?',
    category: 'Tech',
    yesOdds: 48,
    noOdds: 52,
    volume: 1456000,
    topAIConfidence: [
      { name: 'Claude', confidence: 57, stance: 'NO' },
      { name: 'ChatGPT', confidence: 54, stance: 'NO' },
      { name: 'Perplexity', confidence: 51, stance: 'NO' }
    ],
    description: 'Prediction Level 5 autonomous taxi deployment with Waymo, Cruise, and Tesla expansion.'
  },
  {
    id: 'lab-grown-meat-mainstream-2025',
    title: 'Will lab-grown meat be available in mainstream supermarkets 2025?',
    category: 'Climate',
    yesOdds: 31,
    noOdds: 69,
    volume: 876000,
    topAIConfidence: [
      { name: 'Claude', confidence: 74, stance: 'NO' },
      { name: 'Perplexity', confidence: 71, stance: 'NO' },
      { name: 'ChatGPT', confidence: 68, stance: 'NO' }
    ],
    description: 'Market cultured meat mainstream availability with cost reduction and regulatory approval.'
  },
  {
    id: 'nuclear-fusion-breakthrough-2025',
    title: 'Will nuclear fusion achieve net energy gain breakthrough in 2025?',
    category: 'Tech',
    yesOdds: 37,
    noOdds: 63,
    volume: 1123000,
    topAIConfidence: [
      { name: 'Claude', confidence: 68, stance: 'NO' },
      { name: 'Mistral', confidence: 65, stance: 'NO' },
      { name: 'Perplexity', confidence: 62, stance: 'NO' }
    ],
    description: 'Prediction fusion energy milestone with ITER, NIF, and private fusion companies progress.'
  },
  {
    id: 'brain-computer-interface-fda-2025',
    title: 'Will brain-computer interface get FDA approval for consumers?',
    category: 'Tech',
    yesOdds: 24,
    noOdds: 76,
    volume: 987000,
    topAIConfidence: [
      { name: 'Claude', confidence: 81, stance: 'NO' },
      { name: 'ChatGPT', confidence: 78, stance: 'NO' },
      { name: 'Manus', confidence: 75, stance: 'NO' }
    ],
    description: 'Market Neuralink and competitor BCI devices getting FDA approval for consumer use.'
  },
  {
    id: 'quantum-computer-1million-qubits-2025',
    title: 'Will quantum computer achieve 1 million+ qubits in 2025?',
    category: 'Tech',
    yesOdds: 19,
    noOdds: 81,
    volume: 654000,
    topAIConfidence: [
      { name: 'Claude', confidence: 86, stance: 'NO' },
      { name: 'ChatGPT', confidence: 83, stance: 'NO' },
      { name: 'Mistral', confidence: 80, stance: 'NO' }
    ],
    description: 'Prediction quantum computing scale-up with IBM, Google, and IonQ qubit milestones.'
  },
  {
    id: 'longevity-drug-fda-approval-2025',
    title: 'Will anti-aging longevity drug get FDA approval in 2025?',
    category: 'Tech',
    yesOdds: 16,
    noOdds: 84,
    volume: 543000,
    topAIConfidence: [
      { name: 'Claude', confidence: 89, stance: 'NO' },
      { name: 'ChatGPT', confidence: 86, stance: 'NO' },
      { name: 'Perplexity', confidence: 83, stance: 'NO' }
    ],
    description: 'Market anti-aging therapeutic approval with senolytic drugs and longevity research breakthroughs.'
  }
];

// Generate 100 specific 2025 markets
export const generateMarkets = (): Market[] => {
  return markets2025;
};
