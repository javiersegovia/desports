import React from 'react'
import { Button } from '@components/UI/Button'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { theme } from 'twin.macro'

// todo: change readyplayerme path
import readyPlayerLogoImg from '@public/images/readyplayerme_logo.png'
import readyPlayerImg from '@public/images/readyplayerme_image.png'
import { config } from '../../lib/config/config'

export const ReadyPlayerMe = () => {
  const { t } = useTranslation('team')

  return (
    <SquareFrame tw="pr-0" removePadding>
      <div tw="relative w-full h-full p-8 pb-0 lg:pb-8 lg:pr-0 text-left flex flex-col lg:block">
        <div tw="flex items-center space-x-6">
          <div tw="lg:w-auto">
            <Image
              src={readyPlayerLogoImg}
              width={94}
              height={56}
              alt="Readyplayer.me Logo"
            />
          </div>
          <div tw="hidden lg:block h-14 width[1px] bg-gray-600" />

          <Title tw="flex-1 text-2xl lg:w-auto text-cyan-400 lg:text-4xl">{t`readyplayerme.title`}</Title>
        </div>
        <p tw="mt-4 lg:w-7/12 xl:w-7/12">{t`readyplayerme.description`}</p>

        <Button
          targetBlank
          href={config.ready_player_me}
          bgColor={theme`colors.yellow.400`}
          tw="w-full sm:w-auto mt-10 mx-auto sm:mx-0"
        >
          <span tw="hidden sm:inline">{t`readyplayerme.button`}</span>
          <span tw="inline sm:hidden">{t`readyplayerme.responsive_button`}</span>
        </Button>

        <div tw="lg:absolute right-0 top-0 mx-auto mt-14 max-w-xs lg:max-w-none lg:w-5/12 xl:w-4/12">
          <Image
            src={readyPlayerImg}
            alt="Readyplayer.me image"
            tw="absolute"
          />
        </div>
      </div>
    </SquareFrame>
  )
}
