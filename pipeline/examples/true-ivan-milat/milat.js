// ===== Ivan Milat / Paul Onions (NSW, 1990). True case; drawn props, empty roads and silhouettes only, no faces =====
function lbl(c, s, x, y, size, col, a = 1){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${size}px Anton`; const w = c.measureText(s).width + 36; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(x - w/2, y - size*.68, w, size*1.3); text(c, s, x, y, size, 'Anton', col); c.restore(); }
function mSky(c){
  bg(c, '#1c2633', '#07090c');
  const g = c.createRadialGradient(540, 640, 30, 540, 640, 700); g.addColorStop(0, 'rgba(120,140,170,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
}
// perspective two-lane highway, horizon y=640
function mRoad(c, lt, speed = 0){
  const hy = 640;
  const r = R(31);
  for (let i = 0; i < 16; i++) pine(c, r()*W, hy + 20 + r()*20, 200 + r()*160, '#16202a');
  c.fillStyle = '#0b0f12'; c.fillRect(0, hy + 20, W, 1300 - hy);
  c.fillStyle = '#23272b'; c.beginPath(); c.moveTo(500, hy + 20); c.lineTo(580, hy + 20); c.lineTo(1180, 1300); c.lineTo(-100, 1300); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(235,235,225,.55)'; c.lineWidth = 5; c.beginPath(); c.moveTo(505, hy + 22); c.lineTo(-60, 1300); c.moveTo(575, hy + 22); c.lineTo(1140, 1300); c.stroke();
  // centre dashes moving toward camera
  c.fillStyle = '#e8d27a';
  for (let k = 0; k < 9; k++){
    let z = ((k / 9) + lt*speed*0.12) % 1; const z0 = Math.pow(z, 2.2), z1 = Math.pow(Math.min(z + .05, 1), 2.2);
    const y0 = hy + 20 + z0*(1300 - hy - 20), y1 = hy + 20 + z1*(1300 - hy - 20);
    const w0 = 3 + z0*16, w1 = 3 + z1*16;
    c.beginPath(); c.moveTo(540 - w0/2, y0); c.lineTo(540 + w0/2, y0); c.lineTo(540 + w1/2, y1); c.lineTo(540 - w1/2, y1); c.closePath(); c.fill();
  }
  // big roadside trees framing
  for (let i = 0; i < 4; i++){ pine(c, 60 + i*55, 1120 + i*30, 760 - i*60, '#06090b'); pine(c, 1020 - i*55, 1120 + i*30, 760 - i*60, '#06090b'); }
}
function mCar4wd(c, x, y, s, o = {}){ // boxy 4WD seen from behind, parked
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.5)'; c.beginPath(); c.ellipse(0, 10, 230, 26, 0, 0, 7); c.fill();
  c.fillStyle = '#1b1f24'; c.beginPath(); c.roundRect(-210, -260, 420, 250, 18); c.fill();       // body
  c.fillStyle = '#2a3038'; c.beginPath(); c.roundRect(-180, -240, 360, 100, 10); c.fill();          // rear window
  c.fillStyle = 'rgba(120,150,180,.18)'; c.fillRect(-170, -232, 340, 30);
  c.fillStyle = '#121418'; c.beginPath(); c.arc(0, -70, 62, 0, 7); c.fill(); c.strokeStyle = '#30353c'; c.lineWidth = 8; c.stroke();   // spare wheel
  c.fillStyle = '#0a0b0d'; c.fillRect(-200, -20, 70, 34); c.fillRect(130, -20, 70, 34);              // tyres
  const tl = o.brake ? '#ff2a20' : '#9a1a14';
  c.fillStyle = tl; c.fillRect(-205, -150, 26, 70); c.fillRect(179, -150, 26, 70);
  if (o.brake){ c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(0, -110, 10, 0, -110, 360); g.addColorStop(0, 'rgba(255,40,30,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(-400, -400, 800, 600); c.restore(); }
  c.fillStyle = '#e9e7da'; c.fillRect(-60, -10, 120, 30); c.fillStyle = '#222'; c.font = '22px Anton'; c.textAlign = 'center'; c.fillText('???-???', 0, 12);
  if (o.doorOpen){ c.fillStyle = '#ffe9b0'; c.globalAlpha = .9; c.fillRect(210, -220, 26, 190); c.globalAlpha = 1; c.fillStyle = '#1b1f24'; c.beginPath(); c.moveTo(236, -230); c.lineTo(330, -250); c.lineTo(330, -10); c.lineTo(236, -20); c.closePath(); c.fill(); }
  c.restore();
}
function mCarFront(c, x, y, s, beam = 1){ // car approaching, headlights on
  c.save(); c.translate(x, y); c.scale(s, s);
  c.save(); c.globalCompositeOperation = 'lighter';
  for (const sx of [-130, 130]){ const g = c.createRadialGradient(sx, -80, 5, sx, -80, 260*beam); g.addColorStop(0, 'rgba(255,250,220,.95)'); g.addColorStop(.25, 'rgba(255,240,190,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(sx - 300, -380, 600, 600); }
  c.restore();
  c.fillStyle = '#15181c'; c.beginPath(); c.roundRect(-200, -230, 400, 230, 16); c.fill();
  c.fillStyle = '#272c33'; c.fillRect(-170, -215, 340, 80);
  c.fillStyle = '#fffbe6'; c.beginPath(); c.arc(-130, -80, 26, 0, 7); c.arc(130, -80, 26, 0, 7); c.fill();
  c.restore();
}
function mSign(c, x, y, s, a = 1){ // green NSW-style road sign
  if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#6b6f73'; c.fillRect(-150, 0, 14, 330); c.fillRect(136, 0, 14, 330);
  c.fillStyle = '#0d6b3a'; c.beginPath(); c.roundRect(-230, -200, 460, 220, 14); c.fill(); c.strokeStyle = '#f2f2f2'; c.lineWidth = 6; c.strokeRect(-218, -188, 436, 196);
  text(c, 'BELANGLO', 0, -128, 72, 'Anton', '#f4f4f4'); text(c, 'STATE FOREST', 0, -45, 58, 'Anton', '#f4f4f4');
  c.restore();
}
function mBackpack(c, x, y, s){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#7a4a22'; c.beginPath(); c.roundRect(-70, -170, 140, 170, 30); c.fill();
  c.fillStyle = '#5e3818'; c.beginPath(); c.roundRect(-55, -90, 110, 70, 14); c.fill();
  c.fillStyle = '#2f5d7c'; c.beginPath(); c.roundRect(-80, -200, 160, 50, 22); c.fill();   // rolled mat
  c.strokeStyle = '#3d2410'; c.lineWidth = 8; c.beginPath(); c.arc(0, -170, 26, Math.PI, 0); c.stroke();
  c.restore();
}
SC.mhwy = (c, p, lt, d) => {
  mSky(c); mRoad(c, lt, p.speed || 0);
  if (p.sign) mSign(c, 830, 760, .8, ease((lt - (p.signAt || 0)*d)/.3));
  if (p.pack) mBackpack(c, 250, 1190, 1.1);
  if (p.car === 'rear') mCar4wd(c, 560, p.carY || 1060, p.carS || 1.15, { brake: p.brake, doorOpen: p.doorOpen });
  if (p.car === 'front'){ const k = p.approach ? .45 + .55*ease(lt/d) : 1; mCarFront(c, 540, 700 + 420*k, .5 + .9*k, 1); }
  if (p.flash){ const f = lt - p.flash*d; if (f > 0 && f < .25){ c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,240,200,${.8*(1 - f/.25)})`; c.fillRect(0, 0, W, H); c.restore(); } }
  if (p.label) lbl(c, p.label, 540, p.labelY || 470, p.labelSize || 70, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .4)*d)/.25));
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 560, ease((lt - (p.stampAt ?? .6)*d)/.18), 90, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
function mRevolver(c, x, y, s, rot = 0){
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.fillStyle = '#2b2d31'; c.fillRect(-10, -26, 220, 30);                 // barrel
  c.fillStyle = '#3a3d42'; c.fillRect(-10, -30, 220, 8);
  c.fillStyle = '#26282c'; c.beginPath(); c.roundRect(-80, -50, 100, 70, 14); c.fill();   // cylinder/frame
  c.fillStyle = '#4a4d53'; for (let i = 0; i < 3; i++) c.fillRect(-70 + i*30, -44, 18, 58);
  c.fillStyle = '#4b2e1a'; c.beginPath(); c.moveTo(-80, 10); c.lineTo(-40, 10); c.lineTo(-70, 150); c.lineTo(-130, 140); c.closePath(); c.fill();   // grip
  c.strokeStyle = '#26282c'; c.lineWidth = 8; c.beginPath(); c.arc(-30, 30, 26, 0, Math.PI); c.stroke();   // trigger guard
  c.restore();
}
function mRope(c, x, y, s){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.strokeStyle = '#b89a5e'; c.lineWidth = 14; c.lineCap = 'round';
  for (let i = 0; i < 5; i++){ c.beginPath(); c.ellipse(0, 0, 110 - i*12, 60 - i*7, -.15, 0, 7); c.stroke(); }
  c.strokeStyle = 'rgba(70,50,20,.5)'; c.lineWidth = 3; for (let i = 0; i < 5; i++){ c.beginPath(); c.ellipse(0, 0, 110 - i*12, 60 - i*7, -.15, 0, 7); c.stroke(); }
  c.beginPath(); c.strokeStyle = '#b89a5e'; c.lineWidth = 14; c.moveTo(100, 20); c.quadraticCurveTo(170, 60, 160, 130); c.stroke();
  c.restore();
}
SC.mseat = (c, p, lt, d) => { // inside the car at night: dashboard, bench seat; gun + rope revealed
  bg(c, '#232a33', '#0c0e11');
  // windscreen showing the dark road
  c.save(); c.beginPath(); c.moveTo(90, 330); c.lineTo(990, 330); c.lineTo(1040, 720); c.lineTo(40, 720); c.closePath(); c.clip();
  c.fillStyle = '#1a2530'; c.fillRect(0, 300, W, 440); const r = R(5); for (let i = 0; i < 14; i++) pine(c, r()*W, 600 + r()*20, 180 + r()*120, '#05080a');
  c.fillStyle = '#1d2024'; c.beginPath(); c.moveTo(500, 600); c.lineTo(580, 600); c.lineTo(900, 740); c.lineTo(180, 740); c.closePath(); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 700, 10, 540, 680, 360); g.addColorStop(0, 'rgba(255,240,190,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 300, W, 440); c.restore();
  c.restore();
  c.strokeStyle = '#0a0b0d'; c.lineWidth = 26; c.beginPath(); c.moveTo(90, 330); c.lineTo(40, 720); c.moveTo(990, 330); c.lineTo(1040, 720); c.stroke();
  // dashboard
  c.fillStyle = '#1a1c20'; c.beginPath(); c.moveTo(0, 700); c.quadraticCurveTo(540, 660, W, 700); c.lineTo(W, 860); c.lineTo(0, 860); c.closePath(); c.fill();
  c.fillStyle = '#0e0f12'; c.beginPath(); c.roundRect(430, 740, 220, 80, 10); c.fill();     // radio
  c.fillStyle = p.radio === false ? '#222' : '#57e38a'; text(c, '— — . —', 540, 780, 34, 'VT', p.radio === false ? '#333' : '#57e38a');
  // bench seat
  c.fillStyle = '#5a4434'; c.beginPath(); c.roundRect(40, 900, 1000, 380, 30); c.fill();
  c.fillStyle = '#6c5241'; c.beginPath(); c.roundRect(60, 920, 960, 120, 24); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 6; c.beginPath(); c.moveTo(540, 920); c.lineTo(540, 1270); c.stroke();
  // dome light
  const dl = p.dome ? .5 + .5*ease((lt - .1)/.3) : 0;
  if (dl){ c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 950, 20, 540, 1050, 500); g.addColorStop(0, `rgba(255,220,160,${.4*dl})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 700, W, 700); c.restore(); }
  const rv = p.open ? 1 : (p.revealAt != null ? ease((lt - p.revealAt*d)/(.18*d)) : 0);
  if (rv > 0){ c.save(); c.globalAlpha = rv; mRevolver(c, 430, 1110 - 30*(1 - rv), 1.5, -.12); mRope(c, 790, 1140, 1.1); c.restore(); }
  if (p.q){ ['?', '?', '?'].forEach((s, i) => { const a = ease((lt - (.15 + i*.22)*d)/.2); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.7)'; c.beginPath(); c.roundRect(170 + i*270, 420 + (i%2)*90, 200, 150, 30); c.fill(); text(c, s, 270 + i*270, 497 + (i%2)*90, 110, 'Anton', i == 2 ? '#ff3b30' : '#f1efe8'); c.restore(); } }); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 470, p.labelSize || 66, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mlegend = (c, p, lt, d) => {
  bg(c, '#2a2118', '#0d0a07');
  paperCard(c, 540, 760, 820, 720, -.03);
  c.save(); c.translate(540, 760); c.rotate(-.03);
  text(c, 'URBAN LEGEND', 0, -250, 64, 'Type', '#2a2620');
  text(c, '"NEVER GET IN', 0, -100, 100, 'Anton', '#1a1712');
  text(c, "A STRANGER'S CAR\"", 0, 20, 100, 'Anton', '#1a1712');
  text(c, 'every backpacker hears it...', 0, 150, 40, 'Type', '#4a4438');
  c.restore();
  stamp(c, 'IT CAME TRUE', 560, 1020, ease((lt - (p.stampAt ?? .55)*d)/.18), 96);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mmap = (c, p, lt, d) => { // simple map: Sydney -> south-west along the highway -> Belanglo
  bg(c, '#1b2421', '#070a09');
  c.save(); c.translate(540, 780);
  c.fillStyle = '#d9d2bd'; c.beginPath(); c.roundRect(-440, -400, 880, 800, 16); c.fill();
  c.fillStyle = '#9cc2d6'; c.beginPath(); c.moveTo(440, -400); c.lineTo(440, 400); c.lineTo(330, 400); c.quadraticCurveTo(250, 120, 300, -60); c.quadraticCurveTo(340, -250, 300, -400); c.closePath(); c.fill(); // ocean
  text(c, 'PACIFIC', 380, 250, 30, 'Type', '#3f6a80');
  c.fillStyle = 'rgba(40,110,60,.55)'; c.beginPath(); c.ellipse(-230, 230, 150, 110, -.3, 0, 7); c.fill();   // forest
  text(c, 'BELANGLO', -230, 222, 40, 'Anton', '#123d20'); text(c, 'STATE FOREST', -230, 262, 26, 'Anton', '#123d20');
  const k = p.route ? ease((lt - .1*d)/(.6*d)) : (p.routeDone ? 1 : 0);
  c.strokeStyle = '#c4161c'; c.lineWidth = 12; c.setLineDash([26, 16]); c.beginPath(); c.moveTo(180, -230);
  const pts = [[180, -230], [60, -110], [-40, 20], [-120, 130], [-150, 180]]; let m = Math.max(1, Math.floor(k*(pts.length - 1)*100)/100);
  for (let i = 1; i < pts.length; i++){ const f = Math.min(1, Math.max(0, k*(pts.length - 1) - (i - 1))); if (f <= 0) break; const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; c.lineTo(x0 + (x1 - x0)*f, y0 + (y1 - y0)*f); }
  c.stroke(); c.setLineDash([]);
  c.fillStyle = '#111'; c.beginPath(); c.arc(190, -240, 16, 0, 7); c.fill(); text(c, 'SYDNEY', 190, -295, 46, 'Anton', '#111');
  if (p.road) text(c, 'HUME HWY', 10, -60, 34, 'Anton', '#6a1410');
  if (p.pins){ const n = Math.round(p.pins*ease((lt - .15*d)/(.55*d))); const r = R(9);
    for (let i = 0; i < 7; i++){ const x = -300 + r()*150, y = 170 + r()*120; if (i < n) kpin(c, x, y, 1); } }
  c.restore();
  if (p.big){ const a = ease((lt - (p.bigAt ?? .6)*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.8)'; c.fillRect(140, p.bigY - 80, 800, 160); text(c, p.big, 540, p.bigY + 2, 100, 'Anton', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mfile = (c, p, lt, d) => { // police incident report on a desk
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(.025);
  paper(c, 0, 0, 780, 860, 0, '#ece6d6');
  text(c, 'INCIDENT REPORT', 0, -350, 58, 'Type', '#111'); text(c, 'BOWRAL POLICE · JANUARY 1990', 0, -292, 34, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-330, -262, 660, 4);
  const rows = [['OFFENDER:', '"BILL"', '#a01010'], ['WEAPON:', 'REVOLVER', '#a01010'], ['VICTIM:', 'ESCAPED', '#111'], ['FOLLOW-UP:', '—', '#111']];
  rows.forEach(([a, b, col], i) => { const y = -180 + i*100, s = ease((lt - (.05 + i*.12)*d)/.2);
    text(c, a, -320, y, 40, 'Type', '#222', 'left'); c.globalAlpha = s; text(c, b, 330, y, 46, 'Type', col, 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-320, y + 34, 650, 2); });
  const r = R(14); for (let i = 0; i < 5; i++){ c.fillStyle = 'rgba(30,30,30,.5)'; c.fillRect(-320, 230 + i*34, 380 + r()*240, 10); }
  c.restore();
  if (p.dust){ c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, 0, W, H); }
  if (p.stampTxt) stamp(c, p.stampTxt, 560, 1060, ease((lt - (p.stampAt ?? .5)*d)/.18), 92);
  if (p.big){ const a = ease((lt - (p.bigAt ?? .4)*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.82)'; c.fillRect(140, 620, 800, 300); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 740, 170, 'Anton', '#ff3b30'); c.shadowBlur = 0; if (p.big2) text(c, p.big2, 540, 860, 54, 'Anton', '#f1efe8'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mtape = (c, p, lt, d) => { // the forest, police tape across the trees
  forestBase(c, { seed: 44 });
  const a = ease((lt - .15*d)/.3);
  c.save(); c.globalAlpha = a; c.translate(540, 900); c.rotate(-.07); c.fillStyle = '#f2d21c'; c.fillRect(-700, -40, 1400, 80);
  c.fillStyle = '#111'; for (let x = -700; x < 700; x += 620) text(c, 'POLICE LINE · DO NOT CROSS', x + 310, 3, 40, 'Anton', '#111');
  c.restore();
  if (p.label) lbl(c, p.label, 540, 620, 66, '#ff3b30', ease((lt - (p.labelAt ?? .55)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mlineup = (c, p, lt, d) => { // line-up wall with five black silhouettes; one boxed
  bg(c, '#3a3d40', '#151618');
  c.fillStyle = '#cfd2cf'; c.fillRect(60, 380, 960, 820);
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let y = 420; y < 1200; y += 60){ c.beginPath(); c.moveTo(60, y); c.lineTo(1020, y); c.stroke(); text(c, String(Math.round((1200 - y)/60*15 + 40)), 95, y - 2, 22, 'VT', '#444'); }
  for (let i = 0; i < 5; i++){ const x = 200 + i*170, h = 1 + (i%3)*.05; c.fillStyle = '#0b0b0c';
    c.beginPath(); c.arc(x, 640 - 20*h, 56, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 75, 710 - 20*h, 150, 490, 40); c.fill();
    text(c, String(i + 1), x, 1150, 50, 'Anton', '#f1efe8'); }
  const a = ease((lt - (p.pickAt ?? .5)*d)/.2);
  if (a > 0){ c.save(); c.globalAlpha = a; c.strokeStyle = '#ff3b30'; c.lineWidth = 12; c.strokeRect(540 + 170*0 + 170 - 105 - 170, 540, 210, 680); c.restore(); }
  if (p.label) lbl(c, p.label, 540, 480, 64, '#ff3b30', a);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mname = (c, p, lt, d) => { // "BILL WAS" -> name, reveal timed to the spoken name
  bg(c, '#070909', '#000');
  c.save(); c.globalAlpha = ease(lt/.4); text(c, 'BILL WAS', 540, 500, 130, 'Anton', '#f1efe8'); c.restore();
  const b = ease((lt - (p.revAt ?? .3)*d)/.25); c.save(); c.globalAlpha = b; c.shadowColor = '#ff2a20'; c.shadowBlur = 60;
  text(c, 'IVAN', 540, 700, 190, 'Anton', '#ff3b30'); text(c, 'MILAT', 540, 890, 190, 'Anton', '#ff3b30'); c.restore();
  tag(c, 'ARRESTED · MAY 22, 1994', 540, 340, ease((lt - .3)/.3), '#d7fbe9');
};
