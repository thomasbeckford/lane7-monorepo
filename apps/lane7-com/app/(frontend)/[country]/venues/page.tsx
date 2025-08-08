import { getCountryData } from '@lane7/shared/config/countries';
import { Venue } from '@lane7/shared/payload-types';
import { getVenues } from '@lane7/shared/server/getVenues';
import Link from 'next/link';

// Metadata para AI SEO específico de London
export const generateMetadata = async ({ params }: { params: Promise<{ country: string }> }) => {
  const { country } = await params;
  const countryData = getCountryData(country);

  return {
    title: `Lane7 Venues - Bowling, Pool & Karaoke | ${countryData?.name} Locations`,
    description: `Lane7 offers premium entertainment venues in ${countryData?.name} offering bowling from £15, pool from £8, and karaoke from £12. Perfect for corporate events and group bookings.`,
    keywords:
      'Lane7, bowling venues, pool halls, karaoke bars, entertainment venues, corporate events, team building, London bowling, Manchester pool, Berlin karaoke',
    openGraph: {
      title: `Lane7 Venues - Premium Bowling, Pool & Karaoke Venues | ${countryData?.name}`,
      description:
        "Book bowling, pool, and karaoke at Lane7's 8 venues. Perfect for corporate events and group celebrations.",
      type: 'website',
      locale: country
    }
  };
};

// Venue card component
const VenueCard = ({ venue }: { venue: Venue }) => {
  const getLocationName = () => {
    if (venue.locationSpecifier) {
      return `Lane7 ${venue.locationSpecifier}`;
    }
    return `Lane7 ${venue.city}`;
  };

  return (
    <article>
      <Link href={`/venues/${venue.slug}`} className="group relative block">
        <div
          className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-[1.02] transition-transform duration-300"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
          }}
        >
          {venue.hero?.backgroundImage &&
          typeof venue.hero.backgroundImage === 'object' &&
          venue.hero.backgroundImage.url ? (
            <img
              src={venue.hero.backgroundImage.url}
              alt={`${getLocationName()} interior showing bowling, pool and karaoke facilities`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600" />
          )}

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-wide leading-tight drop-shadow-lg">
              {getLocationName()}
            </h3>
            <p className="text-lime-400 text-sm font-bold mt-2">Bowling • Pool • Karaoke</p>
          </div>

          <div
            className="absolute inset-0 border-2 border-transparent group-hover:border-lime-400/30 transition-colors duration-300"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
            }}
          ></div>
        </div>
      </Link>
    </article>
  );
};

export default async function LondonVenuesPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const { venues } = await getVenues({ countryCode: country });
  const countryData = getCountryData(country);

  // Structured Data específico para London venues
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Lane7 ${countryData?.name} Venues`,
    description: `Lane7 entertainment venues in ${countryData?.name} offering bowling, pool, and karaoke`,
    numberOfItems: venues.length,
    itemListElement: venues.map((venue: Venue, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EntertainmentBusiness',
        name: `Lane7 ${venue.locationSpecifier || venue.city}`,
        description: `Lane7 ${
          venue.locationSpecifier || venue.city
        } offers premium bowling, pool, and karaoke facilities`,
        url: `https://lane7.com/venues/${venue.slug}`,
        address: venue.location?.address
          ? {
              '@type': 'PostalAddress',
              streetAddress: venue.location.address,
              addressLocality: venue.city,
              addressCountry: country
            }
          : undefined,
        telephone: venue.location?.phone,
        priceRange: '£8-£15',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${venue.locationSpecifier || venue.city} Games & Activities`,
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Bowling',
              price: '£15',
              description: 'Premium bowling lanes with modern scoring systems'
            },
            {
              '@type': 'Offer',
              name: 'Pool',
              price: '£8',
              description: 'Professional pool tables in stylish setting'
            },
            {
              '@type': 'Offer',
              name: 'Karaoke',
              price: '£12',
              description: 'Private karaoke rooms with full bar service'
            }
          ]
        }
      }
    }))
  };

  // FAQ Schema específico para London
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many Lane7 venues are in ${countryData?.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Lane7 has ${venues.length} premium entertainment venues in ${countryData?.name}, each offering bowling, pool, and karaoke facilities with full bar service.`
        }
      },
      {
        '@type': 'Question',
        name: `What games are available at Lane7 ${countryData?.name} venues?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All Lane7 venues offer bowling from £15, pool from £8, and karaoke from £12. Each venue features premium equipment and modern facilities.'
        }
      },
      {
        '@type': 'Question',
        name: `Does Lane7 ${countryData?.name} host corporate events?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all Lane7 venues specialize in corporate events, team building activities, and group bookings with dedicated event packages and professional coordination.'
        }
      },
      {
        '@type': 'Question',
        name: `Where are Lane7 ${countryData?.name} venues located?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            venues.map((v: Venue) => `Lane7 ${v.locationSpecifier || v.city}`).join(', ') +
            ' - all offering premium bowling, pool, and karaoke experiences in ' +
            countryData?.name +
            '.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-pink-900">
            <div className="absolute inset-0 bg-[url('/images/venues-bg.jpg')] bg-cover bg-center opacity-60"></div>
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-8">
              <div className="text-lime-400 font-black text-6xl md:text-8xl uppercase tracking-wider">LANE7</div>
              <div className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base font-medium">
                {countryData?.name} ENTERTAINMENT VENUES
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white mb-8 leading-tight">
              {countryData?.name} VENUES
            </h1>

            <div className="mb-12">
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mb-6 leading-relaxed">
                Lane7 has {venues.length} premium entertainment venues across {countryData?.name}, each offering
                bowling, pool, and karaoke with full bar service and modern facilities.
              </p>
              <p className="text-lime-400 text-lg font-bold">
                Perfect for corporate events, team building, and group celebrations
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mb-16">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-lime-400">{venues.length}</div>
                <div className="text-sm text-white/60 uppercase">Venues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-lime-400">3</div>
                <div className="text-sm text-white/60 uppercase">Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-lime-400">£8+</div>
                <div className="text-sm text-white/60 uppercase">From</div>
              </div>
            </div>
          </div>

          {/* Venues Grid */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              {venues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {venues.map((venue: Venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-3xl font-bold mb-4">No {countryData?.name} venues found</h3>
                  <p className="text-white/60 text-lg">
                    We're working on bringing amazing venues to {countryData?.name}. Stay tuned!
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* What makes Lane7 London special - AI SEO Content */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8">Why Choose Lane7 {countryData?.name}?</h2>
          <div className="prose prose-lg mx-auto text-center text-white">
            <p className="text-xl mb-6">
              Lane7's {countryData?.name} venues combine premium bowling, pool, and karaoke facilities with exceptional
              bar service and vibrant atmosphere. Each location features state-of-the-art equipment, stylish interiors,
              dedicated event coordination.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-lg font-bold text-lime-400 mb-2">Premium Facilities</h3>
                <p className="text-gray-300">Modern bowling lanes, professional pool tables, private karaoke rooms</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-lime-400 mb-2">Corporate Events</h3>
                <p className="text-gray-300">Dedicated packages, event coordination, catering options</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-lime-400 mb-2">Central Locations</h3>
                <p className="text-gray-300">Easily accessible venues across London with excellent transport links</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Critical for AI SEO */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-16">
            Lane7 {countryData?.name} - Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <article>
              <h3 className="text-xl font-bold mb-3 text-black">How many Lane7 venues are in {countryData?.name}?</h3>
              <p className="text-gray-700">
                Lane7 has {venues.length} premium entertainment venues in {countryData?.name}:{' '}
                {venues.map((v: Venue) => v.locationSpecifier || v.city).join(', ')}. Each venue offers bowling from
                £15, pool from £8, and karaoke from £12 with full bar service.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-3 text-black">What games are available at Lane7 London venues?</h3>
              <p className="text-gray-700">
                All Lane7 London venues offer bowling from £15 per game, pool from £8 per table, and karaoke from £12
                per session. Each venue features premium equipment, modern scoring systems, and professional-grade
                facilities.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-3 text-black">Does Lane7 London host corporate events?</h3>
              <p className="text-gray-700">
                Yes, all Lane7 London venues specialize in corporate events, team building activities, and group
                bookings. We offer dedicated event packages, private venue hire, catering options, and professional
                event coordination across all London locations.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-3 text-black">Where exactly are Lane7 London venues located?</h3>
              <p className="text-gray-700">
                Lane7 London venues are located in {venues.map((v: Venue) => v.locationSpecifier || v.city).join(', ')}.
                Each venue is easily accessible by public transport and offers the same premium bowling, pool, and
                karaoke experience.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-3 text-black">
                Can I book all Lane7 London venues for large corporate events?
              </h3>
              <p className="text-gray-700">
                Yes, Lane7 can accommodate large corporate events across multiple London venues. With {venues.length}{' '}
                locations offering bowling, pool, and karaoke, we can handle events of any size with coordinated booking
                and catering services.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
