module.exports = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          destination: 'https://playentry.org/lib/:path*',
          source: '/lib/:path*',
        },
        {
          destination: 'https://playentry.org/js/:path*',
          source: '/js/:path*',
        },
        {
          destination: 'https://playentry.org/font/:path*',
          source: '/font/:path*',
        },
        {
          destination: 'https://playentry.org/uploads/:path*',
          source: '/uploads/:path*',
        },
        {
          destination: 'https://playentry.org/img/:path*',
          source: '/img/:path*',
        },
      ];
    }
  },
};
