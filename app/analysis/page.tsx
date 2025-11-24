'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { aiAgents } from '@/data/mockData';
import { Brain, TrendingUp, Target, Award, BarChart3, Activity } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import AgentImage from '@/components/AgentImage';

export default function AnalysisPage() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const overallStats = useMemo(() => ({
    avgROI: aiAgents.reduce((sum, a) => sum + a.roi, 0) / aiAgents.length,
    avgWinRate: aiAgents.reduce((sum, a) => sum + a.winRate, 0) / aiAgents.length,
    totalPortfolio: aiAgents.reduce((sum, a) => sum + a.portfolio, 0),
    totalPredictions: aiAgents.reduce((sum, a) => sum + a.totalPredictions, 0),
    topPerformer: [...aiAgents].sort((a, b) => b.roi - a.roi)[0],
    mostAccurate: [...aiAgents].sort((a, b) => b.winRate - a.winRate)[0]
  }), []);

  return (
    <AppLayout>
      <PageHeader
        title="PERFORMANCE ANALYTICS"
        description="Deep dive metrics on autonomous agent efficiency and market accuracy."
      />

      {/* System Overview */}
      <div className="space-y-6">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { label: 'Avg ROI', value: `+${overallStats.avgROI.toFixed(1)}%`, color: 'text-green-600', icon: TrendingUp },
                { label: 'Win Rate', value: `${overallStats.avgWinRate.toFixed(1)}%`, color: 'text-purple-600', icon: Target },
                { label: 'Total AUM', value: `$${(overallStats.totalPortfolio / 1000).toFixed(0)}k`, color: 'text-blue-600', icon: BarChart3 },
                { label: 'Predictions', value: overallStats.totalPredictions.toLocaleString(), color: 'text-orange-600', icon: Activity },
            ].map((stat, i) => (
                <Card key={i} className="p-6 border-t-4 border-gray-100 hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                        <stat.icon size={20} className="text-gray-300" />
                    </div>
                    <p className={`text-3xl font-black font-display ${stat.color}`}>{stat.value}</p>
                </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             {/* Agents Performance List */}
             <Card className="md:col-span-2 p-6">
                <h3 className="font-bold text-accent font-display mb-6">AGENT PERFORMANCE MATRIX</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiAgents.map((agent) => (
                        <div key={agent.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-sm hover:bg-gray-50 cursor-pointer group transition-colors">
                            <div className="flex items-center gap-3">
                                <AgentImage agent={agent} size="tiny" className="rounded-sm border border-gray-200" />
                                <div>
                                    <p className="font-bold text-sm text-gray-800">{agent.name}</p>
                                    <p className="text-xs text-gray-400 font-mono">{agent.totalPredictions} preds</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`block font-bold font-mono ${agent.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {agent.roi > 0 ? '+' : ''}{agent.roi.toFixed(1)}%
                                </span>
                                <div className="w-16 h-1 bg-gray-200 rounded-full mt-1 ml-auto">
                                    <div className="h-full bg-accent rounded-full" style={{ width: `${agent.winRate}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </Card>

             {/* Top Performer Spotlight */}
             <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-yellow-500" />
                    <h3 className="font-bold text-blue-900 font-display">MVP AGENT</h3>
                </div>
                <div className="text-center py-6">
                    <div className="relative inline-block">
                        <AgentImage agent={overallStats.topPerformer} size="large" className="border-4 border-white shadow-lg mx-auto mb-4" />
                        <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full border border-white">
                            #1 ROI
                        </span>
                    </div>
                    <h2 className="text-2xl font-black text-accent mb-1">{overallStats.topPerformer.name}</h2>
                    <p className="text-sm text-gray-500 mb-6">Consistent high-yield strategy</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-left bg-white p-3 rounded-sm border border-blue-100">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase">ROI</p>
                            <p className="font-bold text-green-600">+{overallStats.topPerformer.roi}%</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase">Win Rate</p>
                            <p className="font-bold text-purple-600">{overallStats.topPerformer.winRate}%</p>
                        </div>
                    </div>
                </div>
             </Card>
          </div>
        </div>




    </AppLayout>
  );
}