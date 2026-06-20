/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aesthetic premium color palette additions
        brand: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b3c7ff',
          400: '#85a3ff',
          500: '#4f73ff',
          600: '#2b4eff',
          700: '#1a3beb',
          800: '#142ec4',
          900: '#11259e',
          950: '#0a145c',
        },
      },
    },
  },
  plugins: [],
}
