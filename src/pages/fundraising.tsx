import React, { useEffect, useState } from 'react'
import { Nav } from '@components/Nav'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'
import { config } from '@lib/config/config'
import { ContractAddress } from '@components/Miscellaneous/ContractAddress'
import { FundraiseMeter } from '@views/fundraising/FundraiseMeter'
import { FundraiseGoals } from '@views/fundraising/FundraiseGoals'
import { FundraiseDonations } from '@views/fundraising/FundraiseDonations'
import { FundraiseRewarding } from '@views/fundraising/FundraiseRewarding'
import { Footer } from '@components/Footer/Footer'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import bgImg from '@public/images/bg/fundraising.jpg'

const { fundraisingAddress } = config.blockchain

// const nextGoal = 50
// const raisedAmount = 35.2342

const BNB_GOALS = [50, 100, 200]

// TODO: LEAVE COMMENT EXPLAINING THE LOGIC HERE

// const FUNDRAISING_ADDRESS =
//   '0x3E0FA79382e037f8eB8F6b2a7e8343c66668aCc4'.toLowerCase()
// const TRANSACTIONS_API =
//   'https://api.bscscan.com/api?module=account&action=txlist&address=0x3E0FA79382e037f8eB8F6b2a7e8343c66668aCc4&startblock=1&endblock=99999999&sort=asc&apikey=IVDXS3EM4WMZ862UBIHFK3YD5N94ISA6N3'

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

  return { totalRaised: +totalRaised.toFixed(4), fundraisers }
}

const getNextGoal = (raisedAmount: number) =>
  BNB_GOALS.find((goal) => raisedAmount < goal) ||
  BNB_GOALS[BNB_GOALS.length - 1]

const FundraisingPage = () => {
  const { t } = useTranslation('fundraising')
  const [fundraisers, setFundraisers] = useState<ITransaction[]>()
  const [totalRaised, setTotalRaised] = useState<number>(0)

  const nextGoal = getNextGoal(totalRaised)

  useEffect(() => {
    const updateFundraising = async () => {
      const { fundraisers } =
        // const { totalRaised, fundraisers } =
        await getTotalAmountsReceivedPerWallet()

      // setTotalRaised(totalRaised || 0)
      setTotalRaised(5.34)
      setFundraisers(fundraisers)
    }

    updateFundraising()
  }, [])

  return (
    <>
      <Nav />
      <NavSpacer />

      <div tw="fixed w-full h-full max-h-screen z-index[-1]">
        <Image
          src={bgImg}
          layout="fill"
          placeholder="blur"
          alt="Background"
          tw="opacity-20 object-cover object-center lg:object-top"
        />
      </div>

      <Container tw="mt-10 mx-auto text-center">
        <Title tw="lg:text-2xl">{t`title.a`}</Title>
        <Title>{t`title.b`}</Title>
        <p tw="mt-6 max-w-3xl mx-auto">{t`description`}</p>
      </Container>

      {fundraisingAddress && (
        <Container tw="mx-auto mt-10 lg:mt-4">
          <ContractAddress
            title={t`contract_address_fundraise`}
            address={fundraisingAddress}
            tw="mt-4 flex justify-center"
          />
        </Container>
      )}

      <Container tw="mx-auto mt-10 lg:mt-4">
        <FundraiseMeter current={totalRaised} max={nextGoal} />
      </Container>

      <Container tw="mt-10">
        <Title tw="text-center lg:text-left lg:text-2xl">Goals</Title>
        <div tw="mt-10 flex flex-col lg:flex-row lg:justify-between lg:space-x-10">
          <FundraiseGoals
            goalsAmounts={BNB_GOALS}
            raisedAmount={totalRaised}
            tw="w-full lg:w-7/12"
          />

          <FundraiseDonations fundraisers={fundraisers} />
        </div>
      </Container>

      <Container tw="mt-20">
        <FundraiseRewarding />
      </Container>

      <Footer />
    </>
  )
}

export default FundraisingPage
