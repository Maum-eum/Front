/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "base-white"    : "#F5F5F5",
        "black"         : "#000000",
        "blue"          : "#007BFF",
        "point-gray"    : "#BDBDBD",
        "green"         : "#34D000",
        "red"           : "#E71C1C",
        "disabled-gray" : "#5C5C5C",
        "point-green"   : "#2DB400",
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
      },
      fontSize: {
        'title': '24px',   // 페이지 제목 (24pt)
        'item': '20px',    // 항목 (20pt)
        'content': '16px', // 내용 (16pt)
        'button': '20px',  // 버튼 (20pt)
      }
    },
  },
  plugins: [],
}

