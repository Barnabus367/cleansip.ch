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
        // Premium modular scale 1.25 with enhanced hierarchy
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.015em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        'xl': ['1.563rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
        '2xl': ['1.953rem', { lineHeight: '1.3', letterSpacing: '-0.035em' }],
        '3xl': ['2.441rem', { lineHeight: '1.2', letterSpacing: '-0.045em' }],
        '4xl': ['3.052rem', { lineHeight: '1.1', letterSpacing: '-0.055em' }],
        '5xl': ['3.815rem', { lineHeight: '1', letterSpacing: '-0.065em' }],
        // Premium display sizes for hero
        '6xl': ['4.769rem', { lineHeight: '0.95', letterSpacing: '-0.075em' }],
        '7xl': ['5.961rem', { lineHeight: '0.9', letterSpacing: '-0.085em' }],
        '8xl': ['7.451rem', { lineHeight: '0.85', letterSpacing: '-0.095em' }],
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
        'carousel': 'scroll 60s linear infinite',
        // Premium animations for hero
        'hero-float': 'heroFloat 8s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'cursor-blink': 'cursorBlink 1s infinite',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'magnetic': 'magnetic 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'reveal': 'reveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'gradient-shift': 'gradientShift 6s ease-in-out infinite',
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
        // Premium keyframes for awwwards-level animations
        heroFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        cursorBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        magnetic: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        reveal: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      // Custom utilities
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
};
