import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { down, up } from 'styled-breakpoints'
import tw, { styled } from 'twin.macro'

export type TButtonSize = 'md' | 'lg' | 'xl'

type AdditionalProps = {
  size: TButtonSize
  color: string
  bgColor: string
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & AdditionalProps
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & AdditionalProps

export const StyledButton = styled.button<ButtonProps | AnchorProps>`
  --primary: ${(props) => props.bgColor};
  --shadow-primary: ${(props) => props.bgColor};
  --color: ${(props) => props.color};
  --glitch-color: white;
  --font-size: 1rem;
  --shadow-secondary: #fffb00;
  --shadow-terciary: ${(props) => props.color};
  --clip: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);
  --border: 4px;
  --shimmy-distance: 15;
  --clip-one: polygon(
    0 2%,
    100% 2%,
    100% 95%,
    95% 95%,
    95% 90%,
    85% 90%,
    85% 95%,
    8% 95%,
    0 70%
  );
  --clip-two: polygon(
    0 78%,
    100% 78%,
    100% 100%,
    95% 100%,
    95% 90%,
    85% 90%,
    85% 100%,
    8% 100%,
    0 78%
  );
  --clip-three: polygon(
    0 44%,
    100% 44%,
    100% 54%,
    95% 54%,
    95% 54%,
    85% 54%,
    85% 54%,
    8% 54%,
    0 54%
  );
  --clip-four: polygon(
    0 0,
    100% 0,
    100% 0,
    95% 0,
    95% 0,
    85% 0,
    85% 0,
    8% 0,
    0 0
  );
  --clip-five: polygon(
    0 0,
    100% 0,
    100% 0,
    95% 0,
    95% 0,
    85% 0,
    85% 0,
    8% 0,
    0 0
  );
  --clip-six: polygon(
    0 40%,
    100% 40%,
    100% 85%,
    95% 85%,
    95% 85%,
    85% 85%,
    85% 85%,
    8% 85%,
    0 70%
  );
  --clip-seven: polygon(
    0 63%,
    100% 63%,
    100% 80%,
    95% 80%,
    95% 80%,
    85% 80%,
    85% 80%,
    8% 80%,
    0 70%
  );
  color: var(--color);
  font-size: var(--font-size);
  letter-spacing: 1px;
  min-width: 10rem;
  line-height: 3rem;
  min-height: 3rem;
  transition: background 0.2s;
  text-align: center;

  ${down('md')} {
    min-width: 8rem;
    /* max-width: 18rem; */
  }

  ${({ size }) => {
    if (size === 'lg')
      return tw`py-4 px-4 sm:py-6 sm:px-10 lg:py-8 lg:px-20 line-height[3.75rem]`

    return tw`px-2 sm:px-5 lg:py-0 lg:px-10`
  }}

  ${tw`inline-flex items-center justify-center border-0 h-12 cursor-pointer outline-none bg-transparent relative font-mono font-bold z-10`}

  &:active {
    ${tw`transform scale-95`}
    filter: brightness(90%);
  }

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    clip-path: var(--clip);
    z-index: -1;
  }

  &:before {
    background: var(--shadow-primary);
    transform: translate(var(--border), 0);
  }

  &:after {
    background: var(--primary);
  }

  .glitch {
    position: absolute;
    top: calc(var(--border) * -1);
    left: calc(var(--border) * -1);
    right: calc(var(--border) * -1);
    bottom: calc(var(--border) * -1);
    background: var(--shadow-primary);
    text-shadow: 2px 2px var(--shadow-terciary),
      -2px -2px var(--shadow-secondary);
    clip-path: var(--clip);
    color: var(--glitch-color);
    animation: glitch 2s infinite;
    display: none;
  }

  ${up('lg')} {
    &:hover:not([disabled]) .glitch {
      display: block;
    }
  }

  ${down('md')} {
    &:active .glitch {
      display: block;
    }
  }

  .glitch:before {
    content: '';
    position: absolute;
    top: calc(var(--border) * 1);
    right: calc(var(--border) * 1);
    bottom: calc(var(--border) * 1);
    left: calc(var(--border) * 1);
    clip-path: var(--clip);
    background: var(--primary);
    z-index: -1;
  }

  @keyframes glitch {
    0% {
      clip-path: var(--clip-one);
    }
    2%,
    8% {
      clip-path: var(--clip-two);
      transform: translate(calc(var(--shimmy-distance) * -1%), 0);
      /* background: red; */
    }
    6% {
      clip-path: var(--clip-two);
      transform: translate(calc(var(--shimmy-distance) * 1%), 0);
    }
    9% {
      clip-path: var(--clip-two);
      transform: translate(0, 0);
    }
    10% {
      clip-path: var(--clip-three);
      transform: translate(calc(var(--shimmy-distance) * 1%), 0);
    }
    13% {
      clip-path: var(--clip-three);
      transform: translate(0, 0);
    }
    14%,
    21% {
      clip-path: var(--clip-four);
      transform: translate(calc(var(--shimmy-distance) * 1%), 0);
    }
    25% {
      clip-path: var(--clip-five);
      transform: translate(calc(var(--shimmy-distance) * 1%), 0);
    }
    30% {
      clip-path: var(--clip-five);
      transform: translate(calc(var(--shimmy-distance) * -1%), 0);
      background: blue;
    }
    35%,
    45% {
      clip-path: var(--clip-six);
      transform: translate(calc(var(--shimmy-distance) * -1%));
      background: transparent;
    }
    40% {
      clip-path: var(--clip-six);
      transform: translate(calc(var(--shimmy-distance) * 1%));
      background: yellow;
    }
    50% {
      clip-path: var(--clip-six);
      transform: translate(0, 0);
      background: lightgreen;
    }
    55% {
      clip-path: var(--clip-seven);
      transform: translate(calc(var(--shimmy-distance) * 1%), 0);
      background: #ff42c0;
    }
    60% {
      clip-path: var(--clip-seven);
      transform: translate(0, 0);
    }
    31%,
    61%,
    100% {
      clip-path: var(--clip-four);
    }
  }
`
