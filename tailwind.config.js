/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      smallMobile: '375px',
      mobile: '455px',
      small: '526px',
      medium: '620px',
      tablet: '768px',
      laptop: '960px',
      desktop: '1024px',
      largeDesktop: '1280px',
      extraLargeDesktop: '1536px',
    },
  },
  plugins: [],
};
