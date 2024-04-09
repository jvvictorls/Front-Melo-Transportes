/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grass': '#41E052 ',
        'mostard': '#E0B441',
        'royal-blue': '#4169E0',
        'red-pink': '#E04172',
        'blue-gray': '#57648B',
        'complement-purp': '#7111D5',
      }
    },
  },
  plugins: [],
}