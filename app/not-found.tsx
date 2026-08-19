import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ContactLink } from "@/components/contact-link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <Link className="not-found-brand" href="/" aria-label="Anderson Junior, início">
        <Image src="/media/anderson-junior-logo.png" alt="Anderson Junior" width={3394} height={1001} priority />
      </Link>

      <div className="not-found-copy">
        <p className="section-index">404 / Fora de rota</p>
        <h1>Essa página saiu de cartaz.</h1>
        <p>
          O endereço que você abriu não existe ou mudou de lugar. O show, a história e o contato continuam na página principal.
        </p>
      </div>

      <div className="not-found-actions">
        <Link className="not-found-home" href="/">
          Voltar ao início
          <span aria-hidden="true">↗</span>
        </Link>
        <ContactLink className="not-found-contact" origin="pagina-404">
          <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
          Contato para shows
        </ContactLink>
      </div>
    </main>
  );
}
