import despionImg from '@public/images/nft/despion.jpg'
import aiqianImg from '@public/images/nft/aivana.jpg'
import bullishtainImg from '@public/images/nft/bullishtain.jpg'
import mekkabadgerImg from '@public/images/nft/mekkabadger.jpg'

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
  description: string
  cardPath?: string
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
      src: despionImg,
      rarity: NFTRarityType.LEGENDARY,
      description: `This species of dragons had become extinct millions of years ago. At least, that's what everyone believed, but apparently, an egg survived all this time. It is not known how, but it was so. This dragon is one of a kind, and therefore quite valuable. Currently, nobody knows where he is located.`,
      cardPath: '/images/nft/despion_card.mp4',
    },
    {
      name: 'AiQian',
      src: aiqianImg,
      rarity: NFTRarityType.EPIC,
      description: `This rare dragon can give power, strength, and luck to those who deserve it. She is quite smart and therefore gaining her trust can be very difficult.`,
    },
    {
      name: 'Bullishtain',
      src: bullishtainImg,
      rarity: NFTRarityType.RARE,
      description: `Bullishtain is a formidable warrior. He started out as a recruit in the Aho'gar tribe and, with great passion and dedication, managed to rise to become the leader. His goal was never to lead; but when the Yaon'ot clan attacked them, he had to organize his tribe and defend his village since the chiefs were hunting. Many doubted his ability to lead the tribe but then changed their minds because he was able to lead his people to times of prosperity, wealth, and peace.

For that and much more, he is known as the Fearful Savior.`,
    },
    {
      name: 'Mekkabadger',
      src: mekkabadgerImg,
      rarity: NFTRarityType.COMMON,
      description: `He may be small, but he has always shown intellectually superior to any mortal being. This difference brought him many problems with his relatives since everyone saw him as someone different and strange. He received a lot of harassment, and this made him develop a special hatred for others. The only thing that distracted him and made him feel good was technology and robotics; a passion full of curiosity that he has had from a very young age.`,
    },
  ],
}

// todo: delete this and just use a dummy array in the component instead
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
