// ===== Brian Shaffer (Columbus, Ohio, April 2006) =====
// generic bar entrance at the top of an escalator; silhouettes only, no faces
function barTop(c, o, lt, d){
  bg(c, '#1a1f24', '#07090b');
  { const g = c.createRadialGradient(540, 720, 40, 540, 760, 700); g.addColorStop(0, o.closed ? 'rgba(120,130,140,.12)' : 'rgba(255,150,90,.30)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  // floor / landing
  c.fillStyle = '#14181b'; c.fillRect(0, 1080, W, 840);
  c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 3; for (let i = -6; i <= 6; i++){ c.beginPath(); c.moveTo(540 + i*80, 1080); c.lineTo(540 + i*260, 1920); c.stroke(); }
  // wall + entrance
  c.fillStyle = '#262c31'; c.fillRect(0, 300, W, 780);
  c.fillStyle = o.closed ? '#050607' : '#3a2016'; c.fillRect(380, 560, 320, 520);
  if (!o.closed){ const g = c.createLinearGradient(0, 560, 0, 1080); g.addColorStop(0, 'rgba(255,170,90,.45)'); g.addColorStop(1, 'rgba(255,120,60,.15)'); c.fillStyle = g; c.fillRect(380, 560, 320, 520); }
  c.strokeStyle = '#0c0e10'; c.lineWidth = 18; c.strokeRect(380, 560, 320, 520);
  // neon sign
  const fl = o.closed ? .12 : (.85 + .15*Math.sin(lt*23)*Math.sin(lt*7));
  c.save(); c.shadowColor = '#ff5a3a'; c.shadowBlur = o.closed ? 0 : 40; text(c, 'BAR', 540, 455, 120, 'Anton', `rgba(255,110,80,${fl})`); c.restore();
  if (o.closed) text(c, 'CLOSED', 540, 820, 70, 'VT', 'rgba(255,60,50,.85)');
  // escalator arriving from the bottom-left
  c.fillStyle = '#2c3836'; c.beginPath(); c.moveTo(60, 1320); c.lineTo(330, 1080); c.lineTo(470, 1080); c.lineTo(240, 1340); c.closePath(); c.fill();
  for (let i = 0; i < 7; i++){ const f = ((i + (o.closed ? 0 : lt*.8)) % 7)/7, x = 80 + f*290, y = 1310 - f*225; c.fillStyle = i%2 ? '#5d6b68' : '#46524f'; c.fillRect(x, y, 120, 12); }
  c.strokeStyle = '#05080a'; c.lineWidth = 16; c.beginPath(); c.moveTo(40, 1230); c.lineTo(320, 1000); c.stroke(); c.beginPath(); c.moveTo(250, 1300); c.lineTo(480, 1040); c.stroke();
  // camera corner marks
  c.strokeStyle = 'rgba(215,251,233,.35)'; c.lineWidth = 4;
  for (const [x, y, sx, sy] of [[150, 330, 1, 1], [930, 330, -1, 1], [150, 1240, 1, -1], [930, 1240, -1, -1]]){ c.beginPath(); c.moveTo(x, y + 50*sy); c.lineTo(x, y); c.lineTo(x + 50*sx, y); c.stroke(); }
}
SC.bartop = (c, p, lt, d) => {
  barTop(c, p, lt, d);
  if (p.walk){ // man walks from the escalator into the bar and is gone
    const k = clamp(lt/(d*(p.walkT || .75)), 0, 1), x = 330 + 210*k, s = .9 - .25*k, y = 620 + 120*(1-k);
    c.save(); c.beginPath(); c.rect(0, 0, W, 1080 + 600*(1 - k)); if (k > .7) { c.rect(0, 0, 380, 2000); c.rect(700, 0, 400, 2000); }
    c.clip(); person(c, x, y, s, { coat: '#3d4a3a', legs: '#1e2530', a: k > .85 ? 1 - (k - .85)/.15 : 1 }); c.restore();
  }
  if (p.women){ // him (back) + two women talking by the entrance
    person(c, 790, 650, .78, { coat: '#3d4a3a', legs: '#1e2530' });
    person(c, 220, 670, .72, { coat: '#4a3540', legs: '#18161a', hairC: '#2a1d16' });
    person(c, 300, 690, .70, { coat: '#2f3a4c', legs: '#18161a', hairC: '#3a2a1c' });
    c.save(); c.strokeStyle = `rgba(255,59,48,${.55 + .45*Math.sin(lt*7)})`; c.lineWidth = 6; c.strokeRect(700, 600, 180, 520); c.restore();
  }
  if (p.waiting){ // two friends waiting outside, nobody comes out
    person(c, 190, 760, .68, { coat: '#2f3a4c', legs: '#18161a' }); person(c, 880, 770, .66, { coat: '#3b3030', legs: '#18161a', hairC: '#2a1d16' });
  }
  if (p.counter){
    const a = ease((lt - (p.counterAt || .4)*d)/.3);
    c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(200, 1130, 680, 110);
    text(c, 'IN: 1', 360, 1187, 76, 'VT', '#9ff5c8'); text(c, 'OUT: 0', 700, 1187, 76, 'VT', '#ff3b30'); c.restore();
  }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
SC.esc2 = (c, p, lt, d) => {
  bg(c, '#1f2a28', '#0a0f0e');
  { const g = c.createRadialGradient(700, 500, 40, 700, 500, 800); g.addColorStop(0, 'rgba(255,170,100,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  c.fillStyle = '#141b1a'; c.fillRect(0, 300, W, 260);
  c.save(); c.shadowColor = '#ff5a3a'; c.shadowBlur = 30; text(c, 'BAR  ↑', 800, 420, 70, 'Anton', 'rgba(255,110,80,.9)'); c.restore();
  const x0 = 170, y0 = 1260, x1 = 820, y1 = 560;
  c.fillStyle = '#2c3836'; c.beginPath(); c.moveTo(x0 - 60, y0 + 40); c.lineTo(x1 + 60, y1 - 20); c.lineTo(x1 + 150, y1 + 60); c.lineTo(x0 + 60, y0 + 130); c.closePath(); c.fill();
  const n = 14, off = (lt*.9) % 1;
  for (let i = 0; i < n; i++){ const f = (i + off)/n, x = x0 + (x1 - x0)*f, y = y0 + (y1 - y0)*f; c.fillStyle = i%2 ? '#5d6b68' : '#46524f'; c.fillRect(x - 20, y - 10, 130, 18); }
  c.strokeStyle = '#05080a'; c.lineWidth = 22; c.beginPath(); c.moveTo(x0 - 50, y0 - 90); c.lineTo(x1 - 30, y1 - 170); c.stroke(); c.beginPath(); c.moveTo(x0 + 150, y0 + 20); c.lineTo(x1 + 150, y1 - 60); c.stroke();
  const f = .2 + .55*(lt/d), x = x0 + (x1 - x0)*f + 40, y = y0 + (y1 - y0)*f - 330;
  person(c, x, y, .62, { coat: '#3d4a3a', legs: '#1e2530' });
  c.save(); c.strokeStyle = `rgba(255,59,48,${.55 + .45*Math.sin(lt*7)})`; c.lineWidth = 6; c.strokeRect(x - 90, y - 30, 180, 400); c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.missing = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(-.025); const k = .97 + .04*lt/d; c.scale(k, k);
  paper(c, 0, 0, 760, 920, 0, '#ece6d6');
  c.fillStyle = '#b01a12'; c.fillRect(-380, -460, 760, 140); text(c, 'MISSING', 0, -388, 110, 'Anton', '#fff');
  // photo box with silhouette only
  c.fillStyle = '#9aa09c'; c.fillRect(-150, -290, 300, 340);
  c.fillStyle = '#2a2e31'; c.beginPath(); c.arc(0, -170, 70, 0, 7); c.fill(); c.beginPath(); c.moveTo(-130, 50); c.bezierCurveTo(-120, -60, -60, -90, 0, -90); c.bezierCurveTo(60, -90, 120, -60, 130, 50); c.closePath(); c.fill();
  text(c, '?', 0, -170, 110, 'Anton', 'rgba(236,230,214,.8)');
  const rows = [['BRIAN SHAFFER', 64, 'Anton', '#111'], ['AGE 27 · MEDICAL STUDENT', 40, 'Type', '#222'], ['COLUMBUS, OHIO', 40, 'Type', '#222'], ['LAST SEEN: APRIL 1, 2006', 40, 'Type', '#8a1a12']];
  rows.forEach(([s, sz, f, col], i) => { const a = ease((lt - (.08 + i*.1)*d)/.25); if (a <= 0) return; c.save(); c.globalAlpha = a; text(c, s, 0, 120 + i*80, sz, f, col); c.restore(); });
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
SC.ticket = (c, p, lt, d) => {
  desk(c);
  // sympathy card (left) and boarding pass (right)
  const a1 = ease(lt/.4);
  c.save(); c.globalAlpha = a1; c.translate(330, 650); c.rotate(-.12); paper(c, 0, 0, 380, 480, 0, '#f1ede4');
  c.strokeStyle = 'rgba(90,90,90,.7)'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, -60); c.bezierCurveTo(-60, -140, -120, -40, 0, 40); c.bezierCurveTo(120, -40, 60, -140, 0, -60); c.stroke();
  text(c, 'In loving', 0, 110, 50, 'Hand', '#333'); text(c, 'memory', 0, 165, 50, 'Hand', '#333'); c.restore();
  const a = ease((lt - .45*d)/.35);
  if (a > 0){ c.save(); c.globalAlpha = a; c.translate(640, 990); c.rotate(.06); c.scale(.9 + .1*a, .9 + .1*a);
    paper(c, 0, 0, 620, 300, 0, '#eef3f7'); c.fillStyle = '#1f4a7a'; c.fillRect(-310, -150, 620, 70); text(c, 'BOARDING PASS', 0, -114, 42, 'Anton', '#fff');
    text(c, 'COLUMBUS → MIAMI', 0, -20, 58, 'Anton', '#111'); text(c, 'APR 3 · 2 PASSENGERS', 0, 60, 40, 'Type', '#333');
    c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.footage = (c, p, lt, d) => {
  bg(c, '#0a0e0d', '#020303');
  c.fillStyle = '#151a19'; c.fillRect(0, 1250, W, 670);
  const feeds = [['bartop', { closed: true }], ['esc2', {}], ['bartop', {}], ['bartop', { closed: true }]];
  for (let i = 0; i < 4; i++){
    const fx = 130 + (i%2)*430, fy = 420 + Math.floor(i/2)*380;
    c.fillStyle = '#1e2423'; c.fillRect(fx - 16, fy - 16, 402, 342);
    c.save(); c.beginPath(); c.rect(fx, fy, 370, 310); c.clip(); c.translate(fx, fy); c.scale(370/W, 310/1000); c.translate(0, -300);
    SC[feeds[i][0]](c, feeds[i][1], lt + i*2.3, 8); c.restore();
    text(c, 'CAM 0' + [3, 1, 2, 6][i], fx + 14, fy + 26, 28, 'VT', '#b9f5d8', 'left');
  }
  // scrubbing bar
  const k = (lt/d); c.fillStyle = '#2a302f'; c.fillRect(150, 1180, 780, 14); c.fillStyle = '#ff3b30'; c.fillRect(150, 1180, 780*k, 14);
  stamp(c, 'NO EXIT RECORDED', 540, 800, ease((lt - .45*d)/.2), 74, -.08);
};
SC.svcdoor = (c, p, lt, d) => {
  bg(c, '#1b1f22', '#060708');
  c.fillStyle = '#2b3034'; c.fillRect(0, 300, W, 900); c.fillStyle = '#101315'; c.fillRect(0, 1200, W, 720);
  { const g = c.createRadialGradient(540, 420, 10, 540, 700, 600); g.addColorStop(0, 'rgba(230,240,255,.30)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  c.fillStyle = '#4a5157'; c.fillRect(350, 470, 380, 730); c.strokeStyle = '#15181a'; c.lineWidth = 14; c.strokeRect(350, 470, 380, 730);
  c.fillStyle = '#2b3034'; c.fillRect(650, 820, 50, 22);
  c.fillStyle = '#e6e3da'; c.fillRect(420, 560, 240, 120); text(c, 'SERVICE', 540, 598, 44, 'Anton', '#111'); text(c, 'STAFF ONLY', 540, 650, 34, 'Type', '#8a1a12');
  // door opens a crack, darkness behind
  const o = ease((lt - .4*d)/(d*.4)); if (o > 0){ c.fillStyle = '#000'; c.fillRect(350, 470, 70*o, 730); }
  const a = ease((lt - .55*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, '?', 540, 960, 220, 'Anton', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.flip = (c, p, lt, d) => {
  bg(c, '#0b0e12', '#020304');
  // cell tower (right)
  c.strokeStyle = '#59636b'; c.lineWidth = 8; c.beginPath(); c.moveTo(800, 1150); c.lineTo(850, 520); c.lineTo(900, 1150); c.moveTo(815, 960); c.lineTo(885, 960); c.moveTo(830, 760); c.lineTo(870, 760); c.stroke();
  const on = lt > .25*d && lt < .62*d;
  if (on){ for (let k = 0; k < 3; k++){ const r = ((lt*1.3 + k/3) % 1)*220; c.strokeStyle = `rgba(255,70,60,${1 - r/220})`; c.lineWidth = 6; c.beginPath(); c.arc(850, 520, r, 0, 7); c.stroke(); } }
  // flip phone (open)
  c.save(); c.translate(400, 780); c.rotate(-.08);
  c.fillStyle = '#5a6068'; c.beginPath(); c.roundRect(-120, -330, 240, 300, 26); c.fill();
  c.fillStyle = on ? '#9fd8ff' : '#0b1015'; c.fillRect(-90, -300, 180, 230);
  if (on){ text(c, 'SEARCHING', 0, -200, 30, 'VT', '#0b2a40'); text(c, '▮▮▮▯', 0, -150, 40, 'VT', '#0b2a40'); }
  c.fillStyle = '#4a4f56'; c.beginPath(); c.roundRect(-120, -20, 240, 320, 26); c.fill();
  c.fillStyle = '#2c3036'; for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) c.fillRect(-80 + q*60, 50 + r*55, 44, 36);
  c.restore();
  if (on){ const g = c.createRadialGradient(400, 600, 10, 400, 600, 300); g.addColorStop(0, 'rgba(150,210,255,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  stamp(c, 'A GLITCH?', 540, 1150, ease((lt - .7*d)/.2), 80, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.years = (c, p, lt, d) => {
  bg(c, '#070909', '#000');
  const k = ease((lt - .05*d)/(d*.45)), n = Math.round(2006 + 20*k);
  text(c, 'APRIL 2006', 540, 470, 64, 'VT', '#d7fbe9');
  c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, String(n), 540, 720, 260, 'VT', '#ff3b30'); c.restore();
  stamp(c, 'NEVER FOUND', 540, 1040, ease((lt - .6*d)/.2), 96, -.1);
};
