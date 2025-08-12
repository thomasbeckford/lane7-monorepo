import { useMemo } from "react";
import { calculateDistance } from "./distance";
import { Location } from "./type";
import { useGeolocation } from "./useGeolocation";

function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else if (distance < 10) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}km`;
  }
}

export function useNearestLocations(limit: number = 10) {
  const {
    location: userLocation,
    loading: locationLoading,
    error: locationError,
  } = useGeolocation();

  const locations: Location[] = [
    {
      coordinates: [40.7127281, -74.005974],
      slug: "new-york",
      name: "New York",
      distance: 100,
      formattedDistance: "",
    },
  ];
  const locationsError = null;
  const locationsLoading = false;

  const nearestLocations = useMemo(() => {
    if (!userLocation || !locations || !Array.isArray(locations)) {
      return [];
    }

    const locationsWithDistance = locations
      .map((location) => {
        const coordsString = location.coordinates;
        if (!coordsString || coordsString === "0,0") {
          console.warn("Invalid coordinates for location:", location.slug);
          return null;
        }
        if (Array.isArray(coordsString)) {
          const [longitude, latitude] = coordsString;
          return {
            ...location,
            distance: calculateDistance(userLocation, {
              lat: latitude,
              lng: longitude,
            }),
            formattedDistance: formatDistance(
              calculateDistance(userLocation, { lat: latitude, lng: longitude })
            ),
          };
        }

        const [longitude, latitude] = coordsString.split(",").map(Number);

        if (isNaN(latitude) || isNaN(longitude)) {
          console.warn("Invalid coordinates for location:", location.slug);
          return null;
        }

        const locationCoords = { lat: latitude, lng: longitude };
        const distance = calculateDistance(userLocation, locationCoords);

        return {
          ...location,
          distance,
          formattedDistance: formatDistance(distance),
        };
      })
      .filter(Boolean);

    return locationsWithDistance
      .sort((a, b) => (a?.distance || 0) - (b?.distance || 0))
      .slice(0, limit);
  }, [userLocation, locations, limit]);

  return {
    nearestLocations,
    userLocation,
    isLoading: locationLoading || locationsLoading,
    error: locationError || locationsError,
    hasUserLocation: !!userLocation,
  };
}
