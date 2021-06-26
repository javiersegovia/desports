/* eslint-disable @next/next/no-img-element */
import { Accordion, IAccordionItem } from '@components/Accordion/Accordion'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
// import Image from 'next/image'
// import platformImage from '@root/public/images/platform_features.png'

export const Features = () => {
  const { t } = useTranslation('home')
  const features: IAccordionItem[] = t('features.list', null, {
    returnObjects: true,
  })

  return (
    <>
      <NavSpacer />
      <Container tw="mx-auto">
        <div tw="text-center mt-10">
          <Title>{t`features.title`}</Title>
          <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto whitespace-pre-line">{t`features.description`}</p>
        </div>

        <div
          style={{
            marginRight: -100,
            marginLeft: 100,
          }}
        >
          <img
            // src={platformImage}
            src="/images/platform_features.png"
            alt="Background"
            tw="absolute top-20 transform left-1/2 -translate-x-full z-index[-1]"
          />
        </div>

        <div tw="grid gap-10 grid-flow-col grid-cols-[1.5fr 2fr] space-x-10 mt-10">
          <div tw="relative block" />
          <div tw="mt-10">
            <Accordion items={features} />
          </div>
        </div>
      </Container>
    </>
  )
}
