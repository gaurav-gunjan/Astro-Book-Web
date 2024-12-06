/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'sorts-mill-goudy': ['Sorts Mill Goudy', 'serif'], // Adding Sorts Mill Goudy
      },
      boxShadow: {
        custom: "0 4px 6px 10px rgba(0, 0, 0, 0.1), 0 2px 4px 10px rgba(0, 0, 0, 0.06)",
      },
      colors: {
        primary: "#381415",
        secondary: "green",
        grey: "#616161",
        greybg: '#EEEEEE',
        tealblue: "#008080"
      },
      animation: {
        rotate360: 'rotate360 10s linear infinite',
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};