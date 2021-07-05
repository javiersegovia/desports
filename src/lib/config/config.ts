// Here we add all the external links

export const config = {
  blockchain: {
    contractAddress: '0x53Ab68442DB471F9584a5D768390e2FE3fD36fAB',
    // todo: add contract url!
    contractUrl: '/contract',
  },

  social: {
    twitter: 'https://twitter.com/DESP_Network',
    instagram: 'https://www.instagram.com/desp_network/',
    reddit: 'https://www.reddit.com/r/DeSportsNetwork/',
    telegram: 'https://t.me/DESP_Network',
    discord: 'https://discord.gg/b2t3Q5Pv',
    twitch: 'https://www.twitch.tv/desp_network',
  },

  email: {
    info: 'info@desports.network',
    careers: 'careers@desports.network',
  },

  trackers: {
    // todo: add real urls!
    bscscan: '/bscscan',
    coingecko: '/coingecko',
    coinmarketcap: '/coinmarketcap',
  },
  // todo: add pdf!
  brand_guidelines_pdf: '/brand_guidelines_pdf',

  // todo: add real shop url!
  shop: '/',

  // todo: add real demoVideo url (and follow the format below)!
  demoVideo: '',
  // demoVideo: 'https://www.youtube.com/embed/ANDeiXFiYC4',

  ready_player_me: 'https://desports.readyplayer.me/',

  presale_date: new Date('July 12, 2021 13:00:00'),
  launch_date: new Date('July 12, 2021 15:00:00'),

  external: {
    metamask: 'https://metamask.io/',
    trust_wallet: 'https://trustwallet.com/',
  },

  languages: {
    es: 'Español',
    en: 'English',
  },
} as const
