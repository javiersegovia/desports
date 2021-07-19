import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { theme } from 'twin.macro'

import { Nav } from '@components/Nav'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'
import { config } from '@lib/config/config'
import { FundraiseMeter } from '@views/nft/raids/FundraiseMeter'
import { Footer } from '@components/Footer/Footer'
import useTranslation from 'next-translate/useTranslation'
import bgImg from '@public/images/bg/fundraising.png'
import { Button } from '@components/UI/Button'
import { NFTRarity } from '@views/nft/raids/NFTRarity'
import { RaidFAQ } from '@views/nft/raids/RaidFAQ'
import { routes } from '@lib/config/routes'
import { NFTCollections } from '@views/nft/NFTCollections'

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
            <Button bgColor={theme`colors.pink.500`} href={routes.nft.raids}>
              {t`raids.current_raid`}
            </Button>
          </div>
        </div>
        <NFTRarity tw="ml-auto" />
      </Container>

      <NFTCollections />

      <Container tw="mt-20">
        <RaidFAQ />
      </Container>

      <Footer />
    </>
  )
}

export default FundraisingPage
