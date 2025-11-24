'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Bot, Brain, Zap, TrendingUp, Cpu, Activity } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import Card from '@/components/Card';

// Type definitions (Same as before)
type PersonalityType = 'analytical' | 'risk-taker' | 'meme' | 'contrarian';
type BaseModelType = 'llama' | 'mistral' | 'gemini' | 'claude';

export default function CreateAgentPage() {
  const router = useRouter();
  const [agentName, setAgentName] = useState('');
  const [personality, setPersonality] = useState<PersonalityType>('analytical');
  const [baseModel, setBaseModel] = useState<BaseModelType>('llama');
  const [capital, setCapital] = useState(100);
  const [isDeploying, setIsDeploying] = useState(false);

  // Static Data (Same as before)
  const personalities = [
    { id: 'analytical' as const, name: 'Analytical', description: 'Strict risk management.', icon: Brain, color: 'text-blue-600', border: 'border-blue-600' },
    { id: 'risk-taker' as const, name: 'Risk Taker', description: 'High risk, high reward.', icon: Zap, color: 'text-orange-600', border: 'border-orange-600' },
    { id: 'meme' as const, name: 'Meme Trader', description: 'Viral sentiment focus.', icon: TrendingUp, color: 'text-pink-600', border: 'border-pink-600' },
    { id: 'contrarian' as const, name: 'Contrarian', description: 'Bets against consensus.', icon: Bot, color: 'text-purple-600', border: 'border-purple-600' }
  ];

  const baseModels = [
    { id: 'llama' as const, name: 'LLaMA 3', description: 'Balanced' },
    { id: 'mistral' as const, name: 'Mistral Large', description: 'Fast execution' },
    { id: 'gemini' as const, name: 'Gemini 1.5', description: 'Multimodal' },
    { id: 'claude' as const, name: 'Claude 3.5', description: 'Reasoning' }
  ];

  const handleDeploy = async () => {
    if (!agentName.trim()) { alert('Please enter agent name!'); return; }
    setIsDeploying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Logic to save agent (Same as original)
    const agentId = `user-${Date.now()}`;
    const newAgent = {
        id: agentId, name: agentName.trim(), avatar: '/llm-logo/agent_placeholder.png',
        portfolio: capital, roi: 0, winRate: 0, totalPredictions: 0, profitLoss: 0, type: 'user',
        personality, baseModel, capital, createdAt: new Date().toISOString(), isActive: true, userId: 'user'
    };
    try {
        const existing = JSON.parse(localStorage.getItem('userAgents') || '[]');
        localStorage.setItem('userAgents', JSON.stringify([...existing, newAgent]));
        router.push(`/dashboard?newAgent=${agentId}`);
    } catch (e) { console.error(e); setIsDeploying(false); }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-black font-display text-accent mb-2">DEPLOY NEW AGENT</h1>
            <p className="text-muted">Configure your autonomous trading bot parameters.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Configuration Form */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Identity */}
                <Card className="p-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">1. Identity Configuration</h3>
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-accent">Agent Designation (Name)</label>
                        <input
                            type="text"
                            placeholder="e.g. ALPHA_PREDICTOR_V1"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono text-sm transition-all"
                        />
                    </div>
                </Card>

                {/* 2. Personality Engine */}
                <Card className="p-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">2. Trading Personality</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {personalities.map((p) => (
                            <div
                                key={p.id}
                                onClick={() => setPersonality(p.id)}
                                className={`cursor-pointer p-4 rounded-sm border-2 transition-all hover:shadow-md ${
                                    personality === p.id ? `${p.border} bg-gray-50` : 'border-gray-100 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <p.icon size={20} className={p.color} />
                                    <span className={`font-bold font-display ${p.color}`}>{p.name}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-snug">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 3. Core Model & Capital */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">3. Foundation Model</h3>
                        <div className="space-y-2">
                            {baseModels.map((m) => (
                                <div
                                    key={m.id}
                                    onClick={() => setBaseModel(m.id)}
                                    className={`cursor-pointer px-4 py-3 border rounded-sm flex justify-between items-center transition-all ${
                                        baseModel === m.id ? 'border-primary bg-blue-50/50' : 'border-gray-100 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className={`font-bold text-sm ${baseModel === m.id ? 'text-primary' : 'text-gray-600'}`}>{m.name}</span>
                                    {baseModel === m.id && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">4. Capital Allocation</h3>
                        <div className="text-center py-4">
                            <span className="text-4xl font-black font-display text-accent">${capital}</span>
                            <span className="text-sm text-gray-400 block mt-1">Initial Portfolio Value</span>
                        </div>
                        <input
                            type="range" min="50" max="1000" step="50"
                            value={capital}
                            onChange={(e) => setCapital(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-primary"
                        />
                        <div className="flex justify-between text-xs font-mono text-gray-400 mt-2">
                            <span>$50</span><span>$1,000</span>
                        </div>
                    </Card>
                </div>
            </div>

            {/* RIGHT COLUMN: Deployment Preview */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    <Card className="p-6 border-t-4 border-t-primary bg-white shadow-xl">
                        <h3 className="text-lg font-bold font-display text-accent mb-6 border-b border-gray-100 pb-4">
                            DEPLOYMENT SUMMARY
                        </h3>
                        
                        <div className="space-y-4 text-sm mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Designation</span>
                                <span className="font-bold font-mono text-accent text-right">{agentName || 'UNNAMED_UNIT'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Algorithm</span>
                                <span className="font-bold text-primary">{personalities.find(p => p.id === personality)?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Core Model</span>
                                <span className="font-bold text-purple-600 uppercase">{baseModel}</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-100">
                                <span className="font-bold text-gray-700">Total Capital</span>
                                <span className="font-black font-mono text-green-600 text-lg">${capital}.00</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDeploy}
                            disabled={isDeploying}
                            className={`w-full py-4 text-white font-bold font-display tracking-widest uppercase transition-all shadow-lg pixel-button ${
                                isDeploying ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-primary'
                            }`}
                        >
                            {isDeploying ? 'INITIALIZING...' : 'DEPLOY TO MAINNET'}
                        </button>

                        <p className="text-[10px] text-center text-gray-400 mt-4 px-4">
                            By deploying, you authorize this agent to execute autonomous transactions via x402 ledger.
                        </p>
                    </Card>

                    {/* Features List */}
                    <div className="grid grid-cols-1 gap-3">
                         <div className="bg-blue-50 p-3 rounded-sm border border-blue-100 flex items-center gap-3">
                            <Bot size={16} className="text-blue-600" />
                            <span className="text-xs font-bold text-blue-800">24/7 Autonomous Operation</span>
                         </div>
                         <div className="bg-purple-50 p-3 rounded-sm border border-purple-100 flex items-center gap-3">
                            <Zap size={16} className="text-purple-600" />
                            <span className="text-xs font-bold text-purple-800">x402 Micro-transactions</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </AppLayout>
  );
}