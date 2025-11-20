'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { markets2025, Market } from '@/data/mockData';
import { AIAnalysis } from '../types/analysis';
import { Bot, Zap, Activity, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import AppLayout from '@/components/AppLayout'; // Use our App Layout
import PageHeader from '@/components/PageHeader'; // Use our Page Header
import Card from '@/components/Card'; // Use our Card

// 1. Get *only* the Crypto markets from our mock data
const cryptoMarkets = markets2025.filter(m => m.category === 'Crypto');

export default function AnalysisPage() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. This is the analysis handler from your reference
  const handleAnalyze = async (market: Market) => {
    setSelectedMarket(market);
    setIsLoadingAnalysis(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market }),
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to get analysis from AI');
      }
      
      const data: AIAnalysis = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  // 3. This is our new retro-themed UI
  return (
    <AppLayout>
      <PageHeader
        title="AI MARKET ANALYSIS"
        description="Choose crypto market to be analyzed by Kalsh AI"
      />

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Column 1: Market List */}
        <Card className="lg:col-span-5 p-4 space-y-2">
          <h3 className="text-xl font-display font-bold mb-2 px-2 text-primary">
            Select Crypto Market
          </h3>
          <div className="max-h-[600px] overflow-y-auto pr-2">
            {cryptoMarkets.map((market) => (
              <div
                key={market.id}
                onClick={() => handleAnalyze(market)}
                className={cn(
                  'p-3 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors border-2 border-transparent',
                  selectedMarket?.id === market.id && 'bg-primary/20 border-primary'
                )}
              >
                <h4 className="font-bold text-sm text-foreground">{market.title}</h4>
                <p className="text-xs text-muted">
                  Odds: {market.yesOdds}% (Yes) / {market.noOdds}% (No)
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Column 2: Analysis Result */}
        <Card className="lg:col-span-7 p-6">
          <h3 className="text-xl font-display font-bold mb-4 text-secondary">
            KALSH AI ANALYSIS
          </h3>
          
          {/* Default State */}
          {!selectedMarket && !isLoadingAnalysis && (
            <div className="text-center py-12 text-muted">
              <Bot size={48} className="mx-auto mb-4" />
              <p className="font-display text-lg">
                SELECT A MARKET TO BEGIN ANALYSIS
              </p>
              <p className="text-sm">Awaiting target...</p>
            </div>
          )}
          
          {/* Loading State */}
          {isLoadingAnalysis && (
            <div className="text-center py-12 text-muted animate-pulse">
              <Activity size={48} className="mx-auto mb-4" />
              <p className="font-display text-lg text-primary">
                ANALYZING...
              </p>
              <p className="text-sm">KALSH AI is processing the data stream...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 text-red-500">
              <AlertTriangle size={48} className="mx-auto mb-4" />
              <h4 className="font-display font-bold text-lg mb-2">ANALYSIS FAILED</h4>
              <p className="text-sm font-mono bg-black/20 p-2 rounded">{error}</p>
            </div>
          )}

          {/* Success State */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <span className="text-sm font-display font-bold text-secondary">
                  KALSH AI Summary:
                </span>
                <p className="text-foreground font-bold text-lg italic">
                  "{analysis.summary}"
                </p>
              </div>
              
              <div className="border-t border-DEFAULT/50 pt-4">
                <span className="text-sm font-display font-bold text-primary">
                  Detailed Insight:
                </span>
                <p className="text-muted whitespace-pre-wrap">{analysis.insight}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-DEFAULT/50">
                <div className="bg-black/20 p-3 rounded-lg">
                  <span className="text-muted block text-xs font-display">Confidence</span>
                  <strong className="capitalize text-xl font-display text-primary">
                    {analysis.confidence}
                  </strong>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                  <span className="text-muted block text-xs font-display">Actionable</span>
                  <strong className="capitalize text-xl font-display text-primary">
                    {analysis.actionable ? 'Yes' : 'No'}
                  </strong>
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}