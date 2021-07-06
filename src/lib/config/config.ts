// Here we add all the external links

export const config = {
  blockchain: {
    contractAddress: '',
    contractUrl:
      'https://bscscan.com/address/0x92d7142ba886c710ba72994972d108fb2fb1889a#code',
  },

  social: {
    twitter: 'https://twitter.com/DESP_Network',
    instagram: 'https://www.instagram.com/desp_network/',
    reddit: 'https://www.reddit.com/r/DeSportsNetwork/',
    telegram: 'https://t.me/DESP_Network',
    discord: 'https://discord.gg/m6jVGqgzgB',
    twitch: 'https://www.twitch.tv/desp_network',
    youtube: 'https://www.youtube.com/channel/UCq1AtCrCTTYx6BEME1YuEVw/videos',
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
  brand_guidelines_pdf:
    'https://drive.google.com/file/d/1c2ovSBbta2fbnc2oDbXHHUOLWnb5c1jF/view?usp=sharing',

  // todo: add real shop url!
  shop: '/',

  // todo: add real demoVideo url (and follow the format below)!
  demoVideo: '',
  // demoVideo: 'https://www.youtube.com/embed/ANDeiXFiYC4',

  ready_player_me: 'https://cyberpunk.readyplayer.me/',

  presale_date: new Date('July 12, 2021 13:00:00'),
  launch_date: new Date('July 12, 2021 15:00:00'),

  external: {
    metamask: 'https://metamask.io/',
    trust_wallet: 'https://trustwallet.com/',
  },

  total_supply: '88,888,888,888',
  total_burned: '29,626,666,666.4',
  total_circulating: '59,253,333,332.7',

  languages: {
    es: 'Español',
    en: 'English',
  },
} as const
