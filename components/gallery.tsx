"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
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
  const [aberta, setAberta] = useState<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);
  const mover = useCallback(
    (passo: number) => setAberta((atual) => (atual === null ? null : (atual + passo + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (aberta === null) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") fechar();
      if (evento.key === "ArrowRight") mover(1);
      if (evento.key === "ArrowLeft") mover(-1);
    };

    const overflowAnterior = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", aoTeclar);

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.documentElement.style.overflow = overflowAnterior;
    };
  }, [aberta, fechar, mover]);

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
            <button
              className="gallery-image"
              type="button"
              onClick={() => setAberta(index)}
              aria-label={`Ampliar fotografia: ${image.alt}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 92vw, 44vw" />
            </button>
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

      {aberta !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Fotografia ampliada"
          onClick={fechar}
        >
          {/* O clique no fundo fecha; dentro da figura ele não deve propagar. */}
          <figure className="lightbox-figure" onClick={(evento) => evento.stopPropagation()}>
            <Image src={gallery[aberta].src} alt={gallery[aberta].alt} fill sizes="100vw" priority />
            <figcaption>
              <span>{gallery[aberta].alt}</span>
              <span className="lightbox-count">
                {String(aberta + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          <button className="lightbox-close" type="button" onClick={fechar} aria-label="Fechar" autoFocus>
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            type="button"
            aria-label="Fotografia anterior"
            onClick={(evento) => {
              evento.stopPropagation();
              mover(-1);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            aria-label="Próxima fotografia"
            onClick={(evento) => {
              evento.stopPropagation();
              mover(1);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
