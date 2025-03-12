/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'green-shadow': '0px 4px 15px 0px rgba(28, 59, 33, 0.10)',
      },
    },
  },
  plugins: [],
};
