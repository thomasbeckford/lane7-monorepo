import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import Image from 'next/image';

export default function ChristmasPromotion() {
  return (
    <Section background="pattern">
      <div className="container mx-auto flex items-center justify-center">
        <Image src="/christmas-promotion/image-7.webp" alt="Lane7 Christmas Promotion" width={800} height={800} />
        <div className="container mx-auto px-6">
          <p>no silent nights</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Game on for Christmas</h2>

          <p>Available from 24th November to 24th December</p>
          <p className="text-xl mb-8 font-medium">
            This Christmas, your team deserves more. At Lane7, we do parties differently. We reject the tame, the
            predictable, and the quiet. There are no silent nights here – only unforgettable ones.
          </p>
          <Button>Book Now</Button>
          <Button>Learn More</Button>
        </div>
      </div>
    </Section>
  );
}
