import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro'
import { Global, css } from '@emotion/react'

const styles = css`
  body {
    ${tw`bg-gray-900 text-white`}
  }

  *:focus,
  button:focus {
    outline: none !important;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${theme`colors.emerald.400`};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 4px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${theme`colors.emerald.400`},
      0 0 5px ${theme`colors.emerald.400`};
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
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
