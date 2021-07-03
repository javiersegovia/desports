import cx from 'classnames'
import { hexToRGB } from '@lib/utils/colors'
import { forwardRef } from 'react'
import { styled, theme } from 'twin.macro'
import { FrameShadowColor, FrameProps } from '.'

const shapeSize = '10px'

export const squareClipPath = `polygon(
  0px 1.5rem,
  1.5rem 0,
  calc(62% - .75rem) 0,
  62% max(${shapeSize}, 2%),
  calc(80% - .75rem) max(${shapeSize}, 2%),
  80% 0,
  calc(100% - 1.5rem) 0,
  100% 1.5rem,
  100% calc(100% - 1.5rem),
  calc(100% - 1.5rem) 100%,
  80% 100%,
  calc(80% - .75rem) min(calc(100% - ${shapeSize}), 98%),
  22% min(calc(100% - ${shapeSize}), 98%),
  calc(22% - .75rem) 100%,
  1.5rem 100%,
  0 calc(100% - 1.5rem),
  0 65%,
  min(${shapeSize}, 2%) 63%,
  min(${shapeSize}, 2%) 32%,
  0 30%
)`

const StyledFrame = styled.div<{ shadowColor?: FrameShadowColor }>`
  .frame,
  .shadowFrame {
    clip-path: ${squareClipPath};
  }

  ${({ shadowColor }) => {
    if (!shadowColor) return

    let rgba = ''
    const alpha = 0.25

    if (shadowColor === 'cyan') {
      rgba = hexToRGB(theme`colors.cyan.400`, alpha)
    } else if (shadowColor === 'yellow') {
      rgba = hexToRGB(theme`colors.yellow.400`, alpha)
    } else if (shadowColor === 'emerald') {
      rgba = hexToRGB(theme`colors.emerald.400`, alpha)
    }

    return `filter: drop-shadow(0 0 3px ${rgba});`
  }}
`

export const SquareFrame = forwardRef<HTMLDivElement, FrameProps>(
  (
    { children, color, shadowColor, removePadding, ...otherProps }: FrameProps,
    ref
  ) => {
    return (
      <StyledFrame tw="relative" shadowColor={shadowColor} {...otherProps}>
        {color && (
          <div
            className={cx('shadowFrame', {
              shadow: !!shadowColor,
              'bg-cyan-400': color === 'cyan',
              'bg-yellow-400': color === 'yellow',
            })}
            tw="absolute top-2 left-0 bottom[-6px] right[-6px]"
          />
        )}
        <div
          className={cx('frame w-full h-full relative flex flex-col', {
            'p-6': !removePadding,
          })}
          ref={ref}
          tw="bg-gray-800"
        >
          {children}
        </div>
      </StyledFrame>
    )
  }
)
