
const STORAGE_KEY = 'garage_c180_pro_v1';
const EXACT_ENGINE_URL = 'https://enginesteps.com/mercedes-benz/m274-910/';

const state = {
  mode: 'car',
  frame: 0,
  engineFrame: 0,
  playing: false,
  direction: 1,
  dragging: false,
  startX: 0,
  startFrame: 0,
  records: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
};

const assets = {
  car: [
    'assets/car_0.jpg','assets/car_1.jpg','assets/car_2.jpg','assets/car_3.jpg',
    'assets/car_4.jpg','assets/car_5.jpg','assets/car_6.jpg','assets/car_7.jpg'
  ],
  hood: 'assets/hood_open.jpg',
  engineBay: 'assets/engine_bay.jpg',
  engine: ['assets/engine_0.jpg','assets/engine_1.jpg','assets/engine_2.jpg','assets/engine_1.jpg','assets/engine_0.jpg','assets/engine_2.jpg'],
  exhaust: 'assets/exhaust.jpg'
};

const hotspots = {
  car: {
    0:[
      {part:'Capô',system:'body',x:25,y:34,w:28,h:17,clip:'polygon(8% 40%,28% 8%,88% 18%,96% 70%,65% 92%,18% 83%)',action:'hood'},
      {part:'Farol dianteiro esquerdo',system:'lighting',x:19,y:49,w:12,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Grade dianteira',system:'body',x:25,y:50,w:17,h:14,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Parachoque dianteiro',system:'body',x:12,y:58,w:28,h:15,clip:'polygon(0 35%,24% 2%,92% 15%,100% 72%,65% 100%,10% 86%)'},
      {part:'Roda dianteira esquerda',system:'wheels',x:47,y:56,w:14,h:21,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Roda traseira esquerda',system:'wheels',x:75,y:53,w:12,h:20,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Porta dianteira esquerda',system:'body',x:50,y:41,w:16,h:18,clip:'polygon(5% 8%,95% 2%,90% 98%,8% 95%)'},
      {part:'Porta traseira esquerda',system:'body',x:65,y:41,w:14,h:18,clip:'polygon(6% 2%,94% 10%,95% 95%,8% 98%)'}
    ],
    1:[
      {part:'Capô',system:'body',x:36,y:34,w:28,h:17,clip:'polygon(10% 40%,24% 5%,78% 5%,94% 43%,84% 94%,18% 94%)',action:'hood'},
      {part:'Farol dianteiro esquerdo',system:'lighting',x:29,y:48,w:13,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Farol dianteiro direito',system:'lighting',x:58,y:48,w:13,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Grade dianteira',system:'body',x:39,y:48,w:22,h:17,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Parachoque dianteiro',system:'body',x:30,y:59,w:40,h:14,clip:'polygon(3% 15%,97% 15%,90% 92%,10% 92%)'}
    ],
    2:[
      {part:'Capô',system:'body',x:47,y:34,w:28,h:17,clip:'polygon(4% 20%,71% 8%,94% 39%,82% 84%,24% 94%,8% 66%)',action:'hood'},
      {part:'Farol dianteiro direito',system:'lighting',x:68,y:49,w:12,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Grade dianteira',system:'body',x:58,y:50,w:17,h:14,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Parachoque dianteiro',system:'body',x:60,y:58,w:28,h:15,clip:'polygon(8% 15%,82% 0,100% 35%,92% 86%,32% 100%,0 72%)'},
      {part:'Roda dianteira direita',system:'wheels',x:39,y:56,w:14,h:21,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Roda traseira direita',system:'wheels',x:12,y:53,w:12,h:20,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Porta dianteira direita',system:'body',x:34,y:41,w:16,h:18,clip:'polygon(5% 2%,95% 8%,92% 96%,8% 98%)'},
      {part:'Porta traseira direita',system:'body',x:20,y:41,w:14,h:18,clip:'polygon(6% 10%,94% 2%,92% 98%,5% 95%)'}
    ],
    3:[
      {part:'Roda dianteira direita',system:'wheels',x:70,y:53,w:14,h:22,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Roda traseira direita',system:'wheels',x:17,y:53,w:14,h:22,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Porta dianteira direita',system:'body',x:50,y:40,w:20,h:22,clip:'polygon(4% 3%,96% 4%,92% 96%,4% 96%)'},
      {part:'Porta traseira direita',system:'body',x:31,y:40,w:19,h:22,clip:'polygon(4% 5%,95% 3%,96% 96%,6% 96%)'},
      {part:'Saia lateral direita',system:'body',x:32,y:64,w:39,h:7,clip:'polygon(1% 18%,99% 5%,96% 80%,4% 95%)'},
      {part:'Escapamento',system:'exhaust',x:8,y:57,w:13,h:14,clip:'ellipse(48% 48% at 50% 50%)',action:'exhaust'}
    ],
    4:[
      {part:'Porta-malas',system:'body',x:18,y:39,w:29,h:16,clip:'polygon(6% 25%,90% 4%,100% 69%,28% 96%,4% 75%)'},
      {part:'Lanterna traseira direita',system:'lighting',x:35,y:46,w:13,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Lanterna traseira esquerda',system:'lighting',x:17,y:46,w:13,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Parachoque traseiro',system:'body',x:12,y:57,w:31,h:16,clip:'polygon(0 12%,97% 8%,100% 78%,22% 100%,2% 75%)'},
      {part:'Escapamento',system:'exhaust',x:13,y:61,w:30,h:10,clip:'polygon(0 5%,100% 5%,92% 100%,6% 100%)',action:'exhaust'},
      {part:'Roda traseira direita',system:'wheels',x:49,y:54,w:15,h:22,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Roda dianteira direita',system:'wheels',x:76,y:52,w:12,h:21,clip:'ellipse(48% 48% at 50% 50%)'}
    ],
    5:[
      {part:'Porta-malas',system:'body',x:37,y:38,w:27,h:17,clip:'polygon(5% 10%,95% 10%,91% 92%,8% 92%)'},
      {part:'Lanterna traseira esquerda',system:'lighting',x:29,y:45,w:14,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Lanterna traseira direita',system:'lighting',x:57,y:45,w:14,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Parachoque traseiro',system:'body',x:31,y:57,w:38,h:16,clip:'polygon(2% 5%,98% 5%,91% 95%,9% 95%)'},
      {part:'Escapamento',system:'exhaust',x:31,y:61,w:38,h:10,clip:'polygon(2% 0,98% 0,90% 100%,10% 100%)',action:'exhaust'}
    ],
    6:[
      {part:'Porta-malas',system:'body',x:53,y:39,w:29,h:16,clip:'polygon(10% 4%,94% 25%,96% 75%,72% 96%,0 69%)'},
      {part:'Lanterna traseira esquerda',system:'lighting',x:52,y:46,w:13,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Lanterna traseira direita',system:'lighting',x:70,y:46,w:13,h:9,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Parachoque traseiro',system:'body',x:57,y:57,w:31,h:16,clip:'polygon(3% 8%,100% 12%,98% 75%,78% 100%,0 78%)'},
      {part:'Escapamento',system:'exhaust',x:57,y:61,w:30,h:10,clip:'polygon(0 5%,100% 5%,94% 100%,8% 100%)',action:'exhaust'},
      {part:'Roda traseira esquerda',system:'wheels',x:36,y:54,w:15,h:22,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Roda dianteira esquerda',system:'wheels',x:11,y:52,w:12,h:21,clip:'ellipse(48% 48% at 50% 50%)'}
    ],
    7:[
      {part:'Roda dianteira esquerda',system:'wheels',x:17,y:53,w:14,h:22,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Roda traseira esquerda',system:'wheels',x:70,y:53,w:14,h:22,clip:'ellipse(48% 48% at 50% 50%)'},
      {part:'Porta dianteira esquerda',system:'body',x:30,y:40,w:20,h:22,clip:'polygon(4% 4%,96% 3%,96% 96%,8% 96%)'},
      {part:'Porta traseira esquerda',system:'body',x:49,y:40,w:20,h:22,clip:'polygon(5% 3%,96% 5%,95% 96%,4% 96%)'},
      {part:'Saia lateral esquerda',system:'body',x:30,y:64,w:40,h:7,clip:'polygon(1% 5%,99% 18%,96% 95%,4% 80%)'},
      {part:'Escapamento',system:'exhaust',x:80,y:57,w:13,h:14,clip:'ellipse(48% 48% at 50% 50%)',action:'exhaust'}
    ]
  },
  hood:[
    {part:'Motor M274.910',system:'engine',x:34,y:37,w:34,h:30,clip:'polygon(8% 6%,88% 2%,98% 58%,80% 96%,12% 96%,0 48%)',action:'engine'},
    {part:'Caixa do filtro de ar',system:'engine',x:19,y:43,w:17,h:22,clip:'polygon(10% 8%,90% 8%,95% 92%,4% 88%)'},
    {part:'Reservatório de expansão',system:'cooling',x:16,y:50,w:13,h:20,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Admissão de ar',system:'engine',x:37,y:58,w:33,h:12,clip:'polygon(0 25%,92% 4%,100% 72%,15% 98%)'},
    {part:'Eletrônica / ECU',system:'electrical',x:71,y:42,w:14,h:18,clip:'polygon(5% 5%,95% 5%,92% 95%,8% 95%)'},
    {part:'Capô',system:'body',x:25,y:6,w:52,h:24,clip:'polygon(0 4%,100% 3%,88% 100%,12% 100%)'}
  ],
  engine:[
    {part:'Tampa do motor',system:'engine',x:34,y:18,w:36,h:31,clip:'polygon(10% 0,87% 7%,100% 74%,76% 100%,20% 94%,0 55%)'},
    {part:'Turbo',system:'engine',x:18,y:35,w:19,h:29,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Sistema de admissão',system:'engine',x:65,y:25,w:25,h:24,clip:'polygon(0 10%,100% 0,95% 95%,10% 100%)'},
    {part:'Alternador',system:'engine',x:66,y:51,w:16,h:18,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Correia e tensores',system:'engine',x:44,y:55,w:24,h:24,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Compressor do ar-condicionado',system:'engine',x:63,y:66,w:19,h:19,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Tampa / enchimento de óleo',system:'engine',x:54,y:22,w:10,h:10,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Bomba d\'água / arrefecimento',system:'cooling',x:31,y:58,w:18,h:18,clip:'ellipse(48% 48% at 50% 50%)'}
  ],
  exhaust:[
    {part:'Silencioso esquerdo',system:'exhaust',x:17,y:27,w:24,h:30,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Silencioso direito',system:'exhaust',x:64,y:25,w:24,h:30,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Tubo central do escape',system:'exhaust',x:38,y:31,w:30,h:18,clip:'polygon(0 35%,100% 0,100% 60%,0 95%)'},
    {part:'Ponteira esquerda',system:'exhaust',x:20,y:46,w:17,h:16,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Ponteira direita',system:'exhaust',x:72,y:44,w:17,h:16,clip:'ellipse(48% 48% at 50% 50%)'},
    {part:'Sistema de escape completo',system:'exhaust',x:14,y:22,w:76,h:42,clip:'polygon(4% 25%,24% 0,44% 28%,62% 16%,96% 7%,96% 62%,62% 60%,45% 75%,24% 55%,3% 80%)'}
  ]
};

const $ = (selector) => document.querySelector(selector);
const fmtMoney = (value) => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(Number(value || 0));
const fmtDate = (value) => {
  if (!value) return '';
  const [y,m,d] = value.split('-');
  return `${d}/${m}/${y}`;
};
const escapeHTML = (value='') => value.replace(/[&<>'"]/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

function saveRecords(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

function statusDot(status){
  if (status === 'done') return '<span class="status-dot dot-done"></span>';
  if (status === 'planned') return '<span class="status-dot dot-planned"></span>';
  return '<span class="status-dot dot-pending"></span>';
}

function statusLabel(status){
  if (status === 'done') return 'Feito';
  if (status === 'planned') return 'Planejado';
  return 'Pendente';
}

function updateTotals(){
  const spent = state.records.reduce((acc, item) => acc + Number(item.spent || 0), 0);
  const remain = state.records.filter((item) => item.status !== 'done').reduce((acc, item) => acc + Number(item.estimated || 0), 0);
  const total = spent + remain;
  const pct = total ? Math.min(100, Math.round((spent / total) * 100)) : 0;

  $('#projectTotal').textContent = fmtMoney(total);
  $('#spentTotal').textContent = `${fmtMoney(spent)} gastos`;
  $('#remainTotal').textContent = `${fmtMoney(remain)} restantes`;
  $('#progressBar').style.width = `${pct}%`;
  $('#statSpent').textContent = fmtMoney(spent);
  $('#statRemain').textContent = fmtMoney(remain);
  $('#statCount').textContent = state.records.length;
}

function currentModeLabel(){
  return ({car:'Carro completo', hood:'Capô / cofre', engine:'Motor M274.910', exhaust:'Escapamento'})[state.mode];
}

function setPanelContent(){
  const config = {
    car: {
      eyebrow: 'Visão geral',
      title: 'Projeto da C180',
      description: 'Clique na peça desejada. O hover agora apenas destaca a área, sem poluir a tela.',
      viewerTitle: 'C180 360°',
      viewerSubtitle: 'Passe o mouse na peça para destacar e clique para abrir.',
      badge: 'EXTERNO',
      help: 'Arraste para girar o carro. Nas vistas traseiras, o escapamento abre um modo separado.',
      actions: [
        {label:'Adicionar registro geral', primary:true, onClick:() => openModal('Geral','general')}
      ]
    },
    hood: {
      eyebrow: 'Mecânica',
      title: 'Cofre do motor',
      description: 'O capô foi aberto. Aqui você pode registrar serviços do cofre ou clicar no motor para entrar no modo do M274.910.',
      viewerTitle: 'Capô aberto',
      viewerSubtitle: 'Clique no motor para abrir a visão interna.',
      badge: 'COFRE',
      help: 'Passe o mouse sobre as áreas do cofre. Clique no motor para abrir a vista dedicada do conjunto.',
      actions: [
        {label:'Abrir motor M274.910', primary:true, onClick:() => setMode('engine')},
        {label:'Registrar no capô', primary:false, onClick:() => openModal('Capô','body')}
      ]
    },
    engine: {
      eyebrow: 'Motor',
      title: 'M274.910 1.6 Turbo',
      description: 'Selecione turbo, admissão, alternador, correia e outros componentes do motor.',
      viewerTitle: 'Motor M274.910',
      viewerSubtitle: 'Motor da C180 W205 2015 com componentes selecionáveis.',
      badge: 'MOTOR',
      help: 'Use os botões de ângulo e também o arraste para mudar a posição da visualização do motor.',
      actions: [
        {label:'Abrir referência exata do M274.910 ↗', primary:true, onClick:() => window.open(EXACT_ENGINE_URL, '_blank', 'noopener')},
        {label:'Registrar no motor completo', primary:false, onClick:() => openModal('Motor M274.910','engine')}
      ]
    },
    exhaust: {
      eyebrow: 'Escapamento',
      title: 'Sistema de escape',
      description: 'O escape fica isolado do carro para você registrar exatamente o que foi alterado ou será comprado.',
      viewerTitle: 'Escapamento',
      viewerSubtitle: 'Selecione silenciosos, ponteiras ou sistema completo.',
      badge: 'ESCAPE',
      help: 'Passe o mouse em cada trecho do escape e clique para registrar custo, alteração ou peça futura.',
      actions: [
        {label:'Registrar sistema completo', primary:true, onClick:() => openModal('Sistema de escape completo','exhaust')}
      ]
    }
  }[state.mode];

  $('#panelEyebrow').textContent = config.eyebrow;
  $('#panelTitle').textContent = config.title;
  $('#panelDescription').textContent = config.description;
  $('#viewTitle').textContent = config.viewerTitle;
  $('#viewSubtitle').textContent = config.viewerSubtitle;
  $('#modeBadge').textContent = config.badge;
  $('#viewerHelp').textContent = config.help;
  $('#modeChip').textContent = currentModeLabel();

  const area = $('#actionArea');
  area.innerHTML = '';
  config.actions.forEach((action) => {
    const btn = document.createElement('button');
    btn.className = `btn ${action.primary ? 'btn-primary' : 'btn-ghost'}`;
    btn.textContent = action.label;
    btn.addEventListener('click', action.onClick);
    area.appendChild(btn);
  });

  $('#backBtn').hidden = state.mode === 'car';
  $('#enginePrevBtn').hidden = state.mode !== 'engine';
  $('#engineNextBtn').hidden = state.mode !== 'engine';
}

function renderHistory(part = null){
  const list = part ? state.records.filter((record) => record.part === part) : state.records.slice(0, 10);
  $('#historyHeading').textContent = part ? `Histórico: ${part}` : 'Últimos registros';
  const target = $('#historyList');
  target.innerHTML = '';

  if (!list.length){
    target.innerHTML = '<div class="history-item"><div class="history-meta">Nenhum registro até agora.</div></div>';
    return;
  }

  list.forEach((record) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-title">${statusDot(record.status)}${escapeHTML(record.work)}</div>
      <div class="history-meta">${escapeHTML(record.part)} • ${statusLabel(record.status)}${record.date ? ' • ' + fmtDate(record.date) : ''} • ${fmtMoney(record.status === 'done' ? record.spent : record.estimated)}</div>
    `;
    target.appendChild(item);
  });
}

function modalHistory(part){
  const records = state.records.filter((record) => record.part === part);
  const wrap = $('#modalHistoryWrap');
  const list = $('#modalHistoryList');
  list.innerHTML = '';
  wrap.hidden = records.length === 0;
  records.slice(0, 6).forEach((record) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-title">${statusDot(record.status)}${escapeHTML(record.work)}</div>
      <div class="history-meta">${statusLabel(record.status)}${record.date ? ' • ' + fmtDate(record.date) : ''} • ${fmtMoney(record.status === 'done' ? record.spent : record.estimated)}</div>
    `;
    list.appendChild(item);
  });
}

function openModal(part, system){
  $('#recordPart').value = part;
  $('#recordSystem').value = system;
  $('#modalTitle').textContent = part;
  modalHistory(part);
  $('#recordModal').classList.add('open');
  $('#recordModal').setAttribute('aria-hidden', 'false');
}

function closeModal(){
  $('#recordForm').reset();
  $('#recordModal').classList.remove('open');
  $('#recordModal').setAttribute('aria-hidden', 'true');
}

function renderHotspots(list){
  const layer = $('#hotspotLayer');
  layer.innerHTML = '';

  list.forEach((hotspot) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot';
    btn.dataset.label = hotspot.part;
    btn.style.left = `${hotspot.x}%`;
    btn.style.top = `${hotspot.y}%`;
    btn.style.width = `${hotspot.w}%`;
    btn.style.height = `${hotspot.h}%`;
    btn.style.setProperty('--clip', hotspot.clip);
    btn.addEventListener('mouseenter', () => renderHistory(hotspot.part));
    btn.addEventListener('mouseleave', () => renderHistory());
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (hotspot.action === 'hood') return setMode('hood');
      if (hotspot.action === 'engine') return setMode('engine');
      if (hotspot.action === 'exhaust') return setMode('exhaust');
      openModal(hotspot.part, hotspot.system);
    });
    layer.appendChild(btn);
  });
}

function renderImage(){
  const img = $('#stageImage');
  const patch = $('#badgePatch');
  patch.hidden = true;

  if (state.mode === 'car'){
    img.src = assets.car[state.frame];
    renderHotspots(hotspots.car[state.frame] || []);
    if ([4, 6].includes(state.frame)){
      patch.hidden = false;
      patch.style.left = '16%';
      patch.style.top = '39.5%';
    }
    if (state.frame === 5){
      patch.hidden = false;
      patch.style.left = '35.9%';
      patch.style.top = '38.3%';
    }
    return;
  }
  if (state.mode === 'hood'){
    img.src = assets.hood;
    renderHotspots(hotspots.hood);
    return;
  }
  if (state.mode === 'engine'){
    img.src = assets.engine[state.engineFrame];
    renderHotspots(hotspots.engine);
    return;
  }
  img.src = assets.exhaust;
  renderHotspots(hotspots.exhaust);
}

function setMode(mode){
  state.mode = mode;
  state.playing = false;
  $('#autoBtn').textContent = 'Reproduzir rotação';
  renderImage();
  setPanelContent();
  renderHistory();
}

function nextFrame(){
  if (state.mode === 'car'){
    state.frame = Math.min(assets.car.length - 1, state.frame + 1);
  } else if (state.mode === 'engine'){
    state.engineFrame = (state.engineFrame + 1) % assets.engine.length;
  }
  renderImage();
}

function prevFrame(){
  if (state.mode === 'car'){
    state.frame = Math.max(0, state.frame - 1);
  } else if (state.mode === 'engine'){
    state.engineFrame = (state.engineFrame - 1 + assets.engine.length) % assets.engine.length;
  }
  renderImage();
}

function exportJSON(){
  const blob = new Blob([JSON.stringify(state.records, null, 2)], {type:'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'garage-c180-pro-dados.json';
  link.click();
  URL.revokeObjectURL(link.href);
}

function importJSON(file){
  file.text().then((content) => {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) throw new Error('Formato inválido');
    state.records = parsed;
    saveRecords();
    updateTotals();
    renderHistory();
  }).catch(() => {
    alert('Arquivo inválido.');
  });
}

function bindEvents(){
  $('#prevBtn').addEventListener('click', prevFrame);
  $('#nextBtn').addEventListener('click', nextFrame);
  $('#enginePrevBtn').addEventListener('click', prevFrame);
  $('#engineNextBtn').addEventListener('click', nextFrame);

  $('#autoBtn').addEventListener('click', () => {
    state.playing = !state.playing;
    $('#autoBtn').textContent = state.playing ? 'Pausar rotação' : 'Reproduzir rotação';
  });

  $('#backBtn').addEventListener('click', () => {
    if (state.mode === 'engine') setMode('hood');
    else setMode('car');
  });

  const stage = $('#stage');
  stage.addEventListener('pointerdown', (event) => {
    if (!['car', 'engine'].includes(state.mode)) return;
    state.dragging = true;
    state.startX = event.clientX;
    state.startFrame = state.mode === 'car' ? state.frame : state.engineFrame;
    stage.setPointerCapture?.(event.pointerId);
  });

  stage.addEventListener('pointermove', (event) => {
    if (!state.dragging) return;
    const dx = event.clientX - state.startX;
    if (state.mode === 'car'){
      state.frame = Math.max(0, Math.min(assets.car.length - 1, Math.round(state.startFrame + dx / 36)));
    } else {
      const n = assets.engine.length;
      state.engineFrame = ((Math.round(state.startFrame + dx / 44) % n) + n) % n;
    }
    renderImage();
  });

  ['pointerup','pointercancel','pointerleave'].forEach((evt) => {
    stage.addEventListener(evt, () => state.dragging = false);
  });

  setInterval(() => {
    if (!state.playing || state.dragging) return;
    if (state.mode === 'car'){
      state.frame += state.direction;
      if (state.frame >= assets.car.length - 1){ state.frame = assets.car.length - 1; state.direction = -1; }
      if (state.frame <= 0){ state.frame = 0; state.direction = 1; }
      renderImage();
    }
    if (state.mode === 'engine'){
      state.engineFrame = (state.engineFrame + 1) % assets.engine.length;
      renderImage();
    }
  }, 240);

  $('#exportBtn').addEventListener('click', exportJSON);
  $('#importInput').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) importJSON(file);
    event.target.value = '';
  });

  $('#closeModalBtn').addEventListener('click', closeModal);
  $('#cancelModalBtn').addEventListener('click', closeModal);
  $('#recordModal').addEventListener('click', (event) => {
    if (event.target.id === 'recordModal') closeModal();
  });

  $('#recordForm').addEventListener('submit', (event) => {
    event.preventDefault();
    state.records.unshift({
      id: crypto.randomUUID(),
      part: $('#recordPart').value || 'Geral',
      system: $('#recordSystem').value || 'general',
      work: $('#recordWork').value.trim(),
      change: $('#recordChange').value.trim(),
      status: $('#recordStatus').value,
      estimated: Number($('#recordEstimated').value || 0),
      spent: Number($('#recordSpent').value || 0),
      km: Number($('#recordKm').value || 0),
      date: $('#recordDate').value,
      plannedDate: $('#recordPlannedDate').value,
      link: $('#recordLink').value.trim(),
      notes: $('#recordNotes').value.trim()
    });
    saveRecords();
    updateTotals();
    renderHistory();
    closeModal();
  });
}

function init(){
  bindEvents();
  updateTotals();
  setPanelContent();
  renderImage();
  renderHistory();
}

document.addEventListener('DOMContentLoaded', init);
