"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { INSIGHTS } from "@/lib/geca-constants";
import { SectionBadge } from "@/components/geca/ui/SectionBadge";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";

const LATEST = INSIGHTS.slice(0, 3);

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function InsightsPreviewSection() {
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {LATEST.map((article) => (
            <motion.article key={article.id} variants={itemVariants}>
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
      </div>
    </section>
  );
}
