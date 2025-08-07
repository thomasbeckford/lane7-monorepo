// payload/utilities/getPageBySlug.ts
'use server';

import { Config } from '@/payload-types';
import config from '@/payload.config';
import { getPayload } from 'payload';

export const getVenueBySlug = async ({ slug, locale }: { slug: string; locale: Config['locale'] }) => {
  const payload = await getPayload({ config });
  const venues = await payload.find({
    collection: 'venues',
    where: {
      slug: {
        equals: slug
      },
      status: {
        equals: 'published'
      }
    },
    locale
  });

  const venue = venues.docs[0];

  return venue;
};
