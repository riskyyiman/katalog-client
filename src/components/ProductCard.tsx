import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const id = product.id;
  const name = product.nama || product.name || 'Premium Item';
  const category = product.category || 'Collection';
  const price = product.harga || product.price || 0;
  const imageUrl = product.image_url || product.gambar || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600';

  return (
    <div className="group relative flex flex-col w-full font-sans">
      {/* 1. Image & Interactive Area */}
      <div className="relative w-full aspect-4/5 rounded-[20px] overflow-hidden bg-zinc-50 isolate">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />

        {/* Seamless Soft Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none z-10" />

        {/* Hover Floating Action */}
        <div className="absolute bottom-5 left-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75 z-20">
          <div className="w-full py-3.5 bg-white/80 backdrop-blur-md text-zinc-900 text-[10px] font-bold tracking-[0.15em] uppercase text-center rounded-xl border border-white/20 shadow-xl transition-colors hover:bg-white">
            Lihat Produk
          </div>
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="mt-5 flex flex-col px-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col">
            {/* Category */}
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-1.5 block">{category}</span>

            {/* Product Name */}
            <h3 className="text-base text-zinc-900 font-medium tracking-tight leading-snug">
              <Link href={`/product/${id}`} className="focus:outline-none">
                {/* Trik a11y: Link menutupi seluruh card */}
                <span className="absolute inset-0 z-30" aria-hidden="true" />
                {name}
              </Link>
            </h3>
          </div>

          {/* Price Badge */}
          <div className="shrink-0 mt-1">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-100 text-[13px] font-semibold text-zinc-900 tracking-wide">Rp {price.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
