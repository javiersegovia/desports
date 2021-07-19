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

// todo: refactor the styles inside this component.
// Instead of having separate components with "Rect" and "Square" Frames, we should use this one.
// We should remove the unused components regarding the "Frames", move all the interfaces here,
// and maybe give this component a more appropiate name.

export const squareClipPathV2 = `polygon(
  0px 10%,
  10% 0,
  calc(60% - 4px) 0,
  60% min(4px, 2%),
  calc(80% - 4px) min(4px, 2%),
  80% 0,
  90% 0,
  100% 10%,
  100% calc(90%),
  calc(90%) 100%,
  65% 100%,
  calc(65% - 4px) max(calc(100% - 4px), 98%),
  35% max(calc(100% - 4px), 98%),
  calc(35% - 4px) 100%,
  10% 100%,
  0 90%,
  0 65%,
  min(4px, 3%) 63%,
  min(4px, 3%) 32%,
  0 30%
)`

const StyledFrame = styled.div<{
  shadowColor?: FrameShadowColor
  isSquare?: boolean
}>`
  & > .frame,
  & > .shadowFrame {
    clip-path: ${({ isSquare }) =>
      isSquare ? squareClipPathV2 : squareClipPath};
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
    {
      children,
      color,
      shadowColor,
      removePadding,
      bgColor,
      isSquare = false,
      ...otherProps
    }: FrameProps,
    ref
  ) => {
    return (
      <StyledFrame
        tw="relative"
        shadowColor={shadowColor}
        isSquare={isSquare}
        {...otherProps}
      >
        {color && (
          <div
            className={cx('shadowFrame', {
              shadow: !!shadowColor,
              'bg-cyan-400': color === 'cyan',
              'bg-yellow-400': color === 'yellow',
              'bg-emerald-400': color === 'emerald',
            })}
            tw="absolute top-2 left-0 bottom[-6px] right[-6px]"
          />
        )}
        <div
          className={cx(
            'frame w-full bg-gray-800 h-full relative flex flex-col',
            {
              'p-6': !removePadding,
            }
          )}
          ref={ref}
          style={{
            backgroundColor: bgColor,
          }}
        >
          {children}
        </div>
      </StyledFrame>
    )
  }
)
