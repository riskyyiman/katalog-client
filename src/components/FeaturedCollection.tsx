'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { imageReveal, fadeUp, staggerContainer } from '@/lib/animations';

interface Product {
  id: number;
  nama: string;
  category: string;
  harga: number;
  gambar: string;
}

export default function FeaturedCollection({ products, loading }: { products: Product[]; loading: boolean }) {
  // Mengambil 4 data pertama
  const featuredItems = products?.slice(0, 4) || [];

  if (loading) {
    return <div className="py-32 text-center font-serif italic text-zinc-400">Memuat koleksi terbaik...</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-15 md:py-32 px-6 lg:px-16 bg-[#FDFDFD]">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
          <div className="md:col-span-8">
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-serif text-zinc-900 leading-tight">
              Pilihan <span className="italic font-light text-zinc-400">Terbaik.</span>
            </motion.h2>
          </div>
          <div className="md:col-span-4">
            <motion.p variants={fadeUp} className="text-zinc-500 text-sm leading-relaxed border-l border-zinc-200 pl-6">
              Koleksi favorit yang paling banyak dicari. Siap membuat penampilanmu makin percaya diri.
            </motion.p>
          </div>
        </div>

        {/* Grid Container Product */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-10">
          {featuredItems[0] && (
            <motion.div variants={imageReveal} className="md:col-span-7 group cursor-pointer">
              <Link href={`/product/${featuredItems[0].id}`}>
                <div className="relative aspect-16/11 bg-zinc-100 overflow-hidden rounded-sm shadow-sm">
                  <Image src={featuredItems[0].gambar} fill alt={featuredItems[0].nama} className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center overflow-hidden">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-500">{featuredItems[0].category}</span>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">Lihat Detail &rarr;</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-transparent group-hover:border-zinc-200 pb-2 transition-colors duration-500">
                    <h3 className="text-2xl md:text-3xl font-serif text-zinc-900">{featuredItems[0].nama}</h3>
                    <span className="text-sm font-sans font-medium text-zinc-700">{formatPrice(featuredItems[0].harga)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Item 2: Kecil (5 Kolom) */}
          {featuredItems[1] && (
            <motion.div variants={imageReveal} className="md:col-span-5 flex flex-col justify-center">
              <Link href={`/product/${featuredItems[1].id}`} className="group cursor-pointer">
                <div className="relative aspect-4/5 bg-zinc-100 overflow-hidden rounded-sm shadow-sm">
                  <Image src={featuredItems[1].gambar} fill alt={featuredItems[1].nama} className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center overflow-hidden">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-500">{featuredItems[1].category}</span>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">Lihat Detail &rarr;</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-transparent group-hover:border-zinc-200 pb-2 transition-colors duration-500">
                    <h3 className="text-xl md:text-2xl font-serif text-zinc-900">{featuredItems[1].nama}</h3>
                    <span className="text-sm font-sans font-medium text-zinc-700">{formatPrice(featuredItems[1].harga)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Item 3: Kecil (5 Kolom) */}
          {featuredItems[2] && (
            <motion.div variants={imageReveal} className="md:col-span-5 flex flex-col justify-center md:order-3 order-4">
              <Link href={`/product/${featuredItems[2].id}`} className="group cursor-pointer">
                <div className="relative aspect-4/5 bg-zinc-100 overflow-hidden rounded-sm shadow-sm">
                  <Image src={featuredItems[2].gambar} fill alt={featuredItems[2].nama} className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center overflow-hidden">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-500">{featuredItems[2].category}</span>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">Lihat Detail &rarr;</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-transparent group-hover:border-zinc-200 pb-2 transition-colors duration-500">
                    <h3 className="text-xl md:text-2xl font-serif text-zinc-900">{featuredItems[2].nama}</h3>
                    <span className="text-sm font-sans font-medium text-zinc-700">{formatPrice(featuredItems[2].harga)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Item 4: Besar (7 Kolom) */}
          {featuredItems[3] && (
            <motion.div variants={imageReveal} className="md:col-span-7 group cursor-pointer md:order-4 order-3">
              <Link href={`/product/${featuredItems[3].id}`}>
                <div className="relative aspect-16/11 bg-zinc-100 overflow-hidden rounded-sm shadow-sm">
                  <Image src={featuredItems[3].gambar} fill alt={featuredItems[3].nama} className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center overflow-hidden">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-500">{featuredItems[3].category}</span>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-900 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">Lihat Detail &rarr;</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-transparent group-hover:border-zinc-200 pb-2 transition-colors duration-500">
                    <h3 className="text-2xl md:text-3xl font-serif text-zinc-900">{featuredItems[3].nama}</h3>
                    <span className="text-sm font-sans font-medium text-zinc-700">{formatPrice(featuredItems[3].harga)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Tombol Lihat Semua */}
        <motion.div variants={fadeUp} className="mt-28 text-center">
          <Link href="/katalog" className="inline-block text-xs font-sans font-medium uppercase tracking-[0.2em] border-b border-zinc-900 pb-2 hover:text-zinc-500 hover:border-zinc-500 transition-colors duration-300">
            Lihat Semua Koleksi
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
