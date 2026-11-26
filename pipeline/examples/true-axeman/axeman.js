// ===== The Axeman of New Orleans (1918-1919). True case; featureless silhouettes only, no gore =====
function axLbl(c, s, x, y, size, col){ c.save(); c.font = `${size}px Anton`; const w = c.measureText(s).width + 40; c.fillStyle = 'rgba(0,0,0,.75)'; c.fillRect(x - w/2, y - size*.7, w, size*1.35); c.restore(); text(c, s, x, y, size, 'Anton', col); }
function axSky(c, dawn){
  if (dawn) bg(c, '#8a8fa0', '#d9a77a'); else bg(c, '#18223a', '#06080e');
  if (!dawn){ const r = R(19); for (let i = 0; i < 55; i++){ c.fillStyle = `rgba(220,230,255,${.25 + .5*r()})`; c.fillRect(r()*W, 240 + r()*380, 2.5, 2.5); }
    c.fillStyle = 'rgba(240,235,210,.9)'; c.beginPath(); c.arc(840, 380, 46, 0, 7); c.fill(); c.fillStyle = '#18223a'; c.beginPath(); c.arc(822, 368, 42, 0, 7); c.fill(); }
}
// row of New Orleans shotgun houses (raised porch, gable roof, tall shutters)
function axHouse(c, x, y, w, h, col, lit, seed, band, lt){
  c.fillStyle = col; c.beginPath(); c.moveTo(x - 10, y); c.lineTo(x + w/2, y - h*.32); c.lineTo(x + w + 10, y); c.closePath(); c.fill();
  c.fillRect(x, y, w, h);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x - 6, y + h - 26, w + 12, 26); // porch
  const r = R(seed);
  const wins = [[x + w*.14, y + h*.2], [x + w*.58, y + h*.2]];
  wins.forEach(([wx, wy], i) => {
    const on = lit === true || (lit === 'some' && r() < .5) || (lit === 'one' && i === 1);
    c.fillStyle = on ? '#ffcf7a' : '#0c0f16'; c.fillRect(wx, wy, w*.28, h*.32);
    if (on && band){ c.save(); c.beginPath(); c.rect(wx, wy, w*.28, h*.32); c.clip(); c.fillStyle = '#1a120a';
      for (let k = 0; k < 2; k++){ const px = wx + w*.07 + k*w*.13, py = wy + h*.22 + 6*Math.sin(lt*6 + k + seed); c.beginPath(); c.arc(px, py, w*.035, 0, 7); c.fill(); c.fillRect(px - w*.04, py + w*.03, w*.08, h*.18); }
      c.restore(); }
    c.fillStyle = 'rgba(0,0,0,.5)'; c.fillRect(wx - 10, wy, 8, h*.32); c.fillRect(wx + w*.28 + 2, wy, 8, h*.32); c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(wx + w*.14 - 2, wy, 4, h*.32); c.fillRect(wx, wy + h*.16 - 2, w*.28, 4); // shutters
  });
  c.fillStyle = '#0a0a0c'; c.fillRect(x + w*.4, y + h*.58, w*.2, h*.42 - 26); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(x + w*.4, y + h*.58, w*.2, 6); // door
}
function axStreet(c, p, lt, d){
  axSky(c, p.dawn);
  const cols = p.dawn ? ['#6b5a52', '#5a5f6a', '#705e4a', '#4e5560'] : ['#1f2430', '#262b36', '#1c2029', '#242733'];
  const H0 = [[30, 760, 230, 400], [290, 740, 240, 420], [560, 760, 230, 400], [820, 750, 240, 410]];
  H0.forEach(([x, y, w, h], i) => axHouse(c, x, y, w, h, cols[i], p.dawn ? false : (p.lit || (i === 1 ? 'one' : false)), 30 + i, p.band, lt));
  c.fillStyle = p.dawn ? '#3d3a38' : '#08090c'; c.fillRect(0, 1160, W, 300);
  // gas street lamp
  c.fillStyle = '#050507'; c.fillRect(522, 860, 12, 300); c.fillRect(505, 830, 46, 34);
  if (!p.dawn){ c.fillStyle = '#ffe1a0'; c.fillRect(511, 836, 34, 24); const g = c.createRadialGradient(528, 848, 4, 528, 848, 200); g.addColorStop(0, 'rgba(255,220,150,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(300, 640, 460, 460); }
  // a figure walking past, seen in silhouette only
  if (p.walker){ const k = (lt/d); const x = 120 + 820*k; c.fillStyle = '#020203'; c.beginPath(); c.arc(x, 1035, 22, 0, 7); c.fill(); c.beginPath(); c.moveTo(x - 30, 1055); c.lineTo(x + 30, 1055); c.lineTo(x + 26, 1150); c.lineTo(x - 26, 1150); c.closePath(); c.fill();
    c.fillRect(x - 40, 1028, 80, 8); c.fillRect(x - 22, 1005, 44, 26); }
}
function axNotes(c, lt, n, seed){
  const r = R(seed); c.save(); c.fillStyle = '#ffd98a'; c.strokeStyle = '#ffd98a'; c.lineWidth = 5;
  for (let i = 0; i < n; i++){ const x0 = 80 + r()*920, sp = 40 + r()*40, ph = r()*10; const y = 1100 - ((lt*sp + ph*80) % 700); const x = x0 + 18*Math.sin(lt*2 + ph);
    c.globalAlpha = Math.max(0, Math.min(1, (y - 380)/200)) * .9; c.beginPath(); c.ellipse(x, y, 13, 10, -.4, 0, 7); c.fill(); c.beginPath(); c.moveTo(x + 11, y - 2); c.lineTo(x + 11, y - 52); c.lineTo(x + 32, y - 40); c.stroke(); }
  c.restore();
}
SC.axstreet = (c, p, lt, d) => {
  axStreet(c, p, lt, d);
  if (p.notes) axNotes(c, lt, p.notes, 7);
  if (p.stampTxt) stamp(c, p.stampTxt, 540, p.stampY || 560, ease((lt - (p.stampAt ?? .5)*d)/.18), p.stampSize || 92, -.1);
  if (p.label) { const a = ease((lt - (p.labelAt || 0)*d)/.3); c.save(); c.globalAlpha = a; axLbl(c, p.label, 540, 520, 66, '#ff3b30'); c.restore(); }
  if (p.follow) followBox(c, lt, d);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
// wooden panelled door, seen from inside the dark kitchen; a chisel works out the lower panel
SC.axdoor = (c, p, lt, d) => {
  bg(c, '#1d1915', '#080706');
  c.fillStyle = '#2a241e'; c.fillRect(0, 300, W, 950);
  c.fillStyle = '#141210'; c.fillRect(0, 1180, W, 280); // floor
  const open = p.openAt !== undefined ? ease((lt - p.openAt*d)/(d*.35)) : (p.open || 0);
  // doorway (moonlit outside)
  c.fillStyle = '#3a4560'; c.fillRect(300, 380, 480, 820);
  c.save(); c.translate(300, 380); c.scale(1 - .7*open, 1);
  c.fillStyle = '#5b4330'; c.fillRect(0, 0, 480, 820); c.strokeStyle = '#2c1f15'; c.lineWidth = 12; c.strokeRect(0, 0, 480, 820);
  c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 7; c.strokeRect(50, 50, 380, 300); c.strokeRect(50, 420, 380, 340);
  const gone = p.panelAt !== undefined ? ease((lt - p.panelAt*d)/.4) : (p.panelGone ? 1 : 0);
  if (gone > 0){ c.globalAlpha = gone; c.fillStyle = '#0e1220'; c.fillRect(60, 430, 360, 320); c.globalAlpha = 1;
    c.fillStyle = 'rgba(200,170,120,.8)'; const r = R(4); for (let i = 0; i < 10; i++) c.fillRect(60 + r()*350, 425 + (r() < .5 ? 0 : 320), 14, 6); }
  c.fillStyle = '#c9a65a'; c.beginPath(); c.arc(420, 400, 14, 0, 7); c.fill();
  c.restore();
  // chisel blade at the panel edge (before it gives way)
  if (p.panelAt !== undefined && lt < p.panelAt*d + .2){ const j = Math.sin(lt*28)*4; c.save(); c.translate(560 + j, 805); c.rotate(-.6); c.fillStyle = '#9aa3ad'; c.fillRect(-6, -70, 12, 70); c.fillStyle = '#4a3220'; c.fillRect(-11, -150, 22, 82); c.restore(); }
  // shavings on the floor
  if (gone > 0){ c.fillStyle = 'rgba(200,170,120,.7)'; const r = R(8); for (let i = 0; i < 14; i++) c.fillRect(330 + r()*420, 1195 + r()*30, 12, 5); }
  if (p.dark){ c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, 0, W, H); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1000, ease((lt - (p.stampAt ?? .5)*d)/.18), 100, -.1);
  if (p.label){ const a = ease((lt - (p.labelAt || 0)*d)/.3); c.save(); c.globalAlpha = a; axLbl(c, p.label, 540, 470, 60, '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
// wood-handled axe leaning by the stove / woodpile
SC.axaxe = (c, p, lt, d) => {
  bg(c, '#221c17', '#0a0807');
  const g = c.createRadialGradient(560, 760, 30, 560, 800, 620); g.addColorStop(0, 'rgba(255,210,150,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#2e261f'; for (let x = 0; x < W; x += 90){ c.fillRect(x, 300, 84, 900); }   // plank wall
  c.fillStyle = '#16120f'; c.fillRect(0, 1180, W, 280);
  // woodpile
  for (let row = 0; row < 3; row++) for (let k = 0; k < 4 - row; k++){ const x = 170 + k*86 + row*43, y = 1150 - row*70; c.fillStyle = '#5b4028'; c.beginPath(); c.arc(x, y, 38, 0, 7); c.fill(); c.strokeStyle = '#7d5a38'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 22, 0, 7); c.stroke(); }
  // axe
  const z = 1 + .08*ease(lt/d);
  c.save(); c.translate(680, 760); c.scale(z, z); c.rotate(.18);
  c.fillStyle = '#7a5532'; c.fillRect(-14, -330, 28, 740);
  c.fillStyle = '#8f98a2'; c.beginPath(); c.moveTo(14, -330); c.lineTo(150, -400); c.quadraticCurveTo(180, -300, 150, -200); c.lineTo(14, -250); c.closePath(); c.fill();
  c.fillStyle = '#5d646c'; c.fillRect(-26, -340, 44, 100);
  c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.moveTo(150, -400); c.quadraticCurveTo(180, -300, 150, -200); c.lineTo(140, -205); c.quadraticCurveTo(166, -300, 140, -393); c.closePath(); c.fill();
  c.restore();
  if (p.label){ const a = ease((lt - (p.labelAt || 0)*d)/.3); c.save(); c.globalAlpha = a; axLbl(c, p.label, 540, 1090, 64, '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.axcount = (c, p, lt, d) => {
  bg(c, '#0b0b0d', '#000');
  const n = Math.min(6, Math.floor(ease(lt/(d*.6))*6.99));
  c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, String(n), 540, 700, 360, 'Anton', '#ff3b30'); c.restore();
  c.globalAlpha = ease((lt - .3)/.4); text(c, 'PEOPLE KILLED', 540, 950, 84, 'Anton', '#f1efe8'); text(c, 'AT LEAST', 540, 470, 60, 'Anton', '#ffb3ad'); c.globalAlpha = 1;
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.axpaper = (c, p, lt, d) => {
  desk(c);
  const z = .84 + .06*ease(lt/d); c.save(); c.translate(540, 830); c.scale(z, z); c.rotate(-.03);
  paper(c, 0, 0, 840, 940, 0, '#e2d9c0');
  text(c, 'THE TIMES-PICAYUNE', 0, -400, 66, 'Type', '#1b1b1b'); c.fillStyle = '#1b1b1b'; c.fillRect(-390, -360, 780, 5);
  text(c, 'NEW ORLEANS · MARCH 1919', 0, -325, 32, 'Type', '#333'); c.fillRect(-390, -298, 780, 2);
  text(c, 'LETTER SIGNED', 0, -230, 70, 'Anton', '#111'); text(c, '"THE AXEMAN"', 0, -140, 96, 'Anton', '#8a1a12');
  const r = R(6); c.fillStyle = 'rgba(40,40,40,.5)';
  for (let col = 0; col < 3; col++) for (let k = 0; k < 15; k++){ c.fillRect(-380 + col*262, -60 + k*30, 210 + r()*30 - (k%6 === 5 ? 90 : 0), 9); }
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
// the letter, handwritten; mode 'demon' highlights the self-description, mode 'jazz' circles the promise
SC.axletter = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 830); c.rotate(.02); const z = .84 + .06*ease(lt/d); c.scale(z, z);
  paper(c, 0, 0, 800, 960, 0, '#ece4cf');
  text(c, 'Esteemed Mortal:', -330, -400, 54, 'Hand', '#2a2520', 'left');
  const r = R(p.mode === 'jazz' ? 13 : 11); c.strokeStyle = 'rgba(40,35,30,.55)'; c.lineWidth = 4;
  for (let i = 0; i < 15; i++){ const y = -320 + i*52; if (Math.abs(y - (p.mode === 'jazz' ? 120 : -60)) < 70) continue; c.beginPath(); c.moveTo(-330, y); for (let x = -330; x < -330 + 520 + r()*140; x += 20) c.lineTo(x, y + 4*Math.sin(x*.09 + i)); c.stroke(); }
  if (p.mode === 'demon'){ text(c, '...a demon from the', 0, -90, 62, 'Hand', '#2a2520'); text(c, 'hottest hell.', 0, -20, 62, 'Hand', '#2a2520');
    const a = ease((lt - .35*d)/.35); c.fillStyle = 'rgba(200,20,20,.25)'; c.fillRect(-300, -125, 600*a, 140); }
  if (p.mode === 'jazz'){ text(c, '...a jazz band...', 0, 90, 70, 'Hand', '#2a2520'); text(c, 'spared.', 0, 160, 70, 'Hand', '#2a2520');
    const a = ease((lt - .4*d)/.4); if (a > 0){ c.strokeStyle = 'rgba(200,20,20,.9)'; c.lineWidth = 8; c.beginPath(); c.ellipse(0, 120, 290, 110, 0, 0, 7*a); c.stroke(); } }
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 560, 1020, ease((lt - (p.stampAt ?? .6)*d)/.18), 80, -.1);
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.axclock = (c, p, lt, d) => {
  bg(c, '#14110e', '#050403');
  const cx = 540, cy = 720, R0 = 330, k = ease(lt/(d*.75));
  c.fillStyle = '#3b2a1c'; c.beginPath(); c.arc(cx, cy, R0 + 40, 0, 7); c.fill();
  c.fillStyle = '#e9e0c8'; c.beginPath(); c.arc(cx, cy, R0, 0, 7); c.fill();
  for (let h = 1; h <= 12; h++){ const a = h/12*2*Math.PI - Math.PI/2; text(c, ['I','II','III','IIII','V','VI','VII','VIII','IX','X','XI','XII'][h-1], cx + Math.cos(a)*(R0 - 55), cy + Math.sin(a)*(R0 - 55), 48, 'Type', '#1a1712'); }
  const mins = 55 + 20*k; // 11:55 -> 12:15
  const ma = mins/60*2*Math.PI - Math.PI/2, ha = ((11 + mins/60)%12)/12*2*Math.PI - Math.PI/2;
  c.strokeStyle = '#111'; c.lineCap = 'round'; c.lineWidth = 16; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(ha)*170, cy + Math.sin(ha)*170); c.stroke();
  c.lineWidth = 10; c.strokeStyle = '#8a1a12'; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(ma)*270, cy + Math.sin(ma)*270); c.stroke();
  c.fillStyle = '#111'; c.beginPath(); c.arc(cx, cy, 18, 0, 7); c.fill();
  const a = ease((lt - .7*d)/.25); c.save(); c.globalAlpha = a; axLbl(c, 'TUESDAY NIGHT · 12:15', 540, 1110, 72, '#ff3b30'); c.restore();
  if (p.tag) tag(c, p.tag, 540, 320, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.axfile = (c, p, lt, d) => {
  bg(c, '#2a2118', '#0d0a07');
  paperCard(c, 540, 760, 840, 820, -.02);
  c.save(); c.translate(540, 760); c.rotate(-.02);
  text(c, 'CASE FILE · NEW ORLEANS', 0, -320, 50, 'Type', '#2a2620'); c.fillStyle = '#2a2620'; c.fillRect(-370, -280, 740, 4);
  const rows = [['KILLER:', 'NEVER IDENTIFIED', .05], ['THE LETTER:', 'REALLY HIS?', .35], ['ARRESTS:', 'NONE', .6]];
  rows.forEach(([a, b, at], i) => { const y = -170 + i*140, s = ease((lt - at*d)/.25); text(c, a, -360, y, 46, 'Type', '#222', 'left'); c.globalAlpha = s; text(c, b, 360, y, 54, 'Anton', '#a01010', 'right'); c.globalAlpha = 1; c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-360, y + 40, 720, 2); });
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 560, 1040, ease((lt - (p.stampAt ?? .7)*d)/.18), 92, -.12);
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
