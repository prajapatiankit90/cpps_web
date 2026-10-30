/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gujarati: ['"Noto Sans Gujarati"', '"Anek Gujarati"', 'sans-serif'],
        noto: ['"Noto Sans Gujarati"', 'sans-serif'],
        anek: ['"Anek Gujarati"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        themeDark: '#16384c',
        themeAccent: '#438d9a',
        themePink: '#F84E77',
      },
    },
  },
  plugins: [],
}
