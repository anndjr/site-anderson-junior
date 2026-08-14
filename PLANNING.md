# Planejamento do produto

## 1. Visão

Criar a presença digital autoral de Anderson Junior: uma experiência biográfica e musical que tenha a força de uma abertura de show, a intimidade de um encarte e a clareza de um bom portfólio profissional.

O objetivo não é reproduzir o `Sonorico` pixel a pixel. A nova versão deve preservar sua matéria-prima — trajetória, fotografias e atmosfera — e elevar direção de arte, ritmo, interação, clareza de navegação e capacidade de conversão em um fluxo contínuo.

## 2. Referência de origem

- Projeto de referência: `Sonorico`.
- Plataforma de origem: Base44.
- Identificador conhecido: `6a7b60b30fdac23b53ab9ad1`.
- Situação da extração: o código não foi exportado porque o plano atual bloqueia acesso externo aos arquivos e integração com GitHub.
- Material disponível: prévia pública, conteúdo textual, estrutura narrativa, fotografias e vídeo públicos associados ao app.
- Uso pretendido: referência e inventário; a nova implementação será independente.
- Acervo local: 16 imagens originais recuperadas em `pictures/base44`, com inventário em `pictures/ASSET_INVENTORY.md`.

### Arquitetura técnica aprovada

- Next.js com App Router e TypeScript.
- Tailwind CSS para estrutura utilitária, complementado por CSS autoral para direção de arte e scroll narrativo.
- Motion para parallax, revelações e transições com alternativa para `prefers-reduced-motion`.
- Font Awesome Free para ícones sociais e de interface.
- Exportação estática na primeira versão, sem banco de dados, Supabase, CMS, Server Actions ou backend.
- Imagens servidas localmente e otimizadas durante a construção; áudio e vídeo ficam adiados.
- Repositório simples, sem monorepo.
- A hospedagem será decidida antes da publicação; Vercel gratuita permanece como preferência, não como decisão final.

## 3. Ambição

O produto deve ser:

- cinematográfico sem ser pesado;
- chamativo sem ser confuso;
- sofisticado sem afastar o público popular;
- emocional sem perder informação;
- experimental nos momentos certos e simples nas ações importantes;
- marcante no desktop e igualmente forte no celular.

Frase-guia aprovada para orientar a experiência: **primeiro sentir o artista e o show; depois descobrir a história que existe por trás deles**.

## 4. Públicos prioritários

A prioridade comercial, confirmada pelo artista, é:

1. prefeituras e organizadores de eventos públicos;
2. casamentos e eventos privados;
3. bares, casas de shows e produtores;
4. fãs e novos ouvintes.

O visitante prioritário precisa perceber rapidamente presença de palco, qualidade artística e profissionalismo. Os detalhes de formato, formação, duração, estrutura e valores não serão publicados na primeira versão; serão tratados pelo WhatsApp.

## 5. Fatos biográficos presentes no rascunho

Os pontos abaixo foram extraídos da prévia do `Sonorico` e devem ser confirmados antes da publicação:

- Anderson Junior é natural de Passos, Minas Gerais.
- A música entrou em sua vida durante a infância, com influência direta do pai.
- Cantava e tocava na escola e, mais tarde, em festas, churrascos e encontros.
- Formou-se em Sistemas de Informação e trabalhou com tecnologia.
- Deixou a carreira em tecnologia para investir profissionalmente na música.
- Viveu uma fase em uma dupla sertaneja.
- Após o encerramento da dupla, iniciou a carreira solo como Anderson Junior.
- Apresenta-se em bares, festas, casamentos, eventos corporativos e festivais.
- Atualmente canta, toca violão e viola caipira, alternando os instrumentos durante o show.
- Sua performance combina interpretação emocional, energia e conversa com o público.
- Já se apresentou em exposições, casas noturnas e eventos em cidades como Passos, São João Batista do Glória e Alpinópolis.
- Já dividiu o palco, em eventos, com Clayton & Romário, Lucas Reis & Thácio e Diego & Victor Hugo, entre vários outros nomes do sertanejo. Essa informação pode ser publicada como prova de trajetória, sem sugerir colaboração musical entre os artistas.

Nenhum agente deve completar lacunas com suposições.

## 6. Promessa da experiência

Ao terminar a visita, a pessoa deve conseguir responder:

1. Quem é Anderson Junior?
2. De onde veio sua ligação com a música?
3. Qual foi a virada que o levou a viver da música?
4. O que caracteriza o show atual?
5. Como acompanhar ou contratar o artista?

## 7. Arquitetura da experiência — direção aprovada

A página não será uma biografia cronológica dividida em atos visíveis. O fluxo será contínuo e começará pelo Anderson Junior de hoje. A história funcionará como uma camada emocional curta dentro da experiência, sem atrasar a demonstração do show.

### Movimento 1 — Impacto imediato

Foto autorizada de Anderson com chapéu, olhando para a câmera, ocupando o fundo da primeira tela. Abertura minimalista com a logo oficial de `Anderson Junior`, `Cantor sertanejo`, `Passos · Minas Gerais` e o CTA `Contato para shows`. O impacto virá da fotografia, da composição e do parallax controlado, sem slogan emocional publicitário.

### Movimento 2 — O show acontece

Registros reais de palco apresentam rapidamente voz, interpretação, energia, público, violão e viola caipira. O visitante deve sentir o show antes de receber uma explicação biográfica longa.

### Movimento 3 — Assinatura artística

Uma composição visual, não uma grade de cartões, mostra o que distingue a apresentação: voz marcante, emoção transmitida, troca de instrumentos, repertório dinâmico e proximidade com o público.

### Movimento 4 — A origem por trás do artista

Uma passagem biográfica única e concisa conecta a lembrança do pai ensinando “Menino da Porteira”, a formação e o trabalho em tecnologia, a escolha de viver da música e a mudança de fase após a experiência em dupla. A dupla não recebe um capítulo próprio nem domina a narrativa.

### Movimento 5 — Registros e conexão

Galeria ritmada com seis registros principais do acervo autorizado e duas imagens complementares reveladas sob demanda. Instagram permanece em destaque e TikTok como canal complementar. O YouTube fica ausente enquanto estiver em manutenção.

### Movimento 6 — Clímax de palco

A Banda Completa representa visualmente a escala máxima da experiência para prefeituras e eventos maiores. Ela aparece como o último pico de palco antes do convite para contratação. Formação, duração, valores e condições comerciais permanecem no atendimento por WhatsApp.

### Movimento 7 — Contratação

Fechamento visual forte com convite direto para consultar disponibilidade ou solicitar proposta pelo WhatsApp. O nome da pessoa que atende não será exibido publicamente.

O CTA `Contato para shows` também permanecerá acessível de forma discreta durante a rolagem. Ao abrir o WhatsApp, o interessado receberá uma mensagem inicial editável com campos para tipo de evento, data, horário, duração, cidade/local e público estimado. Os detalhes de formatos e orçamento continuarão sendo tratados na conversa.

Fluxo-resumo: **artista atual → impacto do show → identidade → origem → conexão → grande palco → contratação**.

## 8. Hipóteses de experiência

Estas ideias não estão aprovadas nem devem ser implementadas ainda:

- tipografia cinética pontual e legível, sincronizada ao scroll apenas quando ampliar o sentido;
- transições que aproximem retrato, instrumento, palco e memória sem simular capítulos rígidos;
- paisagens de mídia em tela cheia alternadas com pausas editoriais curtas;
- uma “linha sonora” que atravesse a narrativa como elemento gráfico;
- galeria com direção de ritmo, não apenas um mosaico uniforme;
- módulo de áudio iniciado somente por ação do visitante;
- pequenas respostas táteis e visuais em botões, mídia e mudanças de atmosfera.

## 9. Escopo sugerido para a primeira versão

### Essencial

- narrativa biográfica curta e revisada, subordinada à presença atual do artista;
- identidade visual consistente;
- fotografias otimizadas;
- demonstração visual convincente do show e da Banda Completa;
- ação principal de contratação pelo WhatsApp claramente visível;
- contatos e redes oficiais;
- experiência responsiva;
- metadados sociais, SEO básico e acessibilidade.

### Desejável

- galeria imersiva;
- kit de imprensa para download;
- medição de conversões essenciais.

### Fora de escopo até validação

- área autenticada;
- e-commerce;
- comunidade ou feed social próprio;
- CMS complexo;
- automações e integrações não justificadas;
- efeitos 3D pesados;
- reprodução automática de áudio.
- vídeo e áudio na primeira versão;
- agenda pública.

## 10. Fases propostas

### Fase 0 — Contexto e direção

Resultado: visão, conteúdo, prioridades, regras e perguntas abertas organizadas. Fase concluída.

### Fase 1 — Conteúdo e acervo

Resultado: biografia aprovada, contatos, links, mídia catalogada, direitos confirmados e mensagem central definida.

### Fase 2 — Conceito de experiência

Resultado: direção de arte validada, mapa de navegação, wireframe e protótipo dos momentos críticos.

### Fase 3 — Arquitetura técnica

Resultado: stack, estrutura de conteúdo, estratégia de mídia, analytics, hospedagem e critérios de qualidade definidos.

### Fase 4 — Construção

Resultado: primeira versão funcional com conteúdo real, responsividade e acessibilidade. Fase atual; a versão inicial e sua direção fina foram construídas em 2026-08-14 e aguardam avaliação visual final do artista.

### Fase 5 — Direção fina

Resultado: movimento, microinterações, tratamento de imagem, performance e detalhes editoriais refinados.

### Fase 6 — Lançamento e evolução

Resultado: publicação, validação em produção, instrumentação e plano de manutenção do conteúdo.

## 11. Decisões abertas

### Decisões confirmadas durante a entrevista

- Nome público e nome oficial do site: `Anderson Junior`.
- Conversão principal: WhatsApp `+55 35 98409-4626`, autorizado para publicação.
- O nome da pessoa responsável pelo atendimento não aparecerá no site.
- Instagram principal: `@andersonjrcantor`.
- TikTok complementar: `@andersonjrcantor`.
- YouTube: não publicar enquanto estiver em manutenção.
- O primeiro single foi retirado integralmente do escopo atual.
- Não publicar datas para a saída da TI, formação ou fim da dupla e início da fase solo.
- Os detalhes comerciais dos shows devem ser tratados pelo WhatsApp.
- A Banda Completa será o ponto de maior escala visual da apresentação.
- As fotografias utilizadas no Base44 estão autorizadas para reutilização.
- A imagem de abertura será a fotografia de chapéu olhando para a câmera.
- O chapéu faz parte da identidade artística atual.
- Existem duas versões oficiais da logo, com letras brancas e pretas; não recriar ou modificar.
- A abertura identificará o artista como `Cantor sertanejo` e mostrará `Passos · Minas Gerais`.
- O texto público da ação principal será `Contato para shows`.
- A primeira versão trabalhará somente com as mídias já existentes no Base44; novos materiais poderão ser avaliados posteriormente.
- Os vídeos do Base44 não serão descartados, mas ficam temporariamente fora do escopo e serão reavaliados em uma fase posterior.
- Não haverá seção de depoimentos na primeira versão.
- As cidades e os artistas confirmados poderão aparecer como prova profissional na área `Ao vivo`.
- A navegação combinará menu e scroll narrativo: o fluxo contínuo será a experiência principal, enquanto o menu oferecerá atalhos para `O artista`, `Ao vivo`, `Fotos` e `Contato`.
- O CTA `Contato para shows` ficará discretamente acessível durante a rolagem.
- A mensagem inicial do WhatsApp ajudará o interessado a enviar as informações mínimas para disponibilidade e orçamento.
- A primeira versão não terá agenda pública; datas disponíveis serão consultadas diretamente pelo WhatsApp.

### Marca e conteúdo

- A assinatura pública será `Cantor sertanejo`; a abertura não terá slogan emocional.
- Quais eventos, números ou conquistas podem ser publicados?
- Quais exposições ou casas noturnas poderão futuramente ser identificadas nominalmente, caso seja útil?

### Conversão

- Não haverá agenda pública na primeira versão.

### Acervo

- Quais fotos do Base44 possuem também arquivo original em alta resolução?
- Inserir na pasta `pictures` as versões oficiais branca e preta da logo.
- Vídeo e áudio permanecem adiados, sem descarte definitivo do acervo.

### Produto e tecnologia

- O conteúdo precisa ser editável sem código?
- Quem fará atualizações após o lançamento?
- Qual é a frequência esperada de atualização?
- Onde o projeto será hospedado?
- Haverá métricas e quais eventos realmente importam?

## 12. Riscos principais

- Excesso de efeitos diminuir clareza ou desempenho.
- Fotografias de tamanhos e qualidades diferentes quebrarem a unidade visual.
- A narrativa ficar longa sem ritmo ou pontos de orientação.
- A ação profissional ficar escondida pelo caráter artístico.
- Informações biográficas provisórias serem tratadas como definitivas.
- Áudio ou vídeo prejudicar acessibilidade, dados móveis e autonomia do visitante.

## 13. Critérios de sucesso — provisórios

- O artista se reconhece no resultado e aprova a narrativa.
- Um novo visitante entende o momento atual sem precisar ler tudo.
- Contratantes encontram o canal correto de contato rapidamente.
- A experiência mantém identidade e legibilidade em telas pequenas.
- Mídia e movimento não comprometem carregamento ou navegação.
- A página gera vontade de continuar explorando e de acompanhar o próximo passo.

## 13.1 Orçamento técnico da primeira versão

- Exportação estática, sem JavaScript de backend.
- Mídia pública otimizada: até `2,5 MB` no conjunto inicial; medição atual de aproximadamente `2,01 MB` em 11 arquivos.
- Primeira dobra: priorizar apenas retrato e logotipo; fotografias posteriores usam carregamento tardio.
- Movimento: limitar a Motion a parallax da abertura e revelações pontuais; toda a leitura funciona sem animação.
- Matriz de validação: Chrome e Edge atuais, Firefox atual, Safari atual, Safari no iPhone e Chrome no Android.
- Extremos de layout: referência mínima de `390 × 844` no mobile e `1440 × 900` no desktop.
- Metadados sociais completos dependem da escolha do domínio e de uma imagem de compartilhamento aprovada.

## 14. Conteúdo editorial aprovado

Os textos abaixo foram aprovados pelo artista em 2026-08-14 e formam a base canônica da primeira versão.

### Abertura

**ANDERSON JUNIOR**  
**CANTOR SERTANEJO**  
**PASSOS · MINAS GERAIS**  
**CONTATO PARA SHOWS**

### O artista

A música entrou cedo na vida de Anderson Junior. Foi com o pai, que cantava e tocava, que aprendeu seus primeiros acordes. Um deles foi “Menino da Porteira”. Na escola, passou a cantar e tocar e, mais tarde, levou a música para festas, churrascos e encontros.

Formado em Sistemas de Informação, Anderson trabalhou na área de tecnologia até decidir seguir o gosto pela música e o sonho de viver dos palcos. Depois de uma fase de aprendizado em uma dupla sertaneja, iniciou um novo momento em carreira solo.

Hoje, Anderson Junior constrói sua trajetória como cantor sertanejo, unindo voz, violão, viola caipira, emoção e energia em cada apresentação.

### Ao vivo

No palco, Anderson alterna entre violão e viola caipira e mantém uma relação próxima com o público por meio da música, da conversa e da interação.

Seu repertório combina sucessos atuais, músicas românticas, clássicos e modas sertanejas, criando um show que transita naturalmente entre emoção e energia.

### Trajetória profissional

Anderson Junior já se apresentou em exposições, casas noturnas e eventos em cidades como Passos, São João Batista do Glória e Alpinópolis. Em sua trajetória, dividiu o palco com Clayton & Romário, Lucas Reis & Thácio e Diego & Victor Hugo, entre vários outros nomes do sertanejo.

### Contato

Consulte disponibilidade e informações para shows diretamente pelo WhatsApp.

## 15. Preparação para publicação

- Destino aprovado para a primeira publicação: plano gratuito da Vercel.
- O endereço público será definido por `NEXT_PUBLIC_SITE_URL`; o valor de produção deve incluir `https://` e não terminar com barra.
- A versão inclui metadados canônicos, Open Graph, Twitter Card, dados estruturados `Person`, `robots.txt` e `sitemap.xml`.
- Vercel Web Analytics e Speed Insights estão integrados no código e foram habilitados no painel do projeto em 2026-08-14.
- O press kit oficial em PDF faz parte do material profissional e fica disponível para download na seção de contato.
- A publicação só será considerada concluída depois de conectar o domínio, repetir a auditoria no endereço real e validar o compartilhamento social.

### Sequência de lançamento

1. Criar ou conectar o repositório Git à Vercel.
2. Configurar `NEXT_PUBLIC_SITE_URL` com o domínio definitivo.
3. Publicar e habilitar Web Analytics e Speed Insights no painel da Vercel. Concluído em 2026-08-14.
4. Conectar o domínio e revisar DNS, HTTPS e redirecionamento para a versão canônica.
5. Validar WhatsApp, Instagram, TikTok, download do press kit, `robots.txt`, `sitemap.xml` e prévia de compartilhamento.
6. Fazer a verificação final em celular real e desktop antes de divulgar.
