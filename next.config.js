const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        loader: 'akamai',
        path: '',
        domains: ['www.sbsmobile.com', 'sbsmobile.cloud.akeneo.com'],
    },
    i18n
}

module.exports = nextConfig
