import { Accordion, IAccordionItem } from '@components/Accordion/Accordion'
import { CircleChart } from '@components/Chart/CircleChart'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import tw, { styled } from 'twin.macro'

const StyledBackground = styled.div`
  background: url('/images/tokenomics_background.png');
  ${tw`absolute z-index[-1] bg-contain bg-center bg-no-repeat opacity[.1] w-full h-full`}
`

export const Tokenomics = () => {
  const { t } = useTranslation('home')
  const tokenomics: IAccordionItem[] = t('tokenomics.list', null, {
    returnObjects: true,
  })

  return (
    <>
      <StyledBackground />
      <NavSpacer />
      <Container tw="mx-auto">
        <div tw="text-center mt-10">
          <Title>{t`tokenomics.title`}</Title>
          <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto">{t`tokenomics.description`}</p>
        </div>

        <div tw="grid gap-10 grid-flow-col grid-cols-[2.5fr 1.5fr] space-x-10 mt-10">
          <div tw="mt-10">
            <Accordion items={tokenomics} />
          </div>
          <div>
            <SquareFrame
              tw="width[100%] aspect-w-6 aspect-h-8"
              shadowColor="emerald"
            >
              <div tw="mt-4 mx-auto mb-auto text-center space-y-4">
                <div>
                  <div tw="font-bold">Original Supply</div>
                  <div tw="font-mono">8,8888,8888,888</div>
                </div>

                <div>
                  <div tw="font-bold text-emerald-400">
                    Circulating Supply (66.14%)
                  </div>
                  <div tw="font-mono text-emerald-400">
                    1020310201302103203310
                  </div>
                </div>

                <div>
                  <div tw="font-bold text-red-500">Total Burned (33.86%)</div>
                  <div tw="font-mono text-red-500">1231,12312,231,231,32</div>
                </div>
              </div>

              <CircleChart current={333} max={1000} />
            </SquareFrame>
          </div>
        </div>
      </Container>
    </>
  )
}
