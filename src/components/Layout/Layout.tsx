/** @jsxImportSource @emotion/react */

import { ReactNode, useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import defaultTheme from 'tailwindcss/defaultTheme'
import { GlobalStyles } from './Global.styles'
import { Provider } from 'react-redux'
import { store } from '@lib/redux/store'
import tw, { styled } from 'twin.macro'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

const PROGRESS_BAR_DELAY = 500
const GLITCH_EFFECT_DURATION = 300

const dummyArray = Array.from({ length: 20 })

const theme = {
  breakpoints: {
    ...defaultTheme.screens,
    '3xl': '1900px',
    '4xl': '2200px',
  },
}

const StyledGlitchBox = styled.div`
  opacity: 0.3;
  background-attachment: fixed;
  background-blend-mode: overlay;
  filter: hue-rotate(50deg);
`

const GlitchEffect = ({ bgPath }: { bgPath: string }) => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (tick <= 50) {
      interval = setInterval(() => setTick((prev) => prev + 1), 60)
    }

    return () => {
      interval && clearInterval(interval)
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
            width: Math.floor(Math.random() * 300) + 'px',
            height: Math.floor(Math.random() * 50) + 'px',
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

  const progressBarInterval = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    progressBarInterval.current && clearInterval(progressBarInterval.current)
    let currentInterval = glitchInterval.current

    router.events.on('routeChangeStart', () => {
      currentInterval = setInterval(() => NProgress.start(), PROGRESS_BAR_DELAY)
    })

    router.events.on('routeChangeComplete', () => {
      currentInterval && clearInterval(currentInterval)
      NProgress.done()
      setShowGlitch(true)
    })
    router.events.on('routeChangeError', () => {
      currentInterval && clearInterval(currentInterval)
      NProgress.done()
      setShowGlitch(true)
    })

    return () => {
      currentInterval && clearInterval(currentInterval)
    }
  }, [router.events])

  const glitchInterval = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    glitchInterval.current && clearInterval(glitchInterval.current)
    let currentInterval = glitchInterval.current

    currentInterval = setInterval(
      () => setShowGlitch(false),
      GLITCH_EFFECT_DURATION
    )

    return () => {
      currentInterval && clearInterval(currentInterval)
    }
  }, [showGlitch])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {showGlitch && (
          <>
            <GlitchEffect bgPath="url(/images/background-final.jpg)" />
            <StyledTransition />
          </>
        )}
        {children}
      </ThemeProvider>
    </Provider>
  )
}
