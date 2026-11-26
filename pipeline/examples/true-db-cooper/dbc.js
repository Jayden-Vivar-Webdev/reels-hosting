// ===== D.B. Cooper hijacking (Northwest Orient Flight 305, 24 Nov 1971). True case; featureless silhouettes only =====
function dbLbl(c, s, x, y, size, col, a=1){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${size}px Anton`; const w = c.measureText(s).width + 40; c.fillStyle = 'rgba(0,0,0,.75)'; c.fillRect(x - w/2, y - size*.7, w, size*1.35); c.restore(); c.save(); c.globalAlpha = a; text(c, s, x, y, size, 'Anton', col); c.restore(); }
function dbNight(c, lt, stars=true){
  bg(c, '#18233a', '#05070d');
  if (stars){ const r = R(9); c.fillStyle = 'rgba(220,230,255,.5)'; for (let i = 0; i < 50; i++){ c.beginPath(); c.arc(r()*W, 200 + r()*600, .8 + r()*1.6, 0, 7); c.fill(); } }
  const r2 = R(21); c.fillStyle = 'rgba(120,135,160,.10)';
  for (let i = 0; i < 7; i++){ const x = ((r2()*W + lt*40*(1 + i*.2)) % (W + 600)) - 300, y = 280 + r2()*700; c.beginPath(); c.ellipse(x, y, 260 + r2()*200, 50 + r2()*40, 0, 0, 7); c.fill(); }
}
function dbRain(c, lt, k=1){ c.save(); c.strokeStyle = 'rgba(180,200,230,.22)'; c.lineWidth = 2; const r = R(33);
  for (let i = 0; i < 140*k; i++){ const x = r()*W*1.2, y0 = r()*H, sp = 900 + r()*500, y = (y0 + lt*sp) % H; c.beginPath(); c.moveTo(x - y*.12, y); c.lineTo(x - y*.12 - 10, y + 38); c.stroke(); } c.restore(); }
function dbForest(c, y0=1060, col='#04070a'){
  c.fillStyle = col; c.fillRect(0, y0 + 40, W, H);
  const r = R(5); for (let x = -40; x < W + 60; x += 38){ const h = 60 + r()*90; c.beginPath(); c.moveTo(x - 30, y0 + 60); c.lineTo(x, y0 + 60 - h); c.lineTo(x + 30, y0 + 60); c.fill(); }
}
// Boeing 727-style airliner, side view, nose to the right. stairs 0..1 lowers the aft airstair under the tail.
function dbPlane(c, x, y, s, o={}){
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot || 0);
  const body = o.col || '#c9cfd6', dark = '#59616b';
  // far wing
  c.fillStyle = dark; c.beginPath(); c.moveTo(40, -10); c.lineTo(-60, -95); c.lineTo(-20, -95); c.lineTo(120, -10); c.fill();
  // aft stairs (drawn behind fuselage belly)
  const st = o.stairs || 0;
  if (st > 0){ c.save(); c.translate(-300, 30); c.rotate(st*1.05); c.fillStyle = '#d9dee4'; c.fillRect(-150, -8, 150, 16);
    c.strokeStyle = '#30363d'; c.lineWidth = 3; for (let k = -140; k < 0; k += 22){ c.beginPath(); c.moveTo(k, -8); c.lineTo(k, 8); c.stroke(); } c.restore();
    c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(-330, 40, 2, -330, 40, 140); g.addColorStop(0, `rgba(255,220,150,${.6*st})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(-480, -100, 300, 300); c.restore(); }
  // fuselage
  c.fillStyle = body; c.beginPath(); c.moveTo(-380, -20); c.lineTo(330, -38); c.quadraticCurveTo(430, -36, 445, 6); c.quadraticCurveTo(430, 38, 330, 38); c.lineTo(-300, 34); c.quadraticCurveTo(-370, 20, -380, -20); c.fill();
  c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.moveTo(-300, 20); c.lineTo(330, 22); c.quadraticCurveTo(420, 26, 440, 10); c.quadraticCurveTo(430, 38, 330, 38); c.lineTo(-300, 34); c.fill();
  // cockpit windows
  c.fillStyle = '#1a2230'; c.beginPath(); c.moveTo(380, -26); c.lineTo(420, -20); c.lineTo(425, -8); c.lineTo(385, -12); c.fill();
  // cabin windows
  for (let k = -250; k < 340; k += 26){ c.fillStyle = o.lights === false ? '#2a313b' : '#ffe9a8'; c.fillRect(k, -18, 11, 13); }
  // T-tail fin + engines
  c.fillStyle = body; c.beginPath(); c.moveTo(-240, -30); c.lineTo(-330, -190); c.lineTo(-385, -190); c.lineTo(-370, -22); c.fill();
  c.beginPath(); c.moveTo(-320, -192); c.lineTo(-410, -200); c.lineTo(-410, -186); c.lineTo(-300, -180); c.fill();
  c.fillStyle = '#9aa2ab'; c.beginPath(); c.roundRect(-345, -52, 120, 34, 16); c.fill(); c.fillStyle = '#20262d'; c.beginPath(); c.ellipse(-225, -35, 8, 15, 0, 0, 7); c.fill();
  c.fillStyle = '#9aa2ab'; c.beginPath(); c.roundRect(-330, -80, 70, 26, 12); c.fill();
  // near wing
  c.fillStyle = '#aab1b9'; c.beginPath(); c.moveTo(40, 12); c.lineTo(-90, 120); c.lineTo(-40, 122); c.lineTo(130, 16); c.fill();
  if (o.gear){ c.fillStyle = '#15191e'; for (const gx of [-40, 340]){ c.fillRect(gx - 3, 36, 6, 34); c.beginPath(); c.arc(gx, 74, 12, 0, 7); c.fill(); } }
  // beacon
  if (Math.sin((o.t || 0)*6) > .3){ c.fillStyle = '#ff3b30'; c.beginPath(); c.arc(-80, -42, 6, 0, 7); c.fill(); }
  c.restore();
}
function dbSilBust(c, x, y, s, tie=true){ // featureless silhouette, shirt and black tie only
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#030405';
  c.beginPath(); c.ellipse(0, -120, 62, 76, 0, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-170, 120); c.quadraticCurveTo(-160, -20, -40, -40); c.lineTo(40, -40); c.quadraticCurveTo(160, -20, 170, 120); c.fill();
  if (tie){ c.fillStyle = '#e8e8e4'; c.beginPath(); c.moveTo(-34, -40); c.lineTo(0, 30); c.lineTo(34, -40); c.fill();
    c.fillStyle = '#0a0a0a'; c.beginPath(); c.moveTo(-9, -36); c.lineTo(9, -36); c.lineTo(14, 22); c.lineTo(0, 40); c.lineTo(-14, 22); c.fill(); }
  c.restore();
}
function dbCabin(c){
  bg(c, '#202a36', '#0a0e14');
  c.fillStyle = '#2b3440'; c.beginPath(); c.moveTo(0, 300); c.lineTo(380, 620); c.lineTo(700, 620); c.lineTo(W, 300); c.lineTo(W, 0); c.lineTo(0, 0); c.fill();
  c.fillStyle = 'rgba(255,240,200,.16)'; c.fillRect(380, 600, 320, 20);
  for (let k = 0; k < 4; k++){ const s = .45 + k*.22, y = 700 + k*120, a = 1; c.fillStyle = `rgba(${20+k*8},${30+k*8},${48+k*8},${a})`;
    for (const sx of [-1, 1]){ const x = 540 + sx*(130 + k*95); c.beginPath(); c.roundRect(x - 90*s, y - 120*s, 180*s, 260*s, 30*s); c.fill(); } }
}
SC.dbnote = (c, p, lt, d) => {
  dbCabin(c);
  dbSilBust(c, 540, 760, .85);
  const a = ease((lt - (p.noteAt ?? .3)*d)/.35);
  if (a > 0){ c.save(); c.globalAlpha = a; c.translate(540, 1170 - 120*a); c.rotate(-.05);
    c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30; c.fillStyle = '#efe9d8'; c.fillRect(-300, -170, 600, 340); c.shadowBlur = 0;
    c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(-300, -4, 600, 6);
    text(c, 'Miss,', -230, -100, 70, 'Hand', '#1d2440', 'left'); text(c, 'I have a', -230, -10, 84, 'Hand', '#1d2440', 'left');
    text(c, 'BOMB', -230, 90, 110, 'Hand', '#b01010', 'left'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbticket = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(-.04); const k = .95 + .05*lt/d; c.scale(k, k);
  paper(c, 0, 0, 820, 500, 0, '#e8dfc6'); c.fillStyle = '#7d1a14'; c.fillRect(-410, -250, 820, 80);
  text(c, 'PASSENGER TICKET', 0, -210, 50, 'Anton', '#f1e6cc');
  const rows = [['NAME', 'DAN COOPER', .1, '#a01010'], ['FROM', 'PORTLAND', .35, '#222'], ['TO', 'SEATTLE', .45, '#222'], ['FLIGHT', '305', .6, '#a01010']];
  rows.forEach(([l, v, at, col], i) => { const s = ease((lt - at*d)/.2), y = -100 + i*85; c.globalAlpha = s; text(c, l, -360, y, 38, 'Type', '#555', 'left'); text(c, v, 360, y, 58, 'Anton', col, 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(-360, y + 36, 720, 2); });
  c.setLineDash([12, 10]); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(250, -170); c.lineTo(250, -150); c.stroke(); c.setLineDash([]);
  c.restore();
  dbLbl(c, 'ONE WAY · PAID CASH', 540, 1150, 54, '#ffd84a', ease((lt - .7*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbcase = (c, p, lt, d) => {
  desk(c);
  const op = ease((lt - .15*d)/.35);
  c.save(); c.translate(540, 820); const k = .95 + .06*lt/d; c.scale(k, k);
  // base
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30; c.fillStyle = '#3a2618'; c.beginPath(); c.roundRect(-380, -40, 760, 340, 24); c.fill(); c.shadowBlur = 0;
  c.fillStyle = '#20150d'; c.beginPath(); c.roundRect(-350, -20, 700, 300, 16); c.fill();
  // red sticks + wires
  if (op > 0){ c.globalAlpha = op;
    for (let i = 0; i < 8; i++){ const x = -300 + i*62; c.fillStyle = '#c41e1a'; c.beginPath(); c.roundRect(x, 20, 46, 220, 10); c.fill(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x + 8, 28, 8, 200); }
    c.fillStyle = '#1b1b1b'; c.fillRect(220, 60, 110, 150); c.fillStyle = '#c9a23a'; c.fillRect(250, 45, 50, 16); text(c, '+', 275, 100, 40, 'Anton', '#c9a23a');
    const cols = ['#e0b63a', '#3a7be0', '#e05a3a', '#cfcfcf']; c.lineWidth = 7;
    cols.forEach((col, j) => { c.strokeStyle = col; c.beginPath(); c.moveTo(-280 + j*120, 30); c.bezierCurveTo(-200 + j*90, -60 - j*20, 150, -50 + j*20, 260, 70 + j*30); c.stroke(); });
    c.globalAlpha = 1; }
  // lid
  c.save(); c.translate(0, -40); c.scale(1, 1 - .8*op); c.fillStyle = '#4a3020'; c.beginPath(); c.roundRect(-380, -300, 760, 300, 24); c.fill(); c.restore();
  c.fillStyle = '#b08a3a'; c.fillRect(-60, -60 - 0*op, 120, 26);
  c.restore();
  dbLbl(c, 'RED STICKS · WIRES', 540, 1180, 56, '#ff3b30', ease((lt - .6*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function dbChute(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#5b6a3a'; c.beginPath(); c.roundRect(-60, -80, 120, 160, 18); c.fill();
  c.strokeStyle = '#2a3018'; c.lineWidth = 6; c.beginPath(); c.moveTo(-40, -80); c.lineTo(-40, -120); c.moveTo(40, -80); c.lineTo(40, -120); c.stroke();
  c.fillStyle = '#c9c2a8'; c.fillRect(-30, -10, 60, 20); c.restore(); }
function dbCash(c, x, y, s, rot=0, rot2=false){ c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = rot2 ? '#56664a' : '#7f9a6a'; c.fillRect(-110, -50, 220, 100);
  c.strokeStyle = rot2 ? '#33402a' : '#3e5232'; c.lineWidth = 5; c.strokeRect(-96, -38, 192, 76); c.fillStyle = rot2 ? '#a89a72' : '#e9dfb8'; c.fillRect(-16, -50, 32, 100);
  text(c, '20', -70, -14, 30, 'Anton', rot2 ? '#33402a' : '#2e3e24'); c.restore(); }
SC.dbdemands = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 700); c.rotate(-.02); paper(c, 0, 0, 800, 540, 0, '#ece6d6');
  text(c, 'HIS DEMANDS', 0, -200, 56, 'Type', '#111'); c.fillStyle = '#111'; c.fillRect(-330, -160, 660, 4);
  const a1 = ease((lt - .1*d)/.25), a2 = ease((lt - .5*d)/.25);
  c.globalAlpha = a1; text(c, '$200,000', 0, -50, 140, 'Anton', '#a01010'); c.globalAlpha = a2; text(c, '4 PARACHUTES', 0, 130, 100, 'Anton', '#a01010'); c.globalAlpha = 1;
  c.restore();
  for (let i = 0; i < 4; i++){ const a = ease((lt - (.55 + i*.06)*d)/.2); if (a > 0){ c.save(); c.globalAlpha = a; dbChute(c, 250 + i*195, 1130, .85); c.restore(); } }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbtarmac = (c, p, lt, d) => {
  dbNight(c, lt, false);
  c.fillStyle = '#0d1117'; c.fillRect(0, 900, W, H);
  c.fillStyle = '#1a2029'; c.beginPath(); c.moveTo(0, 1250); c.lineTo(W, 1050); c.lineTo(W, 980); c.lineTo(0, 1120); c.fill();
  for (let i = 0; i < 9; i++){ c.fillStyle = i % 2 ? '#ffd27a' : '#7ab8ff'; c.beginPath(); c.arc(40 + i*130, 1180 - i*20, 6, 0, 7); c.fill(); }
  dbPlane(c, 560, 840, 1.05, {gear: true, t: lt});
  // passengers walking off (tiny silhouettes, no faces)
  for (let i = 0; i < 9; i++){ const a = ease((lt - (.1 + i*.05)*d)/.2); if (a <= 0) continue; const x = 280 + i*70 + 120*ease((lt - (.1 + i*.05)*d)/(d*.7)), y = 1010 + (i % 2)*16; c.save(); c.globalAlpha = a; c.fillStyle = '#020304';
    c.beginPath(); c.arc(x, y - 52, 11, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 13, y - 40, 26, 46, 7); c.fill(); c.fillRect(x - 10, y + 4, 7, 24); c.fillRect(x + 3, y + 4, 7, 24); c.restore(); }
  const b = ease((lt - .55*d)/.25); if (b > 0){ c.save(); c.globalAlpha = b; dbCash(c, 300, 1150, .8, -.08); dbChute(c, 480, 1150, .6); dbChute(c, 580, 1155, .6); c.restore(); }
  dbLbl(c, 'PASSENGERS ⇄ CASH + CHUTES', 540, 560, 52, '#ffd84a', ease((lt - .45*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbsky = (c, p, lt, d) => {
  dbNight(c, lt); dbForest(c, 1120);
  const k = p.follow ? .3 : ease(lt/d);
  dbPlane(c, 300 + 420*k, 900 - 200*k, .9, {rot: -.12, t: lt});
  dbRain(c, lt, .7);
  if (p.follow) followBox(c, lt, d);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbstairs = (c, p, lt, d) => {
  dbNight(c, lt); dbForest(c, 1100, '#020406');
  const st = ease((lt - (p.at ?? .6)*d)/.5);
  dbPlane(c, 590, 760, 1.0, {stairs: st, t: lt});
  dbRain(c, lt, 1);
  if (st > .3){ c.save(); c.strokeStyle = `rgba(255,50,40,${.6 + .4*Math.sin(lt*8)})`; c.lineWidth = 7; c.beginPath(); c.arc(590 - 300 - 70, 760 + 95, 120, 0, 7); c.stroke(); c.restore(); dbLbl(c, 'REAR STAIRS', 260, 1030, 54, '#ff3b30', st); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbjump = (c, p, lt, d) => {
  dbNight(c, lt); dbForest(c, 1120, '#010203');
  dbPlane(c, 760 + 160*(lt/d), 520, .75, {stairs: 1, t: lt});
  const f = ease((lt - .08*d)/(d*.75)); const x = 500 - 60*f, y = 600 + 380*f;
  c.save(); c.globalAlpha = 1 - ease((lt - .8*d)/.3); c.translate(x, y); c.scale(1.7, 1.7); c.rotate(.5 + f*1.2); c.shadowColor = 'rgba(255,220,160,.9)'; c.shadowBlur = 14; c.fillStyle = '#000';
  c.beginPath(); c.arc(0, -34, 11, 0, 7); c.fill(); c.beginPath(); c.roundRect(-12, -22, 24, 44, 6); c.fill(); c.fillRect(-10, 20, 7, 26); c.fillRect(3, 20, 7, 30);
  c.fillRect(-30, -16, 20, 6); c.fillStyle = '#1a1f12'; c.fillRect(12, -6, 22, 26); c.restore();
  dbRain(c, lt, 1.3);
  stamp(c, p.stampTxt || 'JUMPED', 540, 1180, ease((lt - (p.stampAt ?? .12)*d)/.18), 100, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbriver = (c, p, lt, d) => {
  bg(c, '#5d6a72', '#2a3236');
  const g = c.createLinearGradient(0, 520, 0, 800); g.addColorStop(0, '#3e5560'); g.addColorStop(1, '#2a3c45'); c.fillStyle = g; c.fillRect(0, 520, W, 300);
  c.strokeStyle = 'rgba(220,235,240,.25)'; c.lineWidth = 3; for (let kk = 0; kk < 6; kk++){ const y = 560 + kk*42; c.beginPath(); for (let x = 0; x <= W; x += 20) c.lineTo(x, y + 6*Math.sin(x*.02 + lt*1.4 + kk)); c.stroke(); }
  c.fillStyle = '#1d2a22'; c.fillRect(0, 440, W, 90); const r = R(8); for (let x = 0; x < W; x += 30){ c.beginPath(); c.moveTo(x - 24, 470); c.lineTo(x, 400 - r()*50); c.lineTo(x + 24, 470); c.fill(); }
  const sg = c.createLinearGradient(0, 800, 0, 1400); sg.addColorStop(0, '#a3927a'); sg.addColorStop(1, '#6b5c49'); c.fillStyle = sg; c.beginPath(); c.moveTo(0, 820); c.quadraticCurveTo(540, 780, W, 830); c.lineTo(W, H); c.lineTo(0, H); c.fill();
  const z = .9 + .2*ease(lt/d);
  c.save(); c.translate(540, 1030); c.scale(z, z);
  [[-200, -20, -.15], [30, 30, .08], [230, -30, -.05]].forEach(([x, y, rot], i) => { const a = ease((lt - (.15 + i*.1)*d)/.25); if (a <= 0) return; c.save(); c.globalAlpha = a; dbCash(c, x, y, 1, rot, true); c.restore();
    c.fillStyle = 'rgba(140,120,95,.9)'; c.beginPath(); c.ellipse(x, y + 40, 130, 26, rot, 0, Math.PI); c.fill(); });
  c.restore();
  dbLbl(c, 'RANSOM CASH · BURIED IN SAND', 540, 1200, 50, '#ffd84a', ease((lt - .55*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbserial = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 640); c.rotate(-.04); const z = 1.6 + .1*lt/d; c.scale(z, z); dbCash(c, 0, 0, 1.5, 0, true);
  c.restore();
  c.save(); c.translate(540, 640); c.rotate(-.04); c.fillStyle = 'rgba(0,0,0,.7)'; c.fillRect(-300, 110, 600, 70); text(c, 'SERIAL Nº  ▮▮▮▮▮▮▮▮', 0, 146, 48, 'VT', '#e9dfb8'); c.restore();
  paper(c, 540, 1050, 760, 220, .02, '#ece6d6');
  text(c, 'FBI RANSOM SERIAL LIST', 540, 980, 40, 'Type', '#222');
  const hi = ease((lt - .3*d)/.2); c.fillStyle = `rgba(255,220,60,${.6*hi})`; c.fillRect(200, 1035, 680, 50);
  text(c, '▮▮▮▮▮▮▮▮  ✓', 540, 1062, 46, 'VT', '#222');
  stamp(c, 'MATCH', 540, 640, ease((lt - (p.stampAt ?? .45)*d)/.18), 130, -.12);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbwanted = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 790); c.rotate(-.025); const k = .88 + .04*lt/d; c.scale(k, k);
  paper(c, 0, 0, 700, 860, 0, '#e6dcc2');
  text(c, 'UNKNOWN SUBJECT', 0, -360, 64, 'Anton', '#111'); text(c, 'ALIAS: "DAN COOPER"', 0, -290, 40, 'Type', '#333');
  c.fillStyle = '#cfc4a8'; c.fillRect(-230, -240, 460, 460);
  c.save(); c.beginPath(); c.rect(-230, -240, 460, 460); c.clip(); dbSilBust(c, 0, 120, 1.25); c.restore();
  const q = ease((lt - .2*d)/.3); c.globalAlpha = q; text(c, '?', 0, -50, 220, 'Anton', '#c41e1a'); c.globalAlpha = 1;
  text(c, 'IDENTITY: UNKNOWN', 0, 300, 52, 'Anton', '#a01010');
  c.restore();
  stamp(c, p.stampTxt || 'NEVER FOUND', 540, 1150, ease((lt - (p.stampAt ?? .55)*d)/.18), 92, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dbfile = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 810); c.rotate(.03); const k = .86 + .04*lt/d; c.scale(k, k);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.fillStyle = '#c9a86a'; c.fillRect(-360, -380, 720, 800); c.fillRect(-360, -430, 260, 60); c.shadowBlur = 0;
  c.fillStyle = '#efe7d2'; c.fillRect(-280, -300, 560, 120); text(c, 'CASE: NORJAK', 0, -240, 70, 'Type', '#2a2218');
  text(c, 'HIJACKING · FLIGHT 305', 0, -110, 46, 'Type', '#2a2218'); text(c, 'NOV 24, 1971', 0, -40, 46, 'Type', '#2a2218');
  const a = ease((lt - .25*d)/.25); c.globalAlpha = a; text(c, 'ACTIVE INVESTIGATION', 0, 110, 50, 'Type', '#2a2218'); text(c, 'ENDED · JULY 2016', 0, 180, 50, 'Type', '#a01010'); c.globalAlpha = 1;
  c.restore();
  stamp(c, p.stampTxt || 'UNSOLVED', 540, 1130, ease((lt - (p.stampAt ?? .6)*d)/.18), 110, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
