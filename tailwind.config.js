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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
