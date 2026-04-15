// components/BrandEthos.tsx
'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

export default function BrandEthos() {
  return (
    <section className="relative md:py-5 px-6 lg:px-16 flex items-center justify-center bg-[#FDFDFD] overflow-hidden border-t border-zinc-50">
      {/* Elemen Dekoratif samar di latar belakang (Opsional untuk tekstur) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <span className="text-[30vw] font-serif font-black tracking-tighter text-zinc-900">Ethos</span>
      </div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="relative z-10 max-w-4xl mx-auto text-center text-zinc-900 flex flex-col items-center">
        {/* Tanda Kutip - Dibuat sangat samar agar elegan */}
        <motion.div variants={fadeUp} className="mb-4">
          <span className="text-zinc-200 text-8xl md:text-9xl font-serif leading-none block h-16 md:h-20">"</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight md:leading-[1.2] mb-12 tracking-tight text-zinc-900">
          Kami percaya bahwa setiap pakaian adalah bentuk <br className="hidden md:block" />
          <span className="italic font-light text-zinc-400">ekspresi diri</span> yang paling murni.
        </motion.h2>

        {/* Garis vertikal & Signature yang bersih */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
          <div className="w-px h-20 bg-zinc-200" />
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-400 block">Filosofi Kirana</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-300 font-medium block">Est. 2026</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
