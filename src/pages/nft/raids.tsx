import React, { useEffect, useState } from 'react'
import { Nav } from '@components/Nav'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'
import { config } from '@lib/config/config'
import {
  FundraiseMeter,
  StyledTextMono,
} from '@root/src/views/nft/raids/FundraiseMeter'
import { FundraiseGoals } from '@root/src/views/nft/raids/FundraiseGoals'
import { FundraiseDonations } from '@root/src/views/nft/raids/FundraiseDonations'
import { FundraiseDescription } from '@root/src/views/nft/raids/FundraiseDescription'
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

const { fundraisingAddress } = config.blockchain

const BNB_GOALS = [50, 100, 200]

// TODO: LEAVE COMMENT EXPLAINING THE LOGIC HERE

export interface ITransaction {
  fromAddress: string
  amount: number
  percentage: string
}

interface BSCTransactionResult {
  result: {
    from: string
    to: string
    value: string
  }[]
}

const getTotalAmountsReceivedPerWallet = async (): Promise<{
  totalRaised: number
  fundraisers: ITransaction[]
}> => {
  const data = await fetch(
    `https://api.bscscan.com/api?module=account&action=txlist&address=${fundraisingAddress}&startblock=1&endblock=99999999&sort=asc&apikey=IVDXS3EM4WMZ862UBIHFK3YD5N94ISA6N3`
  )

  const { result: transactions }: BSCTransactionResult = await data.json()
  const donations: Record<string, number> = {}

  let previousAmount: number
  let newAmount: number

  for (let i = 0; i < transactions.length; i++) {
    if (
      transactions[i].to.toLowerCase() === fundraisingAddress.toLowerCase() &&
      transactions[i].from.toLowerCase() !== fundraisingAddress.toLowerCase()
    ) {
      previousAmount = +donations[transactions[i].from] || 0
      newAmount = +transactions[i].value / 10 ** 18

      donations[transactions[i].from] = previousAmount + newAmount
    }
  }

  const totalRaised = Object.values(donations).reduce(
    (total, amount) => total + amount,
    0
  )

  const fundraisers = Object.keys(donations)
    .map((key) => ({
      fromAddress: key,
      amount: donations[key],
      percentage: ((donations[key] / totalRaised) * 100).toFixed(2),
    }))
    .sort((a, b) => b.amount - a.amount)

  return { totalRaised: +totalRaised.toFixed(2), fundraisers }
}

const getNextGoal = (raisedAmount: number) =>
  BNB_GOALS.find((goal) => raisedAmount < goal) ||
  BNB_GOALS[BNB_GOALS.length - 1]

const FundraisingPage = () => {
  const { t } = useTranslation('raids')
  const [fundraisers, setFundraisers] = useState<ITransaction[]>()
  const [totalRaised, setTotalRaised] = useState<number>(0)

  const nextGoal = getNextGoal(totalRaised)

  useEffect(() => {
    const updateFundraising = async () => {
      const { totalRaised, fundraisers } =
        await getTotalAmountsReceivedPerWallet()

      setTotalRaised(totalRaised || 0)
      setFundraisers(fundraisers)
    }

    updateFundraising()
  }, [])

  return (
    <>
      <Nav>
        <FundraiseMeter current={totalRaised} max={nextGoal} />
      </Nav>
      <NavSpacer />

      {/* this is an additional "spacer" for the Fundraise Meter */}
      {/* todo: refactor this to automatically calculate the height inside "NavSpacer" */}
      <div tw="block height[76px]" />

      <div tw="fixed w-full h-full max-h-screen z-index[-1]">
        <Image
          src={bgImg}
          layout="fill"
          placeholder="blur"
          alt="Background"
          tw="opacity-20 object-cover object-center lg:object-top"
        />
      </div>

      <Container tw="mt-10 text-left flex">
        <div>
          <Title>{t`raids.title`}</Title>
          <p tw="mt-6 max-w-3xl">{t`raids.description`}</p>
          <div tw="mt-8 flex items-center space-x-6">
            <Button bgColor={theme`colors.cyan.400`}>
              {t`raids.marketplace`}
            </Button>
            <Button bgColor={theme`colors.pink.500`} href={routes.nft.index}>
              {t`raids.nft_collections`}
            </Button>
          </div>
        </div>
        <NFTRarity tw="ml-auto" />
      </Container>

      <Container tw="mt-10 text-center">
        <StyledTextMono tw="text-xl">
          {t`nft_collections.current_raid_title`}:
        </StyledTextMono>
        <Title tw="text-purple-500 letter-spacing[5px]">{t`nft_collections.collections.classics`}</Title>
      </Container>

      <Container tw="mt-10">
        <CurrentNFTCollection />
      </Container>

      <Container tw="mt-20">
        <div tw="mt-10 flex flex-col lg:flex-row lg:justify-between lg:space-x-10">
          <div tw="w-full lg:w-7/12 mt-8">
            <Title tw="ml-16 text-center lg:text-2xl">{t`goals.title`}</Title>
            <FundraiseGoals
              goalsAmounts={BNB_GOALS}
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

export default FundraisingPage
