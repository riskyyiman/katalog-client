'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-zinc-100 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-zinc-100/50 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full -mr-16 -mt-16 blur-2xl" />

        {/* Animasi Checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-zinc-950 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-zinc-950/20"
        >
          <CheckCircle2 size={36} className="text-white" />
        </motion.div>

        {/* Teks Informasi */}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-serif italic text-zinc-900 mb-3">
          Pembayaran <span className="text-zinc-400 font-light">Berhasil</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs mx-auto">
          Terima kasih! Pesanan Anda telah kami terima dan stok pakaian telah berhasil dikunci dengan aman di sistem.
        </motion.p>

        {/* Tombol Kembali */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <Link href="/katalog" className="flex items-center justify-center gap-2 bg-zinc-950 text-white py-4 px-8 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition-all shadow-md group">
            <span>Lanjut Belanja</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
