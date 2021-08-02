import React from 'react'
import { AccordionItem, IAccordionItem } from '@components/Accordion/Accordion'
import { Title } from '@components/UI/Title'
import { useActiveIndex } from '@lib/hooks/useActiveIndex'
import useTranslation from 'next-translate/useTranslation'

export const RaidFAQ = () => {
  const { t } = useTranslation('nft-common')

  const faqList: IAccordionItem[] = t('faq.list', null, { returnObjects: true })

  const { activeIndex, setActiveIndex } = useActiveIndex({
    maxIndex: faqList.length - 1,
    play: false,
  })

  return (
    <div tw="flex flex-col items-center lg:justify-between lg:items-start space-y-20 lg:space-y-0 lg:flex-row lg:space-x-20">
      <div>
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
      </div>

      <div tw="sm:max-w-md lg:max-w-sm xl:max-w-md 2xl:max-w-lg">
        <video
          data-object-fit="cover"
          data-object-position="center center"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          tw="rounded-md overflow-hidden"
        >
          <source src="/images/nft/despion_card.mp4" type="video/mp4" />
        </video>
        <div tw="text-center w-full mt-4 text-sm">
          <p tw="text-white font-bold font-mono">
            Despion —{' '}
            <span tw="text-yellow-400 font-bold font-mono">Legendary NFT</span>
          </p>

          <p>{t`faq.image_description`}</p>
        </div>
      </div>
    </div>
  )
}
