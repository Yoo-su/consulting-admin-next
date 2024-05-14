/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/dashboard',
        destination: '/dashboard/overview',
        permanent: true,
      },
      {
        source: '/',
        destination: '/dashboard/overview',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
