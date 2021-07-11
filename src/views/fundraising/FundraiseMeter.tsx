import {
  LineChart,
  StyledCompletionBar,
  StyledFullfillnessBar,
} from '@components/Chart/LineChart'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import tw, { styled } from 'twin.macro'

const StyledMeterLabel = styled.h6`
  ${tw`font-mono font-bold uppercase letter-spacing[1px]`}
`

// todo: make "nextGoal" and "raisedAmount" dynamic

interface FundraiseMeterProps {
  current: number
  max: number
}

export const FundraiseMeter = ({
  current,
  max,
  ...props
}: FundraiseMeterProps) => {
  const { t } = useTranslation('fundraising')

  const completion = (current * 100) / max

  return (
    <div {...props}>
      <div tw="flex justify-between">
        <StyledMeterLabel>{t`meter.raised`}</StyledMeterLabel>
        <StyledMeterLabel>{t`meter.next_goal`}</StyledMeterLabel>
      </div>

      <div tw="mt-4">
        <StyledFullfillnessBar tw="relative w-full h-4 flex bg-white">
          <StyledCompletionBar
            tw="absolute from-yellow-400 to-cyan-400 bg-gradient-to-r z-10 left-0 top-0 bottom-0"
            style={{ width: `${completion}%` }}
          />
          <StyledFullfillnessBar tw="flex-1 border border-white absolute top-[1px] bottom-[1px] right-[3px] left-[3px] bg-gray-900 font-mono font-bold flex items-center justify-between" />
        </StyledFullfillnessBar>
      </div>

      <div tw="mt-4 flex justify-center">
        <StyledMeterLabel tw="text-emerald-400">{current}BNB</StyledMeterLabel>
        <div tw="mx-2">&#47;&#47;</div>
        <StyledMeterLabel tw="">{max}BNB</StyledMeterLabel>
      </div>
    </div>
  )
}
