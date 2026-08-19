"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";
import { pressKitUrl, whatsappUrl } from "@/lib/site";

type TrackedLinkProps = {
  /** Identifica de qual ponto do site partiu a ação, no relatório da Vercel. */
  origin: string;
  className?: string;
  /** Usado pelo menu móvel para tirar o link do foco enquanto está fechado. */
  tabIndex?: number;
  children: ReactNode;
};

/**
 * Ação principal do site. Cada clique é registrado com sua origem, para que
 * fique visível quais trechos da narrativa realmente geram contato.
 */
export function ContactLink({ origin, className, tabIndex, children }: TrackedLinkProps) {
  return (
    <a
      className={className}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
      onClick={() => track("contato_whatsapp", { origem: origin })}
    >
      {children}
    </a>
  );
}

export function PressKitLink({ origin, className, tabIndex, children }: TrackedLinkProps) {
  return (
    <a
      className={className}
      href={pressKitUrl}
      download
      tabIndex={tabIndex}
      onClick={() => track("download_press_kit", { origem: origin })}
    >
      {children}
    </a>
  );
}
