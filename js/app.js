
const STORE_KEY = 'garage_c180_pro_v1';
const EXACT_ENGINE_URL = 'https://enginesteps.com/mercedes-benz/m274-910/';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const assets = {
  car: Array.from({length:8},(_,i)=>`assets/car_${i}.webp`),
  hood:'assets/hood_open.webp',
  engineBay:'assets/engine_bay.webp',
  engine:['assets/engine_0.webp','assets/engine_1.webp','assets/engine_2.webp','assets/engine_1.webp','assets/engine_0.webp','assets/engine_2.webp'],
  exhaust:'assets/exhaust.webp'
};

const state = {
  mode:'car', frame:0, engineFrame:0, playing:false, direction:1,
  dragging:false, moved:false, startX:0, startFrame:0,
  selectedPart:null, selectedSystem:null,
  records: loadRecords()
};

function loadRecords(){
  const keys=[STORE_KEY,'garage_c180_advanced_v1','garage_clean_clickable_v1'];
  for(const key of keys){
    try{ const data=JSON.parse(localStorage.getItem(key)||'null'); if(Array.isArray(data)) return data; }catch{}
  }
  return [];
}

const E='ellipse(48% 48% at 50% 50%)';
const hotspots={
  car:{
    0:[
      h('Capô','body',26,33,28,18,'polygon(7% 38%,27% 8%,88% 16%,97% 70%,66% 94%,16% 82%)','hood'),
      h('Farol dianteiro esquerdo','lighting',18,48,13,10,E),h('Grade dianteira','body',25,49,18,15,E),
      h('Parachoque dianteiro','body',11,57,30,16,'polygon(0 35%,24% 2%,92% 15%,100% 72%,65% 100%,10% 86%)'),
      h('Roda dianteira esquerda','wheels',47,55,15,23,E),h('Roda traseira esquerda','wheels',74,52,14,22,E),
      h('Porta dianteira esquerda','body',49,40,18,20,'polygon(4% 7%,96% 2%,91% 98%,7% 94%)'),
      h('Porta traseira esquerda','body',65,40,16,20,'polygon(5% 2%,94% 10%,96% 95%,8% 98%)'),
      h('Retrovisor esquerdo','body',43,39,8,8,E),h('Para-brisa','glass',38,28,24,15,'polygon(14% 0,88% 9%,99% 100%,0 100%)')
    ],
    1:[h('Capô','body',35,33,30,19,'polygon(10% 39%,24% 4%,78% 4%,95% 43%,84% 95%,18% 95%)','hood'),h('Farol dianteiro esquerdo','lighting',28,47,14,10,E),h('Farol dianteiro direito','lighting',58,47,14,10,E),h('Grade dianteira','body',39,47,22,18,E),h('Parachoque dianteiro','body',29,58,42,16,'polygon(3% 15%,97% 15%,91% 93%,9% 93%)'),h('Para-brisa','glass',39,27,22,15,'polygon(13% 0,87% 0,100% 100%,0 100%)')],
    2:[h('Capô','body',46,33,29,18,'polygon(4% 20%,71% 8%,94% 39%,82% 84%,24% 94%,8% 66%)','hood'),h('Farol dianteiro direito','lighting',68,48,13,10,E),h('Grade dianteira','body',58,49,18,15,E),h('Parachoque dianteiro','body',59,57,30,16,'polygon(8% 15%,82% 0,100% 35%,92% 86%,32% 100%,0 72%)'),h('Roda dianteira direita','wheels',38,55,15,23,E),h('Roda traseira direita','wheels',11,52,14,22,E),h('Porta dianteira direita','body',33,40,18,20,'polygon(4% 2%,96% 8%,92% 96%,7% 98%)'),h('Porta traseira direita','body',19,40,16,20,'polygon(6% 10%,94% 2%,92% 98%,5% 95%)'),h('Retrovisor direito','body',50,39,8,8,E),h('Para-brisa','glass',38,28,24,15,'polygon(12% 9%,86% 0,100% 100%,0 100%)')],
    3:[h('Roda dianteira direita','wheels',69,52,16,24,E),h('Roda traseira direita','wheels',16,52,16,24,E),h('Porta dianteira direita','body',49,39,21,24,'polygon(3% 3%,97% 4%,93% 97%,4% 96%)'),h('Porta traseira direita','body',30,39,20,24,'polygon(4% 5%,95% 3%,97% 96%,6% 96%)'),h('Saia lateral direita','body',31,64,40,8,'polygon(1% 18%,99% 5%,96% 80%,4% 95%)'),h('Retrovisor direito','body',68,37,8,8,E),h('Escapamento','exhaust',7,56,15,16,E,'exhaust')],
    4:[h('Porta-malas','body',17,38,31,18,'polygon(6% 25%,90% 4%,100% 69%,28% 96%,4% 75%)'),h('Lanterna traseira direita','lighting',34,45,14,10,E),h('Lanterna traseira esquerda','lighting',16,45,14,10,E),h('Parachoque traseiro','body',11,56,33,18,'polygon(0 12%,97% 8%,100% 78%,22% 100%,2% 75%)'),h('Escapamento','exhaust',12,60,32,12,'polygon(0 5%,100% 5%,92% 100%,6% 100%)','exhaust'),h('Roda traseira direita','wheels',48,53,16,24,E),h('Roda dianteira direita','wheels',75,51,14,23,E)],
    5:[h('Porta-malas','body',36,37,29,19,'polygon(5% 10%,95% 10%,91% 92%,8% 92%)'),h('Lanterna traseira esquerda','lighting',28,44,15,10,E),h('Lanterna traseira direita','lighting',57,44,15,10,E),h('Parachoque traseiro','body',30,56,40,18,'polygon(2% 5%,98% 5%,91% 95%,9% 95%)'),h('Escapamento','exhaust',30,60,40,12,'polygon(2% 0,98% 0,90% 100%,10% 100%)','exhaust'),h('Vidro traseiro','glass',38,28,24,14,'polygon(10% 0,90% 0,100% 100%,0 100%)')],
    6:[h('Porta-malas','body',52,38,31,18,'polygon(10% 4%,94% 25%,96% 75%,72% 96%,0 69%)'),h('Lanterna traseira esquerda','lighting',51,45,14,10,E),h('Lanterna traseira direita','lighting',70,45,14,10,E),h('Parachoque traseiro','body',56,56,33,18,'polygon(3% 8%,100% 12%,98% 75%,78% 100%,0 78%)'),h('Escapamento','exhaust',56,60,32,12,'polygon(0 5%,100% 5%,94% 100%,8% 100%)','exhaust'),h('Roda traseira esquerda','wheels',35,53,16,24,E),h('Roda dianteira esquerda','wheels',10,51,14,23,E)],
    7:[h('Roda dianteira esquerda','wheels',16,52,16,24,E),h('Roda traseira esquerda','wheels',69,52,16,24,E),h('Porta dianteira esquerda','body',29,39,21,24,'polygon(4% 4%,96% 3%,96% 96%,8% 96%)'),h('Porta traseira esquerda','body',49,39,21,24,'polygon(5% 3%,96% 5%,95% 96%,4% 96%)'),h('Saia lateral esquerda','body',29,64,41,8,'polygon(1% 5%,99% 18%,96% 95%,4% 80%)'),h('Retrovisor esquerdo','body',24,37,8,8,E),h('Escapamento','exhaust',79,56,15,16,E,'exhaust')]
  },
  hood:[h('Motor M274.910','engine',34,36,35,31,'polygon(7% 6%,88% 2%,98% 58%,80% 96%,12% 96%,0 48%)','engine'),h('Caixa do filtro de ar','engine',18,42,18,23,'polygon(10% 8%,90% 8%,95% 92%,4% 88%)'),h('Reservatório de expansão','cooling',15,49,14,21,E),h('Admissão de ar','engine',37,57,34,13,'polygon(0 25%,92% 4%,100% 72%,15% 98%)'),h('Eletrônica / ECU','electrical',70,41,15,19,'polygon(5% 5%,95% 5%,92% 95%,8% 95%)'),h('Capô','body',24,5,54,26,'polygon(0 4%,100% 3%,88% 100%,12% 100%)')],
  engine:[h('Tampa do motor','engine',34,17,37,32,'polygon(10% 0,87% 7%,100% 74%,76% 100%,20% 94%,0 55%)'),h('Turbo','engine',17,34,20,30,E),h('Sistema de admissão','engine',64,24,26,25,'polygon(0 10%,100% 0,95% 95%,10% 100%)'),h('Alternador','engine',65,50,17,19,E),h('Correia e tensores','engine',43,54,25,25,E),h('Compressor do ar-condicionado','engine',62,65,20,20,E),h('Tampa / enchimento de óleo','engine',53,21,11,11,E),h("Bomba d'água / arrefecimento",'cooling',30,57,19,19,E)],
  exhaust:[h('Silencioso esquerdo','exhaust',16,26,25,31,E),h('Silencioso direito','exhaust',63,24,25,31,E),h('Tubo central do escape','exhaust',37,30,31,19,'polygon(0 35%,100% 0,100% 60%,0 95%)'),h('Ponteira esquerda','exhaust',19,45,18,17,E),h('Ponteira direita','exhaust',71,43,18,17,E),h('Sistema de escape completo','exhaust',13,21,78,44,'polygon(4% 25%,24% 0,44% 28%,62% 16%,96% 7%,96% 62%,62% 60%,45% 75%,24% 55%,3% 80%)')]
};
function h(part,system,x,y,w,h,clip,action){return {part,system,x,y,w,h,clip,action};}

const modeConfig={
  car:{kicker:'VEÍCULO',title:'Carro completo',desc:'Clique diretamente em uma peça. O capô abre o cofre e o escape é isolado ao selecionar.',scene:'EXTERNO',sceneTitle:'C180 • Visão geral',hint:'Arraste para girar. Passe o mouse nas peças para selecionar.',actions:[['Adicionar registro geral','general','primary']]},
  hood:{kicker:'MECÂNICA',title:'Capô aberto',desc:'O capô abriu. Clique no motor para entrar no M274.910 ou selecione os conjuntos do cofre.',scene:'COFRE',sceneTitle:'Capô aberto • M274.910',hint:'Passe o mouse no cofre. Clique no motor para abrir a visão dedicada.',actions:[['Abrir motor M274.910','engine','primary'],['Registrar no capô','hoodRecord','']]},
  engine:{kicker:'MOTOR',title:'M274.910 1.6 Turbo',desc:'Selecione turbo, admissão, alternador, correias, compressor e outros componentes.',scene:'MOTOR',sceneTitle:'Motor M274.910 • 360°',hint:'Arraste ou use as setas para girar o motor. Clique em um componente para registrar.',actions:[['Referência 3D exata do M274.910 ↗','engineExact','primary'],['Registrar no motor completo','engineRecord','']]},
  exhaust:{kicker:'ESCAPAMENTO',title:'Sistema de escape',desc:'O conjunto saiu visualmente do carro. Selecione silenciosos, tubo central ou ponteiras.',scene:'ESCAPE',sceneTitle:'Escapamento • Vista isolada',hint:'Clique nos trechos do sistema para registrar cada alteração.',actions:[['Registrar sistema completo','exhaustRecord','primary']]}
};

function money(v){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v||0));}
function dateBR(v){if(!v)return '';const [y,m,d]=v.split('-');return `${d}/${m}/${y}`;}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function save(){localStorage.setItem(STORE_KEY,JSON.stringify(state.records));}
function statusLabel(s){return s==='done'?'Feito':s==='planned'?'Planejado':'Pendente';}
function statusClass(s){return s==='done'?'done':s==='planned'?'planned':'pending';}

function updateProject(){
  const spent=state.records.reduce((a,r)=>a+Number(r.spent||0),0);
  const remain=state.records.filter(r=>r.status!=='done').reduce((a,r)=>a+Number(r.estimated||0),0);
  const total=spent+remain;
  const pct=total?Math.min(100,Math.round(spent/total*100)):0;
  $('#spentTotal').textContent=money(spent);$('#remainTotal').textContent=money(remain);$('#projectTotal').textContent=money(total);$('#progressBar').style.width=`${pct}%`;$('#progressPct').textContent=`${pct}%`;$('#recordCount').textContent=`${state.records.length} registro${state.records.length===1?'':'s'}`;
}

function getImage(){if(state.mode==='car')return assets.car[state.frame];if(state.mode==='hood')return assets.hood;if(state.mode==='engine')return assets.engine[state.engineFrame];return assets.exhaust;}
function getSpots(){if(state.mode==='car')return hotspots.car[state.frame]||[];return hotspots[state.mode]||[];}

function transitionImage(){
  const wrap=$('#canvasWrap');wrap.classList.add('transitioning');
  setTimeout(()=>{ $('#stageImage').src=getImage();renderHotspots();wrap.classList.remove('transitioning'); },120);
}

function setMode(mode,animate=true){
  state.mode=mode;state.playing=false;$('#autoText').textContent='Girar';
  const cfg=modeConfig[mode];$('#sceneMode').textContent=cfg.scene;$('#sceneTitle').textContent=cfg.sceneTitle;$('#sceneHint').lastChild.textContent=' '+cfg.hint;$('#modeKicker').textContent=cfg.kicker;$('#modeTitle').textContent=cfg.title;$('#modeDescription').textContent=cfg.desc;$('#backBtn').hidden=mode==='car';
  renderModeIcon(mode);renderModeActions(cfg.actions);animate?transitionImage():($('#stageImage').src=getImage(),renderHotspots());renderHistory();
}

function renderModeIcon(mode){
  const icons={car:'<svg viewBox="0 0 24 24"><path d="M3 15l2-6h14l2 6v4h-2v-2H5v2H3zM7 13h.01M17 13h.01M6 9l2-4h8l2 4"/></svg>',hood:'<svg viewBox="0 0 24 24"><path d="M3 16h18M5 16l2-8h10l2 8M8 8l2-3h4l2 3"/></svg>',engine:'<svg viewBox="0 0 24 24"><path d="M4 9h3l2-2h6l2 2h3v8h-3l-2 2H9l-2-2H4zM2 11v4M22 11v4"/></svg>',exhaust:'<svg viewBox="0 0 24 24"><path d="M3 14h7l2-3h7v6h-7l-2-3H3zM19 12h2v4h-2"/></svg>'};
  $('#modeIcon').innerHTML=icons[mode];
}
function renderModeActions(actions){const area=$('#modeActions');area.innerHTML='';actions.forEach(([label,action,primary])=>{const b=document.createElement('button');b.className=`mode-action ${primary?'primary':''}`;b.textContent=label;b.onclick=()=>handleAction(action);area.appendChild(b);});}
function handleAction(action){if(action==='general')openDrawer('Geral','general');if(action==='engine')setMode('engine');if(action==='hoodRecord')openDrawer('Capô','body');if(action==='engineExact')window.open(EXACT_ENGINE_URL,'_blank','noopener');if(action==='engineRecord')openDrawer('Motor M274.910','engine');if(action==='exhaustRecord')openDrawer('Sistema de escape completo','exhaust');}

function renderHotspots(){
  const layer=$('#hotspotLayer');layer.innerHTML='';
  getSpots().forEach(s=>{const b=document.createElement('button');b.className='hotspot';b.style.left=`${s.x}%`;b.style.top=`${s.y}%`;b.style.width=`${s.w}%`;b.style.height=`${s.h}%`;b.style.setProperty('--clip',s.clip);b.setAttribute('aria-label',s.part);
    b.onmouseenter=e=>showHover(s,e.currentTarget);b.onmousemove=e=>moveHover(e);b.onmouseleave=hideHover;
    b.onclick=e=>{e.stopPropagation();hideHover();if(s.action==='hood')return setMode('hood');if(s.action==='engine')return setMode('engine');if(s.action==='exhaust')return setMode('exhaust');openDrawer(s.part,s.system,b);};layer.appendChild(b);});
}
function showHover(s,el){$('#hoverLabel').textContent=s.part;$('#hoverLabel').hidden=false;const r=el.getBoundingClientRect(),c=$('#canvasWrap').getBoundingClientRect();$('#hoverLabel').style.left=`${r.left-c.left+r.width/2}px`;$('#hoverLabel').style.top=`${r.top-c.top}px`;}
function moveHover(){}
function hideHover(){$('#hoverLabel').hidden=true;}

function renderHistory(part=null){
  const list=part?state.records.filter(r=>r.part===part):state.records.slice(0,8);$('#historyTitle').textContent=part?`Histórico • ${part}`:'Últimos registros';const root=$('#historyList');root.innerHTML='';if(!list.length){root.innerHTML='<div class="history-item"><div class="history-meta">Nenhum registro ainda.</div></div>';return;}list.forEach(r=>{const el=document.createElement('div');el.className='history-item';el.innerHTML=`<div class="history-title"><i class="history-dot ${statusClass(r.status)}"></i>${esc(r.work)}</div><div class="history-meta">${esc(r.part)} • ${statusLabel(r.status)}${r.date?' • '+dateBR(r.date):''} • ${money(r.status==='done'?r.spent:r.estimated)}</div>`;root.appendChild(el);});
}

function openDrawer(part,system,spotEl=null){
  state.selectedPart=part;state.selectedSystem=system;$$('.hotspot').forEach(x=>x.classList.remove('selected'));if(spotEl)spotEl.classList.add('selected');$('#recordPart').value=part;$('#recordSystem').value=system;$('#drawerSystem').textContent=systemLabel(system);$('#drawerTitle').textContent=part;$('#drawerDescription').textContent=partDescription(part,system);renderDrawerHistory(part);selectStatus('pending');switchTab('register');$('#partDrawer').classList.add('open');$('#drawerBackdrop').classList.add('open');$('#partDrawer').setAttribute('aria-hidden','false');
}
function closeDrawer(){$('#partDrawer').classList.remove('open');$('#drawerBackdrop').classList.remove('open');$('#partDrawer').setAttribute('aria-hidden','true');$$('.hotspot').forEach(x=>x.classList.remove('selected'));state.selectedPart=null;}
function systemLabel(s){return ({body:'CARROCERIA',lighting:'ILUMINAÇÃO',wheels:'RODAS / PNEUS',glass:'VIDROS',engine:'MOTOR',cooling:'ARREFECIMENTO',electrical:'ELÉTRICA',exhaust:'ESCAPAMENTO',general:'GERAL'})[s]||'PEÇA';}
function partDescription(part,system){if(system==='engine')return 'Registre manutenção, upgrade ou substituição deste componente do M274.910.';if(system==='exhaust')return 'Marque o que foi trocado, instalado ou planejado neste trecho do escape.';return 'Registre o que foi feito, o que ainda precisa ser reparado ou o que pretende alterar.';}
function renderDrawerHistory(part){const list=state.records.filter(r=>r.part===part);$('#drawerHistoryCount').textContent=list.length;const root=$('#drawerHistory');root.innerHTML='';if(!list.length){root.innerHTML='<div class="history-item"><div class="history-meta">Nenhum registro nesta peça.</div></div>';return;}list.forEach(r=>{const el=document.createElement('div');el.className='history-item';el.innerHTML=`<div class="history-title"><i class="history-dot ${statusClass(r.status)}"></i>${esc(r.work)}</div><div class="history-meta">${statusLabel(r.status)}${r.date?' • '+dateBR(r.date):''}${r.km?' • '+Number(r.km).toLocaleString('pt-BR')+' km':''}<br>${money(r.status==='done'?r.spent:r.estimated)}${r.change?` • ${esc(r.change)}`:''}</div>`;root.appendChild(el);});}
function selectStatus(status){$('#recordStatus').value=status;$$('#statusSegment button').forEach(b=>b.classList.toggle('active',b.dataset.status===status));}
function switchTab(tab){$$('.drawer-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$$('.drawer-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===tab));}

function changeFrame(delta){if(state.mode==='car'){state.frame=Math.max(0,Math.min(assets.car.length-1,state.frame+delta));}else if(state.mode==='engine'){const n=assets.engine.length;state.engineFrame=(state.engineFrame+delta+n)%n;}else return;transitionImage();}
function home(){if(state.mode==='car'){state.frame=0;transitionImage();}else if(state.mode==='engine'){state.engineFrame=0;transitionImage();}else setMode('car');}

function exportData(){const blob=new Blob([JSON.stringify(state.records,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='garage-c180-dados.json';a.click();URL.revokeObjectURL(a.href);toast('Dados exportados');}
async function importData(file){try{const data=JSON.parse(await file.text());if(!Array.isArray(data))throw 0;state.records=data;save();updateProject();renderHistory();toast('Dados importados');}catch{toast('Arquivo inválido');}}
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1800);}

function bind(){
  $('#prevBtn').onclick=()=>changeFrame(-1);$('#nextBtn').onclick=()=>changeFrame(1);$('#homeBtn').onclick=home;$('#autoBtn').onclick=()=>{state.playing=!state.playing;$('#autoText').textContent=state.playing?'Pausar':'Girar';};$('#backBtn').onclick=()=>state.mode==='engine'?setMode('hood'):setMode('car');$('#addGeneralBtn').onclick=()=>openDrawer('Geral','general');
  $('#drawerClose').onclick=closeDrawer;$('#drawerBackdrop').onclick=closeDrawer;$$('.drawer-tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));$$('#statusSegment button').forEach(b=>b.onclick=()=>selectStatus(b.dataset.status));
  $('#exportBtn').onclick=exportData;$('#importInput').onchange=e=>{const f=e.target.files?.[0];if(f)importData(f);e.target.value='';};
  const canvas=$('#canvasWrap');canvas.onpointerdown=e=>{if(!['car','engine'].includes(state.mode))return;state.dragging=true;state.moved=false;state.startX=e.clientX;state.startFrame=state.mode==='car'?state.frame:state.engineFrame;canvas.classList.add('dragging');canvas.setPointerCapture?.(e.pointerId);};canvas.onpointermove=e=>{if(!state.dragging)return;const dx=e.clientX-state.startX;if(Math.abs(dx)>6)state.moved=true;if(state.mode==='car'){state.frame=Math.max(0,Math.min(assets.car.length-1,Math.round(state.startFrame+dx/34)));}else{const n=assets.engine.length;state.engineFrame=((Math.round(state.startFrame+dx/44)%n)+n)%n;}$('#stageImage').src=getImage();renderHotspots();};const stop=()=>{state.dragging=false;canvas.classList.remove('dragging');};canvas.onpointerup=stop;canvas.onpointercancel=stop;
  $('#recordForm').onsubmit=e=>{e.preventDefault();state.records.unshift({id:crypto.randomUUID(),part:$('#recordPart').value||'Geral',system:$('#recordSystem').value||'general',work:$('#recordWork').value.trim(),change:$('#recordChange').value.trim(),status:$('#recordStatus').value,estimated:Number($('#recordEstimated').value||0),spent:Number($('#recordSpent').value||0),km:Number($('#recordKm').value||0),date:$('#recordDate').value,plannedDate:$('#recordPlannedDate').value,link:$('#recordLink').value.trim(),notes:$('#recordNotes').value.trim()});save();updateProject();renderDrawerHistory(state.selectedPart);renderHistory(state.selectedPart);$('#recordForm').reset();selectStatus('pending');toast('Registro salvo');switchTab('history');};
  setInterval(()=>{if(!state.playing||state.dragging)return;if(state.mode==='car'){state.frame+=state.direction;if(state.frame>=assets.car.length-1){state.frame=assets.car.length-1;state.direction=-1}if(state.frame<=0){state.frame=0;state.direction=1}$('#stageImage').src=getImage();renderHotspots();}else if(state.mode==='engine'){state.engineFrame=(state.engineFrame+1)%assets.engine.length;$('#stageImage').src=getImage();renderHotspots();}},250);
  document.onkeydown=e=>{if(e.key==='Escape')closeDrawer();if(e.key==='ArrowLeft')changeFrame(-1);if(e.key==='ArrowRight')changeFrame(1);};
}

function init(){bind();updateProject();setMode('car',false);}
document.addEventListener('DOMContentLoaded',init);
