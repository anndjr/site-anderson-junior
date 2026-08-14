import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { ParallaxMedia } from "@/components/parallax-media";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { siteConfig, siteUrl } from "@/lib/site";

const whatsappMessage = `Olá! Vim pelo site do Anderson Junior e gostaria de informações para um show.

Tipo de evento:
Data:
Horário de início:
Duração prevista:
Cidade/local:
Público estimado:`;

const whatsappUrl = `https://wa.me/5535984094626?text=${encodeURIComponent(whatsappMessage)}`;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl.toString(),
    image: new URL("/media/anderson-chapeu.png", siteUrl).toString(),
    description: siteConfig.description,
    jobTitle: "Cantor sertanejo",
    telephone: "+55 35 98409-4626",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Passos",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    sameAs: [siteConfig.instagram, siteConfig.tiktok],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <SiteHeader whatsappUrl={whatsappUrl} />
      <main id="conteudo">
        <Hero whatsappUrl={whatsappUrl} />

        <section id="ao-vivo" className="live-intro" aria-labelledby="live-title">
          <ParallaxMedia
            className="live-intro-media"
            imageClassName="live-intro-image"
            src="/media/palco-chapeu.jpg"
            alt="Anderson Junior de chapéu cantando no palco"
          />
          <div className="live-intro-shade" />
          <Reveal className="live-intro-copy" variant="mask">
            <p className="section-index">01 / Ao vivo</p>
            <h2 id="live-title">O show acontece antes da explicação.</h2>
            <p>
              No palco, Anderson alterna entre violão e viola caipira e mantém uma relação próxima com o público por meio da música, da conversa e da interação.
            </p>
          </Reveal>
        </section>

        <section className="signature" aria-labelledby="signature-title">
          <div className="signature-copy">
            <p className="section-index">02 / Assinatura</p>
            <h2 id="signature-title" className="sr-only">Assinatura artística</h2>
            <div className="signature-words" aria-hidden="true">
              <span>Voz</span>
              <span>Violão</span>
              <span>Viola</span>
            </div>
            <p className="signature-description">
              Sucessos atuais, músicas românticas, clássicos e modas sertanejas em um show que transita naturalmente entre emoção e energia.
            </p>
          </div>
          <Reveal className="signature-image signature-image-main" variant="image">
            <Image
              src="/media/viola-caipira.jpg"
              alt="Anderson Junior de chapéu tocando viola caipira sob luzes de palco"
              fill
              sizes="(max-width: 800px) 82vw, 38vw"
            />
            <span className="signature-image-label">Viola caipira</span>
          </Reveal>
          <Reveal className="signature-image signature-image-detail" variant="image" delay={0.12}>
            <Image
              src="/media/palco-microfone.jpg"
              alt="Anderson Junior tocando violão e cantando ao microfone"
              fill
              sizes="(max-width: 800px) 46vw, 22vw"
            />
          </Reveal>
        </section>

        <section id="artista" className="story" aria-labelledby="story-title">
          <div className="story-image">
            <Image
              src="/media/memoria-pai.jpg"
              alt="Anderson Junior ainda criança ao lado do pai, ambos com violões"
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
            />
            <p>Anderson e o pai. Foi onde a música começou.</p>
          </div>
          <Reveal className="story-copy" variant="mask">
            <p className="section-index">03 / O artista</p>
            <h2 id="story-title">Uma história que começou dentro de casa.</h2>
            <p className="story-lead">
              A música entrou cedo na vida de Anderson Junior. Foi com o pai, que cantava e tocava, que aprendeu seus primeiros acordes. Um deles foi “Menino da Porteira”.
            </p>
            <p>
              Na escola, passou a cantar e tocar e, mais tarde, levou a música para festas, churrascos e encontros. Formado em Sistemas de Informação, trabalhou na área de tecnologia até decidir seguir o gosto pela música e o sonho de viver dos palcos.
            </p>
            <p>
              Depois de uma fase de aprendizado em uma dupla sertaneja, iniciou um novo momento em carreira solo. Hoje, une voz, violão, viola caipira, emoção e energia em cada apresentação.
            </p>
          </Reveal>
        </section>

        <section className="trajectory" aria-labelledby="trajectory-title">
          <div>
            <p className="section-index">04 / Trajetória</p>
            <h2 id="trajectory-title">Dos palcos da região para novos encontros.</h2>
          </div>
          <Reveal className="trajectory-copy" variant="rise">
            <p>
              Anderson Junior já se apresentou em exposições, casas noturnas e eventos em cidades como Passos, São João Batista do Glória e Alpinópolis.
            </p>
            <p>
              Em sua trajetória, dividiu o palco com Clayton & Romário, Lucas Reis & Thácio e Diego & Victor Hugo, entre vários outros nomes do sertanejo.
            </p>
          </Reveal>
        </section>

        <Gallery />

        <section className="band" aria-labelledby="band-title">
          <ParallaxMedia
            className="band-media"
            imageClassName="band-image"
            src="/media/palco-mao-erguida.jpg"
            alt="Anderson Junior no palco com músico e público ao fundo"
          />
          <div className="band-shade" />
          <Reveal className="band-copy" variant="mask">
            <p className="section-index">06 / Grande palco</p>
            <h2 id="band-title">Banda<br /> completa</h2>
            <p>
              A formação de maior escala para prefeituras, exposições e grandes eventos. Disponibilidade, estrutura e formato são tratados diretamente no contato.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
              Consultar formato
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </section>

        <section id="contato" className="contact" aria-labelledby="contact-title">
          <div className="contact-topline">
            <p className="section-index">07 / Contato</p>
            <span>Passos · Minas Gerais</span>
          </div>
          <Reveal className="contact-main" variant="mask">
            <p className="contact-kicker">Consulte disponibilidade e informações para shows.</p>
            <h2 id="contact-title">Quer levar esse show para o seu evento?</h2>
            <a className="contact-action" href={whatsappUrl} target="_blank" rel="noreferrer">
              <span className="contact-action-label">
                <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
                Contato para shows
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="press-kit-link"
              href="/downloads/press-kit-anderson-junior.pdf"
              download
            >
              <FontAwesomeIcon icon={faFileArrowDown} aria-hidden="true" />
              Baixar press kit
              <span>PDF · 4 páginas</span>
            </a>
          </Reveal>
          <footer className="site-footer">
            <p>© 2026 Anderson Junior</p>
            <nav aria-label="Redes sociais">
              <a href="https://www.instagram.com/andersonjrcantor/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
                Instagram
              </a>
              <a href="https://www.tiktok.com/@andersonjrcantor" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTiktok} aria-hidden="true" />
                TikTok
              </a>
            </nav>
            <a href="#inicio">Voltar ao início ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}
