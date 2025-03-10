/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        emblema: ['"Emblema One"', 'cursive'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
        playwrite: ['"Playwrite AU SA"', 'sans-serif'],
        robotoSlab: ['"Roboto Slab"', 'serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        rubikVinyl: ['"Rubik Vinyl"', 'cursive'],
        ubuntu: ['"Ubuntu"', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}