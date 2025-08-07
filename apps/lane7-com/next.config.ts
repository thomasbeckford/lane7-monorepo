// next.config.ts
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item: string) => {
        const url = new URL(item);
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
          port: url.port || undefined,
          pathname: '/**'
        };
      })
    ]
  },
  turbopack: {
    resolveAlias: {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs']
    }
  },
  reactStrictMode: true
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
