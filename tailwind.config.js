/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'lime-neon': '#CCFF00',
        'lime-primary': '#a3e635', // lime-400
        'lime-light': '#bef264',   // lime-300
        'lime-dark': '#84cc16',    // lime-500
      },
    },
  },
  plugins: [],
}
