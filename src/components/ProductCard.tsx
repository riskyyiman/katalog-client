'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/product/${product.id}`} className="group block">
        <div className="flex gap-4 sm:gap-6 items-start bg-white border border-zinc-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 bg-zinc-100 rounded-lg sm:rounded-xl overflow-hidden">
            <Image src={product.gambar} alt={product.nama} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-400 mb-0.5 sm:mb-1">{product.category}</p>
            <h3 className="font-serif text-sm sm:text-base md:text-lg text-zinc-900 mb-1 sm:mb-2 group-hover:text-zinc-600 transition-colors line-clamp-2">{product.nama}</h3>
            <p className="text-xs sm:text-sm font-medium text-zinc-800">{formatPrice(product.harga)}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-3/4 bg-zinc-100 rounded-sm overflow-hidden mb-3 sm:mb-4">
        <Image src={product.gambar} alt={product.nama} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      <div className="space-y-1 px-0.5 sm:px-1">
        <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-400">{product.category}</p>
        <h3 className="font-serif text-sm sm:text-base lg:text-lg text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">{product.nama}</h3>
        <p className="text-xs sm:text-sm font-medium text-zinc-800">{formatPrice(product.harga)}</p>
      </div>
    </Link>
  );
}
