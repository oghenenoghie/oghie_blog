"use client";

import { motion } from "framer-motion";

interface GoldDividerProps {
  className?: string;
  animated?: boolean;
  delay?: number;
}

export function GoldDivider({ className = "", animated = true, delay = 0 }: GoldDividerProps) {
  if (!animated) {
    return <div className={`h-px bg-gold ${className}`} />;
  }

  return (
    <motion.div
      className={`h-px bg-gold ${className}`}
      initial={{ scaleX: 0, transformOrigin: "left" }}
      animate={{ scaleX: 1, transformOrigin: "left" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}
