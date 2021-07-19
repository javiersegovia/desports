import React from 'react'
import {
  collections,
  locked,
  NFTCollectionItemType,
  NFTCollectionType,
  NFTRarityType,
} from '@lib/config/nft'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { styled, theme } from 'twin.macro'
import Image from 'next/image'
import { FrameBorder } from './raids/CurrentNFTCollection'
import { StyledTextMono } from './raids/FundraiseMeter'
import { Container } from '@components/UI/Container'
import useTranslation from 'next-translate/useTranslation'
import { Title } from '@components/UI/Title'
import { VscLock } from 'react-icons/vsc'

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
  const { t } = useTranslation('nft-common')

  const titleI18n: Record<NFTCollectionType['titleKey'], string> = t(
    'nft_collections',
    null,
    {
      returnObjects: true,
    }
  )

  const title = titleI18n[collection.titleKey]

  return (
    <StyledNFTCollection tw="bg-gray-800 w-full py-20">
      <Container>
        <Title tw="lg:text-4xl">{title}</Title>
        <div tw="mt-10 flex space-x-6">
          {collection.items.map((item, index) => (
            <NFTCollectionItem key={item.name || index} item={item} />
          ))}
        </div>
      </Container>
    </StyledNFTCollection>
  )
}

const LockedNFTCollection = () => {
  const { t } = useTranslation('nft-common')

  return (
    <StyledNFTCollection tw="bg-gray-800 w-full py-20 relative">
      <Container>
        <Title tw="lg:text-4xl">{t`nft_collections.locked`}</Title>
        <div tw="mt-10 flex space-x-6">
          {locked.items.map((item, index) => (
            <NFTCollectionItem key={item.name || index} item={item} />
          ))}
        </div>
      </Container>

      <div tw="z-10 bg-gray-900 bg-opacity-80 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-coolGray-400">
        <VscLock tw="text-8xl animate-pulse text-cyan-400" />
        {/* <p tw="font-mono uppercase font-bold text-3xl mt-4 text-center letter-spacing[1px] whitespace-pre-line">
          {unlocking_in}
        </p> */}
      </div>
    </StyledNFTCollection>
  )
}

export const NFTCollections = () => {
  return (
    <section tw="mt-20">
      <div tw="space-y-20">
        {collections.list.map((collection, index) => (
          <NFTCollection
            key={collection.titleKey || index}
            collection={collection}
          />
        ))}
        <LockedNFTCollection />
      </div>
    </section>
  )
}
