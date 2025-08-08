// app/[locale]/layout.tsx
'use client';

import { Navbar } from '@/components/Navbar';
import { initMixpanel, trackPageView } from '@/lib/mixpanelClient';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const pathname = usePathname();

  useEffect(() => {
    initMixpanel(); // Inicializar Mixpanel
  }, []);

  useEffect(() => {
    trackPageView(pathname); // Trackear cada cambio de página
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
