"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/geca-constants";
import { SectionBadge } from "@/components/geca/ui/SectionBadge";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";
import { TrendingUp, Shield, Briefcase, Zap } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  "financial-tax":   <TrendingUp size={36} strokeWidth={1.5} />,
  "estate-planning": <Shield size={36} strokeWidth={1.5} />,
  mergers:           <Briefcase size={36} strokeWidth={1.5} />,
  "private-equity":  <Zap size={36} strokeWidth={1.5} />,
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function ServicesGridSection() {
  return (
    <section className="py-[160px] bg-surface border-y border-border overflow-hidden">
      <div className="container-geca">
        <motion.div
          className="text-center mb-20 max-w-2xl mx-auto"
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Link href={`/services/${service.slug}`}>
                <div className="group bg-surface p-10 flex flex-col h-full min-h-[280px] hover:bg-elevated transition-colors duration-300 cursor-pointer">
                  <div className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    {ICONS[service.id]}
                  </div>
                  <h3 className="font-playfair font-bold text-lg text-text-primary leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{service.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-3">
                    <span>Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/services" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gold hover:gap-5 transition-all duration-300">
            <span>View All Services</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
