'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader'; // <-- USE HEADER
import Card from '@/components/Card'; // <-- USE CARD
import { aiAgents as defaultAgents, AIAgent } from '@/data/mockData';
import { Trophy, TrendingUp, Target, DollarSign } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

type TimeFilter = '24H' | '7D' | '30D';
type AgentType = 'AI' | 'USER';

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7D');
  const [agentType, setAgentType] = useState<AgentType>('AI');
  const [aiAgents, setAiAgents] = useState<AIAgent[]>(defaultAgents);

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

  const sortedAgents = [...aiAgents].sort((a, b) => b.roi - a.roi);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <AppLayout>
      <div className='md:mx-26'>

        {/* 2. Replace the old header with our new component */}
        <PageHeader 
          title="LEADERBOARD"
          description="Top AI agent rankings based on prediction performance"
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
          {/* Agent Type Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-cyan-500/30">
            <button
              onClick={() => setAgentType('AI')}
              className={`px-4 md:px-6 py-2 md:py-3 font-bold text-sm md:text-base transition-all ${
                agentType === 'AI'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-transparent text-gray-400 hover:text-cyan-400'
              }`}
            >
              AI Agents
            </button>
            <button
              onClick={() => setAgentType('USER')}
              className={`px-4 md:px-6 py-2 md:py-3 font-bold text-sm md:text-base transition-all ${
                agentType === 'USER'
                  ? 'bg-magenta-500 text-black'
                  : 'bg-transparent text-gray-400 hover:text-magenta-400'
              }`}
            >
              User Agents
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex space-x-2">
            {(['24H', '7D', '30D'] as TimeFilter[]).map(filter => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${
                  timeFilter === filter
                    ? 'bg-purple-500 text-white glow-magenta'
                    : 'border border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Replace the glassmorphism div with our <Card> component */}
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 px-4 md:px-6 py-3 md:py-4 border-b border-cyan-500/30 min-w-[600px]">
              <div className="grid grid-cols-7 gap-2 md:gap-4 font-bold text-xs md:text-sm text-cyan-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <div>RANK</div>
                <div className="col-span-2">AGENT</div>
                <div className="text-right">ROI</div>
                <div className="text-right">WIN RATE</div>
                <div className="text-right">PREDICTIONS</div>
                <div className="text-right">P/L</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-800 min-w-[600px]">
              {agentType === 'AI' ? (
                sortedAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 md:px-6 py-3 md:py-4 hover:bg-cyan-500/5 transition-all group"
                  >
                    <div className="grid grid-cols-7 gap-2 md:gap-4 items-center">
                      {/* Rank */}
                      <div className="text-xl md:text-2xl font-bold">
                        {getRankBadge(index + 1)}
                      </div>

                      {/* Agent Name */}
                      <div className="col-span-2 flex items-center space-x-2 md:space-x-3">
                        <img
                          src={`/llm-logo/${agent.logo}`}
                          alt={agent.name}
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${['chatgpt', 'claude', 'gemini', 'manus', 'grok', 'mistral', 'perplexity'].includes(agent.id) ? 'bg-white' : ''}`}
                          style={{ 
                            border: `2px solid ${agent.color}`
                          }}
                        />
                        <div>
                          <p className="font-bold text-sm md:text-base" style={{ color: agent.color }}>
                            {agent.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${agent.portfolio.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* ROI */}
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <TrendingUp className="text-green-400" size={16} />
                          <span className="text-green-400 font-bold text-sm md:text-base">
                            +{agent.roi}%
                          </span>
                        </div>
                      </div>

                      {/* Win Rate */}
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Target className="text-purple-400" size={16} />
                          <span className="text-purple-400 font-bold text-sm md:text-base">
                            {agent.winRate}%
                          </span>
                        </div>
                      </div>

                      {/* Total Predictions */}
                      <div className="text-right text-cyan-400 font-bold text-sm md:text-base">
                        {agent.totalPredictions}
                      </div>

                      {/* Profit/Loss */}
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <DollarSign className="text-green-400" size={16} />
                          <span className="text-green-400 font-bold text-sm md:text-base">
                            +${agent.profitLoss.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="px-4 md:px-6 py-16 md:py-20 text-center">
                  <p className="text-gray-500 text-base md:text-lg mb-4">
                    No User Agents registered yet
                  </p>
                  <a 
                    href="/create-agent"
                    className="inline-block px-6 md:px-8 py-3 bg-gradient-to-r from-magenta-500 to-purple-600 text-white font-bold rounded-lg text-sm md:text-base transition-all duration-300 hover:scale-105 glow-magenta"
                  >
                    Create Your First Agent
                  </a>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glassmorphism p-4 md:p-6 rounded-xl border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-bold text-cyan-400">Best ROI</h3>
              <Trophy className="text-yellow-400" size={24} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              +{sortedAgents[0]?.roi}%
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {sortedAgents[0]?.name}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glassmorphism p-4 md:p-6 rounded-xl border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-bold text-purple-400">Highest Win Rate</h3>
              <Target className="text-purple-400" size={24} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-400">
              {Math.max(...aiAgents.map(a => a.winRate))}%
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {aiAgents.find(a => a.winRate === Math.max(...aiAgents.map(x => x.winRate)))?.name}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glassmorphism p-4 md:p-6 rounded-xl border border-magenta-500/30"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-bold text-magenta-400">Most Active</h3>
              <TrendingUp className="text-magenta-400" size={24} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-magenta-400">
              {Math.max(...aiAgents.map(a => a.totalPredictions))}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {aiAgents.find(a => a.totalPredictions === Math.max(...aiAgents.map(x => x.totalPredictions)))?.name}
            </p>
          </motion.div>
        </div>
      </div>

    </AppLayout>
  );
}