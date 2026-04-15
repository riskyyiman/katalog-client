'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, letterSpace, imageReveal } from '@/lib/animations';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-[#FDFDFD]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-black text-zinc-100/80 select-none z-0">KIRANA</div>

      <div className="container mx-auto px-6 lg:px-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="lg:col-span-5 order-2 lg:order-1">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-zinc-400"></span>
                <div className="relative">
                  <span className="text-[10px]  md:text-[15px] tracking-[0.4em] uppercase text-zinc-400 font-medium px-3">Temukan Gayamu, Mulai Hari Ini</span>
                </div>
              </div>
            </motion.div>

            <motion.h1 variants={letterSpace} className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-8 tracking-tighter text-zinc-900">
              Tampil <br />
              <span className="italic font-light text-zinc-400  md:pl-16 lg:pl-16 whitespace-nowrap">Percaya Diri.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-zinc-500 max-w-sm mb-10 leading-relaxed text-sm">
              Koleksi fashion premium yang nyaman dipakai sehari-hari. Dari desain lokal berkualitas untuk kamu yang ingin tampil maksimal.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-8">
              <Link href="/katalog" className="group relative px-10 py-5 bg-zinc-900 text-white text-[10px] uppercase tracking-widest overflow-hidden rounded-sm transition-all duration-300">
                <span className="relative z-10">Lihat Koleksi</span>
                <div className="absolute inset-0 bg-zinc-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={imageReveal} className="lg:col-span-7 order-1 lg:order-2 relative px-4">
            <div className="relative aspect-4/5 w-full max-w-xl ml-auto rounded-tl-[6rem] rounded-br-[6rem] overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" alt="Model tampil percaya diri dengan koleksi Kirana" fill priority className="object-cover object-top" />
            </div>
            <motion.div variants={fadeUp} className="absolute -bottom-5 left-52.5 bg-white p-8 hidden md:block shadow-xl border border-zinc-100 max-w-55">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-2">Kualitas Premium</p>
              <p className="text-sm font-serif italic text-zinc-800">Nyaman dipakai seharian dengan bahan terbaik</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
