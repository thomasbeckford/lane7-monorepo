// config/countries.ts
export type SupportedCountry = {
  name: string;
  defaultLocale: string;
  code: CountryCode;
  flag: string;
  ccTLD?: string;
  cities?: string[];
};

export enum CountryCode {
  UK = 'UK',
  DE = 'DE',
  IE = 'IE',
  NL = 'NL'
}

export const SUPPORTED_COUNTRIES: Record<string, SupportedCountry> = {
  uk: {
    name: 'United Kingdom',
    defaultLocale: 'en',
    code: CountryCode.UK,
    flag: '🇬🇧',
    cities: ['London', 'Manchester']
  },
  de: {
    name: 'Germany',
    defaultLocale: 'de',
    code: CountryCode.DE,
    flag: '🇩🇪',
    cities: ['Berlin', 'Hamburg', 'Munich']
  },
  ie: {
    name: 'Ireland',
    defaultLocale: 'en',
    code: CountryCode.IE,
    flag: '🇮🇪',
    cities: ['Dublin', 'Cork']
  },
  nl: {
    name: 'Netherlands',
    defaultLocale: 'nl',
    code: CountryCode.NL,
    flag: '🇳🇱',
    cities: ['Amsterdam']
  }
};

export const DEFAULT_COUNTRY = 'uk';

// Utility functions
export const getSupportedCountryKeys = (): string[] => Object.keys(SUPPORTED_COUNTRIES);

export const isCountrySupported = (country: string): boolean =>
  getSupportedCountryKeys().includes(country.toLowerCase());
