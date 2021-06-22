import tw, { styled } from 'twin.macro'
import { FrameProps } from '.'

// Todo: fix square frame polygon

const StyledFrame = styled.div`
  .frame,
  .shadowFrame {
    clip-path: polygon(
      0 10%,
      8% 0,
      64% 0,
      65% 2%,
      83% 2%,
      84% 0,
      92% 0,
      100% 10%,
      100% 91%,
      92% 100%,
      80% 100%,
      78% 98%,
      18% 98%,
      16% 100%,
      6% 100%,
      0 93%,
      0% 47%,
      2% 45%,
      2% 24%,
      0 22%
    );
  }
`

// Todo: refactor frame to Clip Path SVG

export const SquareFrame = ({ children, color, ...otherProps }: FrameProps) => {
  return (
    <StyledFrame tw="relative" {...otherProps}>
      {color && (
        <div
          className="shadowFrame"
          tw="absolute top-2 left-0 bottom[-6px] right[-6px]"
          css={[
            color === 'cyan' && tw`bg-cyan-400`,
            color === 'yellow' && tw`bg-yellow-400`,
          ]}
        />
      )}
      <div className="frame w-full h-full relative p-6" tw="bg-gray-900">
        {children}
      </div>
    </StyledFrame>
  )
}
