/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BFA6',    // Mint-Türkis
        secondary: '#003B46',  // Tiefes Petrol
        accent: '#FFD54F',     // Warmes Gelb
        neutral: '#F9FAFB',    // Hellgrau
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
