# Publicacao web para outras maquinas

## Recomendacao executiva

Para colocar rapido no ar e testar nas lojas, use **GitHub Pages**.

Motivo:

- custo zero;
- link publico para abrir em qualquer maquina;
- funciona bem com HTML, CSS, JS, imagens e audios;
- deploy automatico a cada push;
- simples de manter nesta fase.

## Alternativas

| Plataforma | Quando usar | Pontos fortes | Limitacao |
|---|---|---|---|
| GitHub Pages | Prototipo e piloto | Gratis, simples, confiavel | Sem backend dinamico |
| Netlify | Prototipo com deploy facil | Forms, previews, redirects | Backend limitado |
| Vercel | Evoluir para Next.js | Otimo para app moderno | Pode exigir plano conforme uso |
| Cloudflare Pages | Performance e cache forte | CDN excelente | Configuracao inicial maior |
| VPS propria | Produto real com backend | Controle total | Exige manutencao |

## Decisao por fase

### Agora

Publicar no GitHub Pages.

Uso:

- diretoria testa;
- marketing valida fluxo;
- lojas piloto abrem player;
- cache local baixa audios;
- fornecedores veem demonstracao de trade marketing.

### Proxima fase

Migrar para Vercel/Render/Railway/VPS com backend.

Necessario quando tiver:

- login real;
- usuarios por loja;
- upload de audios;
- logs de execucao;
- relatorio por fornecedor;
- integracao automatica ElevenLabs;
- storage em nuvem;
- banco de dados.

## Passo a passo GitHub Pages

1. Criar repositorio no GitHub com nome sugerido:

```text
radio-super-indio
```

2. No computador, dentro desta pasta, rodar:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial Radio Super Indio web platform"
git remote add origin https://github.com/SEU-USUARIO/radio-super-indio.git
git push -u origin main
```

3. No GitHub:

- abrir o repositorio;
- ir em `Settings`;
- ir em `Pages`;
- selecionar `GitHub Actions`;
- aguardar o workflow terminar.

4. Link final:

```text
https://SEU-USUARIO.github.io/radio-super-indio/
```

## Como abrir nas lojas

Em cada loja:

1. Abrir o link publicado.
2. Clicar em `Carregar biblioteca propria`.
3. Clicar em `Baixar cache da loja`.
4. Fixar navegador em tela cheia.
5. Deixar o computador/mini PC ligado durante o expediente.

## Risco e decisao

GitHub Pages resolve o piloto, mas nao substitui o produto final. Para operacao real com relatorio de fornecedor, logs e automacao de audio, sera necessario backend com banco e storage.
