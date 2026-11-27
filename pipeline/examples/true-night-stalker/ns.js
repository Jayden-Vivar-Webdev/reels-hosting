// ===== The Night Stalker (Los Angeles, 1984-85). True case; drawn props, silhouettes only, never a real face =====
function nsSil(c, x, y, s, col = '#0b0b0d'){ // generic head-and-shoulders silhouette (no features)
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col;
  c.beginPath(); c.ellipse(0, -40, 46, 56, 0, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-95, 90); c.quadraticCurveTo(-90, 18, -30, 8); c.lineTo(30, 8); c.quadraticCurveTo(90, 18, 95, 90); c.closePath(); c.fill();
  c.restore();
}
function nsPaper(c, x, y, w, h, rot, o = {}){ // a front page: generic masthead, big headline, photo box with a silhouette
  c.save(); c.translate(x, y); c.rotate(rot);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 26; c.fillStyle = '#e8e2d0'; c.fillRect(-w/2, -h/2, w, h); c.shadowBlur = 0;
  const k = w/400;
  text(c, 'THE DAILY NEWS', 0, -h/2 + 34*k, 30*k, 'Type', '#222');
  c.fillStyle = '#222'; c.fillRect(-w/2 + 16*k, -h/2 + 56*k, w - 32*k, 3*k);
  text(c, o.head || 'NIGHT STALKER', 0, -h/2 + 100*k, 52*k, 'Anton', '#111');
  const pw = w*.56, ph = h*.42, py = -h/2 + 140*k;
  c.fillStyle = '#9a968a'; c.fillRect(-pw/2, py, pw, ph);
  c.save(); c.beginPath(); c.rect(-pw/2, py, pw, ph); c.clip(); nsSil(c, 0, py + ph*.62, ph/230, '#1b1b1d'); c.restore();
  text(c, '?', 0, py + ph*.42, 64*k, 'Anton', 'rgba(232,226,208,.85)');
  c.fillStyle = 'rgba(30,30,30,.5)'; for (let i = 0; i < 6; i++){ c.fillRect(-w/2 + 20*k, py + ph + 22*k + i*22*k, (i % 3 === 2 ? .6 : .92)*(w - 40*k), 8*k); }
  c.restore();
}
SC.nspapers = (c, p, lt, d) => { // newspaper stand at a bus station, every paper has the same silhouette
  bg(c, '#30302c', '#0c0c0b');
  const g = c.createRadialGradient(540, 700, 40, 540, 760, 760); g.addColorStop(0, 'rgba(255,235,190,.30)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#3d3a33'; c.fillRect(120, 420, 840, 820); c.fillStyle = '#26241f'; c.fillRect(140, 440, 800, 780);
  c.fillStyle = '#4a463d'; c.fillRect(140, 820, 800, 16); c.fillRect(140, 1200, 800, 20);
  const push = p.zoomIn ? ease((lt - .1*d)/(.7*d)) : 0;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++){
    const x = 280 + i*260, y = 640 + r*380;
    nsPaper(c, x, y + 6*Math.sin(i + r), 236, 340, (i - 1)*.02 + r*.01, {});
  }
  if (push > 0){ c.save(); c.globalAlpha = push; c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(0, 0, W, H); nsPaper(c, 540, 820, 330 + 260*push, 476 + 376*push, -.02); c.restore(); }
  if (p.ringAt != null){ const a = ease((lt - p.ringAt*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; c.strokeStyle = '#ff2a20'; c.lineWidth = 10; c.beginPath(); c.ellipse(540, p.zoomIn ? 690 : 600, 170, 150, -.1, 0, 7*a); c.stroke(); c.restore(); } }
  if (p.label) lbl(c, p.label, 540, p.labelY || 1140, 66, '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
function nsHouse(c, x, y, s, lit, open, sway){ // single-storey LA bungalow at night
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#2b3140'; c.fillRect(-260, -170, 520, 270);
  c.fillStyle = '#1b1f29'; c.beginPath(); c.moveTo(-300, -165); c.lineTo(0, -320); c.lineTo(300, -165); c.closePath(); c.fill();
  c.fillStyle = '#151820'; c.fillRect(-40, -60, 90, 160);                         // front door
  c.fillStyle = '#c9b06a'; c.beginPath(); c.arc(35, 20, 6, 0, 7); c.fill();
  // left window (open, dark gap + curtain)
  c.fillStyle = open ? '#05060a' : (lit ? '#e6c879' : '#1a1f2b'); c.fillRect(-210, -110, 130, 110);
  if (open){ c.fillStyle = '#7b8496'; c.fillRect(-210, -160 - 0, 130, 50); // raised sash
    c.fillStyle = 'rgba(210,200,180,.75)'; c.beginPath(); c.moveTo(-200, -110); c.quadraticCurveTo(-160 + sway*30, -50, -190 + sway*45, 0); c.lineTo(-210, 0); c.lineTo(-210, -110); c.fill(); }
  c.strokeStyle = '#4b5366'; c.lineWidth = 8; c.strokeRect(-210, -110, 130, 110);
  c.fillStyle = lit ? '#e6c879' : '#1a1f2b'; c.fillRect(100, -110, 130, 110); c.strokeRect(100, -110, 130, 110);
  c.restore();
}
SC.nshouse = (c, p, lt, d) => { // quiet street at night, one window left open
  bg(c, '#0d1420', '#04060a');
  const r = R(5); c.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < 60; i++) c.fillRect(r()*W, 340 + r()*300, 2, 2);
  c.fillStyle = '#1a1e16'; c.fillRect(0, 1060, W, 300);
  // palm silhouettes
  c.strokeStyle = '#06080b'; c.lineWidth = 14; c.fillStyle = '#06080b';
  for (const px of [120, 960]){ c.beginPath(); c.moveTo(px, 1080); c.quadraticCurveTo(px + 20, 760, px - 10, 470); c.stroke();
    for (let k = 0; k < 7; k++){ const a = k/7*Math.PI*2; c.beginPath(); c.moveTo(px - 10, 470); c.quadraticCurveTo(px - 10 + Math.cos(a)*90, 450 + Math.sin(a)*40 - 40, px - 10 + Math.cos(a)*150, 470 + Math.abs(Math.sin(a))*70); c.lineWidth = 10; c.stroke(); } c.lineWidth = 14; }
  const sway = Math.sin(lt*1.7);
  nsHouse(c, 540, 960, 1.25, false, true, sway);
  if (p.steps){ const a = ease((lt - .3*d)/(.5*d)); c.fillStyle = 'rgba(200,40,30,.8)'; for (let i = 0; i < 6; i++){ if (i/6 > a) break; c.beginPath(); c.ellipse(820 - i*70, 1230 - i*22 - (i%2)*16, 16, 9, -.3, 0, 7); c.fill(); } }
  if (p.label) lbl(c, p.label, 540, 560, 60, '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.title){ const a = ease((lt - .1*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.75)'; c.fillRect(110, 440, 860, 220); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, 'THE NIGHT STALKER', 540, 550, 104, 'Anton', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.nsplate = (c, p, lt, d) => { // rear of a 70s hatchback under a streetlight + a notepad with a plate being written
  bg(c, '#151821', '#05060a');
  const g = c.createRadialGradient(760, 380, 10, 700, 600, 700); g.addColorStop(0, 'rgba(255,200,120,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#20222a'; c.fillRect(0, 900, W, 400);
  // car rear (orange)
  c.fillStyle = '#c4621e'; c.beginPath(); c.moveTo(250, 860); c.lineTo(290, 640); c.quadraticCurveTo(540, 600, 790, 640); c.lineTo(830, 860); c.closePath(); c.fill();
  c.fillStyle = '#1b2130'; c.beginPath(); c.moveTo(320, 690); c.quadraticCurveTo(540, 655, 760, 690); c.lineTo(780, 760); c.lineTo(300, 760); c.closePath(); c.fill();
  c.fillStyle = '#7a3a12'; c.fillRect(240, 850, 600, 40); c.fillStyle = '#111'; c.fillRect(270, 890, 90, 60); c.fillRect(720, 890, 90, 60);
  c.fillStyle = '#b3241c'; c.fillRect(270, 790, 90, 40); c.fillRect(720, 790, 90, 40);
  c.fillStyle = '#efe9d4'; c.fillRect(450, 790, 180, 70); c.strokeStyle = '#1c3d7a'; c.lineWidth = 4; c.strokeRect(456, 796, 168, 58);
  text(c, '??? ???', 540, 830, 40, 'VT', '#1c3d7a');
  // notepad
  const a = ease((lt - .15*d)/.3);
  c.save(); c.globalAlpha = a; c.translate(540, 1110); c.rotate(-.04);
  c.fillStyle = '#f2eac2'; c.fillRect(-250, -120, 500, 240); c.fillStyle = '#c33'; c.fillRect(-250, -120, 500, 14);
  c.strokeStyle = 'rgba(60,90,160,.4)'; c.lineWidth = 2; for (let i = 0; i < 5; i++){ c.beginPath(); c.moveTo(-240, -60 + i*42); c.lineTo(240, -60 + i*42); c.stroke(); }
  text(c, 'PLATE:', -150, -40, 44, 'Type', '#223');
  const chars = '■■■ ■■■', n = Math.floor(ease((lt - .35*d)/(.45*d))*chars.length);
  text(c, chars.slice(0, n), 90, -38, 46, 'Type', '#223');
  text(c, 'orange car, fled', -10, 40, 38, 'Type', '#334');
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function nsPrint(c, x, y, s, col, prog = 1){ // fingerprint: nested whorl arcs
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = col; c.lineWidth = 5; c.lineCap = 'round';
  const N = 15;
  for (let i = 1; i <= N; i++){ if (i/N > prog + .001) break; const rx = 12 + i*9.5, ry = 16 + i*12.5;
    const gap = .35 + (i % 4)*.18; c.beginPath(); c.ellipse(Math.sin(i)*3, i*2, rx, ry, .08, -Math.PI/2 + gap, Math.PI*1.5 - .1); c.stroke(); }
  c.restore();
}
SC.nsprint = (c, p, lt, d) => { // car interior door panel dusted, one print lit by a forensic light
  bg(c, '#121418', '#050506');
  c.fillStyle = '#2a2d33'; c.fillRect(110, 420, 860, 820);
  c.fillStyle = '#353941'; c.fillRect(150, 460, 780, 330); c.fillStyle = '#1f2228'; c.fillRect(150, 830, 780, 360);
  c.fillStyle = '#4a4e57'; c.fillRect(640, 860, 220, 40);                       // door handle
  const sweep = ease((lt - .1*d)/(.5*d));
  const g = c.createRadialGradient(540, 640, 10, 540, 640, 320); g.addColorStop(0, `rgba(120,255,180,${.35*sweep})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  nsPrint(c, 540, 630, 1.15, `rgba(170,255,205,${.25 + .7*sweep})`, sweep);
  const a = ease((lt - .55*d)/.3);
  if (a > 0){ c.save(); c.globalAlpha = a; c.strokeStyle = '#ff2a20'; c.lineWidth = 8; c.strokeRect(370, 430, 340, 400); c.restore(); }
  if (p.label) lbl(c, p.label, 540, 1010, 70, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.nsmatch = (c, p, lt, d) => { // 80s terminal comparing prints -> MATCH
  bg(c, '#0f1210', '#030403');
  c.fillStyle = '#2f2b24'; c.fillRect(130, 400, 820, 680); c.fillStyle = '#071008'; c.fillRect(170, 440, 740, 560);
  const scan = (lt*2.2) % 1, done = lt > .55*d;
  text(c, 'PRINT SEARCH', 540, 490, 50, 'VT', '#7dff9a');
  nsPrint(c, 360, 700, .85, '#7dff9a'); c.strokeStyle = '#7dff9a'; c.lineWidth = 3; c.strokeRect(240, 560, 240, 280);
  c.save(); c.beginPath(); c.rect(600, 560, 240, 280); c.clip(); c.fillStyle = '#0d1a10'; c.fillRect(600, 560, 240, 280);
  if (!done){ nsPrint(c, 720, 700, .85, `rgba(125,255,154,${.3 + .3*Math.sin(lt*20)})`); c.fillStyle = 'rgba(125,255,154,.35)'; c.fillRect(600, 560 + scan*280, 240, 6); }
  else nsPrint(c, 720, 700, .85, '#7dff9a');
  c.restore(); c.strokeStyle = done ? '#ff3b30' : '#7dff9a'; c.lineWidth = done ? 6 : 3; c.strokeRect(600, 560, 240, 280);
  if (!done) text(c, 'SEARCHING ' + '.'.repeat(1 + Math.floor(lt*4) % 3), 540, 920, 46, 'VT', '#7dff9a');
  else { c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 30; text(c, 'MATCH: RAMIREZ, RICHARD', 540, 920, 52, 'VT', '#ff3b30'); c.restore(); }
  c.fillStyle = '#2f2b24'; c.fillRect(380, 1080, 320, 60); c.fillRect(300, 1140, 480, 30);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.nstv = (c, p, lt, d) => { // living-room TV showing a WANTED bulletin (silhouette), paper on the table
  bg(c, '#1d1814', '#070605');
  const fl = .85 + .15*Math.sin(lt*31)*Math.sin(lt*7);
  const g = c.createRadialGradient(540, 700, 20, 540, 700, 700); g.addColorStop(0, `rgba(150,190,255,${.28*fl})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#4a3420'; c.fillRect(170, 420, 740, 580); c.fillStyle = '#0b0e14'; c.fillRect(210, 460, 540, 440);
  c.fillStyle = '#2e2014'; c.fillRect(780, 480, 100, 400); for (let i = 0; i < 2; i++){ c.fillStyle = '#9a8a6a'; c.beginPath(); c.arc(830, 560 + i*90, 26, 0, 7); c.fill(); }
  c.save(); c.beginPath(); c.rect(210, 460, 540, 440); c.clip();
  c.fillStyle = `rgba(120,140,170,${.9*fl})`; c.fillRect(210, 460, 540, 440);
  c.fillStyle = '#b3241c'; c.fillRect(210, 460, 540, 70); text(c, 'WANTED', 480, 497, 52, 'Anton', '#fff');
  c.fillStyle = '#5b6a80'; c.fillRect(360, 560, 240, 260); nsSil(c, 480, 760, 1.0, '#10141b');
  c.fillStyle = 'rgba(255,255,255,.07)'; for (let y = 460; y < 900; y += 6) c.fillRect(210, y, 540, 2);
  c.restore();
  c.fillStyle = '#3a2a1c'; c.fillRect(120, 1100, 840, 40);
  nsPaper(c, 540, 1150, 300, 160, -.05, {});
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function nsCrowd(c, cx, y, n, s, seed, col = '#07080a'){ const r = R(seed); for (let i = 0; i < n; i++){ const x = cx + (i - (n - 1)/2)*95*s + (r() - .5)*30; c.save(); c.translate(x, y + (r() - .5)*20); const k = s*(.9 + r()*.2); c.scale(k, k); c.fillStyle = col; c.beginPath(); c.ellipse(0, -150, 32, 38, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-55, 60); c.quadraticCurveTo(-55, -100, 0, -110); c.quadraticCurveTo(55, -100, 55, 60); c.fill(); c.restore(); } }
SC.nsstreet = (c, p, lt, d) => { // daytime East LA street (Aug 1985), modes: scream / chase / crowd
  bg(c, '#8aa0b4', '#c7c0a8');
  const r = R(9);
  for (let i = 0; i < 4; i++){ const x = 40 + i*270; c.fillStyle = ['#d8c7a2', '#c9a98a', '#e0d6bd', '#b9a888'][i]; c.fillRect(x, 560, 240, 300); c.fillStyle = '#7b5a3c'; c.beginPath(); c.moveTo(x - 15, 565); c.lineTo(x + 120, 470); c.lineTo(x + 255, 565); c.fill(); c.fillStyle = '#4a5a6a'; c.fillRect(x + 30, 640, 70, 70); c.fillRect(x + 140, 640, 70, 70); }
  c.strokeStyle = '#6a6a66'; c.lineWidth = 6; for (let x = 0; x < W; x += 40){ c.beginPath(); c.moveTo(x, 870); c.lineTo(x, 940); c.stroke(); } c.beginPath(); c.moveTo(0, 880); c.lineTo(W, 880); c.stroke(); // chain fence
  c.fillStyle = '#5d5d58'; c.fillRect(0, 940, W, 330); c.fillStyle = '#e8e0b0'; for (let x = 0; x < W; x += 160) c.fillRect(x + ((p.mode === 'chase') ? -(lt*500 % 160) : 0), 1100, 80, 12);
  if (p.mode === 'scream'){
    nsCrowd(c, 300, 1130, 1, 1.25, 3, '#121316');
    const a = ease((lt - .45*d)/.15);
    if (a > 0){ c.save(); c.globalAlpha = a; c.translate(560, 560); c.scale(.8 + .2*a, .8 + .2*a); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(0, 0, 290, 130, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-200, 80); c.lineTo(-290, 200); c.lineTo(-120, 110); c.fill(); text(c, 'THE KILLER!', 0, 6, 92, 'Anton', '#c4161c'); c.restore(); }
  }
  if (p.mode === 'chase'){
    // stopped car with door open + crowd closing in
    c.fillStyle = '#b89a4a'; c.fillRect(560, 960, 380, 120); c.beginPath(); c.moveTo(620, 960); c.lineTo(670, 880); c.lineTo(860, 880); c.lineTo(900, 960); c.fill(); c.fillStyle = '#26303c'; c.fillRect(690, 895, 150, 55);
    c.fillStyle = '#111'; c.beginPath(); c.arc(640, 1090, 40, 0, 7); c.arc(870, 1090, 40, 0, 7); c.fill();
    const k = ease((lt - .2*d)/(.6*d));
    nsCrowd(c, 540, 1180, 7, 1.0 + .2*k, 21);
    if (p.label) lbl(c, p.label, 540, 420 + 0, 60, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  }
  if (p.mode === 'neigh'){
    nsCrowd(c, 540, 1190, 8, 1.05, 33);
    const a = ease((lt - .45*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(0, 0, W, H); c.restore(); }
    if (p.stampTxt) stamp(c, p.stampTxt, 540, 760, ease((lt - (p.stampAt ?? .55)*d)/.18), 96, -.08);
  }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.nsbus = (c, p, lt, d) => { // Greyhound-style bus arriving at dawn, ARIZONA -> LOS ANGELES board
  bg(c, '#e2a46a', '#3a2a2a');
  c.fillStyle = 'rgba(255,230,170,.9)'; c.beginPath(); c.arc(820, 560, 90, 0, 7); c.fill();
  c.fillStyle = '#2b2226'; c.fillRect(0, 960, W, 320);
  const x = 900 - ease(lt/(.6*d))*520;
  c.save(); c.translate(x, 0);
  c.fillStyle = '#c9ccd2'; c.fillRect(-300, 740, 620, 230); c.fillStyle = '#29497a'; c.fillRect(-300, 880, 620, 22);
  c.fillStyle = '#1b2230'; for (let i = 0; i < 6; i++) c.fillRect(-270 + i*95, 770, 80, 70); c.fillRect(270, 770, 40, 160);
  c.fillStyle = '#111'; c.beginPath(); c.arc(-190, 975, 42, 0, 7); c.arc(210, 975, 42, 0, 7); c.fill(); c.restore();
  // arrivals board
  c.fillStyle = '#111'; c.fillRect(170, 400, 740, 220); c.strokeStyle = '#444'; c.lineWidth = 6; c.strokeRect(170, 400, 740, 220);
  text(c, 'ARRIVING', 540, 450, 44, 'VT', '#ffb84a'); text(c, 'ARIZONA → LOS ANGELES', 540, 530, 58, 'VT', '#ffd27a');
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.nscell = (c, p, lt, d) => { // empty death-row cell, bars
  tbCellRoom(c);
  c.fillStyle = '#3a3f45'; c.fillRect(150, 930, 780, 40); c.fillStyle = '#d9d4c4'; c.fillRect(160, 900, 760, 34);
  tbBars(c, .9);
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 640, ease((lt - (p.stampAt ?? .55)*d)/.18), 90, -.08);
  if (p.big){ const a = ease((lt - .1*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.78)'; c.fillRect(220, 420, 640, 150); text(c, p.big, 540, 497, 96, 'VT', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
