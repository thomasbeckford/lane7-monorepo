// components/Navbar.tsx - Server Component simple y lindo
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@lane7/ui/components/button';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  currentLocale: string;
}

export async function Navbar({ currentLocale }: NavbarProps) {
  const buildLocalizedHref = (path: string) => `/${currentLocale}${path}`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={buildLocalizedHref('/')} className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-black text-lg">L7</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-black text-xl tracking-tight">
                  LANE
                  <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">7</span>
                </div>
                <div className="text-xs text-gray-400 font-medium -mt-1">BOWL • DRINK • EAT • PLAY</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href={buildLocalizedHref('/venues')}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Venues
              </Link>
              <Link
                href={buildLocalizedHref('/games')}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Games
              </Link>
              <Link
                href={buildLocalizedHref('/events')}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                What's On
              </Link>
              <Link
                href={buildLocalizedHref('/corporate')}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Corporate
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher
                  currentLocale={currentLocale}
                  variant="compact"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-2">
                <Link href={buildLocalizedHref('/venues')}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex border-purple-400/50 text-purple-400 hover:bg-purple-400/10 rounded-full"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Venue
                  </Button>
                </Link>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6 rounded-full shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Book Now</span>
                  <span className="sm:hidden">Book</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Simple */}
          <div className="md:hidden border-t border-purple-500/20 py-4">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Link
                href={buildLocalizedHref('/venues')}
                className="text-white hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Venues
              </Link>
              <Link
                href={buildLocalizedHref('/games')}
                className="text-white hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Games
              </Link>
              <Link
                href={buildLocalizedHref('/events')}
                className="text-white hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Events
              </Link>
              <Link
                href={buildLocalizedHref('/corporate')}
                className="text-white hover:text-purple-400 transition-colors text-sm font-medium"
              >
                Corporate
              </Link>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex justify-center">
              <LanguageSwitcher currentLocale={currentLocale} variant="compact" />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
