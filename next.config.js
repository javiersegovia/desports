/* eslint-disable @typescript-eslint/no-var-requires */
const withTranslations = require('next-translate')

module.exports = withTranslations({
  reactStrictMode: true,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false }

    // Install yaml-loader
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  },
})
