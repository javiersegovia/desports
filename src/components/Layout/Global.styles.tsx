import tw, { GlobalStyles as BaseStyles } from 'twin.macro'
import { Global, css } from '@emotion/react'

const styles = css`
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
