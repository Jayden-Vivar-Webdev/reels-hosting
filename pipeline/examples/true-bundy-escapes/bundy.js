// ===== Ted Bundy's two 1977 escapes (Colorado). True case; drawn props and empty rooms only, no people =====
function tbBars(c, a = 1){ c.save(); c.globalAlpha = a; c.fillStyle = '#15171a'; for (let x = 30; x < W; x += 120) c.fillRect(x, 300, 26, 1000); c.fillRect(0, 330, W, 22); c.fillRect(0, 1250, W, 22); c.restore(); }
function tbCellRoom(c){
  bg(c, '#2a2e33', '#0b0c0e');
  const g = c.createRadialGradient(540, 420, 20, 540, 700, 760); g.addColorStop(0, 'rgba(235,230,205,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#24272b'; c.fillRect(0, 1080, W, 300);                        // floor
  c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 2; for (let y = 420; y < 1080; y += 60){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } // block wall
}
function tbBook(c, x, y, w, h, col){ c.fillStyle = col; c.fillRect(x, y, w, h); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x, y + 6, w, 5); c.fillRect(x, y + h - 11, w, 5); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x + w - 8, y, 8, h); }
function tbBunk(c, lift, lt){
  c.fillStyle = '#3a3f45'; c.fillRect(150, 930, 780, 40); c.fillRect(170, 970, 30, 210); c.fillRect(880, 970, 30, 210);   // steel bunk
  c.fillStyle = '#d9d4c4'; c.fillRect(160, 900, 760, 34);                          // mattress
  c.fillStyle = '#ebe6d8'; c.beginPath(); c.ellipse(250, 880, 85, 34, 0, 0, 7); c.fill();   // pillow
  // books stacked where a body would be
  const cols = ['#6b2a22', '#2b3d5c', '#4d5a2e', '#5e4630', '#2e2e3a', '#7a5a2a'];
  for (let i = 0; i < 6; i++) tbBook(c, 360 + i*90, 820 + (i % 2)*14, 84, 80 - (i % 2)*14, cols[i]);
  tbBook(c, 420, 770, 160, 50, '#3d2b4a'); tbBook(c, 640, 774, 180, 46, '#5c2626');
  // blanket, slides off to the right as lift goes 0 -> 1
  c.save(); c.translate(lift*820, -lift*40); c.rotate(lift*.12);
  c.fillStyle = '#5a6150'; c.beginPath(); c.moveTo(330, 900); c.bezierCurveTo(360, 730, 520, 740, 600, 760); c.bezierCurveTo(700, 735, 840, 750, 900, 800); c.lineTo(925, 940); c.lineTo(320, 945); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 4; for (let k = 0; k < 4; k++){ c.beginPath(); c.moveTo(420 + k*120, 770 + (k%2)*10); c.quadraticCurveTo(450 + k*120, 860, 430 + k*120, 935); c.stroke(); }
  c.fillStyle = '#4b5143'; c.fillRect(320, 925, 605, 22);
  c.restore();
}
SC.tbbed = (c, p, lt, d) => {
  tbCellRoom(c);
  const lift = p.open ? 1 : (p.revealAt != null ? ease((lt - p.revealAt*d)/(.22*d)) : 0);
  tbBunk(c, lift, lt);
  tbBars(c, p.bars === false ? 0 : .9);
  if (p.label) lbl(c, p.label, 540, 690, 62, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.clock){ const a = ease((lt - .2)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.78)'; c.fillRect(220, 470, 640, 170); c.shadowColor = '#ff2a20'; c.shadowBlur = 30; text(c, p.clock, 540, 555, 110, 'VT', '#ff3b30'); c.restore(); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1110, ease((lt - (p.stampAt ?? .6)*d)/.18), 86, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
SC.tbfile = (c, p, lt, d) => { // manila case folder on a desk
  desk(c);
  c.save(); c.translate(540, 800); c.rotate(-.03);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.fillStyle = '#c9a86a'; c.fillRect(-380, -330, 760, 700); c.shadowBlur = 0;
  c.fillStyle = '#b8955a'; c.fillRect(-380, -380, 260, 60);
  c.fillStyle = '#efe7d2'; c.fillRect(-300, -250, 600, 120); text(c, 'CASE FILE', 0, -190, 64, 'Type', '#2a2218');
  c.fillStyle = 'rgba(40,30,20,.55)'; for (let i = 0; i < 4; i++) c.fillRect(-280, -60 + i*44, 420 - i*60, 12);
  c.restore();
  if (p.big){ const a = ease((lt - (p.bigAt ?? .1)*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.8)'; c.fillRect(120, 700, 840, p.big2 ? 330 : 220); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 810, p.bigSize || 150, 'Anton', '#ff3b30'); c.restore();
    if (p.big2){ c.save(); c.globalAlpha = ease((lt - (p.big2At ?? .5)*d)/.3); text(c, p.big2, 540, 960, 66, 'Anton', '#f1efe8'); c.restore(); } }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1130, ease((lt - (p.stampAt ?? .6)*d)/.18), 80, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
function tbShackles(c, x, y, s){
  c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#b9bec4'; c.lineWidth = 14;
  c.beginPath(); c.arc(-110, 0, 52, 0.6, 6.0); c.stroke(); c.beginPath(); c.arc(110, 0, 52, 3.75, 9.15); c.stroke();   // open cuffs
  c.lineWidth = 8; for (let i = 0; i < 6; i++){ c.beginPath(); c.ellipse(-48 + i*19, 20 + Math.sin(i)*6, 12, 7, 0, 0, 7); c.stroke(); }
  c.restore();
}
SC.tblib = (c, p, lt, d) => { // courthouse law library: shelves, reading table, empty shackles
  bg(c, '#2c2218', '#0e0a07');
  const r = R(21); const cols = ['#5b2620', '#2a3a55', '#4a4f2a', '#5a4024', '#3a2c40', '#6a5226'];
  for (let row = 0; row < 5; row++){ c.fillStyle = '#3a2a1a'; c.fillRect(80, 390 + row*120, 920, 14); let x = 96;
    while (x < 980){ const w = 18 + r()*22, h = 80 + r()*24; c.fillStyle = cols[Math.floor(r()*6)]; c.fillRect(x, 390 + row*120 - h, w, h); x += w + 3; } }
  c.fillStyle = '#4a3420'; c.fillRect(60, 980, 960, 46); c.fillStyle = '#2a1d12'; c.fillRect(100, 1026, 40, 240); c.fillRect(940, 1026, 40, 240);   // table
  c.fillStyle = '#e9e1cc'; c.save(); c.translate(380, 960); c.rotate(-.06); c.fillRect(-120, -26, 240, 40); c.restore();   // open law book
  tbShackles(c, 720, 950, .9);
  const g = c.createRadialGradient(540, 300, 20, 540, 700, 800); g.addColorStop(0, 'rgba(255,220,160,.18)'); g.addColorStop(1, 'rgba(0,0,0,.2)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (p.label) lbl(c, p.label, 720, 1110, 56, '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.tbwin = (c, p, lt, d) => { // old brick courthouse, one 2nd-floor window open
  bg(c, '#6f8aa0', '#2b3640');
  c.fillStyle = '#e8eef2'; c.beginPath(); c.moveTo(0, 520); c.lineTo(200, 380); c.lineTo(420, 500); c.lineTo(640, 360); c.lineTo(880, 480); c.lineTo(W, 400); c.lineTo(W, 620); c.lineTo(0, 620); c.fill(); // mountains
  c.fillStyle = '#7a3a28'; c.fillRect(140, 560, 800, 700);
  c.fillStyle = '#5e2c1e'; c.fillRect(120, 540, 840, 40); c.fillRect(120, 880, 840, 22);
  const open = ease((lt - (p.openAt ?? .3)*d)/.3);
  for (let fl = 0; fl < 2; fl++) for (let i = 0; i < 4; i++){ const x = 200 + i*190, y = fl ? 950 : 640;
    c.fillStyle = '#e5dccb'; c.fillRect(x - 10, y - 10, 140, 220); c.fillStyle = '#1c2228'; c.fillRect(x, y, 120, 200);
    if (!fl && i === 2){ c.fillStyle = '#0a0c0e'; c.fillRect(x, y, 120, 200); c.fillStyle = '#d8d2c0'; c.save(); c.translate(x + 120, y); c.transform(1, 0, -.15*open, 1, 0, 0); c.fillRect(-120*(1 - open*.6), 0, 120*(1 - open*.6), 100); c.restore();
      c.fillStyle = 'rgba(240,236,220,.85)'; c.beginPath(); c.moveTo(x + 6, y + 6); c.quadraticCurveTo(x + 30 + Math.sin(lt*3)*14, y + 110, x + 10, y + 196); c.lineTo(x + 6, y + 196); c.fill(); }
    else { c.strokeStyle = '#e5dccb'; c.lineWidth = 6; c.beginPath(); c.moveTo(x + 60, y); c.lineTo(x + 60, y + 200); c.moveTo(x, y + 100); c.lineTo(x + 120, y + 100); c.stroke(); } }
  c.fillStyle = '#3d4a3a'; c.fillRect(0, 1260, W, 140);
  if (p.arrow){ const a = ease((lt - (p.arrowAt ?? .55)*d)/.3); c.save(); c.globalAlpha = a; c.strokeStyle = '#ff3b30'; c.lineWidth = 10; c.setLineDash([24, 16]); c.beginPath(); c.moveTo(640, 850); c.lineTo(640, 1230); c.stroke(); c.setLineDash([]);
    c.fillStyle = '#ff3b30'; c.beginPath(); c.moveTo(605, 1210); c.lineTo(675, 1210); c.lineTo(640, 1260); c.fill(); c.restore();
    lbl(c, '2ND FLOOR', 820, 1080, 56, '#ff3b30', a); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function tbCarRear(c, x, y, s){ // 1970s sedan from behind
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#1b1d21'; c.beginPath(); c.moveTo(-300, 40); c.lineTo(-280, -60); c.lineTo(-190, -70); c.lineTo(-150, -170); c.lineTo(150, -170); c.lineTo(190, -70); c.lineTo(280, -60); c.lineTo(300, 40); c.lineTo(300, 110); c.lineTo(-300, 110); c.closePath(); c.fill();
  c.fillStyle = '#3a4656'; c.beginPath(); c.moveTo(-135, -155); c.lineTo(135, -155); c.lineTo(165, -78); c.lineTo(-165, -78); c.closePath(); c.fill();
  c.fillStyle = '#c01d16'; c.fillRect(-280, -30, 90, 34); c.fillRect(190, -30, 90, 34);
  c.fillStyle = '#e8e2c8'; c.fillRect(-70, 20, 140, 46); c.fillStyle = '#222'; c.fillRect(-55, 34, 110, 18);
  c.fillStyle = '#0a0a0c'; c.fillRect(-270, 100, 90, 50); c.fillRect(180, 100, 90, 50);
  c.restore();
}
SC.tbcar = (c, p, lt, d) => {
  bg(c, '#0c1220', '#05070b');
  c.fillStyle = '#14171c'; c.beginPath(); c.moveTo(440, 640); c.lineTo(640, 640); c.lineTo(1080, 1300); c.lineTo(0, 1300); c.closePath(); c.fill();
  c.strokeStyle = '#d8c060'; c.lineWidth = 8; c.setLineDash([40, 40]); c.lineDashOffset = -lt*60; c.beginPath(); c.moveTo(540, 650); c.lineTo(540, 1300); c.stroke(); c.setLineDash([]);
  const ph = Math.floor(lt*5) % 2; const g = c.createRadialGradient(540, 1250, 40, 540, 1250, 900);
  g.addColorStop(0, ph ? 'rgba(255,40,40,.42)' : 'rgba(40,90,255,.42)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  tbCarRear(c, 540, 930, 1.25);
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 560, ease((lt - (p.stampAt ?? .6)*d)/.18), 92, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.tbceil = (c, p, lt, d) => { // looking up at the cell ceiling: light-fixture panel, then a cut square hole
  bg(c, '#3a3d40', '#1c1e20');
  c.save(); c.translate(540, 820); c.transform(1, 0, 0, .8, 0, 0);
  c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 3; for (let x = -600; x <= 600; x += 150){ c.beginPath(); c.moveTo(x, -700); c.lineTo(x, 700); c.stroke(); } for (let y = -700; y <= 700; y += 150){ c.beginPath(); c.moveTo(-600, y); c.lineTo(600, y); c.stroke(); }
  const k = ease((lt - (p.cutAt ?? .45)*d)/(.3*d));
  c.fillStyle = '#9aa0a6'; c.fillRect(-160, -160, 320, 320);                      // metal plate / fixture
  c.fillStyle = 'rgba(240,240,220,.9)'; c.fillRect(-120, -120, 240, 240);
  if (k > 0){ c.fillStyle = '#050505'; c.fillRect(-150, -150, 300, 300*k); c.strokeStyle = '#c9ced2'; c.lineWidth = 6; c.strokeRect(-150, -150, 300, 300*k); }
  c.restore();
  if (p.measure){ const a = ease((lt - (p.measureAt ?? .75)*d)/.25); c.save(); c.globalAlpha = a; c.strokeStyle = '#ff3b30'; c.lineWidth = 8;
    c.beginPath(); c.moveTo(390, 1100); c.lineTo(690, 1100); c.moveTo(390, 1080); c.lineTo(390, 1120); c.moveTo(690, 1080); c.lineTo(690, 1120); c.stroke(); c.restore();
    lbl(c, '1 FOOT', 540, 1180, 64, '#ff3b30', a); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.tbcrawl = (c, p, lt, d) => { // crawl space of pipes and wiring, torchlight, light from a closet ahead
  bg(c, '#121314', '#050505');
  c.fillStyle = '#1d1e20'; c.beginPath(); c.moveTo(0, 420); c.lineTo(420, 700); c.lineTo(660, 700); c.lineTo(W, 420); c.lineTo(W, 1300); c.lineTo(660, 900); c.lineTo(420, 900); c.lineTo(0, 1300); c.closePath(); c.fill();
  const z = (lt/d)*0.3;
  for (let i = 0; i < 7; i++){ const t = ((i/7 + z) % 1), s = 1 - t*.82, y0 = 800 - 380*s, y1 = 800 + 500*s, x0 = 540 - 540*s, x1 = 540 + 540*s;
    c.strokeStyle = `rgba(120,110,95,${.7*s})`; c.lineWidth = 22*s; c.beginPath(); c.moveTo(x0, y0 + 40*s); c.lineTo(x1, y0 + 40*s); c.stroke();
    c.strokeStyle = `rgba(160,80,50,${.6*s})`; c.lineWidth = 8*s; c.beginPath(); c.moveTo(x0, y0 + 90*s); c.quadraticCurveTo(540, y0 + 140*s, x1, y0 + 90*s); c.stroke(); }
  c.strokeStyle = 'rgba(150,150,140,.6)'; c.lineWidth = 26; c.beginPath(); c.moveTo(0, 560); c.lineTo(420, 735); c.moveTo(W, 560); c.lineTo(660, 735); c.stroke();
  const a = ease((lt - (p.lightAt ?? .4)*d)/.4);
  c.fillStyle = '#0a0a0a'; c.fillRect(470, 700, 140, 200);
  c.fillStyle = `rgba(255,214,150,${.9*a})`; c.fillRect(470, 700, 22, 200);
  const g = c.createRadialGradient(480, 800, 5, 480, 800, 320); g.addColorStop(0, `rgba(255,210,140,${.35*a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (p.label) lbl(c, p.label, 540, 1020, 56, '#ff3b30', ease((lt - (p.labelAt ?? .6)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.tbdoor = (c, p, lt, d) => { // jail building front door at night, standing open, nobody there
  bg(c, '#101622', '#05070b');
  c.fillStyle = '#3c3b38'; c.fillRect(60, 480, 960, 800);
  c.fillStyle = '#2c2b29'; for (let i = 0; i < 3; i++) c.fillRect(160 + i*300, 560, 160, 120);
  c.fillStyle = '#f2d9a0'; c.fillRect(400, 820, 280, 460);
  const o = ease((lt - (p.openAt ?? .35)*d)/.35);
  c.fillStyle = '#4e3826'; c.save(); c.translate(400, 820); c.transform(1 - o*.75, -o*.08, 0, 1, 0, 0); c.fillRect(0, 0, 280, 460); c.fillStyle = '#c9a050'; c.beginPath(); c.arc(240, 240, 12, 0, 7); c.fill(); c.restore();
  c.fillStyle = `rgba(242,217,160,${.25*o})`; c.beginPath(); c.moveTo(400, 1280); c.lineTo(680, 1280); c.lineTo(900, 1400); c.lineTo(200, 1400); c.fill();
  c.fillStyle = '#c9c1aa'; c.fillRect(380, 760, 320, 44); text(c, 'COUNTY JAIL', 540, 783, 34, 'Type', '#2a2218');
  c.fillStyle = 'rgba(255,230,170,.7)'; c.beginPath(); c.arc(540, 730, 14, 0, 7); c.fill();
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 640, ease((lt - (p.stampAt ?? .65)*d)/.18), 100, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function tbPalm(c, x, y, h){ c.strokeStyle = '#0b0f0c'; c.lineWidth = 16; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 30, y - h/2, x + 10, y - h); c.stroke();
  c.lineWidth = 10; for (let i = 0; i < 7; i++){ const a = -Math.PI + i*Math.PI/6; c.beginPath(); c.moveTo(x + 10, y - h); c.quadraticCurveTo(x + 10 + Math.cos(a)*90, y - h - 60, x + 10 + Math.cos(a)*160, y - h + 30 + Math.abs(Math.sin(a))*-20 + 60); c.stroke(); } }
SC.tbhouse = (c, p, lt, d) => { // large two-storey columned house at night, Florida
  bg(c, '#0d1424', '#04060a');
  c.fillStyle = '#0e1410'; c.fillRect(0, 1120, W, 300);
  c.fillStyle = '#c7c1b0'; c.fillRect(180, 640, 720, 480);
  c.fillStyle = '#9b9584'; c.beginPath(); c.moveTo(150, 650); c.lineTo(540, 470); c.lineTo(930, 650); c.closePath(); c.fill();
  c.fillStyle = '#e6e0cf'; for (let i = 0; i < 4; i++) c.fillRect(290 + i*150, 660, 34, 460);
  const r = R(4); for (let fl = 0; fl < 2; fl++) for (let i = 0; i < 5; i++){ c.fillStyle = (fl === 0 && i === 3) ? '#e8c77a' : '#1c2230'; c.fillRect(215 + i*140, 720 + fl*210, 70, 110); }
  c.fillStyle = '#2a1e16'; c.fillRect(495, 960, 90, 160);
  tbPalm(c, 90, 1150, 520); tbPalm(c, 990, 1150, 470);
  if (p.dim){ c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, 0, W, H); }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1210, ease((lt - (p.stampAt ?? .6)*d)/.18), 90, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function lbl(c, s, x, y, size, col, a = 1){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${size}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(x - w/2, y - size*.68, w, size*1.3); text(c, s, x, y, size, 'Anton', col); c.restore(); }
