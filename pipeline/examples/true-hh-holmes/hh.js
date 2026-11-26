// ===== H.H. Holmes (Chicago 1893 / Philadelphia 1896 / exhumation 2017). True case; drawn props and featureless shapes only =====
function hhTag(c, p, lt, d){ if (p.tag) tag(c, p.tag, 540, 340, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9'); }
function hhLabel(c, s, x, y, a, col='#ff3b30', sz=56){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${sz}px VT`; const w = c.measureText(s).width + 44; c.fillStyle = 'rgba(0,0,0,.78)'; c.fillRect(x - w/2, y - sz*.62, w, sz*1.24); text(c, s, x, y + 2, sz, 'VT', col); c.restore(); }
function hhNight(c, seed){
  bg(c, '#1b2532', '#06080c');
  { const g = c.createRadialGradient(820, 470, 20, 820, 470, 380); g.addColorStop(0, 'rgba(215,225,235,.32)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  c.fillStyle = '#e8ecef'; c.beginPath(); c.arc(820, 470, 44, 0, 7); c.fill();
  const r = R(seed || 9); for (let i = 0; i < 10; i++) pine(c, r()*W, 900 + r()*20, 300 + r()*180, '#0d141a');
}
function hhStone(c, x, y, s, col='#8d918f'){ c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(-80, 0); c.lineTo(-80, -150); c.arc(0, -150, 80, Math.PI, 0); c.lineTo(80, 0); c.closePath(); c.fill(); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-80, -20, 160, 20); c.restore(); }
function hhSoil(c, y0){ c.fillStyle = '#2a3322'; c.fillRect(0, y0, W, 26); c.fillStyle = '#3a2a1c'; c.fillRect(0, y0 + 26, W, 1300 - y0); const r = R(4); c.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 110; i++){ c.beginPath(); c.arc(r()*W, y0 + 40 + r()*(1260 - y0), 2 + r()*5, 0, 7); c.fill(); } }
function hhCoffin(c, x, y, s, open){ c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#5b3b22'; c.beginPath(); c.moveTo(-70, -230); c.lineTo(70, -230); c.lineTo(110, -120); c.lineTo(80, 230); c.lineTo(-80, 230); c.lineTo(-110, -120); c.closePath(); c.fill(); c.strokeStyle = '#2b1a0e'; c.lineWidth = 8; c.stroke();
  if (open){ c.fillStyle = '#1a120b'; c.beginPath(); c.moveTo(-56, -210); c.lineTo(56, -210); c.lineTo(90, -118); c.lineTo(64, 210); c.lineTo(-64, 210); c.lineTo(-90, -118); c.closePath(); c.fill(); }
  c.restore(); }
// 0 · night cemetery, crew lights, digging
SC.hhgrave = (c, p, lt, d) => {
  hhNight(c, 9); hhSoil(c, 900);
  [[150, 900, .7], [320, 905, .8], [930, 902, .75]].forEach(([x, y, s]) => hhStone(c, x, y, s, '#6f7472'));
  // work light on a tripod
  c.fillStyle = '#2a2a2a'; c.fillRect(806, 560, 10, 340); c.fillRect(770, 540, 80, 40);
  const fl = .9 + .1*Math.sin(lt*7); { const g = c.createRadialGradient(560, 900, 20, 560, 900, 420); g.addColorStop(0, `rgba(255,240,200,${.42*fl})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  // the open pit with a measuring pole
  const dep = 120 + 160*ease(lt/(d*.8));
  c.fillStyle = '#120c07'; c.fillRect(440, 926, 240, dep);
  c.fillStyle = '#4a3523'; c.beginPath(); c.ellipse(320, 930, 110, 46, 0, Math.PI, 0); c.fill(); c.beginPath(); c.ellipse(790, 930, 100, 40, 0, Math.PI, 0); c.fill();
  kshovel(c, 760, 900, .35);
  // featureless crew silhouettes at the edge
  [[400, 900], [700, 900]].forEach(([x, y], i) => { c.fillStyle = '#050608'; c.beginPath(); c.arc(x, y - 210, 28, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 40, y - 180, 80, 150, 18); c.fill(); c.fillRect(x - 34, y - 40, 26, 40); c.fillRect(x + 8, y - 40, 26, 40); });
  if (p.big){ const a = ease((lt - (p.bigAt || .1)*d)/.3); hhLabel(c, p.big, 540, 520, a, '#ff3b30', 74); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1120, ease((lt - (p.stampAt || .6)*d)/.18), 84, -.08);
  hhTag(c, p, lt, d);
};
// 2 · Chicago street, 1893, three-storey corner building, fair's big wheel in the distance
function hhBuilding(c, x, y, s, lit){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#3b2a22'; c.fillRect(-300, -520, 600, 520);                      // brick block
  c.fillStyle = '#2b1d17'; c.fillRect(-320, -545, 640, 30); c.fillRect(-300, -180, 600, 16);
  // corner turret (bay)
  c.fillStyle = '#33241d'; c.fillRect(220, -600, 110, 600); c.beginPath(); c.moveTo(210, -600); c.lineTo(275, -680); c.lineTo(340, -600); c.closePath(); c.fill();
  // upper windows (2 rows) — a few lit
  const r = R(21); for (let row = 0; row < 2; row++) for (let i = 0; i < 6; i++){ const wx = -270 + i*82, wy = -490 + row*160; const on = lit && r() > .55; c.fillStyle = on ? 'rgba(255,200,120,.85)' : '#120d0b'; c.fillRect(wx, wy, 50, 100); c.fillStyle = '#2b1d17'; c.fillRect(wx + 22, wy, 6, 100); }
  for (let row = 0; row < 2; row++){ c.fillStyle = lit && row === 0 ? 'rgba(255,200,120,.7)' : '#120d0b'; c.fillRect(250, -560 + row*160, 50, 100); }
  // shopfronts
  for (let i = 0; i < 3; i++){ const sx = -280 + i*190; c.fillStyle = 'rgba(255,214,150,.55)'; c.fillRect(sx, -150, 160, 110); c.fillStyle = '#1a120e'; c.fillRect(sx, -150, 160, 10); c.fillRect(sx + 76, -150, 8, 110); c.fillStyle = '#5a2c22'; c.beginPath(); c.moveTo(sx - 8, -170); c.lineTo(sx + 168, -170); c.lineTo(sx + 176, -140); c.lineTo(sx - 16, -140); c.closePath(); c.fill(); }
  c.fillStyle = '#0d0907'; c.fillRect(-20, -150, 0, 0); c.restore();
}
function hhWheel(c, x, y, r, a){ c.save(); c.globalAlpha = a; c.strokeStyle = 'rgba(160,175,190,.55)'; c.lineWidth = 5; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke(); c.beginPath(); c.arc(x, y, r*.9, 0, 7); c.stroke();
  for (let k = 0; k < 18; k++){ const t = k/18*Math.PI*2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(t)*r, y + Math.sin(t)*r); c.stroke(); }
  c.lineWidth = 8; c.beginPath(); c.moveTo(x - r*.6, y + r*1.25); c.lineTo(x, y); c.lineTo(x + r*.6, y + r*1.25); c.stroke(); c.restore(); }
SC.hhstreet = (c, p, lt, d) => {
  bg(c, '#243040', '#0a0d12');
  hhWheel(c, 860, 560, 170, .9);
  text(c, '1893 WORLD\'S FAIR', 860, 820, 34, 'VT', 'rgba(215,251,233,.6)');
  hhBuilding(c, 470, 1150, .8, true);
  c.fillStyle = '#16181c'; c.fillRect(0, 1150, W, 200); c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(0, 1150, W, 6);
  // gas lamp
  c.fillStyle = '#111'; c.fillRect(900, 950, 12, 200); c.save(); c.shadowColor = '#ffcf7a'; c.shadowBlur = 40; c.fillStyle = '#ffd890'; c.fillRect(886, 920, 40, 40); c.restore();
  if (p.notes) p.notes.forEach(([s, at], i) => hhLabel(c, s, 470, 450 + i*80, ease((lt - at*d)/.2), '#d7fbe9', 48));
  hhTag(c, p, lt, d);
};
// 3/4 · newspaper sketch of the 'castle' cross-section with claimed features
SC.hhcastle = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 830); c.rotate(-.025); const z = .86 + .04*lt/d; c.scale(z, z);
  paper(c, 0, 0, 860, 900, 0, '#e4dcc6');
  text(c, 'THE DAILY PAPER · 1895', 0, -395, 34, 'Type', '#333'); c.fillStyle = '#1b1b1b'; c.fillRect(-400, -370, 800, 5);
  text(c, '"MURDER CASTLE"', 0, -300, 96, 'Anton', '#141414');
  // cross-section sketch: 3 floors + basement
  c.strokeStyle = '#222'; c.lineWidth = 6; c.strokeRect(-330, -200, 660, 480); for (let f = 1; f < 4; f++){ c.beginPath(); c.moveTo(-330, -200 + f*120); c.lineTo(330, -200 + f*120); c.stroke(); }
  c.lineWidth = 3; [[-120, -200, 120], [100, -80, 120], [-40, 40, 120]].forEach(([x, y, h]) => { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + h); c.stroke(); });
  const feats = [
    ['TRAPDOORS', -230, -86, () => { c.strokeStyle = '#a01010'; c.lineWidth = 5; c.strokeRect(-280, -92, 90, 14); }],
    ['SECRET ROOMS', 210, -150, () => { c.fillStyle = 'rgba(160,16,16,.25)'; c.fillRect(140, -196, 186, 112); }],
    ['CHUTE', 40, 150, () => { c.strokeStyle = '#a01010'; c.lineWidth = 7; c.beginPath(); c.moveTo(-230, -70); c.lineTo(-230, 160); c.lineTo(-60, 260); c.stroke(); }],
  ];
  feats.forEach(([s, x, y, draw], i) => { const at = (p.feats || [.35, .55, .75])[i]; const a = ease((lt - at*d)/.15); if (a <= 0) return; c.save(); c.globalAlpha = a; draw(); text(c, s, x, y, 42, 'Anton', '#a01010'); if (p.strike){ const k = ease((lt - (p.strikeAt || .45)*d - i*.1)/.15); c.strokeStyle = '#c4161c'; c.lineWidth = 8; c.beginPath(); c.moveTo(x - 140, y); c.lineTo(x - 140 + 280*k, y); c.stroke(); } c.restore(); });
  text(c, 'BASEMENT', -230, 250, 30, 'Type', '#444');
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1080, ease((lt - (p.stampAt || .6)*d)/.18), 96, -.1);
  hhTag(c, p, lt, d);
};
// 6 · 27 claimed → about 9 confirmed
SC.hhcount = (c, p, lt, d) => {
  bg(c, '#070909', '#000');
  text(c, 'CONFESSED', 330, 470, 56, 'VT', '#d7fbe9'); text(c, 'CONFIRMED', 750, 470, 56, 'VT', '#d7fbe9');
  c.save(); c.globalAlpha = .55; text(c, '27', 330, 650, 230, 'VT', '#aab'); c.restore();
  c.strokeStyle = 'rgba(255,59,48,.8)'; c.lineWidth = 10; const k = ease((lt - .15*d)/.2); c.beginPath(); c.moveTo(220, 650); c.lineTo(220 + 220*k, 650); c.stroke();
  const n = Math.round(27 - 18*ease((lt - .25*d)/(d*.4)));
  c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, (lt > .25*d ? '~' : '') + n, 750, 650, 230, 'VT', '#ff3b30'); c.restore();
  hhLabel(c, 'ACCORDING TO HISTORIANS', 540, 900, ease((lt - .6*d)/.25), '#ff8a7a', 50);
  hhTag(c, p, lt, d);
};
// 7 · fortress-style prison front at dawn (no gallows)
SC.hhprison = (c, p, lt, d) => {
  bg(c, '#3a3440', '#0d0b10');
  { const g = c.createLinearGradient(0, 500, 0, 1000); g.addColorStop(0, 'rgba(255,170,120,0)'); g.addColorStop(1, 'rgba(255,150,110,.25)'); c.fillStyle = g; c.fillRect(0, 500, W, 500); }
  c.fillStyle = '#1b1a1f'; c.fillRect(120, 620, 840, 440);
  // towers with crenellations
  [[120, 520, 170], [790, 520, 170], [445, 470, 190]].forEach(([x, y, w]) => { c.fillRect(x, y, w, 540); for (let i = 0; i < 5; i++) c.fillRect(x + i*(w/5), y - 34, w/5 - 12, 34); });
  c.fillStyle = '#0a0a0c'; c.beginPath(); c.moveTo(480, 1060); c.lineTo(480, 900); c.arc(540, 900, 60, Math.PI, 0); c.lineTo(600, 1060); c.fill();
  c.fillStyle = 'rgba(255,200,130,.5)'; [[180, 640], [850, 640], [500, 560], [560, 560]].forEach(([x, y]) => c.fillRect(x, y, 26, 60));
  c.fillStyle = '#121214'; c.fillRect(0, 1060, W, 240);
  if (p.label) hhLabel(c, p.label, 540, 1160, ease((lt - (p.labelAt || .5)*d)/.2), '#ff3b30', 64);
  hhTag(c, p, lt, d);
};
// 8/9 · soil cross-section: dig reaches a cement block with the coffin inside
SC.hhdig = (c, p, lt, d) => {
  bg(c, '#1b2532', '#06080c'); hhSoil(c, 430);
  hhStone(c, 830, 430, .6, '#6f7472');
  const k = p.full ? 1 : ease((lt - .05*d)/(d*.6));
  const bottom = 470 + 540*k;
  c.fillStyle = '#120c07'; c.fillRect(380, 456, 300, bottom - 456);
  // depth ruler
  c.fillStyle = '#d7fbe9'; c.fillRect(300, 470, 6, 560); for (let f = 0; f <= 10; f++){ c.fillRect(300, 470 + f*54, f % 5 ? 20 : 36, 4); }
  text(c, `${Math.min(10, Math.round(10*k))} FT`, 200, Math.min(bottom, 1010), 52, 'VT', '#ffd27a');
  // cement block (revealed as the dig reaches it)
  const ca = ease((k - .9)/.1); if (ca > 0){ c.save(); c.globalAlpha = ca; c.fillStyle = '#8c8f91'; c.fillRect(360, 1010, 340, 230); const r = R(8); c.fillStyle = 'rgba(40,40,40,.25)'; for (let i = 0; i < 50; i++) c.fillRect(360 + r()*330, 1010 + r()*220, 6, 6); c.restore(); }
  if (p.coffin){ const a = ease((lt - (p.coffinAt || .3)*d)/.3); c.save(); c.globalAlpha = a*.95; c.save(); c.translate(530, 1125); c.rotate(Math.PI/2); hhCoffin(c, 0, 0, .42, false); c.restore(); c.restore(); }
  if (p.label) hhLabel(c, p.label, 540, 620, ease((lt - (p.labelAt || .8)*d)/.2), '#ff3b30', 64);
  if (p.label2) hhLabel(c, p.label2, 540, 720, ease((lt - (p.label2At || .6)*d)/.2), '#d7fbe9', 46);
  hhTag(c, p, lt, d);
};
// 10 · open coffin from above: clothes only (waistcoat, boots, bowler hat), no body/face drawn
SC.hhopen = (c, p, lt, d) => {
  bg(c, '#121418', '#040506');
  { const g = c.createRadialGradient(540, 760, 30, 540, 760, 560); g.addColorStop(0, 'rgba(255,240,205,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  c.fillStyle = '#7c7f81'; c.fillRect(200, 360, 680, 840);
  hhCoffin(c, 540, 780, 1.55, true);
  // bowler hat
  c.fillStyle = '#5a5047'; c.beginPath(); c.ellipse(540, 520, 105, 30, 0, 0, 7); c.fill(); c.fillStyle = '#4a423b'; c.beginPath(); c.ellipse(540, 505, 66, 66, 0, Math.PI, 0); c.fill(); c.fillStyle = '#2a2420'; c.fillRect(474, 496, 132, 16);
  // waistcoat
  c.fillStyle = '#4b443c'; c.beginPath(); c.moveTo(440, 600); c.lineTo(640, 600); c.lineTo(620, 900); c.lineTo(460, 900); c.closePath(); c.fill();
  c.strokeStyle = '#1a1714'; c.lineWidth = 6; c.beginPath(); c.moveTo(540, 600); c.lineTo(540, 900); c.stroke(); c.fillStyle = '#b39a5a'; for (let i = 0; i < 5; i++){ c.beginPath(); c.arc(556, 640 + i*55, 7, 0, 7); c.fill(); }
  // boots
  c.fillStyle = '#4a3a2c'; c.beginPath(); c.roundRect(468, 1010, 52, 110, 14); c.fill(); c.beginPath(); c.roundRect(560, 1010, 52, 110, 14); c.fill();
  if (p.notes) p.notes.forEach(([s, at, y], i) => hhLabel(c, s, 540, y, ease((lt - at*d)/.2), i ? '#ff3b30' : '#d7fbe9', 54));
  hhTag(c, p, lt, d);
};
// 11 · dental record match, then the open question
SC.hhteeth = (c, p, lt, d) => {
  desk(c);
  paperCard(c, 540, 740, 820, 700, -.02);
  c.save(); c.translate(540, 740); c.rotate(-.02);
  text(c, 'DENTAL RECORD', 0, -280, 58, 'Type', '#2a2620');
  text(c, '1896 PRISON EXAM', -200, -190, 32, 'Type', '#4a4438'); text(c, '2017 REMAINS', 200, -190, 32, 'Type', '#4a4438');
  [-200, 200].forEach((cx, side) => { for (let i = 0; i < 8; i++){ const t = Math.PI*(i/7), x = cx + Math.cos(t)*140, y = -10 + Math.sin(t)*120; c.fillStyle = '#f7f3e6'; c.strokeStyle = '#555'; c.lineWidth = 3; c.beginPath(); c.roundRect(x - 18, y - 22, 36, 44, 10); c.fill(); c.stroke(); if (i === 2 || i === 5){ c.fillStyle = '#d9b44a'; c.fillRect(x - 10, y - 10, 20, 20); } } });
  c.restore();
  stamp(c, 'MATCH', 540, 920, ease((lt - (p.stampAt || .12)*d)/.15), 110, -.1);
  const q = ease((lt - (p.qAt || .5)*d)/.25); if (q > 0){ c.save(); c.globalAlpha = q*.93; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.restore(); c.save(); c.globalAlpha = q; c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, 'HOW MANY?', 540, 720, 150, 'Anton', '#ff3b30'); c.restore(); hhLabel(c, '9 CONFIRMED · REAL TOTAL UNKNOWN', 540, 880, q, '#d7fbe9', 46); }
  hhTag(c, p, lt, d);
};
SC.hhend = (c, p, lt, d) => {
  SC.hhgrave(c, {}, d, d); c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(0, 0, W, H);
  followBox(c, lt, d);
  hhTag(c, p, lt, d);
};
SC.hhyears = (c, p, lt, d) => {
  bg(c, '#070909', '#000');
  const k = ease((lt - .05*d)/(d*.6)), n = Math.round(1896 + 121*k);
  text(c, 'HANGED · 1896', 540, 470, 64, 'VT', '#d7fbe9');
  c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, String(n), 540, 720, 260, 'VT', '#ff3b30'); c.restore();
  hhLabel(c, 'RUMOUR: HE ESCAPED', 540, 960, ease((lt - .45*d)/.2), '#ff8a7a', 60);
};
