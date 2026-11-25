function lbl(c, s, x, y, size, col){ c.save(); c.font = `${size}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(x - w/2, y - size*.68, w, size*1.3); c.restore(); text(c, s, x, y, size, 'Anton', col); }
// ===== Flannan Isles lighthouse keepers (Eilean Mor, Scotland, Dec 1900). True case; featureless silhouettes only =====
function flSky(c, mood){ // mood: 'night' | 'grey'
  if (mood === 'grey') bg(c, '#6f7c86', '#2c353c'); else bg(c, '#1d2a40', '#070b12');
  if (mood !== 'grey'){ const r = R(4); c.fillStyle = 'rgba(220,230,255,.55)'; for (let i = 0; i < 60; i++){ c.beginPath(); c.arc(r()*W, 240 + r()*420, .8 + r()*1.8, 0, 7); c.fill(); } }
}
function flSea(c, lt, mood, y0 = 1010){
  const g = c.createLinearGradient(0, y0, 0, 1400); g.addColorStop(0, mood === 'grey' ? '#3d4a52' : '#16233a'); g.addColorStop(1, mood === 'grey' ? '#1b2328' : '#060a12');
  c.fillStyle = g; c.fillRect(0, y0, W, H - y0);
  c.strokeStyle = mood === 'grey' ? 'rgba(210,225,230,.35)' : 'rgba(150,180,220,.28)'; c.lineWidth = 3;
  for (let k = 0; k < 9; k++){ const y = y0 + 20 + k*38; c.beginPath(); for (let x = 0; x <= W; x += 20) c.lineTo(x, y + 7*Math.sin(x*.02 + lt*1.6 + k*1.3)); c.stroke(); }
}
function flIsland(c, lit, lt, beamOn, mood){
  // rock with cliffs
  c.fillStyle = mood === 'grey' ? '#2f2f2c' : '#141a1f';
  c.beginPath(); c.moveTo(130, 1030); c.lineTo(190, 860); c.lineTo(300, 800); c.lineTo(450, 770); c.lineTo(640, 760); c.lineTo(790, 790); c.lineTo(900, 850); c.lineTo(960, 1030); c.closePath(); c.fill();
  c.fillStyle = mood === 'grey' ? '#4b5a3c' : '#1c2a22'; c.beginPath(); c.moveTo(300, 800); c.lineTo(450, 770); c.lineTo(640, 760); c.lineTo(790, 790); c.lineTo(760, 805); c.lineTo(320, 815); c.closePath(); c.fill();
  // compound wall + keepers' house
  c.fillStyle = mood === 'grey' ? '#cfcbc0' : '#56606a'; c.fillRect(470, 700, 200, 70); c.fillStyle = mood === 'grey' ? '#8f8a80' : '#363d45'; c.fillRect(430, 745, 290, 25);
  // tower
  c.fillStyle = mood === 'grey' ? '#e6e2d8' : '#8b949c'; c.beginPath(); c.moveTo(560, 520); c.lineTo(610, 520); c.lineTo(622, 705); c.lineTo(548, 705); c.closePath(); c.fill();
  c.fillStyle = '#1b1f24'; c.fillRect(550, 505, 70, 18); c.fillRect(556, 455, 58, 50); c.beginPath(); c.moveTo(552, 455); c.lineTo(585, 425); c.lineTo(618, 455); c.fill();
  if (lit){ c.fillStyle = '#fff2b0'; c.fillRect(562, 462, 46, 38);
    const ang = beamOn ? lt*1.4 : 0; if (beamOn){ c.save(); c.translate(585, 480); c.globalCompositeOperation = 'lighter';
      for (const s of [1, -1]){ const a = ang + (s > 0 ? 0 : Math.PI); const g = c.createRadialGradient(0, 0, 10, 0, 0, 900); g.addColorStop(0, 'rgba(255,240,180,.55)'); g.addColorStop(1, 'rgba(255,240,180,0)'); c.fillStyle = g;
        c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 900, a - .1, a + .1); c.closePath(); c.fill(); }
      c.restore(); }
    const gl = c.createRadialGradient(585, 480, 4, 585, 480, 120); gl.addColorStop(0, 'rgba(255,240,170,.6)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gl; c.fillRect(440, 340, 300, 300);
  } else { c.fillStyle = '#20262c'; c.fillRect(562, 462, 46, 38); }
  // empty flagstaff
  c.strokeStyle = '#111'; c.lineWidth = 6; c.beginPath(); c.moveTo(720, 760); c.lineTo(720, 610); c.stroke();
}
function flShip(c, x, y, s, lightOn){
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#0b0d10';
  c.beginPath(); c.moveTo(-170, 0); c.lineTo(170, 0); c.lineTo(140, 44); c.lineTo(-150, 44); c.closePath(); c.fill();
  c.fillRect(-80, -50, 140, 50); c.fillRect(-10, -120, 34, 70);
  if (lightOn){ c.fillStyle = '#ffd98a'; for (let i = 0; i < 4; i++) c.fillRect(-66 + i*32, -36, 14, 12); }
  c.restore();
}
SC.flisle = (c, p, lt, d) => {
  const mood = p.grey ? 'grey' : 'night';
  flSky(c, mood);
  const off = p.offAt !== undefined && lt > p.offAt*d;
  flIsland(c, p.lit && !off, lt, p.lit && !off, mood);
  flSea(c, lt, mood);
  if (p.ship) flShip(c, 120 + 300*(lt/d), 1060, .9, true);
  if (p.boat){ const k = ease(lt/(d*.8)); flShip(c, 980 - 260*k, 1080, .7, false); }
  if (p.noflag){ const a = ease((lt - p.noflag*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; c.strokeStyle = '#e0261c'; c.lineWidth = 8; c.beginPath(); c.arc(720, 640, 70, 0, 7); c.stroke(); c.restore(); lbl(c, 'NO FLAG', 720, 545, 52, '#ff3b30'); } }
  if (p.trio){ const a = ease((lt - (p.trioAt||0)*d)/.4); for (let i = 0; i < 3; i++){ const fade = p.trioFade ? 1 - ease((lt - (p.trioFade + i*.08)*d)/.35) : 1; c.save(); c.globalAlpha = a*fade; c.fillStyle = '#05070a';
      const x = 440 + i*70; c.beginPath(); c.arc(x, 730, 13, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 15, 744, 30, 52, 8); c.fill(); c.restore(); } }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1180, ease((lt - (p.stampAt ?? .5)*d)/.18), 96, -.1);
  if (p.qs){ const a = ease((lt - .3*d)/.4); c.globalAlpha = a; text(c, '?', 380, 640, 130, 'Anton', '#ff3b30'); text(c, '?', 780, 600, 100, 'Anton', '#ff3b30'); c.globalAlpha = 1; }
  if (p.follow) followBox(c, lt, d);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function flKeeperBack(c, x, y, s){ // silhouette seen from behind, no face
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#07090b';
  c.beginPath(); c.arc(0, -210, 34, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-60, -170); c.lineTo(60, -170); c.lineTo(70, -20); c.lineTo(-70, -20); c.closePath(); c.fill();
  c.fillRect(-48, -22, 38, 150); c.fillRect(10, -22, 38, 150);
  c.fillStyle = '#0b0d10'; c.beginPath(); c.ellipse(0, -238, 44, 10, 0, 0, 7); c.fill(); c.fillRect(-28, -268, 56, 30); // cap
  c.restore();
}
SC.flgate = (c, p, lt, d) => {
  flSky(c, 'grey');
  // stone wall with gate, house door behind
  c.fillStyle = '#b8b2a4'; c.fillRect(0, 560, W, 560);
  c.strokeStyle = 'rgba(60,55,48,.35)'; c.lineWidth = 3; for (let y = 600; y < 1120; y += 60){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); for (let x = (y/60 % 2) * 60; x < W; x += 120){ c.beginPath(); c.moveTo(x, y - 60); c.lineTo(x, y); c.stroke(); } }
  // house front
  c.fillStyle = '#e4dfd2'; c.fillRect(300, 380, 480, 330); c.fillStyle = '#5b5148'; c.beginPath(); c.moveTo(280, 385); c.lineTo(540, 300); c.lineTo(800, 385); c.fill();
  c.fillStyle = '#20262c'; c.fillRect(350, 450, 90, 90); c.fillRect(640, 450, 90, 90);
  const doorA = ease((lt - (p.doorAt ?? .55)*d)/.25);
  c.fillStyle = '#3a2418'; c.fillRect(495, 520, 90, 190); c.fillStyle = '#c9a24a'; c.beginPath(); c.arc(570, 615, 6, 0, 7); c.fill();
  // gate (iron bars) in the wall
  c.fillStyle = '#2a2d30'; c.fillRect(420, 700, 240, 16); c.fillRect(420, 1040, 240, 16);
  for (let x = 430; x <= 650; x += 28) c.fillRect(x, 700, 9, 356);
  c.fillStyle = '#6a6458'; c.fillRect(395, 680, 28, 400); c.fillRect(657, 680, 28, 400);
  // path + keeper walking up (from behind)
  c.fillStyle = '#3c3a34'; c.beginPath(); c.moveTo(470, 1120); c.lineTo(610, 1120); c.lineTo(700, 1400); c.lineTo(380, 1400); c.fill();
  const k = ease(lt/(d*.6)); flKeeperBack(c, 540, 1300 - 120*k, 1.25 - .3*k);
  const ga = ease((lt - (p.gateAt ?? .3)*d)/.25);
  if (ga > 0){ c.save(); c.globalAlpha = ga; c.strokeStyle = '#e0261c'; c.lineWidth = 8; c.strokeRect(410, 690, 260, 380); c.restore(); lbl(c, 'GATE: SHUT', 250, 760, 46, '#ff3b30'); }
  if (doorA > 0){ c.save(); c.globalAlpha = doorA; c.strokeStyle = '#e0261c'; c.lineWidth = 8; c.strokeRect(485, 510, 110, 210); c.restore(); lbl(c, 'DOOR: SHUT', 830, 640, 46, '#ff3b30'); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function flRoomBase(c){
  bg(c, '#3a3530', '#14110e');
  c.fillStyle = '#2a241f'; c.fillRect(0, 1060, W, 400); // floor
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let x = 0; x < W; x += 90){ c.beginPath(); c.moveTo(x, 1060); c.lineTo(x - 60, 1400); c.stroke(); }
  // window with grey sea light
  c.fillStyle = '#7f8e98'; c.fillRect(420, 400, 240, 280); c.fillStyle = '#22282c'; c.fillRect(535, 400, 10, 280); c.fillRect(420, 535, 240, 10);
  const g = c.createRadialGradient(540, 540, 20, 540, 600, 700); g.addColorStop(0, 'rgba(180,200,210,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
}
function flBed(c, x, y, s){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#4a3326'; c.fillRect(-150, -120, 22, 210); c.fillRect(128, -60, 22, 150);
  c.fillStyle = '#d9d3c4'; c.fillRect(-130, -30, 260, 60); // mattress
  c.fillStyle = '#e9e5da'; c.beginPath(); c.roundRect(-120, -62, 90, 36, 12); c.fill(); // pillow
  c.fillStyle = '#6b6f5e'; c.beginPath(); c.moveTo(-40, -30); c.lineTo(130, -30); c.lineTo(130, 30); c.lineTo(-30, 30); c.closePath(); c.fill(); // folded blanket
  c.fillStyle = '#4a3326'; c.fillRect(-140, 30, 280, 18);
  c.restore();
}
SC.flbeds = (c, p, lt, d) => {
  flRoomBase(c);
  flBed(c, 220, 920, 1.1); flBed(c, 540, 1000, 1.25); flBed(c, 860, 920, 1.1);
  const a = ease((lt - (p.markAt ?? .5)*d)/.3);
  if (a > 0){ c.globalAlpha = a; text(c, 'EMPTY', 220, 790, 50, 'Anton', '#ff3b30'); text(c, 'EMPTY', 540, 855, 50, 'Anton', '#ff3b30'); text(c, 'EMPTY', 860, 790, 50, 'Anton', '#ff3b30'); c.globalAlpha = 1; }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function flCoat(c, x, y, s){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#2c3a4a'; // dark wool coat
  c.beginPath(); c.moveTo(-20, 0); c.quadraticCurveTo(-90, 20, -110, 90); c.lineTo(-120, 460); c.lineTo(120, 460); c.lineTo(110, 90); c.quadraticCurveTo(90, 20, 20, 0); c.closePath(); c.fill();
  c.fillStyle = '#1e2834'; c.beginPath(); c.moveTo(-20, 0); c.lineTo(0, 140); c.lineTo(20, 0); c.fill(); // collar v
  c.fillStyle = '#c9b27a'; for (let i = 0; i < 4; i++){ c.beginPath(); c.arc(0, 180 + i*70, 8, 0, 7); c.fill(); }
  c.strokeStyle = '#151c25'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 140); c.lineTo(0, 460); c.stroke();
  c.fillStyle = '#1e2834'; c.fillRect(-120, 300, 80, 12); c.fillRect(40, 300, 80, 12); // pockets
  c.restore();
}
SC.flpegs = (c, p, lt, d) => {
  flRoomBase(c);
  if (p.storm){ c.fillStyle = '#2b3440'; c.fillRect(420, 400, 240, 280); c.fillStyle = '#22282c'; c.fillRect(535, 400, 10, 280); c.fillRect(420, 535, 240, 10);
    const r = R(3); c.strokeStyle = 'rgba(220,230,240,.7)'; c.lineWidth = 2; for (let i = 0; i < 40; i++){ const x = 425 + ((r()*230 + lt*240) % 230), y = 405 + ((r()*270 + lt*420) % 270); c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 16); c.stroke(); } }
  const k = p.zoom ? 1 + .3*ease(lt/d) : 1; c.save(); c.translate(620, 900); c.scale(k, k); c.translate(-620, -900);
  // peg rail
  c.fillStyle = '#5a3d2a'; c.fillRect(140, 700, 800, 34);
  const pegs = [250, 470, 700];
  pegs.forEach((x, i) => { c.fillStyle = '#2a1c12'; c.beginPath(); c.arc(x, 717, 12, 0, 7); c.fill(); c.fillRect(x - 6, 717, 12, 30); });
  // two empty pegs with dashed outlines of missing oilskins
  const gone = ease((lt - (p.goneAt ?? .1)*d)/.3);
  [0, 1].forEach(i => { const x = pegs[i]; c.save(); c.globalAlpha = .4 + .6*gone; c.setLineDash([16, 12]); c.strokeStyle = '#e8c93a'; c.lineWidth = 5;
    c.beginPath(); c.moveTo(x - 20, 745); c.quadraticCurveTo(x - 90, 765, x - 110, 835); c.lineTo(x - 120, 1200); c.lineTo(x + 120, 1200); c.lineTo(x + 110, 835); c.quadraticCurveTo(x + 90, 765, x + 20, 745); c.closePath(); c.stroke(); c.restore();
    if (gone > 0){ c.globalAlpha = gone; text(c, 'GONE', x, 980, 60, 'Anton', '#e8c93a'); c.globalAlpha = 1; } });
  flCoat(c, pegs[2], 745, 1);
  const ca = ease((lt - (p.coatAt ?? .6)*d)/.3);
  if (ca > 0){ c.save(); c.globalAlpha = ca; c.strokeStyle = '#e0261c'; c.lineWidth = 9; c.beginPath(); c.ellipse(700, 970, 165, 285, 0, 0, 7); c.stroke(); c.restore(); }
  c.restore();
  if (p.label){ const a = ease((lt - (p.labelAt ?? .5)*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.7)'; c.fillRect(150, 1160, 780, 110); text(c, p.label, 540, 1218, 66, 'Anton', '#ff3b30'); c.restore(); } }
  if (p.qs){ const a = ease((lt - .45*d)/.3); c.globalAlpha = a; text(c, '?', 880, 620, 200, 'Anton', '#ff3b30'); c.globalAlpha = 1; }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.fllanding = (c, p, lt, d) => {
  flSky(c, 'grey');
  // cliff face on the left, sea below
  flSea(c, lt, 'grey', 1060);
  c.fillStyle = '#34322e'; c.beginPath(); c.moveTo(0, 420); c.lineTo(560, 470); c.lineTo(640, 600); c.lineTo(600, 1100); c.lineTo(0, 1100); c.closePath(); c.fill();
  c.fillStyle = '#4a4740'; c.fillRect(0, 560, 600, 40); // landing platform
  // railings along the platform (twisted after .tw)
  const tw = ease((lt - (p.at?.[0] ?? .05)*d)/.3);
  c.strokeStyle = '#1a1c1e'; c.lineWidth = 7; c.beginPath(); c.moveTo(60, 500); c.lineTo(280, 500);
  c.quadraticCurveTo(330 + 0*tw, 500 - 0*tw, 360, 500 + 10*tw); c.lineTo(380 + 30*tw, 530 + 40*tw); c.lineTo(480 + 40*tw, 470 + 90*tw); c.lineTo(580, 520 + 60*tw); c.stroke();
  for (let x = 80; x <= 560; x += 80){ const bend = x > 300 ? tw : 0; c.beginPath(); c.moveTo(x, 560); c.lineTo(x + 40*bend, 500 + 30*bend); c.stroke(); }
  if (tw > 0){ c.globalAlpha = tw; lbl(c, 'RAILINGS TWISTED', 300, 440, 48, '#ff3b30'); c.globalAlpha = 1; }
  // the stone block (moves into the path)
  const sa = ease((lt - (p.at?.[1] ?? .3)*d)/.35);
  const sx = 130 + 140*sa, sy = 660;
  c.fillStyle = '#6d6a62'; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + 170, sy - 15); c.lineTo(sx + 190, sy + 120); c.lineTo(sx - 10, sy + 130); c.closePath(); c.fill();
  c.strokeStyle = '#3a3833'; c.lineWidth = 4; c.stroke();
  if (sa > 0){ c.globalAlpha = sa; c.setLineDash([12, 10]); c.strokeStyle = '#e8c93a'; c.lineWidth = 4; c.strokeRect(120, 645, 190, 140); c.setLineDash([]); lbl(c, '1 TON STONE · MOVED', 330, 850, 46, '#ff3b30'); c.globalAlpha = 1; }
  // life buoy: hangs, then gone (rope snapped)
  const ba = ease((lt - (p.at?.[2] ?? .6)*d)/.25);
  c.strokeStyle = '#8a7a5a'; c.lineWidth = 4; c.beginPath(); c.moveTo(520, 520); c.lineTo(520, 560 - 0*ba); c.stroke();
  if (ba < 1){ c.save(); c.globalAlpha = 1 - ba; c.translate(520 + 200*ba, 600 + 300*ba); c.strokeStyle = '#e8e2d2'; c.lineWidth = 22; c.beginPath(); c.arc(0, 0, 44, 0, 7); c.stroke(); c.strokeStyle = '#c4261c'; c.setLineDash([24, 24]); c.beginPath(); c.arc(0, 0, 44, 0, 7); c.stroke(); c.restore(); }
  if (ba > 0){ c.save(); c.globalAlpha = ba; c.strokeStyle = '#e0261c'; c.lineWidth = 6; c.beginPath(); c.arc(520, 600, 60, 0, 7); c.stroke();
    // height marker
    c.strokeStyle = '#ffd84a'; c.lineWidth = 6; c.beginPath(); c.moveTo(760, 560); c.lineTo(760, 1060); c.stroke(); c.beginPath(); c.moveTo(735, 585); c.lineTo(760, 555); c.lineTo(785, 585); c.moveTo(735, 1035); c.lineTo(760, 1065); c.lineTo(785, 1035); c.stroke();
    c.setLineDash([10, 10]); c.beginPath(); c.moveTo(600, 560); c.lineTo(760, 560); c.stroke(); c.setLineDash([]);
    text(c, '110 FT', 870, 800, 84, 'Anton', '#ffd84a'); lbl(c, 'LIFE BUOY TORN AWAY', 330, 960, 46, '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.flreport = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 770); c.rotate(-.02); const k = .96 + .05*lt/d; c.scale(k, k);
  paper(c, 0, 0, 800, 860, 0, '#ece6d6');
  text(c, "SUPERINTENDENT'S REPORT", 0, -350, 50, 'Type', '#111'); text(c, 'FLANNAN ISLES · 8 JAN 1901', 0, -292, 32, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-340, -262, 680, 4);
  (p.rows || []).forEach(([a, b, at], i) => { const y = -170 + i*120, s = ease((lt - at*d)/.25);
    c.globalAlpha = s; text(c, a, -330, y, 40, 'Type', '#222', 'left'); text(c, b, 330, y, 50, 'Anton', '#a01010', 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-330, y + 40, 660, 2); });
  c.restore();
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1110, ease((lt - (p.stampAt ?? .6)*d)/.18), 80, -.1);
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.fllog = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 770); c.rotate(-.02); const k = .97 + .04*lt/d; c.scale(k, k);
  notebook(c, 0, 0, 1, true);
  text(c, 'THE "LOGBOOK" ONLINE', 0, -360, 46, 'Type', '#333');
  const L = ['Dec 12: ...crying.', 'Dec 13: ...praying.', 'Dec 15: Storm ended.', 'Sea calm.', 'God is over all.'];
  L.forEach((s, i) => { const a = ease((lt - i*.06*d)/.2); c.globalAlpha = a; text(c, s, -290, -240 + i*110, 60, 'Hand', '#1d2440', 'left'); c.globalAlpha = 1;
    const st = ease((lt - (.3 + i*.04)*d)/.15); if (st > 0){ c.strokeStyle = '#d0201a'; c.lineWidth = 7; c.beginPath(); c.moveTo(-300, -240 + i*110); c.lineTo(-300 + 600*st, -240 + i*110); c.stroke(); } });
  c.restore();
  stamp(c, 'FAKE', 540, 880, ease((lt - (p.stampAt ?? .3)*d)/.18), 150, -.12);
  const a = ease((lt - .65*d)/.3); if (a > 0){ c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(130, 1150, 820, 100); text(c, 'FIRST PRINTED DECADES LATER', 540, 1202, 50, 'Anton', '#ffd84a'); c.globalAlpha = 1; }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
