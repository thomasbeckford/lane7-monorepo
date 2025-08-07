// server/getVenues.ts
'use server';

import { getPayload } from 'payload';
import { CountryCode } from '../../lane7-com/config/countries';
import config from '../../lane7-com/payload.config';

export const getVenuesByCountryCode = async (countryCode: CountryCode) => {
  const payload = await getPayload({ config });

  const venues = await payload.find({
    collection: 'venues',
    where: {
      status: { equals: 'published' },
      country: { equals: countryCode }
    },
    sort: 'createdAt',
    depth: 2,
    limit: 100
  });

  return venues.docs;
};

export const getVenuesGroupedByCountry = async () => {
  const payload = await getPayload({ config });

  const venues = await payload.find({
    collection: 'venues',
    where: {
      status: { equals: 'published' }
    },
    sort: 'country.name,city.name',
    depth: 2,
    limit: 0 // Sin límite para obtener todos los registros
  });

  // Crear el objeto agrupado de forma más eficiente
  const venuesByCountry: Record<string, { country: any; venues: any[] }> = {};

  for (const venue of venues.docs) {
    if (!venue.country) continue;

    const countryCode = venue.country;

    if (!venuesByCountry[countryCode]) {
      venuesByCountry[countryCode] = {
        country: venue.country,
        venues: []
      };
    }

    venuesByCountry[countryCode].venues.push(venue);
  }

  return {
    venuesByCountry,
    totalVenues: venues.docs.length
  };
};
