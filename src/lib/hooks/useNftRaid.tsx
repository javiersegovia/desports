import { config } from '@lib/config/config'
import { useEffect, useState } from 'react'

const { fundraisingAddress } = config.blockchain
const { nft_goals } = config

export interface IBNBRaidGoal {
  amount: number
  totalAmount: number
}

const totalAmounts: number[] = []
export const raidGoals: IBNBRaidGoal[] = nft_goals.map((goalAmount, index) => {
  const total = goalAmount + (totalAmounts[index - 1] || 0)
  totalAmounts.push(total)

  return {
    amount: goalAmount,
    totalAmount: total,
  }
})

export interface ITransaction {
  fromAddress: string
  amount: number
  percentage: string
}

export interface BSCTransactionResult {
  result: {
    from: string
    to: string
    value: string
  }[]
}

const getTotalAmountsReceivedPerWallet = async (): Promise<{
  totalRaised: number
  fundraisers: ITransaction[]
}> => {
  const data = await fetch(
    `https://api.bscscan.com/api?module=account&action=txlist&address=${fundraisingAddress}&startblock=1&endblock=99999999&sort=asc&apikey=IVDXS3EM4WMZ862UBIHFK3YD5N94ISA6N3`
  )

  const { result: transactions }: BSCTransactionResult = await data.json()
  const allDonations: Record<string, number> = {}
  let totalRaised = 0

  let previousAmount: number
  let newAmount: number

  for (let i = 0; i < transactions.length; i++) {
    if (
      transactions[i].to.toLowerCase() === fundraisingAddress.toLowerCase() &&
      transactions[i].from.toLowerCase() !== fundraisingAddress.toLowerCase()
    ) {
      previousAmount = +allDonations[transactions[i].from] || 0
      newAmount = +transactions[i].value / 10 ** 18

      totalRaised += newAmount

      // todo: here we can change the contributions to track the donators per individual goal,
      // using the "totalRaised" amount as a reference to know the goal that the user is donating to
      allDonations[transactions[i].from] = previousAmount + newAmount
    }
  }

  const fundraisers = Object.keys(allDonations)
    .map((key) => ({
      fromAddress: key,
      amount: allDonations[key],
      percentage: ((allDonations[key] / totalRaised) * 100).toFixed(2),
    }))
    .sort((a, b) => b.amount - a.amount)

  return { totalRaised: +totalRaised.toFixed(2), fundraisers }
}
const getGoalInformation = (raisedAmount: number) => {
  let currentGoal = raidGoals[0]
  let currentGoalRaisedAmount = 0

  for (let i = 0; i < raidGoals.length; i++) {
    currentGoal = raidGoals[i]
    currentGoalRaisedAmount =
      raisedAmount - (raidGoals[i - 1]?.totalAmount || 0)

    if (raisedAmount < currentGoal.totalAmount) break
  }

  return {
    currentGoal,
    currentGoalRaisedAmount,
  }
}

// TODO: LEAVE COMMENT EXPLAINING THE LOGIC HERE

export const useNftRaid = () => {
  const [fundraisers, setFundraisers] = useState<ITransaction[]>()
  const [totalRaised, setTotalRaised] = useState<number>(0)

  useEffect(() => {
    const updateFundraising = async () => {
      const { totalRaised, fundraisers } =
        await getTotalAmountsReceivedPerWallet()

      setTotalRaised(totalRaised || 0)
      setFundraisers(fundraisers)
    }

    updateFundraising()
  }, [])

  const { currentGoal, currentGoalRaisedAmount } =
    getGoalInformation(totalRaised)

  return { fundraisers, totalRaised, currentGoal, currentGoalRaisedAmount }
}
