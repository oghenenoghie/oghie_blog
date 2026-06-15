"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";
import { SectionBadge } from "@/components/geca/ui/SectionBadge";
import { VALUES } from "@/lib/geca-constants";

export function PhilosophySection() {
  return (
    <section className="py-[160px] bg-background overflow-hidden">
      <div className="container-geca">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          <motion.div
            className="relative min-h-[520px] lg:min-h-full rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=85"
              alt="GECA advisory team in discussion"
              fill
              className="object-cover"
              quality={85}
            />
            <div className="absolute inset-0 bg-background/40" />
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-background/90 to-transparent">
              <p className="font-cormorant text-2xl font-light italic text-text-primary leading-snug">
                &ldquo;We are not just advisors &mdash; we are partners in your most important decisions.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:pl-20 py-12 lg:py-0 flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
          >
            <SectionBadge>WHO WE ARE</SectionBadge>
            <h2 className="font-cormorant text-h2 font-light text-text-primary leading-snug">
              Transforming Complexity Into Competitive Advantage
            </h2>
            <GoldDivider />
            <p className="text-[17px] text-text-secondary leading-relaxed">
              GECA was founded with a singular conviction: that businesses in Africa and its diaspora deserve the same calibre of financial and legal advisory as those in the world&apos;s most developed markets.
            </p>
            <div className="space-y-5 pt-2">
              {VALUES.slice(0, 3).map((value, i) => (
                <motion.div
                  key={value.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                  <div>
                    <span className="font-playfair font-bold text-text-primary mr-2">{value.title}.</span>
                    <span className="text-text-secondary text-sm leading-relaxed">{value.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="pt-4">
              <Link href="/about">
                <motion.button
                  className="px-8 py-3 bg-gold text-background font-mono font-bold text-xs uppercase tracking-widest rounded hover:opacity-90 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn About Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
