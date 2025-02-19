/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
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
  // theme: {
  //   extend: {
  //     colors: {
  //       background: {
  //         light: "#ffffff",
  //         dark: "#1a1a2e",
  //       },
  //       text: {
  //         light: "#050315",
  //         dark: "#ffffff",
  //       },
  //       primary: {
  //         light: "#1E40AF",
  //         dark: "#4f46e5",
  //       },
  //       secondary: {
  //         light: "#dedcff",
  //         dark: "#3b3b58",
  //       },
  //     },
  //   },
  // },
  plugins: [require('daisyui'),],
}

