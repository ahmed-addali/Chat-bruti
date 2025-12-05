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
        'laugh-explode': 'laughExplode 2s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'confetti-fall': 'confettiFall 3s ease-in forwards',
        'matrix-fall': 'matrixFall 2s linear infinite',
        'drunk': 'drunk 0.5s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        laughExplode: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(2) rotate(360deg)', opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateX(-50%) translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(-50%) translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        matrixFall: {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        drunk: {
          '0%, 100%': { transform: 'rotate(-2deg) translateX(-5px)' },
          '50%': { transform: 'rotate(2deg) translateX(5px)' },
        },
      }
    },
  },
  plugins: [],
}
