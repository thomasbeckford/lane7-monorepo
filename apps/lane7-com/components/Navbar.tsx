'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Datos de navegación centralizados
const NAV_ITEMS = [
  { href: '/venues', label: 'Venues' },
  { href: '/games', label: 'Games' },
  { href: '/events', label: "What's On" },
  { href: '/corporate', label: 'Corporate' }
] as const;

// Componente para enlaces de navegación
const NavLink = ({
  href,
  children,
  className = '',
  onClick
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-white hover:text-lime-400 transition-colors font-bold uppercase tracking-wide text-sm ${className}`}
  >
    {children}
  </Link>
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
              <div className="relative">
                <div className="w-12 h-12 bg-lime-400 rounded-sm flex items-center justify-center group-hover:bg-lime-500 transition-colors">
                  <span className="text-black font-black text-2xl">L7</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-black text-2xl tracking-tight uppercase">
                  LANE<span className="text-lime-400">7</span>
                </div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider -mt-1">
                  BOWL • DRINK • EAT • PLAY
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {NAV_ITEMS.map(({ href, label }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Find Venue Button */}
              <Link href="/venues">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wide"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Venue
                </Button>
              </Link>

              {/* Book Now Button */}
              <Button
                size="sm"
                className="bg-lime-400 hover:bg-lime-500 text-black font-black px-6 py-2 uppercase tracking-wide shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Book Now</span>
                <span className="sm:hidden">Book</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-gray-800 p-2"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden border-t border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-6 space-y-4">
              {NAV_ITEMS.map(({ href, label }) => (
                <div key={href} className="block">
                  <NavLink
                    href={href}
                    className="block py-2 text-lg hover:pl-2 transition-all"
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </NavLink>
                </div>
              ))}

              {/* Mobile Find Venue */}
              <div className="pt-4 border-t border-gray-800">
                <Link href="/venues" onClick={closeMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wide mb-3"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Venue
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer para compensar el navbar fixed */}
      <div className="h-20" />
    </>
  );
}

// Versión con Christmas Banner (opcional)
export function NavbarWithPromo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Christmas Promo Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-4 text-sm font-bold">
            <span>🎄 CHRISTMAS BOOKINGS NOW OPEN</span>
            <Badge className="bg-lime-400 text-black font-black px-3 py-1">BOOK NOW</Badge>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="fixed top-10 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
              <div className="relative">
                <div className="w-12 h-12 bg-lime-400 rounded-sm flex items-center justify-center group-hover:bg-lime-500 transition-colors">
                  <span className="text-black font-black text-2xl">L7</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-black text-2xl tracking-tight uppercase">
                  LANE<span className="text-lime-400">7</span>
                </div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider -mt-1">
                  BOWL • DRINK • EAT • PLAY
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {NAV_ITEMS.map(({ href, label }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/venues">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wide"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Venue
                </Button>
              </Link>

              <Button
                size="sm"
                className="bg-lime-400 hover:bg-lime-500 text-black font-black px-6 py-2 uppercase tracking-wide shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Book Now</span>
                <span className="sm:hidden">Book</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-gray-800 p-2"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden border-t border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-6 space-y-4">
              {NAV_ITEMS.map(({ href, label }) => (
                <div key={href} className="block">
                  <NavLink
                    href={href}
                    className="block py-2 text-lg hover:pl-2 transition-all"
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </NavLink>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-800">
                <Link href="/venues" onClick={closeMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wide mb-3"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Venue
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer para compensar navbar + banner */}
      <div className="h-30" />
    </>
  );
}
