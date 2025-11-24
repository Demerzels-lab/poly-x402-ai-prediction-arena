'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, TrendingUp, Trophy, Store, Menu, X, Brain, Github, Twitter, Activity } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 glassmorphism z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Area */}
          <Link 
            href="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-xl md:text-2xl font-bold text-accent font-display tracking-tight">
              POLYX402
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-sm flex items-center gap-2 text-sm font-bold font-display tracking-wide transition-all duration-200
                    ${isActive 
                      ? 'text-accent bg-blue-50 border-b-2 border-primary' 
                      : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-primary' : 'text-gray-400'} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Social & Branding */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-3 border-r border-gray-200 pr-4">
              <Link
                href="https://github.com/Demerzels-lab/poly-x402-ai-prediction-arena"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors transform hover:scale-110"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://x.com/polyx402"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors transform hover:scale-110"
              >
                <Twitter size={20} />
              </Link>
            </div>

            {/* Powered by x402 Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/5 border border-primary/20">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Powered by</span>
              <span className="text-sm font-bold text-primary font-display">x402</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-sm text-accent hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl absolute left-0 right-0 shadow-xl animate-fade-in">
            <div className="p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-accent border-l-4 border-primary font-bold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-display tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}