/** @jsxImportSource @emotion/react */

import { Checkbox } from '@components/Forms/Fields/Checkbox'
import useTranslation from 'next-translate/useTranslation'
import tw, { styled } from 'twin.macro'
import { cx } from '@emotion/css'
import { down } from 'styled-breakpoints'

const StyledGoal = styled.div`
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 62px,
    calc(100% - 2rem) 88%,
    49% 88%,
    calc(49% - 1rem) 100%,
    0% 100%
  );

  ${down('md')} {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 62%,
      calc(96% - 1rem) 88%,
      49% 88%,
      calc(49% - 1rem) 100%,
      0% 100%
    );
  }

  min-height: 100px;

  ${tw`bg-gray-900 w-full p-6`}

  &.active {
    ${tw`bg-yellow-400 text-black animate-pulse`}
  }

  &.completed {
    ${tw`line-through opacity-70`}
  }
`

interface FundraiseGoalItemProps {
  amount: number
  description?: string
  isCompleted: boolean
  isActive: boolean
  isFirst?: boolean
  isLast?: boolean
}

const FundraiseGoalItem = ({
  description,
  amount,
  isCompleted,
  isActive,
  isFirst = false,
  isLast = false,
}: FundraiseGoalItemProps) => {
  return (
    <div tw="flex items-stretch space-x-10">
      <div tw="relative flex items-center">
        <Checkbox isChecked={isCompleted} className="mb-10" />
        <div
          tw="z-index[-1] absolute width[1px] h-full bg-white top-0 bottom-0 -mt-10 left-1/2 -translate-x-full"
          css={[isFirst && tw`h-1/2 top-auto`, isLast && tw`h-1/2 bottom-auto`]}
        />
      </div>

      <StyledGoal
        tw="mb-10"
        className={cx({ active: isActive, completed: isCompleted })}
      >
        <h6
          tw="font-mono font-bold uppercase text-cyan-400"
          css={[isActive && tw`text-black`]}
        >
          {amount} BNB
        </h6>
        <p>{description}</p>
      </StyledGoal>
    </div>
  )
}

interface FundraiseGoalsProps {
  goalsAmounts: number[]
  raisedAmount: number
}

export const FundraiseGoals = ({
  goalsAmounts,
  raisedAmount,
  ...props
}: FundraiseGoalsProps) => {
  const { t } = useTranslation('fundraising')

  const amountDescriptions: string[] = t('goals', null, { returnObjects: true })

  return (
    <div tw="space-y-0" {...props}>
      {goalsAmounts.map((amount, index) => (
        <FundraiseGoalItem
          key={amountDescriptions[index]}
          amount={amount}
          description={amountDescriptions[index]}
          isCompleted={raisedAmount >= amount}
          isActive={
            raisedAmount < amount &&
            raisedAmount >= (goalsAmounts[index - 1] || 0)
          }
          isFirst={index === 0}
          isLast={index === goalsAmounts.length - 1}
        />
      ))}
    </div>
  )
}
