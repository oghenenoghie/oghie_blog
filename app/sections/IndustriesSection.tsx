"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/geca-constants";

const DOUBLED = [...INDUSTRIES, ...INDUSTRIES];

export function IndustriesSection() {
  return (
    <section className="bg-surface border-y border-border py-20 overflow-hidden">
      <motion.p
        className="text-center font-mono text-xs uppercase tracking-[0.3em] text-text-tertiary mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Sectors We Serve
      </motion.p>

      <div className="relative">
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {DOUBLED.map((industry, i) => (
            <div key={i} className="inline-flex items-center gap-8 px-10">
              <span className="font-cormorant text-2xl font-light text-text-primary tracking-wide">{industry}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
