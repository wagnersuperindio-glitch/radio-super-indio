# Radio Super Indio - Indoor Media

Pagina web da Radio Super Indio para lojas, com:

- player web de radio;
- biblioteca local de audios;
- cache local para funcionamento com internet instavel;
- central de producao de spots, avisos, jingles e vinhetas;
- estrutura de integracao com ElevenLabs/Suno;
- modulos de trade marketing, TV indoor e LED.

## Rodar localmente

```powershell
python -m http.server 8791 --bind 127.0.0.1
```

Acessar:

```text
http://127.0.0.1:8791/
```

## Publicar no GitHub Pages

1. Criar um repositorio no GitHub.
2. Fazer push deste projeto para a branch `main`.
3. No GitHub, acessar `Settings > Pages`.
4. Em `Build and deployment`, escolher `GitHub Actions`.
5. Rodar o workflow `Publicar Radio Super Indio`.

Depois disso, o GitHub gera um link parecido com:

```text
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```

## Observacao operacional

Para o piloto nas lojas, usar o link publicado em cada computador/mini PC/tablet. O cache do navegador baixa a pagina e os audios locais para reduzir falhas quando a internet oscilar.

Para uso real em loja aberta ao publico, validar licencas musicais, ECAD e contratos de uso comercial antes de operar em escala.
