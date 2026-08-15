const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredSiteUrl || "https://www.andersonjrcantor.com.br");

export const siteConfig = {
  name: "Anderson Junior",
  title: "Anderson Junior | Cantor sertanejo",
  description:
    "Site oficial de Anderson Junior, cantor sertanejo de Passos, Minas Gerais. Shows para eventos públicos, casamentos, casas de shows e eventos privados.",
  locale: "pt_BR",
  instagram: "https://www.instagram.com/andersonjrcantor/",
  tiktok: "https://www.tiktok.com/@andersonjrcantor",
  whatsapp: "https://wa.me/5535984094626",
} as const;
