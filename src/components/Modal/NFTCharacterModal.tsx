import React from 'react'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Dialog } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { BaseModal, InstanceModalProps } from './BaseModal'
import { NFTCollectionItemType, NFTRarityType } from '@lib/config/nft'
import { FrameBorder } from '@root/src/views/nft/raids/CurrentNFTCollection'
import { theme } from 'twin.macro'
import Image from 'next/image'
import { Button } from '@components/UI/Button'
import { routes } from '@lib/config/routes'

export interface NFTCharacterModalProps extends InstanceModalProps {
  item: NFTCollectionItemType
  showGoToRaid?: boolean
}

export const NFTCharacterModal = ({
  isOpen,
  close,
  item,
  showGoToRaid = true,
}: NFTCharacterModalProps) => {
  return (
    <BaseModal isOpen={isOpen} close={close}>
      <div className="relative inline-block w-auto overflow-hidden text-left m-auto transition-all transform bg-gray-900 text-coolGray-300 rounded-md p-4 sm:p-10">
        <div tw="flex pb-4 lg:pb-0">
          <button
            type="button"
            tw="hover:text-yellow-400 text-coolGray-300 ml-auto relative sm:absolute top-0 right-0 sm:right-6 sm:top-6"
            onClick={close}
          >
            <RiCloseFill className="block h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        <div tw="flex items-center lg:items-start justify-between space-y-10 lg:space-y-0 lg:space-x-10 flex-col lg:flex-row">
          {item.name && item.cardPath ? (
            <div tw="w-full max-w-[18rem] rounded-md overflow-hidden">
              <video
                data-object-fit="cover"
                data-object-position="center center"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
              >
                <source src={item.cardPath} type="video/mp4" />
              </video>
            </div>
          ) : (
            <SquareFrame
              tw="relative overflow-hidden w-56 h-72"
              removePadding
              isSquare
              bgColor={theme`colors.gray.900`}
            >
              {item.name ? (
                <Image
                  src={item.src}
                  alt="Image"
                  objectFit="cover"
                  layout="fill"
                />
              ) : (
                <div tw="absolute z-10 inset-0 flex items-center justify-center text-6xl font-mono">
                  ?
                </div>
              )}
              <FrameBorder
                shadowColor={
                  item.rarity === NFTRarityType.LEGENDARY
                    ? theme`colors.yellow.400`
                    : item.rarity === NFTRarityType.EPIC
                    ? theme`colors.purple.500`
                    : item.rarity === NFTRarityType.RARE
                    ? theme`colors.blue.500`
                    : theme`colors.coolGray.300`
                }
              />
            </SquareFrame>
          )}

          <div>
            <Dialog.Title
              as="h3"
              tw="text-3xl font-bold leading-6 font-mono uppercase text-cyan-400"
            >
              {item.name}
            </Dialog.Title>

            <Dialog.Description tw="mt-4 whitespace-pre-wrap max-w-md">
              {item.name !== null && item.description}
            </Dialog.Description>

            {showGoToRaid && (
              <Button
                tw="w-full sm:w-auto mt-10"
                bgColor={theme`colors.emerald.400`}
                href={routes.nft.raids}
              >
                Go to current raid
              </Button>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  )
}
