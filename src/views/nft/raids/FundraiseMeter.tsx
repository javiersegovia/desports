import {
  StyledCompletionBar,
  StyledFullfillnessBar,
} from '@components/Chart/LineChart'
import { Container } from '@components/UI/Container'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import tw, { styled } from 'twin.macro'

const StyledMeterLabel = styled.h6`
  ${tw`font-mono font-bold uppercase letter-spacing[1px] text-xs`}
`

// todo: refactor this "StyledTextMono"|"StyledMeterLabel" and make it reusable

export const StyledTextMono = styled.div`
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
  const { t } = useTranslation('nft-common')

  const completion = (current * 100) / max

  return (
    <>
      <div
        tw="w-full bg-gray-900 text-white pt-4 pb-3 items-center shadow"
        {...props}
      >
        <Container tw="flex">
          <div tw="">
            <StyledTextMono tw="text-base">{t`meter.progression`}</StyledTextMono>
            <StyledTextMono tw="text-cyan-400 text-xs">{t`nft_collections.classics`}</StyledTextMono>
          </div>
          <div tw="ml-auto mt-1 w-8/12">
            <div tw="flex items-center space-x-2">
              <StyledMeterLabel>{t`meter.raised`}</StyledMeterLabel>
              <StyledFullfillnessBar tw="relative flex-1 h-4 flex bg-white">
                <StyledCompletionBar
                  tw="absolute from-yellow-400 to-cyan-400 bg-gradient-to-r z-10 left-0 top-0 bottom-0"
                  style={{ width: `${completion}%` }}
                />
                <StyledFullfillnessBar tw="flex-1 border border-white absolute top-[0px] bottom-[0px] right-[2px] left-[2px] bg-gray-900 font-mono font-bold flex items-center justify-between" />
              </StyledFullfillnessBar>
              <StyledMeterLabel>{t`meter.next_goal`}</StyledMeterLabel>
            </div>
            <div tw="mt-1 flex justify-center items-center">
              <StyledMeterLabel tw="text-yellow-400">
                {current % 1 === 0 ? current : current.toFixed(2)}BNB
              </StyledMeterLabel>
              <div tw="mx-2">&#47;&#47;</div>
              <StyledMeterLabel tw="">{max}BNB</StyledMeterLabel>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
