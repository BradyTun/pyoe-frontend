/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        burmese: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'lifted': '0 10px 25px rgba(0, 0, 0, 0.07), 0 5px 10px rgba(0, 0, 0, 0.04)',
        'umbra': '0 8px 30px rgb(0 0 0 / 0.04)',
      },
      colors: {
        'primary': '#059669', // Emerald 600
        'secondary': '#f5f5f5',
        'surface': '#F0FDF4', // Green 50
        'accent': {
          'dark': '#166534', // Green 800
          'warning': '#FACC15', // Warning Yellow
          'success': '#22c55e',
          'danger': '#ef4444',
        },
        'text-main': '#333333',
        'text-light': '#666666',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}