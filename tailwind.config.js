/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "bg-gray": "#F6F6F6",
      },
      borderColor: {
        "default-black": "#4E4A4A",
        "light-gray": "#8F939D",
        "border-gray": "#D3D3D3",
      },
      colors: {
        "default-gray": "#4B5059",
        horizon: "#D8D8D8",
        title: "#474646",
        "default-green": "#4EB34F",
        tBlack: "#212121",
        place: "#858585",
        "opa-green": "#EFF5EF",
      },
    },
  },
  plugins: [],
};
