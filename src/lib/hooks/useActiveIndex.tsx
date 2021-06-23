import { useEffect, useRef, useState } from 'react'

interface ActiveIndexDefaultState {
  index: number
  pause: boolean
}

interface UseActiveIndexProps {
  maxIndex: number
  initialState?: ActiveIndexDefaultState
}

export const useActiveIndex = ({
  maxIndex,
  initialState = {
    index: 0,
    pause: true,
  },
}: UseActiveIndexProps) => {
  const [activeIndex, setActiveIndex] =
    useState<ActiveIndexDefaultState>(initialState)

  const timer = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    timer.current && clearInterval(timer.current)
    const currentTimer = timer.current

    timer.current = setInterval(() => {
      if (activeIndex.pause) return

      const newIndex =
        activeIndex.index + 1 > maxIndex ? 0 : activeIndex.index + 1

      setActiveIndex({
        index: newIndex,
        pause: false,
      })
    }, 4000)

    return () => {
      currentTimer && clearInterval(currentTimer)
    }
  }, [activeIndex, maxIndex])

  const pause = () => setActiveIndex((prev) => ({ ...prev, pause: true }))
  const unpause = () => setActiveIndex((prev) => ({ ...prev, pause: false }))

  return { activeIndex, setActiveIndex, pause, unpause }
}
