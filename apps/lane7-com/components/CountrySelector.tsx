'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_COUNTRIES } from '@lane7/shared/config/countries';
import { Check, ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';

interface CountrySelectorProps {
  currentCountry?: keyof typeof SUPPORTED_COUNTRIES;
  variant?: 'navbar' | 'compact' | 'full';
}

function useCurrentCountry() {
  if (typeof window === 'undefined') return 'GB';

  const hostname = window.location.hostname;
  for (const [code, config] of Object.entries(SUPPORTED_COUNTRIES)) {
    if (config.ccTLD && hostname.includes(config.ccTLD.replace('.', ''))) {
      return code as keyof typeof SUPPORTED_COUNTRIES;
    }
  }
  return 'GB';
}

export function CountrySelector({ variant = 'navbar' }: CountrySelectorProps) {
  const currentCountry = useCurrentCountry();
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://lane7.local' : 'https://lane7';
  const port = process.env.NODE_ENV === 'development' ? ':3000' : '';

  // Crear array de países con URLs
  const countries = Object.entries(SUPPORTED_COUNTRIES).map(([code, config]) => ({
    code: code as keyof typeof SUPPORTED_COUNTRIES,
    name: config.name,
    flag: config.flag,
    locale: config.defaultLocale,
    href: config.ccTLD ? `${baseUrl}${config.ccTLD}${port}` : `${baseUrl}.com${port}`,
    isActive: code === currentCountry
  }));

  const activeCountry = countries.find(c => c.isActive)!;

  // Variante compacta - solo dropdown
  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 gap-2">
            <Globe className="h-3 w-3" />
            <span>{activeCountry.flag}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {countries.map(country => (
            <DropdownMenuItem key={country.code} asChild>
              <Link href={country.href} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </div>
                {country.isActive && <Check className="h-4 w-4" />}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Variante completa - grid de tarjetas
  if (variant === 'full') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>Choose your region</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {countries.map(country => (
            <Link key={country.code} href={country.href} className="block">
              <div
                className={`
                p-4 rounded-lg border-2 transition-colors hover:border-primary/50
                ${country.isActive ? 'border-primary bg-primary/5' : 'border-border'}
              `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <div className="font-medium">{country.name}</div>
                    <div className="text-sm text-muted-foreground">{country.locale}</div>
                  </div>
                </div>
                {country.isActive && <Badge className="mt-2">Current</Badge>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Variante navbar - desktop inline + mobile dropdown
  return (
    <>
      {/* Desktop: botones inline */}
      <div className="hidden md:flex items-center border rounded-md overflow-hidden">
        {countries.map(country => (
          <Link key={country.code} href={country.href}>
            <Button variant={country.isActive ? 'secondary' : 'ghost'} size="sm" className="rounded-none border-0 px-3">
              <span className="mr-2">{country.flag}</span>
              <span className="hidden lg:inline">{country.name}</span>
              <span className="lg:hidden">{country.code}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <span>{activeCountry.flag}</span>
              <span className="hidden sm:inline">{activeCountry.name}</span>
              <span className="sm:hidden">{activeCountry.code}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {countries.map(country => (
              <DropdownMenuItem key={country.code} asChild>
                <Link href={country.href} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  {country.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Current
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
