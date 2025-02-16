/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, #bae51a 0%, #bae51a 100%)',

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}

