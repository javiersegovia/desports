import { ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'
// import { Nav } from '@components/Nav'
import defaultTheme from 'tailwindcss/defaultTheme'
import { GlobalStyles } from './Global.styles'

const theme = {
  breakpoints: {
    ...defaultTheme.screens,
  },
}
interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <ThemeProvider theme={theme}>
      {/* <Nav /> */}
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </>
)
