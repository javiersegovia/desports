import React from 'react'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Dialog } from '@headlessui/react'
import useTranslation from 'next-translate/useTranslation'
import { config } from '@lib/config/config'
import { FrameDivider } from '@root/src/views/home/Landing'
import { RiCloseFill } from 'react-icons/ri'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { BaseModal, InstanceModalProps } from './BaseModal'

interface TrackersI18N {
  title: string
  description: string
  list: typeof config.trackers
}

export const TrackersModal = ({ isOpen, close }: InstanceModalProps) => {
  const { t } = useTranslation('common')

  const trackers: TrackersI18N = t('shared.trackers', null, {
    returnObjects: true,
  })

  return (
    <BaseModal isOpen={isOpen} close={close}>
      <SquareFrame className="inline-block w-full max-w-md overflow-hidden text-left m-auto transition-all transform text-coolGray-300">
        <div tw="px-6 py-6">
          <div tw="flex justify-between">
            <Dialog.Title
              as="h3"
              tw="text-3xl font-bold leading-6 font-mono uppercase text-yellow-400"
            >
              {trackers.title}
            </Dialog.Title>

            <button
              type="button"
              tw="hover:text-yellow-400 text-coolGray-300"
              onClick={close}
            >
              <RiCloseFill className="block h-7 w-7" aria-hidden="true" />
            </button>
          </div>

          <Dialog.Description tw="mt-4">
            {trackers.description}
          </Dialog.Description>

          {/* todo: refactor the "as keyof..." */}
          <ul tw="mt-8 space-y-6">
            {Object.keys(config.trackers).map((key) =>
              config.trackers[key as keyof typeof config.trackers] ? (
                <li key={key}>
                  <a
                    href={config.trackers[key as keyof typeof config.trackers]}
                    target="_blank"
                    rel="noopener noreferrer"
                    tw="flex items-center space-x-2"
                  >
                    <span>
                      {trackers.list[key as keyof typeof trackers.list]}
                    </span>
                    <span tw="inline-block">
                      <HiOutlineExternalLink />
                    </span>
                  </a>
                  <FrameDivider
                    frameHeight={3}
                    frameWidth={4}
                    color="cyan"
                    tw="mt-1"
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
      </SquareFrame>
    </BaseModal>
  )
}
