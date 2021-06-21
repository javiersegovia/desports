import { ReactNode } from 'react'
import { GlobalStyles } from 'twin.macro'
import { ThemeProvider } from '@emotion/react'
import { Nav } from '@components/Nav'
import defaultTheme from 'tailwindcss/defaultTheme'

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
      <Nav />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </>
)
