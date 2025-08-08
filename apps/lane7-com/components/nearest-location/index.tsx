'use client';

import { useNearestLocations } from '@/components/nearest-location/useNearestLocations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Navigation2 } from 'lucide-react';
import Link from 'next/link';

interface NavbarNearestLocationProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'compact' | 'minimal' | 'badge';
}

export default function NearestLocations({
  className = '',
  showLabel = true,
  variant = 'compact'
}: NavbarNearestLocationProps) {
  const { nearestLocations, isLoading, error, hasUserLocation, userLocation } = useNearestLocations();

  const nearestLocation = nearestLocations[0];

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        {showLabel && <span className="text-sm text-muted-foreground">Searching...</span>}
      </div>
    );
  }

  if (error || !hasUserLocation || !nearestLocation) {
    console.log('Error fetching nearest locations:', error);
    console.log('hasUserLocation', hasUserLocation);
    console.log('nearestLocation', nearestLocation);
    return null;
  }

  if (variant === 'badge') {
    return (
      <Link href={`/locations/${nearestLocation.slug}`} className={className}>
        <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors cursor-pointer">
          <MapPin className="w-3 h-3 mr-1" />
          {nearestLocation.formattedDistance}
        </Badge>
      </Link>
    );
  }

  // Variante Minimal - Solo icono y distancia
  if (variant === 'minimal') {
    return (
      <Link href={`/locations/${nearestLocation.slug}`} className={className}>
        <Button variant="ghost" size="sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{nearestLocation.name}</span>
        </Button>
      </Link>
    );
  }

  // Variante Compact - Más información pero compacta
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-xs uppercase tracking-widest text-gray-500 hidden sm:inline font-medium">Nearest</span>
      )}

      <Link href={`/locations/${nearestLocation.slug}`}>
        <Button
          variant="ghost"
          className="group flex items-center gap-3 px-3 py-2 rounded-lg bg-black/20 border border-gray-700/50 hover:border-fiveiron-lime/60 backdrop-blur-md transition-all duration-200 hover:bg-black/40 min-w-0"
        >
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-fiveiron-lime group-hover:scale-105 transition-transform duration-150" />

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium text-white truncate">{nearestLocation.name}</span>
              <span className="text-xs text-gray-400 bg-gray-800/60 px-2 py-0.5 rounded-full">
                {nearestLocation.formattedDistance}
              </span>
            </div>
          </div>

          <Navigation2 className="w-3 h-3 text-gray-500 group-hover:text-fiveiron-lime transition-colors duration-150" />
        </Button>
      </Link>

      {userLocation && (
        <Badge variant="secondary" className="flex items-center ml-auto">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{userLocation.name}</span>
        </Badge>
      )}
    </div>
  );
}
