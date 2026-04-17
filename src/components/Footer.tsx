import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Katalog Resmi', href: '/catalog' },
    { name: 'Artikel & Blog', href: '/blog' },
    { name: 'Tentang Kami', href: '/about' },
  ];

  const categoryLinks = [
    { name: 'T-Shirt', href: '/category/t-shirt' },
    { name: 'Shirt', href: '/category/shirt' },
    { name: 'Outerwear', href: '/category/outerwear' },
    { name: 'Pants', href: '/category/pants' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
  ];

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="1.5" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeWidth="1.5" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#FAFAF8] text-zinc-600 pt-20 pb-8 px-6 md:px-8 lg:px-12 border-t border-zinc-200 selection:bg-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        {/* --- Newsletter Section --- */}
        <div className="relative mb-20 pb-16 border-b border-zinc-200">
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-zinc-950 mb-4 tracking-tight">
                Dapatkan Akses Eksklusif
                <span className="block text-zinc-400 italic text-2xl sm:text-3xl mt-2">Koleksi Terbatas</span>
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-md">Bergabunglah dengan komunitas kami untuk pembaruan koleksi dan cerita desain Nusantara.</p>
            </div>

            <div className="w-full lg:max-w-md">
              <form className="relative group">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="w-full bg-white border border-zinc-200 rounded-xl px-5 py-4 outline-none text-zinc-900 placeholder:text-zinc-400 text-sm font-sans transition-all duration-300 focus:border-zinc-400 focus:shadow-sm"
                  required
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-zinc-950 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors duration-300 flex items-center gap-2">
                  <span className="hidden sm:inline">Subscribe</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </form>
              <p className="text-xs text-zinc-400 mt-3 font-light">No spam, hanya konten berkualitas.</p>
            </div>
          </div>
        </div>

        {/* --- Main Footer Content --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="text-3xl font-serif font-bold tracking-tight text-zinc-950 inline-block mb-4 hover:opacity-70 transition-opacity">
                Kirana<span className="text-zinc-400">.</span>
              </Link>
              <p className="text-sm leading-relaxed text-zinc-500 max-w-sm font-light">Platform katalog pakaian premium yang mengedepankan kualitas material dan estetika desain abadi.</p>
            </div>
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:border-zinc-950 hover:shadow-sm transition-all duration-300"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-zinc-950 text-xs font-semibold uppercase tracking-widest mb-6">Navigasi</h4>
            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-500 font-light hover:text-zinc-950 hover:translate-x-1 transition-all duration-300 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-zinc-950 text-xs font-semibold uppercase tracking-widest mb-6">Kategori</h4>
            <ul className="space-y-4">
              {categoryLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-500 font-light hover:text-zinc-950 hover:translate-x-1 transition-all duration-300 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h4 className="text-zinc-950 text-xs font-semibold uppercase tracking-widest mb-6">Butuh Bantuan?</h4>
            <div className="space-y-5">
              <a href="mailto:hello@kiranacatalog.com" className="flex items-center gap-3 text-sm text-zinc-500 font-light hover:text-zinc-950 transition-colors group">
                <Mail size={16} className="group-hover:scale-110 transition-transform shrink-0 text-zinc-400" strokeWidth={1.5} />
                <span>hello@kiranacatalog.com</span>
              </a>
              <a href="tel:+6281234567890" className="flex items-center gap-3 text-sm text-zinc-500 font-light hover:text-zinc-950 transition-colors group">
                <Phone size={16} className="group-hover:scale-110 transition-transform shrink-0 text-zinc-400" strokeWidth={1.5} />
                <span>+62 812-3456-7890</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-500 font-light">
                <MapPin size={16} className="mt-1 shrink-0 text-zinc-400" strokeWidth={1.5} />
                <span className="leading-relaxed">
                  Jl. Raya Kembaran No. 123, <br />
                  Kec. Kembaran, Purwokerto, 53182 <br />
                  Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="pt-8 mt-8 border-t border-zinc-200">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 font-light">
            <p className="text-center md:text-left">© {currentYear} Kirana. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <Link href="/terms" className="hover:text-zinc-950 transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/cookies" className="hover:text-zinc-950 transition-colors">
                Kuki
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
