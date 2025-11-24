'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { generateMarkets, Market } from '@/data/mockData';
import { Search, Filter, TrendingUp } from 'lucide-react';
import PredictionModal from '@/components/trading/PredictionModal';
import PaginationControls from '@/components/market/PaginationControls';
import SortControls from '@/components/market/SortControls';
import Card from '@/components/Card'; // Using our consistent Card component

type SortBy = 'volume' | 'date' | 'confidence';
type SortOrder = 'asc' | 'desc';

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [markets] = useState<Market[]>(generateMarkets());
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [predictionModalOpen, setPredictionModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('volume');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const itemsPerPage = 9;

  const categories = ['All', 'Crypto', 'Stocks', 'Tech', 'Entertainment', 'Sports', 'Economy', 'Gaming', 'Climate', 'Politics'];

  const filteredAndSortedMarkets = useMemo(() => {
    const filtered = markets.filter(market => {
      const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || market.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'volume': comparison = a.volume - b.volume; break;
        case 'date': comparison = parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1]); break;
        case 'confidence':
          const aConf = a.topAIConfidence.reduce((sum, ai) => sum + ai.confidence, 0) / a.topAIConfidence.length;
          const bConf = b.topAIConfidence.reduce((sum, ai) => sum + ai.confidence, 0) / b.topAIConfidence.length;
          comparison = aConf - bConf;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [markets, searchQuery, selectedCategory, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedMarkets.length / itemsPerPage);
  const paginatedMarkets = filteredAndSortedMarkets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  return (
    <AppLayout>
      <div className="min-h-screen text-foreground">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-black mb-2 text-accent">
            PREDICTION MARKETS
          </h1>
          <p className="text-muted text-lg font-light">
            Trade on future events with {filteredAndSortedMarkets.length} active markets available.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="SEARCH MARKETS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm shadow-sm"
              />
            </div>
            {/* Sort */}
            <SortControls sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <Filter className="text-accent flex-shrink-0 mr-2" size={20} />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-sm text-sm font-bold font-display uppercase tracking-wide transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-md transform -translate-y-0.5'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-4">
          {paginatedMarkets.map((market, index) => (
            <Card
              key={market.id}
              onClick={() => { setSelectedMarket(market); setPredictionModalOpen(true); }}
              className="cursor-pointer group hover:border-primary border-t-4 p-5 transition-all duration-200"
              style={{ borderTopColor: index % 2 === 0 ? '#3B82F6' : '#111E36' }} // Alternating primary/accent colors
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-gray-200">
                  {market.category}
                </span>
                <span className="text-xs font-mono text-muted">
                  Vol: ${(market.volume / 1000).toFixed(1)}k
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-6 text-accent group-hover:text-primary transition-colors line-clamp-2 font-display leading-tight">
                {market.title}
              </h3>

              {/* Odds Ticker */}
              <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden mb-4">
                <div className="bg-white p-3 text-center group/yes hover:bg-green-50 transition-colors">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">YES</p>
                  <p className="text-2xl font-black text-green-600 font-display">{market.yesOdds}%</p>
                </div>
                <div className="bg-white p-3 text-center group/no hover:bg-red-50 transition-colors">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">NO</p>
                  <p className="text-2xl font-black text-red-500 font-display">{market.noOdds}%</p>
                </div>
              </div>

              {/* AI Consensus */}
              <div className="mb-5 bg-gray-50 p-2 rounded-sm border border-gray-100">
                <div className="flex justify-between items-center text-xs mb-1">
                   <span className="font-bold text-gray-500">AI CONSENSUS</span>
                   <span className="font-mono text-accent">High Conf.</span>
                </div>
                <div className="flex gap-1">
                  {market.topAIConfidence.slice(0, 3).map((ai, i) => (
                     <div key={i} className={`h-1.5 flex-1 rounded-full ${ai.stance === 'YES' ? 'bg-green-400' : 'bg-red-400'}`} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedMarket(market); setPredictionModalOpen(true); }}
                  className="flex-1 py-2.5 bg-accent text-white text-sm font-bold rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-display uppercase tracking-wider"
                >
                  Trade
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Empty State */}
        {filteredAndSortedMarkets.length === 0 && (
          <div className="text-center py-24 bg-white border border-dashed border-gray-300 rounded-xl">
            <TrendingUp className="mx-auto mb-4 text-gray-300" size={48} />
            <p className="text-gray-500 font-medium">No markets found matching criteria</p>
          </div>
        )}

        {/* Modal Logic */}
        {selectedMarket && (
          <PredictionModal 
            market={selectedMarket}
            isOpen={predictionModalOpen}
            onClose={() => { setPredictionModalOpen(false); setSelectedMarket(null); }}
          />
        )}
      </div>
    </AppLayout>
  );
}