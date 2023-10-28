/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    fontFamily: {
      Figtree: 'Figtree',
    },

    extend: {
      colors: {
        primary: '#211061',
      },
    },
  },
  plugins: [],
};
