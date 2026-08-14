"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const navigation = [
  { href: "#artista", label: "O artista" },
  { href: "#ao-vivo", label: "Ao vivo" },
  { href: "#fotos", label: "Fotos" },
  { href: "#contato", label: "Contato" },
];

type SiteHeaderProps = {
  whatsappUrl: string;
};

export function SiteHeader({ whatsappUrl }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = ["inicio", ...navigation.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled} data-menu-open={open}>
      <a className="brand" href="#inicio" aria-label="Anderson Junior, início">
        <Image
          src="/media/anderson-junior-logo.png"
          alt="Anderson Junior"
          width={180}
          height={53}
          priority
        />
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <a
            href={item.href}
            key={item.href}
            aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
        Contato para shows
      </a>

      <a className="mobile-quick-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
        Shows
      </a>

      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? "Fechar" : "Menu"}</span>
        <FontAwesomeIcon icon={open ? faXmark : faBars} />
      </button>

      <div className="mobile-menu" id="mobile-menu" data-open={open} aria-hidden={!open}>
        <nav aria-label="Navegação móvel">
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="mobile-contact"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
        >
          <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
          Consultar disponibilidade
        </a>
      </div>
    </header>
  );
}
