"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface StatBlockProps {
  number: string;
  label: string;
  className?: string;
}

function CountUpNumber({ num, duration = 0.8 }: { num: string; duration?: number }) {
  const numMatch = num.match(/\d+/);
  if (!numMatch) return <>{num}</>;

  const numValue = parseInt(numMatch[0]);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const increment = numValue / (duration * 60);
    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= numValue) {
        setDisplayValue(numValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(startValue));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [numValue, duration]);

  const suffix = num.replace(/\d+/, "");
  return <>{displayValue}{suffix}</>;
}

export function StatBlock({ number, label, className = "" }: StatBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl md:text-5xl font-mono font-medium text-gold mb-2">
        {inView && <CountUpNumber num={number} />}
      </div>
      <p className="text-text-secondary text-sm md:text-base">{label}</p>
    </motion.div>
  );
}
