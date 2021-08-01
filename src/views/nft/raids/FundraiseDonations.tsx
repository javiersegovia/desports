import React, { Fragment } from 'react'
import { theme } from 'twin.macro'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import { ITransaction } from '@lib/hooks/useNftRaid'
import useTranslation from 'next-translate/useTranslation'
import { FrameDivider } from '@views/home/Landing'

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
  const { t } = useTranslation('nft-raids')

  return (
    <SquareFrame
      tw="w-full mt-10 mx-auto lg:mt-0 lg:ml-auto lg:mr-0 lg:w-5/12 max-w-md"
      bgColor={theme`colors.gray.800`}
    >
      <Title as="h5" tw="text-2xl sm:text-3xl lg:text-xl mt-4 mx-auto">
        {fundraisers.length > 0 && (
          <div tw="pr-2 inline-block">{fundraisers.length}</div>
        )}

        <span tw="inline-block">
          {fundraisers.length === 1
            ? t`top_fundraisers.title_singular`
            : t`top_fundraisers.title_plural`}
        </span>
      </Title>

      {fundraisers.length ? (
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
      ) : (
        <span tw="text-center my-8 block">
          No raiders arrived yet. Be the first one!
        </span>
      )}
    </SquareFrame>
  )
}
