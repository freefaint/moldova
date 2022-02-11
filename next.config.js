/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['ru-RU', 'ru-MD'],
    defaultLocale: 'ru-RU',
    localeDetection: true,
  },
}

module.exports = nextConfig
