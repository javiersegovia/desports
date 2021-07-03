import { styled } from 'twin.macro'

interface LineChartProps {
  max: number
  current: number
}

const StyledCompletionBar = styled.div`
  clip-path: polygon(0% 100%, 12% 0%, 88% 0%, 100% 100%);

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

const StyledFullfillnessBar = styled.div`
  clip-path: polygon(0% 100%, 5% 0%, 100% 0%, 95% 100%);
`

export const LineChart = ({ max, current, ...props }: LineChartProps) => {
  const completion = (current * 100) / max

  return (
    <StyledFullfillnessBar
      tw="relative w-full h-4 flex overflow-hidden"
      {...props}
    >
      <StyledCompletionBar
        tw="absolute bg-red-500 z-10 left-0 top-0 bottom-0"
        className="animate-burn-ping"
        style={{ width: `${completion}%` }}
      />
      <StyledCompletionBar
        tw="absolute bg-red-500 z-10 left-0 top-0 bottom-0"
        className="animate-burn-pulse"
        style={{ width: `${completion}%` }}
      />
      <StyledFullfillnessBar tw="flex-1 bg-green-400 absolute left-0 right-0 top-0 bottom-0 font-mono font-bold flex items-center justify-between" />
    </StyledFullfillnessBar>
  )
}