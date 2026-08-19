// Gera as versões que o site entrega ao visitante.
//
//   node scripts/optimize-media.mjs
//
// As fotografias originais em JPEG permanecem no repositório: elas são o
// acervo e a fonte usada por `scripts/create_press_kit.py`, que depende de
// JPEG. O site consome os arquivos `.webp` criados aqui, cerca de metade do
// peso original.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSharp } from "./load-sharp.mjs";

const sharp = await loadSharp();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA = path.join(ROOT, "public/media");

// Acima disso não há ganho visível: nenhuma área do layout passa de 1800 px.
const MAX_EDGE = 1800;
const QUALITY = 82;

const LOGO = "anderson-junior-logo.png";

const kb = (bytes) => `${String(Math.round(bytes / 1024)).padStart(4)}KB`;

const entries = (await fs.readdir(MEDIA, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort();

let before = 0;
let after = 0;

for (const name of entries) {
  const source = path.join(MEDIA, name);
  const originalSize = (await fs.stat(source)).size;

  if (name === LOGO) {
    // A assinatura precisa de canal alfa e traço limpo, então continua em PNG.
    // Como só tem branco, laranja e antialiasing, uma paleta indexada corta
    // três quartos do peso sem perda perceptível.
    const data = await sharp(source).png({ palette: true, quality: 92, compressionLevel: 9 }).toBuffer();
    await fs.writeFile(source, data);
    before += originalSize;
    after += data.length;
    console.log(`${name.padEnd(30)} png   ${kb(originalSize)} -> ${kb(data.length)}`);
    continue;
  }

  const destination = path.join(MEDIA, `${name.replace(/\.(png|jpe?g)$/i, "")}.webp`);
  const image = sharp(source);
  const { width, height } = await image.metadata();
  const longEdge = Math.max(width, height);

  const data = await image
    .resize(
      longEdge > MAX_EDGE
        ? { width: Math.round((width / longEdge) * MAX_EDGE), height: Math.round((height / longEdge) * MAX_EDGE) }
        : undefined,
    )
    .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
    .toBuffer();

  await fs.writeFile(destination, data);
  before += originalSize;
  after += data.length;

  const resized = longEdge > MAX_EDGE ? ` (redimensionada de ${longEdge}px)` : "";
  console.log(`${name.padEnd(30)} webp  ${kb(originalSize)} -> ${kb(data.length)}${resized}`);
}

console.log(`\ntotal ${kb(before)} -> ${kb(after)}  (-${(((before - after) / before) * 100).toFixed(0)}%)`);
