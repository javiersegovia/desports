import { isDesktop } from '@root/src/views/home/useAnimations'
import { useEffect, useState } from 'react'

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

  const desktop = isDesktop()

  useEffect(() => {
    if (!desktop) return

    const timer = setInterval(() => {
      if (activeIndex.pause) return

      const newIndex =
        activeIndex.index + 1 > maxIndex ? 0 : activeIndex.index + 1

      setActiveIndex({
        index: newIndex,
        pause: false,
      })
    }, 4000)

    return () => {
      clearInterval(timer)
    }
  }, [activeIndex, maxIndex, desktop])

  const pause = () => setActiveIndex((prev) => ({ ...prev, pause: true }))
  const unpause = () => setActiveIndex((prev) => ({ ...prev, pause: false }))

  return { activeIndex, setActiveIndex, pause, unpause }
}
