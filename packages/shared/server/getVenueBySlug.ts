'use server';

import { getServerSideURL } from '@lane7/shared/utilities/getURL';

/**
 * Fetches a venue by slug with improved error handling and type safety
 */
export const getVenueBySlug = async ({ slug, locale }: { slug: string; locale?: string }) => {
  // Input validation
  if (!slug?.trim()) {
    console.warn('getVenueBySlug: No slug provided');
    return null;
  }

  const url = getServerSideURL();

  try {
    // Build query parameters
    const params = new URLSearchParams({
      'where[slug][equals]': slug.trim(),
      'where[status][equals]': 'published', // Only published venues
      limit: '1' // We only expect one result
    });

    // Add locale if provided
    if (locale) {
      params.set('locale', locale);
    }

    const fullUrl = `${url}/api/venues?${params.toString()}`;

    console.log(`🔍 Fetching venue: ${slug} (locale: ${locale || 'default'})`);

    const response = await fetch(fullUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // Add caching for better performance
      next: {
        revalidate: 300, // 5 minutes cache
        tags: [`venue-${slug}`] // For on-demand revalidation
      }
    } as any);

    if (!response.ok) {
      console.error(`❌ Failed to fetch venue ${slug}:`, {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl
      });

      // For 404, return null instead of throwing
      if (response.status === 404) {
        return null;
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle PayloadCMS response structure
    if (!data.docs || data.docs.length === 0) {
      console.warn(`⚠️ No venue found with slug: ${slug}`);
      return null;
    }

    const venue = data.docs[0];
    console.log(`✅ Found venue: ${venue.name} (${slug})`);

    return venue;
  } catch (error) {
    console.error(`💥 Error fetching venue ${slug}:`, error);

    // In production, you might want to log to an error tracking service
    // logError('getVenueBySlug', error, { slug, locale });

    // Return null instead of throwing to allow graceful degradation
    return null;
  }
};
