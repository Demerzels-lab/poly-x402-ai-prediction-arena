'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, TrendingUp, Trophy, Store } from 'lucide-react';

export default function HomeNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 glassmorphism border-b border-neutral-light z-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href={"/"}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            POLYx402
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30">
              <span className="text-xs text-accent">Powered by</span>
              <span className="text-sm font-bold text-accent-dark">x402</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}