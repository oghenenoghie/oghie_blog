"use client";

import { motion } from "framer-motion";
import { TRUST_BAR_STATS } from "@/lib/geca-constants";

export function TrustBarSection() {
  return (
    <section className="bg-surface border-y border-border py-24 overflow-hidden">
      <div className="container-geca">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {TRUST_BAR_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center py-6 px-4 ${index < TRUST_BAR_STATS.length - 1 ? "border-r border-border" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-cormorant text-[clamp(36px,4vw,52px)] font-bold text-gold leading-none mb-2">
                {stat.number}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
