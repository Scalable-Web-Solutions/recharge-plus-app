import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          light: '#1E293B',
        },
        cream: {
          DEFAULT: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#FEFAE0',
        },
        emerald: {
          DEFAULT: '#10B981',
        },
        'gray-border': '#E2E8F0',
        'gray-text': '#64748B',
        'nav-bg': '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
