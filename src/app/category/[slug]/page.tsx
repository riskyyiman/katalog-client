// dynamic berdasarkan slug kategori
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Tipe untuk State Sorting
type SortOption = 'terbaru' | 'termurah' | 'termahal';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');

  const categoryTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Kategori';

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        //  Ambil data asli dari API Backend Express
        const response = await api.get('/products');

        // Logika Filter Spesial
        let filtered = response.data.filter((item: Product) => {
          const dbCategory = item.category.toLowerCase();
          const urlParam = slug.toLowerCase();

          if (urlParam === 'outer') {
            return dbCategory === 'outer' || dbCategory === 'outerwear';
          }
          return dbCategory === urlParam;
        });

        // Logika Sorting
        if (sortBy === 'termurah') {
          filtered.sort((a: Product, b: Product) => a.harga - b.harga);
        } else if (sortBy === 'termahal') {
          filtered.sort((a: Product, b: Product) => b.harga - a.harga);
        } else if (sortBy === 'terbaru') {
          // Menggunakan ID sebagai fallback jika createdAt tidak ada
          filtered.sort((a: Product, b: Product) => b.id - a.id);
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Gagal sinkronisasi dengan database:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCategoryProducts();
  }, [slug, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-zinc-50 py-16 md:py-24 border-b border-zinc-100">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center text-center">
          <nav className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-6 flex gap-2">
            <Link href="/katalog" className="hover:text-zinc-900 transition-colors">
              Kategori
            </Link>
            <span>/</span>
            <span className="text-zinc-900 font-bold uppercase">{categoryTitle}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4 tracking-tight italic">Koleksi {categoryTitle}</h1>
          <p className="text-sm text-zinc-500 max-w-md leading-relaxed font-light">Menampilkan pilihan produk {categoryTitle.toLowerCase()} dari katalog resmi Kirana.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Toolbar: Info & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-zinc-100 gap-4">
          <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold">Ditemukan {products.length} Produk</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Urutkan:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="text-xs bg-transparent border-none text-zinc-900 focus:ring-0 cursor-pointer outline-none font-bold uppercase tracking-widest">
              <option value="terbaru">Terbaru</option>
              <option value="termurah">Harga Terendah</option>
              <option value="termahal">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Product Grid  */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-zinc-100 aspect-3/4 rounded-2xl mb-4" />
                <div className="h-3 bg-zinc-100 w-3/4 rounded-full mb-2" />
                <div className="h-3 bg-zinc-100 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-32 border-2 border-dashed border-zinc-50 rounded-3xl">
            <div className="text-4xl mb-4 opacity-20">📦</div>
            <h3 className="text-lg font-light text-zinc-400 mb-2">Produk {categoryTitle} belum tersedia.</h3>
            <Link href="/katalog" className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              Lihat Semua Koleksi
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
