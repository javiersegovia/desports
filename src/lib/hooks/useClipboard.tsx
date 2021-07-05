import { useEffect, useState } from 'react'

export const useClipboard = () => {
  const [clipboard, setClipboard] = useState<Clipboard | null>(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window?.navigator?.clipboard !== 'undefined' &&
      window.navigator
    ) {
      setClipboard(window.navigator.clipboard)
    }
  }, [])

  return clipboard
}
