/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#050315',
        'background': '#fbfbfe',
        'primary': '#1E40AF',
        'secondary': '#dedcff',
        'accent': '#433bff',
       },
    },
  },
  plugins: [require('daisyui'),],
}

