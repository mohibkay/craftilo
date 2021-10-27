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
        fade: "#9ca3af",
      },
      black: "#282828",
      red: {
        primary: "#ed4956",
      },
      maroon: "#db4c3f",
      emarald: "#058527",
      purple: "#692fc2",
      blue: "#246fe0",
    },
    extend: {
      transitionProperty: ["left"],
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      borderWidth: ["last"],
    },
  },
  plugins: [],
};
