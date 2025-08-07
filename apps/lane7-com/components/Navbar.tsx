// components/Navbar.tsx - Server Component refactorizado
import { Button } from '@lane7/ui/components/button';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

// Datos de navegación centralizados
const NAV_ITEMS = [
  { href: '/venues', label: 'Venues' },
  { href: '/games', label: 'Games' },
  { href: '/events', label: "What's On" },
  { href: '/corporate', label: 'Corporate' }
] as const;

// Componente para enlaces de navegación reutilizable
const NavLink = ({
  href,
  children,
  className = ''
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link href={href} className={`text-white hover:text-purple-400 transition-colors font-medium ${className}`}>
    {children}
  </Link>
);

export async function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-black text-lg">L7</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
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
              {NAV_ITEMS.map(({ href, label }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Link href="/venues">
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

          {/* Mobile Menu */}
          <div className="md:hidden border-t border-purple-500/20 py-4">
            <div className="flex flex-wrap justify-center gap-4">
              {NAV_ITEMS.map(({ href, label }) => (
                <NavLink key={href} href={href} className="text-sm">
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer para compensar el navbar fixed */}
      <div className="h-16" />
    </>
  );
}
