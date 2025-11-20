'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, Target, Activity, Award, Calendar } from 'lucide-react';
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
            <Activity className="animate-spin mx-auto mb-4 text-cyan-400" size={48} />
            <p className="text-gray-400">Loading agent data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!agent) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Agent Not Found</h2>
          <p className="text-gray-400 mb-6">The agent you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </AppLayout>
    );
  }

  const isAIAgent = agent.type === 'ai';
  const agentColor = isAIAgent ? (agent as AIAgent).color : '#ff00ff';
  const agentLogo = isAIAgent 
    ? `/llm-logo/${(agent as AIAgent).logo}` 
    : (agent as UserAgent).avatar || '/llm-logo/user-default.svg';

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
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Agent Header */}
        <Card className="mb-8 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={agentLogo}
              alt={agent.name}
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${isAIAgent ? 'bg-white' : ''}`}
              style={{ border: `4px solid ${agentColor}` }}
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                <h1 
                  className="text-3xl md:text-4xl font-bold font-display"
                  style={{ color: agentColor }}
                >
                  {agent.name}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isAIAgent 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-magenta-500/20 text-magenta-400'
                }`}>
                  {isAIAgent ? 'AI AGENT' : 'USER AGENT'}
                </span>
              </div>
              
              {!isAIAgent && (agent as UserAgent).description && (
                <p className="text-gray-400 mb-4">{(agent as UserAgent).description}</p>
              )}

              {!isAIAgent && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold">
                    {(agent as UserAgent).personality}
                  </span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold">
                    {(agent as UserAgent).baseModel}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>Created: {new Date((agent as UserAgent).createdAt).toLocaleDateString()}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4" style={{ borderLeftColor: agentColor }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Portfolio Value</span>
              <DollarSign className="text-green-400" size={20} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              ${agent.portfolio.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Assets</p>
          </Card>

          <Card className="p-6 border-l-4" style={{ borderLeftColor: agentColor }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">ROI</span>
              <TrendingUp className="text-cyan-400" size={20} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-cyan-400">
              +{agent.roi.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Return on Investment</p>
          </Card>

          <Card className="p-6 border-l-4" style={{ borderLeftColor: agentColor }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Win Rate</span>
              <Target className="text-purple-400" size={20} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-400">
              {agent.winRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Successful Predictions</p>
          </Card>

          <Card className="p-6 border-l-4" style={{ borderLeftColor: agentColor }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Predictions</span>
              <Activity className="text-orange-400" size={20} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-orange-400">
              {agent.totalPredictions}
            </p>
            <p className="text-xs text-gray-500 mt-1">All Time</p>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6 font-display">
            PERFORMANCE HISTORY (30 DAYS)
          </h2>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 250">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={i}
                  x1="50"
                  y1={50 + i * 50}
                  x2="780"
                  y2={50 + i * 50}
                  stroke="#333"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}

              {/* Performance line */}
              <polyline
                points={performanceHistory
                  .map((p, i) => {
                    const x = 50 + (i / 29) * 730;
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

              {/* Axis labels */}
              <text x="25" y="60" fill="#888" fontSize="12">High</text>
              <text x="25" y="150" fill="#888" fontSize="12">Mid</text>
              <text x="25" y="240" fill="#888" fontSize="12">Low</text>
              
              <text x="50" y="240" fill="#888" fontSize="12">Day 1</text>
              <text x="400" y="240" fill="#888" fontSize="12" textAnchor="middle">Day 15</text>
              <text x="750" y="240" fill="#888" fontSize="12" textAnchor="end">Day 30</text>
            </svg>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6 font-display">
            RECENT ACTIVITY
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => {
              const predictions = [
                { title: 'Bitcoin ATH $150K+ Q4 2025', result: 'WIN', confidence: 85 },
                { title: 'Tesla Stock $500+ per share', result: 'LOSS', confidence: 72 },
                { title: 'Apple $4T Market Cap', result: 'WIN', confidence: 78 },
                { title: 'ETH $5K before August', result: 'PENDING', confidence: 68 },
                { title: 'NVIDIA Stock Split 2025', result: 'WIN', confidence: 91 }
              ];
              const pred = predictions[index];
              
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <p className="font-bold text-white mb-1">{pred.title}</p>
                    <p className="text-xs text-gray-400">
                      Confidence: {pred.confidence}% • {Math.floor(Math.random() * 24) + 1}h ago
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pred.result === 'WIN' ? 'bg-green-500/20 text-green-400' :
                    pred.result === 'LOSS' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {pred.result}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
