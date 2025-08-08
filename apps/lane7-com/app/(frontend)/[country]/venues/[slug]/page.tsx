import { Section } from '@/components/ui/section';
import { getCountryData } from '@lane7/shared/config/countries';
import { locales } from '@lane7/shared/config/locales';
import { getVenueBySlug } from '@lane7/shared/server/getVenueBySlug';
import { getClientSideURL } from '@lane7/shared/utilities/getURL';
import RichText from '@lane7/shared/utilities/richText';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
    country: string;
  }>;
};

// AI SEO Content Component
const AIOptimizedContent = ({ venue, country }: { venue: any; country: string }) => {
  const countryData = getCountryData(country);

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
          About Lane7 {countryData?.name || venue.city}
        </h2>
        <div className="prose prose-lg mx-auto text-center text-white">
          <p className="text-xl mb-6">
            Lane7 {countryData?.name || venue.city} is a premium entertainment venue in {venue.city} offering bowling
            from £15, pool from £8, and karaoke from £12. Our modern facilities feature state-of-the-art equipment, full
            bar service, and professional event coordination.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-lime-400 mb-2">Premium Gaming</h3>
              <p className="text-gray-300">Modern bowling lanes, professional pool tables, private karaoke rooms</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-lime-400 mb-2">Perfect Location</h3>
              <p className="text-gray-300">Conveniently located in {venue.city} with excellent transport links</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-lime-400 mb-2">Full Service</h3>
              <p className="text-gray-300">Complete bar service, food options, and event coordination</p>
            </div>
          </div>

          {venue.services?.hasGroupBookings && (
            <div className="mt-8 p-6 bg-lime-400/10 rounded-lg">
              <h3 className="text-xl font-bold text-lime-400 mb-3">Corporate Events & Group Bookings</h3>
              <p className="text-gray-300">
                Lane7 {countryData?.name || venue.city} specializes in corporate events, team building activities, and
                group celebrations. We offer dedicated event packages, private venue hire, and professional coordination
                for groups of all sizes.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Enhanced FAQ Component
const EnhancedFAQSection = ({ venue }: { venue: any }) => {
  const getPlainTextFromRichText = (richText: any): string => {
    if (!richText?.root?.children) return '';
    const extractText = (children: any[]): string => {
      return children
        .map(child => {
          if (child.type === 'text') return child.text || '';
          if (child.children) return extractText(child.children);
          return '';
        })
        .join('');
    };
    return extractText(richText.root.children).trim();
  };

  // Add venue-specific FAQs for AI SEO
  const additionalFAQs = [
    {
      question: `What games are available at Lane7 ${venue.locationSpecifier || venue.city}?`,
      answer: `Lane7 ${
        venue.locationSpecifier || venue.city
      } offers bowling from £15, pool from £8, and karaoke from £12. All games include access to premium equipment and facilities with full bar service.`
    },
    {
      question: `Where is Lane7 ${venue.locationSpecifier || venue.city} located?`,
      answer: `Lane7 ${venue.locationSpecifier || venue.city} is located at ${
        venue.location?.address || venue.city
      }. We're easily accessible by public transport and offer the complete Lane7 entertainment experience.`
    },
    ...(venue.services?.hasGroupBookings
      ? [
          {
            question: `Does Lane7 ${venue.locationSpecifier || venue.city} host corporate events?`,
            answer: `Yes, Lane7 ${
              venue.locationSpecifier || venue.city
            } specializes in corporate events, team building activities, and group bookings. We offer dedicated event packages and professional coordination.`
          }
        ]
      : []),
    ...(venue.openingHours && venue.openingHours.length > 0
      ? [
          {
            question: `What are Lane7 ${venue.locationSpecifier || venue.city} opening hours?`,
            answer: `Lane7 ${venue.locationSpecifier || venue.city} opening hours: ${venue.openingHours
              .map((h: any) => `${h.days}: ${h.hours}`)
              .join(', ')}. Check our website for holiday hours and special events.`
          }
        ]
      : [])
  ];

  const allFAQs = [...(venue.faqs || []), ...additionalFAQs];

  if (allFAQs.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-12">
          Lane7 {venue.locationSpecifier || venue.city} - Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          {allFAQs.map((faq: any, index: number) => (
            <article key={index}>
              <h3 className="text-xl font-bold mb-3 text-black">{faq.question}</h3>
              <div className="text-gray-700">
                {typeof faq.answer === 'string' ? (
                  <p>{faq.answer}</p>
                ) : (
                  <div className="prose prose-gray max-w-none">
                    <RichText data={faq.answer} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default async function Page({ params }: Props) {
  const { slug, country } = await params;

  const venue = await getVenueBySlug({ slug, country });
  const countryData = getCountryData(country);

  if (!venue) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Section background="default" spacing="xl">
        {venue.hero?.backgroundImage && typeof venue.hero.backgroundImage === 'object' && (
          <div className="absolute inset-0 z-0">
            <Image
              src={venue.hero.backgroundImage.url!}
              alt={`Lane7 ${countryData?.name || venue.city} interior showing bowling, pool and karaoke facilities`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6">
            {venue.hero?.title || `Lane7 ${venue.locationSpecifier || venue.city}`}
          </h1>

          {venue.hero?.subtitle ? <p className="text-xl md:text-2xl mb-8 opacity-90">{venue.hero.subtitle}</p> : null}

          {venue.hero?.description ? (
            <div className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 prose prose-invert prose-lg">
              <RichText data={venue.hero.description} />
            </div>
          ) : null}
        </div>
      </Section>

      {/* AI SEO Content Section */}
      <AIOptimizedContent venue={venue} country={country} />

      {/* Games Section */}
      {venue.availableGames && venue.availableGames.length > 0 && (
        <Section>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-6">HOW TO PLAY</h2>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">No need to book, just show up!</p>
              <p className="text-lg md:text-xl mt-4">
                Buy a £10 game card and play <span className="text-yellow-400 font-bold">anything</span> for an hour.
              </p>
              <p className="text-lg opacity-80 mt-2">OR just tap your contactless card on any game and get stuck in.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venue.availableGames.slice(0, 6).map((game: any, index: number) => (
                <div
                  key={game.id}
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg"
                >
                  {game.images && game.images[0] && typeof game.images[0].image === 'object' && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={game.images[0].image.url!}
                        alt={`${game.name} at Lane7 ${countryData?.name || venue.city}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">{game.name}</h3>
                    {game.description && (
                      <div className="mt-2 opacity-90 prose prose-sm prose-invert">
                        <RichText data={game.description} />
                      </div>
                    )}
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {game.category || 'GAME'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Food & Drinks Section */}
      <Section background="default" spacing="xl" className="bg-gradient-to-r from-red-900/50 to-orange-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-6">FOOD AND DRINKS</h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              We're serving up pizzas, burgers and hot-dogs, alongside some sharing options to keep everyone happy.
              Thirsty from all that bowling? Check out our delicious range of drinks, signature cocktails, draughts and
              craft options.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {venue.foodMenu && (
              <Link
                href={`/${country}/${slug}/menu/food`}
                className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded border-2 border-white/30 hover:border-white/50 transition-all font-bold uppercase tracking-wider"
              >
                FOOD MENU
              </Link>
            )}
            {venue.drinksMenu && (
              <Link
                href={`/${country}/${slug}/menu/drinks`}
                className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded border-2 border-white/30 hover:border-white/50 transition-all font-bold uppercase tracking-wider"
              >
                DRINKS MENU
              </Link>
            )}
            <Link
              href={`/${country}/${slug}/book`}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded border-2 border-yellow-400 hover:border-yellow-300 transition-all font-bold uppercase tracking-wider"
            >
              BOOK NOW
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Big Groups */}
            {venue.services?.hasGroupBookings && (
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-orange-600 p-8 min-h-[300px] flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-4">BIG GROUPS</h3>
                  <p className="text-lg font-bold mb-4 italic">NO PARTY IS TOO BIG</p>
                  <p className="text-base leading-relaxed mb-6">
                    Large group bookings, work socials and big corporate events; you bring the people and we'll bring
                    the party.
                  </p>
                  <Link
                    href={`/${country}/${slug}/groups`}
                    className="inline-block bg-white/20 hover:bg-white/30 px-6 py-2 rounded border border-white/30 hover:border-white/50 transition-all font-bold uppercase tracking-wide text-sm"
                  >
                    FIND OUT MORE
                  </Link>
                </div>
              </div>
            )}

            {/* Gift Vouchers */}
            {venue.services?.hasGiftVouchers && (
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 p-8 min-h-[300px] flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-4">GIFT VOUCHERS</h3>
                  <p className="text-lg font-bold mb-4 italic">MAKE 'EM SMILE</p>
                  <p className="text-base leading-relaxed mb-6">
                    Surprise someone with a Lane7 gift voucher, so they can make memories by enjoying all their best
                    nights out in one.
                  </p>
                  <Link
                    href={`/${country}/${slug}/vouchers`}
                    className="inline-block bg-white/20 hover:bg-white/30 px-6 py-2 rounded border border-white/30 hover:border-white/50 transition-all font-bold uppercase tracking-wide text-sm"
                  >
                    VIEW VOUCHERS
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Location & Contact Section */}
      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-8">HOW TO FIND US</h2>

              {venue.openingHours && venue.openingHours.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Opening Times</h3>
                  {venue.openingHours.map((hours: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/20">
                      <span className="font-medium">{hours.days}</span>
                      <span>{hours.hours}</span>
                    </div>
                  ))}
                </div>
              )}

              {venue.location && (
                <div className="space-y-4">
                  {venue.location.address && (
                    <div className="flex items-start gap-3">
                      <div className="text-green-400 mt-1">📍</div>
                      <div>
                        <p className="font-bold uppercase tracking-wide">{venue.location.address}</p>
                      </div>
                    </div>
                  )}

                  {venue.location.phone && (
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">📞</div>
                      <div>
                        <a
                          href={`tel:${venue.location.phone}`}
                          className="font-bold hover:text-yellow-400 transition-colors"
                        >
                          {venue.location.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {venue.location.email && (
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">✉️</div>
                      <div>
                        <a
                          href={`mailto:${venue.location.email}`}
                          className="font-bold hover:text-yellow-400 transition-colors"
                        >
                          {venue.location.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4">Ready to Play?</h3>
                <p className="mb-6 opacity-90">Book your lane or just walk in and start playing!</p>
                <Link
                  href={`/${country}/${slug}/book`}
                  className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded font-bold uppercase tracking-wider transition-all text-lg"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Enhanced FAQ Section */}
      <EnhancedFAQSection venue={venue} />
    </div>
  );
}

// Enhanced Metadata with AI SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country } = await params;
  const url = getClientSideURL();
  const venue = await getVenueBySlug({ slug, country });
  const countryData = getCountryData(country);

  if (!venue) {
    notFound();
  }

  const venueUrl = `${url}/${country}/${slug}`;
  const metaImage = venue.hero?.backgroundImage;
  const imageUrl =
    metaImage && typeof metaImage === 'object' && metaImage.url ? `${url}${metaImage.url}` : `${url}/og-default.jpg`;

  const getPlainTextFromRichText = (richText: any): string => {
    if (!richText?.root?.children) return '';
    const extractText = (children: any[]): string => {
      return children
        .map(child => {
          if (child.type === 'text') return child.text || '';
          if (child.children) return extractText(child.children);
          return '';
        })
        .join('');
    };
    return extractText(richText.root.children).trim();
  };

  // AI SEO optimized description
  const heroDescription = venue.hero?.description ? getPlainTextFromRichText(venue.hero.description) : '';
  const aiOptimizedDescription =
    heroDescription ||
    `Lane7 ${
      venue.locationSpecifier || venue.city
    } offers premium bowling from £15, pool from £8, and karaoke from £12. Located in ${
      venue.city
    } with full bar service, perfect for corporate events and group celebrations.`;

  const languages: Record<string, string> = {};
  Object.values(locales).forEach(code => {
    languages[code.code] = `${url}/${code.code}/${slug}`;
  });
  languages['x-default'] = `${url}/en/${slug}`;

  // Enhanced structured data for AI SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    '@id': venueUrl,
    name: `Lane7 ${venue.locationSpecifier || venue.city}`,
    description: aiOptimizedDescription,
    url: venueUrl,
    image: imageUrl,
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
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.location?.address,
      addressLocality: venue.city,
      addressCountry: venue.country === 'uk' ? 'GB' : venue.country === 'de' ? 'DE' : 'IE'
    },
    telephone: venue.location?.phone,
    email: venue.location?.email,
    openingHoursSpecification: venue.openingHours?.map((hours: any) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.days,
      opens: hours.hours?.split(' - ')[0],
      closes: hours.hours?.split(' - ')[1]
    })),
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Bowling Lanes', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pool Tables', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Karaoke Rooms', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Full Bar Service', value: true },
      ...(venue.services?.hasGroupBookings
        ? [{ '@type': 'LocationFeatureSpecification', name: 'Corporate Events', value: true }]
        : []),
      ...(venue.services?.hasGiftVouchers
        ? [{ '@type': 'LocationFeatureSpecification', name: 'Gift Vouchers', value: true }]
        : [])
    ],
    inLanguage: country,
    publisher: {
      '@type': 'Organization',
      name: 'Lane7',
      url: url
    },
    datePublished: venue.createdAt,
    dateModified: venue.updatedAt
  };

  // FAQ Schema if FAQs exist
  const additionalFAQs = [
    {
      question: `What games are available at Lane7 ${venue.locationSpecifier || venue.city}?`,
      answer: `Lane7 ${
        venue.locationSpecifier || venue.city
      } offers bowling from £15, pool from £8, and karaoke from £12. All games include access to premium equipment and facilities.`
    },
    {
      question: `Where is Lane7 ${venue.locationSpecifier || venue.city} located?`,
      answer: `Lane7 ${venue.locationSpecifier || venue.city} is located at ${
        venue.location?.address || venue.city
      }. We're easily accessible and offer the complete Lane7 experience.`
    }
  ];

  const allFAQs = [...(venue.faqs || []), ...additionalFAQs];
  const faqSchema =
    allFAQs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: allFAQs.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: typeof faq.answer === 'string' ? faq.answer : getPlainTextFromRichText(faq.answer)
            }
          }))
        }
      : null;

  return {
    title: `Lane7 ${venue.locationSpecifier || venue.city} - Bowling, Pool & Karaoke | ${venue.city}`,
    description: aiOptimizedDescription,
    keywords: `Lane7 ${venue.city}, bowling ${venue.city}, pool ${venue.city}, karaoke ${venue.city}, entertainment venue ${venue.city}, corporate events ${venue.city}`,

    alternates: {
      canonical: venueUrl,
      languages
    },

    openGraph: {
      type: 'website',
      title: `Lane7 ${venue.locationSpecifier || venue.city} - Premium Entertainment`,
      description: aiOptimizedDescription,
      url: venueUrl,
      siteName: 'Lane7',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Lane7 ${venue.locationSpecifier || venue.city} interior showing bowling, pool and karaoke facilities`
        }
      ],
      locale: country
    },

    twitter: {
      card: 'summary_large_image',
      title: `Lane7 ${venue.locationSpecifier || venue.city}`,
      description: aiOptimizedDescription,
      images: [imageUrl],
      creator: '@lane7',
      site: '@lane7'
    },

    robots: {
      index: venue.status === 'published',
      follow: venue.status === 'published'
    },

    other: {
      // Enhanced structured data using Next.js metadata API
      'script:ld+json:venue': JSON.stringify(structuredData),
      // FAQ schema if it exists
      ...(faqSchema && { 'script:ld+json:faq': JSON.stringify(faqSchema) })
    }
  };
}
