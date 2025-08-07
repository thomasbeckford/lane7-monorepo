// payload/utilities/getPageBySlug.ts
'use server';

import { getPayload } from 'payload';
import { Config } from '.././../lane7-com/payload-types';
import config from '.././../lane7-com/payload.config';

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
