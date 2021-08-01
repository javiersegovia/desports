import React from 'react'
import { Nav } from '@components/Nav'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'
import {
  FundraiseMeter,
  StyledTextMono,
} from '@root/src/views/nft/raids/FundraiseMeter'
import { FundraiseGoals } from '@root/src/views/nft/raids/FundraiseGoals'
import { FundraiseDonations } from '@root/src/views/nft/raids/FundraiseDonations'
import { Footer } from '@components/Footer/Footer'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import bgImg from '@public/images/bg/fundraising.png'
import { Button } from '@components/UI/Button'
import { theme } from 'twin.macro'
import { CurrentNFTCollection } from '@root/src/views/nft/raids/CurrentNFTCollection'
import { NFTRarity } from '@root/src/views/nft/raids/NFTRarity'
import { RaidFAQ } from '@root/src/views/nft/raids/RaidFAQ'
import { routes } from '@lib/config/routes'
import { useNftRaid, raidGoals } from '@lib/hooks/useNftRaid'
import nftRaidsLogo from '@public/images/logos/logo_nft-raids.png'
import { FundraiseDescription } from '@root/src/views/nft/raids/FundraiseDescription'

const NFTRaidsPage = () => {
  const { t } = useTranslation('nft-raids')
  const { fundraisers, currentGoal, currentGoalRaisedAmount, totalRaised } =
    useNftRaid()

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

      <div tw="fixed w-full h-full max-h-screen z-index[-1]">
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
            <Title>{t`raids.title`}</Title>
          </div>

          <p tw="mt-6 max-w-3xl">{t`raids.description`}</p>

          <div tw="mt-8 sm:flex items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              tw="w-full sm:w-auto"
              bgColor={theme`colors.cyan.400`}
              disabled
            >
              {t`nft-common:buttons.marketplace`}
            </Button>

            <Button
              tw="w-full sm:w-auto"
              bgColor={theme`colors.yellow.400`}
              href={routes.nft.collections}
            >
              {t`nft-common:buttons.nft_collections`}
            </Button>
          </div>
        </div>

        <NFTRarity tw="hidden lg:block mt-14 lg:mt-0 lg:ml-auto" />
      </Container>

      <Container tw="mt-10 text-center">
        <StyledTextMono tw="text-xl text-cyan-400">
          {t`nft_collections.current_raid_title`}:
        </StyledTextMono>

        <Title tw="text-white letter-spacing[5px]">{t`nft-common:nft_collections.classics`}</Title>
      </Container>

      <Container tw="mt-10">
        <CurrentNFTCollection />
      </Container>

      <Container tw="mt-10 lg:mt-20">
        <div tw="mt-10 flex flex-col lg:flex-row lg:justify-between lg:space-x-10">
          <div tw="w-full lg:w-7/12 mt-8">
            <Title tw="ml-16 text-center lg:text-2xl">{t`goals.title`}</Title>
            <FundraiseGoals
              goalsAmounts={raidGoals}
              raisedAmount={totalRaised}
              tw="mt-6"
            />
          </div>

          <FundraiseDonations fundraisers={fundraisers} />
        </div>
      </Container>

      <Container tw="mt-20">
        <FundraiseDescription />
      </Container>

      <Container tw="mt-20">
        <RaidFAQ />
      </Container>

      <Footer />
    </>
  )
}

export default NFTRaidsPage
