/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',   // 16px en mobile
        sm: '1.5rem',      // 24px en tablet
        lg: '2rem',        // 32px en desktop
        xl: '2rem',
        '2xl': '2rem',
      },
    },
    extend: {
      colors: {
        'deep-midnight': '#111218',
        'luxury-gold': '#D4AF37',
        'savings-mint': '#98ff98',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
