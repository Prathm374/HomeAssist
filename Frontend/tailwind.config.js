/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        twilight: '#6C63FF',
        lavender: '#c3b9ff',
        dusk: '#493b7c',
        lightblue: '#b8e2ff',
        softwhite: '#fffafc',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
