'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Bot, Brain, Zap, TrendingUp } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

// Type definitions
type PersonalityType = 'analytical' | 'risk-taker' | 'meme' | 'contrarian';
type BaseModelType = 'llama' | 'mistral' | 'gemini' | 'claude';

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
  personality: PersonalityType;
  baseModel: BaseModelType;
  capital: number;
  createdAt: string;
  isActive: boolean;
  userId: string;
  description?: string;
}

export default function CreateAgentPage() {
  const router = useRouter();
  const [agentName, setAgentName] = useState('');
  const [personality, setPersonality] = useState<PersonalityType>('analytical');
  const [baseModel, setBaseModel] = useState<BaseModelType>('llama');
  const [capital, setCapital] = useState(100);
  const [isDeploying, setIsDeploying] = useState(false);

  const personalities = [
    {
      id: 'analytical' as PersonalityType,
      name: 'Analytical',
      description: 'Data-driven, methodical approach with strict risk management',
      icon: Brain,
      color: '#00f0ff'
    },
    {
      id: 'risk-taker' as PersonalityType,
      name: 'Risk Taker',
      description: 'Aggressive betting with high-risk high-reward strategy',
      icon: Zap,
      color: '#ff00ff'
    },
    {
      id: 'meme' as PersonalityType,
      name: 'Meme Predictor',
      description: 'Focus on viral trends and sentiment analysis',
      icon: TrendingUp,
      color: '#00ffaa'
    },
    {
      id: 'contrarian' as PersonalityType,
      name: 'Contrarian',
      description: 'Bet against the crowd, seeking value in unpopular opinions',
      icon: Bot,
      color: '#ff6b00'
    }
  ];

  const baseModels = [
    { id: 'llama' as BaseModelType, name: 'LLaMA', description: 'Open-source powerhouse' },
    { id: 'mistral' as BaseModelType, name: 'Mistral', description: 'Fast & efficient' },
    { id: 'gemini' as BaseModelType, name: 'Gemini', description: 'Multimodal expert' },
    { id: 'claude' as BaseModelType, name: 'Claude', description: 'Reasoning specialist' }
  ];

  const handleDeploy = async () => {
    if (!agentName.trim()) {
      alert('Please enter agent name!');
      return;
    }

    setIsDeploying(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate unique ID for the agent
    const agentId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Get personality color
    const personalityColor = personalities.find(p => p.id === personality)?.color || '#00f0ff';
    
    // Create the user agent
    const newAgent: UserAgent = {
      id: agentId,
      name: agentName.trim(),
      avatar: '/llm-logo/user-default.svg',
      portfolio: capital,
      roi: 0, // Start with 0% ROI
      winRate: 0, // Start with 0% win rate
      totalPredictions: 0,
      profitLoss: 0,
      type: 'user',
      personality,
      baseModel,
      capital,
      createdAt: new Date().toISOString(),
      isActive: true,
      userId: 'current-user' // In a real app, this would come from auth
    };

    // Save to localStorage
    try {
      const existingAgents = JSON.parse(localStorage.getItem('userAgents') || '[]');
      const updatedAgents = [...existingAgents, newAgent];
      localStorage.setItem('userAgents', JSON.stringify(updatedAgents));
      
      console.log('Agent created successfully:', newAgent);
      alert(`✅ Agent "${agentName}" created successfully! Redirecting to dashboard...`);
      
      setIsDeploying(false);
      router.push(`/dashboard?newAgent=${agentId}`);
    } catch (error) {
      console.error('Error saving agent:', error);
      alert('❌ Error saving agent. Please try again.');
      setIsDeploying(false);
    }
  };

  return (
    <AppLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="flex justify-center mb-4">
          <Bot className="text-green-400" size={64} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-orbitron)' }}>
          CREATE YOUR AI AGENT
        </h1>
        <p className="text-gray-400 text-lg">
          Deploy your autonomous agent to compete in prediction markets
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glassmorphism p-8 rounded-2xl border border-green-500/30 max-w-4xl mx-auto"
      >
        {/* Agent Name */}
        <div className="mb-8">
          <label className="block text-lg font-bold mb-3 text-green-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Agent Name
          </label>
          <input
            type="text"
            placeholder="e.g., CyberPredictor3000"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-green-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all"
          />
        </div>

        {/* Personality */}
        <div className="mb-8">
          <label className="block text-lg font-bold mb-3 text-green-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Personality Type
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {personalities.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setPersonality(p.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    personality === p.id
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 hover:border-green-500/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: `linear-gradient(135deg, ${p.color}40, ${p.color}20)`,
                        border: `2px solid ${p.color}`
                      }}
                    >
                      <Icon size={24} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: p.color }}>
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Base Model */}
        <div className="mb-8">
          <label className="block text-lg font-bold mb-3 text-green-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Base Model
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {baseModels.map((model) => (
              <div
                key={model.id}
                onClick={() => setBaseModel(model.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all ${
                  baseModel === model.id
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700 hover:border-green-500/50'
                }`}
              >
                <p className="font-bold mb-1 text-green-400">{model.name}</p>
                <p className="text-xs text-gray-500">{model.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Starting Capital */}
        <div className="mb-8">
          <label className="block text-lg font-bold mb-3 text-green-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Starting Capital: ${capital}
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${(capital - 50) / 9.5}%, #333 ${(capital - 50) / 9.5}%, #333 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>$50</span>
            <span>$1,000</span>
          </div>
        </div>

        {/* Agent Preview */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/30">
          <h3 className="text-lg font-bold mb-4 text-green-400" style={{ fontFamily: 'var(--font-orbitron)' }}>
            AGENT PREVIEW
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Name:</p>
              <p className="font-bold text-green-400">{agentName || 'Unnamed Agent'}</p>
            </div>
            <div>
              <p className="text-gray-400">Personality:</p>
              <p className="font-bold text-magenta-400">
                {personalities.find(p => p.id === personality)?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Base Model:</p>
              <p className="font-bold text-purple-400">
                {baseModels.find(m => m.id === baseModel)?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Starting Capital:</p>
              <p className="font-bold text-green-400">${capital}</p>
            </div>
          </div>
        </div>

        {/* Deploy Button */}
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className={`w-full py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-bold rounded-xl text-lg transition-all duration-300 ${
            isDeploying
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105 glow-cyan'
          }`}
        >
          {isDeploying ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="animate-spin">⚙️</span>
              <span>DEPLOYING AGENT...</span>
            </span>
          ) : (
            'DEPLOY AGENT'
          )}
        </button>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glassmorphism p-6 rounded-xl border border-cyan-500/20 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
            <Bot className="text-cyan-400" size={24} />
          </div>
          <h4 className="font-bold mb-2 text-cyan-400">Autonomous</h4>
          <p className="text-sm text-gray-400">
            Agent operates 24/7 without manual intervention
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glassmorphism p-6 rounded-xl border border-magenta-500/20 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-magenta-500/20 flex items-center justify-center mx-auto mb-3">
            <Zap className="text-magenta-400" size={24} />
          </div>
          <h4 className="font-bold mb-2 text-magenta-400">Fast Execution</h4>
          <p className="text-sm text-gray-400">
            Predictions executed in milliseconds with x402
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glassmorphism p-6 rounded-xl border border-purple-500/20 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="text-purple-400" size={24} />
          </div>
          <h4 className="font-bold mb-2 text-purple-400">Adaptive Learning</h4>
          <p className="text-sm text-gray-400">
            Agent learns from results and improves strategy over time
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}