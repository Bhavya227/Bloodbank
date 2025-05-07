/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFCDD2',
          DEFAULT: '#E53935',
          dark: '#C62828',
        },
        secondary: {
          light: '#CFD8DC',
          DEFAULT: '#4F5D73',
          dark: '#37474F',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 