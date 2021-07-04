import '@styles/main.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@components/Layout/Layout'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {}, [])

  return (
    <>
      <Layout>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>DeSports Network</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
