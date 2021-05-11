const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    'src/**/*.njk',
    'src/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['"AvantGardeGothicITC"', 'Helvetica', 'Arial', 'sans-serif'],
      'commentary': ['"Work Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      'scripture': ['"Merriweather"', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      grey: {
        light: '#EFEFEF',
        DEFAULT: '#6A6A6A',
      },
      stone: {
        DEFAULT: '#F6F2F1',
      },
      red: {
        DEFAULT: '#E42312',
        dark: '#cf2022'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
