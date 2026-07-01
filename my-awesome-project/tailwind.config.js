/** @type {import('tailwindcss').Config} */
export default {
  // Specify the paths to all of your template files so Tailwind can tree-shake unused styles
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Enable dark mode support using the standard 'media' query or 'class' strategy
  darkMode: 'media', 
  
  theme: {
    extend: {
      // Custom spacing extensions (e.g., adding padding utilities like pl-18)
      spacing: {
        '18': '4.5rem', /* 72px - perfectly aligns expandable details under user avatars */
      },
      // You can extend your system's design tokens here (colors, fonts, animations)
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}