/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Activar eslint en builds
  },
  typescript: {
    ignoreBuildErrors: false, // Activar verificación de TypeScript
  },
  images: {
    unoptimized: false, // Activar optimización de imágenes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Configuración de headers de seguridad
  async headers() {
    // CSP en modo Report-Only: NO bloquea, solo reporta violaciones en consola.
    // Revisar que no haya falsos positivos y luego promover la key a
    // 'Content-Security-Policy' (enforcing).
    const cspReportOnly = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https:",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
        ],
      },
    ]
  },
  // Redirect 301: el piloto "Megalodon" se consolidó en el producto RestHUB.
  async redirects() {
    return [
      {
        source: '/blog/megalodon-pro-erp-restaurantes-nextjs',
        destination: '/portfolio/19',
        permanent: true,
      },
    ]
  },
  // Configuración de compresión
  compress: true,

  // Configuración de bundle analyzer (solo en desarrollo)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      )
      return config
    },
  }),
}

export default nextConfig

