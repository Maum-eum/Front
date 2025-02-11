/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {

      },
      fontFamily:{
        'gtr-B' : ['gtr-B'],
        'gtr-R' : ['gtr-R'],
        'gtr-T' : ['gtr-T'],
        'pre-Black' : ['pre-Black'],
        'pre-B' : ['pre-B'],
        'pre-EB' : ['pre-EB'],
        'pre-EL' : ['pre-EL'],
        'pre-L' : ['pre-L'],
        'pre-M' : ['pre-M'],
        'pre-R' : ['pre-R'],
        'pre-SB' : ['pre-SB'],
        'pre-T' : ['pre-T'],
      }
    },
  },
  plugins: [],
}

