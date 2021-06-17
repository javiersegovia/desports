import { ReactNode } from 'react'
import { GlobalStyles } from 'twin.macro'

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <GlobalStyles />
    {children}
  </>
)
