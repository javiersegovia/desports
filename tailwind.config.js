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
        yellow: {
          ...colors.yellow,
          400: '#fff500',
        },
        cyan: {
          ...colors.cyan,
          400: '#02d7f2',
        },
        blueGray: {
          ...colors.blueGray,
          500: '#4b5e73',
        },
      },
      fontFamily: {
        sans: ['Cabin', ...defaultTheme.fontFamily.sans],
        mono: ['Bai Jamjuree', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
}
