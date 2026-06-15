"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PullQuoteProps {
  children: React.ReactNode;
  className?: string;
}

export function PullQuote({ children, className = "" }: PullQuoteProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.blockquote
      ref={ref}
      className={`font-cormorant text-h2 italic text-gold leading-relaxed ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      &ldquo;{children}&rdquo;
    </motion.blockquote>
  );
}
