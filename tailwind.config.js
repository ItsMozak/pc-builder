module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
    },
      },
      animation: {
        fade: "fade 0.6s linear",
        'fade-out': 'fade-out 1s linear', 
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
