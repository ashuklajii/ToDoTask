/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },

      fontSize: {
        basetext14: "14px",   // default text size
      },

      colors: {
        dark: "#303030",      // main background
        card: "#444444",      // card / items
        textcolor: "#acacac",      // all text
      },

      borderRadius: {
        xl: "20px",
        xxl: "26px",
      },

      boxShadow: {
        soft: "0 4px 18px rgba(0,0,0,0.25)",
      },screens: {
        xxs: "320px", 
        xs: "375px", 
        xsmd: "425px",
      }

    },
  },
  plugins: [],
};
