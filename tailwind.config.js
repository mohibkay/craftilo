module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      maroon: "#db4c3f",
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
