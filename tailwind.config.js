/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
      colors: {
        brown: {
          50: '#FAF6F1',
          100: '#F0E6D9',
          200: '#E2D0B7',
          300: '#D4BA95',
          400: '#C5A373',
          500: '#B78D51',
          600: '#9A7141',
          700: '#7D5B34',
          800: '#604628',
          900: '#43301B',
        },
        green: {
          50: '#F2F7F2',
          100: '#DFEADF',
          200: '#BFD5BF',
          300: '#9FBF9F',
          400: '#7FAA7F',
          500: '#5F955F',
          600: '#4C784C',
          700: '#3A5C3A',
          800: '#274027',
          900: '#152415',
        },
        cream: {
          50: '#FEFDF9',
          100: '#FDF9EE',
          200: '#FBF3DE',
          300: '#F9EDCD',
          400: '#F6E6BC',
          500: '#F4E0AB',
          600: '#F1D789',
          700: '#EFCF68',
          800: '#EDC847',
          900: '#EBC125',
        },
      },
      backgroundImage: {
        'wood-pattern': "url('https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'hero-image': "url('https://images.pexels.com/photos/2287310/pexels-photo-2287310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};