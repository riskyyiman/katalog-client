'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

        // SOLUSI ERROR LN 72: Berikan fallback string kosong "" agar tidak undefined
        setMainImage(data.image_url || data.gambar || '');

        // SOLUSI ERROR LN 73: Pastikan ada nilai string yang valid
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
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }, 500);
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
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 mb-8">
          <Link href="/" className="hover:text-zinc-900">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-zinc-900">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-bold">{product.nama}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            {/* SOLUSI WARNING: aspect-[4/5] menjadi aspect-4/5 */}
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

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif italic text-zinc-900 mb-4">{product.nama}</h1>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-indigo-600">Rp {product.harga.toLocaleString('id-ID')}</span>
              {/* SOLUSI ERROR old_price: Properti sudah didaftarkan di interface */}
              {product.old_price && <span className="text-lg text-zinc-300 line-through">Rp {product.old_price.toLocaleString('id-ID')}</span>}
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">{product.deskripsi || 'Busana nusantara eksklusif dengan material premium untuk kenyamanan Anda.'}</p>

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

      <AnimatePresence>
        {showSizeGuide && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowSizeGuide(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white p-8 rounded-3xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
}
