'use client';
import { motion } from 'framer-motion';

export default function ScrollingText() {
  const brandMessages = [
    { text: '#KiranaStyle', style: 'font-mono font-bold italic' },
    { text: 'DESAIN LOKAL', style: 'font-serif italic' },
    { text: 'NUSANTARA MODERN', style: 'font-serif italic' },
    { text: 'STYLE WITH CONFIDENCE', style: 'font-serif italic' },
  ];

  const duplicatedMessages = [...brandMessages, ...brandMessages, ...brandMessages, ...brandMessages];

  return (
    <div className="mt-20 py-12 md:py-16 bg-linear-to-r from-white via-zinc-50 to-white border-y border-zinc-200 overflow-hidden select-none">
      <motion.div
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 100,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex whitespace-nowrap gap-16 md:gap-20 items-center"
        style={{ width: 'max-content' }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-16 md:gap-20">
            {duplicatedMessages.map((msg, idx) => (
              <div key={idx} className="flex items-center gap-16 md:gap-20">
                <span className={`text-3xl md:text-5xl lg:text-6xl ${msg.style} text-zinc-900`}>{msg.text}</span>
                <div className="w-2 h-2 bg-zinc-400 rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
