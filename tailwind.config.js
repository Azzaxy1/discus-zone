/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: 'Quicksand, sans-serif'
      },
      colors: {
        primary: '#30475c',
        secondary: '#a6bdd3',
        button: '#1d2834',
        hoverBtn: '#0e151d'
      }
    }
  },
  plugins: []
}
