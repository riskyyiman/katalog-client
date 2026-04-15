'use client';

import { useProducts } from '@/hooks/useProducts';
import ProgressBar from '@/components/ProgressBar';
import HeroSection from '@/components/HeroSection';
import FAQSection from '@/components/FAQSection';
import ScrollingText from '@/components/ScrollingText';
import FeaturedCollection from '@/components/FeaturedCollection';
import BrandEthos from '@/components/BrandEthos';

export default function Home() {
  // Ambil data produk real dari backend melalui hook
  const { loading, products } = useProducts();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-200 overflow-x-hidden">
      {/* Indikator progress scroll di paling atas */}
      <ProgressBar />

      <main>
        {/* 1. Bagian pembuka dengan visual yang kuat */}
        <HeroSection />

        {/* 2. Teks berjalan untuk kesan dinamis & info promo */}
        <ScrollingText />

        {/* 3. Grid produk asimetris menggunakan data dari BE */}
        <FeaturedCollection products={products} loading={loading} />

        {/* 4. Section filosofi brand dengan gaya minimalis */}
        <BrandEthos />

        {/* 5. Daftar pertanyaan umum yang sudah diperbaiki error-nya */}
        <FAQSection />
      </main>
    </div>
  );
}
