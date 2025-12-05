/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: {
          red: '#ff0040',
          cyan: '#00ffff',
          green: '#00ff88',
        },
        cyber: {
          dark: '#0a0a0f',
          blue: '#0d1117',
          purple: '#1a0a2e',
        },
        solar: {
          green: '#10b981',
          mint: '#6ee7b7',
          cream: '#fefce8',
        }
      },
      animation: {
        'glitch': 'glitch 0.5s infinite',
        'shake': 'shake 0.5s infinite',
        'float': 'float 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
