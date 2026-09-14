/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0B0C0E',
          deep: '#060708',
          card: '#111317',
          surface: '#16191E',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        charcoal: {
          DEFAULT: '#141619',
          light: '#1F2328',
          muted: '#2A2F35',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5E6B3',
          shimmer: '#FFE082',
          bronze: '#C5A059',
          dark: '#8C6F21',
        },
        architectural: {
          white: '#F8F9FA',
          muted: '#94A3B8',
          subtle: '#64748B',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
        epic: '.35em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5E6B3 50%, #C5A059 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
