import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import { ITransaction } from '@pages/fundraising'
import useTranslation from 'next-translate/useTranslation'
import React, { Fragment } from 'react'
import { theme } from 'twin.macro'
import { FrameDivider } from '../home/Landing'

interface FundraiseDonationItemProps {
  transaction: ITransaction
}

const FundraiseDonationItem = ({ transaction }: FundraiseDonationItemProps) => {
  const { fromAddress, amount, percentage } = transaction
  return (
    <div tw="font-mono">
      <div tw="flex items-center space-x-1 justify-between">
        <span tw="text-emerald-400 font-bold">{amount} BNB</span>
        <span tw="text-coolGray-300 font-bold text-xs">
          ~ {percentage}% win
        </span>
      </div>
      <p tw="text-blueGray-500 text-xs text-left overflow-hidden">
        {fromAddress}
      </p>
    </div>
  )
}

interface FundraiseDonationsProps {
  fundraisers?: ITransaction[]
}

export const FundraiseDonations = ({
  fundraisers = [],
}: FundraiseDonationsProps) => {
  const { t } = useTranslation('fundraising')

  return (
    <SquareFrame
      tw="w-full mt-10 mx-auto lg:mt-0 lg:ml-auto lg:mr-0 lg:w-5/12 max-w-md"
      shadowColor="emerald"
      bgColor={theme`colors.gray.900`}
    >
      <Title as="h5" tw="text-2xl sm:text-3xl lg:text-xl mt-4 mx-auto">
        {t`top_fundraisers.title`}
      </Title>

      <div tw="mt-10 mx-auto px-4 lg:px-10 pb-10 w-full space-y-3">
        {fundraisers.slice(0, 5).map((transaction) => (
          <Fragment key={transaction.fromAddress}>
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
