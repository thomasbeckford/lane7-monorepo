import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

export default function UnlimitedPlaytime() {
  return (
    <Section className="py-20 relative">
      {/* Background Image */}
      <div
        style={{
          backgroundImage:
            'url("https://lane7.com/nitropack_static/rvwKbMZKUsuucMsCSTkmeCWrvzuVmlGf/assets/images/optimized/rev-dc1d71c/lane7.com/wp-content/uploads/2024/12/Screenshot-2024-05-03-at-15.05-1.png")'
        }}
        className="absolute inset-0 h-full bg-cover bg-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <article className="max-w-4xl mx-auto text-center text-white">
          <p className="text-xl mb-8 font-medium">GO ALL IN</p>

          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">UNLIMITED PLAYTIME FROM £18</h2>
          <p className="text-xl mb-8 font-medium">
            For a limited time only, go balls deep with all of our activities from just £18pp.
          </p>
          <Button>learn more</Button>

          <p className="text-xl mb-8 font-medium">Prices and activities vary by venue. Available Sunday – Friday </p>
        </article>
      </div>
    </Section>
  );
}
