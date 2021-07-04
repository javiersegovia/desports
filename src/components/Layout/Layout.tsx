/** @jsxImportSource @emotion/react */

import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { Nav } from '@components/Nav'
import defaultTheme from 'tailwindcss/defaultTheme'
import { GlobalStyles } from './Global.styles'
import { Provider } from 'react-redux'
import { store } from '@lib/redux/store'
import tw, { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import { routes } from '@lib/config/routes'

const dummyArray = Array.from({ length: 20 })

const theme = {
  breakpoints: {
    ...defaultTheme.screens,
    '3xl': '1900px',
    '4xl': '2200px',
  },
}

const StyledGlitchBox = styled.div`
  opacity: 0.6;
  background-attachment: fixed;
  background-blend-mode: overlay;
  filter: hue-rotate(50deg);
`

const GlitchEffect = ({ bgPath }: { bgPath: string }) => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (tick <= 30) {
      interval = setInterval(() => setTick((prev) => prev + 1), 20)
    }

    return () => {
      clearInterval(interval)
    }
  }, [tick])

  return (
    <div tw="overflow-hidden absolute w-full h-screen">
      {dummyArray.map((_, index) => (
        <StyledGlitchBox
          key={index}
          className="glitchBox"
          tw="absolute z-50"
          style={{
            left: Math.floor(Math.random() * 100) + 'vw',
            top: Math.floor(Math.random() * 100) + 'vh',
            width: Math.floor(Math.random() * 200) + 'px',
            height: Math.floor(Math.random() * 40) + 'px',
            backgroundImage: bgPath,
          }}
        />
      ))}
    </div>
  )
}

interface LayoutProps {
  children?: ReactNode
}

const StyledTransition = styled.div`
  ${tw`fixed inset-0 z-50 bg-gray-900 opacity-[.25]`}
`

export const Layout = ({ children }: LayoutProps) => {
  const [showGlitch, setShowGlitch] = useState(false)
  const router = useRouter()

  let bgPath = 'url(/images/home_bg-min.jpeg)'

  if (router.pathname !== routes.home) {
    bgPath = 'url(/images/background-final.jpg)'
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => setShowGlitch(true))
    router.events.on('routeChangeComplete', () => setShowGlitch(false))
    router.events.on('routeChangeError', () => setShowGlitch(false))
  }, [router.events])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Nav />
        <GlobalStyles />
        {showGlitch && <GlitchEffect bgPath={bgPath} />}
        {showGlitch && <StyledTransition />}
        {children}
      </ThemeProvider>
    </Provider>
  )
}
