// Gera o conjunto de ícones do site a partir da logo oficial.
//
//   node scripts/generate-icons.mjs
//
// O símbolo é a letra "A" da palavra ANDERSON, recortada da logo oficial. Ela
// carrega a lajota laranja da marca e continua legível em 16 px, onde a
// assinatura completa seria ilegível.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSharp } from "./load-sharp.mjs";

const sharp = await loadSharp();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(ROOT, "public/media/anderson-junior-logo.png");

// Caixa da letra "A", medida pelo canal alfa da logo oficial (3394 x 1001).
const GLYPH = { left: 1, top: 13, width: 450, height: 452 };

// Café profundo: mesmo valor de `themeColor` e do fundo do site.
const BACKGROUND = "#171310";

const TARGETS = [
  { file: "public/icon-192.png", size: 192, padding: 0.16 },
  { file: "public/icon-512.png", size: 512, padding: 0.16 },
  // Ícone adaptativo do Android: o sistema recorta até 20% de cada borda.
  { file: "public/icon-maskable-512.png", size: 512, padding: 0.28 },
  // O iOS aplica o próprio arredondamento, então a arte precisa de respiro.
  { file: "app/apple-icon.png", size: 180, padding: 0.2 },
];

const ICO_SIZES = [16, 32, 48];

const glyph = await sharp(LOGO).extract(GLYPH).png().toBuffer();

async function render(size, padding) {
  const inner = Math.round(size * (1 - padding * 2));
  const art = await sharp(glyph)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: BACKGROUND } })
    .composite([{ input: art, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Um .ico é um cabeçalho de 6 bytes, uma entrada de 16 bytes por imagem e, na
// sequência, os PNGs embutidos.
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

for (const target of TARGETS) {
  const data = await render(target.size, target.padding);
  const destination = path.join(ROOT, target.file);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, data);
  console.log(`${target.file.padEnd(34)} ${target.size}px  ${(data.length / 1024).toFixed(1)}KB`);
}

const ico = buildIco(
  await Promise.all(
    ICO_SIZES.map(async (size) => ({ size, data: await render(size, 0.12) })),
  ),
);
await fs.writeFile(path.join(ROOT, "app/favicon.ico"), ico);
console.log(`${"app/favicon.ico".padEnd(34)} ${ICO_SIZES.join("/")}px  ${(ico.length / 1024).toFixed(1)}KB`);
