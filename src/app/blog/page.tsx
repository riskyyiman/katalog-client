import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Definisi Tipe Data untuk Artikel
interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

// Metadata untuk SEO
export const metadata: Metadata = {
  title: 'Kirana Journal - Inspirasi Busana Nusantara',
  description: 'Temukan cerita di balik setiap helai kain dan tren fashion nusantara terbaru.',
};

const articles: Article[] = [
  {
    id: 1,
    title: 'Seni Memilih Bahan Katun Premium untuk Cuaca Tropis',
    category: 'Tips & Trick',
    date: '08 April 2026',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80',
    slug: 'seni-memilih-bahan-katun',
  },
  {
    id: 2,
    title: 'Eksplorasi Warna Bumi: Koleksi Terbaru Nusantara Series',
    category: 'Koleksi',
    date: '05 April 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    slug: 'eksplorasi-warna-bumi',
  },
  {
    id: 3,
    title: 'Mengapa Desain Minimalis Menjadi Tren Abadi di Indonesia',
    category: 'Editorial',
    date: '01 April 2026',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
    slug: 'tren-desain-minimalis',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Journal */}
      <section className="pt-28 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mb-4 italic tracking-tight">Kirana Journal</h1>
        <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Cerita, Gaya, dan Inspirasi</p>
      </section>

      {/* Grid Artikel */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              {/* Image Wrapper dengan Optimasi Next.js Image */}
              <Link href={`/blog/${article.slug}`}>
                <div className="relative overflow-hidden mb-6 bg-zinc-100 aspect-3/4 rounded-sm">
                  <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
              </Link>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                  <span className="text-zinc-400">{article.date}</span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-xl font-serif text-zinc-900 leading-snug group-hover:text-indigo-600 transition-colors">{article.title}</h2>
                </Link>

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-light">Temukan inspirasi terbaru mengenai tren fashion dan bagaimana kami memilih material terbaik untuk kenyamanan Anda...</p>

                <div className="pt-2">
                  <Link href={`/blog/${article.slug}`} className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1 group-hover:text-indigo-600 group-hover:border-indigo-600 transition-all">
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
