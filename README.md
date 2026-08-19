# Anderson Junior

Site oficial do cantor sertanejo Anderson Junior, de Passos, Minas Gerais. A experiência apresenta o artista, sua trajetória, o show atual, registros de palco e o contato profissional.

## Tecnologias

- Next.js com App Router e TypeScript
- Tailwind CSS e CSS autoral
- Motion
- Font Awesome Free
- Vercel Analytics e Speed Insights

## Desenvolvimento local

Requisitos: Node.js 20.9 ou superior (exigência do Next 16) e pnpm.

```bash
pnpm install
pnpm dev
```

O site estará disponível em `http://localhost:3000`.

## Verificação

```bash
pnpm lint
pnpm build
```

## Publicação

O projeto gera uma exportação estática e foi preparado para publicação na Vercel. Antes do deploy definitivo, configure:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
```

## Mídia e ícones

As fotografias originais em JPEG ficam em `public/media` e são o acervo do projeto: o gerador do press kit depende delas. O site entrega as versões `.webp`, cerca de metade do peso.

```bash
pnpm media   # regera os .webp e otimiza a logo
pnpm icons   # regera favicon, apple-icon e ícones do manifesto
```

Os ícones nascem da letra "A" da logo oficial, recortada pelo canal alfa, de modo que a marca continue reconhecível em 16 px.

## Press kit

O PDF de quatro páginas é gerado por `scripts/create_press_kit.py`, que precisa de Python com `reportlab` e usa fontes do Windows. A saída vai para `output/pdf/`, e o arquivo publicado é `public/downloads/press-kit-anderson-junior.pdf`.

Os selos de contato são criados por `scripts/create_press_kit_icons.mjs` (Node), a partir dos ícones do Font Awesome.

## Dependências

O `package.json` declara `latest` em quase todas as dependências, e o `pnpm-lock.yaml` é o que efetivamente fixa as versões. Como a Vercel instala com `--frozen-lockfile`, trocar essas faixas por versões exatas exige rodar `pnpm install` no mesmo commit, para que o lockfile acompanhe.

As decisões de produto, design e execução estão registradas em `PLANNING.md`, `DESIGN_SYSTEM.md` e `TASKS.md`.
