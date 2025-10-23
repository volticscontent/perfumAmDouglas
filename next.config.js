/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation during build to prevent SSR issues
  output: 'standalone',
  // Moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: [],
  turbopack: {
    // Set the application root directory to resolve workspace root warning
    root: __dirname
  },
  // Environment variables configuration
  env: {
    // Expose Shopify configuration to the client
    NEXT_PUBLIC_SHOPIFY_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  }
}

module.exports = nextConfig