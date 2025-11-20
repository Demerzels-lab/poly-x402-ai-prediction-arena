// Type definitions untuk Wallet & Transaction System

export interface Transaction {
  id: string;
  type: 'BET_YES' | 'BET_NO' | 'WIN' | 'LOSS' | 'DEPOSIT';
  amount: number;
  marketId: string;
  marketTitle: string;
  timestamp: string;
  result?: 'WIN' | 'LOSS' | 'PENDING';
  payout?: number;
  odds?: number;
}

export interface UserWallet {
  balance: number;
  totalDeposited: number;
  totalWagered: number;
  totalWon: number;
  totalLost: number;
  activeBets: number;
  transactions: Transaction[];
}

export interface PredictionBet {
  id: string;
  userId: string;
  marketId: string;
  marketTitle: string;
  stance: 'YES' | 'NO';
  amount: number;
  odds: number;
  potentialPayout: number;
  placedAt: string;
  result: 'PENDING' | 'WIN' | 'LOSS';
  settledAt?: string;
}
