import { cx } from '@emotion/css'
import { hexToRGB } from '@lib/utils/colors'
import tw, { styled, theme } from 'twin.macro'
import { FrameShadowColor, FrameProps } from '.'

// Todo: fix square frame polygon

const shapeSize = '10px'

const StyledFrame = styled.div<{ shadowColor?: FrameShadowColor }>`
  .frame,
  .shadowFrame {
    clip-path: polygon(
      0px 10%,
      10% 0,
      60% 0,
      62% min(${shapeSize}, 2%),
      78% min(${shapeSize}, 2%),
      80% 0%,
      90% 0%,
      100% 10%,
      100% 90%,
      90% 100%,
      80% 100%,
      78% min(calc(100% - ${shapeSize}), 100%),
      22% min(calc(100% - ${shapeSize})),
      20% 100%,
      10% 100%,
      0% 90%,
      0% 45%,
      min(${shapeSize}, 2%) 43%,
      min(${shapeSize}, 2%) 22%,
      0% 20%
    );
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

export const SquareFrame = ({
  children,
  color,
  shadowColor,
  removePadding,
  ...otherProps
}: FrameProps) => {
  return (
    <StyledFrame
      tw="relative aspect-w-1 aspect-h-1"
      shadowColor={shadowColor}
      {...otherProps}
    >
      {color && (
        <div
          className={cx('shadowFrame', {
            shadow: !!shadowColor,
          })}
          tw="absolute top-2 left-0 bottom[-6px] right[-6px]"
          css={[
            color === 'cyan' && tw`bg-cyan-400`,
            color === 'yellow' && tw`bg-yellow-400`,
          ]}
        />
      )}
      <div
        className="frame w-full h-full relative flex flex-col"
        css={!removePadding && tw`p-6`}
        tw="bg-gray-800"
      >
        {children}
      </div>
    </StyledFrame>
  )
}
