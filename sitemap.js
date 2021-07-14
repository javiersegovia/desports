module.exports = {
  siteUrl: process.env.SITE_URL || 'https://desports.network',
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://desports.network',
      hreflang: 'en',
    },
    {
      href: 'https://desports.network/es',
      hreflang: 'es',
    },
  ],
  // ...other options
}
