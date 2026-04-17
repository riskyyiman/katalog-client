'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const saveAndSync = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const updateQuantity = (index: number, type: 'inc' | 'dec') => {
    const newCart = [...cartItems];
    if (type === 'inc') {
      newCart[index].quantity += 1;
    } else if (type === 'dec' && newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    saveAndSync(newCart);
  };

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    saveAndSync(newCart);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkoutWhatsApp = () => {
    const phoneNumber = '6281226727458';
    let message = 'Halo Admin Kirana, saya ingin memesan daftar barang berikut:%0A%0A';
    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (${item.size}) x${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}%0A`;
    });
    message += `%0A*Total Keseluruhan:* Rp ${totalPrice.toLocaleString('id-ID')}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-10 md:pt-30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col mb-12">
          <Link href="/katalog" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-4 group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-medium">Kembali Belanja</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif italic text-zinc-900">
            Keranjang <span className="text-zinc-400 font-light">Anda</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-zinc-100 rounded-3xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-zinc-300" size={32} />
            </div>
            <h2 className="text-xl font-medium text-zinc-900 mb-2">Keranjang Anda Kosong</h2>
            <p className="text-zinc-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">Sepertinya Anda belum menambahkan koleksi apapun ke dalam keranjang.</p>
            <Link href="/katalog" className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
              Lihat Koleksi Terbaru
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* List Item */}
            <div className="lg:col-span-8 space-y-6">
              <div className="hidden md:grid grid-cols-12 pb-4 border-b border-zinc-100 text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-2">
                <div className="col-span-6">Produk</div>
                <div className="col-span-3 text-center">Jumlah</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-zinc-50 flex flex-col md:grid md:grid-cols-12 items-center gap-6 group"
                  >
                    {/* Image & Info */}
                    <div className="flex items-center gap-4 md:col-span-6 w-full">
                      <div className="relative w-20 h-24 md:w-24 md:h-32 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 text-sm md:text-base leading-tight mb-1">{item.name}</h3>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-medium">Size: {item.size}</p>
                        <button onClick={() => removeItem(index)} className="flex items-center gap-1.5 text-zinc-300 hover:text-red-500 transition-colors text-[10px] uppercase font-bold tracking-tighter">
                          <Trash2 size={12} /> Hapus
                        </button>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex justify-center md:col-span-3 w-full">
                      <div className="flex items-center border border-zinc-100 rounded-full px-2 py-1 bg-zinc-50/50">
                        <button onClick={() => updateQuantity(index, 'dec')} className="p-2 hover:text-zinc-900 text-zinc-400 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-bold text-sm w-10 text-center text-zinc-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, 'inc')} className="p-2 hover:text-zinc-900 text-zinc-400 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-3 text-right w-full">
                      <p className="font-bold text-zinc-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-32 overflow-hidden">
                {/* Dekorasi Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                <h2 className="text-2xl font-serif italic mb-8 relative z-10">
                  Ringkasan <br />
                  Pesanan
                </h2>

                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex justify-between text-zinc-400 text-xs uppercase tracking-[0.2em]">
                    <span>Subtotal</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-xs uppercase tracking-[0.2em]">
                    <span>Pengiriman</span>
                    <span className="italic text-[10px]">Dihitung saat checkout</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-sm font-medium">Total Estimasi</span>
                    <span className="text-2xl font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  onClick={checkoutWhatsApp}
                  className="w-full bg-white text-zinc-900 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  Checkout Ke WhatsApp
                </button>

                <p className="text-[9px] text-zinc-500 mt-6 text-center uppercase tracking-widest leading-relaxed">Dengan menekan tombol checkout, pesanan akan diteruskan langsung ke WhatsApp Admin Kirana.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
