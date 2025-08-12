// config/countries.ts
export type SupportedCountry = {
  name: string;
  defaultLocale: string;
  flag: string;
  cities?: string[];
  hasOwnDomain?: string;
};

export enum CountryCode {
  UK = 'uk',
  DE = 'de',
  IE = 'ie',
  NL = 'nl'
}

export const SUPPORTED_COUNTRIES = {
  [CountryCode.UK]: {
    name: 'United Kingdom',
    defaultLocale: 'en',
    flag: '🇬🇧',
    cities: ['London', 'Manchester']
  },
  [CountryCode.DE]: {
    name: 'Germany',
    defaultLocale: 'de',
    flag: '🇩🇪',
    cities: ['Berlin', 'Hamburg', 'Munich'],
    hasOwnDomain: 'http://localhost:3001'
  },
  [CountryCode.IE]: {
    name: 'Ireland',
    defaultLocale: 'en',
    flag: '🇮🇪',
    cities: ['Dublin', 'Cork']
  },
  [CountryCode.NL]: {
    name: 'Netherlands',
    defaultLocale: 'nl',
    flag: '🇳🇱',
    cities: ['Amsterdam']
  }
} as const satisfies Record<CountryCode, SupportedCountry>;

export const DEFAULT_COUNTRY = CountryCode.UK;

// Cache computed values for better performance
const SUPPORTED_COUNTRY_KEYS = Object.keys(SUPPORTED_COUNTRIES) as CountryCode[];
const SUPPORTED_COUNTRY_KEYS_SET = new Set(SUPPORTED_COUNTRY_KEYS);

// Optimized utility functions
export const getSupportedCountryKeys = (): readonly CountryCode[] => SUPPORTED_COUNTRY_KEYS;

export const isCountrySupported = (country: string): country is CountryCode =>
  SUPPORTED_COUNTRY_KEYS_SET.has(country.toLowerCase() as CountryCode);

// Helper to get country data safely
export const getCountryData = (countryCode: string): SupportedCountry | null =>
  SUPPORTED_COUNTRIES[countryCode as CountryCode] || null;

// Type helpers
export type SupportedCountryKey = keyof typeof SUPPORTED_COUNTRIES;
