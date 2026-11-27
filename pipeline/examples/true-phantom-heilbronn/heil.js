// ===== The Phantom of Heilbronn (1993-2009). True case; drawn props only, no people or faces =====
function hpLbl(c, s, x, y, size, col, a){ if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.font = `${size}px Anton`; const w = c.measureText(s).width + 50;
  c.fillStyle = 'rgba(0,0,0,.78)'; c.fillRect(x - w/2, y - size*.72, w, size*1.44); text(c, s, x, y + 2, size, 'Anton', col || '#ff3b30'); c.restore(); }
function cork(c){ bg(c, '#3a2a1c', '#120c07');
  c.save(); c.fillStyle = '#7a5a3a'; c.fillRect(70, 380, 940, 860); c.fillStyle = '#4a3420'; c.lineWidth = 0;
  const r = R(77); for (let i = 0; i < 900; i++){ c.fillStyle = `rgba(${40 + r()*40},${25 + r()*25},10,.35)`; c.fillRect(70 + r()*940, 380 + r()*860, 3, 3); }
  c.strokeStyle = '#2a1c10'; c.lineWidth = 18; c.strokeRect(70, 380, 940, 860); c.restore(); }
function noFace(c, x, y, s, col){ // generic unknown-suspect card: blank head + shoulders outline, question mark
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#efe9da'; c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 20; c.fillRect(-150, -190, 300, 380); c.shadowBlur = 0;
  c.fillStyle = '#9aa0a6'; c.beginPath(); c.ellipse(0, -50, 70, 88, 0, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-130, 170); c.quadraticCurveTo(-120, 50, 0, 50); c.quadraticCurveTo(120, 50, 130, 170); c.fill();
  text(c, '?', 0, -40, 130, 'Anton', col || '#c4161c');
  text(c, 'UNKNOWN FEMALE', 0, 150, 30, 'Type', '#2a2218'); c.restore(); }
const HPINS = (() => { const r = R(404), a = []; for (let i = 0; i < 40; i++){ let x, y; do { x = 140 + r()*770; y = 430 + r()*760; } while (x > 360 && x < 720 && y > 560 && y < 1000); a.push([x, y]); } return a; })();
function pins(c, n, fade){
  for (let i = 0; i < n; i++){ const [x, y] = HPINS[i];
    c.save(); c.globalAlpha = fade ?? 1; c.strokeStyle = 'rgba(200,30,30,.55)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(540, 780); c.stroke();
    c.fillStyle = '#efe9da'; c.fillRect(x - 26, y - 18, 52, 36);
    c.fillStyle = '#d42a20'; c.beginPath(); c.arc(x, y - 14, 10, 0, 7); c.fill(); c.restore(); }
}
SC.hpboard = (c, p, lt, d) => {
  cork(c);
  const n = p.n != null ? p.n : Math.round(40*ease(lt/(d*(p.countT || .55))));
  pins(c, n, p.pinFade != null ? 1 - ease((lt - p.pinFade*d)/(.25*d)) : 1);
  noFace(c, 540, 780, 1.05);
  if (p.count) hpLbl(c, `${n} CRIME SCENES`, 540, 1130, 70, '#ff3b30', 1);
  if (p.label) hpLbl(c, p.label, 540, p.labelY || 1130, 66, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.stampTxt) stamp(c, p.stampTxt, 540, p.stampY || 790, ease((lt - (p.stampAt ?? .6)*d)/.18), p.stampSize || 96, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
function evBag(c, x, y, w, h, rot, label, a){
  if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); c.translate(x, y + (1 - Math.min(1, a))*60); c.rotate(rot);
  c.fillStyle = 'rgba(225,235,240,.22)'; c.strokeStyle = 'rgba(240,250,255,.55)'; c.lineWidth = 4; c.beginPath(); c.roundRect(-w/2, -h/2, w, h, 14); c.fill(); c.stroke();
  c.fillStyle = '#c4161c'; c.fillRect(-w/2, -h/2, w, 46); text(c, 'EVIDENCE', 0, -h/2 + 25, 34, 'Anton', '#fff');
  c.fillStyle = '#efe9da'; c.fillRect(-w/2 + 24, h/2 - 92, w - 48, 70); text(c, label, 0, h/2 - 56, 38, 'Type', '#1a1712');
  c.restore(); }
function cupProp(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#e8e4da'; c.beginPath(); c.moveTo(-70, -70); c.lineTo(70, -70); c.lineTo(58, 70); c.lineTo(-58, 70); c.closePath(); c.fill();
  c.strokeStyle = '#e8e4da'; c.lineWidth = 16; c.beginPath(); c.arc(78, 0, 34, -1.2, 1.2); c.stroke();
  c.fillStyle = '#8a3a2a'; c.fillRect(-70, -70, 140, 10); c.restore(); }
function syringeProp(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s); c.rotate(-.5);
  c.fillStyle = 'rgba(230,240,245,.9)'; c.fillRect(-90, -18, 150, 36); c.fillStyle = '#9aa'; c.fillRect(60, -24, 12, 48); c.fillRect(-130, -6, 40, 12); c.fillRect(-142, -22, 12, 44);
  c.strokeStyle = '#ccd'; c.lineWidth = 4; c.beginPath(); c.moveTo(72, 0); c.lineTo(150, 0); c.stroke();
  c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 2; for (let i = 0; i < 6; i++){ c.beginPath(); c.moveTo(-70 + i*22, -18); c.lineTo(-70 + i*22, -4); c.stroke(); } c.restore(); }
function cookieProp(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#c08a4a'; c.beginPath(); c.arc(0, 0, 70, 0.9, 6.6); c.lineTo(30, 40); c.closePath(); c.fill();   // bitten
  c.fillStyle = '#5a3418'; const r = R(9); for (let i = 0; i < 8; i++){ c.beginPath(); c.arc(-45 + r()*80, -45 + r()*80, 8, 0, 7); c.fill(); } c.restore(); }
function swabProp(c, x, y, s, rot){ c.save(); c.translate(x, y); c.scale(s, s); c.rotate(rot || 0);
  c.fillStyle = '#f2efe6'; c.fillRect(-150, -6, 300, 12); c.beginPath(); c.ellipse(-160, 0, 34, 18, 0, 0, 7); c.fill(); c.restore(); }
SC.hpcup = (c, p, lt, d) => {
  desk(c);
  evBag(c, 540, 740, 520, 620, -.04, 'CUP · 1993', ease(lt/.4));
  cupProp(c, 530, 700, 1.5);
  if (p.label) hpLbl(c, p.label, 540, 1170, 60, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
function profile(c, x, y, w, seed, title, col){ const r = R(seed);
  c.fillStyle = '#eef2f5'; c.fillRect(x, y, w, 160); text(c, title, x + w/2, y + 26, 30, 'Anton', '#333');
  for (let i = 0; i < 14; i++){ const h = 30 + R(55 + i)()*80; c.fillStyle = col; c.fillRect(x + 20 + i*((w - 40)/14), y + 150 - h, (w - 40)/14 - 8, h); } }
SC.hpmatch = (c, p, lt, d) => {
  bg(c, '#0e141c', '#04060a');
  c.fillStyle = '#1b1f26'; c.beginPath(); c.roundRect(110, 430, 860, 720, 26); c.fill();
  c.fillStyle = '#2d6a4f'; c.fillRect(140, 460, 800, 70); text(c, 'DNA DATABASE · COMPARE', 540, 497, 40, 'Anton', '#fff');
  profile(c, 160, 560, 360, 1, 'SCENE 1 · 1993', '#2d6a4f');
  const k1 = ease((lt - .15*d)/.25), k2 = ease((lt - .55*d)/.25);
  if (k1 > 0){ c.save(); c.globalAlpha = k1; profile(c, 560, 560, 360, 2, 'NEW SCENE', '#c0392b'); c.restore(); stamp(c, 'MATCH', 740, 820, k1, 70, -.1); }
  if (k2 > 0){ c.save(); c.globalAlpha = k2; profile(c, 200, 900, 360, 3, 'ANOTHER SCENE', '#c0392b'); c.restore(); stamp(c, 'MATCH', 800, 1000, k2, 70, .08); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.hpbags = (c, p, lt, d) => {
  desk(c);
  const a1 = ease(lt/.35), a2 = ease((lt - .2*d)/.3);
  evBag(c, 320, 690, 400, 480, -.06, 'SYRINGE', a1); if (a1 > 0){ c.save(); c.globalAlpha = a1; syringeProp(c, 320, 650, 1.1); c.restore(); }
  evBag(c, 760, 720, 400, 480, .05, 'COOKIE', a2); if (a2 > 0){ c.save(); c.globalAlpha = a2; cookieProp(c, 760, 680, 1.25); c.restore(); }
  if (p.s1) stamp(c, p.s1, 330, 1080, ease((lt - (p.s1At ?? .6)*d)/.18), 80, -.1);
  if (p.s2) stamp(c, p.s2, 760, 1110, ease((lt - (p.s2At ?? .78)*d)/.18), 80, .08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.hppaper = (c, p, lt, d) => {
  desk(c);
  const z = .9 + .08*ease(lt/(d*.8));
  c.save(); c.translate(540, 780); c.scale(z, z); c.rotate(-.04);
  paper(c, 0, 0, 840, 900, 0, '#e4dcc6');
  text(c, 'THE DAILY', 0, -390, 56, 'Type', '#1b1b1b'); c.fillStyle = '#1b1b1b'; c.fillRect(-390, -350, 780, 5);
  text(c, 'POLICE HUNT', 0, -280, 70, 'Anton', '#1b1b1b');
  text(c, '"THE WOMAN', 0, -190, 86, 'Anton', '#1b1b1b'); text(c, 'WITHOUT A FACE"', 0, -95, 86, 'Anton', '#1b1b1b');
  c.restore();
  c.save(); c.translate(540, 780); c.scale(z, z); c.rotate(-.04); noFace(c, -200, 170, .75); c.restore();
  c.save(); c.translate(540, 780); c.scale(z, z); c.rotate(-.04); const r = R(3); c.fillStyle = 'rgba(40,40,40,.55)'; for (let k = 0; k < 9; k++) c.fillRect(-20, 40 + k*36, 380 - r()*120, 10); c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.hpcar = (c, p, lt, d) => { // empty patrol car in a parking lot, police tape
  bg(c, '#4a5560', '#1a1e22');
  c.fillStyle = '#3a3d40'; c.fillRect(0, 900, W, 500);
  c.strokeStyle = 'rgba(240,240,220,.5)'; c.lineWidth = 8; for (let x = 60; x < W; x += 260){ c.beginPath(); c.moveTo(x, 940); c.lineTo(x - 80, 1300); c.stroke(); }
  const r = R(5); for (let i = 0; i < 7; i++){ const x = 80 + i*150; c.fillStyle = '#26302a'; c.fillRect(x + 40, 640, 22, 260); c.fillStyle = '#2f4a34'; c.beginPath(); c.arc(x + 50, 600, 90 + r()*20, 0, 7); c.fill(); }
  c.save(); c.translate(540, 1010);
  c.fillStyle = '#e8ecef'; c.beginPath(); c.roundRect(-380, -80, 760, 150, 30); c.fill();
  c.beginPath(); c.moveTo(-230, -80); c.lineTo(-150, -190); c.lineTo(170, -190); c.lineTo(260, -80); c.closePath(); c.fill();
  c.fillStyle = '#1d2a33'; c.beginPath(); c.moveTo(-205, -86); c.lineTo(-140, -175); c.lineTo(0, -175); c.lineTo(0, -86); c.closePath(); c.fill(); c.beginPath(); c.moveTo(20, -86); c.lineTo(20, -175); c.lineTo(160, -175); c.lineTo(235, -86); c.closePath(); c.fill();
  c.fillStyle = '#1f6a4a'; c.fillRect(-380, -10, 760, 34); text(c, 'POLIZEI', 0, 8, 30, 'Anton', '#fff');
  const bl = Math.floor(lt*3) % 2; c.fillStyle = bl ? '#3a7bff' : '#16306a'; c.fillRect(-60, -215, 120, 26);
  c.fillStyle = '#111'; c.beginPath(); c.arc(-230, 75, 62, 0, 7); c.fill(); c.beginPath(); c.arc(240, 75, 62, 0, 7); c.fill();
  c.restore();
  c.save(); c.translate(540, 1200); c.rotate(-.05); c.fillStyle = '#f2c400'; c.fillRect(-620, -28, 1240, 56);
  c.font = '34px Anton'; c.fillStyle = '#111'; for (let x = -560; x < 600; x += 330) c.fillText('POLICE LINE · DO NOT CROSS', x, 12); c.restore();
  if (p.label) hpLbl(c, p.label, 540, 520, 62, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
function fprint(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#1a1a2a'; c.lineWidth = 3.5;
  for (let k = 1; k < 13; k++){ c.beginPath(); c.ellipse(0, 6, k*7, k*9.5, 0, Math.PI*(.05 + (k%3)*.03), Math.PI*(1.95 - (k%2)*.08)); c.stroke(); } c.restore(); }
SC.hpprint = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 720); c.rotate(.03);
  paper(c, 0, 0, 820, 660, 0, '#ece6d6');
  text(c, 'FINGERPRINT CARD', 0, -270, 52, 'Type', '#111'); c.fillStyle = '#111'; c.fillRect(-360, -235, 720, 4);
  for (let i = 0; i < 5; i++){ c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 2; c.strokeRect(-360 + i*146, -200, 136, 190); fprint(c, -292 + i*146, -100, 1); }
  text(c, 'SEX:', -330, 80, 44, 'Type', '#222', 'left'); text(c, 'MALE', -200, 80, 52, 'Anton', '#111', 'left');
  text(c, 'STATUS:', -330, 160, 44, 'Type', '#222', 'left'); text(c, 'DECEASED', -130, 160, 52, 'Anton', '#111', 'left');
  c.restore();
  const k = ease((lt - (p.dnaAt ?? .55)*d)/.25);
  if (k > 0) hpLbl(c, 'DNA ON CARD: FEMALE', 540, 1150, 66, '#ff3b30', k);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.hpswab = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(-.03);
  c.fillStyle = '#d8e4ec'; c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.fillRect(-330, -230, 660, 420); c.shadowBlur = 0;
  c.fillStyle = '#1f5c8a'; c.fillRect(-330, -230, 660, 110); text(c, 'COTTON SWABS', 0, -175, 64, 'Anton', '#fff');
  text(c, 'STERILE', 0, -60, 70, 'Anton', '#1f5c8a'); text(c, 'FOR MEDICAL USE', 0, 20, 40, 'Type', '#333');
  c.restore();
  for (let i = 0; i < 4; i++) swabProp(c, 380 + i*110, 1080 + (i%2)*20, .7, -.4 + i*.05);
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 760, ease((lt - (p.stampAt ?? .3)*d)/.18), p.stampSize || 80, -.12);
  if (p.label) hpLbl(c, p.label, 540, 1180, 60, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.hpfactory = (c, p, lt, d) => { // packing line: conveyor of swab packets and a gloveless hand outline
  bg(c, '#2a3036', '#0c0e10');
  c.fillStyle = 'rgba(255,255,230,.12)'; for (let i = 0; i < 3; i++) c.fillRect(160 + i*300, 300, 160, 18);
  c.fillStyle = '#4a5058'; c.fillRect(0, 900, W, 70); c.fillStyle = '#2a2e33'; c.fillRect(0, 970, W, 30);
  for (let x = -40; x < W; x += 80){ c.fillStyle = '#1a1c1f'; c.beginPath(); c.arc(((x + lt*60) % (W + 80)), 1010, 22, 0, 7); c.fill(); }
  for (let i = 0; i < 6; i++){ const x = ((i*200 + lt*60) % (W + 200)) - 100; c.fillStyle = '#d8e4ec'; c.fillRect(x - 70, 840, 140, 60); c.fillStyle = '#1f5c8a'; c.fillRect(x - 70, 840, 140, 18); }
  // hand outline reaching down (no glove)
  const k = ease((lt - .15*d)/(.35*d)); c.save(); c.translate(560, 380 + 380*k); c.fillStyle = '#c9a58a';
  c.beginPath(); c.roundRect(-70, -260, 140, 260, 30); c.fill();
  for (let f = 0; f < 4; f++){ c.beginPath(); c.roundRect(-64 + f*34, -10, 28, 110 - Math.abs(f - 1.5)*14, 14); c.fill(); }
  c.beginPath(); c.roundRect(62, -90, 26, 90, 13); c.fill(); c.restore();
  if (p.label) hpLbl(c, p.label, 540, 1150, 62, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.hpfile = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 780); c.rotate(-.03);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.fillStyle = '#c9a86a'; c.fillRect(-380, -330, 760, 700); c.shadowBlur = 0;
  c.fillStyle = '#b8955a'; c.fillRect(-380, -380, 260, 60);
  c.fillStyle = '#efe7d2'; c.fillRect(-300, -250, 600, 120); text(c, 'CASE FILE', 0, -190, 64, 'Type', '#2a2218');
  text(c, 'HEILBRONN · 2007', 0, -60, 46, 'Type', '#2a2218');
  c.fillStyle = 'rgba(40,30,20,.55)'; for (let i = 0; i < 4; i++) c.fillRect(-280, 20 + i*44, 420 - i*60, 12);
  c.restore();
  if (p.big){ const a = ease((lt - (p.bigAt ?? .1)*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.82)'; c.fillRect(110, 760, 860, 300); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 860, p.bigSize || 110, 'Anton', '#ff3b30'); c.restore();
    if (p.big2){ c.save(); c.globalAlpha = ease((lt - (p.big2At ?? .5)*d)/.3); text(c, p.big2, 540, 985, 60, 'Anton', '#f1efe8'); c.restore(); } }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
