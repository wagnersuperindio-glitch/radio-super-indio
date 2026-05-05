# Plano executivo - Radio Super Indio / Indios Indoor Media

## Leitura do cenario

A pagina criada e o primeiro prototipo visual da plataforma Indios Indoor Media. A direcao correta nao e tratar o projeto apenas como radio online, mas como uma central de comunicacao e monetizacao dentro das lojas.

## Modulos conectados no prototipo

- Radio indoor com player de loja bloqueado.
- Grade de programacao com musica, vinheta, anuncio proprio, fornecedor e institucional.
- Trade marketing para vender insercoes a fornecedores.
- TV indoor com oferta visual.
- Painel de LED com preco grande e exportacao futura.
- Estudio de IA para GPT, locucao, jingle e video.
- Plano 30/60/90 dias para implantacao.

## Ferramentas e conexoes futuras

| Frente | Ferramenta sugerida | Uso |
|---|---|---|
| Frontend | React, Next.js ou Vite | Painel administrativo e players PWA |
| Banco | Supabase/PostgreSQL | Lojas, campanhas, playlists, logs e usuarios |
| Midia | Supabase Storage, Cloudflare R2 ou S3 | Audios, videos, cards e relatorios |
| Voz | ElevenLabs ou HeyGen speech | Spots e avisos em audio |
| Jingles | Suno | Jingles comerciais com licenca arquivada |
| Video | HeyGen, Canva ou CapCut | Avatar, ofertas, fornecedores e datas sazonais |
| Relatorios | PDF e Excel | Comprovacao de execucao para fornecedores |
| Publicacao inicial | GitHub Pages | Prototipo estatico rapido |
| Produto real | VPS, Vercel, Render ou Railway | Backend, auth, logs e storage |

## Prioridade executiva

1. Validar visual e proposta com diretoria, marketing, comercial e operacao.
2. Definir lojas piloto, equipamentos e rotina de abertura do player.
3. Cotar fornecedor B2B de musica para empresas e validar cobertura/licenca no Brasil.
4. Criar 5 vinhetas da marca e 10 spots proprios.
5. Cadastrar primeiras campanhas comerciais simuladas.
6. Evoluir para backend com login, upload real de audio e logs por loja.

## Pontas alinhadas

| Ponta | Decisao |
|---|---|
| Musica | Nao usar Spotify/YouTube pessoal. Priorizar fornecedor B2B licenciado ou biblioteca propria com contrato comercial. |
| Atualizacao musical | Fornecedor B2B atualiza playlists; se biblioteca propria, criar curadoria mensal com comprovante de licenca. |
| Operacao na loja | Player web/PWA bloqueado, com cache, heartbeat, volume limitado e reconexao automatica. |
| Anuncios | Vinhetas, spots, jingles e avisos ficam no servidor proprio da Radio Super Indio. |
| Trade marketing | Vender insercoes por canal, periodo, loja, frequencia e relatorio de comprovacao. |
| IA | GPT gera texto; voz/jingle/video entram depois de aprovacao e licenca arquivada. |
| Legal | Validar ECAD, contratos de musica, direitos de IA e contratos de midia com fornecedores. |
| Publicacao | Prototipo estatico agora; produto real com backend, storage, banco e logs. |

## Abas obrigatorias do produto

- Painel executivo.
- Radio / player de loja.
- Biblioteca musical.
- Vinhetas, spots e jingles.
- Grade e regras de programacao.
- Lojas e dispositivos.
- Campanhas proprias.
- Trade marketing.
- TV indoor.
- LED.
- Estudio de IA.
- Aprovacoes.
- Relatorios.
- Configuracoes legais e licencas.

## Indicadores para acompanhar

- Lojas online versus lojas previstas.
- Tempo de player conectado por dia.
- Insercoes contratadas versus realizadas.
- Falhas por loja.
- Volume de campanhas ativas.
- Receita vendida em trade marketing.
- Tempo para produzir um spot ou jingle.
- Aceitacao operacional das lojas.

## Melhor caminho

Comecar com MVP de radio. TV, LED e IA devem entrar logo depois, mas a primeira prova de valor e simples: tocar programacao controlada pela matriz, registrar execucao por loja e mostrar para fornecedores que existe inventario de midia vendavel dentro do supermercado.
