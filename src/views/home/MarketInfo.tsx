interface MarketInfoProps {
  title: string
  value: string
}

export const MarketInfo = ({ title, value, ...props }: MarketInfoProps) => {
  return (
    <div tw="text-center" {...props}>
      <div tw="font-bold">{title}</div>
      <div tw="font-mono">{value}</div>
    </div>
  )
}
