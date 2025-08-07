import { defaultLocale, DOMAIN_LOCALE_MAP, locales } from '../config/locales';

/**
 * 🔍 Detecta locale por dominio ccTLD
 * Automáticamente usa la configuración de arriba
 */
export function detectDomainLocale(host: string): string | null {
  for (const [tld, locale] of Object.entries(DOMAIN_LOCALE_MAP)) {
    if (host.includes(tld)) {
      // Verificar que el locale esté activo en tu config
      const isActive = locales.some(l => l.code === locale && l.isActive);
      return isActive ? locale : null;
    }
  }
  return null;
}

/**
 * 🌍 Detecta locale por navegador
 * Usa automáticamente tu configuración de locales activos
 */
export function detectBrowserLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;

  const browserLangs = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());

  const activeLocales = locales.filter(l => l.isActive);

  for (const browserLang of browserLangs) {
    // 1. Coincidencia exacta
    const exactMatch = activeLocales.find(locale => locale.code.toLowerCase() === browserLang);
    if (exactMatch) return exactMatch.code;

    // 2. Coincidencia por familia (de -> de-DE)
    const langCode = browserLang.split('-')[0];
    const familyMatch = activeLocales.find(locale => locale.code.toLowerCase().startsWith(langCode));
    if (familyMatch) return familyMatch.code;
  }

  return defaultLocale;
}
