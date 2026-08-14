# Tarefas

## Convenções

- `[ ]` não iniciada.
- `[~]` em andamento.
- `[x]` concluída.
- `[!]` bloqueada.
- `[?]` depende de decisão do responsável pelo projeto.

Prioridades:

- `P0`: necessária para avançar de fase.
- `P1`: importante para a primeira versão.
- `P2`: melhoria posterior.

## Estado da iniciativa

- Fase atual: `4 — construção`.
- Implementação: autorizada em 2026-08-14.
- Próximo marco: avaliação do refinamento visual pelo artista e fechamento da primeira versão.

## Concluído nesta fase

- [x] `P0` Localizar o app `Sonorico` na conta Base44 conectada.
- [x] `P0` Confirmar que o app original possui prévia pública utilizável como referência.
- [x] `P0` Verificar os caminhos de exportação de código.
- [x] `P0` Registrar o bloqueio do plano Base44 para acesso externo e GitHub.
- [x] `P0` Mapear a estrutura narrativa, textos principais, imagens e vídeo da prévia.
- [x] `P0` Decidir que a nova versão será uma reconstrução autoral, não uma cópia literal.
- [x] `P0` Interromper qualquer inicialização técnica até nova autorização.
- [x] `P0` Criar os arquivos canônicos de contexto.
- [x] `P0` Importar e revisar o documento de transferência de contexto.

## Agora — decisões de produto

- [x] `P0` Definir `Anderson Junior` como nome público do projeto.
- [x] `P0` Definir contratação pelo WhatsApp como ação principal.
- [x] `P0` Priorizar os públicos: prefeituras, casamentos, bares e fãs.
- [x] `P0` Confirmar `Cantor sertanejo` como assinatura pública, sem slogan emocional na abertura.
- [x] `P0` Consolidar os fatos confirmados em uma biografia final aprovada.
- [x] `P0` Retirar o primeiro single do escopo atual.
- [x] `P0` Confirmar WhatsApp, Instagram e TikTok; manter YouTube fora enquanto estiver em manutenção.

## Conteúdo e acervo

- [x] `P0` Criar inventário dos 16 arquivos originais de imagem recuperados do Base44.
- [x] `P0` Confirmar autorização de reutilização das mídias presentes no Base44.
- [x] `P0` Selecionar como abertura a foto de chapéu olhando para a câmera.
- [x] `P0` Limitar a primeira versão às mídias já disponíveis no Base44.
- [~] `P1` Manter os vídeos do Base44 catalogados, sem utilizá-los até nova decisão do artista.
- [x] `P0` Revisar e aprovar a biografia com o artista.
- [x] `P1` Escrever microcopy de navegação e ações.
- [x] `P1` Definir `Contato para shows` como texto da ação principal.
- [x] `P1` Definir menu com atalhos e scroll narrativo como formas complementares de navegação.
- [x] `P1` Definir os campos da mensagem inicial editável do WhatsApp.
- [x] `P1` Decidir que a primeira versão não terá agenda pública.
- [x] `P1` Aprovar os textos de abertura, artista, ao vivo, trajetória profissional e contato.
- [ ] `P1` Preparar dados profissionais para contratação.
- [x] `P1` Confirmar cidades e nomes de artistas que podem ser citados como prova profissional.
- [ ] `P2` Avaliar kit de imprensa, agenda e depoimentos.
- [x] `P2` Omitir depoimentos na primeira versão por não haver material autorizado.

## Conceito de UX e direção de arte

- [x] `P0` Aprovar a experiência contínua que apresenta o artista atual antes da biografia.
- [x] `P0` Escolher WhatsApp como ação principal e Instagram como canal social de destaque.
- [~] `P0` Validar a direção visual descrita em `DESIGN_SYSTEM.md`.
- [x] `P1` Desenhar o mapa inicial da jornada narrativa contínua.
- [x] `P1` Validar em navegador o layout mobile da primeira dobra, narrativa, galeria, contato e navegação.
- [x] `P1` Implementar e validar visualmente o desktop amplo.
- [x] `P1` Prototipar as transições entre presença, palco, memória e contratação.
- [x] `P1` Definir regras de galeria e visualização de mídia.
- [~] `P1` Validar conceito com redução de movimento; alternativa estática implementada.

## Arquitetura técnica

- [x] `P0` Escolher Next.js App Router, TypeScript, Tailwind CSS, CSS autoral, Motion e Font Awesome Free.
- [?] `P0` Confirmar a hospedagem antes da publicação; Vercel gratuita é a preferência atual.
- [x] `P0` Decidir que a primeira versão não terá CMS, banco de dados ou backend.
- [x] `P0` Definir imagens locais otimizadas e adiar áudio e vídeo.
- [~] `P1` Definir SEO, metadados sociais e analytics; SEO básico implementado, domínio, imagem social e analytics pendentes.
- [x] `P1` Definir orçamento de performance.
- [x] `P1` Definir matriz de navegadores e dispositivos.

## Implementação — autorizada

- [x] `P0` Inicializar o projeto.
- [x] `P0` Instalar dependências.
- [x] `P0` Criar estrutura de páginas e componentes.
- [x] `P0` Implementar primeira dobra.
- [x] `P0` Implementar a narrativa contínua orientada pelo scroll.
- [x] `P0` Integrar mídia real.
- [x] `P1` Implementar galeria.
- [x] `P1` Implementar contato ou contratação.
- [x] `P1` Implementar movimento e microinterações.
- [x] `P1` Refinar a abertura com a logo oficial, remover legendas técnicas da galeria e reposicionar Banda Completa antes do contato.
- [x] `P1` Aplicar parallax suave às fotografias de fundo em tela cheia com alternativa para redução de movimento.
- [x] `P1` Identificar WhatsApp, Instagram e TikTok com ícones oficiais acompanhados de rótulos acessíveis.
- [x] `P1` Corrigir o enquadramento da fotografia de jaqueta azul para preservar a cabeça no recorte da galeria.
- [x] `P1` Incorporar as três fotografias fornecidas pelo artista em Viola e na galeria, mantendo o contato visualmente limpo.
- [x] `P1` Incorporar Cormorant Garamond, Manrope e IBM Plex Mono pelo pipeline de fontes do Next.js.
- [x] `P1` Aplicar três motivos de movimento editorial com alternativa para redução de movimento.
- [x] `P1` Reduzir a extensão inicial da galeria para seis imagens e disponibilizar duas fotos complementares sob demanda.
- [x] `P1` Implementar cabeçalho translúcido na abertura, sólido na rolagem e com indicação da seção ativa.
- [x] `P1` Refinar bordas, tratamento cromático, enquadramento da memória e composição da seção Viola.
- [x] `P1` Corrigir a camada de navegação mobile após validação em viewport compacto.
- [x] `P1` Suavizar a borda direita da fotografia de abertura para fundi-la ao fundo sem revelar o limite do arquivo.
- [x] `P1` Preservar a escala visual da interface em telas lógicas muito largas e níveis reduzidos de zoom do navegador.
- [~] `P1` Implementar metadados e compartilhamento; configuração final depende de domínio e imagem social.

## Validação futura

- [ ] `P0` Revisar conteúdo com o artista.
- [x] `P0` Verificar responsividade em mobile e desktop.
- [ ] `P0` Verificar navegação por teclado e foco visível.
- [ ] `P0` Verificar contraste e legibilidade.
- [ ] `P0` Verificar experiência com redução de movimento.
- [ ] `P0` Verificar carregamento progressivo de mídia.
- [ ] `P0` Verificar formulários e links de contato.
- [ ] `P1` Avaliar métricas de desempenho.
- [ ] `P1` Validar metadados e compartilhamento social.
- [ ] `P1` Realizar revisão final de texto e imagens.

## Critério para desbloquear a implementação

Mover as tarefas técnicas para `não iniciada` somente quando:

- as sete decisões de produto da seção “Agora” estiverem respondidas;
- o conteúdo essencial estiver confirmado;
- a direção visual estiver aprovada;
- o responsável disser explicitamente para iniciar a implementação.

## Registro de decisões

| Data | Decisão | Impacto |
| --- | --- | --- |
| 2026-08-12 | Usar o `Sonorico` como esboço, não como limite criativo | Permite uma reconstrução mais autoral e ambiciosa |
| 2026-08-12 | Não iniciar projeto ou código ainda | Todo trabalho atual fica restrito aos arquivos de contexto |
| 2026-08-12 | Separar governança, planejamento, tarefas e design system | Facilita colaboração futura e reduz decisões implícitas |
| 2026-08-13 | Apresentar primeiro o artista e o show atuais; condensar a biografia em uma passagem | Substitui o roteiro cronológico em atos por uma experiência contínua e comercial |
| 2026-08-13 | Usar WhatsApp como conversão principal sem exibir o nome do atendente | Mantém a contratação direta e a comunicação pública neutra |
| 2026-08-13 | Retirar integralmente o primeiro single da primeira versão | Evita explorar um lançamento ainda indefinido |
| 2026-08-13 | Destacar Instagram, usar TikTok como complementar e omitir YouTube em manutenção | Define a hierarquia atual dos canais sociais |
| 2026-08-13 | Reutilizar as fotos autorizadas do Base44 e abrir com o retrato de chapéu olhando para a câmera | Dá ao acervo e à primeira dobra uma direção concreta |
| 2026-08-13 | Usar uma abertura objetiva com nome, `Cantor sertanejo`, `Passos · Minas Gerais` e `Contato para shows` | Evita slogans artificiais e mantém a conversão clara |
| 2026-08-13 | Trabalhar inicialmente somente com as mídias existentes no Base44 | Fecha o acervo da primeira versão sem depender de uma nova produção |
| 2026-08-13 | Combinar menu de atalhos com scroll narrativo e manter o CTA acessível durante a rolagem | Oferece imersão sem esconder navegação e contratação |
| 2026-08-13 | Abrir o WhatsApp com uma mensagem editável que coleta dados básicos do evento | Agiliza disponibilidade e orçamento sem criar formulário ou backend |
| 2026-08-13 | Não publicar agenda na primeira versão | Evita informação desatualizada e centraliza a consulta de disponibilidade no WhatsApp |
| 2026-08-13 | Citar Passos, São João Batista do Glória e Alpinópolis, além dos palcos compartilhados com artistas confirmados | Acrescenta credibilidade profissional sem inventar números ou colaborações |
| 2026-08-13 | Omitir depoimentos na primeira versão | Mantém o conteúdo baseado somente em provas disponíveis e autorizadas |
| 2026-08-13 | Adiar o uso dos vídeos do Base44 sem descartá-los | Preserva o material para uma evolução futura sem condicionar a primeira versão a vídeo |
| 2026-08-14 | Usar `Anderson Junior` como nome oficial do site e `Cantor sertanejo` como assinatura | Fecha a identificação pública sem recorrer a slogan artificial |
| 2026-08-14 | Aprovar os textos editoriais da primeira versão | Fecha biografia, apresentação ao vivo, prova profissional e chamada de contato sem conteúdo fictício |
| 2026-08-14 | Autorizar a implementação com Next.js, TypeScript, Tailwind CSS, CSS autoral, Motion e Font Awesome Free | Desbloqueia a criação do projeto e das dependências necessárias |
| 2026-08-14 | Recuperar 16 imagens originais da prévia pública do Base44 | Fecha o acervo inicial sem exigir novo envio do artista |
| 2026-08-14 | Construir a primeira versão funcional da narrativa completa | Disponibiliza abertura, palco, assinatura, biografia, Banda Completa, trajetória, galeria e contato para revisão visual |
| 2026-08-14 | Limitar o conjunto público inicial de mídia a aproximadamente 2 MB | Mantém as imagens originais preservadas e melhora carregamento da versão estática |
| 2026-08-14 | Usar a logo oficial como assinatura principal da abertura | Diferencia a primeira dobra e substitui o nome composto apenas com tipografia |
| 2026-08-14 | Posicionar Banda Completa como último clímax antes do contato | Aproxima a maior formação do momento de conversão e melhora o ritmo final da narrativa |
| 2026-08-14 | Retirar as legendas `Registro` da galeria e evitar travessões no texto editorial | Deixa a apresentação mais natural e reduz elementos com aparência técnica |
| 2026-08-14 | Aplicar direção fina editorial com tipografia incorporada, galeria curada e movimento hierarquizado | Eleva a percepção profissional, encurta a rolagem inicial e cria unidade entre palco, memória e contratação |
| 2026-08-14 | Preparar SEO técnico, compartilhamento social, dados estruturados e medição para a Vercel | Deixa a versão pronta para receber o domínio e ser auditada em produção |
| 2026-08-14 | Criar um press kit oficial de quatro páginas e oferecê-lo no contato | Acrescenta um material profissional direto para contratantes e imprensa |

## Fechamento da versão para lançamento

- [x] `P0` Preparar o projeto para versionamento Git, com arquivos locais ignorados e instruções de desenvolvimento.
- [x] `P0` Criar o repositório privado `anndjr/site-anderson-junior` no GitHub e publicar a branch `main`.
- [x] `P0` Criar metadados canônicos, Open Graph e Twitter Card.
- [x] `P0` Criar `robots.txt`, `sitemap.xml` e dados estruturados `Person`.
- [x] `P0` Criar imagem social horizontal com identidade e fotografia oficiais.
- [x] `P0` Integrar Vercel Web Analytics e Speed Insights.
- [x] `P1` Criar press kit profissional em PDF e disponibilizar seu download.
- [x] `P1` Auditar títulos, textos alternativos, controles identificados e ausência de overflow em desktop e mobile.
- [x] `P1` Confirmar que links externos e download apontam para os destinos esperados.
- [ ] `P0` Definir o domínio definitivo e configurar `NEXT_PUBLIC_SITE_URL` na Vercel.
- [~] `P0` Publicar na Vercel e habilitar Analytics e Speed Insights no painel; primeira instalação corrigida e novo deploy automático em andamento.
- [ ] `P0` Repetir a auditoria no endereço de produção e validar a prévia social nas plataformas.
- [ ] `P1` Verificar o site em ao menos um iPhone/Safari e um Android/Chrome reais.
