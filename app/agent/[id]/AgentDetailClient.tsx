'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, Target, Activity, Award, Calendar, Clock } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import Card from '@/components/Card';
import { aiAgents, AIAgent } from '@/data/mockData';

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

type Agent = AIAgent | UserAgent;

export default function AgentDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Try to find in AI agents first
    let foundAgent: Agent | undefined = aiAgents.find(a => a.id === id);

    // If not found in AI agents, try user agents from localStorage
    if (!foundAgent) {
      try {
        const userAgents: UserAgent[] = JSON.parse(localStorage.getItem('userAgents') || '[]');
        foundAgent = userAgents.find(a => a.id === id);
      } catch (error) {
        console.error('Error loading user agents:', error);
      }
    }

    setAgent(foundAgent || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Activity className="animate-spin mx-auto mb-4 text-primary" size={48} />
            <p className="text-gray-500 font-mono">RETRIEVING AGENT DATA...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!agent) {
    return (
      <AppLayout>
        <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-300 rounded-sm">
          <h2 className="text-2xl font-black font-display text-accent mb-4">AGENT NOT FOUND</h2>
          <p className="text-gray-500 mb-8">The requested agent ID does not exist in the registry.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-primary text-white font-bold rounded-sm pixel-button hover:shadow-lg transition-all"
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      </AppLayout>
    );
  }

  const isAIAgent = agent.type === 'ai';
  const agentColor = isAIAgent ? (agent as AIAgent).color : '#1E293B'; // Default Navy for users
  
  // Updated Image Logic with Placeholder
  const agentLogo = isAIAgent 
    ? `/llm-logo/${(agent as AIAgent).logo}` 
    : (agent as UserAgent).avatar || '/llm-logo/agent-placeholder.png';

  // Performance history simulation (last 30 days)
  const performanceHistory = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    roi: agent.roi + (Math.random() - 0.5) * 20,
    portfolio: agent.portfolio + (Math.random() - 0.5) * 2000
  }));

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center space-x-2 text-gray-500 hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm uppercase tracking-wider">Back to Arena</span>
        </button>

        {/* Agent Header Card */}
        <Card className="mb-8 p-8 border-t-4" style={{ borderTopColor: agentColor }}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <img
                src={agentLogo}
                alt={agent.name}
                className={`w-32 h-32 rounded-sm bg-white p-1 shadow-lg`}
                style={{ border: `4px solid ${agentColor}` }}
              />
              <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                <span className={`text-xs font-black uppercase tracking-wider ${isAIAgent ? 'text-blue-600' : 'text-purple-600'}`}>
                  {isAIAgent ? 'SYS.AI' : 'USER.AG'}
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl font-black font-display mb-2 text-accent">
                  {agent.name}
                </h1>
                {!isAIAgent && (agent as UserAgent).description && (
                  <p className="text-gray-500 text-lg">"{(agent as UserAgent).description}"</p>
                )}
              </div>

              {/* Agent Tags */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {!isAIAgent ? (
                  <>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-sm text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                      <Target size={14} />
                      {(agent as UserAgent).personality}
                    </span>
                    <span className="px-4 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-sm text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                      <Activity size={14} />
                      {(agent as UserAgent).baseModel}
                    </span>
                    <span className="px-4 py-1.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-sm text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                      <Calendar size={14} />
                      Since {new Date((agent as UserAgent).createdAt).toLocaleDateString()}
                    </span>
                  </>
                ) : (
                  <span className="px-4 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-sm text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <Award size={14} />
                    Official System Node
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Portfolio Value</span>
              <DollarSign className="text-green-500 bg-green-50 rounded-sm p-1" size={24} />
            </div>
            <p className="text-3xl font-black font-display text-green-600">
              ${agent.portfolio.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono">TOTAL ASSETS</p>
          </Card>

          <Card className="p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">ROI</span>
              <TrendingUp className="text-blue-500 bg-blue-50 rounded-sm p-1" size={24} />
            </div>
            <p className="text-3xl font-black font-display text-blue-600">
              +{agent.roi.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono">ALL TIME RETURN</p>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Win Rate</span>
              <Target className="text-purple-500 bg-purple-50 rounded-sm p-1" size={24} />
            </div>
            <p className="text-3xl font-black font-display text-purple-600">
              {agent.winRate}%
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono">ACCURACY SCORE</p>
          </Card>

          <Card className="p-6 border-l-4 border-orange-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Activity</span>
              <Activity className="text-orange-500 bg-orange-50 rounded-sm p-1" size={24} />
            </div>
            <p className="text-3xl font-black font-display text-orange-500">
              {agent.totalPredictions}
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono">TOTAL TRADES</p>
          </Card>
        </div>

        {/* Performance Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6 h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold font-display text-accent">PERFORMANCE HISTORY</h2>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-sm">30 DAYS</span>
              </div>
              
              <div className="relative h-64 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 800 250">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line
                      key={i}
                      x1="0" y1={50 + i * 50}
                      x2="800" y2={50 + i * 50}
                      stroke="#e5e7eb" strokeWidth="1"
                    />
                  ))}

                  {/* Area Fill */}
                  <path
                    d={`M 0 250 L ${performanceHistory.map((p, i) => {
                        const x = (i / 29) * 800;
                        const normalizedROI = ((p.roi - (agent.roi - 20)) / 40) * 200;
                        const y = 250 - normalizedROI - 50;
                        return `${x},${y}`;
                      }).join(' ')} L 800 250 Z`}
                    fill={`${agentColor}10`} // 10% opacity fill
                  />

                  {/* Line Graph */}
                  <polyline
                    points={performanceHistory
                      .map((p, i) => {
                        const x = (i / 29) * 800;
                        const normalizedROI = ((p.roi - (agent.roi - 20)) / 40) * 200;
                        const y = 250 - normalizedROI - 50;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    stroke={agentColor}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                
                {/* X-Axis Labels */}
                <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
                  <span>Day 1</span>
                  <span>Day 15</span>
                  <span>Day 30</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity List */}
          <div className="lg:col-span-1">
            <Card className="p-0 h-full overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-bold font-display text-accent">RECENT TRADES</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((_, index) => {
                  const predictions = [
                    { title: 'Bitcoin ATH $150K+', result: 'WIN', confidence: 85, profit: '+$124.50' },
                    { title: 'Tesla > $500', result: 'LOSS', confidence: 72, profit: '-$50.00' },
                    { title: 'Apple Market Cap', result: 'WIN', confidence: 78, profit: '+$89.20' },
                    { title: 'ETH 2.0 Upgrade', result: 'PENDING', confidence: 68, profit: '---' },
                    { title: 'NVIDIA Earnings', result: 'WIN', confidence: 91, profit: '+$210.00' }
                  ];
                  const pred = predictions[index];
                  
                  return (
                    <div key={index} className="p-4 hover:bg-blue-50/30 transition-colors group">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-800 text-sm">{pred.title}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
                          pred.result === 'WIN' ? 'bg-green-100 text-green-700' :
                          pred.result === 'LOSS' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {pred.result}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{Math.floor(Math.random() * 12) + 1}h ago</span>
                        </div>
                        <span className={`font-mono font-bold ${
                          pred.result === 'WIN' ? 'text-green-600' : 
                          pred.result === 'LOSS' ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {pred.profit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}