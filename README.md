# Anderson Junior

Site oficial do cantor sertanejo Anderson Junior, de Passos, Minas Gerais. A experiência apresenta o artista, sua trajetória, o show atual, registros de palco e o contato profissional.

## Tecnologias

- Next.js com App Router e TypeScript
- Tailwind CSS e CSS autoral
- Motion
- Font Awesome Free
- Vercel Analytics e Speed Insights

## Desenvolvimento local

Requisitos: Node.js e pnpm.

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

As decisões de produto, design e execução estão registradas em `PLANNING.md`, `DESIGN_SYSTEM.md` e `TASKS.md`.
