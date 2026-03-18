import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
  async rewrites() {
    return [
      { source: '/auth/:path*', destination: `${process.env.BACKEND_URL}/auth/:path*` },
      { source: '/api/:path*', destination: `${process.env.BACKEND_URL}/api/:path*` },
    ]
  },
}

export default nextConfig
