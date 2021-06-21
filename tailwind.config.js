/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: {
          ...colors.gray,
          800: '#22242c',
          900: '#15171e',
        },
      },
      fontFamily: {
        sans: ['Cabin', ...defaultTheme.fontFamily.sans],
        mono: ['Bai Jamjuree', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {},
  plugins: [],
}

// TONOS GRISES OPACOS
// #1E171E (FONDO, DARKEST BACKGROUND)
// #22242C (NAV, STAGES BACKGROUND)

// TONOS GRISES AZULADOS
// #4B5E73
