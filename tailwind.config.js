/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#0a0a0f',
          deep: '#0d0d1a',
          dark: '#0d0d1a',
          navy: '#0d0d1a',
        },
        nebula: {
          purple: '#a855f7',
          violet: '#6b21a8',
          indigo: '#6366F1',
          pink: '#a855f7',
          light: '#c4b5fd',
          glow: '#ddd6fe',
        },
        comet: {
          white: '#F8FAFC',
          tail: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'nebula-gradient': 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0f 70%)',
        'purple-glow': 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, #1a0a2e 0%, #0d0d1a 100%)',
      },
      boxShadow: {
        'purple-glow': '0 0 20px rgba(168, 85, 247, 0.4)',
        'purple-glow-lg': '0 0 40px rgba(168, 85, 247, 0.5)',
        'purple-glow-xl': '0 0 60px rgba(168, 85, 247, 0.6)',
        'card': '0 4px 24px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'comet': 'comet 3s linear forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        comet: {
          '0%': { transform: 'translateX(-100%) translateY(-100%)', opacity: '1' },
          '100%': { transform: 'translateX(200vw) translateY(200vh)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
