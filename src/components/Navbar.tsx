'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '@/types';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Daftar kategori statis
  const categories = ['T-Shirt', 'Shirt', 'Outerwear', 'Pants', 'Aksesoris'];

  // Fungsi untuk update jumlah keranjang dari localStorage
  const updateCartBadge = () => {
    const savedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  // Detect scroll untuk efek navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    updateCartBadge();
    window.addEventListener('cartUpdated', updateCartBadge);
    return () => window.removeEventListener('cartUpdated', updateCartBadge);
  }, []);

  // Auto-close mobile menu ketika rute berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoryOpen(false);
  }, [pathname]);

  // Mencegah scroll pada body ketika mobile menu terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* 1. Top Bar - Soft Dark */}
      <div className="bg-[#1a1a1a] text-zinc-400 py-3 px-6 text-[10px] uppercase tracking-widest justify-between items-center hidden md:flex border-b border-white/5">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          100% Authentic — Quality Guaranteed
        </span>
        <div className="flex gap-8 font-medium">
          <a href="#" className="cursor-pointer hover:text-white transition-all duration-300">
            INSTAGRAM
          </a>
          <a href="#" className="cursor-pointer hover:text-white transition-all duration-300">
            WHATSAPP
          </a>
        </div>
      </div>

      {/* 2. Main Navigation - Clean White Background */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-zinc-100' : 'bg-white border-b border-zinc-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group relative z-50">
            <span className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-zinc-800">
              Kirana<span className="text-zinc-400">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-800 group-hover:w-full transition-all duration-500" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { name: 'Beranda', href: '/' },
              { name: 'Katalog', href: '/katalog' },
              { name: 'Blog', href: '/blog' },
            ].map((item) => (
              <Link key={item.name} href={item.href} className={`relative text-[11px] font-medium uppercase tracking-wide transition-all duration-300 ${pathname === item.href ? 'text-zinc-800' : 'text-zinc-500 hover:text-zinc-800'}`}>
                {item.name}
                {pathname === item.href && <motion.div layoutId="underline" className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-zinc-800 rounded-full" transition={{ type: 'spring', bounce: 0.2 }} />}
              </Link>
            ))}

            {/* Dropdown Kategori Desktop */}
            <div className="relative group">
              <button className={`flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide transition-all duration-300 ${pathname.includes('/category') ? 'text-zinc-800' : 'text-zinc-500 hover:text-zinc-800'}`}>
                Kategori
                <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white shadow-xl border border-zinc-100 rounded-xl py-3 min-w-55 overflow-hidden">
                  <div className="px-6 py-2 mb-2 border-b border-zinc-100">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">Koleksi Produk</p>
                  </div>
                  {categories.map((cat) => (
                    <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="group/item flex items-center justify-between px-6 py-2.5 text-[11px] font-medium text-zinc-600 hover:text-zinc-800 hover:bg-zinc-50 transition-all">
                      <span>{cat}</span>
                      <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Icons Area */}
          <div className="flex items-center gap-1 sm:gap-2 z-50">
            <button className="hidden md:flex p-2 rounded-full text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-all duration-300">
              <Search size={18} strokeWidth={1.5} />
            </button>

            <Link href="/cart" className="relative p-2 rounded-full text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-all duration-300 group">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 bg-zinc-800 text-white text-[9px] font-bold min-w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </motion.span>
              )}
            </Link>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-full text-zinc-800 hover:bg-zinc-100 transition-all duration-300" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden fixed inset-0 top-15.25 bg-white z-40 overflow-y-auto"
            >
              <div className="flex flex-col px-6 py-8 gap-2">
                {[
                  { name: 'Beranda', href: '/' },
                  { name: 'Katalog', href: '/katalog' },
                  { name: 'Blog', href: '/blog' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`py-4 text-base font-medium uppercase tracking-wide border-b border-zinc-100 transition-colors ${pathname === item.href ? 'text-zinc-800' : 'text-zinc-500 hover:text-zinc-800'}`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Kategori Accordion */}
                <div className="py-4 border-b border-zinc-100">
                  <button onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)} className="flex items-center justify-between w-full text-zinc-500 hover:text-zinc-800 transition-colors">
                    <span className="text-base font-medium uppercase tracking-wide">Kategori</span>
                    <motion.div animate={{ rotate: isMobileCategoryOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isMobileCategoryOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 ml-4 flex flex-col gap-3 overflow-hidden">
                        {categories.map((cat) => (
                          <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="py-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors pl-2 border-l-2 border-transparent hover:border-zinc-800">
                            {cat}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search Bar Mobile */}
                <div className="py-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-200">
                    <Search size={18} className="text-zinc-400" />
                    <input type="text" placeholder="Cari produk..." className="flex-1 bg-transparent outline-none text-sm text-zinc-800 placeholder:text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Mobile Footer Links */}
              <div className="mt-auto px-6 py-8 border-t border-zinc-100 flex flex-col gap-4">
                <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider">Ikuti Kami</p>
                <div className="flex gap-6">
                  <a href="#" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
