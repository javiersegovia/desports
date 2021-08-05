import { isDesktop } from '@views/home/useAnimations'
import { useEffect, useState } from 'react'

interface ActiveIndexDefaultState {
  index: number
  pause: boolean
}

interface UseActiveIndexProps {
  maxIndex: number
  play?: boolean
  initialState?: ActiveIndexDefaultState
}

export const useActiveIndex = ({
  maxIndex,
  play = false,
  initialState = {
    index: 0,
    pause: true,
  },
}: UseActiveIndexProps) => {
  const [activeIndex, setActiveIndex] =
    useState<ActiveIndexDefaultState>(initialState)

  const desktop = isDesktop()

  useEffect(() => {
    if (!desktop || !play) return

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
  }, [activeIndex, maxIndex, desktop, play])

  const pause = () => setActiveIndex((prev) => ({ ...prev, pause: true }))
  const unpause = () => setActiveIndex((prev) => ({ ...prev, pause: false }))

  return { activeIndex, setActiveIndex, pause, unpause }
}
