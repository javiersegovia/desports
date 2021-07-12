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
import bgImg from '@public/images/bg/fundraising.png'
import { HiSortDescending } from 'react-icons/hi'

const { fundraisingAddress } = config.blockchain

const nextGoal = 50
const raisedAmount = 15.2342

const BNB_GOALS = [5, 15, 35, 50]

// TODO: LEAVE COMMENT EXPLAINING THE LOGIC HERE

// const FUNDRAISING_ADDRESS =
//   '0x3E0FA79382e037f8eB8F6b2a7e8343c66668aCc4'.toLowerCase()
// const TRANSACTIONS_API =
//   'https://api.bscscan.com/api?module=account&action=txlist&address=0x3E0FA79382e037f8eB8F6b2a7e8343c66668aCc4&startblock=1&endblock=99999999&sort=asc&apikey=IVDXS3EM4WMZ862UBIHFK3YD5N94ISA6N3'

export interface ITransaction {
  fromAddress: string
  amount: number
}

interface BSCTransactionResult {
  result: {
    from: string
    to: string
    value: string
  }[]
}

const getTotalAmountsReceivedPerWallet = async (): Promise<ITransaction[]> => {
  const data = await fetch(
    `https://api.bscscan.com/api?module=account&action=txlist&address=${fundraisingAddress}&startblock=1&endblock=99999999&sort=asc&apikey=IVDXS3EM4WMZ862UBIHFK3YD5N94ISA6N3`
  )

  const { result }: BSCTransactionResult = await data.json()
  const donations: Record<string, number> = {}

  return result
    .map((transaction) => {
      if (
        transaction.to === fundraisingAddress &&
        transaction.from !== fundraisingAddress
      ) {
        const previousAmount = donations[transaction.from] || 0
        const newAmount = +transaction.value / 10 ** 18

        donations[transaction.from] = previousAmount + newAmount

        return {
          fromAddress: transaction.from,
          amount: previousAmount + newAmount,
        }
      }
    })
    .filter(Boolean) as ITransaction[] // todo: check this "as"
}

const getNextGoal = (raisedAmount: number) =>
  BNB_GOALS.find((goal) => raisedAmount < goal) ||
  BNB_GOALS[BNB_GOALS.length - 1]

const FundraisingPage = () => {
  const { t } = useTranslation('fundraising')
  const [topFundraisers, setTopFundraisers] = useState<ITransaction[]>([])

  const nextGoal = getNextGoal(raisedAmount)

  useEffect(() => {
    const updateDonators = async () => {
      const transactions = await getTotalAmountsReceivedPerWallet()

      setTopFundraisers(transactions.sort((a, b) => b.amount - a.amount))
    }

    updateDonators()
  }, [])

  console.log(topFundraisers)

  return (
    <>
      <Nav />
      <NavSpacer />

      <div tw="fixed w-full h-full max-h-screen z-index[-1]">
        <Image
          src={bgImg}
          layout="fill"
          placeholder="blur"
          objectPosition="0 0"
          alt="Background"
          tw="opacity-20 object-contain lg:object-cover"
        />
      </div>

      <Container tw="mt-10 mx-auto text-center">
        <Title tw="lg:text-2xl">{t`title.a`}</Title>
        <Title>{t`title.b`}</Title>
        <p tw="mt-6 max-w-3xl mx-auto">{t`description`}</p>
      </Container>

      {fundraisingAddress && (
        <ContractAddress
          title={t`contract_address_fundraise`}
          address={fundraisingAddress}
          tw="mt-4 flex justify-center"
        />
      )}

      <Container tw="mx-auto">
        <FundraiseMeter tw="mt-4" current={raisedAmount} max={nextGoal} />
      </Container>

      <Container tw="mt-10">
        <Title tw="lg:text-2xl">Goals</Title>
        <div tw="mt-10 flex justify-between space-x-10">
          <FundraiseGoals
            goalsAmounts={BNB_GOALS}
            raisedAmount={raisedAmount}
            tw="w-7/12"
          />

          <FundraiseDonations />
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
