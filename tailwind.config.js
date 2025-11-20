/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. "MINIMALIST PIXEL" COLOR PALETTE
      colors: {
        background: '#FFFFFF', // Clean white background
        foreground: '#1a1a1a', // Dark text for excellent contrast
        muted: '#666666',     // Muted gray for descriptions
        card: 'rgba(255, 255, 255, 0.8)', // Clean white glass effect
        neutral: {
          light: 'rgba(0, 0, 0, 0.1)', // Light borders
          dark: 'rgba(0, 0, 0, 0.2)',  // Darker borders
        },
        
        primary: {
          DEFAULT: '#4A90E2', // Soft blue for primary elements
          dark: '#357abd',    // Darker blue for hover states
          light: '#6ba3e5',   // Lighter blue for highlights
        },
        accent: {
          DEFAULT: '#FF6B6B', // Coral for accent elements
          dark: '#e55555',    // Darker coral for hover
          light: '#ff8585',   // Lighter coral for highlights
        },
      },
      
      // 2. FONT FAMILY (No change, this is perfect)
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },

      // 3. UPDATED BORDERS & SHADOWS (Clean and minimal)
      borderColor: {
        DEFAULT: 'rgba(0, 0, 0, 0.1)', // Default light border
        light: 'rgba(0, 0, 0, 0.05)', // Very light border
        dark: 'rgba(0, 0, 0, 0.2)',   // Darker border
      },
      boxShadow: {
        'pixel': '0 2px 8px rgba(0, 0, 0, 0.1)', // Clean shadow effect
        'card': '0 4px 16px rgba(0, 0, 0, 0.1)', // Card shadow
      }
    },
  },
  plugins: [],
};
module.exports = config;