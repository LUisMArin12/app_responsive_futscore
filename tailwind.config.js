/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#e6ffee',
          100: '#b3ffce',
          200: '#80ffae',
          300: '#4dff8e',
          400: '#1aff6e',
          500: '#00e65c',
          600: '#00b348',
          700: '#008034',
          800: '#004d20',
          900: '#00260d',
        },
      },
      screens: {
        'xs': '320px',
        'wearable': '280px',
        'tv': '1200px',
      }
    },
  },
  plugins: [],
};