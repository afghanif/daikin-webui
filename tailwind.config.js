/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'daikin-blue': '#0097E0',
        'daikin-blue-light': '#4DC0F0',
        'daikin-blue-dark': '#0072A8',
        'daikin-blue-50': '#E6F6FD',
        'daikin-blue-100': '#B3E3F8',
        'charcoal': '#1A1A2E',
        'charcoal-light': '#333350',
        'soft-gray': '#F5F7FA',
        'soft-gray-2': '#EAECF0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'card': '1.25rem',
        'btn': '0.625rem',
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0,151,224,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 16px 48px rgba(0,151,224,0.18), 0 4px 16px rgba(0,0,0,0.10)',
        'nav': '0 2px 20px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'wave-gradient': 'linear-gradient(135deg, #0097E0 0%, #4DC0F0 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(0,151,224,0.9) 0%, rgba(0,114,168,0.85) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'particle': 'particle 12s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-50px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1A1A2E',
            a: {
              color: '#0097E0',
              '&:hover': { color: '#0072A8' },
            },
            'h1, h2, h3, h4': {
              color: '#1A1A2E',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
