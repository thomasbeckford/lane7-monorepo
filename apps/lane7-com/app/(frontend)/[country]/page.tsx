import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Calendar, MapPin, Star, Users } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// Metadata para AI SEO
export const metadata: Metadata = {
  title: 'Lane7 - Premium Bowling, Pool & Karaoke Venues | London, Manchester, Berlin, Dublin',
  description:
    "Lane7 is Europe's leading entertainment venue chain offering bowling from £15, pool from £8, and karaoke from £12. Corporate events and group bookings available across 8 venues.",
  keywords:
    'Lane7, bowling venues, pool halls, karaoke bars, entertainment venues, corporate events, team building, London bowling, Manchester pool, Berlin karaoke',
  openGraph: {
    title: 'Lane7 - Premium Bowling, Pool & Karaoke Entertainment',
    description:
      "Book bowling, pool, and karaoke at Lane7's premium venues across Europe. Perfect for corporate events and group celebrations.",
    type: 'website',
    locale: 'en_GB'
  }
};

// Structured Data para AI
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
  name: 'Lane7',
  description:
    "Lane7 is Europe's leading entertainment venue chain offering bowling, pool, and karaoke experiences with premium facilities and full bar service.",
  url: 'https://lane7.com/',
  telephone: '+44-xxx-xxx-xxxx',
  priceRange: '£8-£15',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Lane7 Games & Activities',
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
  location: [
    {
      '@type': 'Place',
      name: 'London Lane7 Venues',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'Place',
      name: 'Manchester Lane7 Venues',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manchester',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'Place',
      name: 'Berlin Lane7 Venues',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Berlin',
        addressCountry: 'DE'
      }
    },
    {
      '@type': 'Place',
      name: 'Dublin Lane7 Venue',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dublin',
        addressCountry: 'IE'
      }
    }
  ]
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Lane7?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Lane7 is Europe's leading entertainment venue chain offering bowling, pool, and karaoke experiences across London, Manchester, Berlin, and Dublin with 8 premium locations."
      }
    },
    {
      '@type': 'Question',
      name: 'What games does Lane7 offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lane7 offers bowling from £15, pool from £8, and karaoke from £12. All venues feature premium equipment, full bar service, and modern facilities.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where are Lane7 venues located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lane7 has 8 venues across Europe: 3 in London, 2 in Manchester, 2 in Berlin, and 1 in Dublin. All locations offer bowling, pool, and karaoke facilities.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Lane7 host corporate events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Lane7 specializes in corporate events, team building, birthday parties, and group bookings. We accommodate parties of all sizes with dedicated event packages.'
      }
    }
  ]
};

export default async function HomePageGlobal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen">
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section - SEO optimized */}
      <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label="Lane7 venue atmosphere"
          >
            <source src="/lane7.mp4" type="video/mp4" />
            <div className="w-full h-full bg-gray-900"></div>
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content with proper heading structure */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">Lane7 - Premium Entertainment Venues</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Europe's leading bowling, pool and karaoke venue chain with 8 locations across London, Manchester, Berlin
            and Dublin
          </p>
        </div>
      </Section>

      {/* What is Lane7 - Critical for AI SEO */}
      <Section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8">What is Lane7?</h2>
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-xl mb-6">
              Lane7 is Europe's leading entertainment venue chain offering premium bowling, pool, and karaoke
              experiences. With 8 venues across London (3), Manchester (2), Berlin (2), and Dublin (1), Lane7 combines
              modern gaming facilities with full bar service and vibrant atmosphere.
            </p>
            <p className="text-lg text-gray-700">
              Perfect for corporate events, team building, birthday parties, and group celebrations. Lane7 specializes
              in accommodating large groups with dedicated event packages and professional service.
            </p>
          </div>
        </div>
      </Section>

      {/* Lane7 Venues & Locations */}
      <Section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-black text-center mb-6">Lane7 Venues & Locations</h2>
          <p className="text-xl text-gray-700 text-center mb-16">8 premium entertainment venues across Europe</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                city: 'London',
                venues: '3',
                image: '/images/london-venue.jpg',
                country: 'uk',
                description: 'London Lane7 venues offer bowling, pool and karaoke'
              },
              {
                city: 'Manchester',
                venues: '2',
                image: '/images/manchester-venue.jpg',
                country: 'uk',
                description: 'Manchester Lane7 locations with premium facilities'
              },
              {
                city: 'Berlin',
                venues: '2',
                image: '/images/berlin-venue.jpg',
                country: 'de',
                description: 'Berlin Lane7 venues combining entertainment and dining'
              },
              {
                city: 'Dublin',
                venues: '1',
                image: '/images/dublin-venue.jpg',
                country: 'ie',
                description: 'Dublin Lane7 venue for bowling, pool and karaoke'
              }
            ].map((location, index) => (
              <article key={index}>
                <Link
                  href={`/${location.country}/venues`}
                  className="group block overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                  aria-label={`Visit Lane7 ${location.city} venues`}
                >
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={location.image}
                        alt={`Lane7 ${location.city} venue interior showing bowling, pool and karaoke facilities`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                      <div className="absolute bottom-6 left-6">
                        <h3 className="text-2xl font-black text-white uppercase tracking-wide">{location.city}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-lime-400" />
                          <span className="text-lime-400 font-bold">{location.venues} venues</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Games & Activities at Lane7 */}
      <Section className="bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6">Games & Activities at Lane7</h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Premium bowling, pool and karaoke with full bar service
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Bowling',
                description: 'Premium bowling lanes with modern scoring systems and lane-side service',
                image: '/images/bowling-game.jpg',
                price: 'from £15',
                features: 'Modern lanes, automatic scoring, group packages available'
              },
              {
                name: 'Pool',
                description: 'Professional pool tables in stylish settings with premium cues',
                image: '/images/pool-game.jpg',
                price: 'from £8',
                features: 'Professional tables, premium equipment, tournament hosting'
              },
              {
                name: 'Karaoke',
                description: 'Private karaoke rooms with state-of-the-art sound systems',
                image: '/images/karaoke-game.jpg',
                price: 'from £12',
                features: 'Private rooms, extensive song library, professional audio'
              }
            ].map((game, index) => (
              <article key={index}>
                <Card className="bg-gray-900 border-gray-800 overflow-hidden group cursor-pointer">
                  <div className="aspect-video bg-gray-800 overflow-hidden">
                    <img
                      src={game.image}
                      alt={`${game.name} at Lane7 - ${game.description}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white uppercase">{game.name}</h3>
                      <Badge className="bg-lime-400 text-black font-bold">{game.price}</Badge>
                    </div>
                    <p className="text-gray-400 mb-2">{game.description}</p>
                    <p className="text-sm text-gray-500">{game.features}</p>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Corporate Events & Group Bookings */}
      <Section className="bg-lime-400 py-20">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto text-center text-black">
            <Users className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">
              Corporate Events & Team Building at Lane7
            </h2>
            <p className="text-xl mb-8 font-medium">
              Lane7 specializes in corporate events, birthday parties, team building activities, and group celebrations.
              All venues accommodate large groups with dedicated event packages, catering options, and professional
              event coordination.
            </p>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Event Services Include:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                <ul className="space-y-2">
                  <li>• Corporate team building events</li>
                  <li>• Birthday party packages</li>
                  <li>• Company celebration bookings</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Private venue hire</li>
                  <li>• Catering and bar packages</li>
                  <li>• Professional event coordination</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* FAQ Section - Critical for AI SEO */}
      <Section className="bg-gray-800 py-20 ">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="games-pricing">
              <AccordionTrigger className="text-xl font-bold text-left">
                What games does Lane7 offer and how much do they cost?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg">
                Lane7 offers bowling from £15 per game, pool from £8 per table, and karaoke from £12 per session. All
                activities include access to premium equipment and facilities with full bar service available.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="locations">
              <AccordionTrigger className="text-xl font-bold text-left">
                Where are Lane7 venues located?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg">
                Lane7 has 8 venues across Europe: 3 locations in London, 2 in Manchester, 2 in Berlin, and 1 in Dublin.
                All venues offer bowling, pool, and karaoke with premium facilities and full bar service.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="corporate-events">
              <AccordionTrigger className="text-xl font-bold text-left">
                Does Lane7 host corporate events and team building activities?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg">
                Yes, Lane7 specializes in corporate events, team building activities, birthday parties, and group
                bookings. We offer dedicated event packages, private venue hire, catering options, and professional
                event coordination for groups of all sizes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-makes-different">
              <AccordionTrigger className="text-xl font-bold text-left">
                What makes Lane7 different from other entertainment venues?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-lg">
                Lane7 combines premium bowling, pool, and karaoke facilities with full bar service, modern equipment,
                and vibrant atmosphere. Our venues feature professional-grade equipment, stylish interiors, and
                comprehensive event services making us Europe's leading entertainment venue chain.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* Reviews - Social Proof for AI */}
      <Section className="bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-12">Lane7 Customer Reviews</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                text: 'Perfect venue for our company Christmas party. Lane7 team were incredibly helpful and the facilities were outstanding. Highly recommend for corporate events.',
                author: 'Zowie',
                location: 'London',
                rating: 5,
                event: 'Corporate Event'
              },
              {
                text: 'Amazing atmosphere at Lane7 Manchester. The bowling lanes are top quality and the karaoke rooms are fantastic. Great for group celebrations.',
                author: 'Cleo',
                location: 'Manchester',
                rating: 5,
                event: 'Group Celebration'
              },
              {
                text: 'Excellent team building venue. Professional service, great facilities, and the staff ensured everything ran smoothly for our department event.',
                author: 'Marcus',
                location: 'London',
                rating: 5,
                event: 'Team Building'
              }
            ].map((review, index) => (
              <Card key={index} className="bg-black border-gray-800">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-lime-400 text-lime-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="border-lime-400 text-lime-400">
                      {review.author}, {review.location}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {review.event}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase">Book Your Lane7 Experience</h3>
          <p className="text-xl text-gray-300 mb-8">
            Reserve bowling, pool, or karaoke at Europe's premium entertainment venues
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold px-12 py-6 text-xl uppercase tracking-wider"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Book Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black font-bold px-8 py-6 text-xl uppercase"
            >
              View All Venues
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
