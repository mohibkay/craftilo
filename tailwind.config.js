module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    colors: {
      primary: "#2ec4b6",
      white: "#ffffff",
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
        light: "#f1f1f1",
      },
      black: "#282828",
    },
    extend: {},
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
