const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["src/**/*.njk", "src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"AvantGardeGothicITC"', "Helvetica", "Arial", "sans-serif"],
      commentary: ['"Work Sans"', "Helvetica", "Arial", "sans-serif"],
      scripture: ['"Merriweather"', "serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      grey: {
        DEFAULT: "#6A6A6A",
      },
      stone: {
        DEFAULT: "#F6F2F1",
      },
      red: {
        DEFAULT: "#E42312",
        dark: "#cf2022",
      },
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h3: {
              color: theme('colors.red.DEFAULT'),
              marginTop: '1em',
              marginBottom: 0,
            },
            h2: {
              marginTop: 0,
              marginBottom: 0,
            }
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
