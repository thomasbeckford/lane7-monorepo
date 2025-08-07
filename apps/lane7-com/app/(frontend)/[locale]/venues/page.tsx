import { Config, Venue } from '@/payload-types';
import { getVenuesGroupedByCountry } from '@/server/getVenues';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@lane7/ui/components/section';
import Image from 'next/image';
import Link from 'next/link';

interface VenueGroup {
  country: string;
  venues: Venue[];
}

interface RichTextChild {
  type?: string;
  text?: string;
  children?: RichTextChild[];
}

interface RichText {
  root?: {
    children?: RichTextChild[];
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Config['locale'] }> }) {
  const { locale } = await params;
  const { venuesByCountry, totalVenues } = await getVenuesGroupedByCountry();

  console.log('venuesByCountry', venuesByCountry);

  const getPlainTextFromRichText = (richText: RichText | undefined): string => {
    if (!richText?.root?.children) return '';

    const extractText = (children: RichTextChild[]): string => {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Section background="default" spacing="xl" className="bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <SectionHeader className="text-center">
          <SectionTitle className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white mb-6">
            FIND YOUR VENUE
          </SectionTitle>
          <SectionDescription className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
            Discover our amazing venues across the globe.
          </SectionDescription>
        </SectionHeader>
      </Section>

      {/* Venues by Country */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {(Object.values(venuesByCountry) as VenueGroup[]).map(group => (
            <div key={group.country} className="mb-20">
              {/* Country Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 text-yellow-400">
                  {group.country}
                </h2>
                <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                <p className="text-white/60 mt-4 text-lg">
                  {group.venues.length} venue
                  {group.venues.length !== 1 ? 's' : ''} available
                </p>
              </div>

              {/* Venues Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.venues.map(venue => (
                  <Link key={venue.id} href={`/${locale}/venues/${venue.slug}`} className="group block">
                    <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-white/10 hover:border-yellow-400/30">
                      {/* Venue Image */}
                      <div className="aspect-video relative overflow-hidden">
                        {venue.hero?.backgroundImage &&
                        typeof venue.hero.backgroundImage === 'object' &&
                        'url' in venue.hero.backgroundImage ? (
                          <>
                            <Image
                              src={venue.hero.backgroundImage.url || ''}
                              alt={venue.hero?.title || venue.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <div className="text-6xl">🎯</div>
                          </div>
                        )}

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              venue.status === 'published' ? 'bg-green-400 text-black' : 'bg-yellow-400 text-black'
                            }`}
                          >
                            {venue.status === 'published' ? 'OPEN' : 'COMING SOON'}
                          </div>
                        </div>

                        {/* Venue Name Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white mb-2">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-yellow-400">
                            <span>📍</span>
                            <span className="font-bold">
                              {venue.city}
                              {venue.locationSpecifier ? ` - ${venue.locationSpecifier}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Venue Info */}
                      <div className="p-6">
                        {venue.hero?.description && (
                          <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                            {getPlainTextFromRichText(venue.hero.description as RichText).substring(0, 150)}
                            {getPlainTextFromRichText(venue.hero.description as RichText).length > 150 && '...'}
                          </p>
                        )}

                        {/* Services Icons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {venue.services?.hasGroupBookings && (
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">👥 Groups</span>
                          )}
                          {venue.services?.hasGiftVouchers && (
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">🎁 Vouchers</span>
                          )}
                          {venue.services?.hasPartyPackages && (
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">🎉 Parties</span>
                          )}
                          {venue.availableGames &&
                            Array.isArray(venue.availableGames) &&
                            venue.availableGames.length > 0 && (
                              <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">
                                🎮 {venue.availableGames.length} Games
                              </span>
                            )}
                          {venue.foodMenu && (
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">🍕 Food</span>
                          )}
                          {venue.drinksMenu && (
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">🍺 Drinks</span>
                          )}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-white/70">
                          {venue.location?.address && (
                            <div className="flex items-start gap-2">
                              <span className="text-green-400 text-xs mt-0.5">📍</span>
                              <span className="flex-1 line-clamp-2">{venue.location.address}</span>
                            </div>
                          )}
                          {venue.location?.phone && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 text-xs">📞</span>
                              <span>{venue.location.phone}</span>
                            </div>
                          )}
                          {venue.location?.email && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 text-xs">✉️</span>
                              <span className="truncate">{venue.location.email}</span>
                            </div>
                          )}
                        </div>

                        {/* Opening Hours Preview */}
                        {venue.openingHours && Array.isArray(venue.openingHours) && venue.openingHours.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="text-xs text-white/60 mb-1">Opening Hours:</div>
                            <div className="text-sm text-white/80">
                              {venue.openingHours[0].days}: {venue.openingHours[0].hours}
                              {venue.openingHours.length > 1 && (
                                <span className="text-white/60"> +{venue.openingHours.length - 1} more</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className="mt-6">
                          <div className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 px-4 rounded font-bold uppercase tracking-wider transition-all text-center group-hover:bg-yellow-300">
                            {venue.status === 'published' ? 'VISIT VENUE' : 'LEARN MORE'}
                            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {Object.keys(venuesByCountry).length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold mb-4">No venues found</h2>
              <p className="text-white/60 text-lg">
                We&apos;re working on bringing amazing venues to your area. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <Section spacing="lg" className="bg-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">{totalVenues}</div>
            <div className="text-white/80 uppercase tracking-wide font-medium">VENUES</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">
              {Object.keys(venuesByCountry).length}
            </div>
            <div className="text-white/80 uppercase tracking-wide font-medium">COUNTRIES</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">50+</div>
            <div className="text-white/80 uppercase tracking-wide font-medium">GAMES</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">24/7</div>
            <div className="text-white/80 uppercase tracking-wide font-medium">FUN</div>
          </div>
        </div>
      </Section>
    </div>
  );
}
