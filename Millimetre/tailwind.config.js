/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        3: "6px 6px 10px lightblue",
      },
    },
  },
  plugins: [],
};
