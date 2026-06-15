"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INSIGHTS } from "@/lib/geca-constants";
import { SectionBadge } from "@/components/geca/ui/SectionBadge";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";

const PAGE_SIZE = 3;
const TOTAL_PAGES = Math.ceil(INSIGHTS.length / PAGE_SIZE);

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function InsightsCarouselSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(next: number) {
    if (next < 0 || next >= TOTAL_PAGES) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  }

  const visible = INSIGHTS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.3 } }),
  };

  return (
    <section className="py-[160px] bg-background overflow-hidden">
      <div className="container-geca">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <SectionBadge>PERSPECTIVES</SectionBadge>
            <h2 className="font-cormorant text-h2 font-light text-text-primary mt-6 leading-snug">
              Insights from Our Practitioners
            </h2>
            <GoldDivider className="mt-8" />
          </div>
          <Link href="/insights" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gold hover:gap-5 transition-all duration-300 flex-shrink-0">
            <span>All Articles</span>
            <span>&rarr;</span>
          </Link>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {visible.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                >
                  <Link href={`/insights/${article.slug}`} className="group block">
                    <div className="relative h-56 rounded-lg overflow-hidden mb-6">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gold text-background text-[10px] font-mono uppercase tracking-widest rounded">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-playfair font-bold text-lg text-text-primary leading-snug group-hover:text-gold transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border text-xs font-mono text-text-tertiary">
                        <span>{formatDate(article.date)}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {TOTAL_PAGES > 1 && (
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <button key={i} onClick={() => go(i)} aria-label={`Go to page ${i + 1}`} className="transition-all duration-300">
                  <span className={`block h-1 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-gold" : "w-2 bg-border hover:bg-gold/40"}`} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-secondary">
                {String(page + 1).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => go(page - 1)}
                  disabled={page === 0}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold text-text-secondary transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => go(page + 1)}
                  disabled={page === TOTAL_PAGES - 1}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-full border border-gold bg-gold/10 text-gold hover:bg-gold hover:text-background transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
