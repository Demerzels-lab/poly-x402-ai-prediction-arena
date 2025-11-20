/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. NEW "MINIMALIST PIXEL" COLOR PALETTE
      colors: {
        background: '#FFFFFF', // Pure white for clean, minimal look
        foreground: '#2C2C2C', // Dark grey for optimal readability
        muted: '#666666',     // Muted gray for descriptions
        card: 'rgba(255, 255, 255, 0.8)', // Clean white glass effect
        
        primary: {
          DEFAULT: '#4A90E2', // Soft blue for primary actions
          dark: '#357ABD',    // Darker blue for hover states
          light: '#E3F2FD',   // Light blue for backgrounds
        },
        accent: {
          DEFAULT: '#FF6B6B', // Coral for accents and highlights
          dark: '#FF5252',    // Darker coral for hover
          light: '#FFEBEE',   // Light coral for backgrounds
        },
        neutral: {
          light: '#E5E5E5',   // Light grey for borders and subtle elements
          DEFAULT: '#9E9E9E', // Medium grey for secondary text
          dark: '#616161',    // Dark grey for primary text
        }
      },
      
      // 2. FONT FAMILY (No change, this is perfect)
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },

      // 3. UPDATED BORDERS & SHADOWS (Clean minimalist)
      borderColor: {
        DEFAULT: 'rgba(229, 229, 229, 0.8)', // Light grey borders
        accent: 'rgba(74, 144, 226, 0.3)',   // Blue accent borders
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'pixel': '0 2px 0 rgba(0, 0, 0, 0.1)', // Subtle pixel-like shadow
        'glow-blue': '0 0 12px rgba(74, 144, 226, 0.3)',
        'glow-coral': '0 0 12px rgba(255, 107, 107, 0.3)',
      }
    },
  },
  plugins: [],
};
module.exports = config;