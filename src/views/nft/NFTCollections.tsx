import React from 'react'
import {
  collections,
  NFTCollectionItemType,
  NFTCollectionType,
  NFTItem,
  NFTRarityType,
  UnknownNFTItem,
} from '@lib/config/nft'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { styled, theme } from 'twin.macro'
import Image from 'next/image'
import { FrameBorder } from './raids/CurrentNFTCollection'
import { StyledTextMono } from './raids/FundraiseMeter'
import { Container } from '@components/UI/Container'

interface NFTCollectionItemProps {
  item: NFTCollectionItemType
}

// todo: move this to the "components" folder and make it reusable
// there is another component in "CurrentNFTCollection" that renders almost the same thing besides the size and modal.
const NFTCollectionItem = ({ item }: NFTCollectionItemProps) => {
  return (
    <div>
      <SquareFrame
        tw="relative overflow-hidden w-56 h-72"
        removePadding
        isSquare
        bgColor={theme`colors.gray.900`}
      >
        {item.name ? (
          <Image src={item.src} alt="Image" objectFit="cover" layout="fill" />
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

const StyledNFTCollection = styled.div`
  clip-path: polygon(
    0% 54%,
    1rem calc(54% - 1rem),
    1rem 15%,
    5% 0%,
    calc(33% - 1rem) 0%,
    33% 1rem,
    100% 1rem,
    100% 55%,
    calc(100% - 1rem) 58%,
    calc(100% - 1rem) calc(100% - 1rem),
    46% calc(100% - 1rem),
    calc(46% - 1rem) 100%,
    0% 100%
  );
`

interface NFTCollectionProps {
  collection: NFTCollectionType
}

const NFTCollection = ({ collection }: NFTCollectionProps) => {
  return (
    <StyledNFTCollection tw="bg-gray-800 w-full py-20">
      <Container tw="flex space-x-6">
        {collection.items.map((item, index) => (
          <NFTCollectionItem key={item.name || index} item={item} />
        ))}
      </Container>
    </StyledNFTCollection>
  )
}

export const NFTCollections = () => {
  return (
    <section tw="mt-20">
      <div tw="flex space-x-4">
        {collections.list.map((collection, index) => (
          <NFTCollection
            key={collection.titleKey || index}
            collection={collection}
          />
        ))}
      </div>
    </section>
  )
}
