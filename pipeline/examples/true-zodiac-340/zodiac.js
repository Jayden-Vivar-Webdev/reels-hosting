// ===== Zodiac ciphers (Z408 / Z340 / Z13; 340 solved Dec 2020) =====
// glyphs are invented symbols in the style of a cipher sheet, not a copy of the real ciphers
const ZG = 'ABCDEFGHIJKLMNOPRSTUVWXYZ+/';
function zglyph(c, x, y, s, k, col){
  const t = k % 14; c.save(); c.translate(x, y); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = Math.max(2, s*.11);
  const h = s*.42;
  if (t < 6){ c.font = `${s}px Type`; c.textAlign = 'center'; c.textBaseline = 'middle'; if (t % 2) c.scale(-1, 1); if (t === 4) c.scale(1, -1); c.fillText(ZG[(k*7) % ZG.length], 0, 2); }
  else if (t === 6){ c.beginPath(); c.moveTo(0, -h); c.lineTo(h, h); c.lineTo(-h, h); c.closePath(); c.stroke(); }
  else if (t === 7){ c.beginPath(); c.moveTo(0, -h); c.lineTo(h, h); c.lineTo(-h, h); c.closePath(); c.fill(); }
  else if (t === 8){ c.beginPath(); c.arc(0, 0, h, 0, 7); c.stroke(); c.beginPath(); c.arc(0, 0, h*.25, 0, 7); c.fill(); }
  else if (t === 9){ c.strokeRect(-h, -h, 2*h, 2*h); }
  else if (t === 10){ c.fillRect(-h, -h, 2*h, 2*h); }
  else if (t === 11){ c.beginPath(); c.arc(0, 0, h, 0, 7); c.stroke(); c.beginPath(); c.moveTo(-h, 0); c.lineTo(h, 0); c.moveTo(0, -h); c.lineTo(0, h); c.stroke(); }
  else if (t === 12){ c.beginPath(); c.arc(0, 0, h, Math.PI*.2, Math.PI*1.8); c.stroke(); c.beginPath(); c.arc(h*.2, 0, h*.22, 0, 7); c.fill(); }
  else { c.beginPath(); c.moveTo(-h, h); c.lineTo(h, -h); c.moveTo(-h*.2, h); c.lineTo(h, -h*.2); c.stroke(); }
  c.restore();
}
function crosshair(c, x, y, r, col, a=1){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = r*.12; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke();
  c.beginPath(); c.moveTo(x - r*1.35, y); c.lineTo(x + r*1.35, y); c.moveTo(x, y - r*1.35); c.lineTo(x, y + r*1.35); c.stroke(); c.restore(); }
// a sheet of cipher symbols; cols x rows, revealed progressively, optional decode to letters
function cipherSheet(c, o){
  const cols = o.cols || 17, rows = o.rows || 20, cw = o.cw || 40, rh = o.rh || 40, x0 = -cols*cw/2 + cw/2, y0 = -rows*rh/2 + rh/2;
  const r = R(o.seed || 340);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++){
    const k = Math.floor(r()*1000), n = j*cols + i;
    if (o.show !== undefined && n / (cols*rows) > o.show) continue;
    const dec = o.decode !== undefined && (n / (cols*rows)) < o.decode;
    if (dec){ c.save(); c.font = `bold ${cw*.8}px Type`; c.fillStyle = '#9c1010'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText((o.plain || 'IHOPEYOUAREHAVINGLOTSOFFUNINTRYINGTOCATCHME')[n % (o.plain || 'IHOPEYOUAREHAVINGLOTSOFFUNINTRYINGTOCATCHME').length], x0 + i*cw, y0 + j*rh + 2); c.restore(); }
    else zglyph(c, x0 + i*cw, y0 + j*rh, cw*.78, k, o.col || '#1a2a5a');
  }
}
SC.cipher = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 770); c.rotate(-.03); const k = (p.zoom ? 1.02 + .12*ease(lt/d) : .96 + .05*lt/d); c.scale(k, k);
  paper(c, 0, 0, 780, 960, 0, '#ebe4d0');
  c.translate(0, 20); cipherSheet(c, {seed: p.seed || 340, show: p.build ? ease(lt/(d*.7)) : undefined, decode: p.decode !== undefined ? clamp((lt - p.decode*d)/(d*.55), 0, 1) : undefined});
  c.restore();
  if (p.env){ const e = ease((lt - .1)/.5); paper(c, 760 - 60*e, 1160, 480, 250, .1, '#d9cfb4'); c.save(); c.translate(760 - 60*e, 1160); c.rotate(.1); text(c, 'S.F. CHRONICLE', -10, -10, 40, 'Type', '#222'); text(c, 'SAN FRANCISCO', -10, 40, 30, 'Type', '#333'); c.fillStyle = '#7a2a22'; c.fillRect(150, -105, 54, 64); c.restore(); }
  if (p.ring){ const a = ease((lt - p.ring*d)/.5); if (a > 0){ c.strokeStyle = 'rgba(210,20,20,.9)'; c.lineWidth = 8; c.beginPath(); c.ellipse(540, 770, 420, 520, -.03, 0, 7*a); c.stroke(); } }
  if (p.count){ const n = Math.round(340*ease((lt - .15*d)/(d*.6))); c.save(); c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(300, 1180, 480, 120); c.shadowColor = '#ff2a20'; c.shadowBlur = 30; text(c, `${n} SYMBOLS`, 540, 1242, 80, 'VT', '#ff3b30'); c.restore(); }
  if (p.stampText) stamp(c, p.stampText, 560, 1120, ease((lt - (p.stamp || .6)*d)/.2), 84, -.12);
  if (p.big){ const a = ease((lt - (p.bigAt || .4)*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(140, (p.bigY || 760) - 120, 800, 240); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, p.bigY || 760, p.bigSize || 150, 'Anton', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1210, ease((lt - (p.tag2At || .5)*d)/.3), p.tag2Col || '#ff5a3a');
  if (p.follow) followBox(c, lt, d);
};
SC.bayarea = (c, p, lt, d) => {
  // night coastline map of the San Francisco Bay area, five red pins (no exact addresses)
  bg(c, '#0a1420', '#03060b');
  c.save(); c.translate(540, 760);
  c.fillStyle = '#0d2236'; c.fillRect(-460, -440, 920, 900);                                     // ocean
  c.fillStyle = '#1e2a22'; c.beginPath(); c.moveTo(-200, -440); c.bezierCurveTo(-260, -200, -330, 0, -300, 120); c.lineTo(-180, 160);
  c.bezierCurveTo(-170, 300, -250, 380, -240, 460); c.lineTo(460, 460); c.lineTo(460, -440); c.closePath(); c.fill();   // land
  c.fillStyle = '#0d2236'; c.beginPath(); c.moveTo(-180, 120); c.bezierCurveTo(-60, 60, 40, 140, 60, 280); c.bezierCurveTo(80, 380, -60, 420, -120, 300); c.bezierCurveTo(-160, 220, -200, 160, -180, 120); c.fill();  // bay
  c.beginPath(); c.moveTo(-60, 70); c.bezierCurveTo(20, -40, 160, -60, 240, -40); c.lineTo(240, -10); c.bezierCurveTo(140, -20, 40, 0, -40, 100); c.fill();   // north bay strait
  c.strokeStyle = 'rgba(160,200,230,.35)'; c.lineWidth = 3; c.strokeRect(-460, -440, 920, 900);
  const lbl = [['SAN FRANCISCO', -230, 210], ['VALLEJO', 200, -80], ['NAPA COUNTY', 230, -300], ['BENICIA', 300, 20]];
  lbl.forEach(([s, x, y]) => text(c, s, x, y, 34, 'VT', 'rgba(215,251,233,.85)'));
  const pins = [[-200, 160], [150, -30], [175, -45], [260, -260], [320, 60]];
  pins.forEach(([x, y], i) => { const a = ease((lt - .25*d - i*.22)/.25); if (a <= 0) return; c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 30; c.fillStyle = '#ff3b30'; c.beginPath(); c.arc(x, y - 30, 20, Math.PI, 0); c.lineTo(x, y); c.closePath(); c.fill(); c.restore(); });
  c.restore();
  const n = Math.min(5, Math.floor(ease((lt - .25*d)/(d*.55))*5.99));
  c.save(); c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(260, 1110, 560, 130); c.shadowColor = '#ff2a20'; c.shadowBlur = 30; text(c, `${n} KILLED`, 540, 1177, 96, 'VT', '#ff3b30'); c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.zletter = (c, p, lt, d) => {
  desk(c);
  // three envelopes to newspapers, then a handwritten letter signed with a crosshair
  const names = ['NEWSPAPER · S.F.', 'NEWSPAPER · S.F.', 'NEWSPAPER · VALLEJO'];
  names.forEach((s, i) => { const a = ease((lt - i*.15*d)/.35); if (a <= 0) return; const x = 300 + i*240, y = 1130 + (i%2)*40;
    c.save(); c.globalAlpha = a; paper(c, x, y, 360, 200, -.1 + i*.1, '#d9cfb4'); c.translate(x, y); c.rotate(-.1 + i*.1); text(c, s, 0, 0, 28, 'Type', '#222'); c.fillStyle = '#7a2a22'; c.fillRect(110, -80, 44, 52); c.restore(); });
  c.save(); c.translate(520, 650); c.rotate(.03); const k = .96 + .04*lt/d; c.scale(k, k);
  paper(c, 0, 0, 640, 760, 0, '#ece6d6');
  const r = R(21); c.strokeStyle = 'rgba(20,30,90,.8)'; c.lineWidth = 4;
  for (let i = 0; i < 11; i++){ const y = -300 + i*46, w = 420 + r()*120; c.beginPath(); c.moveTo(-260, y); for (let x = 0; x < w; x += 14) c.lineTo(-260 + x, y + Math.sin(x*.3 + i*2)*7 + (r() - .5)*6); c.stroke(); }
  crosshair(c, 0, 250, 70, '#1a2a6a', ease((lt - .45*d)/.3));
  c.restore();
  const a = ease((lt - .5*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.strokeStyle = 'rgba(210,20,20,.9)'; c.lineWidth = 7; c.beginPath(); c.arc(520, 900, 140, 0, 7*a); c.stroke(); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.zstat = (c, p, lt, d) => {
  bg(c, '#070909', '#000');
  crosshair(c, 540, 700, 330, 'rgba(200,30,30,.22)', 1);
  const a = ease(lt/.5); c.save(); c.globalAlpha = a; text(c, '"THE ZODIAC"', 540, 420, 110, 'Anton', '#f1efe8'); c.restore();
  const k = ease((lt - .45*d)/(d*.4)), n = Math.round(37*k);
  if (k > 0){ c.save(); c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, String(n), 540, 760, 280, 'VT', '#ff3b30'); c.restore(); text(c, 'CLAIMED VICTIMS', 540, 930, 70, 'VT', '#d7fbe9'); }
  tag(c, 'CONFIRMED: 5', 540, 1110, ease((lt - .8*d)/.3), '#ff8a7a');
};
function laptop(c, x, y, s, label, lt, i){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#1b1f26'; c.beginPath(); c.roundRect(-160, -120, 320, 210, 14); c.fill();
  c.fillStyle = '#0d1a14'; c.fillRect(-145, -105, 290, 180);
  const r = R(50 + i); for (let j = 0; j < 6; j++) for (let q = 0; q < 10; q++){ const k = Math.floor(r()*1000 + lt*6*(j+1)); zglyph(c, -125 + q*28, -85 + j*28, 20, k, 'rgba(120,255,170,.85)'); }
  c.fillStyle = '#2a2e35'; c.beginPath(); c.moveTo(-190, 90); c.lineTo(190, 90); c.lineTo(215, 120); c.lineTo(-215, 120); c.fill();
  c.restore();
  text(c, label, x, y + 140*s + 40, 46, 'VT', '#d7fbe9');
}
SC.trio = (c, p, lt, d) => {
  bg(c, '#0e141c', '#04060a');
  const a = [ease(lt/.4), ease((lt - .3*d)/.4), ease((lt - .55*d)/.4)];
  [['USA', 540, 520], ['AUSTRALIA', 300, 960], ['BELGIUM', 780, 960]].forEach(([s, x, y], i) => { if (a[i] <= 0) return; c.save(); c.globalAlpha = a[i]; laptop(c, x, y, i ? .85 : 1.05, s, lt, i); c.restore(); });
  if (a[2] > 0){ c.save(); c.globalAlpha = .5*a[2]; c.strokeStyle = '#ff3b30'; c.setLineDash([14, 10]); c.lineWidth = 4; c.beginPath(); c.moveTo(540, 680); c.lineTo(300, 830); c.moveTo(540, 680); c.lineTo(780, 830); c.moveTo(380, 960); c.lineTo(700, 960); c.stroke(); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.plain = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 740); c.rotate(-.02);
  paper(c, 0, 0, 820, 900, 0, '#ece6d6');
  text(c, p.head || 'Z340 · DECODED', 0, -380, 44, 'Type', '#8a1a12'); c.fillStyle = '#111'; c.fillRect(-340, -345, 680, 4);
  const lines = p.lines, tot = lines.join('').length, prog = clamp((lt - .05*d)/(d*(p.speed || .8)), 0, 1) * tot;
  let used = 0;
  lines.forEach((s, i) => { const n = clamp(prog - used, 0, s.length); used += s.length; const y = -270 + i*(p.lh || 88);
    const shown = s.slice(0, Math.floor(n)); c.font = `${p.size || 58}px Type`; c.textAlign = 'left'; c.textBaseline = 'middle';
    const hot = p.hot && s.includes(p.hot) && n >= s.indexOf(p.hot) + p.hot.length;
    c.fillStyle = '#151515'; c.fillText(shown, -340, y);
    if (hot){ const pre = c.measureText(s.slice(0, s.indexOf(p.hot))).width, w = c.measureText(p.hot).width; c.fillStyle = '#b01010'; c.fillText(p.hot, -340 + pre, y); c.strokeStyle = 'rgba(200,20,20,.9)'; c.lineWidth = 6; c.beginPath(); c.moveTo(-345 + pre, y + 36); c.lineTo(-335 + pre + w, y + 36); c.stroke(); }
    if (n > 0 && n < s.length && Math.floor(lt*3) % 2 === 0){ c.fillStyle = '#151515'; c.fillRect(-340 + c.measureText(shown).width + 4, y - 26, 26, 52); } });
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.unknown = (c, p, lt, d) => {
  bg(c, '#11161d', '#030405');
  { const g = c.createRadialGradient(540, 700, 40, 540, 760, 620); g.addColorStop(0, 'rgba(200,210,220,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  // police-file silhouette: head and shoulders, no face
  c.fillStyle = '#050607'; c.beginPath(); c.arc(540, 640, 150, 0, 7); c.fill();
  c.beginPath(); c.moveTo(250, 1150); c.bezierCurveTo(260, 900, 380, 820, 540, 820); c.bezierCurveTo(700, 820, 820, 900, 830, 1150); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(215,251,233,.25)'; c.lineWidth = 3; for (let y = 450; y <= 1150; y += 100){ c.beginPath(); c.moveTo(160, y); c.lineTo(200, y); c.moveTo(880, y); c.lineTo(920, y); c.stroke(); }
  const a = ease((lt - .3*d)/.3); c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 50; text(c, '?', 540, 650, 260, 'Anton', '#ff3b30'); c.restore();
  stamp(c, 'NEVER CAUGHT', 540, 1080, ease((lt - .15*d)/.2), 86, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.myname = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(.02); const k = .96 + .06*lt/d; c.scale(k, k);
  paper(c, 0, 0, 820, 760, 0, '#ece6d6');
  const r = R(4); c.strokeStyle = 'rgba(20,30,90,.5)'; c.lineWidth = 4;
  for (let i = 0; i < 3; i++){ const y = -280 + i*50; c.beginPath(); c.moveTo(-330, y); for (let x = 0; x < 600; x += 14) c.lineTo(-330 + x, y + Math.sin(x*.3 + i)*6 + (r() - .5)*5); c.stroke(); }
  const a = ease((lt - .45*d)/.3); c.globalAlpha = a; text(c, 'My name is —', -330, -80, 92, 'Hand', '#1a2a6a', 'left'); c.globalAlpha = 1;
  // 13 symbols appear one by one
  const n = Math.floor(clamp((lt - .62*d)/(d*.3), 0, 1)*13.01);
  for (let i = 0; i < n; i++){ const x = -330 + (i%7)*96 + 30, y = 70 + Math.floor(i/7)*110; zglyph(c, x, y, 70, [3, 8, 11, 0, 7, 12, 5, 9, 2, 13, 6, 10, 1][i] + 14*i, '#1a2a6a'); }
  c.restore();
  if (n >= 13){ c.save(); c.globalAlpha = ease((lt - .93*d)/.2); c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(260, 1160, 560, 110); text(c, 'UNSOLVED', 540, 1217, 92, 'VT', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
