// Escritor de PDF mínimo: páginas que são uma imagem inteira, mais áreas
// clicáveis por cima.
//
// O press kit é uma peça visual, composta e rasterizada antes de chegar aqui,
// então o PDF só precisa embrulhar cada página e manter os contatos clicáveis.
// JPEG entra sem recodificação, através do filtro DCTDecode.

const A4 = { width: 595.28, height: 841.89 };

const enc = (texto) => Buffer.from(texto, "latin1");

/** Escapa um texto para caber entre parênteses numa string PDF. */
const pdfString = (valor) => `(${valor.replace(/[\\()]/g, (c) => `\\${c}`)})`;

/**
 * @param {{ jpeg: Buffer, width: number, height: number, links?: Array<{
 *   x: number, y: number, w: number, h: number, url: string }> }[]} paginas
 *   `x`/`y` dos links são medidos a partir do canto superior esquerdo, em
 *   pontos, porque é assim que a página foi diagramada.
 * @param {{ title?: string, author?: string, subject?: string }} info
 */
export function buildPdf(paginas, info = {}) {
  const objetos = [];
  const push = (corpo) => objetos.push(corpo) && objetos.length;

  // 1 catálogo, 2 páginas: reservados para manter as referências previsíveis.
  push(null);
  push(null);

  const idsDePagina = [];

  for (const pagina of paginas) {
    const idImagem = push(
      Buffer.concat([
        enc(
          `<< /Type /XObject /Subtype /Image /Width ${pagina.width} /Height ${pagina.height}` +
            ` /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${pagina.jpeg.length} >>\nstream\n`,
        ),
        pagina.jpeg,
        enc("\nendstream"),
      ]),
    );

    const conteudo = `q ${A4.width} 0 0 ${A4.height} 0 0 cm /Im0 Do Q`;
    const idConteudo = push(
      enc(`<< /Length ${conteudo.length} >>\nstream\n${conteudo}\nendstream`),
    );

    const idsDeLink = (pagina.links ?? []).map((link) => {
      // O PDF conta a partir da base da página; a diagramação, do topo.
      const y1 = A4.height - link.y - link.h;
      const y2 = A4.height - link.y;
      return push(
        enc(
          `<< /Type /Annot /Subtype /Link /Rect [${link.x.toFixed(2)} ${y1.toFixed(2)} ` +
            `${(link.x + link.w).toFixed(2)} ${y2.toFixed(2)}] /Border [0 0 0] ` +
            `/A << /S /URI /URI ${pdfString(link.url)} >> >>`,
        ),
      );
    });

    const annots = idsDeLink.length ? ` /Annots [${idsDeLink.map((id) => `${id} 0 R`).join(" ")}]` : "";
    idsDePagina.push(
      push(
        enc(
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.width} ${A4.height}]` +
            ` /Resources << /XObject << /Im0 ${idImagem} 0 R >> >> /Contents ${idConteudo} 0 R${annots} >>`,
        ),
      ),
    );
  }

  objetos[0] = enc("<< /Type /Catalog /Pages 2 0 R >>");
  objetos[1] = enc(
    `<< /Type /Pages /Kids [${idsDePagina.map((id) => `${id} 0 R`).join(" ")}] /Count ${idsDePagina.length} >>`,
  );

  const idInfo = push(
    enc(
      `<< /Title ${pdfString(info.title ?? "")} /Author ${pdfString(info.author ?? "")}` +
        ` /Subject ${pdfString(info.subject ?? "")} /Producer ${pdfString("scripts/create-press-kit.mjs")} >>`,
    ),
  );

  const partes = [enc("%PDF-1.7\n%\xe2\xe3\xcf\xd3\n")];
  let deslocamento = partes[0].length;
  const deslocamentos = [];

  objetos.forEach((corpo, indice) => {
    const cabecalho = enc(`${indice + 1} 0 obj\n`);
    const rodape = enc("\nendobj\n");
    deslocamentos.push(deslocamento);
    partes.push(cabecalho, corpo, rodape);
    deslocamento += cabecalho.length + corpo.length + rodape.length;
  });

  const inicioXref = deslocamento;
  const xref = [`xref\n0 ${objetos.length + 1}\n`, "0000000000 65535 f \n"];
  for (const posicao of deslocamentos) xref.push(`${String(posicao).padStart(10, "0")} 00000 n \n`);
  partes.push(enc(xref.join("")));
  partes.push(
    enc(
      `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R /Info ${idInfo} 0 R >>\nstartxref\n${inicioXref}\n%%EOF\n`,
    ),
  );

  return Buffer.concat(partes);
}

export { A4 };
