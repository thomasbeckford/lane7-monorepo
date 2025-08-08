import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Venue } from '@lane7/shared/payload-types';
import { getVenues } from '@lane7/shared/server/getVenues';
import { Search } from 'lucide-react';
import Link from 'next/link';

// Country filter buttons data
const COUNTRY_FILTERS = [
  { code: 'all', label: 'ALL', active: true },
  { code: 'de', label: 'GERMANY' },
  { code: 'ie', label: 'IRELAND' },
  { code: 'uk', label: 'UK' }
];

// Venue card component with angled borders matching Lane7 design
const VenueCard = ({ venue }: { venue: Venue }) => {
  // Extract city and location from venue data
  const getLocationName = () => {
    if (venue.locationSpecifier) {
      return `${venue.locationSpecifier}`;
    }
    return venue.city || 'Location';
  };

  return (
    <Link href={`/venues/${venue.slug}`} className="group relative block">
      {/* Venue Image with Angled Clip Path */}
      <div
        className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-[1.02] transition-transform duration-300"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
        }}
      >
        {/* Background Image */}
        {venue.hero?.backgroundImage &&
        typeof venue.hero.backgroundImage === 'object' &&
        venue.hero.backgroundImage.url ? (
          <img src={venue.hero.backgroundImage.url} alt={venue.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

        {/* Venue name overlay - Bottom Left */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-wide leading-tight drop-shadow-lg">
            {getLocationName()}
          </h3>
        </div>

        {/* Subtle border effect on hover */}
        <div
          className="absolute inset-0 border-2 border-transparent group-hover:border-lime-400/30 transition-colors duration-300"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
          }}
        ></div>
      </div>
    </Link>
  );
};

// Main venues page component
export default async function CountryVenuesPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const { venues } = await getVenues({ countryCode: country });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Background */}
      <div className="relative min-h-screen">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-pink-900">
            {/* You can add video background here like the original */}
            <div className="absolute inset-0 bg-[url('/images/venues-bg.jpg')] bg-cover bg-center opacity-60"></div>
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6">
          <div className="max-w-7xl mx-auto w-full">
            {/* Lane7 Logo/Brand */}
            <div className="mb-8">
              <div className="text-lime-400 font-black text-6xl md:text-8xl uppercase tracking-wider">LANE7</div>
              <div className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base font-medium">
                FIND YOUR NEAREST LANE7 VENUE
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white mb-8 leading-tight">
              WE GET AROUND
            </h1>

            {/* Description */}
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mb-12 leading-relaxed">
              Imagine the best bar you've ever been to and then add bowling, gaming and an unrivalled atmosphere into
              the mix. Welcome to Lane7.
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Input
                  placeholder="SEARCH BY CITY"
                  className="bg-white text-black placeholder:text-gray-600 border-none h-12 pr-12 font-bold uppercase tracking-wide"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
              </div>
            </div>

            {/* Country Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-16">
              {COUNTRY_FILTERS.map(filter => (
                <Button
                  key={filter.code}
                  variant={filter.active ? 'default' : 'outline'}
                  className={`
                    ${
                      filter.active
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'border-2 border-white text-white hover:bg-white hover:text-black'
                    }
                    font-bold uppercase tracking-wide px-6 py-2 h-auto
                  `}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Venues Grid Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {venues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue: Venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">No venues found</h2>
              <p className="text-white/60 text-lg">
                We're working on bringing amazing venues to this area. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
