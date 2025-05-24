/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107', // Primary honey color
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        secondary: {
          50: '#F3E5F5',
          100: '#E1BEE7',
          200: '#CE93D8',
          300: '#BA68C8',
          400: '#AB47BC',
          500: '#9C27B0', // Secondary color
          600: '#8E24AA',
          700: '#7B1FA2',
          800: '#6A1B9A',
          900: '#4A148C',
        },
        accent: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50', // Accent color
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        success: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#009688', // Success color
        },
        warning: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800', // Warning color
        },
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336', // Error color
        }
      },
      fontFamily: {
        'tajawal': ['Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'honeycomb-pattern': "url('/src/assets/honeycomb-pattern.svg')",
      },
      animation: {
        'honey-drip': 'honey-drip 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'honey-drip': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};