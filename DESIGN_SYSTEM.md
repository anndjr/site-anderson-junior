# Design system — direção conceitual

## Status

- Versão: `0.4 — direção fina aplicada e validada tecnicamente`.
- Aplicação em código: fluxo completo, tipografia autoral, galeria curada, hierarquia de movimento e navegação reativa implementados.
- Aprovação: conceito e fluxo aprovados; o resultado da direção fina aguarda a avaliação visual final do artista.
- Objetivo atual: manter consistência entre o caráter editorial, a presença de palco e a conversão profissional.

## 1. Norte criativo

### Conceito

**Retrato presente, palco vivo, memória em segundo plano.**

A experiência combina três universos:

1. **Presença:** olhar direto, identidade reconhecível e impacto imediato.
2. **Palco:** escala, voz, instrumentos, luz, público e energia.
3. **Memória:** pai, origem e escolhas contados em uma passagem íntima e concisa.
4. **Editorial musical:** tipografia expressiva, ritmo e composição precisa, sem aparência de índice biográfico.

O resultado deve parecer contemporâneo e autoral. Sertanejo aqui não significa recorrer automaticamente a madeira, couro, chapéu, neon de bar ou ornamentos rurais. A identidade deve nascer da trajetória e das imagens reais do artista.

## 2. Princípios de experiência

### Impacto imediato

A primeira dobra deve funcionar como a entrada do artista no palco: nome reconhecível, imagem forte, tensão visual e um próximo passo claro.

### Ritmo, não rolagem infinita

O conteúdo deve alternar expansão e pausa. Seções densas de imagem precisam ser seguidas por momentos de leitura e respiro.

### Presente antes da cronologia

O visitante conhece primeiro o artista e o show atuais. A biografia surge depois, condensada, sem exigir que a pessoa percorra um currículo antes de perceber o valor da apresentação.

### Movimento com intenção

Animação deve sinalizar passagem de ato, revelar relações ou responder à interação. Elementos não devem flutuar, pulsar ou girar continuamente sem função.

### Conversão elegante

A ação principal deve ser sempre alcançável e ganhar força no momento certo da narrativa, sem interromper o tom editorial.

### Som sob controle do visitante

Áudio pode enriquecer a experiência, mas só começa após uma ação explícita. Estado, volume, pausa e alternativa sem som devem estar claros.

## 3. Personalidade da interface

- Dramática, não barulhenta.
- Humana, não nostálgica demais.
- Popular e sofisticada ao mesmo tempo.
- Masculina sem clichês rígidos.
- Editorial, não institucional.
- Precisa nos controles e livre nas composições.

## 4. Paleta conceitual

Os valores abaixo são ponto de partida para prototipação e precisam de teste de contraste.

| Papel | Nome | Valor provisório | Uso esperado |
| --- | --- | --- | --- |
| Fundo principal | Café profundo | `#211B18` | Base marrom escura, sem chegar ao preto absoluto |
| Fundo elevado | Grafite | `#292826` | Navegação e áreas de leitura |
| Fundo de contraste | Preto | `#101010` | Momentos pontuais de palco e profundidade |
| Texto principal claro | Marfim | `#F3EEE5` | Títulos e texto sobre fundos escuros |
| Texto secundário | Névoa | `#B9B2A7` | Metadados e apoio |
| Fundo editorial | Papel | `#E8DFD0` | Passagem de memória e leitura curta |
| Texto sobre claro | Tinta | `#171512` | Texto em áreas editoriais |
| Acento editorial | Cobre | `#BD7045` | Marcadores, índices e detalhes de transição |
| Acento da marca | Brasa | `#E66F22` | Sublinhados ativos e momentos mínimos ligados à logo oficial |
| Estado informativo | Azul noite | `#526A85` | Feedback neutro quando necessário |

### Regras de cor

- A base deve parecer marrom escura e grafite, não um site inteiramente preto.
- `Cobre` organiza a narrativa; `Brasa` aparece com parcimônia para aproximar a interface da logo oficial.
- A passagem de memória pode inverter do escuro para `Papel`, desde que não quebre o fluxo contínuo.
- Fotografias não devem receber filtros que apaguem tons de pele ou informação relevante.
- Estados de foco e erro não dependem apenas de cor.

## 5. Tipografia

### Papéis

#### Display

`Cormorant Garamond`, incorporada localmente pelo pipeline do Next.js. A família cria contraste editorial sem competir com a logo geométrica oficial.

Uso: nome do artista, viradas narrativas e frases-manifesto.

#### Texto e interface

`Manrope`, incorporada localmente pelo pipeline do Next.js. A família sustenta leitura, navegação e contratação com aparência contemporânea e profissional.

Uso: biografia, botões, navegação, legendas e informação profissional.

#### Marcador

`IBM Plex Mono`, peso 500, incorporada localmente pelo pipeline do Next.js.

Uso: atos, tempo, coordenadas editoriais, estados de reprodução e microlegendas.

### Escala tipográfica provisória

| Token | Faixa sugerida | Uso |
| --- | --- | --- |
| `display-hero` | `clamp(4rem, 13vw, 11rem)` | Nome do artista |
| `display-moment` | `clamp(3rem, 8vw, 7rem)` | Virada ou momento narrativo |
| `heading-1` | `clamp(2.4rem, 5vw, 4.8rem)` | Título principal de seção |
| `heading-2` | `clamp(1.8rem, 3vw, 3rem)` | Subtítulo narrativo |
| `lead` | `clamp(1.2rem, 2vw, 1.65rem)` | Texto de entrada |
| `body` | `clamp(1rem, 1.2vw, 1.15rem)` | Leitura longa |
| `label` | `0.75rem–0.875rem` | Navegação e metadados |

### Regras tipográficas

- Manter largura de linha entre aproximadamente 45 e 72 caracteres em leitura longa.
- Não usar caixa alta em parágrafos.
- Caixa alta pode aparecer em nome, atos e marcadores, sempre com espaçamento adequado.
- Títulos gigantes devem quebrar de forma intencional, não depender de uma única largura de tela.
- O corpo nunca deve ser sacrificado para preservar uma composição visual.

## 6. Espaço, grade e composição

### Unidade base

Escala sugerida: `4, 8, 12, 16, 24, 32, 48, 72, 96, 144` pixels.

### Grade

- Mobile: 4 colunas, margens de 20–24 px.
- Tablet: 8 colunas, margens de 32–48 px.
- Desktop: 12 colunas, margens fluidas e largura máxima definida por composição.
- Telas muito amplas: preservar densidade e enquadramento; não apenas esticar componentes.

### Composição

- Permitir assimetria controlada e sobreposição de mídia.
- Usar alinhamentos fortes para que a liberdade pareça intencional.
- Alternar seções de largura total com blocos editoriais estreitos.
- Reservar espaço negativo como elemento ativo.
- Evitar grades de cartões repetidos para contar a biografia.

## 7. Forma e superfície

- Cantos predominantemente retos ou discretamente arredondados.
- Raios grandes apenas quando ligados a um conceito de mídia ou ação específica.
- Bordas finas, divisores e recortes são preferíveis a sombras genéricas.
- Textura pode aparecer como ruído sutil ou material fotográfico, nunca reduzindo legibilidade.
- Profundidade deve vir de escala, recorte, contraste e movimento, não de pilhas de cartões.

## 8. Componentes conceituais

### Masthead de abertura

- Nome do artista em escala extrema.
- Foto autorizada de Anderson com chapéu, olhando para a câmera, como fundo principal.
- Parallax suave com enquadramento controlado; versão estática em telas ou preferências que peçam redução de movimento.
- Identificação objetiva: `Cantor sertanejo` e `Passos · Minas Gerais`.
- Não usar slogan emocional ou frase publicitária na primeira dobra.
- Ação principal `Contato para shows`, direcionada ao WhatsApp.
- Estado visual forte antes de qualquer interação.

### Transição narrativa

- Conecta retrato, palco, assinatura artística e memória sem transformar cada passagem em uma seção institucional.
- Pode usar corte, máscara, escala e sobreposição fotográfica.
- Deve preservar leitura, controle do scroll e orientação espacial.

### Palco de mídia

- Fotografia ou vídeo em escala ampla.
- Legenda e contexto disponíveis.
- Carregamento progressivo com proporção reservada.
- Controles claros quando houver vídeo ou áudio.

### Bloco de memória

- Área editorial de leitura, potencialmente em fundo `Papel`.
- Combina texto, detalhe fotográfico e pausa de movimento.
- Deve ser legível sem efeitos de entrada.

### Linha sonora

- Motivo gráfico que pode representar continuidade, progresso ou mudança de ato.
- Não deve fingir ser um player quando não houver áudio.
- Sua função precisa ser compreensível ou puramente ambiental e não interativa.

### Galeria ritmada

- Sequência com variação intencional de escala e orientação.
- Cada fotografia nova deve assumir uma função narrativa específica, como instrumento, registro de palco ou presença no fechamento.
- Não usar masonry apenas por conveniência.
- Imagens precisam de ordem narrativa, texto alternativo e opção de exploração acessível.

### Ação de contratação

- Visível na navegação e reforçada após a demonstração de presença ao vivo.
- Texto direto e canal de contato confiável.
- Não exibir publicamente o nome da pessoa responsável pelo atendimento.
- Não misturar contratação, imprensa e mensagens pessoais sem hierarquia.
- Manter uma versão discreta e persistente de `Contato para shows` durante a rolagem, sem cobrir conteúdo ou competir com a fotografia.

### Navegação combinada

- O scroll contínuo é a experiência narrativa principal.
- O menu oferece atalhos para `O artista`, `Ao vivo`, `Fotos` e `Contato`.
- Cada atalho leva a um ponto real da mesma página; não cria páginas ou capítulos artificiais.
- A navegação deve indicar o contexto atual de forma discreta e continuar utilizável por teclado e toque.
- Em mobile, menu e CTA não podem disputar espaço nem reduzir excessivamente a área útil.

### Entrada de contato pelo WhatsApp

- Os CTAs de contratação usam o ícone oficial do WhatsApp junto ao rótulo textual; o ícone nunca substitui o texto.
- Instagram e TikTok usam seus ícones oficiais no rodapé, também acompanhados pelos nomes das redes.
- Os links sociais do rodapé têm escala maior que os metadados legais para facilitar reconhecimento e toque.
- O link abre uma mensagem editável em nome do próprio interessado.
- A mensagem começa mencionando que o contato veio pelo site.
- Os campos sugeridos são: tipo de evento, data, horário, duração prevista, cidade/local e público estimado.
- Não simular uma resposta automática enviada pelo atendimento.
- Não transformar o site em formulário: o preenchimento e a negociação permanecem no WhatsApp.

## 9. Movimento

### Vocabulário

- Revelação: máscara, corte, luz ou deslocamento curto.
- Passagem de ato: mudança de contraste, escala ou temperatura.
- Progresso: linha ou numeração com resposta contínua e discreta.
- Ênfase: expansão breve e reversível.
- Profundidade: parallax suave na fotografia de abertura e nas imagens de fundo em tela cheia. A galeria permanece estável para preservar leitura e controle.
- Intensidade: o deslocamento deve ser curto, sem revelar as bordas da imagem nem alterar a posição do conteúdo textual.

### Tempos provisórios

| Token | Duração | Uso |
| --- | --- | --- |
| `instant` | `100–140ms` | Feedback de controle |
| `quick` | `180–240ms` | Hover, foco e pequenos estados |
| `enter` | `420–650ms` | Entrada de conteúdo |
| `chapter` | `800–1200ms` | Mudança de ato cuidadosamente usada |

### Curvas

- Interface: curva rápida e previsível.
- Narrativa: desaceleração cinematográfica sem bloquear interação.
- Evitar elasticidade genérica em conteúdo emocional.

### Redução de movimento

Com `prefers-reduced-motion`, remover parallax, deslocamentos longos, scrub e transições dependentes de scroll. Preservar hierarquia por cor, tipografia, espaço e cortes estáticos.

## 10. Estados e feedback

- Foco sempre visível e com contraste suficiente.
- Hover nunca é a única forma de revelar informação essencial.
- Botões devem comunicar carregamento, sucesso e erro em texto quando necessário.
- Players devem exibir reproduzir, pausar, posição e volume de forma compreensível.
- Links externos e downloads devem ser identificáveis pelo contexto.
- Conteúdo em carregamento deve reservar espaço e evitar saltos de layout.

## 11. Acessibilidade

- Alvo de toque mínimo recomendado: 44 × 44 px.
- Contraste seguindo WCAG AA como base mínima.
- Ordem de foco acompanha a ordem narrativa.
- Menu fecha por `Escape` e devolve foco ao acionador.
- Imagens informativas recebem texto alternativo específico; imagens decorativas usam alternativa vazia.
- Vídeo com fala exige legenda; áudio relevante exige alternativa textual.
- Nenhuma leitura depende de texto sobre imagem sem camada de contraste confiável.
- Títulos mantêm hierarquia semântica independente do tamanho visual.

## 12. Performance percebida

- Primeira dobra deve ter alternativa visual leve para vídeo.
- Priorizar somente a mídia necessária ao primeiro quadro.
- Carregar mídias e momentos posteriores progressivamente.
- Usar tamanhos responsivos e formatos modernos de imagem.
- Reservar dimensões para mídia.
- Evitar bibliotecas de animação antes de provar necessidade.
- Definir um orçamento de peso antes da implementação.

## 13. Tom de texto

- Próximo, seguro e direto.
- Apresentação profissional em terceira pessoa; não escrever como se Anderson estivesse falando diretamente com o visitante.
- Poético em pontos de abertura; factual em biografia e contratação.
- Evitar superlativos não comprovados.
- Evitar linguagem publicitária genérica como “experiência única” ou “paixão pela música”.
- Preferir imagens concretas, escolhas e momentos da trajetória.

## 14. Antipadrões

- Site de artista reduzido a foto, nome e três botões sociais.
- Hero com vídeo pesado e texto ilegível.
- Toda seção animada da mesma forma.
- Cursor personalizado que prejudica precisão.
- Scroll obrigatório por efeitos lentos.
- Galeria sem contexto ou curadoria.
- Ícones sem rótulo para ações importantes.
- Player automático ou oculto.
- Brilho, neon e gradientes usados como substituto de direção de arte.
- Estética country importada que apaga a origem mineira e a história real.

## 15. Pontos a validar antes de congelar o sistema

- Presença ou ausência de áudio.
- Papel dos vídeos de palco depois da abertura.
- Equilíbrio entre café, grafite, preto e a passagem editorial clara.
- Intensidade de movimento aceita pelo artista.
- Linguagem da fotografia: documental, palco, editorial ou combinação definida.

## 16. Estado da aplicação visual

A primeira versão refinada usa a paleta café, grafite, preto e papel. O cobre organiza marcadores e a brasa aproxima detalhes mínimos da interface do laranja presente na logo. `Cormorant Garamond`, `Manrope` e `IBM Plex Mono` são incorporadas no build, sem requisições de fonte durante a navegação.

O movimento possui três motivos: entrada vertical curta para conteúdo, revelação por máscara para mudanças editoriais e abertura suave para fotografias. O parallax permanece restrito às imagens de fundo. Em `prefers-reduced-motion`, esses movimentos são removidos.

A galeria abre com seis fotografias curadas, alternando imagens amplas e pares assimétricos. Duas fotografias complementares ficam disponíveis por ação explícita, o que preserva ritmo e reduz a sensação de rolagem infinita.

As fotografias editoriais usam uma moldura em duas camadas: margem material estreita, linha interna clara e sombra curta de baixa opacidade. O detalhe aproxima a galeria de uma seleção fotográfica impressa sem transformar as imagens em cartões. Fotografias de palco em tela cheia permanecem sem moldura para preservar escala e imersão.

O cabeçalho começa translúcido, ganha solidez após a rolagem e indica a seção ativa. No celular, o menu ocupa a área visível completa, mantém contato rápido para shows e fecha por ação explícita ou `Escape`.

Em telas lógicas acima de `2200px`, incluindo níveis muito reduzidos de zoom do navegador, a escala-base cresce de forma fluida. Isso preserva a proporção entre navegação, identidade, textos e espaço disponível sem alterar os breakpoints normais de desktop e mobile.

## 17. Extensão editorial: press kit e compartilhamento

O press kit reutiliza a mesma hierarquia visual do site: preto e grafite como base, papel quente para leitura longa, cobre e laranja da marca como acentos, títulos editoriais e textos objetivos. Ele não replica a página; reorganiza apresentação, trajetória, formatos e contato para leitura profissional em quatro páginas A4.

A imagem de compartilhamento usa a logo oficial, a foto de palco aprovada pelo artista e a assinatura `Cantor sertanejo · Passos, Minas Gerais`. A composição horizontal preserva rosto, chapéu, mão erguida e logo dentro da área segura, permanecendo legível em miniaturas sem acrescentar slogans ou informações não confirmadas.
