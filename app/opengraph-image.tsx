/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Anderson Junior, cantor sertanejo de Passos, Minas Gerais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const [portraitData, logoData] = await Promise.all([
  readFile(join(process.cwd(), "public/media/palco-chapeu.jpg"), "base64"),
  readFile(join(process.cwd(), "public/media/anderson-junior-logo.png"), "base64"),
]);

const portraitSrc = `data:image/jpeg;base64,${portraitData}`;
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          color: "#f3eee5",
          background: "#050505",
        }}
      >
        <div
          style={{
            width: "680px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "62px",
          }}
        >
          <div
            style={{
              marginBottom: "24px",
              color: "#b9b2a7",
              fontSize: "17px",
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
            }}
          >
            Cantor sertanejo · Passos, Minas Gerais
          </div>
          <img src={logoSrc} width={560} height={165} alt="Anderson Junior" />
          <div
            style={{
              width: "92px",
              height: "3px",
              display: "flex",
              marginTop: "28px",
              background: "#e66f22",
            }}
          />
          <div
            style={{
              marginTop: "42px",
              color: "#f3eee5",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            Contato para shows
          </div>
        </div>
        <div
          style={{
            width: "520px",
            height: "630px",
            display: "flex",
            overflow: "hidden",
            background: "#050505",
          }}
        >
          <img
            src={portraitSrc}
            width={560}
            height={746}
            alt=""
            style={{ marginTop: "-46px", marginLeft: "-40px" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
