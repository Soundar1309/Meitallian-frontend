/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {
      font:{
        KaushanScript: "Kaushan Script",
      },
      colors: {
        "green": "#39DB4A",
        "darkgreen":"#2a634e",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG": "#fffff"
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, 
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "", 
    logs: true, 
    themeRoot: ":root",
  },
}

