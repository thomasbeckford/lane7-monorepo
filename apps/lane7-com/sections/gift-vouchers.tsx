import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import Image from 'next/image';

export default function GiftVouchers() {
  return (
    <Section background="pattern">
      <div className="container mx-auto flex items-center justify-center">
        <div className="container mx-auto px-6">
          <p>no silent nights</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Give the gift of Lane7</h2>

          <p className="text-xl mb-8 font-medium">
            Give someone a Lane7 gift voucher for all their best nights out in one. Birthday? Secret Santa? Valentine’s
            Day? There isn’t an occasion that can’t be made better with the gift of Lane7.
          </p>
          <Button>Buy a gift voucher</Button>
          <Button variant="outline">book now</Button>
        </div>
        <Image src="/christmas-promotion/image-7.webp" alt="Lane7 Christmas Promotion" width={800} height={800} />
      </div>
    </Section>
  );
}
