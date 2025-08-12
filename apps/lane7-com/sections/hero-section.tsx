import { Marquee, MarqueeContent, MarqueeItem } from '@/components/custom/auto-text-marquee';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
      <Marquee>
        <MarqueeContent className="border-t-2 border-b-2 border-gray-200 p-1">
          {new Array(10).fill(null).map((_, index) => (
            <MarqueeItem key={index} className="m-0">
              <Link href="/" className="hover:text-red-400 text-md  px-1">
                GO ALL IN. UNLIMITED PLAYTIME FROM £18
              </Link>
              <span className="text-md px-1">|</span>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
      <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label="Lane7 venue atmosphere"
          >
            <source src="/lane7.mp4" type="video/mp4" />
            <div className="w-full h-full bg-gray-900"></div>
          </video>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6 sr-only">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">Lane7 - Premium Entertainment Venues</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Europe's leading bowling, pool and karaoke venue chain with 8 locations across London, Manchester, Berlin
            and Dublin
          </p>
        </div>
      </Section>
    </>
  );
}
