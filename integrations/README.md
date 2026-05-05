# Integracoes de audio - Radio Super Indio

## O que foi reaproveitado do agente de marketing

No agente `AGENTE MARKETING CLAUDE`, a configuracao documentada indica:

- `ELEVENLABS_API_KEY` como variavel de ambiente.
- Voz padrao ElevenLabs: Brian.
- `voice_id`: `nPczCjzI2devNBz1zQrb`.
- Modelo: `eleven_multilingual_v2`.
- Uso indicado: carro de som, anuncio interno de loja, spots e narracao.
- Jingles e musicas existentes foram reaproveitados da pasta de carro de som.

Os segredos nao foram copiados para este projeto. O painel deve ler as mesmas variaveis de ambiente da maquina/servidor.

## Fluxo automatico ideal

1. Usuario cria campanha no painel.
2. GPT/agente marketing gera texto.
3. ElevenLabs gera MP3 do spot.
4. Suno gera jingle quando a campanha pedir musica.
5. Marketing ou comercial aprova.
6. Arquivo aprovado entra em `media/` ou storage.
7. Grade publica o audio.
8. Player da loja baixa no cache.
9. Execucao gera log.

## Modo rapido

Para spots e avisos:

- gerar texto;
- enviar direto para ElevenLabs;
- salvar MP3;
- aprovar;
- publicar.

Para jingles:

- gerar letra curta e prompt musical;
- enviar ao Suno;
- baixar MP3 final;
- registrar licenca/termos;
- aprovar;
- publicar.

## Comando futuro

Quando o projeto tiver backend Node ativo:

```bash
node integrations/run-create-asset.js
```

Por enquanto, `audio-pipeline.js` ja deixa as funcoes prontas para o backend chamar.
