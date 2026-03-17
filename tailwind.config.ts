import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        darkGreen: '#1e3932',
        brightGreen: '#00a862',
        gold: '#c8a96e',
        offWhite: '#f5f0e8',
        muted: '#888888',
        danger: '#ff6b35',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
