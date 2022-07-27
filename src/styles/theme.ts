import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181b23',
      '800': '#1f2029',
      '700': '#353646',
      '600': '#4b4d63',
      '500': '#616480',
      '400': '#797d9a',
      '300': '#9699b0',
      '200': '#b3b5c6',
      '100': '#d1d2dc',
      '50': '#eeeef2',
    },
    primary: {
      100: '#434251',
      300: '#494459',
      500: '#1F1D2C',
    },
    blue: {
      '500': '#0EC0FF',
    },
    green: {
      '500': '#21B17F',
    },
    orange: {
      '500': '#FE7551',
    },
  },
  fonts: {
    heading: `'Roboto', 'Ubuntu'`,
    body: `'Roboto', 'Ubuntu'`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
})
