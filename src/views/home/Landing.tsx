/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
import { Bar } from '@components/Bar'
import { Container } from '@components/UI/Container'
import { MiniFrame } from '@components/UI/Frames/MiniFrames'
import { RectFrame } from '@components/UI/Frames/RectFrame'
import { Title } from '@components/UI/Title'
import { MarketInfo } from './MarketInfo'
import { Button } from '@components/UI/Button'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import tw, { styled, theme } from 'twin.macro'

import landingFrameImg from '@public/images/landing_frame.svg'
import { FaYoutube } from 'react-icons/fa'

const StyledBackground = styled.div`
  background: url('/images/background-final.jpg');
`

const StyledVideoFrame = styled.div`
  .background {
    background: url('/images/background-final.jpg');
    filter: brightness(30%);
    z-index: -1;

    ${tw`bg-center absolute w-full h-full bg-cover bg-no-repeat`}
  }

  ${tw`w-full flex items-center justify-center aspect-w-10 aspect-h-7`}
  clip-path: polygon(0 7%, 25% 8%, 30% 0, 92% 0, 98% 9%, 98% 65%, 100% 69%, 100% 93%, 55% 93%, 52% 100%, 20% 100%, 0 75%);
`

const StyledVideoThumbnail = styled.div<any>`
  background: url('/images/background-final.jpg');
  ${tw`bg-cover bg-no-repeat bg-center relative`}

  &:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    background-image: linear-gradient(
      180deg,
      rgba(255, 0, 0, 0) 0%,
      ${theme`colors.gray.900`} 95%
    );
  }
`

const StyledDataLine = styled.div`
  clip-path: polygon(100% 0%, 100% 100%, 0 100%, 1rem 0);
`

const StyledPartnerLine = styled.div`
  clip-path: polygon(100% 0%, 100% 100%, 0 100%, 1rem 0);
`

const FrameDivider = styled.div`
  height: 1px;

  ${tw`bg-cyan-400 flex w-full`}

  &:after {
    content: '';
    height: 6px;
    ${tw`block ml-auto w-28 bg-cyan-400`}
    clip-path: polygon(100% 0%, 100% 100%, 1rem 100%, 0 0);
  }
`

export const Landing = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <StyledBackground tw="hidden lg:block absolute z-index[-1] bg-cover bg-center bg-no-repeat opacity[.35] w-full h-full" />

      <main tw="relative flex-1 flex flex-col">
        <StyledVideoThumbnail tw="h-40 w-full relative lg:hidden">
          <button
            type="button"
            tw="absolute w-full h-full z-10"
            onClick={() => alert('playvideo')}
          >
            <FaYoutube tw="text-cyan-400 text-5xl mx-auto" />
          </button>
        </StyledVideoThumbnail>

        <Container tw="relative w-full flex-1 lg:flex">
          <div tw="lg:mt-32 space-y-4 flex-1">
            <div tw="flex-col lg:flex-row flex lg:space-x-4 uppercase font-bold font-mono tracking-widest">
              <div>
                <span tw="text-emerald-400">{t`landing.pre-sale`}:</span>
                <span> 2D 24H 15S</span>
              </div>

              <div>
                <span tw="text-yellow-400">{t`landing.launch`}:</span>
                <span> 2D 24H 15S</span>
              </div>
            </div>
            <Title as="h1" tw="text-3xl">{t`landing.title`}</Title>
            <h2 tw="text-base lg:text-xl whitespace-pre-wrap text-coolGray-300 lg:max-w-xl">{t`landing.description`}</h2>
            <div tw="flex lg:flex-row pt-8 space-x-6">
              <Button
                bgColor={theme`colors.cyan.400`}
                tw="flex-1 lg:flex-grow-0"
              >{t`landing.trackers`}</Button>

              <Button tw="flex-1 lg:flex-grow-0">{t`landing.buy-now`}</Button>
            </div>
            <div tw="font-bold">
              <span>{t`landing.contract-address`}</span>
              {/* todo: add link to Tokenomics section */}
              <span tw="hidden lg:inline-block ml-2"> — </span>
              <span tw="text-cyan-400 hidden lg:inline-block ml-2">
                {t`landing.view-tokenomics`}
              </span>
              <div tw="mt-2 font-normal text-xs md:text-sm font-mono">
                0xe5a09784b16e1065c37df14c6e2f06fdce317a1b
              </div>
            </div>
          </div>

          <div tw="hidden lg:block relative flex-1 max-h-full">
            <div tw="absolute h-[calc(100% + 1px)] w-full flex">
              <img src="/images/landing_frame.svg" alt="Frame" tw="" />

              <div tw="z-10 pt-32 bg-gray-900 flex-1 w-full -ml-1">
                <StyledVideoFrame>
                  <div className="background" />
                  <button type="button" onClick={() => alert('playvideo')}>
                    <FaYoutube tw="text-cyan-400 text-5xl mx-auto" />
                  </button>
                </StyledVideoFrame>

                <aside tw="mt-20 ml-10 font-mono font-bold uppercase">
                  <h4 tw=" letter-spacing[1px]">Competitions Prize Pool</h4>
                  <div tw="text-yellow-400 text-4xl mt-2">
                    231.123.235,32 USD
                  </div>
                  <FrameDivider tw="mt-3" />
                </aside>
              </div>
            </div>
          </div>
        </Container>

        <div tw="absolute w-1/3 bg-gray-900 h-[calc(100% + 1px)] right-0 z-index[-1]" />
      </main>

      <section tw="mt-auto relative">
        <StyledDataLine tw="hidden lg:block ml-auto w-10/12 h-4 -mt-4 bg-gray-900 z-10" />
        <div tw="lg:bg-gray-900 w-full h-16 flex mt-auto relative">
          <Container tw="flex relative flex-col">
            <div tw="bg-gray-800 lg:bg-transparent w-full mx-auto lg:mx-0 lg:w-1/2 flex flex-wrap lg:flex-nowrap lg:space-x-20 text-coolGray-300">
              <MarketInfo title={t`landing.current-price`} value="123124" />
              <MarketInfo title={t`landing.holders`} value="123124" />
              <div tw="lg:hidden bg-pink-600 height[2px] w-full block" />
              <MarketInfo title={t`landing.supply`} value="123124" />
              <MarketInfo title={t`landing.marketcap`} value="123124" />
              <div tw="lg:hidden bg-purple-600 height[2px] w-full block" />
            </div>
          </Container>
        </div>

        <StyledPartnerLine tw="hidden lg:block ml-auto absolute right-0 w-5/12 h-4 -mt-4 bg-gray-800 z-10" />

        <div tw="hidden lg:flex bg-gray-800 w-full h-16 mt-auto space-x-4 relative">
          <Container tw="flex items-center m-auto justify-between">
            <div tw="flex items-center space-x-4">
              <img
                src="/images/scroll-down.svg"
                alt="Scroll down"
                tw="animate-bounce"
              />
              <span tw="font-mono uppercase font-bold letter-spacing[1px] text-sm">{t`landing.scroll-more`}</span>
            </div>
            <div tw="flex items-center space-x-4">
              <div>
                <Image
                  src="/images/trackers/coingecko.png"
                  alt="Coingecko"
                  width={42}
                  height={42}
                />
              </div>
              <div>
                <Image
                  src="/images/trackers/coinmarketcap.png"
                  alt="Coingecko"
                  width={42}
                  height={42}
                />
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  )
}
