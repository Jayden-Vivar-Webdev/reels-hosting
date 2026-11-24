// ===== Body under the motel bed (Kansas City 2003 / Memphis 2010) =====
function motelRoom(c, dark){
  bg(c, '#22261f', '#0a0b09');
  c.fillStyle = dark ? '#151812' : '#2f3329'; c.fillRect(0, 260, W, 760);              // wall
  c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 6; for (let x = 30; x < W; x += 90){ c.beginPath(); c.moveTo(x, 260); c.lineTo(x, 1020); c.stroke(); }
  c.fillStyle = dark ? '#0d0b09' : '#20180f'; c.fillRect(0, 1020, W, 900);              // carpet
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, 1012, W, 12);
  // window with red neon glow from outside (left)
  c.fillStyle = '#0a0c12'; c.fillRect(60, 360, 240, 260); c.strokeStyle = '#3a3a33'; c.lineWidth = 10; c.strokeRect(60, 360, 240, 260);
  c.fillStyle = 'rgba(255,60,50,.25)'; c.fillRect(65, 365, 230, 250);
  c.strokeStyle = 'rgba(0,0,0,.6)'; c.lineWidth = 4; for (let y = 380; y < 620; y += 22){ c.beginPath(); c.moveTo(65, y); c.lineTo(295, y); c.stroke(); }  // blinds
  const g = c.createRadialGradient(180, 500, 20, 180, 500, 600); g.addColorStop(0, 'rgba(255,70,60,.18)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 200, W, 1000);
  // picture frame
  c.fillStyle = '#3c3326'; c.fillRect(520, 420, 220, 150); c.fillStyle = '#4c5a55'; c.fillRect(535, 435, 190, 120);
  // nightstand + lamp (right)
  c.fillStyle = '#3b2c1f'; c.fillRect(940, 860, 130, 160); c.fillStyle = '#2a1f15'; c.fillRect(950, 900, 110, 6);
  c.fillStyle = '#b7a37c'; c.beginPath(); c.moveTo(965, 740); c.lineTo(1045, 740); c.lineTo(1065, 810); c.lineTo(945, 810); c.fill(); c.fillStyle = '#2a241c'; c.fillRect(1000, 810, 10, 50);
  if (!dark){ const l = c.createRadialGradient(1005, 790, 10, 1005, 790, 520); l.addColorStop(0, 'rgba(255,210,140,.40)'); l.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = l; c.fillRect(300, 200, W, 1100); }
}
function wrappedShape(c, a, outline){
  // a long sheet-wrapped bundle hidden in the bed base (no detail)
  c.save(); c.globalAlpha = a;
  c.fillStyle = '#8d8a80'; c.beginPath(); c.roundRect(230, 885, 640, 90, 45); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 5; for (const x of [380, 560, 720]){ c.beginPath(); c.moveTo(x, 888); c.lineTo(x + 10, 972); c.stroke(); }  // tape bands
  if (outline){ c.strokeStyle = '#ff3b30'; c.lineWidth = 7; c.setLineDash([22, 14]); c.beginPath(); c.roundRect(215, 870, 670, 120, 55); c.stroke(); c.setLineDash([]); }
  c.restore();
}
SC.bedx = (c, p, lt, d) => {
  motelRoom(c, !!p.dark);
  const lift = p.liftAt != null ? ease((lt - p.liftAt*d)/(.35*d)) : (p.open ? 1 : 0);
  const metal = !!p.frame;
  // headboard
  c.fillStyle = metal ? '#3a3d42' : '#3a2a1c'; c.fillRect(140, 600, 50, 420);
  // bed base (wooden panels / metal box frame), cavity inside
  c.fillStyle = '#050505'; c.fillRect(190, 840, 720, 170);
  const xr = p.xrayAt != null ? ease((lt - p.xrayAt*d)/.5) : 0;
  if (p.open || lift > .3) wrappedShape(c, p.open ? 1 : ease((lift - .3)/.7)*.0, false);
  if (!p.open){
    c.fillStyle = metal ? '#4b5058' : '#5a3f28'; c.fillRect(190, 840, 720, 170);
    c.strokeStyle = metal ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.35)'; c.lineWidth = 6;
    for (let x = 190; x <= 910; x += metal ? 180 : 90){ c.beginPath(); c.moveTo(x, 842); c.lineTo(x, 1008); c.stroke(); }
    if (metal){ c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(190, 840, 720, 10); }
    if (xr){ c.save(); c.globalAlpha = .55*xr; c.fillStyle = '#000'; c.fillRect(200, 850, 700, 150); c.restore(); wrappedShape(c, .5*xr, true); }
  } else {
    // panels pulled away, leaning on the floor
    c.save(); c.globalAlpha = ease(lt/.4);
    c.fillStyle = '#5a3f28'; c.save(); c.translate(940, 1150); c.rotate(.12); c.fillRect(-300, -60, 300, 120); c.restore();
    c.restore();
    c.strokeStyle = '#5a3f28'; c.lineWidth = 14; c.strokeRect(190, 840, 720, 170);
    const hl = ease((lt - (p.hlAt ?? .45)*d)/.4); if (hl) wrappedShape(c, 1, hl > .5 && (Math.floor(lt*3) % 2 === 0 || lt > d*.85));
  }
  // mattress + blanket (lifts from the head end)
  c.save(); c.translate(190, 840); c.rotate(-.42*lift); c.translate(0, -30*lift);
  c.fillStyle = '#d8d2c2'; c.beginPath(); c.roundRect(0, -90, 720, 90, 18); c.fill();
  c.fillStyle = '#a9a291'; c.fillRect(0, -18, 720, 18);
  if (!p.noBlanket){ c.fillStyle = '#6e3b31'; c.beginPath(); c.roundRect(220, -100, 500, 100, 16); c.fill(); }
  c.fillStyle = '#efeae0'; c.beginPath(); c.roundRect(20, -130, 150, 50, 22); c.fill();     // pillow
  if (p.man){ // sleeping silhouette (no face)
    c.fillStyle = '#0d0e10'; c.beginPath(); c.ellipse(110, -120, 46, 40, 0, 0, 7); c.fill();
    c.fillStyle = '#6e3b31'; c.beginPath(); c.moveTo(170, -100); c.quadraticCurveTo(260, -175, 430, -150); c.quadraticCurveTo(600, -140, 700, -110); c.lineTo(720, -60); c.lineTo(170, -60); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 4; c.beginPath(); c.moveTo(230, -110); c.quadraticCurveTo(400, -150, 690, -100); c.stroke();
    const z = (lt*.8) % 1; c.save(); c.globalAlpha = .6*(1 - z); text(c, 'z', 120 + 30*z, -190 - 60*z, 40 + 20*z, 'VT', '#d7fbe9'); c.restore();
  }
  c.restore();
  // smell lines rising from the bed base
  if (p.smell){ const a = ease((lt - (p.smellAt || 0)*d)/.6); c.save(); c.globalAlpha = .7*a; c.strokeStyle = '#9fd36a'; c.lineWidth = 6; c.lineCap = 'round';
    for (let k = 0; k < 5; k++){ const x0 = 280 + k*140, ph = lt*2 + k; c.beginPath();
      for (let s = 0; s <= 1; s += .05){ const y = 980 - s*420, x = x0 + 26*Math.sin(ph + s*9); s ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); } c.restore(); }
  if (p.cleaner){ const a = ease(lt/.4); person(c, 900, 520, .92, {a, coat: '#41545e', legs: '#1a1f22', skin: '#0f1012', hairC: '#0f1012'}); 
    c.save(); c.globalAlpha = a; c.fillStyle = '#5d6e78'; c.fillRect(980, 860, 90, 150); c.fillStyle = '#e8e4d8'; c.fillRect(990, 830, 70, 40); c.restore(); }
  if (p.underGlow){ const a = .5 + .5*Math.sin(lt*2.2); c.save(); const g = c.createLinearGradient(0, 1010, 0, 1100); g.addColorStop(0, `rgba(255,40,30,${.5*a})`); g.addColorStop(1, 'rgba(255,40,30,0)'); c.fillStyle = g; c.fillRect(190, 1010, 720, 90); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, p.tagY || 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, p.tag2Y || 1220, ease((lt - (p.tag2At || .4)*d)/.3), p.tag2Col || '#ff5a3a');
  if (p.follow) followBox(c, lt, d);
};
function paperCard(c, x, y, w, h, rot){
  c.save(); c.translate(x, y); c.rotate(rot || 0);
  c.fillStyle = 'rgba(0,0,0,.5)'; c.fillRect(-w/2 + 14, -h/2 + 18, w, h);
  c.fillStyle = '#e9e2cc'; c.fillRect(-w/2, -h/2, w, h);
  c.strokeStyle = 'rgba(120,100,70,.25)'; c.lineWidth = 2; for (let yy = -h/2 + 90; yy < h/2; yy += 46){ c.beginPath(); c.moveTo(-w/2 + 30, yy); c.lineTo(w/2 - 30, yy); c.stroke(); }
  c.restore();
}
function stamp(c, s, x, y, a, size, rot){
  if (a <= 0) return; const k = 1 + 1.2*(1 - a);
  c.save(); c.globalAlpha = Math.min(1, a*1.4); c.translate(x, y); c.rotate(rot ?? -.14); c.scale(k, k);
  c.font = `${size}px Anton`; const w = c.measureText(s).width + 60;
  c.strokeStyle = '#c4161c'; c.lineWidth = 12; c.strokeRect(-w/2, -size*.65, w, size*1.3);
  text(c, s, 0, 6, size, 'Anton', '#c4161c'); c.restore();
}
SC.legendcard = (c, p, lt, d) => {
  bg(c, '#2a2118', '#0d0a07');
  paperCard(c, 540, 760, 820, 760, -.03);
  c.save(); c.translate(540, 760); c.rotate(-.03);
  text(c, 'URBAN LEGEND', 0, -270, 64, 'Type', '#2a2620');
  text(c, '"THE BODY', 0, -120, 96, 'Anton', '#1a1712');
  text(c, 'UNDER THE BED"', 0, 0, 96, 'Anton', '#1a1712');
  text(c, 'a guest complains of a smell...', 0, 140, 40, 'Type', '#4a4438');
  c.restore();
  stamp(c, 'IT HAPPENED', 560, 1010, ease((lt - (p.stampAt ?? .42)*d)/.18), 100);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.deskLog = (c, p, lt, d) => {
  bg(c, '#2a2118', '#0d0a07');
  paperCard(c, 540, 770, 880, 820, .02);
  c.save(); c.translate(540, 770); c.rotate(.02);
  text(c, 'FRONT DESK · GUEST COMPLAINTS', 0, -330, 46, 'Type', '#2a2620');
  c.fillStyle = '#c4161c'; c.fillRect(-380, -300, 760, 4);
  const rows = [['GUEST', 'BAD SMELL IN ROOM', .0], ['GUEST', 'SMELL STILL THERE', .22], ['MGMT', 'NOTHING CAN BE DONE', .5]];
  rows.forEach(([who, what, at], i) => { const a = ease((lt - at*d)/.25); if (!a) return; c.save(); c.globalAlpha = a; const y = -200 + i*170;
    text(c, who + ':', -380, y, 50, 'Type', who === 'MGMT' ? '#b01810' : '#3a3428', 'left');
    text(c, what, -380, y + 70, who === 'MGMT' ? 70 : 60, who === 'MGMT' ? 'Anton' : 'Hand', who === 'MGMT' ? '#b01810' : '#1d2a6a', 'left'); c.restore(); });
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.nights = (c, p, lt, d) => {
  bg(c, '#0b0f18', '#040508');
  text(c, 'CAPRI MOTEL · JULY 2003', 540, 430, 50, 'VT', '#d7fbe9');
  const days = ['THU', 'FRI', 'SAT'];
  days.forEach((dy, i) => { const x = 220 + i*320, y = 720; const a = ease((lt - (.08 + i*.16)*d)/.25);
    c.save(); c.globalAlpha = .25 + .75*a; c.fillStyle = '#e9e2cc'; c.fillRect(x - 130, y - 170, 260, 340); c.fillStyle = '#b01810'; c.fillRect(x - 130, y - 170, 260, 70);
    text(c, dy, x, y - 134, 52, 'Anton', '#fff'); text(c, 'NIGHT', x, y - 30, 42, 'Type', '#3a3428'); text(c, String(i + 1), x, y + 70, 120, 'Anton', '#1a1712');
    if (a > .6){ c.strokeStyle = 'rgba(176,24,16,.9)'; c.lineWidth = 14; c.lineCap = 'round'; const k = ease((a - .6)/.4); c.beginPath(); c.moveTo(x - 100, y - 70); c.lineTo(x - 100 + 200*k, y - 70 + 220*k); c.stroke(); }
    c.restore(); });
  const b = ease((lt - .68*d)/.25); c.save(); c.globalAlpha = b; text(c, 'SUN · CHECKS OUT', 540, 1060, 90, 'Anton', '#ff3b30'); c.restore();
  text(c, 'BODY STILL UNDER THE BED', 540, 1180, 44, 'VT', `rgba(215,251,233,${.8*b})`);
};
SC.rented = (c, p, lt, d) => {
  bg(c, '#0b0f18', '#040508');
  text(c, 'MEMPHIS · 2010', 540, 400, 56, 'VT', '#d7fbe9');
  for (let i = 0; i < 5; i++){ const x = 160 + i*190, y = 700; const a = ease((lt - (.06 + i*.12)*d)/.15);
    c.save(); c.translate(x, y); c.rotate((i - 2)*.04);
    c.fillStyle = a ? '#e9e2cc' : '#2a2c30'; c.beginPath(); c.roundRect(-70, -150, 140, 300, 14); c.fill();
    c.fillStyle = '#0b0f18'; c.beginPath(); c.arc(0, -105, 26, 0, 7); c.fill();              // door hanger hole
    if (a){ c.globalAlpha = a; text(c, 'GUEST', 0, -20, 34, 'Type', '#3a3428'); text(c, String(i + 1), 0, 70, 96, 'Anton', '#b01810'); }
    c.restore(); }
  const b = ease((lt - .7*d)/.2); c.save(); c.globalAlpha = b; text(c, 'RENTED ~5 TIMES', 540, 1000, 96, 'Anton', '#ff3b30'); c.restore();
  text(c, 'AFTER SHE DISAPPEARED', 540, 1120, 50, 'VT', `rgba(215,251,233,${b})`);
};
