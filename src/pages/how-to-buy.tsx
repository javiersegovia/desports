import React from 'react'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import { NavSpacer } from '@components/Nav/NavSpacer'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { Footer } from '@components/Footer/Footer'
import { Nav } from '@components/Nav'
import bgImg from '@public/images/home_bg.jpg'
import {
  PancakeswapGuide,
  PancakeswapHeading,
} from '@views/how-to-buy/Pancakeswap'

const HowToBuyPage = () => {
  const { t } = useTranslation('how-to-buy')

  return (
    <>
      <Nav />

      {/* todo: move this to a component (see whitepaper bg reference) */}
      <div tw="fixed w-full h-full z-index[-1]">
        <Image
          src={bgImg}
          layout="fill"
          placeholder="blur"
          alt="Background"
          objectPosition="0 60px"
          tw="opacity-20 object-contain lg:object-cover lg:object-position[0 100px]"
        />
      </div>

      <main>
        <NavSpacer />

        <Container tw="mx-auto mt-10">
          {/* Version with CEX / DEX */}
          {/* <div tw="flex justify-between flex-col-reverse lg:flex-row">
            <EXOptions />

            <Title tw="pb-4 md:pb-0 text-xl sm:text-xl lg:text-xl flex items-center space-x-4">
              <Image src={binanceLogoImg} alt="Binance logo" />
              <span>Binance Smart Chain</span>
            </Title>
          </div> */}
          <div tw="flex flex-col-reverse lg:flex-row justify-between lg:items-center">
            <Title tw="text-left text-xl sm:text-xl lg:text-xl" as="h1">
              {t`how_to_buy`}
            </Title>

            {/* <Title tw="pb-10 lg:pb-0 text-xl sm:text-xl lg:text-xl flex items-center justify-center space-x-4">
              <Image src={binanceLogoImg} alt="Binance logo" />
              <span>Binance Smart Chain</span>
            </Title> */}
          </div>

          <div tw="mt-4">
            <PancakeswapHeading />
          </div>
        </Container>

        <Container tw="mt-10 py-10 px-10 sm:py-0 bg-gray-900 sm:bg-transparent">
          <div tw=" rounded-md bg-transparent sm:bg-gray-900  text-coolGray-300 sm:p-10 text-lg text-justify overflow-hidden">
            <PancakeswapGuide />
          </div>
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default HowToBuyPage
