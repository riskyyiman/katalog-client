// src/app/blog/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

// Definisi Tipe Data untuk Artikel
interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  description: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Seni Memilih Bahan Katun Premium untuk Cuaca Tropis',
    category: 'Tips & Trick',
    date: '08 April 2026',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80',
    slug: 'seni-memilih-bahan-katun',
    description: 'Kenali ciri-ciri bahan katun premium yang nyaman dipakai seharian di cuaca tropis Indonesia.',
  },
  {
    id: 2,
    title: 'Eksplorasi Warna Bumi: Koleksi Terbaru Nusantara Series',
    category: 'Koleksi',
    date: '05 April 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    slug: 'eksplorasi-warna-bumi',
    description: 'Temukan kehangatan warna-warna alam yang terinspirasi dari kekayaan budaya Nusantara.',
  },
  {
    id: 3,
    title: 'Mengapa Desain Minimalis Menjadi Tren Abadi di Indonesia',
    category: 'Editorial',
    date: '01 April 2026',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
    slug: 'tren-desain-minimalis',
    description: 'Simplicity is the ultimate sophistication. Kenapa gaya minimalis selalu digemari.',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen pb-20 selection:bg-zinc-100">
      {/* --- HEADER SIMPLE --- */}
      <section className="pt-32 pb-16 px-6 text-center border-b border-zinc-50">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-zinc-900 mb-4 italic tracking-tight">Kirana Journal</h1>
          <p className="text-zinc-400 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Cerita, Gaya, dan Inspirasi</p>
        </motion.div>
      </section>

      {/* --- GRID ARTIKEL --- */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {articles.map((article) => (
            <motion.article key={article.id} variants={fadeUp} className="group cursor-pointer">
              {/* Image Wrapper */}
              <Link href={`/blog/${article.slug}`}>
                <div className="relative overflow-hidden mb-6 bg-zinc-100 aspect-3/4 rounded-sm shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                  <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  {/* Overlay tipis saat hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              </Link>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span className="text-zinc-900 border-b border-zinc-900 pb-0.5">{article.category}</span>
                  <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
                  <span>{article.date}</span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-2xl font-serif text-zinc-900 leading-tight group-hover:text-zinc-500 transition-colors duration-300">{article.title}</h2>
                </Link>

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-light">{article.description}</p>

                <div className="pt-2">
                  <Link href={`/blog/${article.slug}`} className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 inline-flex items-center gap-2 group/link">
                    Baca Selengkapnya
                    <span className="block w-6 h-px bg-zinc-900 transition-all duration-300 group-hover/link:w-10"></span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
