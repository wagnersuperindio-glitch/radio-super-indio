import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'nPczCjzI2devNBz1zQrb';
const ELEVENLABS_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const MEDIA_OUTPUT_DIR = process.env.MEDIA_OUTPUT_DIR || 'media';

export function buildRetailSpot({ offer, campaign, cta = 'Corre pro Indio mais perto de voce!' }) {
  return [
    'Atencao, clientes do Supermercado Indio!',
    offer,
    'E hoje, e por tempo limitado.',
    cta,
    'Supermercado Indio, o Indio e de casa!'
  ].join(' ');
}

export function buildSunoPrompt({ campaign, offer, duration = '30 segundos' }) {
  return [
    'Jingle curto para supermercado regional gaucho.',
    `Campanha: ${campaign}.`,
    `Mensagem obrigatoria: ${offer}.`,
    `Duracao: ${duration}.`,
    'Estilo animado, familiar, memoravel, varejo popular.',
    'Assinatura cantada: O Indio e de casa.'
  ].join(' ');
}

export async function generateElevenLabsSpeech({ text, outputName }) {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY nao configurada.');
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text,
      model_id: ELEVENLABS_MODEL_ID,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.82,
        style: 0.35,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs retornou ${response.status}: ${await response.text()}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outputPath = join(MEDIA_OUTPUT_DIR, outputName.endsWith('.mp3') ? outputName : `${outputName}.mp3`);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buffer);
  return outputPath;
}

export async function createProductionAsset({ type, campaign, offer, duration }) {
  const text = buildRetailSpot({ offer, campaign });
  const sunoPrompt = buildSunoPrompt({ campaign, offer, duration });

  if (type === 'jingle') {
    return {
      status: 'manual_suno_ready',
      nextStep: 'Enviar prompt para Suno, baixar MP3 aprovado e salvar em media/.',
      sunoPrompt
    };
  }

  const safeName = `${type}-${campaign}`.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const outputPath = await generateElevenLabsSpeech({
    text,
    outputName: `${safeName}.mp3`
  });

  return {
    status: 'generated_pending_approval',
    text,
    outputPath
  };
}
