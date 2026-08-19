const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredSiteUrl || "https://www.andersonjrcantor.com.br");

export const siteConfig = {
  name: "Anderson Junior",
  title: "Anderson Junior | Cantor sertanejo",
  description:
    "Site oficial de Anderson Junior, cantor sertanejo de Passos, Minas Gerais. Shows para eventos públicos, casamentos, casas de shows e eventos privados.",
  locale: "pt_BR",
  city: "Passos",
  region: "MG",
  phone: "+55 35 98409-4626",
  instagram: "https://www.instagram.com/andersonjrcantor/",
  tiktok: "https://www.tiktok.com/@andersonjrcantor",
} as const;

// Cidades já confirmadas como prova profissional; também alimentam `areaServed`
// nos dados estruturados.
export const servedCities = ["Passos", "São João Batista do Glória", "Alpinópolis"] as const;

// Formatos de show declarados publicamente pelo artista.
export const services = [
  "Shows para eventos públicos e prefeituras",
  "Shows para casamentos",
  "Shows para casas noturnas e bares",
  "Shows para eventos privados",
] as const;

const whatsappMessage = `Olá! Vim pelo site do Anderson Junior e gostaria de informações para um show.

Tipo de evento:
Data:
Horário de início:
Duração prevista:
Cidade/local:
Público estimado:`;

export const whatsappUrl = `https://wa.me/5535984094626?text=${encodeURIComponent(whatsappMessage)}`;

// A versão força o navegador a buscar o arquivo novo em vez do que já cacheou.
export const pressKitUrl = "/downloads/press-kit-anderson-junior.pdf?v=20260819-venda";
