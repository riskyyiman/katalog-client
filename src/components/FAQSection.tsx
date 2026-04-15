'use client';
import { useState } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { Truck, RotateCcw, ChevronDown, CreditCard, Ruler, Globe, Package } from 'lucide-react';

const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

type FAQ = { q: string; a: string; icon: React.ReactNode; category: string };

const faqData: FAQ[] = [
  {
    q: 'Pesanan sampai berapa lama?',
    a: 'Cepet kok! Kalau di Jakarta, 1-2 hari kerja aja. Di luar kota, sekitar 3-5 hari kerja. Kami pake kurir premium biar barangmu aman dan cepet sampai.',
    icon: <Truck size={20} strokeWidth={1.5} />,
    category: 'Pengiriman',
  },
  {
    q: 'Bisa ganti atau balikin barang?',
    a: 'Bisa banget! Kamu punya waktu 14 hari setelah barang diterima buat retur atau tukar ukuran. Syaratnya gampang: label masih terpasang dan bajunya belum dipakai ya.',
    icon: <RotateCcw size={20} strokeWidth={1.5} />,
    category: 'Kebijakan',
  },
  {
    q: 'Cara bayarnya pakai apa aja?',
    a: 'Banyak pilihan! Kamu bisa transfer ke BCA, Mandiri, atau BNI. Juga bisa pake kartu kredit (Visa/Mastercard), GoPay, OVO, atau ShopeePay. Semua udah aman terintegrasi kok.',
    icon: <CreditCard size={20} strokeWidth={1.5} />,
    category: 'Pembayaran',
  },
  {
    q: 'Bingung pilih ukuran yang pas?',
    a: 'Tenang, setiap produk udah ada Panduan Ukuran yang jelas. Tapi kalau masih ragu, tim kami siap bantu kasih rekomendasi ukuran yang paling pas buat kamu. Chat aja langsung!',
    icon: <Ruler size={20} strokeWidth={1.5} />,
    category: 'Panduan',
  },
  {
    q: 'Bisa kirim ke luar negeri nggak?',
    a: 'Bisa! Saat ini kami kirim ke Singapura, Malaysia, dan Australia. Kalau kamu di negara lain, yuk chat customer service kami. Nanti kita hitung bareng estimasi biayanya.',
    icon: <Globe size={20} strokeWidth={1.5} />,
    category: 'Pengiriman',
  },
  {
    q: 'Gimana cara lacak pesanan?',
    a: 'Gampang banget! Setelah pesanan dikirim, kamu bakal dapet email berisi nomor resi dan link buat lacak posisi barangmu. Bisa dipantau real-time dari rumah aja.',
    icon: <Package size={20} strokeWidth={1.5} />,
    category: 'Layanan',
  },
];

const FAQItem = ({ faq, idx }: { faq: FAQ; idx: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true, margin: '-50px' }} className="group border-b border-zinc-200 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex items-start md:items-center justify-between gap-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1">
          <div className="text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300">{faq.icon}</div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-400">{faq.category}</span>
            <h4 className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${isOpen ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'}`}>{faq.q}</h4>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springTransition} className="mt-2 md:mt-0">
          <ChevronDown size={24} className={isOpen ? 'text-zinc-900' : 'text-zinc-400'} strokeWidth={1} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={springTransition} className="overflow-hidden">
            <div className="pb-8 pt-2 md:pl-16 pr-6">
              <p className="font-sans text-sm md:text-base text-zinc-500 leading-relaxed max-w-2xl border-l-2 border-zinc-200 pl-4">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <section className="px-6 lg:px-16 py-32 bg-[#FDFDFD] border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-zinc-400"></span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-zinc-400">Layanan</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-serif text-zinc-900 mb-6 tracking-tight leading-none">
              Pertanyaan <br />
              <span className="italic font-light text-zinc-400">Umum.</span>
            </h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-sm mb-10">Temukan jawaban untuk pertanyaan seputar pengiriman, pengembalian, dan layanan eksklusif dari Kirana.</p>

            <a href="mailto:hello@kiranacatalog.com" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                <span className="font-serif italic font-medium">@</span>
              </div>
              <span className="text-xs font-sans uppercase tracking-widest font-bold text-zinc-900 group-hover:text-zinc-500 transition-colors">Hubungi Kami</span>
            </a>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="">
            {faqData.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
