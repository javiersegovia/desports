/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import { MarketInfo } from './MarketInfo'
import { Button } from '@components/UI/Button'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import tw, { styled, theme } from 'twin.macro'

import { GiTrophyCup } from 'react-icons/gi'

import coinmarketcapImg from '@public/images/trackers/coinmarketcap.png'
import coingeckoImg from '@public/images/trackers/coingecko.png'
import { FaYoutube } from 'react-icons/fa'
import { SquareFrame } from '../../components/UI/Frames/SquareFrame'
import { RiFileCopyLine } from 'react-icons/ri'
import { TrackersModal } from '@components/Modal/TrackersModal'
import { useToggle } from '@lib/hooks/useToggle'
import { config } from '@lib/config/config'
import { Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { DemoVideoModal } from '@components/Modal/DemoVideoModal'

const StyledBackground = styled.div`
  background: url('/images/background-final.jpg');
`

const StyledVideoFrame = styled.div`
  .background {
    background: url('/images/background-final.jpg');
    filter: brightness(30%);
    z-index: -1;

    ${tw`bg-center absolute w-full h-full max-h-full bg-cover bg-no-repeat`}
  }

  ${tw`w-full flex items-center justify-center aspect-w-10 aspect-h-6`}
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

interface FrameDividerProps {
  frameWidth?: number
  frameHeight?: number
}

export const FrameDivider = styled.div<FrameDividerProps>`
  height: 1px;
  background: ${(props) => props.color || theme`colors.coolGray.400`};

  ${tw`flex w-full`}

  &:after {
    content: '';
    width: ${({ frameWidth }) => `${frameWidth || 7}rem`};
    height: ${({ frameHeight }) => `${frameHeight || 6}px`};
    background: ${(props) => props.color || theme`colors.coolGray.400`};
    ${tw`block ml-auto`}
    clip-path: polygon(100% 0%, 100% 100%, 1rem 100%, 0 0);
  }
`

const PrizePool = ({ ...props }) => {
  return (
    <aside tw="flex items-center lg:block" {...props}>
      <GiTrophyCup tw="text-yellow-400 inline-block lg:hidden text-5xl mr-2" />
      <div tw="font-mono font-bold uppercase">
        <h4 tw="text-sm lg:text-base letter-spacing[1px]">
          Competitions Prize Pool
        </h4>
        <div tw="text-yellow-400 text-xl lg:text-2xl xl:text-4xl lg:mt-2">
          231.123.235,32 USD
        </div>
        <FrameDivider
          color={theme`colors.cyan.400`}
          tw="hidden lg:block mt-3"
        />
      </div>
    </aside>
  )
}

const PartnerLogos = ({ ...props }) => {
  return (
    <div tw="flex items-center space-x-4" {...props}>
      <div>
        <Image src={coingeckoImg} alt="Coingecko" width={42} height={42} />
      </div>
      <div>
        <Image
          src={coinmarketcapImg}
          alt="Coinmarketcap"
          width={42}
          height={42}
        />
      </div>
    </div>
  )
}

const MarketItems = ({ ...props }) => {
  const { t } = useTranslation('home')

  return (
    <div {...props}>
      <MarketInfo title={t`landing.current-price`} value="123124" />
      <MarketInfo title={t`landing.marketcap`} value="123124" />
      {/* <div tw="lg:hidden bg-pink-600 height[2px] w-full block col-span-2" /> */}
      <FrameDivider
        color={theme`colors.pink.600`}
        frameWidth={4}
        frameHeight={4}
        tw="lg:hidden col-span-2"
      />
      <MarketInfo title={t`landing.holders`} value="123124" />
      <MarketInfo title={t`landing.supply`} value="123124" />
      <FrameDivider
        color={theme`colors.purple.600`}
        frameWidth={4}
        frameHeight={4}
        tw="lg:hidden col-span-2"
      />
      {/* <div tw="lg:hidden bg-purple-600 height[2px] w-full block col-span-2" /> */}
    </div>
  )
}

export const Landing = () => {
  const { t } = useTranslation('home')
  const [
    trackersModalIsOpen,
    { setTrue: openTrackersModal, setFalse: closeTrackersModal },
  ] = useToggle()

  const [
    demoVideoModalIsOpen,
    { setTrue: openDemoVideoModal, setFalse: closeDemoVideoModal },
  ] = useToggle()

  const [
    isClipboardTooltipOpen,
    { setTrue: openClipboardTooltip, setFalse: closeClipboardTooltip },
  ] = useToggle()

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout

    if (isClipboardTooltipOpen) {
      hideTimeout = setTimeout(() => closeClipboardTooltip(), 1500)
    }

    return () => {
      hideTimeout && clearTimeout(hideTimeout)
    }
  }, [closeClipboardTooltip, isClipboardTooltipOpen])

  return (
    <>
      <StyledBackground tw="hidden lg:block absolute z-index[-1] bg-cover bg-center bg-no-repeat opacity[.35] w-full h-full" />

      <main tw="relative flex-1 flex flex-col">
        <StyledVideoThumbnail tw="h-40 w-full relative lg:hidden">
          <button
            type="button"
            tw="absolute w-full h-full z-10"
            onClick={openDemoVideoModal}
          >
            <FaYoutube tw="text-cyan-400 text-5xl mx-auto" />
          </button>
        </StyledVideoThumbnail>

        <Container tw="relative w-full flex-1 lg:flex">
          <div tw="lg:mt-20 xl:mt-32 space-y-4 lg:w-6/12">
            {/* ~~~~~~~~~~~~~~~~~ COUNTDOWNS ~~~~~~~~~~~~~~~~~ */}

            <div tw="flex-col lg:flex-row flex lg:space-x-4 uppercase font-bold font-mono tracking-widest 2xl:text-[1.25rem]">
              <div>
                <span tw="text-emerald-400">{t`landing.pre-sale`}:</span>
                <span> 2D 24H 15S</span>
              </div>

              <div>
                <span tw="text-yellow-400">{t`landing.launch`}:</span>
                <span> 2D 24H 15S</span>
              </div>
            </div>

            {/* ~~~~~~~~~~~~~~~~~ TITLE AND DESCRIPTION ~~~~~~~~~~~~~~~~~ */}

            <Title as="h1" tw="lg:text-4xl xl:text-5xl">
              {t`landing.title`}
            </Title>

            <h2 tw="text-base lg:text-lg xl:text-xl pt-2 whitespace-pre-wrap text-coolGray-300 lg:max-w-2xl xl:max-w-xl">
              {t`landing.description`}
            </h2>

            {/* ~~~~~~~~~~~~~~~~~ BUTTONS ~~~~~~~~~~~~~~~~~ */}

            <div tw="flex lg:flex-row pt-2 md:pt-4 space-x-6">
              <Button
                bgColor={theme`colors.cyan.400`}
                tw="flex-1 lg:flex-grow-0"
                onClick={openTrackersModal}
              >
                {t`landing.trackers`}
              </Button>

              <Button tw="flex-1 lg:flex-grow-0">{t`landing.buy-now`}</Button>
            </div>

            <div tw="pt-4 relative inline-block">
              {/* todo: add link to Tokenomics section */}
              {/* <span tw="hidden lg:inline-block ml-2"> — </span> */}
              {/* <span tw="text-cyan-400 hidden lg:inline-block ml-2">
                {t`landing.view-tokenomics`}
              </span> */}
              <button
                type="button"
                tw="block font-normal text-left"
                onClick={() => {
                  // todo: check mobile alternative
                  navigator?.clipboard?.writeText(
                    config.blockchain.contractAddress
                  )
                  openClipboardTooltip()
                }}
              >
                <span tw="font-bold font-sans">
                  {t`landing.contract-address`}:{' '}
                </span>
                <span tw="text-xs md:text-sm font-mono">
                  {config.blockchain.contractAddress}
                </span>
                <RiFileCopyLine tw="ml-2 inline-block" />
              </button>

              <Transition
                as={Fragment}
                show={isClipboardTooltipOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <div
                  aria-hidden="true"
                  tw="absolute font-mono z-20 top-full mt-1 left-1/2 transform -translate-x-1/2 rounded bg-gray-900 text-cyan-400 py-1 px-2 text-sm"
                >
                  Copied to the clipboard!
                </div>
              </Transition>
            </div>
          </div>

          <div tw="hidden lg:block relative flex-1 max-h-full">
            <div tw="absolute h-[calc(100% + 1px)] w-full flex">
              <img src="/images/landing_frame.svg" alt="Frame" tw="h-full" />

              <div tw="z-10 flex flex-col justify-start w-full bg-gray-900 -ml-2">
                <div tw="h-[60%] flex items-center pl-4 pt-10 overflow-hidden">
                  <StyledVideoFrame tw="my-auto">
                    <div className="background" />
                    <button type="button" onClick={openDemoVideoModal}>
                      <FaYoutube tw="text-cyan-400 text-5xl mx-auto" />
                    </button>
                  </StyledVideoFrame>
                </div>

                <PrizePool tw="mt-16 ml-10" />
              </div>
            </div>
          </div>
        </Container>

        <div tw="absolute w-4/12 bg-gray-900 h-[calc(100% + 1px)] right-0 z-index[-1]" />
      </main>

      <section tw="mt-auto relative">
        <div tw="hidden lg:flex bg-gray-900 w-full h-16 mt-auto relative">
          <Container tw="flex relative flex-col">
            <StyledDataLine tw="hidden lg:block -ml-10 w-full min-h-[1rem] -mt-4 bg-gray-900" />
            <div tw="bg-transparent mx-0 text-coolGray-300">
              <MarketItems tw="flex flex-nowrap space-x-20" />
            </div>
          </Container>
        </div>
        <SquareFrame tw="mt-8 block lg:hidden mx-auto max-w-xs">
          <MarketItems tw="grid grid-cols-2 gap-y-5" />
          <PartnerLogos tw="my-5 mx-auto" />
          <PrizePool tw="pb-5" />
        </SquareFrame>

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
            <PartnerLogos />
          </Container>
        </div>
      </section>

      <TrackersModal isOpen={trackersModalIsOpen} close={closeTrackersModal} />
      <DemoVideoModal
        isOpen={demoVideoModalIsOpen}
        close={closeDemoVideoModal}
      />
    </>
  )
}
