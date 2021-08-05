/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { useActiveIndex } from '@lib/hooks/useActiveIndex'
export interface IAccordionItem {
  title: string
  description?: string
}

export const AccordionItem = ({
  item: { title, description },
  isActive,
  onClick,
}: {
  item: IAccordionItem
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      tw="text-left rounded-md px-6 py-2 transition-all ease-linear"
      css={[isActive && tw`bg-gray-800 p-6`]}
    >
      <h4
        tw="uppercase font-medium font-mono"
        css={[isActive && tw`text-cyan-400 font-bold`]}
      >
        {title}
      </h4>
      <p
        tw="overflow-hidden transition-all ease-linear duration-300 whitespace-pre-wrap text-sm 2xl:text-base"
        css={[isActive ? tw`max-h-96` : tw`max-h-0`]}
      >
        {description}
      </p>
    </button>
  )
}

interface AccordionProps {
  items: IAccordionItem[]
}

export const Accordion = ({ items, ...props }: AccordionProps) => {
  // todo: update the pause value to true when the animations come in

  const { activeIndex, setActiveIndex, pause, unpause } = useActiveIndex({
    maxIndex: items.length - 1,
    play: true,
  })

  return (
    <div tw="space-y-4" onMouseEnter={pause} onMouseLeave={unpause} {...props}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          item={item}
          isActive={index === activeIndex.index}
          onClick={() => setActiveIndex({ index, pause: true })}
        />
      ))}
    </div>
  )
}
