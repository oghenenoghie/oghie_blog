"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/geca-constants";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-geca py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Image
                src="/images/geca-logo.svg"
                alt="GECA — Godwin Edosa Charles & Associates LLP"
                width={140}
                height={38}
                className="h-9 w-auto brightness-0 invert"
                priority
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-mono uppercase tracking-wider text-text-secondary hover:text-gold transition-colors"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-gold"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    whileHover={{ scaleX: 1, transformOrigin: "left" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-background transition-colors rounded font-mono text-sm font-medium uppercase tracking-wider"
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.button
            className="md:hidden text-gold p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-background z-40 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-geca flex flex-col gap-8 py-8">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-lg font-mono uppercase text-gold hover:text-gold/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-background transition-colors rounded font-mono text-sm font-medium uppercase tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
