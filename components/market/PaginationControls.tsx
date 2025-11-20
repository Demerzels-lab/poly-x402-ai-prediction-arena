'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 7
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (leftBound > 2) {
        pages.push('...');
      }
      
      // Add pages around current page
      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (rightBound < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 hover:text-cyan-400 transition-all flex items-center space-x-1"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }
          
          const pageNum = page as number;
          const isActive = pageNum === currentPage;
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg font-bold transition-all min-w-[40px] ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-cyan-400'
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 hover:text-cyan-400 transition-all flex items-center space-x-1"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
