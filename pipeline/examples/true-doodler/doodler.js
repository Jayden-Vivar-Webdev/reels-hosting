// ===== The Doodler (San Francisco, 1974-75). True unsolved case; drawn props and silhouettes only, no faces =====
function lbl(c, s, x, y, size, col, a = 1){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${size}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(x - w/2, y - size*.68, w, size*1.3); text(c, s, x, y, size, 'Anton', col); c.restore(); }
function dTag(c, p, lt, d){ if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9'); }
function dBig(c, p, lt, d){ if (!p.big) return; const a = ease((lt - (p.bigAt ?? .5)*d)/.3); if (a <= 0) return; const y = p.bigY || 560;
  c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.82)'; c.fillRect(110, y - 95, 860, p.big2 ? 260 : 190); c.shadowColor = '#ff2a20'; c.shadowBlur = 40;
  text(c, p.big, 540, y, p.bigSize || 140, 'Anton', '#ff3b30'); c.shadowBlur = 0; if (p.big2) text(c, p.big2, 540, y + 115, 54, 'Anton', '#f1efe8'); c.restore(); }

// cartoon cat doodle as polylines (pencil-drawn); coordinates around 0,0, ~ 300 px wide
const DOOD = [
  [[-110,40],[-120,-10],[-100,-60],[-60,-90],[0,-100],[60,-90],[100,-60],[120,-10],[110,40],[70,80],[0,95],[-70,80],[-110,40]],  // head
  [[-95,-55],[-115,-150],[-50,-90]], [[50,-90],[115,-150],[95,-55]],                                                                // ears
  [[-55,-15],[-35,-30],[-15,-15]], [[15,-15],[35,-30],[55,-15]],                                                                    // closed eyes (arcs)
  [[-10,15],[0,25],[10,15],[-10,15]],                                                                                               // nose
  [[0,25],[0,40],[-20,52]], [[0,40],[20,52]],                                                                                       // mouth
  [[-40,25],[-140,10]], [[-40,35],[-140,45]], [[40,25],[140,10]], [[40,35],[140,45]],                                            // whiskers
];
function doodle(c, x, y, s, k){ // k 0..1 = how much is drawn; returns pencil tip
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#2b2a2e'; c.lineWidth = 5; c.lineCap = 'round'; c.lineJoin = 'round';
  let tot = 0; const lens = DOOD.map(pl => { let L = 0; for (let i = 1; i < pl.length; i++) L += Math.hypot(pl[i][0]-pl[i-1][0], pl[i][1]-pl[i-1][1]); tot += L; return L; });
  let left = k*tot, tip = null;
  for (let j = 0; j < DOOD.length && left > 0; j++){ const pl = DOOD[j]; c.beginPath(); c.moveTo(pl[0][0], pl[0][1]); tip = pl[0];
    for (let i = 1; i < pl.length; i++){ const L = Math.hypot(pl[i][0]-pl[i-1][0], pl[i][1]-pl[i-1][1]); if (left >= L){ c.lineTo(pl[i][0], pl[i][1]); left -= L; tip = pl[i]; }
      else { const f = left/L; tip = [pl[i-1][0] + (pl[i][0]-pl[i-1][0])*f, pl[i-1][1] + (pl[i][1]-pl[i-1][1])*f]; c.lineTo(tip[0], tip[1]); left = 0; break; } }
    c.stroke(); }
  c.restore(); return tip ? [x + tip[0]*s, y + tip[1]*s] : [x, y];
}
function pencil(c, x, y, s){ c.save(); c.translate(x, y); c.rotate(-.75); c.scale(s, s);
  c.fillStyle = '#e8c23a'; c.fillRect(30, -11, 300, 22); c.fillStyle = '#c99a1a'; c.fillRect(30, 4, 300, 7);
  c.fillStyle = '#e9cfa0'; c.beginPath(); c.moveTo(30, -11); c.lineTo(0, 0); c.lineTo(30, 11); c.closePath(); c.fill();
  c.fillStyle = '#222'; c.beginPath(); c.moveTo(9, -3.5); c.lineTo(0, 0); c.lineTo(9, 3.5); c.closePath(); c.fill();
  c.fillStyle = '#b9b9b9'; c.fillRect(330, -12, 26, 24); c.fillStyle = '#e48a9a'; c.beginPath(); c.roundRect(356, -12, 34, 24, 6); c.fill(); c.restore(); }
function cup(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.45)'; c.beginPath(); c.ellipse(10, 14, 150, 120, 0, 0, 7); c.fill();
  c.fillStyle = '#f3efe6'; c.beginPath(); c.ellipse(0, 0, 150, 115, 0, 0, 7); c.fill();                 // saucer
  c.fillStyle = '#e7e1d4'; c.beginPath(); c.arc(0, 0, 78, 0, 7); c.fill();
  c.fillStyle = '#3a2214'; c.beginPath(); c.arc(0, 0, 60, 0, 7); c.fill();                               // coffee
  c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(-18, -20, 22, 10, -.5, 0, 7); c.fill();
  c.strokeStyle = '#e7e1d4'; c.lineWidth = 18; c.beginPath(); c.arc(98, 0, 26, -1.3, 1.3); c.stroke(); c.restore(); }
SC.dnap = (c, p, lt, d) => { // diner table from above: two coffees, a napkin being doodled on
  bg(c, '#3a1c1a', '#140707');
  // red formica table with chrome edge
  c.fillStyle = '#7a1f1c'; c.fillRect(40, 380, 1000, 980); c.fillStyle = 'rgba(255,255,255,.05)'; const r = R(3); for (let i = 0; i < 260; i++) c.fillRect(40 + r()*1000, 380 + r()*980, 6, 3);
  c.strokeStyle = '#b9bec4'; c.lineWidth = 14; c.strokeRect(40, 380, 1000, 980);
  const g = c.createRadialGradient(540, 700, 40, 540, 760, 700); g.addColorStop(0, 'rgba(255,225,170,.3)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  cup(c, 220, 520, .9); cup(c, 860, 1150, .9);
  // napkin
  c.save(); c.translate(540, 820); c.rotate(-.05); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.fillStyle = '#f4f1ea'; c.fillRect(-300, -280, 600, 560); c.shadowBlur = 0;
  c.strokeStyle = 'rgba(0,0,0,.08)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -280); c.lineTo(0, 280); c.moveTo(-300, 0); c.lineTo(300, 0); c.stroke();
  c.strokeStyle = 'rgba(0,0,0,.12)'; c.setLineDash([4, 6]); c.strokeRect(-280, -260, 560, 520); c.setLineDash([]); c.restore();
  const k = p.drawn ? 1 : ease((lt - (p.drawAt ?? .05)*d)/((p.drawDur ?? .8)*d));
  const tip = doodle(c, 540, 800, 1.35, k);
  if (k < 1 && !p.noPencil) pencil(c, tip[0], tip[1], 1.1);
  if (p.label) lbl(c, p.label, 540, p.labelY || 480, p.labelSize || 70, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .4)*d)/.25));
  dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.ddiner = (c, p, lt, d) => { // all-night diner at 2 a.m., two silhouettes in the window
  bg(c, '#0d1220', '#050608');
  c.fillStyle = '#141820'; c.fillRect(0, 1150, W, 400); c.fillStyle = '#2a2f36'; c.fillRect(0, 1130, W, 24);   // street + kerb
  c.fillStyle = '#1b1e25'; c.fillRect(90, 560, 900, 580);                                                         // building
  c.fillStyle = '#e8d9a8'; c.fillRect(140, 720, 800, 330);                                                        // big lit window
  const g = c.createLinearGradient(0, 720, 0, 1050); g.addColorStop(0, 'rgba(255,240,200,.0)'); g.addColorStop(1, 'rgba(120,80,40,.35)'); c.fillStyle = g; c.fillRect(140, 720, 800, 330);
  c.fillStyle = '#9a2a22'; c.fillRect(140, 930, 800, 30);                                                         // counter
  for (const [x, s] of [[430, 1], [640, 1.04]]){ c.fillStyle = '#0b0b0c'; c.beginPath(); c.arc(x, 845*s - 0*s, 44*s, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 62*s, 885, 124*s, 120, 30); c.fill(); }
  c.strokeStyle = '#1b1e25'; c.lineWidth = 10; for (let x = 340; x < 940; x += 200){ c.beginPath(); c.moveTo(x, 720); c.lineTo(x, 1050); c.stroke(); }
  // neon sign
  const on = p.flick ? (Math.sin(lt*23) + Math.sin(lt*7.7) > -1.4) : true;
  c.save(); c.shadowColor = '#ff3b6a'; c.shadowBlur = on ? 40 : 0; text(c, 'OPEN ALL NIGHT', 540, 640, 92, 'Anton', on ? '#ff5d7e' : '#4a1f2a'); c.restore();
  // reflection on street
  c.save(); c.globalAlpha = .25; c.fillStyle = '#e8d9a8'; c.fillRect(140, 1170, 800, 80); c.restore();
  // clock in the window
  c.fillStyle = '#f4f1ea'; c.beginPath(); c.arc(860, 790, 42, 0, 7); c.fill(); c.strokeStyle = '#111'; c.lineWidth = 5; c.beginPath(); c.moveTo(860, 790); c.lineTo(860, 760); c.moveTo(860, 790); c.lineTo(878, 798); c.stroke();
  if (p.label) lbl(c, p.label, 540, p.labelY || 470, p.labelSize || 66, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .4)*d)/.25));
  dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.dbeach = (c, p, lt, d) => { // Ocean Beach at night: surf, fog, police tape, pins
  bg(c, '#18222c', '#06080a');
  const hy = 640;
  c.fillStyle = '#0e1620'; c.fillRect(0, hy, W, 260);                       // sea
  for (let i = 0; i < 6; i++){ const y = hy + 30 + i*40, ph = lt*.9 + i*.7; c.strokeStyle = `rgba(210,225,235,${.12 + i*.06})`; c.lineWidth = 3 + i;
    c.beginPath(); for (let x = 0; x <= W; x += 20) c.lineTo(x, y + Math.sin(x/90 + ph)*6); c.stroke(); }
  const sw = (Math.sin(lt*1.1) + 1)/2;
  c.fillStyle = `rgba(230,240,245,${.35 + .2*sw})`; c.beginPath(); c.moveTo(0, 900 + 20*sw); for (let x = 0; x <= W; x += 30) c.lineTo(x, 900 + 20*sw + Math.sin(x/70 + lt*2)*8); c.lineTo(W, 930); c.lineTo(0, 930); c.fill();
  c.fillStyle = '#2b2a26'; c.fillRect(0, 920, W, 400); const gs = c.createLinearGradient(0, 920, 0, 1320); gs.addColorStop(0, 'rgba(120,110,90,.35)'); gs.addColorStop(1, 'rgba(0,0,0,.3)'); c.fillStyle = gs; c.fillRect(0, 920, W, 400);
  // fog
  c.save(); c.globalAlpha = .18; c.fillStyle = '#c8d4dc'; for (let i = 0; i < 4; i++){ c.beginPath(); c.ellipse(((i*330 + lt*25) % 1500) - 200, 700 + i*40, 380, 60, 0, 0, 7); c.fill(); } c.restore();
  if (p.tape){ const a = ease((lt - .1*d)/.3); c.save(); c.globalAlpha = a; c.translate(540, 1080); c.rotate(-.05); c.fillStyle = '#f2d21c'; c.fillRect(-700, -36, 1400, 72);
    for (let x = -700; x < 700; x += 620) text(c, 'POLICE LINE · DO NOT CROSS', x + 310, 3, 38, 'Anton', '#111'); c.restore(); }
  if (p.pins){ const n = Math.round(p.pins*ease((lt - .1*d)/(.5*d))); const pos = [[220, 1000], [420, 1180], [640, 990], [830, 1150], [930, 1020]]; for (let i = 0; i < n; i++) kpin(c, pos[i][0], pos[i][1], 1, '#ff3b30', 26); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 470, p.labelSize || 66, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .4)*d)/.25));
  dBig(c, p, lt, d); dTag(c, p, lt, d);
  if (p.follow) followBox(c, lt, d);
};
SC.dtitle = (c, p, lt, d) => { // "THE DOODLER" scrawled on a sketch-pad page
  bg(c, '#2a2118', '#0d0a07');
  paperCard(c, 540, 760, 840, 760, .02);
  doodle(c, 760, 960, .6, 1);
  c.save(); c.translate(540, 700); c.rotate(-.04);
  text(c, 'POLICE CALLED HIM', 0, -200, 52, 'Type', '#3a3428');
  const a = ease((lt - (p.revAt ?? .35)*d)/.3); c.globalAlpha = a; text(c, 'THE', 0, -60, 90, 'Salt', '#a01010'); text(c, 'DOODLER', 0, 80, 140, 'Salt', '#a01010');
  c.restore();
  dTag(c, p, lt, d);
};
SC.dfile = (c, p, lt, d) => { // SFPD case file with rows filling in
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(.02);
  paper(c, 0, 0, 800, 860, 0, '#ece6d6');
  text(c, 'SFPD HOMICIDE', 0, -350, 60, 'Type', '#111'); text(c, p.sub || 'CASE FILE · "THE DOODLER"', 0, -290, 34, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-340, -262, 680, 4);
  (p.rows || []).forEach(([a, b, col], i) => { const y = -180 + i*100, s = ease((lt - ((p.rowAt ?? .05) + i*.14)*d)/.2);
    text(c, a, -330, y, 40, 'Type', '#222', 'left'); c.globalAlpha = s; text(c, b, 340, y, 46, 'Type', col || '#111', 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-330, y + 34, 670, 2); });
  const r = R(21); for (let i = 0; i < 4; i++){ c.fillStyle = 'rgba(30,30,30,.45)'; c.fillRect(-330, 260 + i*34, 380 + r()*240, 10); }
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 560, p.stampY || 1060, ease((lt - (p.stampAt ?? .5)*d)/.18), p.stampSize || 92);
  dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.dwanted = (c, p, lt, d) => { // wanted poster: blank silhouette (no face), age-progression arrow
  bg(c, '#1d2226', '#08090a');
  c.save(); c.translate(540, 780); c.rotate(-.015); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.fillStyle = '#ebe5d3'; c.fillRect(-400, -440, 800, 880); c.shadowBlur = 0;
  text(c, 'WANTED', 0, -370, 100, 'Anton', '#111'); text(c, 'INFORMATION · HOMICIDE', 0, -295, 34, 'Type', '#333');
  for (const [x, lab, gy] of [[-190, '1975', 0], [190, 'TODAY', 1]]){
    c.fillStyle = '#d8d1bd'; c.fillRect(x - 150, -240, 300, 360); c.strokeStyle = '#333'; c.lineWidth = 4; c.strokeRect(x - 150, -240, 300, 360);
    const a = gy ? ease((lt - (p.ageAt ?? .45)*d)/.3) : 1; c.globalAlpha = a;
    c.fillStyle = gy ? '#3a3a3c' : '#151517'; c.beginPath(); c.arc(x, -90, 78, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 120, 0, 240, 120, [60, 60, 0, 0]); c.fill();
    text(c, '?', x, -84, 110, 'Anton', gy ? '#ff3b30' : '#6a6a6a'); c.globalAlpha = 1;
    text(c, lab, x, 165, 44, 'Anton', gy ? '#a01010' : '#222'); }
  c.strokeStyle = '#a01010'; c.lineWidth = 8; c.beginPath(); c.moveTo(-30, -60); c.lineTo(30, -60); c.lineTo(14, -76); c.moveTo(30, -60); c.lineTo(14, -44); c.stroke();
  text(c, 'AGE-PROGRESSED SKETCH', 0, 260, 46, 'Anton', '#111'); text(c, 'SAN FRANCISCO POLICE · 2023', 0, 320, 34, 'Type', '#333');
  c.restore();
  if (p.label) lbl(c, p.label, 540, p.labelY || 1180, p.labelSize || 60, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .4)*d)/.25));
  dTag(c, p, lt, d);
};
SC.dreward = (c, p, lt, d) => {
  bg(c, '#070909', '#000');
  const k = ease(lt/(d*.7)); let n = Math.round(p.to*k/1000)*1000;
  c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, '$' + n.toLocaleString('en-US'), 540, 620, 190, 'VT', '#ff3b30'); c.restore();
  text(c, p.label || 'REWARD', 540, 780, 76, 'VT', '#d7fbe9');
  if (p.sub2) tag(c, p.sub2, 540, 930, ease((lt - d*.45)/.3), '#ff8a7a');
  dTag(c, p, lt, d);
};
