"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealVariant = "rise" | "mask" | "image";

const variants = {
  rise: {
    initial: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  mask: {
    initial: { opacity: 0, y: 24, clipPath: "inset(0 0 18% 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  },
  image: {
    initial: { opacity: 0, scale: 1.035, clipPath: "inset(7% 0 7% 0)" },
    visible: { opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
};

export function Reveal({ children, className = "", variant = "rise", delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const selected = variants[variant];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : selected.initial}
      whileInView={reduceMotion ? undefined : selected.visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: variant === "image" ? 0.9 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
