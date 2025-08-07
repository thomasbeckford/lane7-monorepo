import { Badge } from '@lane7/ui/components/badge';
import { Button } from '@lane7/ui/components/button';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@lane7/ui/components/section';

import { ArrowRight, Calendar, Gift, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

export default async function HomePageDe({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <Section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 text-lg font-semibold border-0 hover:scale-105 transition-transform">
              🎳 ALL YOUR BEST NIGHTS IN ONE
            </Badge>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-tight">
                BOWL.{' '}
                <span className="bg-gradient-to-r from-pink-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                  DRINK.
                </span>{' '}
                <br />
                EAT. PLAY.
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 leading-relaxed">
                Lose yourself. <span className="text-yellow-400">all.</span>{' '}
                <span className="text-pink-400">night.</span> <span className="text-purple-400">long.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The greatest bar, with all your favourite games. Bowling, gaming, cocktails and vibes.
              <br />
              <strong className="text-white">Lane7 brings it. Will you?</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 group"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                BOOK NOW
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/venues">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 group"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  FIND VENUE
                </Button>
              </Link>
            </div>

            {/* Package Highlight */}
            <div className="bg-black/50 backdrop-blur-sm border border-yellow-400/50 rounded-2xl p-6 max-w-2xl mx-auto mt-12">
              <div className="text-yellow-400 font-bold text-sm mb-2">🔥 LIMITED TIME OFFER</div>
              <div className="text-2xl md:text-3xl font-black text-white mb-2">GO ALL IN - FROM £18PP</div>
              <div className="text-gray-300">Unlimited playtime with all activities. Sunday - Friday only.</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </Section>

      {/* Games & Activities Section */}
      <Section className="bg-gray-50 dark:bg-gray-900" spacing="xl">
        <div className="container mx-auto px-6">
          <SectionHeader className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              🎮 GAMES & ACTIVITIES
            </Badge>
            <SectionTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              The best bar,
              <br />
              <span className="text-purple-600 dark:text-purple-400">with your favourite games.</span>
            </SectionTitle>
            <SectionDescription className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From bowling lanes to karaoke rooms, we&apos;ve got everything for the perfect night out
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎳',
                title: 'Bowling',
                description: 'Premium lanes with the coolest smoke effects and neon vibes'
              },
              {
                icon: '🎤',
                title: 'Karaoke',
                description: "Private soundproof rooms for when you're not a professional 😅"
              },
              {
                icon: '🏌️',
                title: 'Crazy Golf',
                description: 'Mini golf with a Lane7 twist - prepare for the unexpected'
              },
              {
                icon: '🎯',
                title: 'Interactive Darts',
                description: "High-tech darts that'll make you feel like a pro"
              },
              {
                icon: '🏓',
                title: 'Beer Pong',
                description: 'Classic drinking game with a competitive edge'
              },
              {
                icon: '🎮',
                title: 'Arcade Games',
                description: 'Retro and modern games to unleash your inner child'
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{activity.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900" spacing="xl">
        <div className="container mx-auto px-6">
          <SectionHeader className="text-center mb-16">
            <SectionTitle className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Guests Said</SectionTitle>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mentes Tural',
                location: 'London',
                content:
                  'Writing this as I leave the venue where Lane 7 hosted our amazing work social! The facilities were great, clean and enjoyable. Could not be happier!',
                rating: 5
              },
              {
                name: 'Cleo Oloha',
                location: 'Manchester',
                content:
                  "Love love love this place. The whole aesthetic is such a vibe, with the graffiti and neon lights so vibrant. It's a fun day out for a few hours!",
                rating: 5
              },
              {
                name: 'R Eren',
                location: 'Newcastle',
                content:
                  'Lane7 is a bowling haven that goes beyond the pins. This entertainment hotspot delivers top-notch bowling lanes and creates an atmosphere buzzing with excitement.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/70 text-sm">Review of {testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Packages Section */}
      <Section className="bg-black" spacing="xl">
        <div className="container mx-auto px-6">
          <SectionHeader className="text-center mb-16">
            <SectionTitle className="text-4xl md:text-5xl font-bold text-white mb-6">BOWL, DRINK, GAME</SectionTitle>
            <SectionDescription className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your ticket to a proper Lane7 night out. Available for groups of 4+.
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">GO ALL IN Package</h3>
              <div className="text-4xl font-black mb-4">FROM £18PP</div>
              <p className="mb-6">
                Unlimited playtime with all our activities. Perfect for groups looking to experience everything.
              </p>
              <ul className="space-y-2 mb-8">
                <li>✓ Unlimited bowling</li>
                <li>✓ All arcade games</li>
                <li>✓ Karaoke access</li>
                <li>✓ Table tennis</li>
              </ul>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold">
                Book All In Package
              </Button>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-red-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Corporate Bookings</h3>
              <div className="text-2xl font-bold mb-4">THERE'S NO SUCH THING AS A PARTY TOO BIG</div>
              <p className="mb-6">
                Perfect for team building, celebrations, and corporate events. We handle groups of any size.
              </p>
              <ul className="space-y-2 mb-8">
                <li>✓ Private lanes available</li>
                <li>✓ Food & drink packages</li>
                <li>✓ Dedicated event coordinator</li>
                <li>✓ Custom packages available</li>
              </ul>
              <Button className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold">Plan Corporate Event</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 text-white" spacing="xl">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              LANE7 BRINGS IT.
              <br />
              <span className="text-yellow-300">WILL YOU?</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Find your nearest Lane7 and experience all your best nights in one place.
              <br />
              Bowl hard. Eat big. Drink up. Game on.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <Calendar className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                BOOK YOUR NIGHT
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-12 py-6 text-xl rounded-full transition-all duration-300 hover:scale-105 group"
              >
                <Gift className="w-6 h-6 mr-3" />
                GIFT VOUCHERS
              </Button>
            </div>

            <div className="pt-8 text-white/70">
              <p>🎳 13 Venues Across UK • 🎉 Perfect for Groups • 🎁 Gift Vouchers Available</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
