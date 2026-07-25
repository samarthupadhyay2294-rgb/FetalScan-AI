/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563EB', light: '#3B82F6' },
        secondary: { DEFAULT: '#06B6D4', light: '#14B8A6' },
        accent: '#38BDF8',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(37, 99, 235, 0.12)',
        card: '0 4px 24px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 50%, #F0FDFA 100%)',
        'mesh': 'radial-gradient(at 40% 20%, rgba(59,130,246,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6,182,212,0.12) 0px, transparent 50%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
