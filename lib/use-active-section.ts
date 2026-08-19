"use client";

import { useEffect, useState } from "react";

/**
 * Devolve o id da seção que ocupa a faixa de leitura da tela.
 *
 * A margem recorta o topo e a base da viewport para que a seção só conte como
 * ativa quando estiver de fato sendo lida, e não ao surgir na borda.
 *
 * `ids` precisa ter referência estável — declare a lista fora do componente.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
