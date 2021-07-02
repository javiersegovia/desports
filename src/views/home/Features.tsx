/* eslint-disable @next/next/no-img-element */
import { Accordion, IAccordionItem } from '@components/Accordion/Accordion'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'

export const Features = () => {
  const { t } = useTranslation('home')
  const features: IAccordionItem[] = t('features.list', null, {
    returnObjects: true,
  })

  return (
    <>
      <NavSpacer tw="hidden lg:block" />

      <div tw="block lg:hidden mt-20 relative w-full h-96">
        <img
          src="/images/platform_features.png"
          alt="Platform Features"
          tw="w-full h-full absolute object-contain transform ml-4 scale-150"
        />
      </div>

      <Container tw="mx-auto relative flex-1">
        <div tw="text-center mt-10">
          <Title>{t`features.title`}</Title>
          <p tw="text-coolGray-300 mt-6 max-w-3xl mx-auto whitespace-pre-line">{t`features.description`}</p>
        </div>

        <div
          tw="hidden lg:block"
          style={{
            marginRight: -100,
            marginLeft: 100,
          }}
        >
          <img
            src="/images/platform_features.png"
            alt="Platform Features"
            tw="absolute top-0 transform left-1/2 -translate-x-full z-index[-1] max-h-full xl:max-h-[110%]"
          />
        </div>

        <div tw="block lg:grid gap-10 grid-flow-col grid-cols-[1.5fr 2fr] lg:space-x-10 mt-10">
          <div tw="relative block" />
          <div tw="mt-10">
            <Accordion tw="lg:absolute" items={features} />
          </div>
        </div>
      </Container>
    </>
  )
}
