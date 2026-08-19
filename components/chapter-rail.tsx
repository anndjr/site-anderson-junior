"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useActiveSection } from "@/lib/use-active-section";

/** Os sete atos da narrativa, na ordem em que aparecem na rolagem. */
const chapters = [
  { id: "inicio", index: "00", label: "Início" },
  { id: "ao-vivo", index: "01", label: "Ao vivo" },
  { id: "assinatura", index: "02", label: "Assinatura" },
  { id: "artista", index: "03", label: "O artista" },
  { id: "trajetoria", index: "04", label: "Trajetória" },
  { id: "fotos", index: "05", label: "Registros" },
  { id: "banda", index: "06", label: "Grande palco" },
  { id: "contato", index: "07", label: "Contato" },
] as const;

const chapterIds = chapters.map((chapter) => chapter.id);

export function ChapterRail() {
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(chapterIds);
  const { scrollYProgress } = useScroll();

  // A mola tira o passo a passo da roda do mouse e deixa o traço contínuo.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const scaleY = reduceMotion ? scrollYProgress : progress;

  return (
    <>
      {/* Telas estreitas não comportam a trilha: recebem só o fio de progresso. */}
      <motion.div className="scroll-progress" style={{ scaleX: scaleY }} aria-hidden="true" />

      <nav className="chapter-rail" aria-label="Progresso da narrativa">
        <span className="chapter-rail-track" aria-hidden="true">
          <motion.span className="chapter-rail-fill" style={{ scaleY }} />
        </span>

        <ol>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? "location" : undefined}
              >
                <span className="chapter-rail-index">{chapter.index}</span>
                <span className="chapter-rail-label">{chapter.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
