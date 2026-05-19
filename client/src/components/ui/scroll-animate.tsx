'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollAnimate({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffset[direction] }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function ScrollStagger({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function ScrollStaggerItem({ children, className }: ScrollStaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
