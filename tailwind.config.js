/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FDF8F5',
        'dusty-pink': '#E8B4B8',
        'rose-beige': '#D4A5A5',
        'rose-beige-hover': '#C49494',
        'text-gray': '#5D5D5D',
        'heading-gray': '#4A4A4A',
      },
      fontFamily: {
        sans: ['Rounded Mplus 1c', 'Hiragino Maru Gothic ProN', 'メイリオ', 'Meiryo', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

