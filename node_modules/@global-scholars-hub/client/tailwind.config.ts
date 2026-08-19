import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#07152f', 900: '#0b1f42', 700: '#334463', 500: '#66758f' },
        surface: { 0: '#ffffff', 50: '#f8fafc', 100: '#eef2f7' },
        primary: { 500: '#3b82f6', 600: '#2563eb' },
        cyan: '#00cfd0',
        purple: '#7c3aed',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 18px 48px rgba(8, 27, 58, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
