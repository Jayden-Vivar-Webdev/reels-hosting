// ===== UNABOM case (USA, 1978–1996). True case; featureless silhouettes and drawn props only =====
function unParcel(c, x, y, s, rot, o = {}){ // plain brown-paper parcel tied with string, generic stamps, no real names
  c.save(); c.translate(x, y); c.rotate(rot || 0); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 40; c.fillStyle = '#a77d4d'; c.fillRect(-260, -150, 520, 300); c.shadowBlur = 0;
  c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(-260, 110, 520, 40);
  c.strokeStyle = '#e6dcc2'; c.lineWidth = 9; c.beginPath(); c.moveTo(-260, 0); c.lineTo(260, 0); c.moveTo(0, -150); c.lineTo(0, 150); c.stroke();
  c.fillStyle = '#efe6cc'; c.fillRect(30, 30, 200, 92); c.fillStyle = 'rgba(30,30,30,.7)'; for (let i = 0; i < 3; i++) c.fillRect(48, 50 + i*26, 150 - i*30, 9);
  c.fillStyle = '#7d2a22'; c.fillRect(170, -130, 62, 72); c.fillStyle = '#2a4a7d'; c.fillRect(100, -130, 62, 72);
  c.strokeStyle = 'rgba(40,40,40,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(120, -80, 44, 0, 7); c.stroke();
  if (o.glow){ c.strokeStyle = `rgba(255,59,48,${o.glow})`; c.lineWidth = 10; c.strokeRect(-285, -175, 570, 350); }
  c.restore();
}
function unBuilding(c){ // old brick university hall at night
  bg(c, '#18202c', '#06080c');
  c.fillStyle = '#2b1d18'; c.fillRect(120, 430, 840, 560);
  c.fillStyle = '#3a2620'; c.beginPath(); c.moveTo(90, 440); c.lineTo(540, 300); c.lineTo(990, 440); c.closePath(); c.fill();
  c.fillStyle = '#d9d2c2'; for (let i = 0; i < 6; i++) c.fillRect(205 + i*130, 470, 34, 500);
  const r = R(9); for (let row = 0; row < 2; row++) for (let i = 0; i < 5; i++){ c.fillStyle = r() < .3 ? '#f2d58c' : '#131820'; c.fillRect(255 + i*130, 560 + row*200, 70, 110); }
  c.fillStyle = '#10141a'; c.fillRect(470, 820, 140, 170);
  c.fillStyle = '#0d1014'; c.fillRect(0, 990, W, 400);
  c.fillStyle = '#2a2f36'; for (let i = 0; i < 4; i++) c.fillRect(380 - i*40, 990 + i*36, 320 + i*80, 36);
}
SC.unparcel = (c, p, lt, d) => {
  if (p.campus){ unBuilding(c); unParcel(c, 540, 1130, .62 + .04*lt/d, -.04, {}); }
  else { desk(c); unParcel(c, 540, 760, 1.25 + .08*lt/d, -.06, {glow: p.glowAt !== undefined ? ease((lt - p.glowAt*d)/.3) : 0}); }
  if (p.big){ const a = ease((lt - (p.bigAt ?? .3)*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.78)'; c.fillRect(150, 470, 780, 190); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 570, 150, 'VT', '#ff3b30'); c.restore(); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1060, ease((lt - (p.stampAt ?? .5)*d)/.18), 74, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.unboard = (c, p, lt, d) => { // FBI evidence board
  bg(c, '#3a2a1c', '#140e09');
  c.fillStyle = '#8a6a44'; c.fillRect(110, 400, 860, 760); c.strokeStyle = '#2a1c10'; c.lineWidth = 18; c.strokeRect(110, 400, 860, 760);
  const r = R(31); c.fillStyle = 'rgba(60,40,20,.35)'; for (let i = 0; i < 400; i++) c.fillRect(120 + r()*840, 410 + r()*740, 4, 4);
  const cards = [['UNIVERSITIES', 320, 560, .05], ['AIRLINES', 760, 560, .3], ['?', 540, 900, .5]];
  const pts = [];
  cards.forEach(([s, x, y, at], i) => { const a = ease((lt - at*d)/.2); pts.push([x, y - 60]); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate([-.04, .05, 0][i]);
    c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 14; c.fillStyle = '#f0e9d6'; c.fillRect(-170, -70, 340, 150); c.shadowBlur = 0;
    text(c, s, 0, 8, s === '?' ? 110 : 52, 'Anton', s === '?' ? '#b01010' : '#2a2218'); c.fillStyle = '#c0281e'; c.beginPath(); c.arc(0, -58, 12, 0, 7); c.fill(); c.restore(); });
  const sa = ease((lt - .45*d)/.25); if (sa > 0){ c.strokeStyle = '#d0201a'; c.lineWidth = 5; c.beginPath(); c.moveTo(...pts[0]); c.lineTo(pts[0][0] + (pts[2][0] - pts[0][0])*sa, pts[0][1] + (pts[2][1] - pts[0][1])*sa); c.moveTo(...pts[1]); c.lineTo(pts[1][0] + (pts[2][0] - pts[1][0])*sa, pts[1][1] + (pts[2][1] - pts[1][1])*sa); c.stroke(); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1080, ease((lt - (p.stampAt ?? .7)*d)/.18), 110, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.unmanu = (c, p, lt, d) => { // thick typed manuscript, word counter
  desk(c);
  for (let i = 5; i >= 0; i--) paper(c, 540 + i*6, 780 + i*8, 640, 820, -.03 + i*.006, i ? '#d8d0bb' : '#ece6d6');
  c.save(); c.translate(540, 780); c.rotate(-.03);
  const r = R(17); for (let i = 0; i < 17; i++){ c.fillStyle = 'rgba(20,20,20,.7)'; c.fillRect(-260, -330 + i*40, 380 + r()*140, 12); }
  c.restore();
  if (p.count){ const k = ease(lt/(d*.7)), n = Math.round(35000*k); c.save(); c.fillStyle = 'rgba(0,0,0,.8)'; c.fillRect(170, 560, 740, 210); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, n.toLocaleString('en-US'), 540, 640, 140, 'VT', '#ff3b30'); c.restore(); text(c, 'WORDS', 540, 730, 54, 'VT', '#d7fbe9'); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1080, ease((lt - (p.stampAt ?? .6)*d)/.18), 74, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function unNewspaper(c, x, y, s, rot){ // generic broadsheet, no real mastheads
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  paper(c, 0, 0, 560, 760, 0, '#e4dcc6');
  c.fillStyle = '#1b1b1b'; c.fillRect(-240, -330, 480, 46); c.fillRect(-250, -270, 500, 4);
  text(c, 'MANIFESTO', 0, -215, 62, 'Type', '#111');
  const r = R(Math.round(x)); c.fillStyle = 'rgba(40,40,40,.55)';
  for (let col = 0; col < 3; col++) for (let k = 0; k < 20; k++) c.fillRect(-245 + col*168, -160 + k*24, 140 + r()*14 - (k%6 === 5 ? 60 : 0), 8);
  c.restore();
}
SC.unpapers = (c, p, lt, d) => {
  desk(c);
  const a = ease(lt/.4), b = ease((lt - .3*d)/.4);
  if (a > 0){ c.save(); c.globalAlpha = a; unNewspaper(c, 360, 780, .95, -.08); c.restore(); }
  if (b > 0){ c.save(); c.globalAlpha = b; unNewspaper(c, 720, 820, .95, .07); c.restore(); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1120, ease((lt - (p.stampAt ?? .6)*d)/.18), 92, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.unreader = (c, p, lt, d) => { // man seen from behind reading the paper under a lamp (no face)
  bg(c, '#221a14', '#08060a');
  const g = c.createRadialGradient(560, 560, 20, 560, 700, 620); g.addColorStop(0, 'rgba(255,214,150,.42)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#1a120c'; c.fillRect(140, 1020, 800, 40); c.fillRect(180, 1060, 30, 220); c.fillRect(870, 1060, 30, 220); // table
  c.fillStyle = '#efe6cc'; c.save(); c.translate(560, 760); c.rotate(-.02); c.fillRect(-260, -210, 520, 340); c.fillStyle = 'rgba(30,30,30,.55)'; const r = R(5); for (let k = 0; k < 11; k++) c.fillRect(-230, -170 + k*28, 200 + r()*240, 8);
  const hl = ease((lt - (p.hlAt ?? .5)*d)/.3); if (hl > 0){ c.fillStyle = `rgba(255,59,48,${.45*hl})`; c.fillRect(-236, -30, 470*hl, 70); } c.restore();
  c.fillStyle = '#040405'; c.beginPath(); c.arc(560, 960, 58, 0, 7); c.fill(); // head from behind
  c.beginPath(); c.moveTo(420, 1300); c.quadraticCurveTo(430, 1030, 560, 1010); c.quadraticCurveTo(690, 1030, 700, 1300); c.closePath(); c.fill();
  c.fillStyle = '#2a2018'; c.fillRect(800, 470, 16, 300); c.fillStyle = '#5a4630'; c.beginPath(); c.moveTo(740, 470); c.lineTo(876, 470); c.lineTo(840, 400); c.lineTo(776, 400); c.closePath(); c.fill();
  if (p.label){ const a = ease((lt - (p.labelAt ?? .55)*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; lbl(c, p.label, 540, 520, 56, '#ff3b30'); c.restore(); } }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function unCabinShape(c, x, y, s, lit){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#3a2a1e'; c.fillRect(-150, -150, 300, 150);
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let i = 1; i < 6; i++){ c.beginPath(); c.moveTo(-150, -150 + i*25); c.lineTo(150, -150 + i*25); c.stroke(); }
  c.fillStyle = '#241910'; c.beginPath(); c.moveTo(-180, -145); c.lineTo(0, -260); c.lineTo(180, -145); c.closePath(); c.fill();
  c.fillStyle = '#15100b'; c.fillRect(-40, -110, 70, 110);
  c.fillStyle = lit ? '#3a3a2c' : '#0c0d0e'; c.fillRect(70, -110, 50, 44); c.fillRect(-120, -110, 50, 44);
  c.fillStyle = '#1b130c'; c.fillRect(90, -240, 22, 60); // stovepipe
  c.restore();
}
function unAgent(c, x, y, s, beamAng, on){
  c.save(); c.translate(x, y); c.scale(s, s);
  if (on){ c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(0, -120, 5, 0, -120, 520); g.addColorStop(0, 'rgba(255,250,220,.45)'); g.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, -120); c.arc(0, -120, 520, beamAng - .14, beamAng + .14); c.closePath(); c.fill(); c.restore(); }
  c.fillStyle = '#030405'; c.beginPath(); c.arc(0, -205, 26, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-42, -175); c.lineTo(42, -175); c.lineTo(48, -40); c.lineTo(-48, -40); c.closePath(); c.fill();
  c.fillRect(-36, -42, 30, 110); c.fillRect(6, -42, 30, 110);
  c.restore();
}
SC.uncabin = (c, p, lt, d) => {
  forestBase(c, {seed: 63});
  c.fillStyle = 'rgba(230,236,240,.18)'; c.fillRect(0, 1040, W, 260);
  unCabinShape(c, 540, 1060, 1.25, false);
  if (p.agents){ const k = ease(lt/(d*.8)); const xs = [[200, 320], [880, 760], [300, 400], [790, 690]];
    xs.forEach(([a, b], i) => { const x = a + (b - a)*k; unAgent(c, x, 1180 + (i%2)*40, .9, x < 540 ? -.25 : Math.PI + .25, true); }); }
  if (p.notes){ p.notes.forEach(([s, at], i) => { const a = ease((lt - at*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; lbl(c, s, 540, 520 + i*100, 54, '#ff3b30'); c.restore(); } }); }
  if (p.follow) followBox(c, lt, d);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.uninside = (c, p, lt, d) => { // bare one-room cabin: shelves, stacks of handwritten journals, a parcel on the table
  bg(c, '#2c2217', '#0b0805');
  c.fillStyle = '#3a2b1c'; for (let i = 0; i < 9; i++) c.fillRect(0, 300 + i*100, W, 92);
  const lamp = p.dim ? .25 : .5; const g = c.createRadialGradient(540, 760, 30, 540, 820, 700); g.addColorStop(0, `rgba(255,200,130,${lamp})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#1c140c'; c.fillRect(130, 420, 820, 18); c.fillRect(130, 600, 820, 18); // shelves
  const r = R(8); for (let sh = 0; sh < 2; sh++) for (let x = 150; x < 930; x += 30 + r()*10){ const h = 90 + r()*60; c.fillStyle = ['#e6dcc0', '#cfc4a6', '#bdb193'][Math.floor(r()*3)]; c.fillRect(x, 420 + sh*180 - h, 24, h); }
  c.fillStyle = '#20170e'; c.fillRect(150, 1040, 780, 36); c.fillRect(190, 1076, 28, 200); c.fillRect(860, 1076, 28, 200); // table
  // stacks of notebooks on the table
  for (let s = 0; s < 3; s++) for (let k = 0; k < 7; k++){ c.fillStyle = k % 2 ? '#ddd3b8' : '#c8bc9c'; c.fillRect(190 + s*120, 1030 - k*22, 100, 20); }
  unParcel(c, 720, 960, .55, -.03, {glow: p.glowAt !== undefined ? ease((lt - p.glowAt*d)/.3) : 0});
  if (p.big){ const a = ease((lt - (p.bigAt ?? .05)*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.8)'; c.fillRect(190, 420, 700, 190); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 490, 120, 'VT', '#ff3b30'); c.restore(); c.save(); c.globalAlpha = a; text(c, 'PAGES OF JOURNALS', 540, 570, 48, 'VT', '#d7fbe9'); c.restore(); } }
  if (p.label){ const a = ease((lt - (p.labelAt ?? .6)*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; lbl(c, p.label, 560, 800, 54, '#ff3b30'); c.restore(); } }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 720, ease((lt - (p.stampAt ?? .5)*d)/.18), 100, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
