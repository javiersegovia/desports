import { styled } from 'twin.macro'

interface LineChartProps {
  max: number
  current: number
}

export const StyledCompletionBar = styled.div`
  clip-path: polygon(0% 100%, 0.75rem 0%, calc(100% - 0.75rem) 0%, 100% 100%);

  @keyframes burnPing {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes burnPulse {
    50% {
      opacity: 0.5;
    }
  }

  &.animate-burn-ping {
    animation: burnPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  &.animate-burn-pulse {
    animation: burnPulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`

export const StyledFullfillnessBar = styled.div`
  clip-path: polygon(0% 100%, 0.75rem 0%, calc(100% - 0.75rem) 0%, 100% 100%);
`

export const LineChart = ({ max, current, ...props }: LineChartProps) => {
  const completion = (current * 100) / max

  return (
    <StyledFullfillnessBar
      tw="relative w-full h-4 flex overflow-hidden"
      {...props}
    >
      {/* <StyledCompletionBar
        tw="absolute bg-black z-10 right-0 top-0 bottom-0"
        className="hidden lg:block animate-burn-ping"
        style={{ width: `${completion}%` }}
      /> */}
      <StyledCompletionBar
        tw="absolute bg-blueGray-600 z-10 right-[-1px] top-0 bottom-0"
        style={{ width: `${completion}%` }}
      />
      <StyledFullfillnessBar tw="flex-1 bg-cyan-400 absolute left-0 right-0 top-0 bottom-0 font-mono font-bold flex items-center justify-between" />
    </StyledFullfillnessBar>
  )
}
