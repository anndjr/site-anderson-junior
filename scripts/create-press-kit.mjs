// Gera o press kit oficial em PDF.
//
//   node scripts/create-press-kit.mjs
//
// É uma peça de venda: apresenta o artista e o show a quem contrata, em cinco
// páginas. Não é rider técnico, que é documento separado da negociação.
//
// Cada página é diagramada em pontos (A4 = 595,28 x 841,89), rasterizada a
// 200 dpi e embrulhada pelo escritor em `pdf.mjs`, que mantém os contatos
// clicáveis. Todo o texto vem do conteúdo já aprovado para o site.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSharp } from "./load-sharp.mjs";
import { buildPdf, A4 } from "./pdf.mjs";

const sharp = await loadSharp();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA = path.join(ROOT, "public/media");
const ICONS = path.join(MEDIA, "press-kit-icons");
const SAIDA = path.join(ROOT, "public/downloads/press-kit-anderson-junior.pdf");

const DPI = 200;
const ESCALA = DPI / 72;
const PX = { w: Math.round(A4.width * ESCALA), h: Math.round(A4.height * ESCALA) };

const COR = {
  cafe: "#171310",
  cafeMedio: "#211B18",
  grafite: "#292826",
  papel: "#E8DFD0",
  marfim: "#F3EEE5",
  nevoa: "#B9B2A7",
  tinta: "#171512",
  brasa: "#F27507",
  cobre: "#BD7045",
};

// Fontes do Windows escolhidas por proximidade com as do site: Constantia no
// lugar da Cormorant Garamond, Segoe UI no lugar da Manrope.
const FONTE = {
  display: "Constantia, Georgia, serif",
  sans: "'Segoe UI', Arial, sans-serif",
  forte: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
  mono: "Consolas, 'Courier New', monospace",
};

const MARGEM = 42;

const escapar = (texto) =>
  texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Quebra o texto em linhas, estimando a largura média do caractere. */
function quebrar(texto, larguraPt, tamanho, fator = 0.5) {
  const limite = Math.max(8, Math.floor(larguraPt / (tamanho * fator)));
  const linhas = [];
  let atual = "";
  for (const palavra of texto.split(/\s+/)) {
    if (!atual.length) atual = palavra;
    else if (`${atual} ${palavra}`.length <= limite) atual += ` ${palavra}`;
    else {
      linhas.push(atual);
      atual = palavra;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

/** Bloco de texto corrido, devolvendo o SVG e onde a última linha terminou. */
function paragrafo(texto, x, y, largura, opcoes = {}) {
  const { tamanho = 9.5, entrelinha = 14, cor = COR.tinta, fonte = FONTE.sans, fator = 0.5 } = opcoes;
  const linhas = quebrar(texto, largura, tamanho, fator);
  const svg = linhas
    .map(
      (linha, i) =>
        `<text x="${x}" y="${y + i * entrelinha}" font-family="${fonte}" font-size="${tamanho}" fill="${cor}">${escapar(linha)}</text>`,
    )
    .join("");
  return { svg, fim: y + (linhas.length - 1) * entrelinha };
}

/** Rótulo curto em versalete, do mesmo tipo dos índices do site. */
const rotulo = (texto, x, y, cor = COR.brasa, tamanho = 7.4) =>
  `<text x="${x}" y="${y}" font-family="${FONTE.forte}" font-size="${tamanho}" fill="${cor}" letter-spacing="1.5">${escapar(texto.toUpperCase())}</text>`;

const marcaDaPagina = (numero, cor) =>
  `<text x="${A4.width - MARGEM}" y="${A4.height - 24}" text-anchor="end" font-family="${FONTE.mono}" font-size="6.6" fill="${cor}" letter-spacing="1.1">ANDERSON JUNIOR / 0${numero}</text>`;

/** Recorta uma foto no formato pedido, como `object-fit: cover` faria. */
async function recorte(arquivo, larguraPt, alturaPt, focoX = 0.5, focoY = 0.5) {
  const w = Math.round(larguraPt * ESCALA);
  const h = Math.round(alturaPt * ESCALA);
  const origem = sharp(path.join(MEDIA, arquivo));
  const meta = await origem.metadata();
  const escala = Math.max(w / meta.width, h / meta.height);
  const jw = Math.min(meta.width, Math.round(w / escala));
  const jh = Math.min(meta.height, Math.round(h / escala));
  return sharp(path.join(MEDIA, arquivo))
    .extract({
      left: Math.round((meta.width - jw) * focoX),
      top: Math.round((meta.height - jh) * focoY),
      width: jw,
      height: jh,
    })
    .resize(w, h, { fit: "fill" })
    .toBuffer();
}

const emPx = (pt) => Math.round(pt * ESCALA);

/** Monta a página: fundo, fotos e, por cima, a camada de texto em SVG. */
async function pagina({ fundo, camadas = [], svg }) {
  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PX.w}" height="${PX.h}" viewBox="0 0 ${A4.width} ${A4.height}">${svg}</svg>`,
  );
  const jpeg = await sharp({ create: { width: PX.w, height: PX.h, channels: 3, background: fundo } })
    .composite([...camadas, { input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toBuffer();
  return { jpeg, width: PX.w, height: PX.h };
}

// ── Página 1 — capa ─────────────────────────────────────────────────────────

async function capa() {
  const foto = await recorte("palco-chapeu.jpg", A4.width, A4.height, 0.52, 0.06);
  const logo = await sharp(path.join(MEDIA, "anderson-junior-logo.png"))
    .resize(emPx(255))
    .toBuffer();

  const svg = `
    <defs>
      <linearGradient id="baixo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.3" stop-color="${COR.cafe}" stop-opacity="0"/>
        <stop offset="1" stop-color="#0A0807" stop-opacity="0.94"/>
      </linearGradient>
      <linearGradient id="lado" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#0A0807" stop-opacity="0.8"/>
        <stop offset="0.62" stop-color="#0A0807" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${A4.width}" height="${A4.height}" fill="url(#lado)"/>
    <rect width="${A4.width}" height="${A4.height}" fill="url(#baixo)"/>
    ${rotulo("Press kit oficial · 2026", MARGEM, 58, COR.brasa, 8)}
    <rect x="${MARGEM}" y="70" width="34" height="2" fill="${COR.brasa}"/>
    <text x="${MARGEM}" y="${A4.height - 132}" font-family="${FONTE.display}" font-size="17" fill="${COR.marfim}" letter-spacing="3.4">CANTOR SERTANEJO</text>
    <text x="${MARGEM}" y="${A4.height - 112}" font-family="${FONTE.sans}" font-size="9.5" fill="${COR.nevoa}" letter-spacing="0.6">Passos · Minas Gerais</text>
    <text x="${MARGEM}" y="${A4.height - 74}" font-family="${FONTE.mono}" font-size="7.4" fill="${COR.nevoa}" letter-spacing="1.2">ANDERSONJRCANTOR.COM.BR</text>
    ${marcaDaPagina(1, "rgba(255,255,255,0.45)")}
  `;

  return pagina({
    fundo: COR.cafe,
    camadas: [
      { input: foto, top: 0, left: 0 },
      { input: logo, top: emPx(A4.height - 260), left: emPx(MARGEM) },
    ],
    svg,
  });
}

// ── Página 2 — o artista ────────────────────────────────────────────────────

async function artista() {
  const fotoLargura = A4.width - MARGEM * 2;
  const FOTO_Y = 296;
  const FOTO_H = 300;
  const CORPO_Y = FOTO_Y + FOTO_H + 62;
  const memoria = await recorte("memoria-pai.jpg", fotoLargura, FOTO_H, 0.5, 0.46);

  const titulo = ["Uma história que", "começou dentro", "de casa."];
  const colunaLargura = (fotoLargura - 26) / 2;
  const corpo = { tamanho: 9.8, entrelinha: 15 };

  const p1 = paragrafo(
    "A música entrou cedo na vida de Anderson Junior. Foi com o pai, que cantava e tocava, que aprendeu seus primeiros acordes. Um deles foi “Menino da Porteira”.",
    MARGEM,
    CORPO_Y,
    colunaLargura,
    corpo,
  );
  const p2 = paragrafo(
    "Na escola, passou a cantar e tocar e, mais tarde, levou a música para festas, churrascos e encontros. Formado em Sistemas de Informação, trabalhou na área de tecnologia até decidir seguir o gosto pela música e o sonho de viver dos palcos.",
    MARGEM,
    p1.fim + 26,
    colunaLargura,
    corpo,
  );
  const p3 = paragrafo(
    "Depois de uma fase de aprendizado em uma dupla sertaneja, iniciou um novo momento em carreira solo. Hoje, une voz, violão, viola caipira, emoção e energia em cada apresentação.",
    MARGEM + colunaLargura + 26,
    CORPO_Y,
    colunaLargura,
    corpo,
  );

  const svg = `
    ${rotulo("01 / O artista", MARGEM, 62, COR.cobre)}
    ${titulo
      .map(
        (linha, i) =>
          `<text x="${MARGEM}" y="${120 + i * 46}" font-family="${FONTE.display}" font-size="44" fill="${COR.tinta}">${escapar(linha)}</text>`,
      )
      .join("")}
    <rect x="${MARGEM}" y="266" width="46" height="2.5" fill="${COR.cobre}"/>
    <rect x="${MARGEM}" y="${FOTO_Y}" width="${fotoLargura}" height="${FOTO_H}" fill="none" stroke="rgba(23,21,18,0.18)" stroke-width="0.8"/>
    <rect x="${MARGEM + 12}" y="${FOTO_Y + FOTO_H - 34}" width="196" height="22" fill="rgba(10,8,7,0.82)"/>
    <text x="${MARGEM + 22}" y="${FOTO_Y + FOTO_H - 20}" font-family="${FONTE.forte}" font-size="7" fill="${COR.marfim}" letter-spacing="1.2">ANDERSON E O PAI · ONDE COMEÇOU</text>
    <rect x="${MARGEM}" y="${CORPO_Y - 30}" width="${fotoLargura}" height="0.8" fill="rgba(23,21,18,0.2)"/>
    ${p1.svg}${p2.svg}${p3.svg}
    ${marcaDaPagina(2, "#8A7F73")}
  `;

  return pagina({
    fundo: COR.papel,
    camadas: [{ input: memoria, top: emPx(FOTO_Y), left: emPx(MARGEM) }],
    svg,
  });
}

// ── Página 3 — o show ───────────────────────────────────────────────────────

async function show() {
  const larguraTotal = A4.width - MARGEM * 2;
  const larguraFoto = (larguraTotal - 16) / 3;
  const fotos = await Promise.all([
    recorte("palco-microfone.jpg", larguraFoto, 190, 0.5, 0.08),
    recorte("viola-caipira.jpg", larguraFoto, 190, 0.5, 0.1),
    recorte("palco-voz.jpg", larguraFoto, 190, 0.42, 0.05),
  ]);

  const descricao = paragrafo(
    "Sucessos atuais, músicas românticas, clássicos e modas sertanejas em um show que transita naturalmente entre emoção e energia. No palco, Anderson alterna entre violão e viola caipira e mantém uma relação próxima com o público por meio da música, da conversa e da interação.",
    MARGEM,
    322,
    larguraTotal * 0.62,
    { tamanho: 10, entrelinha: 15.4, cor: COR.nevoa },
  );

  const cartao = (x, y, largura, titulo, texto) => {
    const corpo = paragrafo(texto, x + 14, y + 52, largura - 28, {
      tamanho: 8.2,
      entrelinha: 11.8,
      cor: COR.nevoa,
    });
    return `
      <rect x="${x}" y="${y}" width="${largura}" height="118" fill="${COR.cafeMedio}" stroke="rgba(243,238,229,0.16)" stroke-width="0.7"/>
      <rect x="${x}" y="${y}" width="3" height="118" fill="${COR.brasa}"/>
      <text x="${x + 14}" y="${y + 30}" font-family="${FONTE.forte}" font-size="12.5" fill="${COR.marfim}" letter-spacing="0.6">${escapar(titulo.toUpperCase())}</text>
      ${corpo.svg}`;
  };

  const larguraCartao = (larguraTotal - 18) / 2;

  const svg = `
    ${rotulo("02 / O show", MARGEM, 62)}
    ${["Voz", "Violão", "Viola"]
      .map((palavra, i) => {
        // A do meio é vazada, como na assinatura do site.
        const pintura =
          i === 1
            ? 'fill="none" stroke="rgba(243,238,229,0.55)" stroke-width="0.7"'
            : `fill="${i === 2 ? COR.papel : COR.marfim}"`;
        const estilo = i === 2 ? ' font-style="italic"' : "";
        return `<text x="${MARGEM + i * 12}" y="${146 + i * 58}" font-family="${FONTE.display}" font-size="62" ${pintura}${estilo}>${palavra}</text>`;
      })
      .join("")}
    ${descricao.svg}
    ${cartao(MARGEM, 596, larguraCartao, "Formato solo", "Voz, violão e viola caipira. Formato de maior proximidade, para casamentos, bares e eventos privados.")}
    ${cartao(MARGEM + larguraCartao + 18, 596, larguraCartao, "Banda completa", "A formação de maior escala para prefeituras, exposições e grandes eventos. Estrutura e formato são tratados no contato.")}
    ${marcaDaPagina(3, "rgba(255,255,255,0.4)")}
  `;

  return pagina({
    fundo: COR.cafe,
    camadas: fotos.map((foto, i) => ({
      input: foto,
      top: emPx(388),
      left: emPx(MARGEM + i * (larguraFoto + 8)),
    })),
    svg,
  });
}

// ── Página 4 — trajetória ───────────────────────────────────────────────────

async function trajetoria() {
  const foto = await recorte("palco-luzes.jpg", A4.width, 470, 0.55, 0.2);
  const larguraColuna = (A4.width - MARGEM * 2 - 30) / 2;

  const cidades = paragrafo(
    "Anderson Junior já se apresentou em exposições, casas noturnas e eventos em cidades como Passos, São João Batista do Glória e Alpinópolis.",
    MARGEM,
    640,
    larguraColuna,
    { tamanho: 9.6, entrelinha: 14.8, cor: COR.marfim },
  );
  const palcos = paragrafo(
    "Em sua trajetória, dividiu o palco com Clayton & Romário, Lucas Reis & Thácio e Diego & Victor Hugo, entre vários outros nomes do sertanejo.",
    MARGEM + larguraColuna + 30,
    640,
    larguraColuna,
    { tamanho: 9.6, entrelinha: 14.8, cor: COR.marfim },
  );

  const svg = `
    <defs>
      <linearGradient id="veu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${COR.grafite}" stop-opacity="0.92"/>
        <stop offset="0.42" stop-color="#141312" stop-opacity="0.35"/>
        <stop offset="1" stop-color="${COR.grafite}" stop-opacity="0.98"/>
      </linearGradient>
    </defs>
    <rect x="0" y="120" width="${A4.width}" height="470" fill="url(#veu)"/>
    ${rotulo("03 / Trajetória", MARGEM, 62)}
    <text x="${MARGEM}" y="106" font-family="${FONTE.display}" font-size="38" fill="${COR.marfim}">Dos palcos da região</text>
    <text x="${MARGEM}" y="${640 - 44}" font-family="${FONTE.display}" font-size="26" font-style="italic" fill="${COR.brasa}">para novos encontros.</text>
    <rect x="${MARGEM}" y="612" width="${A4.width - MARGEM * 2}" height="0.8" fill="rgba(243,238,229,0.24)"/>
    ${cidades.svg}${palcos.svg}
    ${marcaDaPagina(4, "rgba(255,255,255,0.4)")}
  `;

  return pagina({
    fundo: COR.grafite,
    camadas: [{ input: foto, top: emPx(120), left: 0 }],
    svg,
  });
}

// ── Página 5 — contato ──────────────────────────────────────────────────────

const CONTATOS = [
  { icone: "whatsapp", rotulo: "WhatsApp", valor: "+55 35 98409-4626", url: "https://wa.me/5535984094626" },
  { icone: "globe", rotulo: "Site oficial", valor: "andersonjrcantor.com.br", url: "https://www.andersonjrcantor.com.br" },
  { icone: "instagram", rotulo: "Instagram", valor: "@andersonjrcantor", url: "https://www.instagram.com/andersonjrcantor/" },
  { icone: "tiktok", rotulo: "TikTok", valor: "@andersonjrcantor", url: "https://www.tiktok.com/@andersonjrcantor" },
];

async function contato() {
  const retrato = await recorte("retrato-contato.jpg", A4.width, 330, 0.5, 0.06);
  const icones = await Promise.all(
    CONTATOS.map((c) => sharp(path.join(ICONS, `${c.icone}-white.png`)).resize(emPx(15)).toBuffer()),
  );

  const linhaY = (i) => 470 + i * 62;
  const camadas = [
    { input: retrato, top: 0, left: 0 },
    ...icones.map((icone, i) => ({ input: icone, top: emPx(linhaY(i) - 4), left: emPx(MARGEM + 9) })),
  ];

  const linhas = CONTATOS.map(
    (c, i) => `
      <rect x="${MARGEM}" y="${linhaY(i) - 20}" width="${A4.width - MARGEM * 2}" height="0.7" fill="rgba(243,238,229,0.14)"/>
      <text x="${MARGEM + 46}" y="${linhaY(i) - 1}" font-family="${FONTE.forte}" font-size="7.2" fill="${COR.brasa}" letter-spacing="1.4">${escapar(c.rotulo.toUpperCase())}</text>
      <text x="${MARGEM + 46}" y="${linhaY(i) + 15}" font-family="${FONTE.sans}" font-size="13" fill="${COR.marfim}">${escapar(c.valor)}</text>`,
  ).join("");

  const svg = `
    <defs>
      <linearGradient id="topo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.35" stop-color="${COR.cafe}" stop-opacity="0.1"/>
        <stop offset="1" stop-color="${COR.cafe}" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${A4.width}" height="330" fill="url(#topo)"/>
    ${rotulo("04 / Contato", MARGEM, 62, COR.marfim)}
    <text x="${MARGEM}" y="404" font-family="${FONTE.display}" font-size="34" fill="${COR.marfim}">Leve esse show</text>
    <text x="${MARGEM}" y="440" font-family="${FONTE.display}" font-size="34" font-style="italic" fill="${COR.brasa}">para o seu evento.</text>
    ${linhas}
    <text x="${MARGEM}" y="${A4.height - 58}" font-family="${FONTE.mono}" font-size="7" fill="${COR.nevoa}" letter-spacing="1.1">DISPONIBILIDADE, ESTRUTURA E FORMATO SÃO TRATADOS DIRETAMENTE NO CONTATO.</text>
    ${marcaDaPagina(5, "rgba(255,255,255,0.4)")}
  `;

  const links = CONTATOS.map((c, i) => ({
    x: MARGEM,
    y: linhaY(i) - 18,
    w: A4.width - MARGEM * 2,
    h: 42,
    url: c.url,
  }));

  return { ...(await pagina({ fundo: COR.cafe, camadas, svg })), links };
}

// ── Montagem ────────────────────────────────────────────────────────────────

const paginas = [await capa(), await artista(), await show(), await trajetoria(), await contato()];

const pdf = buildPdf(paginas, {
  // Os metadados do PDF são gravados em latin1, que não comporta travessão.
  title: "Press Kit - Anderson Junior",
  author: "Anderson Junior",
  subject: "Apresentação profissional e contato para shows",
});

await fs.mkdir(path.dirname(SAIDA), { recursive: true });
await fs.writeFile(SAIDA, pdf);
console.log(`${path.relative(ROOT, SAIDA)}  ${paginas.length} páginas  ${(pdf.length / 1024).toFixed(0)}KB`);
