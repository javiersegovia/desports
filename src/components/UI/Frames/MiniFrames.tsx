import { styled } from 'twin.macro'
import { FrameProps } from '.'
import cx from 'classnames'

const shapeSize = '7px'

export const clipPathV1 = `polygon(0 0, 100% 0, 100% 25%, calc(100% - ${shapeSize}) 31%, calc(100% - ${shapeSize}) 69%, 100% 75%, 100% 100%, 5% 100%, 0 75%)`

export const clipPathV2 = `polygon(
  ${shapeSize} 0%,
  ${shapeSize} 25%,
  0 31%,
  0% 69%,
  ${shapeSize} 75%,
  ${shapeSize} 100%,
  100% 100%,
  100% 75%,
  calc(100% - ${shapeSize}) 69%,
  calc(100% - ${shapeSize}) 31%,
  100% 25%,
  100% 0%
)`

export const clipPathV3 = `polygon(
  ${shapeSize} 0%,
  ${shapeSize} 25%,
  0 31%,
  0% 69%,
  ${shapeSize} 75%,
  ${shapeSize} 100%,
  calc(100% - ${shapeSize}) 100%,
  calc(100% - ${shapeSize}) 75%,
  100% 69%,
  100% 31%,
  calc(100% - ${shapeSize}) 25%,
  calc(100% - ${shapeSize}) 0%
)`

export const clipPathV4 = `polygon(
  0 0,
  0 25%,
  ${shapeSize} 31%,
  ${shapeSize} 69%,
  0% 75%,
  0% 100%,
  100% 100%,
  100% 25%,
  95% 0%
)`

const StyledFrame = styled.div`
  /* --shape-size: ${shapeSize} ; */

  &.v1 {
    .frame,
    .shadowFrame {
      clip-path: ${clipPathV1};
    }
  }

  &.v2 {
    .frame,
    .shadowFrame {
      clip-path: ${clipPathV2};
    }
  }

  &.v3 {
    .frame,
    .shadowFrame {
      clip-path: ${clipPathV3};
    }
  }

  &.v4 {
    .frame,
    .shadowFrame {
      clip-path: ${clipPathV4};
    }
  }
`

interface MiniFrameProps extends FrameProps {
  type: 'v1' | 'v2' | 'v3' | 'v4'
}

export const MiniFrame = ({
  children,
  className,
  type,
  ...otherProps
}: MiniFrameProps) => {
  return (
    <StyledFrame
      tw="relative"
      className={cx(className, {
        v1: type === 'v1',
        v2: type === 'v2',
        v3: type === 'v3',
        v4: type === 'v4',
      })}
      {...otherProps}
    >
      <div
        className="shadowFrame"
        tw="absolute top-0 left[1px] bottom-0 right[-4px] bg-blueGray-500"
      />
      <div
        className="frame"
        tw="bg-gray-900 w-full h-full relative p-1 flex items-center justify-center text-center"
      >
        {children}
      </div>
    </StyledFrame>
  )
}
