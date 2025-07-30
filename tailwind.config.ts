/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6FCF9',
          100: '#CCFAF2',
          200: '#99F5E6',
          300: '#66F0D9',
          400: '#33EBCD',
          500: '#00BFA6', // Main brand color
          600: '#00A690',
          700: '#008C7A',
          800: '#007363',
          900: '#00594D',
        },
        secondary: {
          50: '#E6EEF0',
          100: '#CCDDE1',
          200: '#99BBC3',
          300: '#6699A5',
          400: '#337787',
          500: '#003B46', // Deep petrol
          600: '#00323B',
          700: '#002930',
          800: '#002025',
          900: '#00171A',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FFF6D6',
          200: '#FFEDAD',
          300: '#FFE485',
          400: '#FFDC5C',
          500: '#FFD54F', // Warm yellow
          600: '#E6BF47',
          700: '#CCAA3F',
          800: '#B39437',
          900: '#997F2F',
        },
        neutral: {
          50: '#FEFEFE',
          100: '#FDFDFD',
          200: '#FBFBFC',
          300: '#F9FAFB', // Main background
          400: '#F7F8F9',
          500: '#F5F6F7',
          600: '#DDE0E3',
          700: '#C4C9CE',
          800: '#ACB3BA',
          900: '#939CA5',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Modular scale 1.25
        'xs': ['0.8rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.25rem', { lineHeight: '1.5' }],
        'xl': ['1.563rem', { lineHeight: '1.4' }],
        '2xl': ['1.953rem', { lineHeight: '1.3' }],
        '3xl': ['2.441rem', { lineHeight: '1.2' }],
        '4xl': ['3.052rem', { lineHeight: '1.1' }],
        '5xl': ['3.815rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 59, 70, 0.08)',
        'medium': '0 4px 16px rgba(0, 59, 70, 0.12)',
        'hard': '0 8px 32px rgba(0, 59, 70, 0.16)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        carousel: 'scroll 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
