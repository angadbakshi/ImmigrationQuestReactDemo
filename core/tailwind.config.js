/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../core/src/**/*.{js,ts,jsx,tsx}", // Include core components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}