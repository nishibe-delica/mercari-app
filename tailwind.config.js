/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#ebe3d7',
          300: '#dfd2bf',
          400: '#d1bda3',
          500: '#c5aa8a',
        },
        dusty: {
          pink: '#e8c4c4',
          rose: '#d4a5a5',
        }
      },
      fontFamily: {
        sans: ['Hiragino Maru Gothic ProN', 'メイリオ', 'Meiryo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

