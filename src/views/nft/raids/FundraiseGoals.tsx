/** @jsxImportSource @emotion/react */

import { Checkbox } from '@components/Forms/Fields/Checkbox'
import useTranslation from 'next-translate/useTranslation'
import tw, { styled } from 'twin.macro'
import { cx } from '@emotion/css'
import { down } from 'styled-breakpoints'
import { IBNBRaidGoal } from '@lib/hooks/useNftRaid'

const StyledGoal = styled.div`
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 62px,
    calc(100% - 2rem) 92%,
    49% 92%,
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

  ${tw`bg-gray-800 w-full p-6 pb-7`}

  &.active {
    ${tw`bg-yellow-400 text-black`}
  }

  &.completed {
    ${tw`line-through opacity-70`}
  }
`

interface FundraiseGoalItemProps {
  amount: number
  isCompleted: boolean
  isActive: boolean
  isFirst?: boolean
  isLast?: boolean
  item: IGoalItem
}

const FundraiseGoalItem = ({
  item,
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
          {amount} BNB — {item.title}
        </h6>
        <p>{item.description}</p>
      </StyledGoal>
    </div>
  )
}

interface FundraiseGoalsProps {
  goalsAmounts: IBNBRaidGoal[]
  raisedAmount: number
}

interface IGoalItem {
  title: string
  description: string
}

export const FundraiseGoals = ({
  goalsAmounts,
  raisedAmount,
  ...props
}: FundraiseGoalsProps) => {
  const { t } = useTranslation('nft-raids')

  const goalsList: IGoalItem[] = t('goals.list', null, {
    returnObjects: true,
  })

  return (
    <div tw="space-y-0" {...props}>
      {goalsAmounts.map((goal, index) =>
        goalsList[index] ? (
          <FundraiseGoalItem
            key={goalsList[index].title}
            amount={goal.amount}
            item={goalsList[index]}
            isCompleted={raisedAmount >= goal.totalAmount}
            isActive={
              raisedAmount < goal.totalAmount &&
              raisedAmount >= (goalsAmounts[index - 1]?.totalAmount || 0)
            }
            isFirst={index === 0}
            isLast={index === goalsList.length - 1}
          />
        ) : null
      )}
    </div>
  )
}
