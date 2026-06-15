"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Briefcase, Zap } from "lucide-react";
import { SERVICES } from "@/lib/geca-constants";
import { SectionBadge } from "@/components/geca/ui/SectionBadge";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";

const ICONS: Record<string, React.ReactNode> = {
  "financial-tax":   <TrendingUp size={28} strokeWidth={1.5} />,
  "estate-planning": <Shield size={28} strokeWidth={1.5} />,
  mergers:           <Briefcase size={28} strokeWidth={1.5} />,
  "private-equity":  <Zap size={28} strokeWidth={1.5} />,
};

export function ServicesCarouselSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(next: number) {
    setDirection(next > active ? 1 : -1);
    setActive((next + SERVICES.length) % SERVICES.length);
  }

  const service = SERVICES[active];
  const pillars = (service.pillars as { title: string; body: string }[]).slice(0, 3);

  const contentVariants = {
    enter: (d: number) => ({ opacity: 0, y: d * 20 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, y: d * -16, transition: { duration: 0.3 } }),
  };

  return (
    <section className="py-[160px] bg-surface border-y border-border overflow-hidden">
      <div className="container-geca">
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionBadge>WHAT WE DO</SectionBadge>
          <h2 className="font-cormorant text-h2 font-light text-text-primary mt-6 leading-snug">
            Comprehensive Advisory for Every Stage
          </h2>
          <GoldDivider className="mt-8 mx-auto w-24" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-full border transition-all duration-300 ${
                i === active
                  ? "bg-gold text-background border-gold"
                  : "border-border text-text-secondary hover:border-gold/60 hover:text-gold"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="relative min-h-[440px] flex items-stretch">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-elevated border border-border rounded-2xl overflow-hidden"
            >
              <div className="p-10 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <div className="text-gold mb-6">{ICONS[service.id]}</div>
                  <h3 className="font-cormorant text-3xl md:text-4xl font-light text-text-primary leading-snug mb-4">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-8">{service.overview}</p>
                </div>
                <Link href={`/services/${service.slug}`}>
                  <motion.span
                    className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gold hover:gap-5 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <span>Explore {service.title}</span>
                    <span>&rarr;</span>
                  </motion.span>
                </Link>
              </div>

              <div className="p-10 md:p-14 flex flex-col gap-8">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Key Areas</p>
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.15, duration: 0.45 }}
                    className="flex gap-4"
                  >
                    <div className="w-px bg-gold/40 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-playfair font-bold text-text-primary mb-1">{pillar.title}</p>
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{pillar.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8">
          <span className="font-mono text-xs text-text-secondary">
            {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => go(active - 1)}
              aria-label="Previous service"
              className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold text-text-secondary transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(active + 1)}
              aria-label="Next service"
              className="w-10 h-10 rounded-full border border-gold bg-gold/10 text-gold hover:bg-gold hover:text-background transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/services" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gold hover:gap-5 transition-all duration-300">
            <span>View All Services</span>
            <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
