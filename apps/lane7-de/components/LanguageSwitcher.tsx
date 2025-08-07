'use client';

import { locales } from '@lane7/shared/config/locales';
import { Badge } from '@lane7/ui/components/badge';
import { Button } from '@lane7/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@lane7/ui/components/dropdown-menu';
import { cn } from '@lane7/ui/lib/utils';
import { Check, ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
  className?: string;
  variant?: 'dropdown' | 'pills' | 'compact';
}

export function LanguageSwitcher({ currentLocale, className = '', variant = 'dropdown' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocaleData = locales.find(locale => locale.code === currentLocale);

  /**
   * Construye la URL para el nuevo idioma
   * Maneja correctamente los paths con y sin locale
   */
  const buildUrl = (newLocale: string) => {
    // Buscar si el path actual tiene un locale válido al inicio
    const currentPathLocale = locales.find(
      locale => pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`
    );

    let pathWithoutLocale: string;

    if (currentPathLocale) {
      // Remover el locale actual del path
      pathWithoutLocale = pathname.slice(`/${currentPathLocale.code}`.length) || '/';
    } else {
      // El path no tiene locale (no debería pasar con el middleware, pero por seguridad)
      pathWithoutLocale = pathname;
    }

    // Construir la nueva URL
    const newPath = pathWithoutLocale === '/' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`;

    return newPath;
  };

  /**
   * Cambia el idioma con navegación programática
   * Útil para casos especiales o analytics
   */
  const changeLanguage = (newLocale: string) => {
    const newUrl = buildUrl(newLocale);
    router.push(newUrl);
  };

  if (variant === 'pills') {
    return (
      <div
        className={cn('flex items-center gap-1 p-1 bg-muted rounded-lg', className)}
        role="tablist"
        aria-label="Language selector"
      >
        {locales.map(locale => (
          <Link
            key={locale.code}
            href={buildUrl(locale.code)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
              'hover:bg-background hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary',
              currentLocale === locale.code
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title={`Switch to ${locale.name}`}
            aria-current={currentLocale === locale.code ? 'page' : undefined}
          >
            <span className="hidden sm:inline">{locale.name}</span>
            <span className="sm:hidden">{locale.code.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)} role="group" aria-label="Language selector">
        {locales.map(locale => (
          <Link
            key={locale.code}
            href={buildUrl(locale.code)}
            title={`Switch to ${locale.name}`}
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            <Badge
              variant={currentLocale === locale.code ? 'default' : 'outline'}
              className={cn(
                'hover:scale-105 transition-all cursor-pointer',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                currentLocale === locale.code && 'shadow-md'
              )}
            >
              {locale.code.toUpperCase()}
            </Badge>
          </Link>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('gap-2 min-w-[120px]', className)}
          aria-label={`Current language: ${currentLocaleData?.name || currentLocale}. Click to change language`}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="flex items-center gap-1">
            <span className="hidden sm:inline">{currentLocaleData?.name}</span>
            <span className="sm:hidden">{currentLocale?.toUpperCase()}</span>
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {locales.map(locale => (
          <DropdownMenuItem key={locale.code} asChild>
            <Link
              href={buildUrl(locale.code)}
              className="flex items-center justify-between w-full cursor-pointer"
              aria-current={currentLocale === locale.code ? 'page' : undefined}
            >
              <div className="flex items-center gap-2">
                <span>{locale.name}</span>
              </div>
              {currentLocale === locale.code && <Check className="h-4 w-4 text-primary" aria-hidden="true" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
