# Decisao - Biblioteca musical e operacao da Radio Super Indio

## Diagnostico real

O maior risco da Radio Super Indio nao e tecnico. E juridico, operacional e de continuidade.

Se a radio depender de Spotify, YouTube Music, Deezer, Apple Music ou conta pessoal, ela nasce vulneravel: uso comercial indevido, bloqueio de conta, falta de logs, falta de controle central e nenhum relatorio confiavel para fornecedor.

## Decisao executiva recomendada

Usar modelo hibrido:

1. **Musica de fundo via fornecedor B2B licenciado**, com playlists atualizadas e adequadas para ambiente comercial.
2. **Servidor proprio para vinhetas, spots, jingles, avisos e campanhas**, com logs de execucao por loja.
3. **Cache local no player da loja**, para a radio continuar tocando se a internet oscilar.

Esse caminho resolve as tres pontas:

- conformidade: menor risco juridico;
- operacao: loja toca sem depender de colaborador;
- monetizacao: anuncios e campanhas ficam sob controle da matriz.

## Comparativo de caminhos

| Cenario | Como funciona | Vantagem | Risco | Recomendacao |
|---|---|---|---|---|
| B2B licenciado | Contratar Soundtrack, Mood Media, Stingray, CloudCover ou similar | Atualizacao de catalogo, playlists por clima/horario, menor risco | Precisa validar disponibilidade, contrato e cobertura para Brasil | Melhor primeira escolha |
| Biblioteca propria licenciada | Comprar/licenciar arquivos e hospedar no servidor | Controle total da programacao e do cache | Curadoria, renovacao e prova documental ficam com a empresa | Boa segunda camada |
| Royalty-free comercial | Usar musicas com licenca comercial clara | Custo previsivel e controle | Pode ficar pouco atual e repetitivo | Util para base ambiente e reserva |
| Streaming pessoal | Spotify, YouTube Music, Deezer, Apple Music | Facil no comeco | Uso publico/comercial proibido ou inadequado; sem controle | Nao usar |

## Como a radio deve rodar

### Na matriz

- Painel web com login.
- Cadastro de lojas e dispositivos.
- Biblioteca de vinhetas, spots, jingles e avisos.
- Grade por horario, loja, cidade, campanha e prioridade.
- Controle de musicas antes de anuncio.
- Controle de intervalo minimo entre repeticoes.
- Relatorios de execucao.

### Na loja

- Mini PC, computador da loja, tablet ou navegador dedicado.
- Player web/PWA em tela simples.
- Login da loja.
- Inicio automatico depois de autorizado pelo navegador.
- Sem permissao para pular, editar ou remover anuncios.
- Volume com limite definido pela matriz.
- Cache dos proximos audios.
- Heartbeat para mostrar online/offline.

### No servidor

- Backend com API de programacao.
- Banco PostgreSQL/Supabase.
- Storage para audios e videos.
- Fila para montar a proxima sequencia.
- Logs de cada execucao.
- Relatorio PDF/Excel por campanha.

## Atualizacao de musicas

### Se usar fornecedor B2B

O fornecedor atualiza playlists e catalogos. A Radio Super Indio escolhe:

- estilo;
- energia;
- clima;
- restricao de letras explicitas;
- horarios;
- datas sazonais;
- identidade de loja.

A matriz insere por cima:

- vinhetas;
- spots;
- jingles;
- avisos internos;
- campanhas de fornecedores.

### Se usar biblioteca propria

Criar rotina mensal:

1. Revisar repeticao das faixas.
2. Remover musicas cansativas.
3. Inserir novas faixas licenciadas.
4. Separar por estilo e horario.
5. Conferir comprovante de licenca.
6. Atualizar cache dos players.
7. Registrar versao da playlist.

## Tipos de playlist por supermercado

| Tipo | Uso | Horario sugerido |
|---|---|---|
| Ambiente leve | Compra tranquila, familia, padaria | Abertura e meio da manha |
| Popular moderado | Loja cheia, energia sem barulho | Pico e fim de tarde |
| Instrumental/soft | Reduz cansaco da equipe | Meio da tarde |
| Sazonal | Natal, Pascoa, Semana Farroupilha, Dia das Maes | Campanhas especificas |
| Promocional | Base curta entre spots e chamadas | Periodos de ofertas fortes |

## Regras de programacao

- Nao tocar dois anuncios iguais proximos.
- Respeitar data inicial e final de campanha.
- Respeitar horario permitido.
- Controlar quantidade maxima de anuncios por hora.
- Controlar musicas entre anuncios.
- Priorizar campanhas urgentes da rede.
- Medir contratado versus executado.
- Registrar falhas de loja.
- Permitir grade padrao da rede e, depois, variacao por cidade/loja.

## Stack recomendada para produto real

| Camada | Recomendacao |
|---|---|
| Frontend | Next.js ou React |
| Player loja | PWA com HTML5 Audio, cache e heartbeat |
| Backend | Node.js/NestJS ou Python/FastAPI |
| Banco | PostgreSQL/Supabase |
| Storage | Cloudflare R2, Supabase Storage ou S3 |
| Tempo real | WebSocket ou Supabase Realtime |
| Relatorios | PDF e Excel |
| IA | GPT para texto, ElevenLabs/HeyGen para voz, Suno para jingle, Canva/HeyGen para video |

## Fontes consultadas

- Spotify informa que o servico e para uso pessoal e nao comercial, e nao deve ser tocado publicamente em lojas: https://support.spotify.com/br-pt/article/spotify-public-commercial-use/
- ECAD trata sonorizacao ambiental em estabelecimentos comerciais, incluindo supermercados, como segmento de execucao publica musical: https://www4.ecad.org.br/noticias/ecad-realiza-a-primeira-distribuicao-do-novo-segmento-sonorizacao-ambiental/
- Mood Media oferece musicas para negocios e varejo com biblioteca licenciada e playlists curadas: https://us.moodmedia.com/sound/music-for-business/
- Stingray Business descreve musica licenciada para uso comercial, canais por perfil e atualizacao regular: https://business.stingray.com/en/US/mobile-app
- CloudCover/Pandora Business oferece musica licenciada para empresas, controle remoto e mensagens de audio: https://cloudcovermusic.com/

## Melhor caminho agora

1. Definir 2 ou 3 fornecedores B2B para cotacao e validar cobertura no Brasil.
2. Montar biblioteca propria apenas de vinhetas, spots, jingles e avisos.
3. Escolher 5 lojas piloto.
4. Testar player web com cache e logs.
5. Criar tabela comercial de midia para fornecedores.
6. Depois que a radio estiver estavel, expandir para TV indoor, LED e relatorios completos.

## Prototipo implementado nesta pasta

- Biblioteca local em `media/library.json`.
- Faixas demo locais geradas para teste tecnico.
- Jingles e locucao reaproveitados do `AGENTE MARKETING CLAUDE`.
- Botao "Carregar biblioteca propria" no player.
- Botao "Baixar cache da loja" usando Cache API do navegador.
- `service-worker.js` para cachear pagina, assets e audios.
- Adaptador ElevenLabs em `integrations/audio-pipeline.js`.
- Variaveis esperadas em `integrations/.env.example`.

Observacao: os arquivos reaproveitados do agente de marketing devem passar por validacao interna de direito de uso antes de tocar em loja aberta ao publico. Para prototipo e validacao tecnica, eles ja resolvem a prova de fluxo.
