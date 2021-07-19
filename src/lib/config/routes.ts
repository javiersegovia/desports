// Here we add all the internal routes mapped to the /pages folder

export const routes = {
  home: '/',
  team: '/team',
  whitepaper: '/whitepaper',
  blog: '/blog',
  how_to_buy: '/how-to-buy',
  nft: {
    index: '/nft',
    raids: '/nft/raids',
    collections: '/nft/collections',
  },
} as const
