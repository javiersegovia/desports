module.exports = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'error'],
    '/': ['home', 'roadmap'],
    '/whitepaper': ['whitepaper', 'roadmap'],
    '/team': ['team'],
    '/how-to-buy': ['how-to-buy'],
  },
  loadLocaleFrom: (lang, namespace) => {
    return import(`./locales/${lang}/${namespace}.yaml`).then((m) => m.default)
  },
}
