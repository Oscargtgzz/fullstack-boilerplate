/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Adjusted to include .mdx and Next.js app router
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // For Next.js pages directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // For components directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // For Next.js app directory
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        indigo: { // Adding another accent option as per instructions
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: setting a default sans-serif font
      },
    },
  },
  plugins: [],
};
