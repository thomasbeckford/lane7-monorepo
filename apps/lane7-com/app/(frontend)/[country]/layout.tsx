// app/[locale]/layout.tsx

import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lane7 - Bowling, Pool & Karaoke Venues | London, Manchester, Berlin, Dublin',
  description:
    'Lane7 offers bowling, pool and karaoke in premium venues across London, Manchester, Berlin and Dublin. Perfect for corporate events, parties and team building.'
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
