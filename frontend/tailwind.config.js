/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",   // since you're using pure React (no TS)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
