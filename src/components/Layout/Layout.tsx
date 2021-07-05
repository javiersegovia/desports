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
import { isDesktop } from '@views/home/useAnimations'

const PROGRESS_BAR_DELAY = 500
const GLITCH_EFFECT_DURATION_DESKTOP = 250
const GLITCH_EFFECT_DURATION_MOBILE = 550

const dummyArray = Array.from({ length: 20 })

const theme = {
  breakpoints: {
    ...defaultTheme.screens,
    '3xl': '1900px',
    '4xl': '2200px',
  },
}

const StyledGlitchEffect = styled.div`
  /* filter: hue-rotate(50deg); */
`

const StyledGlitchBox = styled.div`
  background-attachment: fixed;
  background-blend-mode: overlay;
`

const GlitchEffect = ({ bgPath }: { bgPath: string }) => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (tick <= 50) {
      interval = setInterval(() => setTick((prev) => prev + 1), 30)
    }

    return () => {
      interval && clearInterval(interval)
    }
  }, [tick])

  return (
    <StyledGlitchEffect tw="overflow-hidden absolute w-full h-screen opacity-20">
      {dummyArray.map((_, index) => (
        <StyledGlitchBox
          key={index}
          className="glitchBox"
          tw="absolute z-50"
          style={{
            left: Math.floor(Math.random() * 100) + 'vw',
            top: Math.floor(Math.random() * 100) + 'vh',
            width: Math.floor(Math.random() * 300) + 'px',
            height: Math.floor(Math.random() * 30) + 'px',
            backgroundImage: bgPath,
          }}
        />
      ))}
    </StyledGlitchEffect>
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
    progressBarInterval.current && clearTimeout(progressBarInterval.current)
    let currentInterval = glitchInterval.current

    router.events.on('routeChangeStart', () => {
      currentInterval = setTimeout(() => NProgress.start(), PROGRESS_BAR_DELAY)
    })

    router.events.on('routeChangeComplete', () => {
      currentInterval && clearTimeout(currentInterval)
      NProgress.done()
      setShowGlitch(true)
    })
    router.events.on('routeChangeError', () => {
      currentInterval && clearTimeout(currentInterval)
      NProgress.done()
      setShowGlitch(true)
    })

    return () => {
      currentInterval && clearTimeout(currentInterval)
    }
  }, [router.events])

  const glitchInterval = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    glitchInterval.current && clearTimeout(glitchInterval.current)
    let currentInterval = glitchInterval.current

    currentInterval = setTimeout(
      () => setShowGlitch(false),
      isDesktop()
        ? GLITCH_EFFECT_DURATION_DESKTOP
        : GLITCH_EFFECT_DURATION_MOBILE
    )

    return () => {
      currentInterval && clearTimeout(currentInterval)
    }
  }, [showGlitch])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {showGlitch && (
          <>
            <GlitchEffect bgPath="url(/images/home_bg.jpg)" />
            <StyledTransition />
          </>
        )}
        {children}
      </ThemeProvider>
    </Provider>
  )
}
