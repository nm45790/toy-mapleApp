/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "#F5EFE6",
        "color-2": "#E8DFCA",
        "color-3": "#AEBDCA",
        "color-4": "#7895B2",
      },
      screens: {
        mobile: '481px',
        tablet: '769px',
        laptop: '1025px',
        desktop: '1281px',
      },
    },
  },
  plugins: [],
};
