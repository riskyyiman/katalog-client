// src/app/blog/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, Mail } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  description: string;
}

// Data artikel diperbanyak dengan bahasa yang formal dan elegan
const articles: Article[] = [
  {
    id: 1,
    title: 'Simfoni Siluet: Mendefinisikan Ulang Keanggunan Minimalis',
    category: 'Editorial',
    date: '16 April 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    slug: 'simfoni-siluet-keanggunan-minimalis',
    description: 'Sebuah eksplorasi mendalam tentang bagaimana potongan pakaian yang sederhana dapat memancarkan karisma yang tak lekang oleh waktu. Kesederhanaan adalah wujud tertinggi dari kecanggihan.',
  },
  {
    id: 2,
    title: 'Panduan Esensial: Merawat Serat Alami Katun dan Linen',
    category: 'Tips & Trick',
    date: '12 April 2026',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80',
    slug: 'panduan-merawat-serat-alami',
    description: 'Pertahankan kualitas dan kelembutan koleksi pakaian Anda dengan langkah-langkah perawatan tepat yang dirancang khusus untuk serat alami.',
  },
  {
    id: 3,
    title: 'Warna Bumi: Membawa Kehangatan Alam ke Dalam Lemari Anda',
    category: 'Koleksi',
    date: '08 April 2026',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
    slug: 'koleksi-warna-bumi',
    description: 'Menyambut musim baru dengan palet warna terakota, zaitun, dan krem yang terinspirasi dari ketenangan lanskap alam Nusantara.',
  },
  {
    id: 4,
    title: 'Jejak Berkelanjutan: Komitmen Kirana pada Mode Ramah Lingkungan',
    category: 'Editorial',
    date: '05 April 2026',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80',
    slug: 'komitmen-mode-berkelanjutan',
    description: 'Pelajari bagaimana kami mengintegrasikan praktik berkelanjutan dalam setiap jahitan, dari pemilihan material hingga proses produksi yang etis.',
  },
  {
    id: 5,
    title: 'Seni Berlapis: Memadukan Pakaian Luar untuk Cuaca Tropis',
    category: 'Tips & Trick',
    date: '02 April 2026',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80',
    slug: 'seni-berlapis-cuaca-tropis',
    description: 'Tampil gaya dengan teknik layering tanpa merasa gerah. Temukan panduan memadukan outerwear ringan untuk aktivitas sehari-hari.',
  },
  {
    id: 6,
    title: 'Di Balik Layar: Proses Kreatif Seri Kapsul Monokrom',
    category: 'Koleksi',
    date: '28 Maret 2026',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80',
    slug: 'proses-kreatif-kapsul-monokrom',
    description: 'Mengintip ruang kerja desainer kami dalam meracik koleksi kapsul terbaru yang mengedepankan fungsionalitas dan estetika monokromatik.',
  },
  {
    id: 7,
    title: 'Aksesori Esensial: Sentuhan Akhir yang Menyempurnakan Penampilan',
    category: 'Tips & Trick',
    date: '24 Maret 2026',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80',
    slug: 'aksesori-esensial-penampilan',
    description: 'Kurasi aksesori minimalis yang wajib Anda miliki untuk mentransformasi gaya kasual menjadi penampilan yang penuh pernyataan.',
  },
];

export default function EditorialBlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Tips & Trick', 'Koleksi', 'Editorial'];

  // Logika Penyaringan (Filtering)
  let displayedArticles = [...articles];
  if (activeCategory !== 'Semua') {
    displayedArticles = displayedArticles.filter((a) => a.category === activeCategory);
  }
  if (searchQuery) {
    displayedArticles = displayedArticles.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  const featuredArticle = displayedArticles[0];
  const remainingArticles = displayedArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-200">
      {/* HEADER EDITORIAL RESMI */}
      <header className="px-4 sm:px-6 lg:px-16 pt-15 md:pt-28 pb-5 max-w-360 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-zinc-200 pb-8 gap-8">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-6xl md:text-8xl lg:text-[9rem] font-serif leading-none tracking-tighter">
            Jurnal<span className="italic font-light text-zinc-400">.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="max-w-sm text-zinc-500 text-sm md:text-base font-light leading-relaxed lg:text-right">
            Selamat datang di ruang editorial Kirana. Tempat kami merangkum inspirasi, filosofi desain, dan cerita di balik setiap mahakarya.
          </motion.div>
        </div>

        {/* NATURAL LANGUAGE FILTER - Interaktif & Humanis */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="py-12 text-xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-zinc-400 max-w-5xl">
          Saya berminat untuk menjelajahi tulisan tentang{' '}
          <span className="relative inline-block group">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="appearance-none bg-transparent text-zinc-900 border-b-[3px] border-zinc-900 pb-1 pr-8 cursor-pointer focus:outline-none transition-colors group-hover:text-zinc-600 group-hover:border-zinc-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-900 text-xl group-hover:text-zinc-600 transition-colors">↓</span>
          </span>
          {', '}
          serta mencari pembahasan spesifik mengenai{' '}
          <input
            type="text"
            placeholder="gaya, material, atau tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-b-[3px] border-zinc-300 focus:border-zinc-900 text-zinc-900 pb-1 w-48 md:w-64 lg:w-88 placeholder-zinc-300 outline-none transition-colors italic"
          />
        </motion.div>
      </header>

      {/* KONTEN ARTIKEL */}
      <main className="px-4 sm:px-6 lg:px-16 pb-24 max-w-360 mx-auto">
        <AnimatePresence mode="wait">
          {displayedArticles.length > 0 ? (
            <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-24 lg:space-y-32">
              {/* ARTIKEL UTAMA (SOROTAN) */}
              {featuredArticle && (
                <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-8 overflow-hidden aspect-4/3 lg:aspect-16/10 bg-zinc-100 relative">
                    <Link href={`/blog/${featuredArticle.slug}`}>
                      <Image src={featuredArticle.image} alt={featuredArticle.title} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" priority sizes="(max-width: 1024px) 100vw, 66vw" />
                    </Link>
                  </div>
                  <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
                      <span className="text-zinc-900">{featuredArticle.category}</span>
                      <span className="w-8 h-px bg-zinc-300"></span>
                      <span>{featuredArticle.date}</span>
                    </div>
                    <Link href={`/blog/${featuredArticle.slug}`}>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 leading-[1.1] mb-6 group-hover:text-zinc-500 transition-colors">{featuredArticle.title}</h2>
                    </Link>
                    <p className="text-zinc-500 leading-relaxed mb-10 font-light text-base">{featuredArticle.description}</p>
                    <div>
                      <Link href={`/blog/${featuredArticle.slug}`} className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 group/btn">
                        Baca Selengkapnya
                        <span className="bg-zinc-50 p-4 rounded-full group-hover/btn:bg-zinc-900 group-hover/btn:text-white transition-all duration-500 group-hover/btn:scale-110">
                          <MoveRight size={16} strokeWidth={1.5} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* GRID ARTIKEL DINAMIS (ZIG-ZAG PATTERN) */}
              {remainingArticles.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-sm font-serif italic text-zinc-500">Bacaan Terkini</h3>
                    <div className="flex-1 h-px bg-zinc-200"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-20 gap-x-8 lg:gap-x-12">
                    {remainingArticles.map((article, index) => {
                      // Logika untuk membuat pola asimetris dinamis (Kiri lebar, Kanan sempit -> Kiri sempit, Kanan lebar)
                      const isWide = index % 4 === 0 || index % 4 === 3;
                      const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';
                      const aspectClass = isWide ? 'aspect-[4/3]' : 'aspect-[3/4]';

                      return (
                        <article key={article.id} className={`group ${colSpanClass} flex flex-col`}>
                          <Link href={`/blog/${article.slug}`} className={`relative overflow-hidden mb-6 bg-zinc-100 w-full ${aspectClass}`}>
                            <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                          </Link>
                          <div className="grow flex flex-col">
                            <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
                              <span className="text-zinc-900">{article.category}</span>
                              <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                              <span>{article.date}</span>
                            </div>
                            <Link href={`/blog/${article.slug}`}>
                              <h3 className="text-2xl lg:text-3xl font-serif text-zinc-900 leading-[1.2] mb-4 group-hover:text-zinc-500 transition-colors">{article.title}</h3>
                            </Link>
                            <p className="text-zinc-500 text-sm leading-relaxed font-light mb-8">{article.description}</p>
                            <div className="mt-auto">
                              <Link href={`/blog/${article.slug}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 inline-flex items-center gap-3 group/link">
                                Telusuri
                                <span className="block w-8 h-px bg-zinc-900 transition-all duration-500 group-hover/link:w-16"></span>
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* KONDISI KOSONG (EMPTY STATE) */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center border-t border-zinc-100">
              <h3 className="text-3xl font-serif text-zinc-900 mb-4">Pencarian Tidak Ditemukan</h3>
              <p className="text-zinc-500 max-w-md mx-auto mb-10 font-light leading-relaxed">Mohon maaf, kami tidak menemukan jurnal yang selaras dengan kata kunci yang Anda masukkan. Silakan sesuaikan kembali pencarian Anda.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
              >
                Atur Ulang Pencarian
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEWSLETTER SECTION - Fitur Khas Website Resmi */}
        <section className="mt-32 pt-24 border-t border-zinc-200">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-8 h-8 mx-auto text-zinc-300 mb-6" strokeWidth={1} />
            <h3 className="text-2xl font-serif text-zinc-900 mb-3">Dapatkan Inspirasi Terkini</h3>
            <p className="text-zinc-500 font-light text-sm mb-8">Berlangganan buletin kami untuk menerima kurasi editorial, panduan gaya terbaru, dan penawaran eksklusif langsung di kotak masuk Anda.</p>
            <form className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Alamat surel Anda" className="w-full bg-zinc-50 border border-zinc-200 px-6 py-4 text-sm outline-none focus:border-zinc-900 transition-colors" required />
              <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors whitespace-nowrap">
                Berlangganan
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
