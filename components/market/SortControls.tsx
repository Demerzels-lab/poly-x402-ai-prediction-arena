'use client';

import { ArrowUpDown, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export type SortBy = 'volume' | 'date' | 'confidence';
export type SortOrder = 'asc' | 'desc';

interface SortControlsProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy) => void;
}

export default function SortControls({ sortBy, sortOrder, onSortChange }: SortControlsProps) {
  const sortOptions = [
    { value: 'volume' as SortBy, label: 'Volume', icon: DollarSign },
    { value: 'confidence' as SortBy, label: 'AI Confidence', icon: TrendingUp },
    { value: 'date' as SortBy, label: 'Date', icon: Calendar },
  ];

  const currentOption = sortOptions.find(opt => opt.value === sortBy);

  return (
    <div className="flex items-center space-x-3">
      <ArrowUpDown className="text-cyan-400 flex-shrink-0" size={20} />
      <span className="text-gray-400 text-sm font-bold hidden sm:inline">Sort:</span>
      <div className="flex items-center space-x-2">
        {/* Sort By Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="pl-4 pr-10 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-white text-sm font-bold focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer hover:border-cyan-500/60"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ArrowUpDown size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Sort Order Toggle Button */}
        <button
          onClick={() => onSortChange(sortBy)}
          className="px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all"
          title={sortOrder === 'desc' ? 'Descending (High to Low)' : 'Ascending (Low to High)'}
        >
          {sortOrder === 'desc' ? (
            <span className="text-cyan-400 text-sm font-bold">↓</span>
          ) : (
            <span className="text-cyan-400 text-sm font-bold">↑</span>
          )}
        </button>
      </div>
    </div>
  );
}
