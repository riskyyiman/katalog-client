'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="fixed top-0 left-0 right-0 h-0.75 bg-linear-to-r from-zinc-900 via-zinc-700 to-zinc-900 origin-left z-50" style={{ scaleX }} />;
}
