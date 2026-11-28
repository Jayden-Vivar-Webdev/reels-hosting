// ===== The Chicago Tylenol murders (1982, unsolved). Drawn props and silhouettes only, no faces, no logos =====
function lbl(c, s, x, y, size, col, a = 1){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${size}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(x - w/2, y - size*.68, w, size*1.3); text(c, s, x, y, size, 'Anton', col); c.restore(); }
function dTag(c, p, lt, d){ if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9'); }
function dBig(c, p, lt, d){ if (!p.big) return; const a = ease((lt - (p.bigAt ?? .5)*d)/.3); if (a <= 0) return; const y = p.bigY || 560;
  c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.82)'; c.fillRect(110, y - 95, 860, p.big2 ? 260 : 190); c.shadowColor = '#ff2a20'; c.shadowBlur = 40;
  text(c, p.big, 540, y, p.bigSize || 140, 'Anton', '#ff3b30'); c.shadowBlur = 0; if (p.big2) text(c, p.big2, 540, y + 115, 54, 'Anton', '#f1efe8'); c.restore(); }
function tLab(c, p, lt, d){ if (p.label) lbl(c, p.label, 540, p.labelY || 470, p.labelSize || 66, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .4)*d)/.25)); }
// pill bottle centred at x,y (bottom), scale s
function pbottle(c, x, y, s, o = {}){ c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(8, 0, 78, 16, 0, 0, 7); c.fill();
  c.fillStyle = '#f2f0ea'; c.beginPath(); c.roundRect(-70, -250, 140, 250, 18); c.fill();
  const g = c.createLinearGradient(-70, 0, 70, 0); g.addColorStop(0, 'rgba(0,0,0,.18)'); g.addColorStop(.35, 'rgba(255,255,255,.25)'); g.addColorStop(1, 'rgba(0,0,0,.28)'); c.fillStyle = g; c.beginPath(); c.roundRect(-70, -250, 140, 250, 18); c.fill();
  c.fillStyle = '#c41e1e'; c.fillRect(-70, -190, 140, 130); c.fillStyle = '#f7f2e4'; c.fillRect(-70, -150, 140, 46);
  text(c, 'EXTRA', 0, -170, 26, 'Anton', '#fff'); text(c, 'STRENGTH', 0, -127, 26, 'Anton', '#c41e1e'); text(c, '50 CAPSULES', 0, -80, 18, 'Type', '#fff');
  if (!o.open){ c.fillStyle = o.capCol || '#e8e6e0'; c.beginPath(); c.roundRect(-60, -300, 120, 56, 8); c.fill(); c.fillStyle = 'rgba(0,0,0,.12)'; for (let i = -54; i < 60; i += 12) c.fillRect(i, -296, 5, 48); }
  else { c.fillStyle = '#dcd8cc'; c.fillRect(-48, -268, 96, 20); }
  if (o.glow){ c.strokeStyle = `rgba(255,50,40,${o.glow})`; c.lineWidth = 8; c.shadowColor = '#ff2a20'; c.shadowBlur = 40; c.beginPath(); c.roundRect(-80, o.open ? -272 : -312, 160, o.open ? 280 : 320, 22); c.stroke(); }
  c.restore(); }
function capsule(c, x, y, s, rot, open = 0){ c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  const sp = open*70;
  c.fillStyle = '#c41e1e'; c.beginPath(); c.roundRect(-90 - sp, -32, 92, 64, [32, 0, 0, 32]); c.fill();
  c.fillStyle = '#f4f2ec'; c.beginPath(); c.roundRect(-2 + sp, -32, 92, 64, [0, 32, 32, 0]); c.fill();
  c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-80 - sp, -22, 70, 8); c.fillRect(8 + sp, -22, 70, 8);
  if (open > 0){ const r = R(9); c.fillStyle = '#ffffff'; for (let i = 0; i < 70*open; i++){ c.beginPath(); c.arc((r() - .5)*sp*1.8, 34 + r()*40*open, 3 + r()*5, 0, 7); c.fill(); } }
  c.restore(); }
SC.tcity = (c, p, lt, d) => { // Chicago skyline at night over the lake
  bg(c, '#121a2a', '#05070c');
  const r = R(4); c.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 60; i++) c.fillRect(r()*W, 380 + r()*300, 2, 2);
  const B = [[60,140,330],[200,120,420],[320,90,520],[410,150,900],[560,120,640],[680,110,760],[790,140,470],[930,120,360]];
  for (const [x, w, h] of B){ c.fillStyle = '#1e283c'; c.fillRect(x, 1150 - h, w, h);
    const rr = R(x); c.fillStyle = 'rgba(255,214,140,.75)'; for (let yy = 1150 - h + 20; yy < 1140; yy += 26) for (let xx = x + 12; xx < x + w - 12; xx += 22) if (rr() > .62) c.fillRect(xx, yy, 9, 12); }
  c.fillStyle = '#0b0f18'; c.fillRect(440, 140, 10, 120); c.fillRect(520, 160, 10, 100); // antennas on the tallest tower
  c.fillStyle = (Math.sin(lt*4) > 0) ? '#ff3b30' : '#3a0a08'; c.beginPath(); c.arc(445, 140, 7, 0, 7); c.arc(525, 160, 7, 0, 7); c.fill();
  c.fillStyle = '#070a10'; c.fillRect(0, 1150, W, 250);
  for (let i = 0; i < 8; i++){ c.strokeStyle = `rgba(255,214,140,${.08 + i*.02})`; c.lineWidth = 3; c.beginPath(); for (let x = 0; x <= W; x += 24) c.lineTo(x, 1180 + i*24 + Math.sin(x/60 + lt*2 + i)*4); c.stroke(); }
  tLab(c, p, lt, d); dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.tshelf = (c, p, lt, d) => { // drugstore shelf of pain-reliever bottles
  bg(c, '#20262a', '#0b0d0e');
  c.fillStyle = 'rgba(230,240,255,.08)'; c.fillRect(0, 380, W, 40);
  const rows = [720, 1130];
  for (const ry of rows){ c.fillStyle = '#9aa2a8'; c.fillRect(30, ry, 1020, 26); c.fillStyle = '#5c6368'; c.fillRect(30, ry + 26, 1020, 30);
    c.fillStyle = '#f4f1e6'; for (let x = 120; x < 1000; x += 180) c.fillRect(x - 40, ry + 32, 80, 18); }
  const gone = p.gone ? Math.floor(10*ease((lt - .1*d)/(.6*d))) : 0;
  let k = 0;
  for (const ry of rows) for (let i = 0; i < 5; i++){ const x = 160 + i*190; const idx = k++;
    if (gone && ((idx*7) % 10) < gone) continue;
    let yy = ry, glow = 0;
    if (p.hl === idx){ glow = .5 + .5*Math.sin(lt*5); if (p.back){ const a = ease((lt - .45*d)/(.35*d)); yy = ry - 260*(1 - a); } }
    pbottle(c, x, yy, .95, {glow}); }
  if (p.qm != null){ const a = ease((lt - (p.qmAt ?? .5)*d)/.3); c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 30; text(c, '?', 160 + (p.qm % 5)*190, (p.qm < 5 ? 720 : 1130) - 360, 110, 'Anton', '#ff3b30'); c.restore(); }
  tLab(c, p, lt, d); dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.thome = (c, p, lt, d) => { // suburban house at night, one lit kitchen window
  bg(c, '#0f1520', '#05070a');
  c.fillStyle = '#0a0d12'; c.fillRect(0, 1120, W, 300);
  c.fillStyle = '#1a1f28'; c.fillRect(200, 760, 680, 360); c.beginPath(); c.moveTo(160, 770); c.lineTo(540, 520); c.lineTo(920, 770); c.closePath(); c.fillStyle = '#141820'; c.fill();
  c.fillStyle = '#e8cf8e'; c.fillRect(260, 850, 170, 140); c.fillStyle = (p.dark ? '#1a1d24' : '#e8cf8e'); c.fillRect(650, 850, 170, 140);
  c.strokeStyle = '#1a1f28'; c.lineWidth = 8; for (const x of [260, 650]){ c.beginPath(); c.moveTo(x + 85, 850); c.lineTo(x + 85, 990); c.moveTo(x, 920); c.lineTo(x + 170, 920); c.stroke(); }
  c.fillStyle = '#2c1d14'; c.fillRect(480, 940, 120, 180); c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(580, 1035, 7, 0, 7); c.fill();
  if (p.people){ const a = ease((lt - .2*d)/.4); c.save(); c.globalAlpha = a; c.fillStyle = '#0a0a0b'; for (const [x, s] of [[320, 1], [380, .9]]){ c.beginPath(); c.arc(x, 905, 24*s, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 32*s, 930, 64*s, 60, 18); c.fill(); } c.restore(); }
  const g = c.createRadialGradient(345, 920, 10, 345, 920, 260); g.addColorStop(0, 'rgba(255,220,150,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  tLab(c, p, lt, d); dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.tbottle = (c, p, lt, d) => { // one bottle on a kitchen table, capsules out
  bg(c, '#2a2118', '#0d0a07');
  c.fillStyle = '#5a3b22'; c.fillRect(0, 980, W, 500); c.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 8; i++) c.fillRect(0, 1000 + i*60, W, 3);
  const g = c.createRadialGradient(540, 800, 40, 540, 820, 700); g.addColorStop(0, 'rgba(255,220,160,.3)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  pbottle(c, p.split ? 300 : 540, 1060, p.split ? 1.5 : 2.1, {open: p.open, glow: p.glow ? .5 + .5*Math.sin(lt*5) : 0});
  if (p.caps){ capsule(c, 700, 1150, .9, .3); capsule(c, 860, 1220, .9, -.4); capsule(c, 560, 1250, .9, .1); }
  if (p.split){ const o = ease((lt - (p.splitAt ?? .3)*d)/(.4*d)); capsule(c, 740, 820, 2, -.15, o);
    if (p.word){ const a = ease((lt - (p.wordAt ?? .6)*d)/.25); c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 30; lbl(c, p.word, 740, 1040, 92, '#ff3b30'); c.restore(); } }
  if (p.count){ const n = Math.round(p.count*ease((lt - .15*d)/(.4*d))); for (let i = 0; i < n; i++) lbl(c, '✝', 300 + i*240, 560, 90, '#f1efe8'); }
  tLab(c, p, lt, d); dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.tcount = (c, p, lt, d) => {
  bg(c, '#070909', '#000');
  const k = ease(lt/(d*.7)); const n = Math.round(p.to*k/100000)*100000;
  c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, n.toLocaleString('en-US'), 540, 640, 150, 'VT', '#ff3b30'); c.restore();
  text(c, p.label || 'BOTTLES', 540, 790, 86, 'VT', '#d7fbe9');
  if (p.sub2) tag(c, p.sub2, 540, 930, ease((lt - d*.45)/.3), '#ff8a7a');
  for (let i = 0; i < 5; i++) pbottle(c, 200 + i*170, 1260, .8, {});
  c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(100, 1020, 880, 260); stamp(c, 'RECALLED', 540, 1150, ease((lt - .5*d)/.18), 110);
  dTag(c, p, lt, d);
};
SC.tletter = (c, p, lt, d) => { // typed extortion letter
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(-.02); paper(c, 0, 0, 760, 900, 0, '#efeadb');
  const L = ['TO THE COMPANY:', '', 'IF YOU WANT', 'TO STOP', 'THE KILLING...', '', 'PAY', '$1,000,000'];
  const n = Math.ceil(L.length*ease((lt - .05*d)/(.55*d)));
  L.slice(0, n).forEach((s, i) => text(c, s, -320, -330 + i*80, i >= 6 ? 64 : 50, 'Type', (i === 4 || i === 7) ? '#a01010' : '#1a1a1a', 'left'));
  c.restore();
  c.save(); c.globalAlpha = .9; text(c, 'PARAPHRASED · NOT THE ACTUAL LETTER', 540, 1260, 30, 'Type', '#cfc6b0'); c.restore();
  tLab(c, p, lt, d); dTag(c, p, lt, d);
};
SC.dfile = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(.02);
  paper(c, 0, 0, 800, 860, 0, '#ece6d6');
  text(c, p.head || 'CASE FILE', 0, -350, 60, 'Type', '#111'); text(c, p.sub || 'TYLENOL MURDERS · 1982', 0, -290, 34, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-340, -262, 680, 4);
  (p.rows || []).forEach(([a, b, col], i) => { const y = -180 + i*100, s = ease((lt - ((p.rowAt ?? .05) + i*.14)*d)/.2);
    text(c, a, -330, y, 40, 'Type', '#222', 'left'); c.globalAlpha = s; text(c, b, 340, y, 46, 'Type', col || '#111', 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-330, y + 34, 670, 2); });
  const r = R(21); for (let i = 0; i < 4; i++){ c.fillStyle = 'rgba(30,30,30,.45)'; c.fillRect(-330, 260 + i*34, 380 + r()*240, 10); }
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 560, p.stampY || 1060, ease((lt - (p.stampAt ?? .5)*d)/.18), p.stampSize || 92);
  dBig(c, p, lt, d); dTag(c, p, lt, d);
};
SC.tunknown = (c, p, lt, d) => { // blank silhouette, no face
  bg(c, '#1d2226', '#08090a');
  c.save(); c.translate(540, 780); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.fillStyle = '#ebe5d3'; c.fillRect(-380, -420, 760, 840); c.shadowBlur = 0;
  text(c, 'UNIDENTIFIED', 0, -350, 84, 'Anton', '#111'); text(c, 'SUSPECT · TYLENOL MURDERS', 0, -280, 34, 'Type', '#333');
  c.fillStyle = '#d8d1bd'; c.fillRect(-200, -230, 400, 440); c.strokeStyle = '#333'; c.lineWidth = 4; c.strokeRect(-200, -230, 400, 440);
  c.fillStyle = '#151517'; c.beginPath(); c.arc(0, -60, 100, 0, 7); c.fill(); c.beginPath(); c.roundRect(-150, 60, 300, 150, [80, 80, 0, 0]); c.fill();
  c.save(); c.globalAlpha = ease((lt - .3*d)/.3); text(c, '?', 0, -52, 140, 'Anton', '#ff3b30'); c.restore();
  text(c, 'SINCE 1982', 0, 300, 56, 'Anton', '#a01010');
  c.restore();
  tLab(c, p, lt, d); dTag(c, p, lt, d);
};
SC.tseal = (c, p, lt, d) => { // looking down into a bottle neck: foil seal peeling back
  bg(c, '#1a1614', '#070606');
  const g = c.createRadialGradient(540, 780, 40, 540, 800, 700); g.addColorStop(0, 'rgba(255,230,190,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#f2f0ea'; c.beginPath(); c.arc(540, 800, 330, 0, 7); c.fill(); c.strokeStyle = '#cfccc4'; c.lineWidth = 16; c.stroke();
  c.fillStyle = '#e1ddd2'; c.beginPath(); c.arc(540, 800, 260, 0, 7); c.fill();
  // capsules visible under the seal
  capsule(c, 470, 760, .9, .5); capsule(c, 610, 830, .9, -.3); capsule(c, 520, 900, .9, 1.2);
  const k = p.peeled ? 1 : ease((lt - (p.peelAt ?? .15)*d)/(.6*d));
  c.save(); c.beginPath(); c.arc(540, 800, 262, 0, 7); c.clip();
  const cut = 800 - 262 + 524*k; // seal covers from cut down
  const fg = c.createLinearGradient(300, 500, 800, 1100); fg.addColorStop(0, '#d9dde2'); fg.addColorStop(.5, '#f7f8fa'); fg.addColorStop(1, '#a9afb6'); c.fillStyle = fg; c.fillRect(260, cut, 560, 1100 - cut);
  c.fillStyle = '#c41e1e'; c.save(); c.translate(540, 800); c.globalAlpha = 1; if (cut < 860){ text(c, 'SEALED FOR', 0, 20, 44, 'Anton', '#a01010'); text(c, 'YOUR PROTECTION', 0, 72, 44, 'Anton', '#a01010'); } c.restore();
  c.restore();
  if (k > 0 && k < 1){ c.fillStyle = '#eef0f3'; c.beginPath(); c.moveTo(300, cut); c.quadraticCurveTo(540, cut - 160*k, 780, cut); c.lineTo(780, cut + 4); c.lineTo(300, cut + 4); c.fill(); }
  tLab(c, p, lt, d); dBig(c, p, lt, d); dTag(c, p, lt, d);
  if (p.follow) followBox(c, lt, d);
};
