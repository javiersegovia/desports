import tw, { GlobalStyles as BaseStyles } from 'twin.macro'
import { Global, css } from '@emotion/react'
import { up } from 'styled-breakpoints'

const styles = css`
  html,
  body {
    ${tw`overflow-visible lg:overflow-hidden`}

    ${up('lg')} {
      overscroll-behavior-y: contain;
    }
  }

  body {
    ${tw`bg-gray-900 text-white`}
  }

  *:focus,
  button:focus {
    outline: none !important;
  }
`

export const GlobalStyles = () => {
  return (
    <>
      <BaseStyles />
      <Global styles={styles} />
    </>
  )
}
