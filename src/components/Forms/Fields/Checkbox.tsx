import { cx } from '@emotion/css'
import React from 'react'
import tw, { styled, theme } from 'twin.macro'

const clipShape = `polygon(0 21%, 21% 0, 100% 0, 100% 79%, 79% 100%, 0% 100%)`

const StyledCheckbox = styled.div`
  ${tw`relative w-8 h-7`}

  .box-border {
    clip-path: ${clipShape};
    ${tw`absolute bg-white inset-0`}
  }

  &.checked .box-border {
    /* ${tw`bg-cyan-400`} */
    background: ${(p) => p.color};
  }

  .inner-bg {
    clip-path: ${clipShape};
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;
    ${tw`absolute bg-black`}
  }

  .inner-block {
    clip-path: ${clipShape};
    top: 6px;
    left: 6px;
    bottom: 6px;
    right: 6px;

    ${tw`absolute`}
  }

  &.checked .inner-block {
    background: ${(p) => p.color};
  }
`

interface CheckboxProps {
  isChecked: boolean
  className?: string
  color?: string
}

/**
 * This is a "fake" checkbox component
 * it is used only for the styling, not the checkbox functionality
 */
export const Checkbox = ({
  color = theme`colors.cyan.400`,
  isChecked,
  className,
}: CheckboxProps) => {
  return (
    <StyledCheckbox
      color={color}
      className={cx(className, { checked: isChecked })}
    >
      <div className="box-border" />
      <div className="inner-bg" />
      <div className="inner-block" />
    </StyledCheckbox>
  )
}
