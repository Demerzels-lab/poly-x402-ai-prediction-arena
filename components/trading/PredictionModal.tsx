'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, AlertCircle, DollarSign, Wallet, Check } from 'lucide-react';
import { Market } from '@/data/mockData';
import { useWallet } from '@/hooks/useWallet';

interface PredictionModalProps {
  market: Market;
  isOpen: boolean;
  onClose: () => void;
}

export default function PredictionModal({ market, isOpen, onClose }: PredictionModalProps) {
  const { wallet, placeBet } = useWallet();
  const [betAmount, setBetAmount] = useState(0.01);
  const [selectedStance, setSelectedStance] = useState<'YES' | 'NO' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const calculatePotentialPayout = (stance: 'YES' | 'NO') => {
    const odds = stance === 'YES' ? market.yesOdds : market.noOdds;
    return (betAmount / odds) * 100;
  };

  const handlePlaceBet = () => {
    if (!selectedStance) {
      setError('Select YES or NO position first');
      return;
    }

    if (betAmount <= 0) {
      setError('Bet amount must be greater than $0');
      return;
    }

    if (betAmount > wallet.balance) {
      setError(`Insufficient balance. Available: $${wallet.balance.toFixed(2)}`);
      return;
    }

    const odds = selectedStance === 'YES' ? market.yesOdds : market.noOdds;
    const betPlaced = placeBet(market.id, market.title, selectedStance, betAmount, odds);

    if (betPlaced) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setSelectedStance(null);
        setBetAmount(0.01);
        setError(null);
      }, 2000);
    } else {
      setError('Failed to place bet. Please try again.');
    }
  };

  const quickAmounts = [0.01, 0.05, 0.10, 0.50, 1.00, 5.00];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-accent/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-sm border-2 border-accent shadow-2xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Tech Header Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-blue-400 to-primary"></div>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {market.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">
                      VOL: ${(market.volume / 1000).toFixed(1)}K
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-accent font-display leading-tight">
                    {market.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-sm"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Wallet Status */}
              <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-800">
                  <Wallet size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Available Balance</span>
                </div>
                <span className="text-lg font-black text-primary font-display">
                  ${wallet.balance.toFixed(2)}
                </span>
              </div>

              {/* Betting Options */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => { setSelectedStance('YES'); setError(null); }}
                  className={`relative p-4 border-2 rounded-sm transition-all group ${
                    selectedStance === 'YES'
                      ? 'bg-green-50 border-green-500 shadow-[4px_4px_0px_#22c55e] transform -translate-y-1'
                      : 'bg-white border-gray-200 hover:border-green-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black uppercase ${selectedStance === 'YES' ? 'text-green-700' : 'text-gray-400'}`}>
                      BET YES
                    </span>
                    {selectedStance === 'YES' && <Check size={16} className="text-green-600" />}
                  </div>
                  <p className={`text-3xl font-black font-display ${selectedStance === 'YES' ? 'text-green-600' : 'text-gray-800'}`}>
                    {market.yesOdds}%
                  </p>
                  <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${market.yesOdds}%` }} />
                  </div>
                </button>

                <button
                  onClick={() => { setSelectedStance('NO'); setError(null); }}
                  className={`relative p-4 border-2 rounded-sm transition-all group ${
                    selectedStance === 'NO'
                      ? 'bg-red-50 border-red-500 shadow-[4px_4px_0px_#ef4444] transform -translate-y-1'
                      : 'bg-white border-gray-200 hover:border-red-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black uppercase ${selectedStance === 'NO' ? 'text-red-700' : 'text-gray-400'}`}>
                      BET NO
                    </span>
                    {selectedStance === 'NO' && <Check size={16} className="text-red-600" />}
                  </div>
                  <p className={`text-3xl font-black font-display ${selectedStance === 'NO' ? 'text-red-600' : 'text-gray-800'}`}>
                    {market.noOdds}%
                  </p>
                  <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${market.noOdds}%` }} />
                  </div>
                </button>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Wager Amount (USD)
                </label>
                
                <div className="relative mb-4">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={wallet.balance}
                    value={betAmount}
                    onChange={(e) => { setBetAmount(parseFloat(e.target.value) || 0); setError(null); }}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-sm text-xl font-bold text-accent focus:outline-none focus:border-primary transition-colors font-display"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => { setBetAmount(amount); setError(null); }}
                      className={`px-4 py-1.5 rounded-sm text-xs font-bold font-mono border transition-all ${
                        betAmount === amount
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Panel */}
              {selectedStance && (
                <div className="mb-8 p-5 bg-gray-50 border-l-4 border-primary rounded-r-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">Est. Payout</span>
                    <span className="text-xs font-mono text-gray-400">
                      ({(100 / (selectedStance === 'YES' ? market.yesOdds : market.noOdds)).toFixed(2)}x Multiplier)
                    </span>
                  </div>
                  <div className="text-3xl font-black font-display text-primary">
                    ${calculatePotentialPayout(selectedStance).toFixed(2)}
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex gap-3">
                  <AlertCircle className="text-red-500 shrink-0" size={20} />
                  <p className="text-sm font-bold text-red-700">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 flex gap-3 animate-fade-in">
                  <Check className="text-green-600 shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-bold text-green-700">ORDER EXECUTED</p>
                    <p className="text-xs text-green-600 mt-1 font-mono">TXID: 0x{Math.random().toString(16).slice(2, 10)}...</p>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={onClose}
                  className="col-span-1 py-4 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-sm transition-colors uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceBet}
                  disabled={!selectedStance || betAmount <= 0 || success}
                  className={`col-span-2 py-4 text-white font-bold rounded-sm shadow-lg uppercase tracking-widest text-sm transition-all pixel-button ${
                    success 
                      ? 'bg-green-600 border-green-600' 
                      : (!selectedStance || betAmount <= 0)
                        ? 'bg-gray-300 border-gray-300 cursor-not-allowed shadow-none'
                        : 'bg-primary border-primary hover:-translate-y-1 hover:shadow-xl'
                  }`}
                >
                  {success ? 'CONFIRMED' : 'CONFIRM TRADE'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}