// config/urls.ts
import { getServerSideURL } from '@lane7/shared/utilities/getURL';

export const ENVIRONMENTS = {
  development: {
    cms: 'http://localhost:3002',
    com: 'http://localhost:3000',
    de: 'http://localhost:3001'
  },
  preview: {
    cms: 'https://lane7-cms-preview.vercel.app',
    com: 'https://lane7-com-preview.vercel.app',
    de: 'https://lane7-de-preview.vercel.app'
  },
  production: {
    cms: 'https://lane7-cms.vercel.app',
    com: 'https://lane7-com.vercel.app',
    de: 'https://lane7-de.vercel.app'
    // Future custom domains (when ready to redirect)
    // com: 'https://lane7.com',
    // comWww: 'https://www.lane7.com',
    // de: 'https://lane7.de',
    // deWww: 'https://www.lane7.de',
  }
} as const;

/**
 * Get all allowed URLs for CORS and CSRF configuration
 */
export function getAllowedUrls(): string[] {
  const urls: string[] = [];

  // Add CMS URL
  urls.push(getServerSideURL());

  // Development URLs
  if (process.env.NODE_ENV === 'development') {
    urls.push(ENVIRONMENTS.development.com, ENVIRONMENTS.development.de);
  }

  // Always add production URLs (for cross-env access)
  urls.push(ENVIRONMENTS.production.com, ENVIRONMENTS.production.de);

  // Add preview URLs if in preview mode
  if (process.env.VERCEL_ENV === 'preview') {
    urls.push(ENVIRONMENTS.preview.cms, ENVIRONMENTS.preview.com, ENVIRONMENTS.preview.de);
  }

  // Add dynamic Vercel URLs if available
  if (process.env.VERCEL_URL) {
    urls.push(`https://${process.env.VERCEL_URL}`);
  }

  // Remove duplicates and return
  return [...new Set(urls)];
}
