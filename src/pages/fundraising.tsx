import React from 'react'
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

const nextGoal = 50
const raisedAmount = 15.2342

const BNB_GOALS = [5, 15, 35, 50]

// TODO: LEAVE COMMENT EXPLAINING THE LOGIC HERE

const getNextGoal = (raisedAmount: number) =>
  BNB_GOALS.find((goal) => raisedAmount < goal) ||
  BNB_GOALS[BNB_GOALS.length - 1]

const FundraisingPage = () => {
  const { t } = useTranslation('fundraising')

  const { fundraisingAddress } = config.blockchain
  const nextGoal = getNextGoal(raisedAmount)

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
