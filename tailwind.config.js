/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-blue': '#000A19',
      },
      height: {
        'height-image': '500px', // Example value, adjust as needed
        'height-panel': '625px'
      },
    },
  },
  variants: {
    extend: {
      height: ['responsive'], // Ensures height is responsive
    },
  },
  plugins: [],
}