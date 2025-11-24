'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aiAgents as defaultAgents, generatePredictionFeeds, PredictionFeed, AIAgent } from '@/data/mockData';
import { TrendingUp, Activity, DollarSign, Users, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import our new System Components
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card'; // Make sure you created Card.tsx
import AppLayout from '@/components/AppLayout';
import AgentImage from '@/components/AgentImage';

// UserAgent type definition
interface UserAgent {
  id: string;
  name: string;
  avatar?: string;
  portfolio: number;
  roi: number;
  winRate: number;
  totalPredictions: number;
  profitLoss: number;
  type: 'user';
  personality: 'analytical' | 'risk-taker' | 'meme' | 'contrarian';
  baseModel: 'llama' | 'mistral' | 'gemini' | 'claude';
  capital: number;
  createdAt: string;
  isActive: boolean;
  userId: string;
  description?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [feeds, setFeeds] = useState<PredictionFeed[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [aiAgents, setAiAgents] = useState<AIAgent[]>(defaultAgents);
  const [userAgents, setUserAgents] = useState<UserAgent[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Set to false, we are using dummy data

  // Load user agents from localStorage
  useEffect(() => {
    try {
      const savedUserAgents = JSON.parse(localStorage.getItem('userAgents') || '[]');
      setUserAgents(savedUserAgents);
    } catch (error) {
      console.error('Error loading user agents:', error);
      setUserAgents([]);
    }
  }, []);

  // Check if user just created an agent and highlight it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const newAgentId = urlParams.get('newAgent');
      if (newAgentId) {
        // Clear the URL parameter
        window.history.replaceState({}, '', '/dashboard');
        
        // Highlight the new agent
        setTimeout(() => {
          setSelectedAgent(newAgentId);
        }, 500);
      }
    }
  }, []);
  
  // Dynamic ROI simulation with individual agent timers
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    aiAgents.forEach((agent, index) => {
      // Random interval between 0.3 to 2 seconds for each agent
      const interval = 300 + Math.random() * 4700; // 300ms to 2s
      
      const timer = setInterval(() => {
        setAiAgents(prevAgents => 
          prevAgents.map(a => 
            a.id === agent.id 
              ? { ...a, roi: Math.max(0, a.roi + (Math.random() - 0.5) * 2) }
              : a
          )
        );
      }, interval);
      
      intervals.push(timer);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);
  
  // This logic is good, it simulates the live feed
  useEffect(() => {
    setFeeds(generatePredictionFeeds());

    const interval = setInterval(() => {
      setFeeds(prev => {
        const agent = aiAgents[Math.floor(Math.random() * aiAgents.length)];
        const enhancedPredictions = [
          { pred: 'Bitcoin ATH $150K+ surge', reason: 'ETF inflows, institutional adoption' },
          { pred: 'Tesla FSD Level 5 achieved', reason: 'Neural network breakthrough, safety milestone' },
          { pred: 'Fed rate cut 0.5% emergency', reason: 'Economic indicators, market pressure' },
          { pred: 'NVIDIA earnings beat 25%', reason: 'AI demand explosion, data center growth' },
          { pred: 'Gold breaks $2,500 resistance', reason: 'Geopolitical tension, dollar weakness' },
          { pred: 'Apple Vision Pro mainstream', reason: 'Price drop, killer app launched' },
          { pred: 'Ethereum scaling success', reason: 'Layer 2 adoption, DeFi TVL growth' },
          { pred: 'Meta AI chatbot viral', reason: 'Integration across platforms, user engagement' },
          { pred: 'Microsoft Azure 30% growth', reason: 'Enterprise migration, AI workloads' },
          { pred: 'Climate tipping point hit', reason: 'Temperature records, emission levels' }
        ];
        
        const selectedPred = enhancedPredictions[Math.floor(Math.random() * enhancedPredictions.length)];
        
        const newFeed: PredictionFeed = {
          id: `feed-${Date.now()}`,
          aiName: agent.name,
          prediction: selectedPred.pred,
          confidence: Math.floor(Math.random() * 35) + 65,
          result: 'PENDING',
          amount: 0.01,
          timestamp: new Date().toISOString(),
          color: agent.color,
          reasoning: selectedPred.reason
        };

        return [newFeed, ...prev.slice(0, 59)];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [aiAgents]);

  return (
    <div className='md:mx-26'>
      <AppLayout>
        
        {/* 1. Use our Reusable Page Header */}
        <PageHeader
          title="AI AGENTS ARENA"
          description="Monitor the real-time battle between 8 autonomous AI prediction agents"
        />

        {/* 2. AI Agents Grid */}
        <section className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <Users className="text-primary" size={24} />
              <h2 className="text-xl md:text-2xl font-display font-bold text-primary">
                ACTIVE AGENTS
              </h2>
              <div className="flex space-x-2 text-xs">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded-full">
                  {aiAgents.length} AI
                </span>
                <span className="px-2 py-1 bg-accent/20 text-accent rounded-full">
                  {userAgents.length} User
                </span>
              </div>
            </div>
            <Link 
              href="/create-agent"
              className="flex items-center space-x-2 px-4 py-2 bg-[#111E36] hover:bg-[#111E36]/90 text-white font-bold rounded-lg text-sm hover:scale-105 transition-all pixel-button"
            >
              <UserPlus size={16} />
              <span>Create Agent</span>
            </Link>
          </div>

          {/* System AI Agents Section */}
          {aiAgents.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-primary mb-4 font-display">SYSTEM AI AGENTS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {aiAgents.map((agent, index) => (
                  <Card
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => router.push(`/agent/${agent.id}`)}
                    className="cursor-pointer group hover:scale-105 hover:border-primary border-l-4 p-4 md:p-6 card-hover pixel-border"
                    style={{ borderLeftColor: agent.color, borderColor: `${agent.color}40` }}
                  >
                    <div className="text-center">
                      <AgentImage
                        agent={agent}
                        borderColor={agent.color}
                        className="mb-3 md:mb-4"
                      />
                      <h3 className="font-display font-bold text-base md:text-lg mb-2" style={{ color: agent.color }}>
                        {agent.name}
                      </h3>
                      <div className="space-y-1 text-sm md:text-base">
                        <div className="flex justify-between">
                          <span className="text-muted">Portfolio:</span>
                          <span className="text-green-400 font-bold">${agent.portfolio.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">ROI:</span>
                          <span className={`font-bold ${agent.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>+{agent.roi.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Win Rate:</span>
                          <span className="text-accent font-bold">{agent.winRate}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* User Created Agents Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-accent mb-4 font-display">USER CREATED AGENTS</h3>
              {userAgents.length === 0 && (
                <Link 
                  href="/create-agent"
                  className="text-accent hover:text-accent-dark text-sm font-bold flex items-center space-x-1"
                >
                  <UserPlus size={16} />
                  <span>Create Your First Agent</span>
                </Link>
              )}
            </div>
            
            {userAgents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {userAgents.map((agent, index) => (
                  <Card
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: selectedAgent === agent.id ? 1.05 : 1,
                      boxShadow: selectedAgent === agent.id ? '0 0 20px rgba(255, 0, 255, 0.5)' : 'none'
                    }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => router.push(`/agent/${agent.id}`)}
                    className="cursor-pointer group hover:scale-105 hover:border-accent border-l-4 p-4 md:p-6 card-hover pixel-border"
                    style={{ 
                      borderLeftColor: '#1E293B', 
                      borderColor: `${selectedAgent === agent.id ? '#1E293B' : '#1E293B40'}`,
                      animation: selectedAgent === agent.id ? 'pulse 2s infinite' : 'none'
                    }}
                  >
                    <div className="text-center">
                      <div className="relative">
                        <AgentImage
                          agent={agent}
                          borderColor="#1E293B"
                          className="mb-3 md:mb-4"
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <h3 className="font-display font-bold text-base md:text-lg mb-2" style={{ color: '#1E293B' }}>
                        {agent.name}
                        {selectedAgent === agent.id && (
                          <span className="text-xs text-accent ml-2 animate-pulse">✨ NEW!</span>
                        )}
                      </h3>
                      <div className="space-y-1 text-sm md:text-base">
                        <div className="flex justify-between">
                          <span className="text-muted">Portfolio:</span>
                          <span className="text-green-400 font-bold">${agent.portfolio.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">ROI:</span>
                          <span className={`font-bold ${agent.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>+{agent.roi.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Win Rate:</span>
                          <span className="text-accent font-bold">{agent.winRate}%</span>
                        </div>
                        <div className="text-xs text-muted mt-1 capitalize">
                          {agent.personality} • {agent.baseModel}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glassmorphism rounded-xl border border-accent/30">
                <UserPlus className="mx-auto text-accent mb-4" size={48} />
                <h4 className="text-lg font-bold text-accent mb-2">No User Agents Yet</h4>
                <p className="text-muted mb-4">Create your first AI agent to start competing!</p>
                <Link 
                  href="/create-agent"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#111E36] hover:bg-[#111E36]/90 text-white font-bold rounded-lg hover:scale-105 transition-all pixel-button"
                >
                  <UserPlus size={16} />
                  <span>Create Your First Agent</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 4. Main Dashboard Grid (12-col layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Live Prediction Feed (7 columns) */}
          <div className="lg:col-span-7">
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-display font-bold text-primary">
                  LIVE PREDICTION FEED
                </h2>
                <Activity className="text-green-600 animate-pulse" size={24} />
              </div>

              <div className="space-y-1 h-[400px] md:h-[600px] overflow-y-auto px-4 md:px-6 pb-4 md:pb-6 rounded-b-lg border-t border-neutral-light">
                <div className="font-mono text-green-600 text-xs mb-4 border-b border-green-600/30 pb-2">
                  ┌─ LIVE PREDICTION TERMINAL ─ {new Date().toLocaleTimeString()} ─┐
                </div>
                {feeds.map((feed) => (
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`text-xs leading-relaxed ${
                      feed.result === 'WIN' ? 'text-green-600' :
                      feed.result === 'LOSS' ? 'text-red-500' :
                      'text-yellow-600'
                    }`}
                    style={{ textShadow: '0 0 10px currentColor', fontFamily: 'monospace' }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-muted">[{new Date(feed.timestamp).toLocaleTimeString()}]</span>
                      <span className="text-primary font-bold w-12 text-right">{feed.aiName.substring(0, 6)}</span>
                      <span className="text-foreground">|</span>
                      <span className="flex-1 truncate">{feed.prediction}</span>
                      <span className="text-accent">{feed.confidence}%</span>
                      <span className="text-foreground">|</span>
                      <span className={`w-8 text-center font-bold`}>
                        {feed.result === 'WIN' ? '✓' : feed.result === 'LOSS' ? '✗' : '⧖'}
                      </span>
                      <span className="text-muted">$0.01</span>
                    </div>
                    <div className="text-muted text-xs ml-16 md:ml-24 mt-1 italic truncate">
                      └─ {feed.reasoning}
                    </div>
                  </motion.div>
                ))}
                <div className="font-mono text-green-600 text-xs mt-4 border-t border-green-600/30 pt-2">
                  └─ {feeds.length} active predictions ─ Live feed updating ─┘
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Stats (5 columns) */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            
            {/* Portfolio Summary Card */}
            <Card className="border-neutral-light/30 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-neutral-dark">
                TOTAL STATS
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted text-base">Total Portfolio</span>
                    <DollarSign className="text-green-600" size={16} />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    ${aiAgents.reduce((sum, a) => sum + a.portfolio, 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted text-base">Avg ROI</span>
                    <TrendingUp className="text-primary" size={16} />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-primary">
                    +{(aiAgents.reduce((sum, a) => sum + a.roi, 0) / aiAgents.length).toFixed(1)}%
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted text-base">Total Predictions</span>
                    <Activity className="text-accent" size={16} />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-accent">
                    {aiAgents.reduce((sum, a) => sum + a.totalPredictions, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Top Performers Card */}
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-primary">
                TOP PERFORMERS
              </h3>
              <div className="space-y-2 md:space-y-3">
                {[...aiAgents]
                  .sort((a, b) => b.roi - a.roi)
                  .slice(0, 3)
                  .map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AgentImage
                          agent={agent}
                          size="tiny"
                          className={['chatgpt', 'claude', 'gemini', 'manus', 'grok', 'mistral', 'perplexity'].includes(agent.id) ? 'bg-white' : ''}
                        />
                        <span className="font-bold text-sm md:text-base">{agent.name}</span>
                      </div>
                      <span className="text-green-600 font-bold text-sm md:text-base">
                        +{agent.roi}%
                      </span>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-0 overflow-hidden">
              <Link 
                href="/create-agent"
                className="block w-full py-3 md:py-4 bg-[#111E36] hover:bg-[#111E36]/90 text-white font-bold text-center text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-card pixel-button"
              >
                DEPLOY YOUR AGENT
              </Link>
            </Card>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}