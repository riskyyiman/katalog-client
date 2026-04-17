'use client';

import { useProducts } from '@/hooks/useProducts';
import ProgressBar from '@/components/ProgressBar';
import HeroSection from '@/components/HeroSection';
import FAQSection from '@/components/FAQSection';
import ScrollingText from '@/components/ScrollingText';
import FeaturedCollection from '@/components/FeaturedCollection';
import BrandEthos from '@/components/BrandEthos';

export default function Home() {
  // ambil data produk real dari backend melalui hook
  const { loading, products } = useProducts();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 selection:bg-zinc-200 overflow-x-hidden">
      <ProgressBar />

      <main>
        <HeroSection />

        <ScrollingText />

        <FeaturedCollection products={products} loading={loading} />

        <BrandEthos />

        <FAQSection />
      </main>
    </div>
  );
}
