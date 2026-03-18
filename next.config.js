/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  images: {
    domains: ['via.placeholder.com', 'picsum.photos', 'ydhmwqdeofhdxkdfytou.supabase.co'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    })
    return config
  },
}

module.exports = nextConfig
