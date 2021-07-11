import React from 'react'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import { theme } from 'twin.macro'

export const FundraiseRewarding = () => {
  const { t } = useTranslation('fundraising')

  const rewardingSupportBullets: string[] = t(
    'rewarding_support.description.bullets',
    null,
    {
      returnObjects: true,
    }
  )

  return (
    <SquareFrame
      removePadding
      shadowColor="emerald"
      bgColor={theme`colors.gray.900`}
    >
      <div tw="relative w-full h-full p-14 text-left flex flex-col lg:block">
        <Title tw="flex-1 text-2xl lg:w-auto text-cyan-400 lg:text-4xl">{t`rewarding_support.title`}</Title>
        <p tw="mt-4 lg:w-7/12 xl:w-7/12">{t`rewarding_support.description.a`}</p>

        <ul tw="list-disc ml-5 mt-5 space-y-1">
          {rewardingSupportBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <p tw="mt-5">{t`rewarding_support.description.b`}</p>
      </div>
    </SquareFrame>
  )
}
