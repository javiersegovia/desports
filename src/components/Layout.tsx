import { ReactNode } from 'react'
import { GlobalStyles } from 'twin.macro'
import ReactFullpage from '@fullpage/react-fullpage'

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <GlobalStyles />
    {/* <ReactFullpage
      licenseKey={'123123'}
      scrollingSpeed={1000}
      render={() => <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>}
      onLeave={(origin, destination, direction) => {
        console.log('onLeave event', { origin, destination, direction })
      }}
    > */}
    {children}
    {/* </ReactFullpage> */}
  </>
)
