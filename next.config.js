// next.config.js
module.exports = {
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },
  async headers() {
    return [];
  },
  experimental: {
    middleware: true,
  },
};