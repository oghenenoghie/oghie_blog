"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, SERVICES } from "@/lib/geca-constants";
import { GoldDivider } from "@/components/geca/ui/GoldDivider";

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-background border-t border-border mt-[160px]">
      <div className="container-geca py-[160px]">
        <GoldDivider className="mb-[80px]" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-[80px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Column 1: Logo & Tagline */}
          <motion.div variants={item}>
            <Image
              src="/images/geca-logo.svg"
              alt="GECA — Godwin Edosa Charles & Associates LLP"
              width={160}
              height={44}
              className="h-10 w-auto brightness-0 invert mb-5"
            />
            <p className="text-text-secondary text-sm leading-relaxed">{SITE_CONFIG.description}</p>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={item}>
            <h4 className="font-playfair text-lg font-bold mb-6 text-text-primary">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-text-secondary hover:text-gold transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div variants={item}>
            <h4 className="font-playfair text-lg font-bold mb-6 text-text-primary">Company</h4>
            <ul className="space-y-3">
              {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={item}>
            <h4 className="font-playfair text-lg font-bold mb-6 text-text-primary">Contact</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gold flex-shrink-0 mt-1" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-text-secondary hover:text-gold transition-colors break-all">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gold flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-text-secondary hover:text-gold transition-colors">{SITE_CONFIG.phone}</a>
                  <a href={`tel:${SITE_CONFIG.phone2}`} className="text-text-secondary hover:text-gold transition-colors">{SITE_CONFIG.phone2}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-1" />
                <p className="text-text-secondary">{SITE_CONFIG.address}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <GoldDivider className="my-[40px]" />

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-tertiary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>© 2025 Godwin Edosa Charles &amp; Associates LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
