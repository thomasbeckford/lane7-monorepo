import { getVenues } from '@/server/getVenues';
import { Venue } from '@lane7/shared/payload-types';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@lane7/ui/components/section';
import Link from 'next/link';

// Types
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

// Utils
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

const truncateText = (text: string, maxLength: number = 150): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const VenueOverlay = ({ venue }: { venue: Venue }) => (
  <div className="absolute bottom-0 left-0 right-0 p-6">
    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white mb-2">{venue.name}</h3>
    <div className="flex items-center gap-2 text-yellow-400">
      <span>📍</span>
      <span className="font-bold">
        {venue.city}
        {venue.locationSpecifier && ` - ${venue.locationSpecifier}`}
      </span>
    </div>
  </div>
);

const ServiceTags = ({ venue }: { venue: Venue }) => {
  const services = [];

  if (venue.services?.hasGroupBookings) services.push({ icon: '👥', label: 'Groups' });
  if (venue.services?.hasGiftVouchers) services.push({ icon: '🎁', label: 'Vouchers' });
  if (venue.services?.hasPartyPackages) services.push({ icon: '🎉', label: 'Parties' });
  if (venue.availableGames && Array.isArray(venue.availableGames) && venue.availableGames.length > 0) {
    services.push({ icon: '🎮', label: `${venue.availableGames.length} Games` });
  }
  if (venue.foodMenu) services.push({ icon: '🍕', label: 'Food' });
  if (venue.drinksMenu) services.push({ icon: '🍺', label: 'Drinks' });

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {services.map((service, index) => (
        <span key={index} className="bg-white/10 px-2 py-1 rounded text-xs font-medium">
          {service.icon} {service.label}
        </span>
      ))}
    </div>
  );
};

const ContactInfo = ({ venue }: { venue: Venue }) => {
  const contacts = [];

  if (venue.location?.address) contacts.push({ icon: '📍', text: venue.location.address, multiline: true });
  if (venue.location?.phone) contacts.push({ icon: '📞', text: venue.location.phone });
  if (venue.location?.email) contacts.push({ icon: '✉️', text: venue.location.email, truncate: true });

  return (
    <div className="space-y-2 text-sm text-white/70">
      {contacts.map((contact, index) => (
        <div key={index} className={`flex items-${contact.multiline ? 'start' : 'center'} gap-2`}>
          <span className="text-green-400 text-xs mt-0.5">{contact.icon}</span>
          <span className={`flex-1 ${contact.multiline ? 'line-clamp-2' : ''} ${contact.truncate ? 'truncate' : ''}`}>
            {contact.text}
          </span>
        </div>
      ))}
    </div>
  );
};

const OpeningHours = ({ venue }: { venue: Venue }) => {
  if (!venue.openingHours || !Array.isArray(venue.openingHours) || venue.openingHours.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="text-xs text-white/60 mb-1">Opening Hours:</div>
      <div className="text-sm text-white/80">
        {venue.openingHours[0].days}: {venue.openingHours[0].hours}
        {venue.openingHours.length > 1 && <span className="text-white/60"> +{venue.openingHours.length - 1} more</span>}
      </div>
    </div>
  );
};

const VenueCard = ({ venue }: { venue: Venue }) => (
  <Link href={`/venues/${venue.slug}`} className="group block">
    <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-white/10 hover:border-yellow-400/30">
      {/* Image Section */}
      <div className="aspect-video relative overflow-hidden">
        {/* Aquí puedes agregar la imagen cuando la necesites */}
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <div className="text-6xl">🎯</div>
        </div>
        <VenueOverlay venue={venue} />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Description */}
        {venue.hero?.description && (
          <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
            {truncateText(getPlainTextFromRichText(venue.hero.description as RichText))}
          </p>
        )}

        <ServiceTags venue={venue} />
        <ContactInfo venue={venue} />
        <OpeningHours venue={venue} />

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
);

const EmptyState = ({ country }: { country: string }) => (
  <div className="text-center py-20">
    <div className="text-6xl mb-6">🎯</div>
    <h2 className="text-3xl font-bold mb-4">No venues found in {country}</h2>
    <p className="text-white/60 text-lg">We're working on bringing amazing venues to this area. Stay tuned!</p>
  </div>
);

const StatsSection = ({ totalVenues }: { totalVenues: number }) => {
  const stats = [
    { value: totalVenues, label: 'VENUES' },
    { value: '1', label: 'COUNTRY' },
    { value: '50+', label: 'GAMES' },
    { value: '24/7', label: 'FUN' }
  ];

  return (
    <Section spacing="lg" className="bg-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">{stat.value}</div>
            <div className="text-white/80 uppercase tracking-wide font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// Main Component
export default async function CountryVenuesPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const venues = await getVenues({ countryCode: country });

  console.log('VENUES', venues);

  // Obtener el nombre del país desde el primer venue (asumiendo que todos son del mismo país)
  const countryName =
    venues.length > 0 && venues[0].country
      ? typeof venues[0].country === 'object' && 'name' in venues[0].country
        ? venues[0].country
        : venues[0].country
      : country.toUpperCase();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Section background="default" spacing="xl" className="bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <SectionHeader className="text-center">
          <SectionTitle className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white mb-6">
            VENUES IN {countryName}
          </SectionTitle>
          <SectionDescription className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
            Discover our amazing venues in {countryName}.
          </SectionDescription>
        </SectionHeader>
      </Section>

      {/* Main Content */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {venues.length > 0 ? (
            <>
              {/* Country Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 text-yellow-400">
                  {countryName}
                </h2>
                <div className="w-24 h-1 bg-yellow-400 mx-auto" />
                <p className="text-white/60 mt-4 text-lg">
                  {venues.length} venue{venues.length !== 1 ? 's' : ''} available
                </p>
              </div>

              {/* Venues Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {venues.map((venue: Venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState country={countryName} />
          )}
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection totalVenues={venues.length} />
    </div>
  );
}
