import { MiniFrame } from '@components/UI/Frames/MiniFrames'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

export const EXOptions = () => {
  const { t } = useTranslation('how-to-buy')

  return (
    <div tw="flex items-center font-mono uppercase font-bold letter-spacing[4px]">
      <MiniFrame type="v3">
        <div tw="py-4 px-12 sm:px-16">{t`options.dex`}</div>
      </MiniFrame>
      <MiniFrame type="v4">
        <div tw="py-4 px-12 sm:px-16">{t`options.cex`}</div>
      </MiniFrame>
    </div>
  )
}
