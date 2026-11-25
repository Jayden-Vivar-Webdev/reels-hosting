// ===== Lead Masks case, Vintém Hill, Niterói, Brazil (1966). True case; featureless silhouettes only =====
function leadMask(c, x, y, s, rot, a){
  if (a === 0) return; c.save(); c.globalAlpha = a ?? 1; c.translate(x, y); c.rotate(rot || 0); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30; c.shadowOffsetY = 14;
  // rough hand-cut eye mask: two lobes joined by a bridge, NO eye holes
  c.beginPath(); c.moveTo(-250, -20); c.quadraticCurveTo(-250, -95, -150, -100); c.lineTo(-40, -86); c.quadraticCurveTo(0, -70, 40, -86);
  c.lineTo(150, -100); c.quadraticCurveTo(250, -95, 250, -20); c.quadraticCurveTo(248, 70, 150, 82); c.lineTo(70, 78);
  c.quadraticCurveTo(20, 40, 0, 20); c.quadraticCurveTo(-20, 40, -70, 78); c.lineTo(-150, 82); c.quadraticCurveTo(-248, 70, -250, -20); c.closePath();
  const g = c.createLinearGradient(-250, -100, 250, 90); g.addColorStop(0, '#9aa0a3'); g.addColorStop(.45, '#6c7275'); g.addColorStop(.6, '#8c9295'); g.addColorStop(1, '#4b5053');
  c.fillStyle = g; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
  c.strokeStyle = '#3a3e40'; c.lineWidth = 5; c.stroke();
  // hammer dents + scratches (deterministic)
  const r = R(31); c.fillStyle = 'rgba(40,44,46,.25)'; for (let i = 0; i < 26; i++){ c.beginPath(); c.ellipse(-220 + r()*440, -80 + r()*140, 6 + r()*12, 4 + r()*8, r()*3, 0, 7); c.fill(); }
  c.strokeStyle = 'rgba(220,225,228,.35)'; c.lineWidth = 2; for (let i = 0; i < 10; i++){ const sx = -200 + r()*400, sy = -60 + r()*100; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + 30 + r()*40, sy + (r() - .5)*12); c.stroke(); }
  c.restore();
}
SC.lmasks = (c, p, lt, d) => {
  desk(c);
  const k = .96 + .06*lt/d;
  c.save(); c.translate(540, 760); c.scale(k, k); c.translate(-540, -760);
  leadMask(c, 540, 620, 1.25, -.05, 1);
  leadMask(c, 560, 930, 1.25, .07, 1);
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1090, ease((lt - (p.stampAt ?? .5)*d)/.18), 96, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function vSky(c, night){
  if (night){ bg(c, '#24365a', '#0c1424'); const mg = c.createRadialGradient(820, 300, 10, 820, 300, 700); mg.addColorStop(0, 'rgba(200,215,240,.35)'); mg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = mg; c.fillRect(0, 0, W, H); c.fillStyle = '#e8ecf4'; c.beginPath(); c.arc(820, 300, 46, 0, 7); c.fill(); } else { const g = c.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, '#4a5f78'); g.addColorStop(.7, '#c98a5a'); g.addColorStop(1, '#e0a06a'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  if (night){ const r = R(5); c.fillStyle = 'rgba(230,236,255,.8)'; for (let i = 0; i < 70; i++){ c.beginPath(); c.arc(r()*W, 260 + r()*420, .8 + r()*2, 0, 7); c.fill(); } }
  // bay + distant city
  c.fillStyle = night ? '#1a2638' : '#6d7d8e'; c.fillRect(0, 640, W, 120);
  c.fillStyle = night ? '#16202e' : '#55606e'; c.beginPath(); c.moveTo(0, 650); for (let x = 0; x <= W; x += 60) c.lineTo(x, 640 - 40*Math.abs(Math.sin(x*.011)) - (x > 640 && x < 820 ? 120*Math.sin((x - 640)/180*Math.PI) : 0)); c.lineTo(W, 660); c.closePath(); c.fill();
  const r2 = R(9); c.fillStyle = night ? 'rgba(255,210,140,.85)' : 'rgba(255,240,200,.5)'; for (let i = 0; i < 60; i++) c.fillRect(r2()*W, 650 + r2()*26, 4, 3);
}
function vSlope(c, night){
  c.fillStyle = night ? '#1f3320' : '#3e5a2a'; c.beginPath(); c.moveTo(0, 820); c.quadraticCurveTo(500, 690, W, 780); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  c.fillStyle = night ? '#223822' : '#4d6d33'; c.fillRect(0, 1000, W, 400);
  const r = R(17); c.strokeStyle = night ? 'rgba(70,110,70,.9)' : 'rgba(120,150,70,.9)'; c.lineWidth = 4;
  for (let i = 0; i < 260; i++){ const x = r()*W, y = 760 + r()*560, h = 20 + r()*50; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 6, y - h*.6, x + (r() - .5)*24, y - h); c.stroke(); }
}
function vBodies(c, night, masks){
  // two featureless silhouettes lying side by side, half hidden in the grass
  const col = night ? '#5c5545' : '#8a7d5c';
  for (const [y, dx] of [[930, 0], [1020, 30]]){
    c.save(); c.translate(300 + dx, y); c.fillStyle = col;
    c.fillStyle = '#16120f'; c.beginPath(); c.ellipse(0, 0, 40, 34, 0, 0, 7); c.fill();          // head (no face)
    c.fillStyle = col; c.beginPath(); c.roundRect(36, -38, 280, 76, 28); c.fill();              // torso (raincoat)
    c.fillStyle = '#1b1d22'; c.beginPath(); c.roundRect(306, -26, 230, 22, 10); c.roundRect(306, 6, 230, 22, 10); c.fill(); // legs
    c.fillStyle = '#0c0c0c'; c.fillRect(530, -30, 34, 28); c.fillRect(530, 4, 34, 28);        // shoes
    if (masks){ c.fillStyle = '#7d8486'; c.beginPath(); c.ellipse(-6, -10, 30, 14, 0, 0, 7); c.fill(); }
    c.restore();
  }
  const r = R(23); c.strokeStyle = night ? 'rgba(70,110,70,1)' : 'rgba(110,140,60,1)'; c.lineWidth = 5;
  for (let i = 0; i < 34; i++){ const x = 250 + r()*620, y = 980 + r()*100, h = 20 + r()*30; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 6, y - h*.6, x + (r() - .5)*26, y - h); c.stroke(); }
}
SC.vhill = (c, p, lt, d) => {
  const night = !!p.night; vSky(c, night); vSlope(c, night);
  if (p.kite){ const kx = 780 + 30*Math.sin(lt*1.3), ky = 480 + 20*Math.sin(lt*1.7);
    c.strokeStyle = 'rgba(30,25,20,.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(kx, ky + 60); c.quadraticCurveTo(820, 800, 900, 1120); c.stroke();
    c.save(); c.translate(kx, ky); c.rotate(.2*Math.sin(lt*1.1)); c.fillStyle = '#b3261e'; c.beginPath(); c.moveTo(0, -60); c.lineTo(45, 0); c.lineTo(0, 70); c.lineTo(-45, 0); c.closePath(); c.fill();
    c.strokeStyle = '#2a1a10'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -60); c.lineTo(0, 70); c.moveTo(-45, 0); c.lineTo(45, 0); c.stroke(); c.restore(); }
  if (p.bodies !== false) vBodies(c, night, p.masks);
  if (p.box){ const a = ease((lt - (p.boxAt || .3)*d)/.25); c.save(); c.globalAlpha = a; c.strokeStyle = `rgba(255,59,48,${.6 + .4*Math.sin(lt*7)})`; c.lineWidth = 7; c.strokeRect(230, 860, 650, 230); c.restore(); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 560, ease((lt - (p.stampAt ?? .3)*d)/.18), p.stampSize || 96, -.08);
  if (p.qs){ const a = ease((lt - .2*d)/.4); c.save(); c.globalAlpha = a; c.shadowColor = 'rgba(160,0,0,.9)'; c.shadowBlur = 30; text(c, '?', 300, 520, 150, 'Salt', '#e0261c'); text(c, '?', 760, 480, 120, 'Salt', '#e0261c'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
SC.vtwo = (c, p, lt, d) => {
  bg(c, '#2a3036', '#0c0e10');
  { const g = c.createRadialGradient(540, 700, 40, 540, 760, 700); g.addColorStop(0, 'rgba(255,230,190,.22)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  c.fillStyle = '#15181b'; c.fillRect(0, 1080, W, 840);
  // two men seen from behind: raincoat over a suit (no faces)
  for (const [x, a0] of [[380, .05], [700, .2]]){ const a = ease((lt - a0*d)/.3);
    person(c, x, 500, 1.0, { coat: '#8a7d5c', legs: '#1b1d22', hairC: '#16120f', a });
    c.save(); c.globalAlpha = a; c.fillStyle = '#1e2229'; c.fillRect(x - 40, 860, 80, 18); c.restore(); }
  const la = ease((lt - .45*d)/.3);
  if (la > 0){ c.save(); c.globalAlpha = la; c.strokeStyle = '#ff3b30'; c.lineWidth = 5;
    c.beginPath(); c.moveTo(150, 760); c.lineTo(300, 760); c.stroke(); text(c, 'RAINCOAT', 160, 720, 46, 'VT', '#ff6a5a', 'left');
    c.beginPath(); c.moveTo(930, 640); c.lineTo(760, 640); c.stroke(); text(c, 'SUIT', 930, 600, 46, 'VT', '#ff6a5a', 'right'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function wristwatch(c, x, y, s, lt){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#3a2a1c'; c.fillRect(-55, -200, 110, 400);                                  // strap
  c.fillStyle = '#b8b2a2'; c.beginPath(); c.arc(0, 0, 120, 0, 7); c.fill();
  c.fillStyle = '#efe9da'; c.beginPath(); c.arc(0, 0, 104, 0, 7); c.fill();
  c.strokeStyle = '#222'; c.lineWidth = 4; for (let i = 0; i < 12; i++){ const a = i*Math.PI/6; c.beginPath(); c.moveTo(Math.sin(a)*86, -Math.cos(a)*86); c.lineTo(Math.sin(a)*98, -Math.cos(a)*98); c.stroke(); }
  const hr = (2.5/12)*2*Math.PI, mn = (30/60)*2*Math.PI + lt*.02, sc = Math.floor(lt*1)*2*Math.PI/60;
  c.lineCap = 'round'; c.strokeStyle = '#111'; c.lineWidth = 9; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(hr)*52, -Math.cos(hr)*52); c.stroke();
  c.lineWidth = 6; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(mn)*80, -Math.cos(mn)*80); c.stroke();
  c.strokeStyle = '#c4161c'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(sc)*92, -Math.cos(sc)*92); c.stroke();
  c.restore();
}
function waterBottle(c, x, y, s, empty){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(190,220,230,.35)'; c.strokeStyle = 'rgba(220,240,245,.85)'; c.lineWidth = 4;
  c.beginPath(); c.moveTo(-14, -170); c.lineTo(14, -170); c.lineTo(14, -130); c.quadraticCurveTo(48, -100, 48, -60); c.lineTo(48, 120); c.quadraticCurveTo(48, 140, 28, 140); c.lineTo(-28, 140); c.quadraticCurveTo(-48, 140, -48, 120); c.lineTo(-48, -60); c.quadraticCurveTo(-48, -100, -14, -130); c.closePath(); c.fill(); c.stroke();
  if (!empty){ c.fillStyle = 'rgba(120,180,210,.45)'; c.fillRect(-44, -30, 88, 166); }
  c.fillStyle = '#2d5d8a'; c.fillRect(-16, -192, 32, 24);
  c.fillStyle = 'rgba(240,240,230,.8)'; c.fillRect(-48, 0, 96, 50);
  c.restore();
}
SC.vbar = (c, p, lt, d) => {
  bg(c, '#2a1d14', '#0c0806');
  { const g = c.createRadialGradient(540, 600, 40, 540, 640, 700); g.addColorStop(0, 'rgba(255,170,90,.32)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  // back shelf with bottles
  c.fillStyle = '#3b2a1c'; c.fillRect(90, 520, 900, 16); c.fillRect(90, 700, 900, 16);
  const r = R(4); for (let i = 0; i < 14; i++){ const x = 120 + i*62, h = 90 + r()*60; c.fillStyle = ['#3d5a3a', '#6a3a20', '#2c3d55', '#7a6a3a'][i%4]; c.fillRect(x, 520 - h, 34, h); c.fillRect(x + 10, 520 - h - 30, 14, 30); }
  // wall clock
  c.fillStyle = '#e9e2cc'; c.beginPath(); c.arc(860, 410, 70, 0, 7); c.fill(); c.strokeStyle = '#111'; c.lineWidth = 6; c.stroke();
  c.beginPath(); c.moveTo(860, 410); c.lineTo(860 + 34*Math.sin(2.5/12*6.283), 410 - 34*Math.cos(2.5/12*6.283)); c.moveTo(860, 410); c.lineTo(860, 352); c.stroke();
  // counter
  c.fillStyle = '#4a2f1b'; c.fillRect(0, 900, W, 60); c.fillStyle = '#2a1a0f'; c.fillRect(0, 960, W, 400);
  waterBottle(c, 380, 760, 1.0, false);
  const a = ease((lt - (p.watchAt ?? .55)*d)/.25);
  if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.55)'; c.beginPath(); c.arc(720, 790, 175, 0, 7); c.fill(); wristwatch(c, 720, 790, 1.15, lt); c.restore();
    c.save(); c.strokeStyle = `rgba(255,59,48,${a*(.6 + .4*Math.sin(lt*8))})`; c.lineWidth = 7; c.beginPath(); c.arc(720, 790, 182, 0, 7); c.stroke(); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function evMarker(c, x, y, n, a){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = '#ffcf3a'; c.beginPath(); c.moveTo(x, y - 50); c.lineTo(x - 36, y + 20); c.lineTo(x + 36, y + 20); c.closePath(); c.fill(); text(c, String(n), x, y, 40, 'Anton', '#111'); c.restore(); }
function notebook(c, x, y, s, open){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 24;
  if (!open){ c.fillStyle = '#5a2c22'; c.fillRect(-120, -160, 240, 320); c.shadowBlur = 0; c.fillStyle = '#3e1d16'; c.fillRect(-120, -160, 22, 320); c.fillStyle = 'rgba(240,230,200,.8)'; c.fillRect(-50, -100, 130, 40); }
  else { c.fillStyle = '#efe8d4'; c.fillRect(-380, -440, 760, 880); c.shadowBlur = 0; c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-4, -440, 8, 880);
    c.strokeStyle = 'rgba(90,120,170,.35)'; c.lineWidth = 2; for (let yy = -360; yy < 430; yy += 62){ c.beginPath(); c.moveTo(-360, yy); c.lineTo(360, yy); c.stroke(); }
    c.strokeStyle = 'rgba(200,60,60,.4)'; c.beginPath(); c.moveTo(-300, -440); c.lineTo(-300, 440); c.stroke(); }
  c.restore();
}
SC.vevid = (c, p, lt, d) => {
  // evidence laid out on the grass, top-down
  bg(c, '#2f4422', '#18240f');
  const r = R(41); c.strokeStyle = 'rgba(120,150,70,.6)'; c.lineWidth = 4; for (let i = 0; i < 220; i++){ const x = r()*W, y = 250 + r()*1100; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - .5)*30, y - 20 - r()*20); c.stroke(); }
  c.save(); c.translate(300, 640); c.rotate(-1.2); waterBottle(c, 0, 0, 1.0, true); c.restore();
  // towels
  c.save(); c.translate(720, 600); c.rotate(.15); c.fillStyle = '#d9d2c0'; c.fillRect(-150, -80, 300, 160); c.fillStyle = '#c4bca8'; c.fillRect(-140, -40, 290, 150); c.strokeStyle = 'rgba(80,90,120,.6)'; c.lineWidth = 8; c.beginPath(); c.moveTo(-140, 60); c.lineTo(150, 60); c.stroke(); c.restore();
  notebook(c, 540, 980, 1.0, false);
  const ats = p.ats || [.05, .3, .62];
  evMarker(c, 300, 820, 1, ease((lt - ats[0]*d)/.2)); evMarker(c, 720, 770, 2, ease((lt - ats[1]*d)/.2)); evMarker(c, 700, 1030, 3, ease((lt - ats[2]*d)/.2));
  const b = ease((lt - ats[2]*d)/.25); if (b > 0){ c.save(); c.strokeStyle = `rgba(255,59,48,${b*(.6 + .4*Math.sin(lt*7))})`; c.lineWidth = 7; c.strokeRect(390, 790, 300, 380); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.vnote = (c, p, lt, d) => {
  desk(c);
  if (p.closed){ const k = 1 + .25*ease(lt/d); c.save(); c.translate(540, 780); c.scale(k*1.6, k*1.6); notebook(c, 0, 0, 1, false); c.restore();
    if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9'); return; }
  c.save(); c.translate(540, 770); c.rotate(-.02); const k = .97 + .04*lt/d; c.scale(k, k);
  notebook(c, 0, 0, 1, true);
  const L = p.lines, at = p.at;
  L.forEach((s, i) => { const prog = clamp((lt - at[i]*d)/(d*.14), 0, 1); const n = Math.floor(prog*s.length); if (!n) return;
    const red = p.red && p.red.includes(i); text(c, s.slice(0, n), -280, -330 + i*124, red ? 70 : 62, 'Hand', red ? '#a3140f' : '#1d2440', 'left'); });
  if (p.under){ const b = ease((lt - p.underAt*d)/.25); if (b > 0){ c.strokeStyle = '#d0201a'; c.lineWidth = 7; c.beginPath(); c.moveTo(-285, -330 + p.under*124 + 44); c.lineTo(-285 + 600*b, -330 + p.under*124 + 44); c.stroke(); } }
  text(c, '(translated from Portuguese)', 0, 400, 30, 'Type', 'rgba(60,60,60,.8)');
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.vreport = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 770); c.rotate(-.02); const k = .96 + .05*lt/d; c.scale(k, k);
  paper(c, 0, 0, 800, 860, 0, '#ece6d6');
  text(c, 'POLICE REPORT', 0, -350, 56, 'Type', '#111'); text(c, 'VINTÉM HILL · NITERÓI · 1966', 0, -292, 32, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-340, -262, 680, 4);
  (p.rows || []).forEach(([a, b, at], i) => { const y = -170 + i*120, s = ease((lt - at*d)/.25);
    c.globalAlpha = s; text(c, a, -330, y, 42, 'Type', '#222', 'left'); text(c, b, 330, y, 52, 'Anton', '#a01010', 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-330, y + 40, 660, 2); });
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1110, ease((lt - (p.stampAt ?? .6)*d)/.18), 80, -.1);
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.vspirit = (c, p, lt, d) => {
  vSky(c, true); vSlope(c, true);
  paperCard(c, 540, 760, 820, 520, -.03);
  c.save(); c.translate(540, 760); c.rotate(-.03);
  text(c, 'THEY WERE INTO', 0, -160, 50, 'Type', '#2a2620');
  const a = ease((lt - .25*d)/.3); c.globalAlpha = a;
  text(c, '"SCIENTIFIC', 0, -30, 104, 'Anton', '#8f1410'); text(c, 'SPIRITUALISM"', 0, 90, 104, 'Anton', '#8f1410');
  c.globalAlpha = 1; text(c, '— people close to them', 0, 200, 36, 'Type', '#4a4438');
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
