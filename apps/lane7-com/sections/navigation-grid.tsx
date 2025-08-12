import RhombusCard from '@/components/custom/rhombus-card';
import { Section } from '@/components/ui/section';

export default function NavigationGrid({ country }: { country: string }) {
  const links = [
    {
      name: 'Venues',
      href: `/${country}/venues`,
      description: 'we get around. check out your nearest lane7.',
      cta: 'find us',
      ariaLabel: 'Find Lane7 venues',
      image: 'https://lane7.com/wp-content/uploads/2024/06/h_venues.webp'
    },
    {
      name: 'Games',
      href: `/${country}/games`,
      description: 'the best bar with your favorite games.',
      cta: 'start playing',
      ariaLabel: 'Start playing games',
      image: 'https://lane7.com/wp-content/uploads/2024/06/h_games.webp'
    },
    {
      name: "what's on",
      href: `/${country}/events`,
      description: 'lane7 brings the vibes. your bring yourself.',
      cta: "what's happening",
      ariaLabel: 'What is happening at Lane7',
      image: 'https://lane7.com/wp-content/uploads/2024/06/h_whatson.webp'
    },
    {
      name: 'corporate booking',
      href: `/${country}/corporate`,
      description: 'there is no such thing as a party too big',
      cta: 'enquire now',
      ariaLabel: 'Enquire about corporate bookings',
      image: 'https://lane7.com/wp-content/uploads/2024/06/h_coorporate.webp'
    }
  ];

  return (
    <Section className="py-16" background="pattern">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6">BOWL , DRINK, EAT, PLAY.</h2>
        <p className="text-xl text-white text-center mb-16">Lose yourself. all. night. long.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {links.map((location, index) => (
            <article key={index}>
              <RhombusCard
                backgroundImage={location.image}
                className="hover:translate-y-[-10px] transition-y duration-300 h-[350px]"
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-[2rem] font-black uppercase">{location.name}</h3>
                  <p className="text-[1.2rem] uppercase text-white">{location.description}</p>
                  <div>
                    <span className="text-[1rem] uppercase border-b border-white/60 text-white">{location.cta}</span>
                  </div>
                </div>
              </RhombusCard>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
