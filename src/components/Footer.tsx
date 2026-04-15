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
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" strokeWidth="2" />
            <line x1="17" y1="7" x2="17.01" y2="7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeWidth="2" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              strokeWidth="2"
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
    <footer className="bg-linear-to-b from-zinc-950 to-black text-zinc-400 pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* --- Newsletter Section --- */}
        <div className="relative mb-20 pb-16 border-b border-zinc-800">
          <div className="absolute inset-0 bg-linear-to-r from-zinc-800/5 via-transparent to-transparent rounded-2xl" />
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight">
                Dapatkan Akses Eksklusif
                <span className="block text-zinc-500 italic text-2xl sm:text-3xl mt-2">Koleksi Terbatas</span>
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-md">Bergabunglah dengan komunitas kami untuk pembaruan koleksi dan cerita kurasi desain Nusantara.</p>
            </div>
            <div className="w-full lg:max-w-md">
              <form className="relative group">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-3.5 outline-none text-white placeholder:text-zinc-600 text-sm font-sans transition-all duration-300 focus:border-zinc-600 focus:bg-zinc-900/80"
                  required
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2">
                  <span className="hidden sm:inline">Subscribe</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </form>
              <p className="text-xs text-zinc-600 mt-3">No spam, hanya konten berkualitas.</p>
            </div>
          </div>
        </div>

        {/* --- Main Footer Content --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter text-white inline-block mb-4 hover:opacity-80 transition-opacity">
                Kirana<span className="text-zinc-600">.</span>
              </Link>
              <p className="text-sm leading-relaxed text-zinc-500 max-w-sm">Platform katalog pakaian premium yang mengedepankan kualitas material dan estetika desain abadi.</p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all duration-300" aria-label={social.name}>
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-6">Kategori</h4>
            <ul className="space-y-3">
              {categoryLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-6">Butuh Bantuan?</h4>
              <div className="space-y-4">
                <a href="mailto:hello@kiranacatalog.com" className="flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors group">
                  <Mail size={16} className="group-hover:scale-110 transition-transform shrink-0" />
                  <span>hello@kiranacatalog.com</span>
                </a>
                <a href="tel:+6281234567890" className="flex items-center gap-3 text-sm text-zinc-500 hover:text-white transition-colors group">
                  <Phone size={16} className="group-hover:scale-110 transition-transform shrink-0" />
                  <span>+62 812-3456-7890</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-zinc-500">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>
                    Jl. Merdeka No. 123, <br />
                    Jakarta Selatan, 12190 <br />
                    Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="relative pt-8 mt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
            <p className="text-center md:text-left">© {currentYear} Kirana. All rights reserved. Made with elegance.</p>
            <div className="flex gap-8">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
