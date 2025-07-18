// next.config.js for production
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/laravel-api/:path*',
        destination: 'https://api.desamenur.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
