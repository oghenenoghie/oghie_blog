"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroParticles = dynamic(
  () => import("@/components/geca/three/HeroParticles").then((m) => ({ default: m.HeroParticles })),
  { ssr: false }
);

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Financial · Legal · Advisory",
    headline: ["Strategic,", "Decisive."],
    caption: "World-class financial and legal advisory for Africa's most ambitious businesses and families.",
    cta: "Explore Our Services",
    href: "/services",
  },
  {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Legacy & Estate Planning",
    headline: ["Legacy", "Built to Last."],
    caption: "Generational wealth planning and estate structuring across UK and Nigerian jurisdictions.",
    cta: "Estate Planning",
    href: "/services/estate-planning",
  },
  {
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Mergers & Acquisitions",
    headline: ["Transactions", "That Transform."],
    caption: "M&A and private equity advisory with over $1.5B in African cross-border deal value.",
    cta: "M&A Advisory",
    href: "/services/mergers",
  },
  {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Financial & Tax Advisory",
    headline: ["Clarity", "in Complexity."],
    caption: "Integrated legal and financial expertise — one relationship, not three separate engagements.",
    cta: "Our Approach",
    href: "/about",
  },
  {
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Private Equity",
    headline: ["Africa's", "Growth Story."],
    caption: "Deep local intelligence and global standards, helping investors unlock African market potential.",
    cta: "Private Equity",
    href: "/services/private-equity",
  },
];

const INTERVAL = 7000;

const wordVariants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  show: (i: number) => ({
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.75, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: "easeIn" } },
};

const captionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

const eyebrowVariants = {
  hidden: { opacity: 0, letterSpacing: "0.1em" },
  show: { opacity: 1, letterSpacing: "0.35em", transition: { duration: 0.7, delay: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const goTo = (i: number) => { setCurrent(i); setProgress(0); };

  useEffect(() => {
    const step = 100 / (INTERVAL / 50);
    const ticker = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + step;
      });
    }, 50);
    return () => clearInterval(ticker);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          style={{ zIndex: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.5, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.headline.join(" ")}
              fill
              className="object-cover"
              priority={current === 0}
              quality={88}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/68" style={{ zIndex: 1 }} />
        </motion.div>
      </AnimatePresence>

      <HeroParticles />

      <div className="relative text-center px-6 max-w-5xl mx-auto" style={{ zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={`ey-${current}`}
            variants={eyebrowVariants}
            initial="hidden" animate="show" exit="exit"
            className="font-mono text-[11px] uppercase text-gold mb-8 tracking-[0.35em]"
          >
            {slide.eyebrow}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <div key={`hl-${current}`} className="overflow-hidden mb-6">
            {slide.headline.map((word, i) => (
              <motion.h1
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden" animate="show" exit="exit"
                className={`block font-cormorant leading-[0.9] uppercase ${
                  i === 0
                    ? "text-[clamp(64px,10vw,140px)] font-bold text-white tracking-tight"
                    : "text-[clamp(52px,8vw,114px)] font-light italic text-gold"
                }`}
              >
                {word}
              </motion.h1>
            ))}
          </div>
        </AnimatePresence>

        <motion.div
          className="w-16 h-px bg-gold mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          key={`rule-${current}`}
        />

        <AnimatePresence mode="wait">
          <motion.p
            key={`cap-${current}`}
            variants={captionVariants}
            initial="hidden" animate="show" exit="exit"
            className="text-[17px] leading-relaxed text-white/80 max-w-lg mx-auto mb-10"
          >
            {slide.caption}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.6 } }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={slide.href}>
              <motion.button
                className="px-10 py-4 bg-gold text-background font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {slide.cta}
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="px-10 py-4 border border-white/30 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} className="relative flex items-center justify-center">
            <span className={`block rounded-full transition-all duration-500 ${i === current ? "w-8 h-1 bg-gold" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10" style={{ zIndex: 10 }}>
        <motion.div className="h-full bg-gold origin-left" style={{ scaleX: progress / 100, transformOrigin: "left" }} />
      </div>

      <div className="absolute bottom-24 right-8 md:right-16 font-mono text-xs text-white/40" style={{ zIndex: 10 }}>
        <span className="text-gold">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      <motion.div
        className="absolute bottom-10 left-8 md:left-16 flex flex-col items-center gap-3"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-lr]">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
