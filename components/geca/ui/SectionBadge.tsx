"use client";

import { motion } from "framer-motion";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionBadge({ children, className = "", delay = 0 }: SectionBadgeProps) {
  return (
    <motion.div
      className={`eyebrow ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
