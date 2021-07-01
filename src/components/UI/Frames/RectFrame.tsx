/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro'
import { FrameProps } from '.'

const StyledFrame = styled.div`
  .frame,
  .shadowFrame {
    clip-path: polygon(
      5% 0,
      60% 0,
      62% 5%,
      80% 5%,
      82% 0%,
      95% 0,
      100% 10%,
      100% 90%,
      95% 100%,
      82% 100%,
      80% 95%,
      22% 95%,
      20% 100%,
      5% 100%,
      0% 90%,
      0 62%,
      2% 58%,
      2% 32%,
      0 28%,
      0 10%
    );
  }
`

// Todo: refactor frame to Clip Path SVG

export const RectFrame = ({ children, color, ...otherProps }: FrameProps) => {
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
