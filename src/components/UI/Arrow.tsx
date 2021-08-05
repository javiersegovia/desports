import { HTMLAttributes } from 'react'
import tw, { styled, theme } from 'twin.macro'

const defaultColor = theme`colors.blueGray.500`

export const StyledArrow = styled.button<{
  className?: string
  lightColor: string
  darkColor: string
}>`
  ${tw`opacity-80`}

  & > div {
    ${tw`transition duration-200`}
  }

  .arrow {
    transform: rotate(45deg);
    border-style: solid;
  }

  .arrow.right {
    border-width: 7px 7px 18px 18px;
    border-color: ${defaultColor} ${defaultColor} transparent transparent;
  }

  &:hover .arrow.right {
    border-color: ${(p) =>
      `${p.darkColor} ${p.darkColor} transparent transparent`};
  }

  .arrow.left {
    border-width: 18px 18px 7px 7px;
    border-color: transparent transparent ${defaultColor} ${defaultColor};
  }

  &:hover .arrow.left {
    border-color: ${(p) =>
      `transparent transparent ${p.darkColor} ${p.darkColor}`};
  }

  .triangle {
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
  }

  .triangle.left {
    margin-left: 6px;
    border-right: 7px solid ${defaultColor};
  }

  &:hover .triangle.left {
    border-right: 7px solid ${(p) => p.lightColor};
  }

  .triangle.right {
    border-left: 7px solid ${defaultColor};
    margin-left: 11px;
  }

  &:hover .triangle.right {
    border-left: 7px solid ${(p) => p.lightColor};
  }
`

interface ArrowProps extends HTMLAttributes<HTMLButtonElement> {
  refFn?: (ref: HTMLButtonElement | null) => void
  lightColor?: string
  darkColor?: string
}

export const LeftArrow = ({ refFn = () => {}, ...props }: ArrowProps) => (
  <StyledArrow
    type="button"
    ref={(ref) => refFn(ref)}
    lightColor={defaultColor}
    darkColor={defaultColor}
    {...props}
  >
    <div className="left absolute triangle" />
    <div className="arrow left" />
  </StyledArrow>
)

export const RightArrow = ({ refFn = () => {}, ...props }: ArrowProps) => (
  <StyledArrow
    type="button"
    ref={(ref) => refFn(ref)}
    lightColor={defaultColor}
    darkColor={defaultColor}
    {...props}
  >
    <div className="right absolute triangle" />
    <div className="arrow right" />
  </StyledArrow>
)
