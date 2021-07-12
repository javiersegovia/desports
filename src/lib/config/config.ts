// Here we add all the external links

export const config = {
  blockchain: {
    contractUrl:
      'https://bscscan.com/token/0x92d7142ba886c710ba72994972d108fb2fb1889a',

    // TODOPRESALE:
    contractAddress: '0x92D7142ba886c710bA72994972D108FB2fB1889a',
    fundraisingAddress: '0x81E4d494b85A24a58a6BA45c9B418b32a4E039de',
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

  buy_on: {
    // TODOPRESALE:
    pancakeswap:
      'https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x92D7142ba886c710bA72994972D108FB2fB1889a',
    presale: 'https://dxsale.app/app/v2_9/defipresale?saleID=951&chain=BSC',
  },

  email: {
    info: 'info@desports.network',
    careers: 'careers@desports.network',
  },

  trackers: {
    // todo: add real urls!
    // TODOPRESALE:
    poocoin:
      'https://poocoin.app/tokens/0x92d7142ba886c710ba72994972d108fb2fb1889a',
    bscscan:
      'https://bscscan.com/token/0x92d7142ba886c710ba72994972d108fb2fb1889a',
    boggedfinance:
      'https://charts.bogged.finance/0x92D7142ba886c710bA72994972D108FB2fB1889a',
    dextools:
      'https://www.dextools.io/app/pancakeswap/pair-explorer/0x0961a4da5025337074b68c405e9a2b3ad31c601c',
    coingecko: '',
    coinmarketcap: '',
  },
  // todo: add pdf!
  brand_guidelines_pdf:
    'https://www.figma.com/file/RcCdIdCau5AF5fiZGOSQJt/Basic-Brand-Guidelines-DN-(Community-and-Team)?node-id=0%3A1',

  // todo: add real shop url!
  shop: '/',

  // todo: add real demoVideo url (and follow the format below)!
  demoVideo: 'https://www.youtube.com/embed/q3PjFkSiDsc',
  // demoVideo: 'https://www.youtube.com/embed/ANDeiXFiYC4',

  ready_player_me: 'https://cyberpunk.readyplayer.me/',

  presale_date: new Date(Date.UTC(2021, 6, 12, 13, 0, 0)),
  launch_date: new Date(Date.UTC(2021, 6, 12, 15, 5, 0)),

  external: {
    metamask: 'https://metamask.io/',
    trust_wallet: 'https://trustwallet.com/',
    pancakeswap: 'https://pancakeswap.finance/',
    trust_wallet_buy_bnb: 'https://trustwallet.com/buy-bnb/',

    audit:
      'https://github.com/TechRate/Smart-Contract-Audits/blob/main/DeSports%20Network.pdf',
  },

  total_supply: '88,888,888,888',
  total_burned: '29,626,666,666.4',
  total_circulating: '59,253,333,332.7',

  languages: {
    es: 'Español',
    en: 'English',
  },
} as const
