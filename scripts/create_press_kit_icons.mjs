import { createRequire } from "node:module";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const pnpmDirectory = path.resolve("node_modules/.pnpm");
const sharpDirectory = (await readdir(pnpmDirectory)).find((name) => name.startsWith("sharp@"));
if (!sharpDirectory) throw new Error("Sharp não foi encontrado nas dependências locais.");
const sharpModule = path.join(pnpmDirectory, sharpDirectory, "node_modules/sharp/dist/index.mjs");
const sharp = (await import(pathToFileURL(sharpModule).href)).default;
const icons = {
  microphone: require("@fortawesome/free-solid-svg-icons/faMicrophone").definition,
  guitar: require("@fortawesome/free-solid-svg-icons/faGuitar").definition,
  whatsapp: require("@fortawesome/free-brands-svg-icons/faWhatsapp").definition,
  instagram: require("@fortawesome/free-brands-svg-icons/faInstagram").definition,
  tiktok: require("@fortawesome/free-brands-svg-icons/faTiktok").definition,
  globe: require("@fortawesome/free-solid-svg-icons/faGlobe").definition,
};

const outputDir = path.resolve("public/media/press-kit-icons");
await mkdir(outputDir, { recursive: true });

for (const [name, definition] of Object.entries(icons)) {
  const [width, height, , , pathData] = definition.icon;
  for (const [suffix, fill] of [["", "#11100F"], ["-white", "#FFF8ED"]]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path fill="${fill}" d="${pathData}"/></svg>`;
    // Os ícones do Font Awesome não são quadrados. Sem declarar o fundo, o
    // `contain` completa o quadrado com o padrão do sharp, que é preto opaco, e
    // as barras aparecem como riscos escuros dentro dos selos do press kit.
    await sharp(Buffer.from(svg))
      .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, `${name}${suffix}.png`));
  }
}
