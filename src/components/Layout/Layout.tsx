import { ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { Nav } from '@components/Nav'
import defaultTheme from 'tailwindcss/defaultTheme'
import { GlobalStyles } from './Global.styles'
import { Provider } from 'react-redux'
import { store } from '@lib/redux/store'

const theme = {
  breakpoints: {
    ...defaultTheme.screens,
    '3xl': '1900px',
    '4xl': '2200px',
  },
}

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Nav />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </Provider>
)
