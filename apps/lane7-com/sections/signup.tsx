import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

export default function SignUp() {
  return (
    <Section className="py-20 relative ">
      {/* Background Image */}
      <div
        style={{
          backgroundImage: 'url("/signup.jpg")',
          maskImage: 'linear-gradient(to bottom, black, transparent)'
        }}
        className="absolute inset-0 h-full bg-cover bg-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 h-full bg-black/50" />

      {/* Content */}
      <div className="container mx-auto relative z-10 h-full">
        <div className="w-full flex justify-end" style={{ justifyContent: 'end' }}>
          <article className="max-w-xl text-white">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">SIGN UP</h2>

              <p className="text-lg opacity-90 leading-relaxed max-w-md">
                Stay in the know with all things Lane7 and sign up to our mailing list.
              </p>

              <div className="pt-4">
                <Button variant="outline" size="lg">
                  Hell Yes
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
}
