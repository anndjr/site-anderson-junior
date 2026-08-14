"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type HeroProps = {
  whatsappUrl: string;
};

export function Hero({ whatsappUrl }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={sectionRef} id="inicio" className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-media" style={{ y: reduceMotion ? 0 : imageY }} aria-hidden="true">
        <Image
          src="/media/anderson-chapeu.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="hero-shade" />
      <motion.div
        className="hero-content"
        style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : contentOpacity }}
      >
        <p className="eyebrow">Cantor sertanejo · Passos, Minas Gerais</p>
        <h1 id="hero-title" className="sr-only">Anderson Junior</h1>
        <div className="hero-logo-lockup" aria-hidden="true">
          <Image
            src="/media/anderson-junior-logo.png"
            alt=""
            width={3394}
            height={1001}
            priority
            sizes="(max-width: 700px) 82vw, 52vw"
          />
        </div>
        <a className="primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
          Contato para shows
          <span aria-hidden="true">↗</span>
        </a>
      </motion.div>
      <a className="scroll-cue" href="#ao-vivo">
        <span>Conheça o show</span>
        <span className="scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
