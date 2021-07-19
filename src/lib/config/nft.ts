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

export interface NFTCollectionType {
  titleKey: string
  items: NFTCollectionItemType[]
}

export const classics: NFTCollectionType = {
  titleKey: 'classics',
  items: [
    {
      name: 'Despy',
      src: despyImg,
      rarity: NFTRarityType.LEGENDARY,
    },
    {
      name: 'Red Despy',
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

export type NFTCollectionItemType = NFTItem | UnknownNFTItem

interface NFTCollections {
  current: NFTCollectionType
  list: NFTCollectionType[]
}

export const collections: NFTCollections = {
  current: classics,
  list: [classics],
}
