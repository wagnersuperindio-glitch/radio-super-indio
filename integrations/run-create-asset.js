import { createProductionAsset } from './audio-pipeline.js';

const args = Object.fromEntries(
  process.argv.slice(2).map((item) => {
    const [key, ...rest] = item.replace(/^--/, '').split('=');
    return [key, rest.join('=')];
  })
);

const result = await createProductionAsset({
  type: args.type || 'spot',
  campaign: args.campaign || 'campanha-radio-indio',
  offer: args.offer || 'Oferta especial hoje em todas as lojas do Supermercado Indio.',
  duration: args.duration || '30 segundos'
});

console.log(JSON.stringify(result, null, 2));
