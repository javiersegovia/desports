/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import { Button } from '@components/UI/Button'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import tw, { styled, theme } from 'twin.macro'

import { GiTrophyCup } from 'react-icons/gi'
import { FaYoutube } from 'react-icons/fa'

// import coinmarketcapImg from '@public/images/trackers/coinmarketcap.png'
// import coingeckoImg from '@public/images/trackers/coingecko.png'
import techrateImg from '@public/images/logos/logo_techrate.webp'
// import { MarketInfo } from './MarketInfo'
// import { SquareFrame } from '../../components/UI/Frames/SquareFrame'
import { RiFileCopyLine } from 'react-icons/ri'
import { useToggle } from '@lib/hooks/useToggle'
import { config } from '@lib/config/config'
import { useEffect } from 'react'

import bgImg from '@public/images/home_bg.jpg'
import introVideoImg from '@public/images/bg__intro-video.jpg'
import { VscLock } from 'react-icons/vsc'
import dynamic from 'next/dynamic'
import { InstanceModalProps } from '@components/Modal/BaseModal'
import { routes } from '@lib/config/routes'
import { useClipboard } from '@lib/hooks/useClipboard'
import { ClipboardTooltip } from '@components/Miscellaneous/ClipboardTooltip'
import { useTimeLeft } from '@lib/hooks/useTimeLeft'

const DemoVideoModal = dynamic<InstanceModalProps>(() =>
  import('@components/Modal/DemoVideoModal').then(
    (module) => module.DemoVideoModal
  )
)

const TrackersModal = dynamic<InstanceModalProps>(() =>
  import('@components/Modal/TrackersModal').then(
    (module) => module.TrackersModal
  )
)

const StyledVideoFrame = styled.div`
  .background {
    filter: brightness(30%);
    z-index: -1;

    ${tw`bg-center absolute w-full h-full max-h-full bg-cover bg-no-repeat`}
  }

  ${tw`w-full flex items-center justify-center aspect-w-10 aspect-h-6`}
  clip-path: polygon(0 7%, 25% 8%, 30% 0, 92% 0, 98% 9%, 98% 65%, 100% 69%, 100% 93%, 55% 93%, 52% 100%, 20% 100%, 0 75%);
`

const StyledVideoThumbnail = styled.div<any>`
  background-image: url('/images/bg__intro-video.jpg');
  ${tw`bg-cover bg-no-repeat bg-center relative`}

  &:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    background: -moz-linear-gradient(
      180deg,
      rgba(255, 0, 0, 0) 0%,
      ${theme`colors.gray.900`} 95%
    );
    background: -webkit-gradient(
      180deg,
      rgba(255, 0, 0, 0) 0%,
      ${theme`colors.gray.900`} 95%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(255, 0, 0, 0) 0%,
      ${theme`colors.gray.900`} 95%
    );
    background: linear-gradient(
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
          {/* todo: translate */}
          Competitions Prize Pool
        </h4>
        <div tw="text-yellow-400 text-xl lg:text-3xl xl:text-4xl lg:mt-2">
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
      <a href={config.external.audit} target="_blank" rel="noopener noreferrer">
        <Image src={techrateImg} alt="Techrate" width={40} height={40} />
      </a>
      {/* <div>
        <Image src={coingeckoImg} alt="Coingecko" width={42} height={42} />
      </div>
      <div>
        <Image
          src={coinmarketcapImg}
          alt="Coinmarketcap"
          width={42}
          height={42}
        />
      </div> */}
    </div>
  )
}

// const MarketItems = ({ ...props }) => {
//   const { t } = useTranslation('home')

//   return (
//     <div {...props}>
//       <MarketInfo title={t`landing.current-price`} value="123124" />
//       <MarketInfo title={t`landing.marketcap`} value="123124" />

//       <FrameDivider
//         color={theme`colors.pink.600`}
//         frameWidth={4}
//         frameHeight={4}
//         tw="lg:hidden col-span-2"
//       />
//       <MarketInfo title={t`landing.holders`} value="123124" />
//       <MarketInfo title={t`landing.supply`} value="123124" />
//       <FrameDivider
//         color={theme`colors.purple.600`}
//         frameWidth={4}
//         frameHeight={4}
//         tw="lg:hidden col-span-2"
//       />
//       {/* <div tw="lg:hidden bg-purple-600 height[2px] w-full block col-span-2" /> */}
//     </div>
//   )
// }

const PresaleTimer = () => {
  const { TimeComponent: PresaleCountdown, isLive } = useTimeLeft(
    config.presale_date
  )
  return (
    <>
      <PresaleCountdown />

      {config.buy_on.presale && (
        <>
          {isLive && (
            <span tw="block md:inline font-bold text-base pr-2 animate-pulse">
              LIVE NOW!
            </span>
          )}
          <a
            href={config.buy_on.presale}
            target="_blank"
            rel="noopener noreferrer"
            tw="text-base font-sans lowercase text-cyan-400 underline tracking-normal"
          >
            {config.buy_on.presale}
          </a>
        </>
      )}
    </>
  )
}
const LaunchTimer = () => {
  const { TimeComponent: PresaleCountdown, isLive } = useTimeLeft(
    config.launch_date
  )

  // TODOPRESALE:

  return (
    <>
      <PresaleCountdown />
      {config.buy_on.pancakeswap && (
        <>
          {isLive && (
            <>
              <span tw="block md:inline font-bold text-base pr-2 animate-pulse">
                TOKEN LAUNCHED!
              </span>
              <a
                href={config.buy_on.pancakeswap}
                target="_blank"
                rel="noopener noreferrer"
                tw="text-base font-sans lowercase text-cyan-400 underline tracking-normal"
              >
                {config.buy_on.pancakeswap}
              </a>
            </>
          )}
        </>
      )}
    </>
  )
}

const CountdownItems = ({ ...props }) => {
  const { t } = useTranslation('home')

  // TODOPRESALE:

  return (
    <div tw="flex-col flex lg:space-y-4" {...props}>
      <h4 tw="animate-pulse font-mono font-bold uppercase text-yellow-400 lg:text-2xl">
        Live now:
      </h4>
      <a
        href={config.buy_on.pancakeswap}
        target="_blank"
        rel="noopener noreferrer"
        tw="text-base font-sans text-cyan-400 underline tracking-normal"
      >
        PancakeSwap
      </a>
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
      clearTimeout(hideTimeout)
    }
  }, [closeClipboardTooltip, isClipboardTooltipOpen])

  // todo: make dynamic
  const navSize = '100px'
  const clipboard = useClipboard()

  // todo: remove this
  const prizePoolIsAvailable = false

  return (
    <>
      <div tw="opacity-20 z-index[-1] hidden lg:block">
        <Image
          src={bgImg}
          alt="Background"
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          objectPosition={`0 ${navSize}`}
          tw="w-screen h-screen"
        />
      </div>

      <main tw="relative flex-1 flex flex-col">
        <StyledVideoThumbnail tw="h-40 w-full relative lg:hidden">
          {config.demoVideo ? (
            <button
              type="button"
              tw="absolute w-full h-full z-10"
              onClick={openDemoVideoModal}
            >
              <FaYoutube tw="text-cyan-400 text-5xl mx-auto" />
            </button>
          ) : (
            <div tw="z-10 absolute bg-gray-900 bg-opacity-60 top-0 left-0 w-full h-full flex flex-col items-center justify-center text-coolGray-400 ">
              <div tw="relative flex items-end justify-center">
                <FaYoutube tw="text-cyan-400 text-4xl mx-auto absolute opacity-40" />
                <VscLock tw="text-7xl animate-pulse opacity-80" />
              </div>
              <p tw="font-mono uppercase font-bold animate-pulse opacity-80 text-base mt-4 text-center letter-spacing[1px]">
                {t`landing.intro-release`}
                {/* <br /> 2022 */}
              </p>
            </div>
          )}
        </StyledVideoThumbnail>

        <Container tw="relative w-full flex-1 lg:flex">
          <div tw="lg:mt-20 xl:mt-32 space-y-4 lg:w-6/12">
            {/* ~~~~~~~~~~~~~~~~~ COUNTDOWN ~~~~~~~~~~~~~~~~~ */}

            {/* <CountdownItems tw="lg:hidden" /> */}

            {/* ~~~~~~~~~~~~~~~~~ TITLE AND DESCRIPTION ~~~~~~~~~~~~~~~~~ */}

            <Title as="h1" tw="lg:text-4xl xl:text-5xl">
              {t`landing.title`}
            </Title>

            <h2 tw="text-base lg:text-lg xl:text-xl pt-2 whitespace-pre-wrap text-coolGray-300 lg:max-w-3xl xl:max-w-xl">
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

              <Button
                href={config.buy_on.pancakeswap}
                tw="flex-1 lg:flex-grow-0"
                targetBlank
              >
                PancakeSwap
              </Button>
            </div>

            {config.blockchain.contractAddress && (
              <div tw="pt-4 relative inline-block">
                <button
                  type="button"
                  tw="block font-normal text-left"
                  onClick={() => {
                    if (clipboard) {
                      clipboard?.writeText(config.blockchain.contractAddress)
                      openClipboardTooltip()
                    }
                  }}
                >
                  <span tw="font-bold font-sans">
                    {t`landing.contract-address`}:{' '}
                  </span>
                  <span tw="whitespace-nowrap">
                    <span tw="text-xs md:text-sm font-mono">
                      {config.blockchain.contractAddress}
                    </span>
                    {clipboard && <RiFileCopyLine tw="ml-2 inline-block" />}
                  </span>
                </button>

                <ClipboardTooltip isOpen={isClipboardTooltipOpen} />
              </div>
            )}
          </div>

          <div tw="hidden lg:block relative flex-1 max-h-full">
            <div tw="absolute h-[calc(100% + 1px)] w-full flex">
              <img src="/images/landing_frame.svg" alt="Frame" tw="h-full" />

              <div tw="z-10 flex flex-col justify-start w-full bg-gray-900 -ml-2">
                <div tw="h-[60%] flex items-center pl-4 pt-10 overflow-hidden">
                  <StyledVideoFrame tw="my-auto">
                    <Image
                      src={introVideoImg}
                      alt="video"
                      tw="z-[-1] opacity-30"
                      layout="fill"
                      objectFit="cover"
                    />

                    {config.demoVideo ? (
                      <button type="button" onClick={openDemoVideoModal}>
                        <FaYoutube tw="text-cyan-400 text-5xl mx-auto" />
                      </button>
                    ) : (
                      <div tw="z-10 absolute bg-gray-900 bg-opacity-60 top-0 left-0 w-full h-full flex flex-col items-center justify-center text-coolGray-400 ">
                        <div tw="relative flex items-end justify-center">
                          <FaYoutube tw="text-cyan-400 text-4xl mx-auto absolute opacity-40" />
                          <VscLock tw="text-7xl animate-pulse opacity-80" />
                        </div>
                        <p tw="font-mono uppercase font-bold animate-pulse opacity-80 text-base mt-4 text-center letter-spacing[1px]">
                          {t`landing.intro-release`}
                          {/* <br /> 2022 */}
                        </p>
                      </div>
                    )}
                  </StyledVideoFrame>
                </div>
                {/* todo: fix this based on countdown time */}
                {/* ~~~~~~~~~~~~~~~~~ COUNTDOWNS ~~~~~~~~~~~~~~~~~ */}
                {prizePoolIsAvailable ? (
                  <PrizePool tw="mt-16 ml-10" />
                ) : (
                  <CountdownItems tw="mt-16 ml-10" />
                )}
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
              {/* TODO: ACTIVATE MARKET_ITEMS */}
              {/* <MarketItems tw="flex flex-nowrap space-x-20" /> */}
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
            {/* TODO: ACTIVATE PARTNERS_LOGOS */}
            <PartnerLogos />
          </Container>
        </div>
      </section>

      {/* TODO: ACTIVATE square_frame */}
      {/* <SquareFrame tw="mt-8 block lg:hidden mx-auto max-w-xs">
        <MarketItems tw="grid grid-cols-2 gap-y-5" />
        <PartnerLogos tw="mt-5 mx-auto" />
        <PrizePool tw="py-5" />
      </SquareFrame> */}

      <TrackersModal isOpen={trackersModalIsOpen} close={closeTrackersModal} />
      <DemoVideoModal
        isOpen={demoVideoModalIsOpen}
        close={closeDemoVideoModal}
      />
    </>
  )
}
