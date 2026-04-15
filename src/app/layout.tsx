import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

//  Update Metadata agar sesuai dengan Brand Kirana
export const metadata: Metadata = {
  title: {
    default: 'Kirana - Busana Nusantara',
    template: '%s | Kirana', // Ini akan membuat title dinamis (contoh: Katalog | Kirana)
  },
  description: 'Eksplorasi harmoni tradisi dan gaya modern dalam setiap helai kain premium Kirana.',
  keywords: ['fashion', 'nusantara', 'katalog baju', 'kirana', 'pakaian premium'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        {/* Navbar akan muncul di semua halaman */}
        <Navbar />

        {/* Main content (halaman-halaman yang kita buat sebelumnya) */}
        <main className="grow">{children}</main>

        {/* Footer akan muncul di bagian bawah setiap halaman */}
        <Footer />
      </body>
    </html>
  );
}
