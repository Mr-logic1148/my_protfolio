import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        glass: 'rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.25)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 20s linear infinite',
        glow: 'glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%,100%': { textShadow: '0 0 20px rgba(99,102,241,0.6)' },
          '50%': { textShadow: '0 0 40px rgba(139,92,246,0.9)' },
        },
      },
    },
  },
  plugins: [],
}
export default config