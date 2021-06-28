import tw, { GlobalStyles as BaseStyles } from 'twin.macro'
import { Global, css } from '@emotion/react'

const styles = css`
  /* Todo: enable the overscroll-behaviour-y when we are not scrolling in mobile */
  html,
  body {
    overscroll-behavior-y: contain;

    ${tw`overflow-visible md:overflow-hidden`}
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
