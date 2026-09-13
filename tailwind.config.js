/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        canvas: '#F7F6F2',
        surface: '#FFFFFF',
        border: {
          light: '#EEEEEE',
          DEFAULT: '#E5E5E5',
          dark: '#D4D4D4',
        },
        ink: {
          DEFAULT: '#171717',
          secondary: '#666666',
          muted: '#8E8E8E',
          light: '#A3A3A3',
        },
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E1',
          200: '#FFD1C4',
          300: '#FFB19D',
          400: '#F77D5E',
          500: '#E4572E', // Primary Core Accent
          600: '#C9451E',
          700: '#A93615',
          800: '#872C13',
          900: '#6C2411',
          950: '#3D1006',
        },
        brand: {
          50: '#FFF5F2',
          100: '#FFE8E1',
          200: '#FFD1C4',
          300: '#FFB19D',
          400: '#F77D5E',
          500: '#E4572E',
          600: '#C9451E',
          700: '#A93615',
          800: '#872C13',
          900: '#6C2411',
          950: '#3D1006',
        },
        dark: {
          DEFAULT: '#151515',
          surface: '#1E1E1E',
          border: '#2C2C2C',
        }
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'coral': '0 4px 14px 0 rgba(228, 87, 46, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
