export type SupportedCountry = {
  name: string;
  path: string;
  defaultLocale: string;
  code: CountryCode;
  flag: string;
  ccTLD?: string;
  cities?: string[];
};

export enum CountryCode {
  GB = 'GB',
  DE = 'DE',
  IE = 'IE',
  NL = 'NL'
}

export const SUPPORTED_COUNTRIES: Record<string, SupportedCountry> = {
  GB: {
    name: 'United Kingdom',
    path: '/en-GB',
    defaultLocale: 'en-GB',
    code: CountryCode.GB,
    flag: '🇬🇧',
    cities: ['London', 'Manchester']
  },
  DE: {
    name: 'Germany',
    path: '/de-DE',
    defaultLocale: 'de-DE',
    code: CountryCode.DE,
    flag: '🇩🇪',
    ccTLD: '.de',
    cities: ['Berlin', 'Hamburg', 'Munich']
  },
  IE: {
    name: 'Ireland',
    path: '/en-IE',
    defaultLocale: 'en-IE',
    code: CountryCode.IE,
    flag: '🇮🇪',
    ccTLD: '.com',
    cities: ['Dublin', 'Cork']
  },
  NL: {
    name: 'Netherlands',
    path: '/nl-NL',
    defaultLocale: 'nl-NL',
    code: CountryCode.NL,
    flag: '🇳🇱',
    ccTLD: '.com',
    cities: ['Amsterdam']
  }
};
