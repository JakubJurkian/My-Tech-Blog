/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '480px',
      smPlus: '526px',
      md: '620px',
      lg: '768px',
      xl: '960px',
      '2xl': '1024px',
      '3xl': '1280px',
    },
  },
  plugins: [],
};
