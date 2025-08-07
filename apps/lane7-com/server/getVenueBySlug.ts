'use server';

export const getVenueBySlug = async ({ slug, locale }: { slug?: string; locale?: string }) => {
  console.log('GET VENUES', slug);

  const response = await fetch(`http://localhost:3002/api/venue-by-slug?slug=${slug}&locale=${locale}`);
  const venue = await response.json();

  console.log('VENUE', venue);

  return venue.venues;
};
