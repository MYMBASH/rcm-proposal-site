import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // CSS variables allow runtime color control from admin appearance page
          blue:       'var(--color-primary, #1B3FAB)',
          'blue-mid': '#2563EB',
          teal:       'var(--color-secondary, #0EA5E9)',
          mint:       'var(--color-accent, #34D399)',
          emerald:    '#059669',
          dark:       'var(--color-dark, #050d1a)',
          gray:       '#64748B',
          light:      '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-tajawal)', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, var(--color-primary, #1B3FAB) 0%, #2563EB 30%, var(--color-secondary, #0EA5E9) 65%, var(--color-accent, #34D399) 100%)',
        'brand-gradient-v': 'linear-gradient(180deg, #2563EB 0%, var(--color-secondary, #0EA5E9) 50%, var(--color-accent, #34D399) 100%)',
        'hero-pattern': "url('/images/hero-pattern.svg')",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(27, 63, 171, 0.15)',
        'brand-lg': '0 8px 40px rgba(27, 63, 171, 0.2)',
        'card': '0 2px 16px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
