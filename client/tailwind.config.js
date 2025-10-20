/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          elevated: '#2A2A2A',
          border: '#333333',
        },
        gold: {
          light: '#FFD700',
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
        },
        accent: {
          purple: '#8B5CF6',
          rose: '#E11D48',
        }
      },
    },
  },
  plugins: [],
}
