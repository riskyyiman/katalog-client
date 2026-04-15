'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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

  // Fungsi pembantu untuk simpan ke localStorage & Trigger Event
  const saveAndSync = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Memberitahu Navbar untuk update angka di icon keranjang
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
    const phoneNumber = '628123456789';
    let message = 'Halo Admin Kirana, saya ingin memesan daftar barang berikut:%0A%0A';

    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (${item.size}) x${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}%0A`;
    });

    message += `%0A*Total Keseluruhan:* Rp ${totalPrice.toLocaleString('id-ID')}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isMounted) return <div className="min-h-screen bg-gray-50" />;

  return (
    <div className="bg-gray-50 min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-serif font-bold mb-8 text-gray-900 italic">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-gray-500 mb-6 text-lg">Keranjang kamu masih kosong nih.</p>
            <Link href="/katalog" className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List Item */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center border border-gray-50">
                  <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Ukuran: {item.size}</p>
                    <p className="font-bold text-indigo-600 mt-2">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeItem(index)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
                      <button onClick={() => updateQuantity(index, 'dec')} className="px-3 py-1 hover:bg-gray-200 text-gray-600">
                        -
                      </button>
                      <span className="px-3 font-medium text-sm w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, 'inc')} className="px-3 py-1 hover:bg-gray-200 text-gray-600">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Pesanan */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                <h2 className="text-xl font-bold mb-6 font-serif italic">Ringkasan Pesanan</h2>
                <div className="flex justify-between mb-4 pb-4 border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Total Harga</span>
                  <span className="font-bold text-lg text-zinc-900">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-6 italic">*Belum termasuk ongkos kirim</p>
                <button onClick={checkoutWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100">
                  Checkout via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
