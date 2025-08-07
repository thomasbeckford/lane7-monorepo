import configPromise from '@payload-config';
import { NextRequest } from 'next/server';
import { getPayload } from 'payload';

export const GET = async (request: NextRequest) => {
  const slug = request.nextUrl.searchParams.get('slug');
  const locale = request.nextUrl.searchParams.get('locale');

  const payload = await getPayload({
    config: configPromise
  });

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
    ...(locale && { locale: locale as any })
  });

  return Response.json({ venues: venues.docs[0] });
};
