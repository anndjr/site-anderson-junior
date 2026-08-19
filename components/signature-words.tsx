"use client";

import { motion, useReducedMotion } from "motion/react";

const words = ["Voz", "Violão", "Viola"];

/**
 * O maior momento tipográfico da página. As três palavras sobem uma após a
 * outra, como uma assinatura sendo escrita, em vez de já estarem postas.
 */
export function SignatureWords() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="signature-words" aria-hidden="true">
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={reduceMotion ? undefined : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
