'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import axios from 'axios'; // Gunakan axios murni untuk polling independen
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, X, AlertTriangle, CheckCircle2, Loader2, ShieldCheck, CreditCard, MessageSquare } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import api from '@/lib/api';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, loading: authLoading, getIdToken } = useAuth();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'MIDTRANS' | 'WHATSAPP'>('MIDTRANS');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setIsMounted(true);
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // 🔄 EFFECT POLLING FIX: Menggunakan axios murni untuk menghindari bentrokan config header
  useEffect(() => {
    if (!activeOrderId) return;

    const pollInterval = setInterval(async () => {
      try {
        const token = await getIdToken();
        const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:5000/graphql';

        const checkResponse = await axios.post(
          graphqlUrl,
          {
            query: `
              query CheckStatus($id: ID!) {
                order(id: $id) {
                  status
                }
              }
            `,
            variables: { id: activeOrderId },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const currentStatus = checkResponse.data?.data?.order?.status;

        if (currentStatus === 'PAID') {
          clearInterval(pollInterval);
          setActiveOrderId(null);

          try {
            (window as any).snap.close();
          } catch (e) {}

          clearCart();
          router.push('/order-success');
        }
      } catch (err) {
        console.log('Memantau status transaksi via GraphQL...', err);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [activeOrderId, getIdToken, clearCart, router]);

  const triggerRemove = (item: CartItem) => {
    setItemToDelete(item);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id, itemToDelete.size);
      setToastMessage(`${itemToDelete.name} telah dihapus`);
      setShowToast(true);
      setShowConfirm(false);
      setItemToDelete(null);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0 || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = await getIdToken();

      const variables = {
        items: JSON.stringify(
          cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),
        ),
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
      };

      const response = await api.post(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:5000/graphql',
        {
          query: `
            mutation CreateNewOrder($items: String!, $totalPrice: Int!, $paymentMethod: String!) {
              createOrder(items: $items, totalPrice: $totalPrice, paymentMethod: $paymentMethod) {
                id
                snap_token
              }
            }
          `,
          variables: variables,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      const { id, snap_token } = response.data.data.createOrder;

      if (paymentMethod === 'MIDTRANS') {
        if (!snap_token) {
          throw new Error('Gagal mendapatkan token pembayaran dari server Midtrans.');
        }

        setActiveOrderId(id);

        (window as any).snap.pay(snap_token, {
          onSuccess: function (result: any) {
            setActiveOrderId(null);
            clearCart();
            router.push('/order-success');
          },
          onPending: function (result: any) {
            setToastMessage('Selesaikan transaksi Anda melalui aplikasi simulator.');
            setShowToast(true);
          },
          onError: function (result: any) {
            setActiveOrderId(null);
            alert('Pembayaran gagal dilakukan, silakan coba kembali.');
          },
          onClose: function () {
            setToastMessage('Selesaikan proses pembayaran Anda pada jendela simulator.');
            setShowToast(true);
          },
        });
      }

      // 📲 JALUR B FIX: Menggunakan encodeURIComponent agar karakter '#' tidak merusak struktur teks WhatsApp
      else if (paymentMethod === 'WHATSAPP') {
        const phoneNumber = '6281226727458';

        let txt = `Halo Admin Kirana, saya ingin memesan produk berikut:\n\n`;
        txt += `*ID Invoice:* #${id}\n`;
        txt += `*Status:* Menunggu Verifikasi Manual\n\n`;

        cart.forEach((item, idx) => {
          txt += `${idx + 1}. *${item.name}* (${item.size}) x${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
        });
        txt += `\n*Total Pembayaran:* Rp ${totalPrice.toLocaleString('id-ID')}`;

        clearCart();
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(txt)}`, '_blank');
      }
    } catch (error: any) {
      setActiveOrderId(null);
      console.error('Gagal memproses transaksi:', error);
      alert(error.message || 'Terjadi kesalahan sistem saat memproses pesanan Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted || authLoading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-zinc-400" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-10 mb-10 md:pt-20 relative">
      <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'YOUR_CLIENT_KEY'} strategy="lazyOnload" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col mb-12">
          <Link href="/katalog" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-4 group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-medium">Kembali Belanja</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif italic text-zinc-900">
            Keranjang <span className="text-zinc-400 font-light">Anda</span>
          </h1>
        </div>

        {cart.length === 0 ? (
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
            <div className="lg:col-span-8 space-y-6">
              <div className="hidden md:grid grid-cols-12 pb-4 border-b border-zinc-100 text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-2">
                <div className="col-span-6">Produk</div>
                <div className="col-span-3 text-center">Jumlah</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col md:grid md:grid-cols-12 items-center gap-6 group"
                  >
                    <div className="flex items-center gap-4 md:col-span-6 w-full">
                      <div className="relative w-20 h-24 md:w-24 md:h-32 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                        <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 80px, 96px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 text-sm md:text-base leading-tight mb-1">{item.name}</h3>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-medium">Size: {item.size}</p>
                        <button onClick={() => triggerRemove(item)} className="flex items-center gap-1.5 text-zinc-300 hover:text-red-500 transition-colors text-[10px] uppercase font-bold tracking-tighter">
                          <Trash2 size={12} /> Hapus
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center md:col-span-3 w-full">
                      <div className="flex items-center border border-zinc-100 rounded-full px-2 py-1 bg-zinc-50/50">
                        <button onClick={() => updateQuantity(item.id, item.size, 'dec', (item as any).stok || 0)} className="p-2 hover:text-zinc-900 text-zinc-400 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-bold text-sm w-10 text-center text-zinc-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, 'inc', (item as any).stok || 0)} className="p-2 hover:text-zinc-900 text-zinc-400 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-3 text-right w-full">
                      <p className="font-bold text-zinc-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <h2 className="text-2xl font-serif italic mb-6 relative z-10">
                  Ringkasan <br /> Pesanan
                </h2>

                <div className="mb-8 relative z-10">
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Metode Pembayaran</label>
                  <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('MIDTRANS')}
                      className={`flex flex-col items-center justify-center py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all gap-1.5 ${
                        paymentMethod === 'MIDTRANS' ? 'bg-white text-zinc-900 shadow-lg' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <CreditCard size={14} />
                      <span>Otomatis (QRIS)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('WHATSAPP')}
                      className={`flex flex-col items-center justify-center py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all gap-1.5 ${
                        paymentMethod === 'WHATSAPP' ? 'bg-white text-zinc-900 shadow-lg' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare size={14} />
                      <span>Manual (WA)</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex justify-between text-zinc-400 text-xs uppercase tracking-[0.2em]">
                    <span>Subtotal</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-xs uppercase tracking-[0.2em]">
                    <span>Pengiriman</span>
                    <span className="italic text-[10px] lowercase text-zinc-400">{paymentMethod === 'MIDTRANS' ? 'gratis' : 'hitung manual'}</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-sm font-medium">Total Estimasi</span>
                    <span className="text-2xl font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="w-full bg-white text-zinc-900 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Mengunci Stok...</span>
                    </>
                  ) : paymentMethod === 'MIDTRANS' ? (
                    <>
                      <span>Bayar Otomatis Sekarang</span>
                    </>
                  ) : (
                    <>
                      <span>Checkout Ke WhatsApp</span>
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-zinc-400 uppercase tracking-widest text-center leading-relaxed">
                  <ShieldCheck size={12} className="text-indigo-400" />
                  <span>GraphQL Encrypted & Secured Transaction</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Hapus Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-200 flex items-center justify-center p-6"
            onClick={() => setShowConfirm(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifikasi */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 z-210 w-[90%] md:w-auto"
          >
            <div className="bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-75">
              <div className="bg-green-500 p-1 rounded-full">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Informasi</p>
                <p className="text-xs font-medium">{toastMessage}</p>
              </div>
              <button onClick={() => setShowToast(false)} className="text-zinc-500 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
