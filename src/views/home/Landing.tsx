import { Bar } from '@components/Bar'
import Button from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import { Frame } from '@components/UI/Frame'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import { styled } from 'twin.macro'

const StyledBackground = styled.div`
  background: url('/images/background-final.jpg');
`

export const Landing = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <StyledBackground tw="absolute z-index[-1] bg-cover bg-no-repeat opacity-50 w-full h-full text-2xl font-bold" />
      <Container tw="flex justify-between w-full my-auto items-center">
        <div tw="space-y-6">
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
          <h2 tw="text-xl whitespace-pre-wrap max-w-xl">{t`landing.description`}</h2>
          <div tw="space-x-6">
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
          <Frame tw="width[400px] height[140px]" color="yellow">
            <div tw="flex items-center justify-between">
              <div tw="text-yellow-400 text-lg font-bold">{t`landing.available-pool`}</div>
              <p tw="text-sm">{t`landing.total-rewarded`}: 1.5K</p>
            </div>
            <Bar tw="mt-1" max={1500} current={400} />
            <div tw="mt-1 flex items-center justify-between font-bold">
              <span>{t`landing.current-total`}</span>
              <span>{t`landing.ath-pool`}</span>
            </div>
          </Frame>
          {/* <Frame tw="width[400px] height[159px]" color="cyan" /> */}
        </div>
      </Container>
    </>
  )
}
