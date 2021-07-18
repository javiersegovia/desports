import { Accordion, IAccordionItem } from '@components/Accordion/Accordion'
import { LineChart } from '@components/Chart/LineChart'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import tw, { styled } from 'twin.macro'
import bgImg from '@public/images/tokenomics_background.webp'
import { config } from '@lib/config/config'

const StyledBackground = styled(Image)`
  ${tw`absolute z-index[-1] bg-contain bg-center bg-no-repeat w-full h-full opacity-[.15]`}
  mix-blend-mode: color-dodge;
  filter: brightness(50%);
`

export const Tokenomics = () => {
  const { t } = useTranslation('home')
  const tokenomics: IAccordionItem[] = t('tokenomics.list', null, {
    returnObjects: true,
  })

  const calculatePorcentageOf = (number1: number, number2: number) => {
    return ((number1 / number2) * 100).toFixed(2)
  }

  return (
    <>
      <StyledBackground
        src={bgImg}
        tw="bg-top lg:bg-center"
        layout="fill"
        objectFit="contain"
      />
      <NavSpacer tw="hidden lg:block" />

      <Container tw="mt-10 lg:mt-0 mx-auto flex flex-col max-h-full flex-1">
        <div tw="text-center mt-10">
          <Title>{t`tokenomics.title`}</Title>
          <p tw="text-coolGray-300 mt-6 max-w-3xl mx-auto">{t`tokenomics.description`}</p>
        </div>

        <div tw="relative grid-auto-rows[100%] block gap-0 lg:grid lg:gap-10 grid-flow-col grid-cols-[2.5fr 1.5fr] lg:space-x-10 max-h-full flex-1 pt-10 overflow-hidden">
          <div tw="relative max-h-full overflow-hidden">
            <Accordion tw="lg:absolute lg:top-0" items={tokenomics} />
          </div>

          <div tw="mt-20 lg:mt-0">
            <SquareFrame
              tw="width[100%] mt-10 lg:mt-0 mx-auto max-w-xs"
              shadowColor="emerald"
            >
              <Title as="h5" tw="text-2xl sm:text-3xl lg:text-xl mt-4 mx-auto">
                {t`tokenomics.token_supply.title`}
              </Title>

              <div tw="mt-6 mx-auto px-10 w-full space-y-4">
                <LineChart tw="m-auto mb-0" current={config.total_burned} max={config.total_supply} />

                <div tw="pt-4">
                  <div tw="font-bold">
                    {t`tokenomics.token_supply.total`} (100%)
                  </div>
                  <div tw="font-mono">{config.total_supply.toLocaleString()}</div>
                </div>

                <div>
                  <div tw="font-bold text-emerald-400">
                    {t`tokenomics.token_supply.circulating`} ({calculatePorcentageOf(config.total_circulating, config.total_supply)}%)
                  </div>
                  <div tw="font-mono text-emerald-400">
                    {config.total_circulating.toLocaleString()}
                  </div>
                </div>

                <div tw="pb-10">
                  <div tw="font-bold text-red-500">
                    {t`tokenomics.token_supply.burned`} ({calculatePorcentageOf(config.total_burned, config.total_supply)}%)
                  </div>
                  <div tw="font-mono text-red-500">{config.total_burned.toLocaleString()}</div>

                </div>
              </div>
            </SquareFrame>
          </div>
        </div>
      </Container>
    </>
  )
}
