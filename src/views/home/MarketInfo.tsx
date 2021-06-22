interface MarketInfoProps {
  title: string
  value: string
}

export const MarketInfo = ({ title, value }: MarketInfoProps) => {
  return (
    <div tw="m-auto">
      <div tw="font-mono">{value}</div>
      <div tw="font-bold">{title}</div>
    </div>
  )
}
