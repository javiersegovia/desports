interface CircleChartProps {
  current: number
  max: number
}

export const CircleChart = ({ current, max }: CircleChartProps) => {
  const completion = (current * 100) / max

  return (
    <div tw="relative m-auto w-full">
      <svg
        viewBox="0 0 36 36"
        className="block w-full h-full max-w-full max-h-40"
      >
        <path
          tw="stroke-current text-emerald-400"
          fill="none"
          strokeWidth="3.4"
          strokeDasharray={`${100}, ${100}`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          tw="stroke-current text-red-500 animate-pulse"
          fill="none"
          strokeWidth="2.8"
          strokeDasharray={`${completion}, ${100}`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
    </div>
  )
}
