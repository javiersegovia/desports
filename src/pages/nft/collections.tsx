import React from 'react'
import Image from 'next/image'
import { theme } from 'twin.macro'

import { Nav } from '@components/Nav'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'
import { FundraiseMeter } from '@views/nft/raids/FundraiseMeter'
import { Footer } from '@components/Footer/Footer'
import useTranslation from 'next-translate/useTranslation'
import bgImg from '@public/images/bg/fundraising.png'
import { Button } from '@components/UI/Button'
import { NFTRarity } from '@views/nft/raids/NFTRarity'
import { RaidFAQ } from '@views/nft/raids/RaidFAQ'
import { routes } from '@lib/config/routes'
import { NFTCollections } from '@views/nft/NFTCollections'
import { useNftRaid } from '@lib/hooks/useNftRaid'
import nftRaidsLogo from '@public/images/logos/logo_nft-raids.png'

const CollectionsPage = () => {
  const { t } = useTranslation('nft-collections')
  const { currentGoal, currentGoalRaisedAmount } = useNftRaid()

  return (
    <>
      <Nav />
      <NavSpacer />

      <div tw="fixed w-full z-20">
        <FundraiseMeter
          current={currentGoalRaisedAmount}
          max={currentGoal.amount}
        />
      </div>

      {/* this is an additional "spacer" for the Fundraise Meter */}
      {/* todo: refactor this to automatically calculate the height inside "NavSpacer" */}
      <div tw="block height[110px] lg:height[76px]" />

      <div tw="w-full h-full max-h-[30vh] z-index[-1]">
        <Image
          src={bgImg}
          layout="fill"
          placeholder="blur"
          alt="Background"
          tw="opacity-20 object-cover object-center lg:object-top"
        />
      </div>

      <Container tw="mt-10 text-left flex flex-col lg:flex-row">
        <div>
          <div tw="flex space-x-4 items-center">
            <Image src={nftRaidsLogo} alt="NFT Raids Logo" />
            <Title>{t`collections.title`}</Title>
          </div>
          <p tw="mt-6 max-w-3xl">{t`collections.description`}</p>
          <div tw="mt-8 flex items-center space-x-6">
            <Button
              tw="flex[50%] sm:flex[none]"
              bgColor={theme`colors.cyan.400`}
              disabled
            >
              {t`nft-common:buttons.marketplace`}
            </Button>
            <Button
              tw="flex[50%] sm:flex[none]"
              bgColor={theme`colors.yellow.400`}
              href={routes.nft.raids}
            >
              {t`nft-common:buttons.nft_raids`}
            </Button>
          </div>
        </div>

        <NFTRarity tw="mt-14 lg:mt-0 lg:ml-auto" />
      </Container>

      <NFTCollections />

      <Container tw="mt-20">
        <RaidFAQ />
      </Container>

      <Footer />
    </>
  )
}

export default CollectionsPage
