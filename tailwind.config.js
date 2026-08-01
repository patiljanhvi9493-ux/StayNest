/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e1ecff',
          200: '#bcd7ff',
          300: '#82b4ff',
          400: '#418bff',
          500: '#1260ff', // Brand blue
          600: '#0043db',
          700: '#0033ad',
          800: '#002685',
          900: '#001b5e',
        },
        brand: {
          rose: {
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            300: '#fda4af',
            400: '#fb7185',
            500: '#f43f5e', // Vibrant Rose like Airbnb
            600: '#e11d48',
            700: '#be123c',
            800: '#9f1239',
            900: '#881337',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          }
        },
        slate: {
          150: '#f1f5f9',
          250: '#e2e8f0',
          350: '#cbd5e1',
          455: '#94a3b8',
          450: '#94a3b8',
          505: '#64748b',
          550: '#64748b',
          555: '#475569',
          650: '#475569',
          655: '#334155',
          750: '#334155',
          850: '#1e293b',
          855: '#1e293b',
          955: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.06)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
