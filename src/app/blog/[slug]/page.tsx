// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';

// Data artikel - Pastikan data ini sinkron dengan blog/page.tsx
const articles = [
  {
    slug: 'seni-memilih-bahan-katun',
    title: 'Seni Memilih Bahan Katun Premium untuk Cuaca Tropis',
    category: 'Tips & Trick',
    date: '08 April 2026',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80',
    content: `
      <p>Memilih pakaian untuk cuaca tropis seperti di Indonesia bukan hanya soal gaya, tapi soal kenyamanan bernapas bagi kulit Anda. Bahan katun telah lama menjadi primadona, namun tidak semua katun diciptakan sama.</p>
      <h3>Kenapa Katun Premium Berbeda?</h3>
      <p>Katun premium seperti Combed 30s atau Supima memiliki serat yang lebih panjang dan halus. Hal ini memungkinkan sirkulasi udara yang jauh lebih baik dibandingkan bahan sintetis.</p>
      <p>Teksturnya yang lembut juga mengurangi risiko iritasi pada kulit sensitif saat berkeringat. Inilah alasan mengapa investasi pada material berkualitas adalah hal mutlak bagi lemari pakaian Anda.</p>
      <blockquote>"Kenyamanan adalah kunci utama dari kepercayaan diri. Memilih material yang tepat adalah langkah pertama."</blockquote>
      <p>Di Kirana, kami memastikan setiap helai kain telah melewati uji daya serap keringat agar Anda tetap merasa segar meski beraktivitas di bawah terik matahari seharian.</p>
    `,
  },
  {
    slug: 'eksplorasi-warna-bumi',
    title: 'Eksplorasi Warna Bumi: Koleksi Terbaru Nusantara Series',
    category: 'Koleksi',
    date: '05 April 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80',
    content: `
      <p>Warna-warna tanah menghadirkan kehangatan dan kedalaman yang tak tertandingi. Koleksi Nusantara Series kami terinspirasi dari kekayaan alam Indonesia, mulai dari pegunungan hingga pesisir pantai.</p>
      <h3>Palet Warna Musim Ini</h3>
      <p>Dari cokelat tanah (terracotta) hingga hijau daun (sage green), setiap warna dipilih untuk melengkapi tone kulit Asia dan mudah dipadukan dengan berbagai gaya harian.</p>
    `,
  },
  {
    slug: 'tren-desain-minimalis',
    title: 'Mengapa Desain Minimalis Menjadi Tren Abadi di Indonesia',
    category: 'Editorial',
    date: '01 April 2026',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80',
    content: `
      <p>"Less is more" bukan sekadar slogan. Desain minimalis menawarkan fleksibilitas dan keabadian yang sulit ditandingi oleh tren cepat yang datang dan pergi dalam hitungan bulan.</p>
      <h3>Fungsi Menemui Estetika</h3>
      <p>Di tengah hiruk pikuk perkotaan, pakaian minimalis menjadi oase ketenangan. Tidak berlebihan, namun tetap berkarakter kuat melalui potongan siluet yang presisi.</p>
    `,
  },
];

// 1. Perbaikan generateMetadata (Async Params)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Not Found' };

  return {
    title: `${article.title} - Kirana Journal`,
    description: article.title,
  };
}

// 2. Blog Detail Page Component
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pb-24 selection:bg-zinc-100">
      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-16 px-6 lg:px-16 bg-white border-b border-zinc-50">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Kembali ke Journal
          </Link>

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <span className="text-zinc-900 border-b border-zinc-900 pb-0.5">{article.category}</span>
              <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>{article.date}</span>
              </div>
              <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>5 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] text-zinc-900 tracking-tighter">{article.title}</h1>
          </div>
        </div>
      </header>

      {/* --- FEATURED IMAGE --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 mb-20">
        <div className="relative aspect-video md:aspect-21/9 rounded-sm overflow-hidden shadow-2xl">
          <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1200px" priority />
        </div>
      </div>

      {/* --- ARTICLE BODY --- */}
      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        <div
          className="prose prose-zinc prose-lg lg:prose-xl max-w-none 
          prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-zinc-900
          prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:font-light
          prose-blockquote:italic prose-blockquote:text-zinc-500 prose-blockquote:border-l-zinc-200 prose-blockquote:font-serif prose-blockquote:text-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* --- FOOTER ARTICLE --- */}
        <div className="mt-20 pt-10 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Tag size={16} className="text-zinc-300" />
            <div className="flex gap-2">
              {['Fashion', 'Lifestyle', 'Nusantara'].map((tag) => (
                <span key={tag} className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 border border-zinc-100 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors duration-300">
            <Share2 size={16} />
            Bagikan Cerita
          </button>
        </div>
      </div>

      {/* --- RELATED STORIES --- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 mt-32">
        <div className="flex items-center justify-between mb-12 border-b border-zinc-100 pb-6">
          <h3 className="text-2xl font-serif italic text-zinc-900 font-medium">Cerita Lainnya</h3>
          <Link href="/blog" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors">
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles
            .filter((a) => a.slug !== slug)
            .slice(0, 2)
            .map((relatedArticle) => (
              <Link key={relatedArticle.slug} href={`/blog/${relatedArticle.slug}`} className="group">
                <div className="relative aspect-video bg-zinc-100 rounded-sm overflow-hidden mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image src={relatedArticle.image} alt={relatedArticle.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h4 className="font-serif text-xl text-zinc-900 group-hover:text-zinc-500 transition-colors leading-snug">{relatedArticle.title}</h4>
                <p className="text-[9px] uppercase tracking-wider text-zinc-400 mt-3 font-bold">{relatedArticle.category}</p>
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
