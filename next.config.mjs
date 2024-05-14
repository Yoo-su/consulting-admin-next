/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/dashboard/overview',
      },
    ];
  },
};

export default nextConfig;
