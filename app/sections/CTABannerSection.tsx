"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CTABannerSection() {
  return (
    <section className="relative py-[160px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80"
          alt="Handshake partnership"
          fill
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container-geca">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Ready to Begin</p>

          <h2 className="font-cormorant text-[clamp(40px,5vw,72px)] font-light text-text-primary leading-tight">
            Unlock Your Full
            <span className="block italic text-gold">Potential</span>
          </h2>

          <div className="w-16 h-px bg-gold mx-auto" />

          <p className="text-[17px] text-text-secondary leading-relaxed max-w-xl mx-auto">
            Let&apos;s discuss how GECA can transform your financial and legal challenges into strategic advantage.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <motion.button
                className="px-12 py-4 bg-gold text-background font-mono font-bold text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Schedule a Consultation
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="px-12 py-4 border-2 border-border text-text-secondary font-mono font-bold text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
