import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import tw, { styled, theme } from 'twin.macro'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import useTranslation from 'next-translate/useTranslation'
import { StyledTextMono } from './FundraiseMeter'
import { Title } from '@components/UI/Title'
import {
  NFTItem,
  UnknownNFTItem,
  NFTRarityType,
  collections,
} from '@lib/config/nft'
import { StyledSlider } from '../NFTCollections'
import Link from 'next/link'
import { routes } from '@lib/config/routes'
import { NFTRarity } from './NFTRarity'
import { NFTCharacterModalProps } from '@components/Modal/NFTCharacterModal'
import { useClickableSlider } from '@lib/hooks/useClickableSlider'
import { useToggle } from '@lib/hooks/useToggle'

const NFTCharacterModal = dynamic<NFTCharacterModalProps>(() =>
  import('@components/Modal/NFTCharacterModal').then(
    (module) => module.NFTCharacterModal
  )
)

const StyledBorderFrame = styled.div<{ shadowColor?: string }>`
  ${tw`absolute z-20 inset-0`}

  ${(p) =>
    p.shadowColor && `box-shadow: inset 0px 0px 1rem 0.25rem ${p.shadowColor};`}

  .borderLine {
    ${tw`absolute z-20`}

    ${(p) => p.shadowColor && `background: ${p.shadowColor};`}
  }
`

interface FrameBorderProps {
  shadowColor?: string
}

export const FrameBorder = ({ shadowColor }: FrameBorderProps) => {
  return (
    <>
      <StyledBorderFrame shadowColor={shadowColor}>
        <div className="borderLine" tw="opacity-20 top-[10%] w-full h-[1px]" />
        <div
          className="borderLine"
          tw="opacity-20 bottom-[10%] w-full h-[1px]"
        />
        <div className="borderLine" tw="opacity-20 left-[10%] w-[1px] h-full" />
        <div
          className="borderLine"
          tw="opacity-20 right-[10%] w-[1px] h-full"
        />
      </StyledBorderFrame>
    </>
  )
}

interface NFTSquareItemProps {
  item: NFTItem | UnknownNFTItem
  clickable: boolean
}

const NFTSquareItem = ({ item, clickable }: NFTSquareItemProps) => {
  const [nftModalIsOpen, { setTrue: openNftModal, setFalse: closeNftModal }] =
    useToggle()

  return (
    <>
      <button
        type="button"
        tw="w-full h-72"
        onClick={() => clickable && openNftModal()}
      >
        <SquareFrame
          tw="relative overflow-hidden w-full aspect-w-1 aspect-h-1"
          removePadding
          isSquare
          bgColor={theme`colors.gray.900`}
        >
          {item.name ? (
            <Image src={item.src} alt="Image" quality={100} objectFit="cover" />
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
        {item.name && (
          <StyledTextMono tw="text-sm mt-2 text-center">
            {item.name}
          </StyledTextMono>
        )}
      </button>

      <NFTCharacterModal
        isOpen={nftModalIsOpen}
        close={closeNftModal}
        item={item}
        showGoToRaid={false}
      />
    </>
  )
}

export const CurrentNFTCollection = () => {
  const { t } = useTranslation('nft-raids')

  const { clickableSettings, clickable } = useClickableSlider(sliderSettings)

  return (
    <SquareFrame removePadding bgColor={theme`colors.gray.800`}>
      <div tw="px-10 lg:px-14 pt-10 pb-12">
        <div tw="flex items-center justify-center lg:justify-between">
          <Title tw="lg:text-2xl">{t`nft_collections.title`}</Title>

          <Link href={routes.nft.collections} passHref>
            <a>
              <StyledTextMono tw="text-cyan-400 hidden lg:block">{t`nft_collections.see_all`}</StyledTextMono>
            </a>
          </Link>
        </div>

        <StyledSlider tw="mt-8" {...clickableSettings}>
          {collections.current.items.map((nftItem, index) => (
            <NFTSquareItem
              item={nftItem}
              key={nftItem.name || index}
              clickable={clickable}
            />
          ))}
        </StyledSlider>

        <NFTRarity tw="p-0 mt-10 block lg:hidden" noClip />

        <Link href={routes.nft.collections} passHref>
          <a>
            <StyledTextMono tw="text-cyan-400 block lg:hidden text-center mt-10">{t`nft_collections.see_all`}</StyledTextMono>
          </a>
        </Link>
      </div>
    </SquareFrame>
  )
}

const sliderSettings = {
  speed: 500,
  slidesToShow: 5,
  infinite: false,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        arrows: false,
      },
    },
  ],
}
