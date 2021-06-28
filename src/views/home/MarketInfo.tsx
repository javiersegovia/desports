interface MarketInfoProps {
  title: string
  value: string
}

export const MarketInfo = ({ title, value }: MarketInfoProps) => {
  return (
    <div tw="text-center">
      <div tw="font-bold">{title}</div>
      <div tw="font-mono">{value}</div>
    </div>
  )
}
