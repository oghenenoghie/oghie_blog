"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/geca-constants";
import { SectionBadge } from "@/components/geca/ui/SectionBadge";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";

export function TestimonialsCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1);
      setCurrent((next + TESTIMONIALS.length) % TESTIMONIALS.length);
    },
    [current]
  );

  useEffect(() => {
    const id = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(id);
  }, [current, go]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.35 } }),
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="py-[140px] bg-surface border-y border-border overflow-hidden">
      <div className="container-geca">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionBadge>CLIENT VOICES</SectionBadge>
          <h2 className="font-cormorant text-h2 font-light text-text-primary mt-6">What Our Clients Say</h2>
          <GoldDivider className="mt-8 mx-auto w-24" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div className="min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="bg-elevated border border-border rounded-2xl p-10 md:p-14 relative">
                  <Quote size={48} strokeWidth={1} className="text-gold absolute top-8 left-10 opacity-40" />
                  <p className="font-cormorant text-2xl md:text-3xl font-light italic text-text-primary leading-relaxed mt-8 mb-10">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-gold">{t.initials}</span>
                    </div>
                    <div>
                      <p className="font-playfair font-bold text-text-primary text-sm">{t.name}</p>
                      <p className="font-mono text-xs text-text-secondary mt-0.5">{t.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => go(i)} aria-label={`Go to testimonial ${i + 1}`} className="transition-all duration-300">
                  <span className={`block h-1 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-gold" : "w-2 bg-border hover:bg-gold/40"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(current - 1)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold text-text-secondary transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(current + 1)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-gold bg-gold/10 text-gold hover:bg-gold hover:text-background transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
