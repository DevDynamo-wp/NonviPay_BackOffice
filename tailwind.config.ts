import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['"JetBrains Mono"',   'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#F5A623',
          dark:    '#E8931A',
          light:   '#FFD166',
        },
        surface: {
          base:     '#0D0E12',
          card:     '#13151C',
          elevated: '#1A1D27',
          subtle:   '#21253A',
          input:    '#191C28',
        },
      },
    },
  },
  plugins: [],
};

export default config;
