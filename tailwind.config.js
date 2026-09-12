/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B8DEF',
          dark: '#3A6ED5',
        },
        secondary: '#7C83E8',
        accent: '#8CC8E8',
        background: '#F5F9FC',
        card: '#EAF4FC',
        surface: '#FFFFFF',
        'text-primary': '#26364A',
        'text-secondary': '#718096',
        border: '#CFE2F5',
        success: '#34D399',
        error: '#EF4444',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(38,54,74,0.08)',
        md: '0 4px 12px rgba(38,54,74,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
