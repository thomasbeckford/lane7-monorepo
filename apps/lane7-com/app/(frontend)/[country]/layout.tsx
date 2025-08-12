import MixpanelProvider from '@/providers/MixpanelProvider';
import Footer from '@/sections/footer';
import { Inter } from 'next/font/google';
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
  return (
    <html lang="en">
      <MixpanelProvider>
        <body className={`${inter.className} dark`}>
          <main>{children}</main>
          <Footer />
        </body>
      </MixpanelProvider>
    </html>
  );
}
