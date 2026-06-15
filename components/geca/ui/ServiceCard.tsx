"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  large?: boolean;
  delay?: number;
}

export function ServiceCard({ title, description, href, icon, large = false, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Link href={href}>
        <motion.div
          className={`relative group overflow-hidden rounded-lg border border-gold/30 bg-surface p-8 transition-all duration-300 hover:border-gold hover:bg-elevated hover:shadow-gold ${large ? "md:col-span-2 p-12" : ""}`}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {icon && <div className="mb-6 text-3xl text-gold">{icon}</div>}
          <h3 className="font-playfair text-2xl font-bold mb-3 text-text-primary">{title}</h3>
          <p className="text-text-secondary mb-6 leading-relaxed">{description}</p>
          <div className="flex items-center gap-2 text-gold font-mono text-sm uppercase tracking-wider">
            Learn More
            <motion.div className="inline-block" whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
              <ArrowRight size={16} />
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 border-2 border-gold rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
