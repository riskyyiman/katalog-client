'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Link2, Mail } from 'lucide-react';

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface StickyShareButtonProps {
  title: string;
  slug: string;
}

export default function StickyShareButton({ title, slug }: StickyShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: FacebookIcon,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank'),
      color: 'hover:bg-blue-50 hover:text-blue-600',
    },
    {
      name: 'Twitter',
      icon: TwitterIcon,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`, '_blank'),
      color: 'hover:bg-sky-50 hover:text-sky-500',
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => (window.location.href = `mailto:?subject=${title}&body=Baca artikel menarik: ${shareUrl}`),
      color: 'hover:bg-gray-50 hover:text-gray-900',
    },
    {
      name: 'Copy Link',
      icon: Link2,
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link berhasil disalin!');
      },
      color: 'hover:bg-zinc-50 hover:text-zinc-900',
    },
  ];

  return (
    <>
      <div className="hidden lg:block fixed left-8 top-1/3 z-40">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex flex-col items-center gap-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 [writing-mode:vertical-lr]">Share</span>
          <div className="w-px h-12 bg-zinc-300"></div>
          <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-zinc-100">
            <Share2 size={18} className="text-zinc-700 group-hover:text-zinc-900 transition-colors" strokeWidth={1.5} />
          </button>
        </motion.div>
      </div>

      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <button onClick={() => setIsOpen(!isOpen)} className="px-6 py-3 bg-zinc-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium">
            <Share2 size={16} strokeWidth={1.5} />
            Bagikan
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-zinc-900">Bagikan Cerita</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-100 rounded-full transition-colors">
                  <X size={18} className="text-zinc-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.action();
                      if (option.name !== 'Copy Link') setIsOpen(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-200 transition-all ${option.color}`}
                  >
                    <option.icon size={24} />
                    <span className="text-xs font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
