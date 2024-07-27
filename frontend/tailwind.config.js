/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nardoGreen: '#8ec15d',
        nardoBlue: '#b2d8d8'
      },
    },
  },
  plugins: [],
}