import { locales } from '@/config/locales';
import { getVenueBySlug } from '@/server/getVenueBySlug';
import { getClientSideURL } from '@/utilities/getURL';
import { Section } from '@lane7/ui/components/section';
import { Config } from '@payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
    locale: Config['locale'];
  }>;
};

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;

  const venue = await getVenueBySlug({ slug, locale });
  console.log(`🔍 Venue loaded at: ${new Date().toISOString()}`);
  console.log(`📄 Venue data:`, venue?.name);

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
              alt={venue.hero?.title || venue.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6">
            {venue.hero?.title || `${venue.name} ${venue.locationSpecifier ? venue.locationSpecifier : ''}`}
          </h1>

          {venue.hero?.subtitle ? <p className="text-xl md:text-2xl mb-8 opacity-90">{venue.hero.subtitle}</p> : null}

          {venue.hero?.description ? (
            <div className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 prose prose-invert prose-lg">
              <RichText data={venue.hero.description} />
            </div>
          ) : null}
        </div>
      </Section>

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
                        alt={game.images[0].alt || game.name}
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
                href={`/${locale}/${slug}/menu/food`}
                className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded border-2 border-white/30 hover:border-white/50 transition-all font-bold uppercase tracking-wider"
              >
                FOOD MENU
              </Link>
            )}
            {venue.drinksMenu && (
              <Link
                href={`/${locale}/${slug}/menu/drinks`}
                className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded border-2 border-white/30 hover:border-white/50 transition-all font-bold uppercase tracking-wider"
              >
                DRINKS MENU
              </Link>
            )}
            <Link
              href={`/${locale}/${slug}/book`}
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
                    href={`/${locale}/${slug}/groups`}
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
                    href={`/${locale}/${slug}/vouchers`}
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
                  href={`/${locale}/${slug}/book`}
                  className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded font-bold uppercase tracking-wider transition-all text-lg"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQs Section */}
      {venue.faqs && venue.faqs.length > 0 && (
        <section className="py-20 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-12 text-center">FAQS</h2>

            <div className="space-y-6">
              {venue.faqs.map((faq: any, index: number) => (
                <details key={index} className="group border-b border-white/20 pb-6">
                  <summary className="flex items-center justify-between cursor-pointer py-4 text-xl font-bold hover:text-yellow-400 transition-colors">
                    <span>{faq.question}</span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="pt-4 prose prose-invert max-w-none">
                    <RichText data={faq.answer} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Metadata function remains the same as before
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const url = getClientSideURL();

  const venue = await getVenueBySlug({ slug, locale });

  if (!venue) {
    notFound();
  }

  const venueUrl = `${url}/${locale}/${slug}`;
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

  const description = venue.hero?.description
    ? getPlainTextFromRichText(venue.hero.description)
    : `${venue.name} - Experience bowling, games, and great food in ${venue.city}`;

  const languages: Record<string, string> = {};
  Object.values(locales).forEach(code => {
    languages[code.code] = `${url}/${code.code}/${slug}`;
  });
  languages['x-default'] = `${url}/en/${slug}`;

  return {
    title:
      venue.hero?.title || `${venue.name} ${venue.locationSpecifier ? `- ${venue.locationSpecifier}` : ''} - Lane7`,
    description,

    alternates: {
      canonical: venueUrl,
      languages
    },

    openGraph: {
      type: 'website',
      title: venue.hero?.title || venue.name,
      description,
      url: venueUrl,
      siteName: 'Lane7',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: venue.hero?.title || venue.name
        }
      ],
      locale
    },

    twitter: {
      card: 'summary_large_image',
      title: venue.hero?.title || venue.name,
      description,
      images: [imageUrl],
      creator: '@lane7',
      site: '@lane7'
    },

    robots: {
      index: venue.status === 'published',
      follow: venue.status === 'published'
    },

    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': venueUrl,
        name: venue.name,
        description,
        url: venueUrl,
        image: imageUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: venue.location?.address,
          addressLocality: venue.city,
          addressCountry: venue.country
        },
        telephone: venue.location?.phone,
        email: venue.location?.email,
        openingHoursSpecification: venue.openingHours?.map((hours: any) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: hours.days,
          opens: hours.hours?.split(' - ')[0],
          closes: hours.hours?.split(' - ')[1]
        })),
        inLanguage: locale,
        publisher: {
          '@type': 'Organization',
          name: 'Lane7',
          url: url
        },
        datePublished: venue.createdAt,
        dateModified: venue.updatedAt
      })
    }
  };
}
