// app/[locale]/layout.tsx

import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pasimedia - Cliente',
  description: 'Sitio web desarrollado por Pasimedia'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <html lang={locale}>
      <body className={`${inter.className} dark`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
