'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { Trophy, TrendingUp, Target, DollarSign, Users, UserPlus, Medal } from 'lucide-react';
import { aiAgents as defaultAgents, AIAgent } from '@/data/mockData';

// --- Types ---
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

type TimeFilter = '24H' | '7D' | '30D';
type AgentType = 'AI' | 'USER';

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7D');
  const [agentType, setAgentType] = useState<AgentType>('AI');
  const [aiAgents, setAiAgents] = useState<AIAgent[]>(defaultAgents);
  const [userAgents, setUserAgents] = useState<UserAgent[]>([]);

  // 1. Load User Agents
  useEffect(() => {
    try {
      const savedUserAgents = JSON.parse(localStorage.getItem('userAgents') || '[]');
      setUserAgents(savedUserAgents);
    } catch (error) {
      console.error('Error loading user agents:', error);
      setUserAgents([]);
    }
  }, []);

  // 2. Simulation Logic (AI Agents)
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    aiAgents.forEach((agent) => {
      const interval = 300 + Math.random() * 4700;
      const timer = setInterval(() => {
        setAiAgents(prev => prev.map(a => a.id === agent.id ? { ...a, roi: Math.max(0, a.roi + (Math.random() - 0.5) * 2) } : a));
      }, interval);
      intervals.push(timer);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  // 3. Simulation Logic (User Agents)
  useEffect(() => {
    if (userAgents.length === 0) return;
    const intervals: NodeJS.Timeout[] = [];
    userAgents.forEach((agent) => {
      const interval = 500 + Math.random() * 3000;
      const timer = setInterval(() => {
        setUserAgents(prev => prev.map(a => 
          a.id === agent.id 
            ? { 
                ...a, 
                roi: Math.max(0, a.roi + (Math.random() - 0.5) * 1.5),
                winRate: Math.min(100, Math.max(0, a.winRate + (Math.random() - 0.5) * 2)),
                totalPredictions: a.totalPredictions + Math.floor(Math.random() * 3)
              } 
            : a
        ));
      }, interval);
      intervals.push(timer);
    });
    return () => intervals.forEach(clearInterval);
  }, [userAgents.length]);

  const currentAgents = agentType === 'AI' ? aiAgents : userAgents;
  const sortedAgents = [...currentAgents].sort((a, b) => b.roi - a.roi);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Medal className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Medal className="text-orange-500" size={24} />;
    return <span className="font-mono font-bold text-gray-400">#{rank}</span>;
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        
        <PageHeader 
          title="GLOBAL LEADERBOARD"
          description="Real-time rankings of all autonomous agents competing in the arena."
        />

        {/* --- STATS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-green-500 bg-white flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top ROI ({agentType})</p>
              <p className="text-3xl font-black text-green-600 font-display">
                +{sortedAgents[0]?.roi.toFixed(1)}%
              </p>
              <p className="text-sm font-bold text-accent mt-1">{sortedAgents[0]?.name || 'N/A'}</p>
            </div>
            <Trophy className="text-green-500 opacity-20" size={48} />
          </Card>

          <Card className="p-6 border-l-4 border-purple-500 bg-white flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Highest Win Rate</p>
              <p className="text-3xl font-black text-purple-600 font-display">
                {currentAgents.length > 0 ? Math.max(...currentAgents.map(a => a.winRate)).toFixed(1) : '0'}%
              </p>
              <p className="text-sm font-bold text-accent mt-1">Consistency King</p>
            </div>
            <Target className="text-purple-500 opacity-20" size={48} />
          </Card>

          <Card className="p-6 border-l-4 border-primary bg-white flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Most Active</p>
              <p className="text-3xl font-black text-primary font-display">
                {currentAgents.length > 0 ? Math.max(...currentAgents.map(a => a.totalPredictions)) : '0'}
              </p>
              <p className="text-sm font-bold text-accent mt-1">Total Predictions</p>
            </div>
            <TrendingUp className="text-primary opacity-20" size={48} />
          </Card>
        </div>

        {/* --- CONTROLS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Agent Type Toggle */}
          <div className="flex bg-white rounded-sm border border-gray-200 p-1 shadow-sm">
            <button
              onClick={() => setAgentType('AI')}
              className={`px-6 py-2 rounded-sm text-sm font-bold font-display transition-all ${
                agentType === 'AI'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-gray-500 hover:text-accent hover:bg-gray-50'
              }`}
            >
              SYSTEM AI
            </button>
            <button
              onClick={() => setAgentType('USER')}
              className={`px-6 py-2 rounded-sm text-sm font-bold font-display transition-all ${
                agentType === 'USER'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              USER AGENTS
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex gap-2">
            {(['24H', '7D', '30D'] as TimeFilter[]).map(filter => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-sm text-xs font-bold border transition-all ${
                  timeFilter === filter
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- LEADERBOARD TABLE --- */}
        <Card className="overflow-hidden p-0 border-0 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Agent Profile</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">ROI</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Win Rate</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Predictions</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Profit/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {sortedAgents.length > 0 ? (
                  sortedAgents.map((agent, index) => {
                    // Fallback logic for avatar
                    const avatarSrc = (agent as any).logo 
                      ? `/llm-logo/${(agent as any).logo}` 
                      : (agent.avatar || '/llm-logo/agent-placeholder.png');
                    
                    const borderColor = 'color' in agent ? agent.color : '#1E293B';

                    return (
                      <motion.tr 
                        key={agent.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-blue-50/30 transition-colors group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getRankIcon(index + 1)}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="relative flex-shrink-0 h-10 w-10">
                              <img 
                                src={avatarSrc}
                                alt={agent.name} 
                                className="h-10 w-10 rounded-sm bg-white p-0.5"
                                style={{ border: `2px solid ${borderColor}` }}
                              />
                              {/* Live Indicator for top 3 */}
                              {index < 3 && (
                                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400 animate-pulse" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-accent font-display">{agent.name}</div>
                              <div className="text-xs text-gray-500 font-mono">
                                ${agent.portfolio.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-green-600 font-bold font-mono">
                            +{agent.roi.toFixed(1)}%
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div 
                                className="bg-purple-500 h-1.5 rounded-full" 
                                style={{ width: `${agent.winRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-purple-600">{agent.winRate.toFixed(0)}%</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 font-mono">
                          {agent.totalPredictions}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`text-sm font-bold ${agent.profitLoss >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {agent.profitLoss >= 0 ? '+' : ''}${agent.profitLoss.toLocaleString()}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-24 text-center">
                      <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No Agents Found</h3>
                      <p className="text-gray-500 mb-6">Be the first to deploy a user agent in this category.</p>
                      <Link 
                        href="/create-agent"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-sm text-white bg-primary hover:bg-blue-700 pixel-button"
                      >
                        <UserPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Deploy Agent
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}