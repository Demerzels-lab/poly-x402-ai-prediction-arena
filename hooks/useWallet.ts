'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserWallet, Transaction, PredictionBet } from '@/app/types/wallet';

const INITIAL_BALANCE = 100; // $100 starting balance
const WALLET_KEY = 'user_wallet';
const BETS_KEY = 'user_predictions';

export const useWallet = () => {
  const [wallet, setWallet] = useState<UserWallet>({
    balance: INITIAL_BALANCE,
    totalDeposited: INITIAL_BALANCE,
    totalWagered: 0,
    totalWon: 0,
    totalLost: 0,
    activeBets: 0,
    transactions: []
  });

  const [activeBets, setActiveBets] = useState<PredictionBet[]>([]);

  // Load wallet data dari localStorage
  useEffect(() => {
    try {
      const savedWallet = localStorage.getItem(WALLET_KEY);
      const savedBets = localStorage.getItem(BETS_KEY);
      
      if (savedWallet) {
        setWallet(JSON.parse(savedWallet));
      }
      
      if (savedBets) {
        setActiveBets(JSON.parse(savedBets));
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
    }
  }, []);

  // Save wallet data ke localStorage
  const saveWallet = useCallback((updatedWallet: UserWallet) => {
    setWallet(updatedWallet);
    localStorage.setItem(WALLET_KEY, JSON.stringify(updatedWallet));
  }, []);

  const saveBets = useCallback((bets: PredictionBet[]) => {
    setActiveBets(bets);
    localStorage.setItem(BETS_KEY, JSON.stringify(bets));
  }, []);

  // Place a bet
  const placeBet = useCallback((
    marketId: string,
    marketTitle: string,
    stance: 'YES' | 'NO',
    amount: number,
    odds: number
  ): boolean => {
    if (wallet.balance < amount) {
      return false; // Insufficient balance
    }

    const potentialPayout = (amount / odds) * 100;
    
    const newBet: PredictionBet = {
      id: `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: 'user-1', // Hardcoded for now
      marketId,
      marketTitle,
      stance,
      amount,
      odds,
      potentialPayout,
      placedAt: new Date().toISOString(),
      result: 'PENDING'
    };

    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: stance === 'YES' ? 'BET_YES' : 'BET_NO',
      amount,
      marketId,
      marketTitle,
      timestamp: new Date().toISOString(),
      result: 'PENDING',
      odds
    };

    const updatedWallet: UserWallet = {
      ...wallet,
      balance: wallet.balance - amount,
      totalWagered: wallet.totalWagered + amount,
      activeBets: wallet.activeBets + 1,
      transactions: [transaction, ...wallet.transactions]
    };

    saveWallet(updatedWallet);
    saveBets([...activeBets, newBet]);

    return true;
  }, [wallet, activeBets, saveWallet, saveBets]);

  // Deposit funds
  const deposit = useCallback((amount: number) => {
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'DEPOSIT',
      amount,
      marketId: 'deposit',
      marketTitle: 'Deposit Funds',
      timestamp: new Date().toISOString()
    };

    const updatedWallet: UserWallet = {
      ...wallet,
      balance: wallet.balance + amount,
      totalDeposited: wallet.totalDeposited + amount,
      transactions: [transaction, ...wallet.transactions]
    };

    saveWallet(updatedWallet);
  }, [wallet, saveWallet]);

  // Settle a bet (for simulation purposes)
  const settleBet = useCallback((betId: string, won: boolean) => {
    const bet = activeBets.find(b => b.id === betId);
    if (!bet) return;

    const updatedBets = activeBets.map(b => 
      b.id === betId 
        ? { ...b, result: (won ? 'WIN' : 'LOSS') as 'WIN' | 'LOSS', settledAt: new Date().toISOString() }
        : b
    );

    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: won ? 'WIN' : 'LOSS',
      amount: won ? bet.potentialPayout : bet.amount,
      marketId: bet.marketId,
      marketTitle: bet.marketTitle,
      timestamp: new Date().toISOString(),
      result: won ? 'WIN' : 'LOSS',
      payout: won ? bet.potentialPayout : 0
    };

    const updatedWallet: UserWallet = {
      ...wallet,
      balance: won ? wallet.balance + bet.potentialPayout : wallet.balance,
      totalWon: won ? wallet.totalWon + bet.potentialPayout : wallet.totalWon,
      totalLost: !won ? wallet.totalLost + bet.amount : wallet.totalLost,
      activeBets: wallet.activeBets - 1,
      transactions: [transaction, ...wallet.transactions]
    };

    saveWallet(updatedWallet);
    saveBets(updatedBets);
  }, [activeBets, wallet, saveWallet, saveBets]);

  // Reset wallet (for testing)
  const resetWallet = useCallback(() => {
    const initialWallet: UserWallet = {
      balance: INITIAL_BALANCE,
      totalDeposited: INITIAL_BALANCE,
      totalWagered: 0,
      totalWon: 0,
      totalLost: 0,
      activeBets: 0,
      transactions: []
    };
    saveWallet(initialWallet);
    saveBets([]);
  }, [saveWallet, saveBets]);

  return {
    wallet,
    activeBets,
    placeBet,
    deposit,
    settleBet,
    resetWallet
  };
};
