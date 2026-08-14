# AGENTS.md

## Propósito

Este arquivo orienta qualquer agente ou pessoa que trabalhar neste repositório. Ele não descreve uma implementação pronta: organiza a fase de descoberta e protege o projeto contra decisões prematuras.

O projeto será uma nova experiência digital para o artista Anderson Junior. O app `Sonorico`, criado no Base44, é uma referência de conteúdo e intenção narrativa, não uma especificação técnica nem um layout a ser copiado literalmente.

## Estado atual

- Fase: `4 — construção`.
- Implementação: autorizada explicitamente pelo responsável em 2026-08-14.
- Stack aprovada: Next.js com App Router e TypeScript, Tailwind CSS com CSS autoral, Motion e Font Awesome Free.
- Arquitetura inicial: site estático, sem banco de dados, CMS, áudio ou vídeo na primeira versão.
- Hospedagem: decisão final adiada; Vercel gratuita é a preferência declarada e deve ser revalidada antes da publicação.
- Código de aplicação: pode ser criado conforme `PLANNING.md`, `DESIGN_SYSTEM.md` e `TASKS.md`.
- Dependências: podem ser instaladas somente quando necessárias à stack aprovada.
- Base44: a exportação de código continua indisponível no plano atual; 16 arquivos de imagem originais foram recuperados da prévia pública e catalogados em `pictures/ASSET_INVENTORY.md`.

## Ordem obrigatória de leitura

Antes de propor ou executar qualquer trabalho:

1. Ler este `AGENTS.md`.
2. Ler `PLANNING.md` para entender visão, público, conteúdo e decisões abertas.
3. Ler `DESIGN_SYSTEM.md` para respeitar a direção visual e de experiência.
4. Ler `TASKS.md` para conferir fase, prioridades, dependências e bloqueios.

## Fontes canônicas

- `AGENTS.md`: regras de colaboração, limites e qualidade.
- `PLANNING.md`: estratégia do produto e arquitetura de experiência.
- `DESIGN_SYSTEM.md`: linguagem visual, interação, acessibilidade e tokens conceituais.
- `TASKS.md`: estado operacional e backlog priorizado.

Quando houver conflito, seguir esta ordem: instrução mais recente do responsável pelo projeto, `AGENTS.md`, `PLANNING.md`, `DESIGN_SYSTEM.md`, `TASKS.md`.

## Regras da fase de contexto

Até que o responsável autorize o início da implementação, é permitido:

- revisar e aprofundar os quatro arquivos de contexto;
- registrar decisões, dúvidas e restrições;
- organizar conteúdo, referências e inventários;
- propor hipóteses claramente identificadas como hipóteses;
- preparar critérios de aceite e uma sequência de trabalho.

Enquanto o projeto estava na fase 0, não era permitido:

- inicializar framework ou projeto;
- criar código de interface;
- instalar pacotes;
- escolher stack, CMS ou hospedagem como decisão definitiva;
- publicar, conectar GitHub ou alterar o app original no Base44;
- inventar fatos biográficos, datas, números, conquistas, contatos ou lançamentos.

## Princípios do produto

1. **Autoral antes de genérico.** O resultado deve parecer a presença digital de um artista específico, não um template de músico.
2. **Narrativa antes de efeitos.** Movimento e impacto visual devem ampliar a história, nunca competir com ela.
3. **Palco e intimidade.** A experiência deve equilibrar energia de apresentação ao vivo com a proximidade da biografia.
4. **Conversão sem perder poesia.** Contratação e redes sociais devem ser fáceis de encontrar sem transformar o site em um panfleto.
5. **Mobile é primeira classe.** A experiência deve ser memorável no celular, onde estará boa parte do público.
6. **Acessibilidade faz parte da estética.** Contraste, foco, navegação por teclado, texto legível e redução de movimento são requisitos de design.
7. **Performance é experiência.** Fotografias, vídeo e animações devem ser entregues sem bloquear a leitura ou tornar o site pesado.

## Regras de conteúdo

- Idioma principal: português do Brasil.
- Preservar a voz humana e direta do artista.
- Tratar os textos do `Sonorico` como rascunho editorial sujeito à aprovação.
- Não transformar toda seção em slogan; alternar frases de impacto com texto informativo.
- Não publicar informação pessoal ou profissional sem confirmação.
- Todo conteúdo novo deve indicar a origem: confirmado pelo artista, extraído do rascunho, ou hipótese editorial.

## Regras de design e UX

- Evitar estética de template SaaS, cartões excessivos, gradientes genéricos e seções intercambiáveis.
- Não usar movimento contínuo apenas como decoração.
- Não iniciar áudio automaticamente.
- Não esconder navegação, contatos ou ações importantes atrás de interações difíceis de descobrir.
- Respeitar `prefers-reduced-motion` em qualquer conceito animado.
- Toda interação importante deve funcionar por toque, mouse e teclado.
- Validar decisões visuais nos extremos: celular compacto e desktop amplo.

## Prática de trabalho

- Registrar decisões duráveis nos arquivos de contexto, não apenas na conversa.
- Atualizar `TASKS.md` quando uma tarefa mudar de estado.
- Atualizar `PLANNING.md` quando houver mudança de objetivo, público, escopo ou arquitetura de conteúdo.
- Atualizar `DESIGN_SYSTEM.md` quando houver mudança de linguagem visual ou comportamento.
- Fazer alterações pequenas e rastreáveis nos documentos.
- Separar claramente fatos, decisões, hipóteses e perguntas abertas.

## Porta de entrada para implementação

O projeto só está pronto para iniciar código quando, no mínimo, estiverem decididos:

- nome público e assinatura do projeto;
- ação principal esperada do visitante;
- conteúdo obrigatório da primeira versão;
- contatos e links oficiais;
- seleção de fotos e direitos de uso;
- uso ou não de áudio e vídeo;
- direção visual aprovada;
- stack e destino de publicação;
- critérios de sucesso e aceite da primeira versão.

## Definição de qualidade futura

Uma entrega só poderá ser considerada pronta quando:

- representar Anderson Junior de forma reconhecível e verdadeira;
- contar a trajetória com clareza e ritmo;
- possuir uma primeira dobra forte sem depender de explicação;
- funcionar com qualidade em mobile e desktop;
- manter ações essenciais acessíveis;
- respeitar preferências de movimento e padrões de contraste;
- carregar mídia de forma progressiva e performática;
- não conter texto fictício, links quebrados ou conteúdo sem aprovação.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
