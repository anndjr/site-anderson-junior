import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const STORE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../node_modules/.pnpm");

/**
 * O sharp chega ao projeto como dependência opcional do Next e, no layout
 * isolado do pnpm, não fica exposto na raiz de `node_modules`. Os scripts de
 * autoria o alcançam direto na loja, sem precisar declarar uma dependência
 * nova só para tarefas que rodam de vez em quando.
 */
export async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    const directory = (await readdir(STORE)).find((name) => name.startsWith("sharp@"));
    if (!directory) throw new Error("Sharp não foi encontrado. Rode `pnpm install` antes.");
    const entry = path.join(STORE, directory, "node_modules/sharp/dist/index.mjs");
    return (await import(pathToFileURL(entry).href)).default;
  }
}
