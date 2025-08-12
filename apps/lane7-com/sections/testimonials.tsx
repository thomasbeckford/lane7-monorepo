import { Marquee, MarqueeContent, MarqueeItem } from '@/components/custom/auto-text-marquee';
import RhombusCard from '@/components/custom/rhombus-card';
import { Section } from '@/components/ui/section';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      stars: 5,
      name: 'review of leicester',
      description:
        'Love love love this place. The whole asthetic is such a vibe, with the graffiti and neon lights so vibrant and its a fun day out for a few hours, with the options to mix and match your games depending on what you fancy.',
      author: 'Maxine Young'
    },
    {
      stars: 5,
      name: 'review of bristol',
      description: 'The place is spot on. The staff are friendly and the food is delicious.',
      author: 'Maxine Young'
    }
  ];

  return (
    <Section className="py-16" background="pattern">
      <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6">What Our Guests Said</h2>

      <Marquee>
        <MarqueeContent className="overflow-visible" pauseOnHover={false}>
          {reviews.map((review, index) => {
            const isEven = index % 2 === 0;
            const bgColor = isEven ? 'bg-black' : 'bg-white';
            const textColor = isEven ? 'text-white' : 'text-black';
            const starColor = isEven ? 'fill-gray-400 text-gray-400' : 'fill-gray-400 text-gray-400';

            return (
              <MarqueeItem key={index} className="w-[500px] overflow-visible">
                <RhombusCard className={`min-h-[250px]`}>
                  <div className={`absolute p-6 ${textColor} ${bgColor} flex flex-col justify-between h-full`}>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        {[...Array(review.stars)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${starColor}`} />
                        ))}
                      </div>
                      <h3 className="text-[1.6rem] font-black uppercase">{review.name}</h3>
                      <p className="text-[.8rem] uppercase">{review.description}</p>
                    </div>
                    <p className="text-[.9rem] uppercase">- {review.author}</p>
                  </div>
                </RhombusCard>
              </MarqueeItem>
            );
          })}
        </MarqueeContent>
      </Marquee>
    </Section>
  );
}
