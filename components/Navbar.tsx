'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, TrendingUp, Trophy, Store, Menu, X, Brain, Github, Twitter } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Bot },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/market', label: 'Event Market', icon: TrendingUp },
    { href: '/create-agent', label: 'Create Agent', icon: Store },
    { href: '/analysis', label: 'AI Analysis', icon: Brain },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 glassmorphism border-b border-cyan-500/30 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link 
            href="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-magenta-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            KALSH402
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex glassmorphism border border-primary/30 rounded-lg p-1 space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg' 
                      : 'text-gray-300 hover:text-green-400 hover:bg-green-500/10'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side: Social Links and Powered By */}
          <div className="flex items-center space-x-3">
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link
                href="https://github.com/Demerzels-lab/kalsh402-ai-prediction-arena"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://x.com/kalsh402"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>

            {/* Powered by x402 */}
            <div className="hidden sm:flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <span className="text-xs text-purple-400">Powered by</span>
              <span className="text-sm font-bold text-purple-300">x402</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4">
            <div className="glassmorphism border border-primary/30 rounded-lg p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${isActive 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg' 
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-500/10'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                );
              })}
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-2 border-t border-gray-600 mt-2">
                <Link
                  href="https://github.com/Demerzels-lab/kalsh402-ai-prediction-arena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <Github size={24} />
                </Link>
                <Link
                  href="https://x.com/kalsh402"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <Twitter size={24} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}