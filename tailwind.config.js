/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "noticia1": "url('./assets/noticia1.jpg')",
        "noticia2": "url('./assets/noticia2.jpg')",
        "noticia3": "url('./assets/noticia3.jpg')",
    })},
  },
  plugins: [],
};
