/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './partials/**/*.js',
    './public/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'var(--font-inter)', 'sans-serif'],
      },
      colors: { ink: '#0B1121', ink2: '#0F172A', accent: '#2DD4BF', accent2: '#3B82F6' },
    },
  },
  plugins: [],
};
