import { AccordionItem, IAccordionItem } from '@components/Accordion/Accordion'
import { Title } from '@components/UI/Title'
import { useActiveIndex } from '@lib/hooks/useActiveIndex'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

export const RaidFAQ = () => {
  const { t } = useTranslation('nft-common')

  const faqList: IAccordionItem[] = t('faq.list', null, { returnObjects: true })

  const { activeIndex, setActiveIndex } = useActiveIndex({
    maxIndex: faqList.length - 1,
    play: false,
  })

  return (
    <>
      <Title tw="text-center">{t`faq.title`}</Title>
      <div tw="space-y-4 mt-10 max-w-2xl mx-auto">
        {faqList.map((item, index) => (
          <AccordionItem
            key={item.title}
            item={item}
            isActive={index === activeIndex.index}
            onClick={() => setActiveIndex({ index, pause: true })}
          />
        ))}
      </div>
    </>
  )
}

// export const Accordion = ({ items, ...props }: AccordionProps) => {
//   // todo: update the pause value to true when the animations come in

//   const { activeIndex, setActiveIndex, pause, unpause } = useActiveIndex({
//     maxIndex: items.length - 1,
//   })

//   return (
//     <div tw="space-y-4" onMouseEnter={pause} onMouseLeave={unpause} {...props}>
//       {items.map((item, index) => (
//         <AccordionItem
//           key={item.title}
//           item={item}
//           isActive={index === activeIndex.index}
//           onClick={() => setActiveIndex({ index, pause: true })}
//         />
//       ))}
//     </div>
//   )
// }
