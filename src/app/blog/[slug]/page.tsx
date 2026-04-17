import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, MoveRight } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '@/lib/mock-data/articles';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import StickyShareButton from '@/components/blog/StickyShareButton';
import { AnimatedPage, AnimatedSection } from '@/components/blog/AnimatedPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan | Kirana',
      description: 'Artikel yang Anda cari tidak tersedia.',
    };
  }

  const description =
    article.content
      .substring(0, 150)
      .replace(/<[^>]+>/g, '')
      .trim() + '...';

  return {
    title: `${article.title} | Jurnal Kirana`,
    description,
    openGraph: {
      title: article.title,
      description,
      images: [{ url: article.image }],
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 2);

  return (
    <>
      <ReadingProgressBar />
      <StickyShareButton title={article.title} slug={article.slug} />

      <AnimatedPage>
        <article className="min-h-screen bg-[#FAFAF8] text-zinc-900 selection:bg-zinc-200/50 pb-20">
          {/* 1. EDITORIAL HEADER (Rata Tengah) */}
          <AnimatedSection>
            <header className="pt-10 md:pt-20 pb-12 px-6 md:px-8 max-w-4xl mx-auto flex flex-col items-center text-center">
              {/* Tombol Kembali (Tetap di kiri atas) */}
              <div className="w-full flex justify-start mb-12 md:mb-16">
                <Link href="/blog" className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 hover:text-zinc-900 transition-colors group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                  <span>Kembali ke Jurnal</span>
                </Link>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 mb-6">
                <span className="text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">{article.category}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <div className="flex items-center gap-2">
                  <Calendar size={14} strokeWidth={1.5} />
                  <span>{article.date}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <div className="flex items-center gap-2">
                  <Clock size={14} strokeWidth={1.5} />
                  <span>{article.readingTime || '5 Menit'}</span>
                </div>
              </div>

              {/* Judul Utama */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.1] text-zinc-950 tracking-tight mb-8">{article.title}</h1>

              {/* Penulis */}
              <div className="flex items-center gap-3 text-zinc-500 text-sm font-light">
                <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden flex items-center justify-center">
                  <span className="font-serif text-zinc-500">K</span>
                </div>
                <div>
                  Oleh <span className="font-medium text-zinc-900">Tim Editorial Kirana</span>
                </div>
              </div>
            </header>
          </AnimatedSection>

          {/* 2. GAMBAR UTAMA (Breakout Layout - Lebih Lebar dari Teks) */}
          <AnimatedSection delay={0.1}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mb-16 md:mb-24">
              <div className="relative w-full bg-zinc-100 overflow-hidden rounded-xl md:rounded-2xl shadow-sm">
                {/* Mobile: Kotak | Desktop: Lebar Sinematik */}
                <div className="relative aspect-square md:aspect-video lg:aspect-21/9">
                  <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" priority />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 3. KONTEN ARTIKEL */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-0">
              <div
                className="prose prose-zinc prose-lg md:prose-xl max-w-none
                  /* Teks Dasar */
                  prose-p:text-zinc-800 prose-p:leading-[1.85] prose-p:font-light prose-p:mb-8
                  prose-a:text-zinc-950 prose-a:no-underline prose-a:border-b prose-a:border-zinc-300 hover:prose-a:border-zinc-950 transition-all
                  
                  /* Heading / Subjudul */
                  prose-headings:font-serif prose-headings:text-zinc-950 prose-headings:tracking-tight prose-headings:mt-16 prose-headings:mb-6
                  prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-medium prose-h2:border-b prose-h2:border-zinc-200 prose-h2:pb-4
                  prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:font-normal
                  
                  /* Efek Drop Cap & Lead Paragraph (Huruf pertama besar) */
                  prose-p:first-of-type:text-zinc-900 prose-p:first-of-type:text-xl md:prose-p:first-of-type:text-2xl prose-p:first-of-type:leading-relaxed
                  prose-p:first-of-type:first-letter:text-7xl md:prose-p:first-of-type:first-letter:text-8xl
                  prose-p:first-of-type:first-letter:font-serif prose-p:first-of-type:first-letter:text-zinc-950
                  prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:mr-4
                  prose-p:first-of-type:first-letter:mt-2 prose-p:first-of-type:first-letter:leading-[0.8]
                  
                  /* Blockquote (Kutipan) */
                  prose-blockquote:font-serif prose-blockquote:text-2xl md:prose-blockquote:text-3xl
                  prose-blockquote:text-zinc-900 prose-blockquote:font-light prose-blockquote:italic
                  prose-blockquote:border-l-0 prose-blockquote:relative prose-blockquote:pl-0 prose-blockquote:my-16
                  prose-blockquote:before:content-['\201C'] prose-blockquote:before:text-8xl prose-blockquote:before:text-zinc-200 prose-blockquote:before:absolute prose-blockquote:before:-top-10 prose-blockquote:before:-left-6
                  
                  /* Styling lainnya */
                  prose-li:text-zinc-800 prose-li:font-light
                  prose-strong:text-zinc-950 prose-strong:font-medium
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags & Footer Artikel */}
              <div className="mt-20 pt-10 border-t border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {(article.tags || ['Gaya Hidup', 'Esensial', 'Mode']).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm hover:border-zinc-400 hover:text-zinc-900 transition-all duration-300 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-zinc-400 font-light italic">Terakhir diperbarui pada {article.date}</div>
              </div>
            </div>
          </AnimatedSection>

          {/* 4. CERITA LAINNYA (Grid yang lebih bersih) */}
          <AnimatedSection delay={0.3}>
            <section className="max-w-6xl mx-auto px-6 md:px-8 mt-28 md:mt-36 pt-16 ">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                <h3 className="text-3xl md:text-4xl font-serif font-light text-zinc-900 tracking-tight">Bacaan Selanjutnya</h3>
                <Link href="/blog" className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-600 hover:text-zinc-900 group transition-all duration-300">
                  Jelajahi Semua Jurnal
                  <MoveRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.5} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.slug} href={`/blog/${relatedArticle.slug}`} className="group block">
                    <article className="space-y-6">
                      <div className="relative bg-zinc-100 overflow-hidden aspect-4/3 rounded-xl">
                        <Image src={relatedArticle.image} alt={relatedArticle.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                      <div className="space-y-3 px-2">
                        <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                          <span className="text-zinc-900">{relatedArticle.category}</span>
                          <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                          <span>{relatedArticle.date}</span>
                        </div>
                        <h4 className="font-serif text-2xl md:text-3xl font-normal text-zinc-950 group-hover:text-zinc-600 transition-colors leading-[1.3]">{relatedArticle.title}</h4>
                        <p className="text-zinc-600 text-sm font-light leading-relaxed line-clamp-2">{relatedArticle.content.substring(0, 120).replace(/<[^>]+>/g, '')}...</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </article>
      </AnimatedPage>
    </>
  );
}
