/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Active dark mode avec la classe "dark"
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Scan tous tes fichiers dans /src
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          DEFAULT: '#0fa9e6',
          dark: '#0c87b8',
        },
      },
    },
  },
  plugins: [],
};