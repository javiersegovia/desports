import { Bar } from '@components/Bar'
import { Container } from '@components/UI/Container'
import { MiniFrame } from '@components/UI/Frames/MiniFrames'
import { RectFrame } from '@components/UI/Frames/RectFrame'
import { Title } from '@components/UI/Title'
import { MarketInfo } from './MarketInfo'
import { styled } from 'twin.macro'
import { Button } from '@components/UI/Button'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'

const StyledBackground = styled.div`
  background: url('/images/background-final.jpg');
`

export const Landing = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <StyledBackground tw="absolute z-index[-1] bg-cover bg-no-repeat opacity[.35] w-full h-full" />
      <Container tw="w-full my-auto">
        <div tw="flex justify-between items-center">
          <div tw="space-y-4">
            <div tw="flex space-x-4 uppercase font-bold font-mono tracking-widest">
              <div>
                <span tw="text-emerald-400">{t`landing.pre-sale`}</span>
                <span> 2D 24H 15S</span>
              </div>
              <div>{'//'}</div>
              <div>
                <span tw="text-emerald-400">{t`landing.launch`}</span>
                <span> 2D 24H 15S</span>
              </div>
            </div>
            <Title as="h1">{t`landing.title`}</Title>
            <h2 tw="text-xl whitespace-pre-wrap text-coolGray-300 max-w-xl">{t`landing.description`}</h2>
            <div tw="pt-8 space-x-6">
              {/* <Button>{t`landing.trackers`}</Button> */}
              <Button>{t`landing.join-telegram`}</Button>
              <Button>{t`landing.buy-now`}</Button>
            </div>
            <div tw="font-bold">
              <span>{t`landing.contract-address`} - </span>
              {/* todo: add link to Tokenomics section */}
              <span tw="text-cyan-400">{t`landing.view-tokenomics`}</span>
              <div tw="mt-2 font-normal text-sm font-mono">
                0xe5a09784b16e1065c37df14c6e2f06fdce317a1b
              </div>
            </div>
          </div>
          <div tw="space-y-6">
            <RectFrame tw="width[400px] height[140px]" color="yellow">
              <div tw="flex items-center justify-between">
                <div tw="text-yellow-400 text-lg font-bold">{t`landing.available-pool`}</div>
                <p tw="text-sm">{t`landing.total-rewarded`}: 1.5K</p>
              </div>
              <Bar tw="mt-1" max={1500} current={400} />
              <div tw="mt-1 flex items-center justify-between font-bold">
                <span>{t`landing.current-total`}</span>
                <span>{t`landing.ath-pool`}</span>
              </div>
            </RectFrame>
            {/* <Frame tw="width[400px] height[159px]" color="cyan" /> */}
          </div>
        </div>
        <div tw="mt-[10%] grid grid-flow-col">
          <MiniFrame tw="height[80px]" type="v1">
            <MarketInfo title={t`landing.current-price`} value="0.000004114" />
          </MiniFrame>
          <MiniFrame tw="height[80px]" type="v2">
            <MarketInfo title={t`landing.holders`} value="2,371,474" />
          </MiniFrame>
          <MiniFrame tw="height[80px]" type="v3">
            <MarketInfo title={t`landing.supply`} value="51,529,693,054" />
          </MiniFrame>
          <MiniFrame tw="height[80px]" type="v4">
            <MarketInfo title={t`landing.marketcap`} value="2,529,693,054" />
          </MiniFrame>
        </div>
      </Container>
      <div tw="bg-gray-800 w-full h-16 flex items-center justify-center space-x-4">
        <div tw="flex items-center">
          <Image
            src="/images/trackers/coingecko.png"
            alt="Coingecko"
            width={42}
            height={42}
          />
        </div>
        <div tw="flex items-center">
          <Image
            src="/images/trackers/coinmarketcap.png"
            alt="Coingecko"
            width={42}
            height={42}
          />
        </div>
      </div>
    </>
  )
}
