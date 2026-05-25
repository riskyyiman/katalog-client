'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

export default function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post(process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:5000/graphql', {
        query: `
        mutation CreateUser($nama: String!, $email: String!, $password: String!) {
          registerUser(nama: $nama, email: $email, password: $password) {
            id
            nama
            email
          }
        }
      `,
        variables: {
          nama,
          email,
          password,
        },
      });

      // Interseptor jika server mengembalikan pesan error dari resolver
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      if (response.data.data.registerUser) {
        setSuccessMessage('Akun Kirana Anda berhasil dibuat!');

        // Jeda 2 detik untuk memberikan efek transisi visual sukses yang mewah kepada pengguna
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error.message);
      setErrorMessage(error.message || 'Terjadi kesalahan sistem saat mendaftar.');
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
            Daftar <span className="text-zinc-400 font-light">Akun Baru</span>
          </h2>
          <p className="mt-2 text-xs text-zinc-400 uppercase tracking-widest font-medium">Bergabung untuk mulai mengeksplorasi koleksi premium</p>
        </div>

        {/* Notifikasi Status (Error / Sukses) */}
        <AnimatePresence mode="popLayout">
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

          {successMessage && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-4 rounded-xl flex items-center gap-3 text-xs font-medium">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Input Registrasi */}
        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            {/* Input Nama Lengkap */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <User size={16} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-zinc-900 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-2">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={16} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 Karakter"
                  className="block w-full pl-11 pr-12 py-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-zinc-900 focus:bg-white transition-all duration-300"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Tombol Submit Pendaftaran */}
          <button
            type="submit"
            disabled={isLoading || successMessage !== ''}
            className="w-full bg-zinc-900 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:bg-zinc-200 disabled:text-zinc-400 shadow-sm mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Membuat Akun...</span>
              </>
            ) : (
              <>
                <span>Daftar Akun</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Footer Card */}
        <div className="text-center pt-2 border-t border-zinc-100">
          <p className="text-xs text-zinc-500">
            Sudah memiliki akun Kirana?{' '}
            <Link href="/login" className="font-bold text-zinc-900 hover:underline">
              Masuk Di Sini
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
