import React, { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type TimeLeftState = TimeLeft | Record<string, never>

const calculateTimeLeft = (date: Date) => {
  const difference = +date - +new Date()
  let timeLeft: TimeLeftState = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    } as const
  }

  return timeLeft
}

export const useTimeLeft = (date: Date) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeftState>(
    calculateTimeLeft(date)
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date))
    }, 1000)

    return () => clearTimeout(timer)
  })

  const { days, hours, minutes, seconds } = timeLeft

  const TimeComponent = () => (
    <div tw="space-x-2 flex">
      {days && <div>{days}D</div>}
      {hours && <div>{hours}H</div>}
      {minutes && <div>{minutes}M</div>}
      {<div>{seconds}S</div>}
    </div>
  )

  return { timeLeft, TimeComponent }
}
