/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '320px', max: '575px'},
      'sm': {'min': '576px', max: '767px'},
      'md': {'min': '768px', max: '1023px'},
      'lg': {'min': '1024px', max: '1279px'},
      'xl': {'min': '1280px', max: '1535px'},
      '2xl':{'min': '1536px'},
    },
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