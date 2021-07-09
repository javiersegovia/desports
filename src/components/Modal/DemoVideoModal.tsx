import React from 'react'
import { config } from '@lib/config/config'
import { RiCloseFill } from 'react-icons/ri'
import { BaseModal, InstanceModalProps } from './BaseModal'

export const DemoVideoModal = ({ isOpen, close }: InstanceModalProps) => {
  if (!config.demoVideo) return null

  const videoUrl = `${config.demoVideo}?theme=dark&color=white&autohide=2&autoplay=1&modestbranding=1&amp&showinfo=0&rel=0&loop=1`
  return (
    <BaseModal isOpen={isOpen} close={close}>
      <div tw="bg-gray-900 rounded transition-all transform m-auto flex flex-col w-[900px] h-[300px] lg:h-[600px] max-w-full max-h-full">
        <button
          type="button"
          tw="hover:text-yellow-400 absolute -top-10 right-0 text-coolGray-300"
          onClick={close}
        >
          <RiCloseFill className="block h-10 w-10" aria-hidden="true" />
        </button>
        <iframe
          title="Intro Video"
          src={videoUrl}
          tw="w-full h-full flex-1"
          frameBorder="0"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </BaseModal>
  )
}
