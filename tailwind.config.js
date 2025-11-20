/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. NEW "RETRO TERMINAL" COLOR PALETTE
      colors: {
        background: '#000000', // Pure black for a true terminal feel
        foreground: '#E0E0E0', // Soft white for main text (not pure white)
        muted: '#666666',     // Muted gray for descriptions
        card: 'rgba(10, 20, 10, 0.7)', // Dark green-tinted glass
        
        primary: {
          DEFAULT: '#39FF14', // Your "Matrix" neon green
          dark: '#008F11',    // A darker, less saturated green
        },
        // We are REMOVING secondary and accent to enforce the monochrome theme
      },
      
      // 2. FONT FAMILY (No change, this is perfect)
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },

      // 3. UPDATED BORDERS & GLOWS (Now green)
      borderColor: {
        DEFAULT: 'rgba(57, 255, 20, 0.3)', // Default border (neon green)
        dark: 'rgba(0, 143, 17, 0.5)',   // Darker green border
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3)',
      }
    },
  },
  plugins: [],
};
module.exports = config;