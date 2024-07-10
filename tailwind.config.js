/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      display: ['"Zen Old Mincho"'],
      body: ['"Zen Old Mincho"'],
      serif: ['"Zen Old Mincho"'],
      sans: ['"Zen Old Mincho"'],
    },
    extend: {
      colors: {
        tanjiro: {
          light: "#99e2b4",
          DEFAULT: "#56b99a",
          dark: "#036666",
        },
        nezuko: "#eca3a",
        saikorostakesenpai: "#242426",
        hashira: {
          light: "#ffc971",
          DEFAULT: "#f7cf5e",
          dark: "#cc5803",
        },
        kisatsutai: {
          light: "#b9375e",
          DEFAULT: "#8e4558",
          dark: "#6e1423",
        },
        oni: {
          light: "#e01e37",
          DEFAULT: "#b3191a",
          dark: "#641220",
        },
      },
    },
  },
  plugins: [],
};
