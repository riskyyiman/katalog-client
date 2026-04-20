'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, X, ShoppingBag, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { Product, CartItem } from '@/types';

type TabOption = 'deskripsi' | 'spesifikasi' | 'ulasan';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabOption>('deskripsi');
  const [mainImage, setMainImage] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    setIsMounted(true);
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        const data: Product = response.data;
        setProduct(data);

        setMainImage(data.image_url || data.gambar || '');

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        } else {
          setSelectedSize('M');
        }
      } catch (err) {
        console.error('Gagal mengambil detail', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (!product) return;
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'inc' && quantity < product.stok) setQuantity(quantity + 1);
  };

  const addToCart = () => {
    if (!product || !selectedSize) {
      alert('Silakan pilih ukuran terlebih dahulu');
      return;
    }

    setIsAddingToCart(true);

    const cartItem: CartItem = {
      id: product.id,
      name: product.nama || product.name || '',
      price: product.harga || product.price || 0,
      image: mainImage,
      quantity,
      size: selectedSize,
    };

    const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item) => item.id === product.id && item.size === selectedSize);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } else {
      localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));
    }

    setTimeout(() => {
      setIsAddingToCart(false);
      setShowToast(true); // Munculkan notifikasi
      window.dispatchEvent(new CustomEvent('cartUpdated'));

      setTimeout(() => setShowToast(false), 5000);
    }, 600);
  };

  const handleWhatsApp = () => {
    if (!product || !selectedSize) return;
    const phoneNumber = '628123456789';
    const message = `Halo Admin Kirana, saya ingin memesan:%0A%0A*Produk:* ${product.nama}%0A*Ukuran:* ${selectedSize}%0A*Jumlah:* ${quantity}%0A*Total:* Rp ${(product.harga * quantity).toLocaleString('id-ID')}%0A%0ALink Produk: ${window.location.href}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isMounted || loading) return <div className="min-h-screen bg-white" />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif italic mb-4">Produk Tidak Ditemukan</h2>
          <Link href="/katalog" className="text-sm font-bold border-b border-black">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const gallery = [product.image_url || product.gambar || '', ...(product.additional_images || [])];

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 mb-8">
          <Link href="/katalog" className="hover:text-zinc-900">
            Katalog
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-zinc-900">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-bold">{product.nama}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-4/5 bg-zinc-50 rounded-2xl overflow-hidden shadow-sm">
              <Image src={mainImage || '/placeholder.png'} alt={product.nama} fill priority className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {gallery.map((img, idx) => (
                  <button key={idx} onClick={() => setMainImage(img)} className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${mainImage === img ? 'border-zinc-900 shadow-md' : 'border-transparent'}`}>
                    <Image src={img || '/placeholder.png'} alt="thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif italic text-zinc-900 mb-4">{product.nama}</h1>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-indigo-600">Rp {product.harga.toLocaleString('id-ID')}</span>
              {product.old_price && <span className="text-lg text-zinc-300 line-through">Rp {product.old_price.toLocaleString('id-ID')}</span>}
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">{product.deskripsi || 'Busana nusantara eksklusif dengan material premium untuk kenyamanan Anda.'}</p>

            {/* Size Picker */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Pilih Ukuran</span>
                <button onClick={() => setShowSizeGuide(true)} className="text-[10px] font-bold uppercase text-indigo-500 underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-xs font-bold transition-all border ${selectedSize === size ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-100 rounded-xl bg-zinc-50 overflow-hidden">
                  <button onClick={() => handleQuantity('dec')} className="px-4 py-3 hover:bg-zinc-100 text-zinc-400">
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                  <button onClick={() => handleQuantity('inc')} className="px-4 py-3 hover:bg-zinc-100 text-zinc-400">
                    +
                  </button>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-tighter">Stok: {product.stok} pcs</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={addToCart}
                  disabled={isAddingToCart || product.stok === 0}
                  className="bg-zinc-900 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:bg-zinc-200"
                >
                  {isAddingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                </button>
                <button onClick={handleWhatsApp} className="bg-[#25D366] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                  Beli via WhatsApp
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-zinc-100 pt-8">
              <div className="flex gap-8 mb-6 border-b border-zinc-50">
                {(['deskripsi', 'spesifikasi'] as TabOption[]).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-2 border-zinc-900 text-zinc-900' : 'text-zinc-300'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-zinc-500 font-light leading-relaxed">{activeTab === 'deskripsi' ? product.deskripsi : 'Material: 100% Premium Cotton. Berat: 250gr. Cutting: Relaxed Fit.'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Size Guide */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-6" onClick={() => setShowSizeGuide(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-serif italic mb-6">Panduan Ukuran</h3>
              <div className="space-y-4 text-sm text-zinc-500">
                <div className="flex justify-between border-b pb-2">
                  <span>Size S</span>
                  <span>LD 90cm, P 64cm</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Size M</span>
                  <span>LD 94cm, P 66cm</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Size L</span>
                  <span>LD 98cm, P 68cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Size XL</span>
                  <span>LD 102cm, P 70cm</span>
                </div>
              </div>
              <button onClick={() => setShowSizeGuide(false)} className="mt-8 w-full py-3 bg-zinc-100 rounded-xl text-xs font-bold uppercase">
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* notification toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 left-6 md:left-auto md:w-100 z-110"
          >
            <div className="bg-white border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden flex items-stretch">
              <div className="relative w-24 bg-zinc-50 shrink-0">
                <Image src={mainImage || '/placeholder.png'} alt="Added" fill className="object-cover" />
              </div>

              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 size={14} strokeWidth={3} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Berhasil Ditambahkan</span>
                  </div>
                  <button onClick={() => setShowToast(false)} className="text-zinc-300 hover:text-zinc-900 transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-zinc-900 line-clamp-1 mb-0.5">{product.nama}</h4>
                <p className="text-[11px] text-zinc-500 mb-4 font-medium">
                  Ukuran: {selectedSize} • Jumlah: {quantity}
                </p>

                <div className="flex gap-2">
                  <Link href="/cart" className="flex-2 bg-zinc-900 text-white py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                    Ke Keranjang <ArrowRight size={12} />
                  </Link>
                  <button onClick={() => setShowToast(false)} className="flex-1 px-3 py-2.5 border border-zinc-100 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-50 transition-all">
                    Nanti
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
