import { Facebook, Instagram, Linkedin, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Logo */}
        <div className="mb-12 lg:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black italic -skew-x-12 text-white">LANE7</h1>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Column 1 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">VENUES</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">GAMES</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">WHAT'S ON</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">CONTACT US</h3>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">CORPORATE</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">VOUCHERS</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">MANAGE BOOKING</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">CHRISTMAS</h3>
          </div>

          {/* Column 3 */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">FAQS</h3>
            <h3 className="text-sm font-medium tracking-wide text-gray-400 uppercase mb-4">JOIN US</h3>
          </div>

          {/* Social Media - Hidden on mobile, shows on larger screens */}
          <div className="hidden md:block lg:col-span-3 lg:justify-self-end">
            <div className="flex gap-4 lg:gap-6">
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="TikTok"
              >
                <Music2 size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Social Media - Mobile only */}
        <div className="md:hidden mb-12">
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="TikTok"
            >
              <Music2 size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500 space-y-4 lg:space-y-0">
          <div className="text-center lg:text-left">
            <p className="tracking-wider">LANE7 © 2025. ALL RIGHTS RESERVED</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center">
            <a href="#" className="hover:text-white transition-colors tracking-wider">
              TERMS & CONS
            </a>
            <span className="hidden sm:inline">—</span>
            <a href="#" className="hover:text-white transition-colors tracking-wider">
              PRIVACY POLICY
            </a>
            <span className="hidden sm:inline">—</span>
            <a href="#" className="hover:text-white transition-colors tracking-wider">
              BY PASI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
