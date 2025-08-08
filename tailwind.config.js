/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // active le dark mode via la classe 'dark'
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // adapte selon ta structure
  ],
  theme: {
    extend: {
      // tu peux ajouter ici des couleurs personnalisées ou autre
    },
  },
  plugins: [],
};