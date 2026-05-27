const schedule = [
  {
    time: '08:00',
    type: 'Musica',
    title: 'Musica ambiente licenciada',
    meta: 'Base musical segura para uso comercial'
  },
  {
    time: '08:12',
    type: 'Vinheta',
    title: 'Radio Indio, ofertas de verdade',
    meta: 'Assinatura sonora da marca'
  },
  {
    time: '08:18',
    type: 'Anuncio proprio',
    title: 'Oferta do acougue',
    meta: 'Costela bovina kg - todas as lojas'
  },
  {
    time: '08:28',
    type: 'Fornecedor',
    title: 'Jingle PAN - Junho',
    meta: 'Campanha vendida: radio + TV + LED'
  },
  {
    time: '08:40',
    type: 'Institucional',
    title: 'Clube de Ofertas Indio',
    meta: 'QR Code e cadastro de clientes'
  }
];

let currentIndex = 0;
let playing = false;
let playCount = 128;
let synthTimer = null;
let audioContext = null;

const campaigns = [
  {
    brand: 'PAN',
    name: 'Biscoitos PAN - Junho',
    channel: 'Radio + TV + LED',
    insertions: 8,
    status: 'Vendido'
  },
  {
    brand: 'Acougue Indio',
    name: 'Oferta da semana',
    channel: 'Radio + TV',
    insertions: 10,
    status: 'Ativo'
  },
  {
    brand: 'Clube de Ofertas',
    name: 'Cadastro via QR Code',
    channel: 'Radio',
    insertions: 6,
    status: 'Producao'
  }
];

const scheduleList = document.getElementById('scheduleList');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const nowPlaying = document.getElementById('nowPlaying');
const nowMeta = document.getElementById('nowMeta');
const currentHeroTrack = document.getElementById('currentHeroTrack');
const playsToday = document.getElementById('playsToday');
const simulatePlayBtn = document.getElementById('simulatePlayBtn');
const volumeRange = document.getElementById('volumeRange');
const volumeValue = document.getElementById('volumeValue');
const streamUrl = document.getElementById('streamUrl');
const loadStreamBtn = document.getElementById('loadStreamBtn');
const audioPlayer = document.getElementById('audioPlayer');
const connectionStatus = document.getElementById('connectionStatus');
const campaignForm = document.getElementById('campaignForm');
const campaignTable = document.getElementById('campaignTable');
const generateSpotBtn = document.getElementById('generateSpotBtn');
const spotPrompt = document.getElementById('spotPrompt');
const spotOutput = document.getElementById('spotOutput');
const loadLocalLibraryBtn = document.getElementById('loadLocalLibraryBtn');
const cacheLibraryBtn = document.getElementById('cacheLibraryBtn');
const libraryStatus = document.getElementById('libraryStatus');
const assetForm = document.getElementById('assetForm');
const assetOutput = document.getElementById('assetOutput');

let localLibrary = [];
let cacheReady = false;
let wakeLock = null;

audioPlayer.setAttribute('playsinline', '');
audioPlayer.preload = 'auto';

function renderSchedule() {
  scheduleList.innerHTML = '';
  schedule.forEach((item, index) => {
    const row = document.createElement('article');
    row.className = `schedule-item ${index === currentIndex ? 'active' : ''}`;
    row.innerHTML = `
      <b>${item.time}</b>
      <div>
        <span>${item.type}</span>
        <strong>${item.title}</strong>
        <small>${item.meta}</small>
      </div>
    `;
    scheduleList.appendChild(row);
  });
}

function setNowPlaying() {
  const current = schedule[currentIndex];
  if (!current) return;
  nowPlaying.textContent = current.title;
  nowMeta.textContent = `${current.type} - ${current.meta}`;
  currentHeroTrack.textContent = current.title;
  playIcon.textContent = playing ? 'Pausar' : 'Iniciar';
  playsToday.textContent = playCount;
  renderSchedule();
}

function nextTrack() {
  if (!schedule.length) return;
  currentIndex = (currentIndex + 1) % schedule.length;
  playCount += 1;
  const current = schedule[currentIndex];
  if (current.url) {
    audioPlayer.src = current.url;
    if (playing) startSyntheticAudio();
  }
  setNowPlaying();
}

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        wakeLock = null;
      });
    }
  } catch (error) {
    wakeLock = null;
  }
}

function startSyntheticAudio() {
  stopSyntheticAudio(false);
  if (audioPlayer.src) {
    audioPlayer.volume = Number(volumeRange.value) / 100;
    requestWakeLock();
    audioPlayer.play().then(() => {
      connectionStatus.textContent = cacheReady ? 'Rodando com cache' : 'Rodando';
      connectionStatus.className = 'status online';
      libraryStatus.textContent = cacheReady
        ? `Player rodando. Cache local pronto com ${localLibrary.length} audios.`
        : 'Player rodando. Cache ainda nao confirmado neste navegador.';
    }).catch(() => {
      playing = false;
      playIcon.textContent = 'Iniciar';
      connectionStatus.textContent = 'Clique para tocar';
      connectionStatus.className = 'status offline';
      libraryStatus.textContent = 'Biblioteca carregada. O navegador exige um clique no Play para liberar o audio da loja.';
    });
    return;
  }

  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const notes = [196, 246.94, 293.66, 329.63, 392];
  let step = 0;

  synthTimer = setInterval(() => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.value = notes[step % notes.length];
    gain.gain.value = Number(volumeRange.value) / 1000;
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.28);
    osc.stop(audioContext.currentTime + 0.3);
    step += 1;
  }, 360);
}

function stopSyntheticAudio(updateStatus = true) {
  clearInterval(synthTimer);
  synthTimer = null;
  audioPlayer.pause();
  if (updateStatus) {
    connectionStatus.textContent = 'Pausado';
    connectionStatus.className = 'status offline';
  }
}

async function togglePlay() {
  if (!localLibrary.length) {
    await loadLocalLibrary();
  }
  if (!cacheReady) {
    try {
      await cacheLibrary();
    } catch (error) {
      libraryStatus.textContent = 'Biblioteca carregada, mas o cache ainda nao confirmou. A radio pode tocar mesmo assim.';
    }
  }
  playing = !playing;
  if (playing) {
    startSyntheticAudio();
  } else {
    stopSyntheticAudio();
  }
  setNowPlaying();
}

function renderCampaigns() {
  campaignTable.innerHTML = '';
  campaigns.forEach((campaign) => {
    const row = document.createElement('article');
    row.className = 'campaign-row';
    row.innerHTML = `
      <div>
        <span>${campaign.brand}</span>
        <strong>${campaign.name}</strong>
        <small>${campaign.channel}</small>
      </div>
      <div><span>Insercoes/dia</span><strong>${campaign.insertions}</strong></div>
      <div><span>Status</span><strong>${campaign.status}</strong></div>
      <div><span>Execucao</span><strong>${Math.min(100, campaign.insertions * 9)}%</strong></div>
    `;
    campaignTable.appendChild(row);
  });
}

async function loadLocalLibrary() {
  try {
    const response = await fetch('media/library.json', { cache: 'no-store' });
    const data = await response.json();
    localLibrary = data.tracks || [];
    schedule.length = 0;
    localLibrary.forEach((track, index) => {
      schedule.push({
        time: `${String(8 + Math.floor(index / 3)).padStart(2, '0')}:${String((index % 3) * 12).padStart(2, '0')}`,
        type: track.type === 'music' ? 'Musica' : track.type.charAt(0).toUpperCase() + track.type.slice(1),
        title: track.title,
        meta: `${track.mood} - ${track.license}`,
        url: track.url
      });
    });
    currentIndex = 0;
    audioPlayer.src = schedule[0]?.url || '';
    audioPlayer.load();
    libraryStatus.textContent = `Biblioteca propria carregada automaticamente: ${localLibrary.length} audios locais. Fonte: ${data.version}.`;
    setNowPlaying();
    return true;
  } catch (error) {
    libraryStatus.textContent = 'Nao foi possivel carregar a biblioteca local. Verifique media/library.json.';
    return false;
  }
}

async function cacheLibrary() {
  if (!('caches' in window)) {
    libraryStatus.textContent = 'Este navegador nao suporta Cache API.';
    return;
  }
  if (!localLibrary.length) await loadLocalLibrary();
  const cache = await caches.open('radio-super-indio-store-cache-v3');
  await cache.addAll([
    'media/library.json',
    ...localLibrary.map((track) => track.url)
  ]);
  cacheReady = true;
  libraryStatus.textContent = `Cache local pronto: ${localLibrary.length} audios baixados para tocar com internet instavel.`;
  return true;
}

async function bootStorePlayer() {
  const loaded = await loadLocalLibrary();
  if (!loaded) return;
  try {
    await cacheLibrary();
    connectionStatus.textContent = 'Pronto para play';
    connectionStatus.className = 'status online';
    libraryStatus.textContent = `Loja pronta: biblioteca carregada, cache baixado e player armado. Clique Play uma vez para iniciar o expediente.`;
  } catch (error) {
    connectionStatus.textContent = 'Sem cache';
    connectionStatus.className = 'status offline';
    libraryStatus.textContent = 'Biblioteca carregada, mas o cache automatico falhou. Use o botao Baixar cache da loja.';
  }
}

function addCampaign(event) {
  event.preventDefault();
  campaigns.unshift({
    brand: document.getElementById('brandInput').value.trim() || 'Fornecedor',
    name: document.getElementById('campaignInput').value.trim() || 'Nova campanha',
    channel: document.getElementById('channelInput').value,
    insertions: Number(document.getElementById('insertionsInput').value) || 1,
    status: 'Proposta'
  });
  renderCampaigns();
}

function generateSpot() {
  const prompt = spotPrompt.value.trim();
  const base = prompt || 'Oferta especial do Supermercado Indio.';
  spotOutput.textContent = [
    'Versao curta: Atencao, cliente Indio. Hoje tem oferta especial esperando por voce: ' + base,
    'Versao animada: Passou no Indio, economizou de verdade. Aproveite agora essa oferta e garanta o melhor para sua familia.',
    'Versao institucional: Supermercado Indio, perto de voce, com preco, qualidade e ofertas para o dia a dia.'
  ].join('\n\n');
}

function buildProductionFlow(event) {
  event.preventDefault();
  const type = document.getElementById('assetType').value;
  const campaign = document.getElementById('assetCampaign').value.trim();
  const offer = document.getElementById('assetOffer').value.trim();
  const duration = document.getElementById('assetDuration').value;
  const isJingle = type === 'jingle';

  const spotText = `Atencao, clientes do Supermercado Indio! ${offer}. E hoje, e por tempo limitado. Corre pro Indio mais perto de voce. Supermercado Indio, o Indio e de casa!`;
  const sunoPrompt = `Jingle curto para supermercado regional gaucho. Campanha: ${campaign}. Mensagem obrigatoria: ${offer}. Estilo animado, familiar, memoravel, varejo popular, duracao ${duration}. Assinatura: O Indio e de casa.`;

  assetOutput.textContent = [
    `Material: ${type}`,
    `Campanha: ${campaign}`,
    `Duracao: ${duration}`,
    '',
    '1. Texto aprovado para locucao:',
    spotText,
    '',
    '2. Conexao automatica recomendada:',
    'POST /api/audio/elevenlabs usando ELEVENLABS_API_KEY',
    'voice_id: nPczCjzI2devNBz1zQrb',
    'model_id: eleven_multilingual_v2',
    '',
    isJingle ? '3. Prompt para Suno:' : '3. Publicacao:',
    isJingle ? sunoPrompt : 'Salvar MP3 em /media, marcar status aguardando aprovacao, depois publicar na grade.',
    '',
    '4. Aprovacao:',
    'Marketing ou comercial ouve o arquivo, aprova, e o player da loja baixa no proximo cache.'
  ].join('\n');
}

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach((item) => item.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab)?.classList.add('active');
  });
});

playBtn.addEventListener('click', togglePlay);
simulatePlayBtn.addEventListener('click', nextTrack);
campaignForm.addEventListener('submit', addCampaign);
generateSpotBtn.addEventListener('click', generateSpot);
loadLocalLibraryBtn.addEventListener('click', loadLocalLibrary);
cacheLibraryBtn.addEventListener('click', cacheLibrary);
assetForm.addEventListener('submit', buildProductionFlow);

volumeRange.addEventListener('input', () => {
  volumeValue.textContent = `${volumeRange.value}%`;
  audioPlayer.volume = Number(volumeRange.value) / 100;
});

loadStreamBtn.addEventListener('click', () => {
  const url = streamUrl.value.trim();
  if (!url) return;
  audioPlayer.src = url;
  if (playing) startSyntheticAudio();
});

audioPlayer.addEventListener('ended', nextTrack);
audioPlayer.addEventListener('error', () => {
  libraryStatus.textContent = 'Falha no audio atual. Avancando para a proxima faixa da biblioteca.';
  nextTrack();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && playing) {
    requestWakeLock();
    audioPlayer.play().catch(() => {});
  }
});

setNowPlaying();
renderCampaigns();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => bootStorePlayer())
    .catch(() => bootStorePlayer());
} else {
  bootStorePlayer();
}
