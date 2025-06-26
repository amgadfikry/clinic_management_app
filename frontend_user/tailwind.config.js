/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // add extensions to include in the search for classes
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //define new colors template in app
        'teal-color': '#1B9C85',
        'gray-color': '#F8F6F4',
        'yellow-color': '#FFE194',
        'dark-color': '#4C4C6D',
      }
    },
  },
  plugins: [],
}

