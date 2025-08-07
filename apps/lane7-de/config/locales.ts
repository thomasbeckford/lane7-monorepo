// Define todos los locales que tu aplicación soporta
export const defaultLocale = 'en-GB'; // El locale por defecto si no se detecta otro
// pero metele el icono de flag
export const locales = [
  { code: 'en-GB', name: 'English (UK)', isActive: true, flag: '🇬🇧' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)', isActive: true, flag: '🇩🇪' },
  { code: 'en-IE', name: 'English (Ireland)', isActive: true, flag: '🇮🇪' },
  { code: 'nl-NL', name: 'Nederlands (Nederland)', isActive: true, flag: '🇳🇱' }
];

/**
 * 🌐 CONFIGURACIÓN DE DOMINIOS ccTLD
 * Solo agrega/quita líneas aquí para manejar nuevos dominios
 */
export const DOMAIN_LOCALE_MAP: Record<string, string> = {
  '.de': 'de-DE',
  '.nl': 'nl-NL',
  '.ie': 'en-IE',
  '.co.uk': 'en-GB'
  // 👆 Para agregar: '.fr': 'fr-FR', '.es': 'es-ES', etc.
};
