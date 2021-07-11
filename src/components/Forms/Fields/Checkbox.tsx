import { cx } from '@emotion/css'
import React from 'react'
import tw, { styled } from 'twin.macro'

const clipShape = `polygon(0 0, 100% 0, 100% 79%, 79% 100%, 0% 100%)`

const StyledCheckbox = styled.div`
  ${tw`relative w-8 h-7`}

  .box-border {
    clip-path: ${clipShape};
    ${tw`absolute bg-white inset-0`}
  }

  &.checked .box-border {
    ${tw`bg-cyan-400`}
  }

  .inner-bg {
    clip-path: ${clipShape};
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;
    ${tw`absolute bg-black`}
  }

  /* &.checked .box-border {
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;
  } */

  .inner-block {
    clip-path: ${clipShape};
    top: 8px;
    left: 8px;
    bottom: 8px;
    right: 8px;

    ${tw`absolute`}
  }

  &.checked .inner-block {
    ${tw`bg-cyan-400`}
  }
`

interface CheckboxProps {
  isChecked: boolean
  className?: string
}

/**
 * This is a "fake" checkbox component
 * it is used only for the styling, not the checkbox functionality
 */
export const Checkbox = ({ isChecked, className }: CheckboxProps) => {
  return (
    <StyledCheckbox className={cx(className, { checked: isChecked })}>
      <div className="box-border" />
      <div className="inner-bg" />
      <div className="inner-block" />
    </StyledCheckbox>
  )
}
