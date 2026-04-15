import { Variants, BezierDefinition } from 'framer-motion';

export const easing: BezierDefinition = [0.6, 0.01, -0.05, 0.95];

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easing },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1.5, ease: easing },
  },
};

export const letterSpace: Variants = {
  hidden: { opacity: 0, letterSpacing: '-0.05em', filter: 'blur(5px)' },
  show: {
    opacity: 1,
    letterSpacing: '0em',
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easing },
  },
};

export const snappySpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};
