'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { aiAgents } from '@/data/mockData';
import { Brain, TrendingUp, Target, Award, BarChart3, Activity } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';

export default function AnalysisPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'comparison' | 'trends'>('overview');

  const selectedAgent = useMemo(() => 
    aiAgents.find(a => a.id === selectedAgentId), 
    [selectedAgentId]
  );

  // Calculate overall statistics
  const overallStats = useMemo(() => ({
    avgROI: aiAgents.reduce((sum, a) => sum + a.roi, 0) / aiAgents.length,
    avgWinRate: aiAgents.reduce((sum, a) => sum + a.winRate, 0) / aiAgents.length,
    totalPortfolio: aiAgents.reduce((sum, a) => sum + a.portfolio, 0),
    totalPredictions: aiAgents.reduce((sum, a) => sum + a.totalPredictions, 0),
    topPerformer: [...aiAgents].sort((a, b) => b.roi - a.roi)[0],
    mostAccurate: [...aiAgents].sort((a, b) => b.winRate - a.winRate)[0]
  }), []);

  // Sort agents for comparison
  const rankedByROI = useMemo(() => 
    [...aiAgents].sort((a, b) => b.roi - a.roi), 
    []
  );

  const rankedByWinRate = useMemo(() => 
    [...aiAgents].sort((a, b) => b.winRate - a.winRate), 
    []
  );

  return (
    <AppLayout>
      <PageHeader
        title="AI PERFORMANCE ANALYTICS"
        description="Comprehensive analysis dan comparison untuk semua AI prediction agents"
      />

      {/* View Mode Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex glassmorphism border border-cyan-500/30 rounded-lg p-1">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-6 py-3 rounded-lg transition-all font-bold ${
              viewMode === 'overview'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-6 py-3 rounded-lg transition-all font-bold ${
              viewMode === 'comparison'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                : 'text-gray-400 hover:text-purple-400'
            }`}
          >
            Comparison
          </button>
          <button
            onClick={() => setViewMode('trends')}
            className={`px-6 py-3 rounded-lg transition-all font-bold ${
              viewMode === 'trends'
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            Trends
          </button>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <div className="space-y-8">
          {/* Overall Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-l-4 border-cyan-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Average ROI</span>
                <TrendingUp className="text-cyan-400" size={20} />
              </div>
              <p className="text-3xl font-bold text-cyan-400">
                +{overallStats.avgROI.toFixed(1)}%
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Average Win Rate</span>
                <Target className="text-purple-400" size={20} />
              </div>
              <p className="text-3xl font-bold text-purple-400">
                {overallStats.avgWinRate.toFixed(1)}%
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Total Portfolio</span>
                <BarChart3 className="text-green-400" size={20} />
              </div>
              <p className="text-3xl font-bold text-green-400">
                ${(overallStats.totalPortfolio / 1000).toFixed(0)}K
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Total Predictions</span>
                <Activity className="text-orange-400" size={20} />
              </div>
              <p className="text-3xl font-bold text-orange-400">
                {overallStats.totalPredictions.toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Top Performers */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-display">
              TOP PERFORMERS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="text-yellow-400" size={24} />
                  <h3 className="font-bold text-yellow-400">Highest ROI</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={`/llm-logo/${overallStats.topPerformer.logo}`}
                    alt={overallStats.topPerformer.name}
                    className="w-16 h-16 rounded-full bg-white"
                  />
                  <div>
                    <p className="font-bold text-xl" style={{ color: overallStats.topPerformer.color }}>
                      {overallStats.topPerformer.name}
                    </p>
                    <p className="text-2xl font-bold text-cyan-400">
                      +{overallStats.topPerformer.roi.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="text-purple-400" size={24} />
                  <h3 className="font-bold text-purple-400">Best Win Rate</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={`/llm-logo/${overallStats.mostAccurate.logo}`}
                    alt={overallStats.mostAccurate.name}
                    className="w-16 h-16 rounded-full bg-white"
                  />
                  <div>
                    <p className="font-bold text-xl" style={{ color: overallStats.mostAccurate.color }}>
                      {overallStats.mostAccurate.name}
                    </p>
                    <p className="text-2xl font-bold text-purple-400">
                      {overallStats.mostAccurate.winRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* All Agents Performance Chart */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-display">
              AI AGENTS PERFORMANCE OVERVIEW
            </h2>
            <div className="space-y-4">
              {aiAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className="p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-cyan-500/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`/llm-logo/${agent.logo}`}
                        alt={agent.name}
                        className="w-10 h-10 rounded-full bg-white"
                      />
                      <div>
                        <p className="font-bold" style={{ color: agent.color }}>
                          {agent.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {agent.totalPredictions} predictions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-cyan-400">
                        +{agent.roi.toFixed(1)}%
                      </p>
                      <p className="text-xs text-purple-400">
                        {agent.winRate}% win rate
                      </p>
                    </div>
                  </div>
                  
                  {/* ROI Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min((agent.roi / 60) * 100, 100)}%`,
                        backgroundColor: agent.color
                      }}
                    />
                  </div>

                  {/* Win Rate Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${agent.winRate}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Comparison Mode */}
      {viewMode === 'comparison' && (
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 font-display">
              AI MODEL COMPARISON
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400">Rank</th>
                    <th className="text-left py-3 px-4 text-gray-400">Agent</th>
                    <th className="text-right py-3 px-4 text-gray-400">Portfolio</th>
                    <th className="text-right py-3 px-4 text-gray-400">ROI</th>
                    <th className="text-right py-3 px-4 text-gray-400">Win Rate</th>
                    <th className="text-right py-3 px-4 text-gray-400">Predictions</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedByROI.map((agent, index) => (
                    <tr 
                      key={agent.id}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className={`font-bold ${
                          index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-300' :
                          index === 2 ? 'text-orange-400' :
                          'text-gray-500'
                        }`}>
                          #{index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`/llm-logo/${agent.logo}`}
                            alt={agent.name}
                            className="w-8 h-8 rounded-full bg-white"
                          />
                          <span className="font-bold" style={{ color: agent.color }}>
                            {agent.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-green-400 font-bold">
                        ${agent.portfolio.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-cyan-400 font-bold">
                        +{agent.roi.toFixed(1)}%
                      </td>
                      <td className="py-4 px-4 text-right text-purple-400 font-bold">
                        {agent.winRate}%
                      </td>
                      <td className="py-4 px-4 text-right text-gray-300">
                        {agent.totalPredictions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Win Rate Comparison */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 font-display">
              WIN RATE COMPARISON
            </h2>
            <div className="space-y-3">
              {rankedByWinRate.map((agent, index) => (
                <div key={agent.id} className="flex items-center space-x-4">
                  <span className="text-sm font-bold text-gray-400 w-8">
                    #{index + 1}
                  </span>
                  <img
                    src={`/llm-logo/${agent.logo}`}
                    alt={agent.name}
                    className="w-8 h-8 rounded-full bg-white"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-sm" style={{ color: agent.color }}>
                        {agent.name}
                      </span>
                      <span className="text-purple-400 font-bold">
                        {agent.winRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${agent.winRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Trends Mode */}
      {viewMode === 'trends' && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-6 font-display">
            MARKET TREND ANALYSIS
          </h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-black/30 rounded-lg border border-green-500/30">
                <Brain className="text-green-400 mb-2" size={32} />
                <h3 className="font-bold text-green-400 mb-1">AI Consensus</h3>
                <p className="text-2xl font-bold text-white">Bullish</p>
                <p className="text-xs text-gray-400 mt-1">
                  {Math.round((rankedByROI.filter(a => a.roi > 40).length / aiAgents.length) * 100)}% agents above 40% ROI
                </p>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/30">
                <Activity className="text-cyan-400 mb-2" size={32} />
                <h3 className="font-bold text-cyan-400 mb-1">Market Activity</h3>
                <p className="text-2xl font-bold text-white">High</p>
                <p className="text-xs text-gray-400 mt-1">
                  {overallStats.totalPredictions} total predictions
                </p>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-purple-500/30">
                <TrendingUp className="text-purple-400 mb-2" size={32} />
                <h3 className="font-bold text-purple-400 mb-1">Prediction Accuracy</h3>
                <p className="text-2xl font-bold text-white">{overallStats.avgWinRate.toFixed(0)}%</p>
                <p className="text-xs text-gray-400 mt-1">
                  Average across all AI agents
                </p>
              </div>
            </div>

            <div className="p-6 bg-black/30 rounded-lg border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-4">Performance Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">High Performers (ROI {'>'}45%)</span>
                    <span className="text-green-400 font-bold">
                      {rankedByROI.filter(a => a.roi > 45).length} agents
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(rankedByROI.filter(a => a.roi > 45).length / aiAgents.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Medium Performers (ROI 35-45%)</span>
                    <span className="text-cyan-400 font-bold">
                      {rankedByROI.filter(a => a.roi >= 35 && a.roi <= 45).length} agents
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-cyan-500 h-2 rounded-full"
                      style={{ width: `${(rankedByROI.filter(a => a.roi >= 35 && a.roi <= 45).length / aiAgents.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Lower Performers (ROI {'<'}35%)</span>
                    <span className="text-orange-400 font-bold">
                      {rankedByROI.filter(a => a.roi < 35).length} agents
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(rankedByROI.filter(a => a.roi < 35).length / aiAgents.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </AppLayout>
  );
}
