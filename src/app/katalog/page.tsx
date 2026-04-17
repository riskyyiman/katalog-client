'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Search, X, Filter, ChevronDown, Grid3x3, LayoutList } from 'lucide-react';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

type SortOption = 'terbaru' | 'termurah' | 'termahal';

const easing = [0.25, 0.1, 0.25, 1] as const;

export default function KatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Gagal mengambil data produk:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['Semua', 'T-Shirt', 'Shirt', 'Outerwear', 'Pants', 'Aksesoris'];

  let displayedProducts = [...products];
  if (activeCategory !== 'Semua') {
    displayedProducts = displayedProducts.filter((p) => p.category === activeCategory);
  }
  if (searchQuery) {
    displayedProducts = displayedProducts.filter((p) => p.nama?.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (sortBy === 'termurah') displayedProducts.sort((a, b) => a.harga - b.harga);
  else if (sortBy === 'termahal') displayedProducts.sort((a, b) => b.harga - a.harga);
  else if (sortBy === 'terbaru') displayedProducts.sort((a, b) => b.id - a.id);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const activeFiltersCount = (activeCategory !== 'Semua' ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-100">
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 pt-12 lg:px-16 sm:pt-28 lg:pt-20 pb-12 lg:pb-16 border-b border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-8 md:w-12 h-px bg-zinc-900" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">Koleksi Premium</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif leading-[1.1] md:leading-[0.9] tracking-tighter mb-4 md:mb-8">
                Katalog <br />
                <span className="italic font-light text-zinc-400 pl-4 md:pl-8 lg:pl-16">Koleksi.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-zinc-500 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
                Temukan berbagai pilihan busana berkualitas yang dirancang khusus untuk menemani setiap gaya dan aktivitasmu sehari-hari.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="hidden md:flex gap-8 lg:gap-12 border-l border-zinc-100 pl-6 lg:pl-12">
              <div>
                <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Total Produk</p>
                <p className="text-2xl lg:text-3xl font-serif italic">{products.length}</p>
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Sedang Ditampilkan</p>
                <p className="text-2xl lg:text-3xl font-serif italic">{displayedProducts.length}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TOOLBAR / FILTERS */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-zinc-100' : 'bg-white/80 backdrop-blur-md border-b border-zinc-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-3 lg:py-4">
          {/* Desktop View */}
          <div className="hidden lg:flex lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300
                    ${activeCategory === cat ? 'bg-zinc-900 text-white shadow-md shadow-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Cari produk favorit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-zinc-50 border border-zinc-200 focus:border-zinc-300 rounded-full pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-zinc-50 border border-zinc-200 hover:border-zinc-300 rounded-full px-5 py-2 pr-8 text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer transition-all"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="termurah">Harga Terendah</option>
                  <option value="termahal">Harga Tertinggi</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>

              <div className="flex items-center gap-1 bg-zinc-50 rounded-full p-1 border border-zinc-200">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'}`}>
                  <Grid3x3 size={15} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'}`}>
                  <LayoutList size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-700 active:scale-95 transition-transform">
                <Filter size={16} />
                <span>Filter</span>
                {activeFiltersCount > 0 && <span className="w-4 h-4 bg-zinc-800 text-white text-[9px] rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-9 pr-8 py-2 text-sm outline-none focus:ring-1 focus:ring-zinc-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <X size={14} />
                  </button>
                )}
              </div>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="bg-zinc-100 border-none rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-wider outline-none">
                <option value="terbaru">Terbaru</option>
                <option value="termurah">Termurah</option>
                <option value="termahal">Termahal</option>
              </select>
            </div>

            <AnimatePresence>
              {isMobileFilterOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-3 pt-3 border-t border-zinc-100 overflow-hidden">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all
                          ${activeCategory === cat ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {activeFiltersCount > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <p className="text-[9px] text-zinc-400">Filter aktif: {activeFiltersCount}</p>
                      <button
                        onClick={() => {
                          setActiveCategory('Semua');
                          setSearchQuery('');
                        }}
                        className="text-[9px] text-zinc-500 underline"
                      >
                        Reset semua
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active Filters Chips - Desktop */}
          {activeFiltersCount > 0 && (
            <div className="hidden lg:flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100">
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider mr-2">Filter aktif:</span>
              {activeCategory !== 'Semua' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 rounded-full">
                  <span className="text-[10px] text-zinc-700">{activeCategory}</span>
                  <button onClick={() => setActiveCategory('Semua')} className="text-zinc-400 hover:text-zinc-900">
                    <X size={12} />
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 rounded-full">
                  <span className="text-[10px] text-zinc-700">Pencarian: {searchQuery}</span>
                  <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-zinc-900">
                    <X size={12} />
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setActiveCategory('Semua');
                  setSearchQuery('');
                }}
                className="text-[9px] text-zinc-400 hover:text-zinc-900 underline ml-2"
              >
                Hapus semua
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT GRID / LIST */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div
              key={activeCategory + searchQuery + sortBy + viewMode}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-12' : 'flex flex-col gap-4 sm:gap-6'}
            >
              {displayedProducts.map((product) => (
                <motion.div key={product.id} variants={fadeUp} layout>
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-zinc-100 aspect-3/4 rounded-sm" />
                  <div className="space-y-2 px-1">
                    <div className="h-2 bg-zinc-100 w-1/3 rounded-full" />
                    <div className="h-3 bg-zinc-100 w-full rounded-full" />
                    <div className="h-2 bg-zinc-100 w-2/3 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* EMPTY STATE */}
        {!loading && displayedProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 lg:py-40 text-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6 lg:mb-8">
              <Search className="text-zinc-200" size={28} strokeWidth={1} />
            </div>
            <h3 className="text-xl lg:text-2xl font-serif text-zinc-900 mb-2">Produk Tidak Ditemukan</h3>
            <p className="text-zinc-400 text-xs lg:text-sm max-w-xs mb-6 lg:mb-8">Yuk coba cari dengan kata kunci lain atau lihat kategori produk lainnya.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Semua');
              }}
              className="inline-flex items-center gap-3 group text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900"
            >
              Reset Filter
              <div className="w-6 lg:w-8 h-px bg-zinc-900 group-hover:w-8 lg:group-hover:w-12 transition-all duration-500" />
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
