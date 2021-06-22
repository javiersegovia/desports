interface BarProps {
  max: number
  current: number
}

// todo: add rectangle to the yellow bar

export const Bar = ({ max, current, ...props }: BarProps) => {
  const completion = (current * 100) / max
  return (
    <div tw="relative w-full h-8 border border-white" {...props}>
      <div
        tw="absolute bg-yellow-400 left[-1px] top[-1px] bottom[-1px]"
        style={{ width: `${completion}%` }}
      ></div>
      <div tw="absolute left-6 right-6 top-0 bottom-0 font-mono font-bold flex items-center justify-between">
        <span tw="text-black">{current}</span>
        <span tw="text-white">{max}</span>
      </div>
    </div>
  )
}
