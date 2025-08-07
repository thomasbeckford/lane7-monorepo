'use server';

import { getServerSideURL } from '@lane7/shared/utilities/getURL';

export const getVenueBySlug = async ({ slug, locale }: { slug?: string; locale?: string }) => {
  console.log('GET VENUES', slug);
  const url = getServerSideURL();
  const response = await fetch(`${url}/api/venue-by-slug?slug=${slug}&locale=${locale}`);
  const venue = await response.json();

  console.log('VENUE', venue);

  return venue.venues;
};
