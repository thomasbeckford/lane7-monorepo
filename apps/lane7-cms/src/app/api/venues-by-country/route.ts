import configPromise from '@payload-config'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'

export const GET = async (request: NextRequest) => {
  const countryCode = request.nextUrl.searchParams.get('countryCode')
  const payload = await getPayload({
    config: configPromise,
  })

  const venues = await payload.find({
    collection: 'venues',
    where: {
      status: { equals: 'published' },
      ...(countryCode && { country: { equals: countryCode } }),
    },
    sort: 'createdAt',
    depth: 2,
    limit: 100,
  })

  return Response.json({ venues: venues.docs })
}
