'use server';

import { getServerSideURL } from '@lane7/shared/utilities/getURL';

/**
 * Fetches venues by country code with improved error handling and filtering
 */
export const getVenues = async ({
  countryCode,
  limit = 50,
  page = 1,
  locale,
  includeUnpublished = false
}: {
  countryCode?: string;
  limit?: number;
  page?: number;
  locale?: string;
  includeUnpublished?: boolean;
}) => {
  const url = getServerSideURL();

  try {
    // Build query parameters
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString()
    });

    // Add country filter if provided
    if (countryCode?.trim()) {
      params.set('where[country][equals]', countryCode.trim().toLowerCase());
    }

    // Add status filter unless explicitly including unpublished
    if (!includeUnpublished) {
      params.set('where[status][equals]', 'published');
    }

    // Add locale if provided
    if (locale) {
      params.set('locale', locale);
    }

    // Sort by name for consistent ordering
    params.set('sort', 'name');

    const fullUrl = `${url}/api/venues?${params.toString()}`;

    console.log(`🔍 Fetching venues for country: ${countryCode || 'all'} (page ${page}, limit ${limit})`);

    const response = await fetch(fullUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 600, // 10 minutes cache (venues change less frequently)
        tags: ['venues', ...(countryCode ? [`venues-${countryCode}`] : [])]
      }
    } as any);

    if (!response.ok) {
      console.error(`❌ Failed to fetch venues:`, {
        status: response.status,
        statusText: response.statusText,
        countryCode,
        url: fullUrl
      });

      // Try to get more detailed error info
      let errorMessage = 'Unknown error';
      try {
        const errorData = await response.json();
        errorMessage = errorData.errors?.[0]?.message || errorData.message || errorMessage;
      } catch {
        errorMessage = (await response.text()) || errorMessage;
      }

      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();

    console.log(`✅ Found ${data.docs?.length || 0} venues (total: ${data.totalDocs || 0})`);

    return {
      venues: data.docs || [],
      pagination: {
        page: data.page || page,
        limit: data.limit || limit,
        totalPages: data.totalPages || 1,
        totalDocs: data.totalDocs || 0,
        hasNextPage: data.hasNextPage || false,
        hasPrevPage: data.hasPrevPage || false
      }
    };
  } catch (error) {
    console.error(`💥 Error fetching venues:`, error);

    // Return empty result with error info for graceful degradation
    return {
      venues: [],
      pagination: {
        page: 1,
        limit: 0,
        totalPages: 0,
        totalDocs: 0,
        hasNextPage: false,
        hasPrevPage: false
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
