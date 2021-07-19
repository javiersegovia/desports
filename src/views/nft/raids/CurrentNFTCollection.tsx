import React from 'react'
import Image from 'next/image'
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
}

const NFTSquareItem = ({ item }: NFTSquareItemProps) => {
  return (
    <div>
      <SquareFrame
        tw="relative overflow-hidden w-32 h-36"
        removePadding
        isSquare
        bgColor={theme`colors.gray.900`}
      >
        {item.name ? (
          <Image src={item.src} alt="Image" />
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
              : ''
          }
        />
      </SquareFrame>

      {item.name && (
        <StyledTextMono tw="text-sm mt-2 text-center">
          {item.name}
        </StyledTextMono>
      )}
    </div>
  )
}

export const CurrentNFTCollection = () => {
  const { t } = useTranslation('raids')

  return (
    <SquareFrame removePadding bgColor={theme`colors.gray.800`}>
      <div tw="px-14 pt-10 pb-12">
        <div tw="flex items-center justify-between">
          {/* <StyledTextMono>{t`nft_collections.title`}</StyledTextMono> */}
          <Title tw="lg:text-2xl">{t`nft_collections.title`}</Title>

          <StyledTextMono tw="text-cyan-400">{t`nft_collections.see_all`}</StyledTextMono>
        </div>

        <div tw="flex space-x-4 mt-8">
          {collections.current.items.map((nftItem, index) => (
            <NFTSquareItem item={nftItem} key={nftItem.name || index} />
          ))}
        </div>
      </div>
    </SquareFrame>
  )
}
