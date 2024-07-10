module.exports = {
  content: ["./src/**/*.{js,html,njk}"],
  safelist: [
    "bg-red",
    "fixed",
    "p-3",
    "right-1",
    "rounded-full",
    "top-2",
    "z-20",
    "z-30",
    "lg:right-1/3",
  ],
  theme: {
    fontFamily: {
      sans: ['"AvantGardeGothicITC"', "Helvetica", "Arial", "sans-serif"],
      commentary: ['"Work Sans"', "Helvetica", "Arial", "sans-serif"],
      scripture: ['"Merriweather"', "serif"],
    },
    boxShadow: {
      none: "0 0 #000",
      sm: "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        DEFAULT: "#333333",
        scrim: "#00000075",
      },
      white: "#ffffff",
      grey: {
        light: "#EFEFEF",
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
              color: theme("colors.red.DEFAULT"),
              marginTop: "1em",
              marginBottom: 0,
            },
            h2: {
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
      }),
    },
    extend: {
      fontSize: {
        "6xl": ["3.75rem", "4rem"],
        title: ["32px", "46px"],
        "title-medium": ["48px", "67px"],
        "title-large": ["56px", "78px"],
        subtitle: ["20px", "30px"],
        "subtitle-medium": ["24px", "36px"],
        "subtitle-large": ["32px", "48px"],
        small: ["16px", "24px"],
      },
      scale: {
        25: ".25",
        "-1": "-1",
      },
      screens: {
        xs: "512px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
