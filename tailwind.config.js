/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        black:{
          500:"#262626",
          400:"#20212b"
        },
        yellow:{
          500:"#fcf86f"
        }
      },
      fontFamily:{
        poppins:['Poppins','sans-serif']
      }
    },
  },
  plugins: [],
}

