import ChristmasPromotion from '@/sections/christmas-promotion';
import GiftVouchers from '@/sections/gift-vouchers';
import HeroSection from '@/sections/hero-section';
import NavigationGrid from '@/sections/navigation-grid';
import SignUp from '@/sections/signup';
import GamesAndActivities from '@/sections/testimonials';
import UnlimitedPlaytime from '@/sections/unlimited-playtime';
import Seo from '@/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lane7 - Premium Bowling, Pool & Karaoke Venues | London, Manchester, Berlin, Dublin',
  description:
    "Lane7 is Europe's leading entertainment venue chain offering bowling from £15, pool from £8, and karaoke from £12. Corporate events and group bookings available across 8 venues.",
  keywords:
    'Lane7, bowling venues, pool halls, karaoke bars, entertainment venues, corporate events, team building, London bowling, Manchester pool, Berlin karaoke',
  openGraph: {
    title: 'Lane7 - Premium Bowling, Pool & Karaoke Entertainment',
    description:
      "Book bowling, pool, and karaoke at Lane7's premium venues across Europe. Perfect for corporate events and group celebrations.",
    type: 'website',
    locale: 'en_GB'
  }
};

export default async function HomePageGlobal({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;

  return (
    <main>
      <Seo />
      <HeroSection />
      <NavigationGrid country={country} />
      <GamesAndActivities />
      <UnlimitedPlaytime />
      <ChristmasPromotion />
      <hr className="bg-red-500 h-1" />
      <GiftVouchers />

      <SignUp />
    </main>
  );
}
