'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Eksekusi Autentikasi langsung ke Firebase Client SDK
      await signInWithEmailAndPassword(auth, email, password);

      // Jika berhasil, arahkan pengguna ke halaman katalog pakaian
      router.push('/katalog');
    } catch (error: any) {
      console.error('Login error:', error.code);
      // Penerjemahan pesan error Firebase agar lebih ramah bagi pengguna
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMessage('Email atau kata sandi yang Anda masukkan salah.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage('Terlalu banyak percobaan gagal. Silakan coba beberapa saat lagi.');
      } else {
        setErrorMessage('Terjadi kesalahan sistem. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-sm">
        {/* Header Tampilan */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-serif font-bold tracking-tight text-zinc-900">
              Kirana<span className="text-indigo-500">.</span>
            </span>
          </Link>
          <h2 className="text-2xl font-serif italic text-zinc-900">
            Selamat <span className="text-zinc-400 font-light">Datang Kembali</span>
          </h2>
          <p className="mt-2 text-xs text-zinc-400 uppercase tracking-widest font-medium">Masuk untuk mengeksplorasi koleksi premium Anda</p>
        </div>

        {/* Notifikasi Error */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-xs font-medium"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Input */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Input Email */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-2">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-zinc-900 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700">Kata Sandi</label>
                <a href="#" className="text-[10px] text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-wider">
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={16} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-zinc-900 focus:bg-white transition-all duration-300"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-900 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:bg-zinc-200 disabled:text-zinc-400 shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Masuk Ke Akun</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Footer Card */}
        <div className="text-center pt-2 border-t border-zinc-100">
          <p className="text-xs text-zinc-500">
            Belum memiliki akun Kirana?{' '}
            <a href="#" className="font-bold text-zinc-900 hover:underline">
              Daftar Sekarang
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
