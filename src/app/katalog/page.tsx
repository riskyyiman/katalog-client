'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Tambahkan Variants
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

type SortOption = 'terbaru' | 'termurah' | 'termahal';

// 1. Definisikan easing sebagai konstanta koordinat agar tidak dianggap number[]
const easing = [0.25, 0.1, 0.25, 1] as const;

export default function KatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

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

  const categories: string[] = ['Semua', 'T-Shirt', 'Shirt', 'Outerwear', 'Pants', 'Aksesoris'];

  let displayedProducts = [...products];

  if (activeCategory !== 'Semua') {
    displayedProducts = displayedProducts.filter((p) => p.category === activeCategory);
  }

  if (searchQuery) {
    displayedProducts = displayedProducts.filter((p) => p.nama?.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (sortBy === 'termurah') {
    displayedProducts.sort((a, b) => a.harga - b.harga);
  } else if (sortBy === 'termahal') {
    displayedProducts.sort((a, b) => b.harga - a.harga);
  } else if (sortBy === 'terbaru') {
    displayedProducts.sort((a, b) => b.id - a.id);
  }

  // 2. Berikan tipe data Variants pada objek animasi
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    // 3. Update class bg-gradient menjadi bg-linear sesuai linter
    <div className="min-h-screen bg-linear-to-b from-white to-zinc-50/50">
      <section className="relative px-6 lg:px-16 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-50 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-stone-50 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="lg:col-span-7">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-stone-600">Koleksi Terkurasi</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]">
                  Katalog <br />
                  <span className="font-serif text-stone-400 italic">Produk</span>
                </h1>
                <p className="text-stone-500 text-base lg:text-lg max-w-lg leading-relaxed font-light">Temukan harmoni dalam berpakaian melalui kurasi produk terbaik kami yang dirancang untuk kenyamanan dan estetika modern.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm border border-stone-100 p-6 rounded-2xl shadow-sm">
                  <p className="text-stone-400 text-[11px] uppercase tracking-wider font-medium mb-2">Total Koleksi</p>
                  <p className="text-4xl font-serif font-light text-stone-800">{products.length}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-stone-100 p-6 rounded-2xl shadow-sm">
                  <p className="text-stone-400 text-[11px] uppercase tracking-wider font-medium mb-2">Hasil Filter</p>
                  <p className="text-4xl font-serif font-light text-stone-800">{displayedProducts.length}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex items-center justify-between gap-6">
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all 
                  ${activeCategory === cat ? 'bg-stone-800 text-white' : 'text-stone-400 hover:bg-stone-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-1 lg:flex-none justify-end">
            <div className="relative flex-1 lg:w-64">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 text-sm rounded-full focus:ring-1 focus:ring-stone-800 outline-none"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-stone-50 border border-stone-200 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full outline-none cursor-pointer"
            >
              <option value="terbaru">Terbaru</option>
              <option value="termurah">Termurah</option>
              <option value="termahal">Termahal</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div key={activeCategory + searchQuery + sortBy} variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {displayedProducts.map((product) => (
                <motion.div key={product.id} variants={fadeUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  {/* 4. Update aspect-[3/4] menjadi aspect-3/4 */}
                  <div className="bg-stone-100 aspect-3/4 rounded-2xl" />
                  <div className="h-3 bg-stone-100 w-2/3 rounded-full" />
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {!loading && displayedProducts.length === 0 && (
          <div className="text-center py-32 border border-dashed border-stone-100 rounded-3xl">
            <p className="text-stone-400 font-serif italic text-xl">Koleksi Tidak Ditemukan</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Semua');
              }}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 underline"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
