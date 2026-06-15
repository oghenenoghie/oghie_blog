"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DIFFERENTIATORS } from "@/lib/geca-constants";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function DifferentiatorSection() {
  return (
    <section className="relative py-[160px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80"
          alt="Business professionals"
          fill
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-background/88" />
      </div>

      <div className="container-geca">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6">Why Choose GECA</p>
          <h2 className="font-cormorant text-h2 font-light text-text-primary leading-snug">What Sets Us Apart</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-8" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {DIFFERENTIATORS.map((diff) => (
            <motion.div key={diff.number} variants={itemVariants} className="group text-center lg:text-left">
              <span className="font-mono text-4xl font-bold text-gold block mb-4">{diff.number}</span>
              <div className="w-8 h-px bg-border group-hover:bg-gold transition-colors duration-300 mx-auto lg:mx-0 mb-5" />
              <h3 className="font-playfair font-bold text-text-primary mb-3 leading-snug">{diff.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{diff.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
