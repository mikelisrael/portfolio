/** @type {import('tailwindcss').Config} */
module.exports = {
  node: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#333646",
        bgSecondary: "#252734",
        bgTertiary: "#424657",
        textWhite: "#ebebec",
        textGray: "#96979f",
        gray: "#646672",
        yellowPrimary: "#ffc25c",
      },
    },
  },
  plugins: [],
};
