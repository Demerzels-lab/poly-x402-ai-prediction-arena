'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, AlertCircle, DollarSign, Wallet } from 'lucide-react';
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
      setError('Pilih YES atau NO terlebih dahulu');
      return;
    }

    if (betAmount <= 0) {
      setError('Jumlah bet harus lebih dari $0');
      return;
    }

    if (betAmount > wallet.balance) {
      setError(`Saldo tidak cukup. Saldo Anda: $${wallet.balance.toFixed(2)}`);
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
      setError('Gagal menempatkan bet. Silakan coba lagi.');
    }
  };

  const quickAmounts = [0.01, 0.05, 0.10, 0.50, 1.00, 5.00];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="glassmorphism max-w-2xl w-full p-6 md:p-8 rounded-2xl border border-cyan-500/50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                  {market.category}
                </span>
                <h2 className="text-xl md:text-2xl font-bold mt-4 text-cyan-400 leading-tight">
                  {market.title}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  Volume: ${(market.volume / 1000).toFixed(0)}K
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl ml-4 flex-shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            {/* Wallet Balance */}
            <div className="mb-6 p-4 bg-black/40 rounded-lg border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="text-cyan-400" size={20} />
                  <span className="text-sm text-gray-400">Saldo Anda</span>
                </div>
                <span className="text-xl font-bold text-green-400">
                  ${wallet.balance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Market Odds */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => {
                  setSelectedStance('YES');
                  setError(null);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStance === 'YES'
                    ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/50'
                    : 'bg-green-500/10 border-green-500/30 hover:border-green-500/60'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="text-green-400 mr-2" size={24} />
                  <span className="text-sm text-green-400 font-bold">BET YES</span>
                </div>
                <p className="text-3xl font-bold text-green-400">{market.yesOdds}%</p>
                {selectedStance === 'YES' && (
                  <p className="text-xs text-green-300 mt-2">
                    Payout: ${calculatePotentialPayout('YES').toFixed(3)}
                  </p>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedStance('NO');
                  setError(null);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStance === 'NO'
                    ? 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/50'
                    : 'bg-red-500/10 border-red-500/30 hover:border-red-500/60'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="text-red-400 mr-2" size={24} />
                  <span className="text-sm text-red-400 font-bold">BET NO</span>
                </div>
                <p className="text-3xl font-bold text-red-400">{market.noOdds}%</p>
                {selectedStance === 'NO' && (
                  <p className="text-xs text-red-300 mt-2">
                    Payout: ${calculatePotentialPayout('NO').toFixed(3)}
                  </p>
                )}
              </button>
            </div>

            {/* Bet Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-cyan-400 mb-2">
                Jumlah Bet (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={wallet.balance}
                  value={betAmount}
                  onChange={(e) => {
                    setBetAmount(parseFloat(e.target.value) || 0);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {quickAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => {
                      setBetAmount(amount);
                      setError(null);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      betAmount === amount
                        ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    ${amount.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Potential Payout Summary */}
            {selectedStance && (
              <div className="mb-6 p-4 bg-black/40 rounded-lg border border-purple-500/30">
                <h3 className="text-sm font-bold text-purple-400 mb-3">Ringkasan Bet</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stance:</span>
                    <span className={`font-bold ${selectedStance === 'YES' ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedStance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jumlah Bet:</span>
                    <span className="text-white font-bold">${betAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Odds:</span>
                    <span className="text-white font-bold">
                      {selectedStance === 'YES' ? market.yesOdds : market.noOdds}%
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="text-cyan-400 font-bold">Potential Payout:</span>
                    <span className="text-cyan-400 font-bold text-lg">
                      ${calculatePotentialPayout(selectedStance).toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="text-red-400" size={20} />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                <span className="text-green-400 text-sm font-bold">
                  Bet berhasil ditempatkan! 
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handlePlaceBet}
                disabled={!selectedStance || betAmount <= 0 || success}
                className="py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {success ? 'Berhasil!' : 'Konfirmasi Bet'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
