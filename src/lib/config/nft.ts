import despyImg from '@public/images/nft/despy.jpg'

export enum NFTRarityType {
  LEGENDARY = 'LEGENDARY',
  EPIC = 'EPIC',
  RARE = 'RARE',
  COMMON = 'COMMON',
}

export interface NFTItem {
  name: string
  src: StaticImageData
  rarity: NFTRarityType
}

export interface UnknownNFTItem {
  name: null
  rarity: NFTRarityType
}

// todo: eventually, we should make this dynamic using our own server

// todo: the "titleKey" of the collections
// should be equal to the keys inside the locale nft-common:nft_collections
export interface NFTCollectionType {
  titleKey: 'classics' | 'locked'
  items: NFTCollectionItemType[]
}

export const classics: NFTCollectionType = {
  titleKey: 'classics',
  items: [
    {
      name: 'Despion',
      src: despyImg,
      rarity: NFTRarityType.LEGENDARY,
    },
    {
      name: 'Red Despion',
      src: despyImg,
      rarity: NFTRarityType.EPIC,
    },
    {
      name: null,
      rarity: NFTRarityType.EPIC,
    },
    {
      name: null,
      rarity: NFTRarityType.RARE,
    },
    {
      name: null,
      rarity: NFTRarityType.COMMON,
    },
  ],
}

export const locked: NFTCollectionType = {
  titleKey: 'locked',
  items: [
    {
      name: null,
      rarity: NFTRarityType.COMMON,
    },
    {
      name: null,
      rarity: NFTRarityType.COMMON,
    },
    {
      name: null,
      rarity: NFTRarityType.COMMON,
    },
    {
      name: null,
      rarity: NFTRarityType.COMMON,
    },
    {
      name: null,
      rarity: NFTRarityType.COMMON,
    },
  ],
}

export type NFTCollectionItemType = NFTItem | UnknownNFTItem

interface NFTCollections {
  current: NFTCollectionType
  list: NFTCollectionType[]
}

export const collections: NFTCollections = {
  current: classics,
  list: [classics],
}
