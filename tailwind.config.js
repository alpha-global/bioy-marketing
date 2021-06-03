module.exports = {
  purge: {
    content: ["src/**/*.njk", "src/**/*.html"],
    options: {
      safelist: ['bg-grey-light', 'bg-transparent'],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"AvantGardeGothicITC"', "Helvetica", "Arial", "sans-serif"],
      commentary: ['"Work Sans"', "Helvetica", "Arial", "sans-serif"],
      scripture: ['"Merriweather"', "serif"],
    },
    boxShadow: {
      none: '0 0 #000',
      sm: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        DEFAULT: '#000000',
        scrim: '#00000075',
      },
      white: '#ffffff',
      grey: {
        light: '#EFEFEF',
        DEFAULT: '#6A6A6A',
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
    extend: {
      fontSize: {
        '6xl': ['3.75rem', '4rem'],
      },
      scale: {
        '25': '.25',
        '-1': '-1',
      },
      screens: {
        'xs': '512px',
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['direction'],
      display: ['direction'],
      inset: ['direction'],
      flexDirection: ['direction'],
      scale: ['direction'],
      textAlign: ['direction'],
      transform: ['direction'],
      padding: ['direction'],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwindcss-dir')(),
  ],
};
