import { Badge } from '@lane7/ui/components/badge';
import { Button } from '@lane7/ui/components/button';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@lane7/ui/components/section';

import { ArrowRight, Globe, MapPin, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function HomePageGlobal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <Section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-teal-800 to-green-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 text-lg font-semibold border-0 hover:scale-105 transition-transform">
              🌍 DISCOVER. EXPLORE. EXPERIENCE.
            </Badge>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-tight">
                YOUR NEXT{' '}
                <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  GREAT
                </span>{' '}
                <br />
                NIGHT OUT
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 leading-relaxed">
                Find the <span className="text-blue-400">perfect venue</span> for{' '}
                <span className="text-teal-400">any occasion,</span> <span className="text-emerald-400">anywhere.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From intimate cocktail bars to epic entertainment venues, discover thousands of handpicked locations
              worldwide.
              <br />
              <strong className="text-white">Where will your story begin?</strong>
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search venues, cities, or experiences..."
                    className="w-full bg-transparent text-white placeholder-gray-300 text-lg border-none outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <select className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2">
                    <option value="">Any Location</option>
                    <option value="london">London</option>
                    <option value="paris">Paris</option>
                    <option value="tokyo">Tokyo</option>
                    <option value="nyc">New York</option>
                  </select>
                  <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white font-bold px-8 py-2 rounded-lg">
                    <Search className="w-5 h-5 mr-2" />
                    Explore
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {[
                '🍸 Cocktail Bars',
                '🎳 Entertainment',
                '🍕 Restaurants',
                '☕ Cafés',
                '🎭 Event Spaces',
                '🌃 Rooftops'
              ].map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-4 py-2 cursor-pointer transition-all hover:scale-105"
                >
                  {category}
                </Badge>
              ))}
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

      {/* Featured Destinations */}
      <Section className="bg-white dark:bg-gray-900" spacing="xl">
        <div className="container mx-auto px-6">
          <SectionHeader className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              🗺️ POPULAR DESTINATIONS
            </Badge>
            <SectionTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Explore venues in
              <br />
              <span className="text-blue-600 dark:text-blue-400">cities you love</span>
            </SectionTitle>
            <SectionDescription className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From bustling metropolitan areas to charming local spots
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                city: 'London',
                country: '🇬🇧 United Kingdom',
                venueCount: '2,847',
                image: 'bg-gradient-to-br from-red-500 to-blue-600',
                highlight: 'Historic pubs & modern bars'
              },
              {
                city: 'Paris',
                country: '🇫🇷 France',
                venueCount: '1,943',
                image: 'bg-gradient-to-br from-pink-500 to-purple-600',
                highlight: 'Chic bistros & wine bars'
              },
              {
                city: 'Tokyo',
                country: '🇯🇵 Japan',
                venueCount: '3,421',
                image: 'bg-gradient-to-br from-red-500 to-pink-500',
                highlight: 'Unique experiences & karaoke'
              },
              {
                city: 'New York',
                country: '🇺🇸 United States',
                venueCount: '4,156',
                image: 'bg-gradient-to-br from-yellow-500 to-red-500',
                highlight: 'Rooftops & speakeasies'
              },
              {
                city: 'Berlin',
                country: '🇩🇪 Germany',
                venueCount: '1,687',
                image: 'bg-gradient-to-br from-gray-700 to-red-600',
                highlight: 'Underground clubs & beer gardens'
              },
              {
                city: 'Sydney',
                country: '🇦🇺 Australia',
                venueCount: '1,234',
                image: 'bg-gradient-to-br from-blue-500 to-green-500',
                highlight: 'Beachside bars & cafés'
              },
              {
                city: 'Barcelona',
                country: '🇪🇸 Spain',
                venueCount: '1,567',
                image: 'bg-gradient-to-br from-orange-500 to-red-500',
                highlight: 'Tapas bars & beach clubs'
              },
              {
                city: 'Amsterdam',
                country: '🇳🇱 Netherlands',
                venueCount: '987',
                image: 'bg-gradient-to-br from-orange-500 to-blue-500',
                highlight: 'Cozy brown cafés & breweries'
              }
            ].map((destination, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`${destination.image} aspect-square p-6 flex flex-col justify-end text-white relative`}>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-1">{destination.city}</h3>
                    <p className="text-sm opacity-90 mb-2">{destination.country}</p>
                    <p className="text-xs opacity-80 mb-3">{destination.highlight}</p>
                    <Badge className="bg-white/20 text-white border-0 text-xs">{destination.venueCount} venues</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Venue Types */}
      <Section className="bg-gray-50 dark:bg-gray-800" spacing="xl">
        <div className="container mx-auto px-6">
          <SectionHeader className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">🎯 VENUE TYPES</Badge>
            <SectionTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Whatever you&apos;re
              <br />
              <span className="text-teal-600 dark:text-teal-400">looking for</span>
            </SectionTitle>
            <SectionDescription className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From intimate dinners to epic celebrations
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🍸',
                title: 'Cocktail Bars',
                description: 'Craft cocktails, speakeasies, and rooftop bars with stunning views',
                count: '12,400+'
              },
              {
                icon: '🍽️',
                title: 'Restaurants',
                description: 'From Michelin stars to hidden gems, find your perfect dining spot',
                count: '45,600+'
              },
              {
                icon: '🎳',
                title: 'Entertainment',
                description: 'Bowling, karaoke, arcade games, and unique activity venues',
                count: '3,200+'
              },
              {
                icon: '🏢',
                title: 'Event Spaces',
                description: 'Corporate venues, wedding locations, and private party spaces',
                count: '8,900+'
              },
              {
                icon: '☕',
                title: 'Cafés & Lounges',
                description: 'Perfect for meetings, work, or casual hangouts with friends',
                count: '18,700+'
              },
              {
                icon: '🌃',
                title: 'Nightlife',
                description: 'Clubs, late-night bars, and venues that party until sunrise',
                count: '7,800+'
              }
            ].map((type, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-600 cursor-pointer"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{type.description}</p>
                <Badge variant="outline" className="text-xs">
                  {type.count} venues
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-gradient-to-r from-blue-900 via-teal-800 to-emerald-900" spacing="xl">
        <div className="container mx-auto px-6">
          <SectionHeader className="text-center mb-16">
            <SectionTitle className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</SectionTitle>
            <SectionDescription className="text-xl text-gray-200 max-w-3xl mx-auto">
              Finding your perfect venue is easier than ever
            </SectionDescription>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search & Discover',
                description:
                  'Browse thousands of venues by location, type, or occasion. Use filters to find exactly what you need.'
              },
              {
                step: '02',
                title: 'Compare & Choose',
                description:
                  'Read reviews, see photos, check availability, and compare prices to make the perfect choice.'
              },
              {
                step: '03',
                title: 'Book & Enjoy',
                description: 'Reserve instantly or contact venues directly. Show up and enjoy your perfect night out!'
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-200 leading-relaxed max-w-sm mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 text-white" spacing="xl">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Sparkles className="w-16 h-16 mx-auto text-yellow-300" />

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              YOUR PERFECT VENUE
              <br />
              <span className="text-yellow-300">IS WAITING</span>
            </h2>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Join millions of people discovering amazing venues worldwide.
              <br />
              Start exploring today and make every night unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <Globe className="w-6 h-6 mr-3 group-hover:animate-spin" />
                START EXPLORING
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Link href="/list-venue">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-12 py-6 text-xl rounded-full transition-all duration-300 hover:scale-105"
                >
                  <MapPin className="w-6 h-6 mr-3" />
                  LIST YOUR VENUE
                </Button>
              </Link>
            </div>

            <div className="pt-8 text-white/70">
              <p>🌍 50+ Countries • 📍 500+ Cities • ⭐ 2M+ Reviews • 🎉 Trusted by Millions</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
