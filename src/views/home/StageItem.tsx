import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import Image from 'next/image'
import tw from 'twin.macro'

interface IStageItem {
  title: string
  name: string
}

interface StageItemProps {
  image: StaticImageData
  item: IStageItem
  number: number
  color: string
  onClick: () => void
  isLocked?: boolean
}

export const StageItem = ({
  item,
  image,
  number,
  color,
  onClick,
  isLocked = false,
  ...otherProps
}: StageItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      css={[isLocked && tw`opacity-30`]}
      {...otherProps}
    >
      <SquareFrame removePadding shadowColor="cyan">
        <Image src={image} alt={`Stage ${number}`} />
      </SquareFrame>
      <div tw="mt-8 font-mono uppercase font-bold text-3xl ml-5">
        <h4>{item.title}</h4>
        <h5 tw="mt-2" style={{ color }}>
          {item.name}
        </h5>
      </div>
    </button>
  )
}
