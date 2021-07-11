import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import React, { Fragment } from 'react'
import tw, { theme } from 'twin.macro'
import { FrameDivider } from '../home/Landing'

const latestTransactions: ITransaction[] = [
  {
    wallet: '0x81E4d494b85A24a58a6BA45c9B418b32a4E039de',
    amount: '10.1254',
  },
  {
    wallet: '0x81E4d494b85A24a58a6BA45c9B418b32a4E039de',
    amount: '0.3454',
  },
  {
    wallet: '0x81E4d494b85A24a58a6BA45c9B418b32a4E039de',
    amount: '1.4',
  },
  {
    wallet: '0x81E4d494b85A24a58a6BA45c9B418b32a4E039de',
    amount: '4.12',
  },
  {
    wallet: '0x81E4d494b85A24a58a6BA45c9B418b32a4E039de',
    amount: '8.525',
  },
]

interface ITransaction {
  wallet: string
  amount: string
}

interface FundraiseDonationItemProps {
  transaction: ITransaction
}

const FundraiseDonationItem = ({ transaction }: FundraiseDonationItemProps) => {
  const { wallet, amount } = transaction
  return (
    <div tw="font-mono">
      <p tw="text-emerald-400 font-bold">+{amount} BNB</p>
      <p tw="text-blueGray-500 text-xs text-right">{wallet}</p>
    </div>
  )
}

export const FundraiseDonations = () => {
  const { t } = useTranslation('fundraising')

  return (
    <SquareFrame
      tw="w-5/12 mt-10 lg:mt-0 ml-auto max-w-md"
      shadowColor="emerald"
      bgColor={theme`colors.gray.900`}
    >
      <Title as="h5" tw="text-2xl sm:text-3xl lg:text-xl mt-4 mx-auto">
        {t`latest_donations.title`}
      </Title>

      <div tw="mt-10 mx-auto px-10 w-full space-y-3">
        {latestTransactions.slice(0, 5).map((transaction) => (
          <Fragment key={transaction.wallet + transaction.amount}>
            <FundraiseDonationItem transaction={transaction} />
            <FrameDivider
              color={theme`colors.blueGray.500`}
              frameWidth={4}
              frameHeight={3}
            />
          </Fragment>
        ))}
      </div>
    </SquareFrame>
  )
}
