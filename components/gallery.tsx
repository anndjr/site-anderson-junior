"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";

const gallery = [
  { src: "/media/palco-chapeu.webp", alt: "Anderson Junior de chapéu cantando e levantando a mão no palco" },
  { src: "/media/palco-violao.webp", alt: "Anderson Junior tocando violão durante uma apresentação" },
  { src: "/media/palco-microfone.webp", alt: "Anderson Junior cantando e tocando violão no palco" },
  { src: "/media/palco-publico.webp", alt: "Anderson Junior de jaqueta azul segurando o microfone e olhando para a direita" },
  { src: "/media/palco-preto-branco.webp", alt: "Anderson Junior de chapéu cantando e tocando violão em preto e branco" },
  { src: "/media/retrato-contato.webp", alt: "Anderson Junior vestido de branco cantando ao microfone" },
  { src: "/media/palco-vermelho.webp", alt: "Anderson Junior cantando sob luzes vermelhas e verdes" },
  { src: "/media/palco-voz.webp", alt: "Anderson Junior cantando ao microfone sob luzes de palco" },
];

export function Gallery() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="fotos" className="gallery" aria-labelledby="gallery-title">
      <Reveal className="gallery-heading" variant="mask">
        <p className="section-index">05 / Registros</p>
        <h2 id="gallery-title">Luz, palco e presença.</h2>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
          Mais no Instagram <span aria-hidden="true">↗</span>
        </a>
      </Reveal>

      <div className="gallery-grid" data-expanded={expanded}>
        {gallery.map((image, index) => (
          <Reveal
            className={`gallery-item gallery-item-${index + 1}${index > 5 ? " gallery-item-extra" : ""}`}
            variant="image"
            delay={(index % 2) * 0.08}
            key={image.src}
          >
            <div className="gallery-image">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 92vw, 44vw" />
            </div>
          </Reveal>
        ))}
      </div>

      <button
        className="gallery-toggle"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        <span>{expanded ? "Mostrar seleção principal" : "Ver mais fotos"}</span>
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
    </section>
  );
}
