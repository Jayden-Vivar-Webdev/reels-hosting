// ===== Dyatlov Pass (Northern Urals, Feb 1959) =====
function snowSky(c, night){
  const g = c.createLinearGradient(0, 0, 0, 900);
  if (night){ g.addColorStop(0,'#060a14'); g.addColorStop(1,'#1c2638'); } else { g.addColorStop(0,'#5d6875'); g.addColorStop(1,'#a9b2ba'); }
  c.fillStyle = g; c.fillRect(0, 0, W, 900);
  if (night){ const r = R(8); for (let i=0;i<60;i++){ c.fillStyle = `rgba(230,236,255,${.2+.5*r()})`; c.fillRect(r()*W, 160 + r()*500, 2, 2); }
    c.fillStyle = 'rgba(235,240,250,.9)'; c.beginPath(); c.arc(930, 470, 40, 0, 7); c.fill();
    const mg = c.createRadialGradient(930, 470, 10, 930, 470, 300); mg.addColorStop(0,'rgba(200,215,240,.3)'); mg.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle = mg; c.fillRect(400, 0, 680, 700); }
}
function ridge(c, y, amp, col, seed, snowcap){
  const r = R(seed); const pts = []; for (let x = -40; x <= W + 40; x += 90) pts.push([x, y - r()*amp]);
  c.fillStyle = col; c.beginPath(); c.moveTo(-40, H); pts.forEach(([x, yy]) => c.lineTo(x, yy)); c.lineTo(W + 40, H); c.closePath(); c.fill();
  if (snowcap){ c.fillStyle = snowcap; pts.forEach(([x, yy], i) => { if (i && yy < y - amp*.55){ c.beginPath(); c.moveTo(x - 40, yy + 40); c.lineTo(x, yy); c.lineTo(x + 40, yy + 40); c.fill(); } }); }
}
function snowfall(c, lt, n=70, seed=5, a=.7){
  const r = R(seed); c.fillStyle = `rgba(235,240,250,${a})`;
  for (let i=0;i<n;i++){ const x0 = r()*W, sp = 60 + r()*120, s = 2 + r()*4; const y = (r()*H + lt*sp) % 1500 + 150, x = x0 + Math.sin(lt*1.5 + i)*20 - lt*40 % W;
    c.beginPath(); c.arc(((x % W) + W) % W, y, s, 0, 7); c.fill(); }
}
function slope(c, night){
  // a long bare snow slope falling to the left, treeline far below-left
  c.fillStyle = night ? '#9aa6b8' : '#dfe5ea'; c.beginPath(); c.moveTo(-40, 1300); c.lineTo(-40, 1000); c.quadraticCurveTo(500, 820, 1120, 640); c.lineTo(1120, 1300); c.closePath(); c.fill();
  c.fillStyle = night ? 'rgba(20,30,50,.35)' : 'rgba(80,95,110,.15)'; c.beginPath(); c.moveTo(-40, 1300); c.lineTo(-40, 1080); c.quadraticCurveTo(500, 940, 1120, 820); c.lineTo(1120, 1300); c.fill();
  c.fillStyle = night ? '#0b1018' : '#2d3640'; c.fillRect(0, 1290, W, 630);
}
function longTent(c, x, y, s, o={}){
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(-.12);
  // ridge tent seen from the side: long, low
  c.fillStyle = o.day ? '#7a735f' : '#66717d'; c.beginPath(); c.moveTo(-330, 0); c.lineTo(-300, -150); c.lineTo(300, -150); c.lineTo(330, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 4; for (let k=-240; k<=240; k+=120){ c.beginPath(); c.moveTo(k, -150); c.lineTo(k*1.08, 0); c.stroke(); }
  c.strokeStyle = '#1b1f24'; c.lineWidth = 8; c.beginPath(); c.moveTo(-300, -150); c.lineTo(300, -150); c.stroke();
  c.fillStyle = '#1b1f24'; c.fillRect(-306, -190, 10, 190); c.fillRect(296, -190, 10, 190);   // ski-pole uprights
  c.strokeStyle = 'rgba(220,220,220,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-300, -186); c.lineTo(-420, 10); c.moveTo(300, -186); c.lineTo(420, 10); c.stroke();
  if (o.slash > 0){ // a long ragged cut through the fabric
    const k = o.slash;
    for (const [x0, len, w] of [[40, 135, 34], [-150, 120, 26]]){
      c.fillStyle = '#020305'; c.beginPath(); c.moveTo(x0, -146);
      for (let j=1;j<=6;j++){ const yy = -146 + len*k*j/6; c.lineTo(x0 + w*(j%2 ? .7 : 1) * Math.sin(j*Math.PI/7), yy); }
      for (let j=6;j>=1;j--){ const yy = -146 + len*k*j/6; c.lineTo(x0 - w*(j%2 ? 1 : .7) * Math.sin(j*Math.PI/7), yy); }
      c.closePath(); c.fill(); c.strokeStyle = 'rgba(230,235,240,.85)'; c.lineWidth = 3; c.stroke(); }
    if (o.flap){ c.fillStyle = '#7d8893'; c.beginPath(); c.moveTo(40, -146); c.lineTo(40 + 46 + Math.sin(o.lt*7)*16, -70); c.lineTo(52, -16); c.fill(); }
  }
  if (o.snow){ c.fillStyle = '#e8edf1'; c.beginPath(); c.moveTo(-360, 10); c.quadraticCurveTo(-200, -120*o.snow, 0, -60*o.snow); c.quadraticCurveTo(200, -140*o.snow, 360, 10); c.fill(); }
  c.restore();
}
function prints(c, x0, y0, x1, y1, k, night){
  const n = 16; for (let i=0;i<n*k;i++){ const f = i/n, x = x0 + (x1-x0)*f + (i%2 ? 14 : -14), y = y0 + (y1-y0)*f;
    c.fillStyle = night ? 'rgba(20,28,45,.75)' : 'rgba(60,70,80,.55)'; c.beginPath(); c.ellipse(x, y, 10, 17, -.5, 0, 7); c.fill(); }
}
SC.snowtent = (c, p, lt, d) => {
  snowSky(c, true);
  ridge(c, 760, 220, '#2a3446', 31, '#cdd6e4');
  slope(c, true);
  // treeline far down-left
  for (let i=0;i<12;i++) pine(c, -20 + i*42, 1060 + (i%3)*10, 120 + (i*37)%60, '#0b1220');
  const sl = p.slash != null ? ease((lt - p.slash*d)/.5) : 1;
  if (p.prints) prints(c, 640, 930, 140, 1110, ease((lt - (p.prints === true ? 0 : p.prints)*d)/(d*.5)), true);
  longTent(c, 720, 900, p.far ? .55 : 1, {slash: sl, flap: true, lt});
  snowfall(c, lt, 80, 5, .6);
  if (p.ring){ const a = ease((lt - p.ring*d)/.3); if (a > 0){ c.strokeStyle = `rgba(255,59,48,${a})`; c.lineWidth = 7; c.beginPath(); c.ellipse(700, 830, 150, 120, 0, 0, 7*a); c.stroke(); } }
  if (p.big){ const a = ease((lt - p.bigAt*d)/.3); c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, p.bigY || 560, p.bigSize || 110, 'Anton', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, p.tag2Y || 1200, ease((lt - (p.tag2At || .4)*d)/.3), p.tag2Col || '#ff5a3a');
  if (p.follow) followBox(c, lt, d);
};
SC.urals = (c, p, lt, d) => {
  snowSky(c, !p.day);
  ridge(c, 760, 300, '#3a4558', 12, '#e6ecf4');
  ridge(c, 900, 200, '#273042', 19, '#c3cddb');
  ridge(c, 1060, 120, '#141b28', 23);
  snowfall(c, lt, 50, 9, .5);
  const a = ease((lt - .3)/.4);
  if (p.pin && a > 0){ c.save(); c.globalAlpha = a; c.translate(560, 690 - 20*(1-a)); c.fillStyle = '#ff3b30'; c.beginPath(); c.arc(0, -40, 34, Math.PI, 0); c.lineTo(0, 30); c.closePath(); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -40, 13, 0, 7); c.fill(); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1180, ease((lt - (p.tag2At || .35)*d)/.3), p.tag2Col || '#ff5a3a');
  if (p.follow) followBox(c, lt, d);
};
function skier(c, x, y, s, a, col, dir=1, lt=0, i=0){
  c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s*dir, s);
  const sw = Math.sin(lt*6 + i)*10;
  c.fillStyle = col; c.strokeStyle = col; c.lineWidth = 7; c.lineCap = 'round';
  c.beginPath(); c.arc(0, -150, 18, 0, 7); c.fill();                       // head
  c.beginPath(); c.roundRect(-26, -132, 46, 70, 14); c.fill();              // body + pack
  c.beginPath(); c.roundRect(-40, -128, 24, 56, 8); c.fill();               // rucksack
  c.beginPath(); c.moveTo(0, -64); c.lineTo(-12 + sw, 0); c.moveTo(4, -64); c.lineTo(14 - sw, 0); c.stroke();   // legs
  c.beginPath(); c.moveTo(10, -118); c.lineTo(40, -70); c.lineTo(52 + sw, 6); c.stroke();                         // arm + pole
  c.lineWidth = 5; c.beginPath(); c.moveTo(-60, 4); c.lineTo(70, 4); c.stroke();                                  // skis
  c.restore();
}
SC.skiers = (c, p, lt, d) => {
  snowSky(c, false);
  ridge(c, 700, 200, '#7d8896', 41, '#eef2f6');
  c.fillStyle = '#e4e9ee'; c.fillRect(0, 1000, W, 400); c.fillStyle = 'rgba(80,90,100,.15)'; c.fillRect(0, 1000, W, 6);
  c.fillStyle = '#2d3640'; c.fillRect(0, 1290, W, 630);
  const back = p.back * d, k = clamp((lt - back)/(d*.5), 0, 1);
  for (let i = 0; i < 10; i++){
    const x = 110 + i*92 + lt*12, y = 1010;
    if (i === 0 && lt > back){ skier(c, x - 160*k, y, .9, 1 - .3*k, '#ff3b30', -1, lt, i); }
    else skier(c, x, y, .9, 1, '#1d242c', 1, lt, i);
  }
  const n = lt > back ? 9 : 10;
  c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 20; text(c, String(n), 540, 610, 220, 'Anton', n === 10 ? '#f1efe8' : '#ff3b30'); c.restore();
  text(c, n === 10 ? 'SET OUT' : 'WENT ON', 540, 760, 60, 'Anton', '#1b2027');
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  const t2 = lt > p.surv*d ? 'THE ONLY SURVIVOR' : '1 TURNED BACK · SICK';
  if (lt > back) tag(c, t2, 540, 1180, ease((lt - back)/.3), '#ff5a3a');
};
SC.found = (c, p, lt, d) => {
  snowSky(c, false);
  ridge(c, 700, 160, '#8b95a2', 55, '#f2f5f8');
  slope(c, false);
  longTent(c, 560, 960, 1.05, {snow: .9, slash: 1, day: true, lt});
  // cut-away: row of boots still inside
  const a = ease((lt - .2*d)/.4);
  if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = '#a9997a'; c.beginPath(); c.roundRect(150, 420, 780, 280, 20); c.fill();
    c.strokeStyle = '#d7fbe9'; c.lineWidth = 3; c.strokeRect(150, 420, 780, 260);
    text(c, 'INSIDE THE TENT', 540, 455, 36, 'VT', '#1b1f24');
    for (let i = 0; i < 9; i++){ const x = 186 + i*82, y = 630;
      c.fillStyle = i % 2 ? '#3a2416' : '#24160c'; c.beginPath(); c.moveTo(x, y - 90); c.lineTo(x + 30, y - 90); c.lineTo(x + 30, y - 20); c.lineTo(x + 62, y - 14); c.quadraticCurveTo(x + 70, y + 10, x + 58, y + 14); c.lineTo(x, y + 14); c.closePath(); c.fill();
      c.fillStyle = '#1a120c'; c.fillRect(x - 2, y + 10, 64, 8); }
    const b = ease((lt - .55*d)/.3); if (b > 0){ c.strokeStyle = `rgba(255,59,48,${b})`; c.lineWidth = 7; c.beginPath(); c.ellipse(540, 600, 410, 90, 0, 0, 7*b); c.stroke(); }
    c.restore(); }
  snowfall(c, lt, 30, 3, .5);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1200, ease((lt - (p.tag2At || .55)*d)/.3), p.tag2Col || '#ff5a3a');
};
SC.treeline = (c, p, lt, d) => {
  snowSky(c, true);
  c.fillStyle = '#8f9bb0'; c.fillRect(0, 900, W, 400);
  // big cedar on the left, forest behind
  for (let i=0;i<10;i++) pine(c, 40 + i*110, 920, 300 + (i*53)%120, '#141c2a');
  c.fillStyle = '#0b0f17'; c.fillRect(230, 420, 70, 520);
  c.beginPath(); c.moveTo(265, 380); c.lineTo(110, 760); c.lineTo(420, 760); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(265, 520); c.lineTo(80, 900); c.lineTo(450, 900); c.closePath(); c.fill();
  // footprints from the right (tent direction) to the tree
  prints(c, 1060, 1180, 380, 990, ease(lt/(d*.6)), true);
  // tiny dying fire
  const f = .6 + .4*Math.sin(lt*13)*Math.sin(lt*5.3);
  const g = c.createRadialGradient(330, 980, 4, 330, 980, 130); g.addColorStop(0, `rgba(255,120,40,${.6*f})`); g.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(180, 850, 300, 260);
  c.fillStyle = '#2a1c12'; c.fillRect(290, 985, 80, 12);
  c.fillStyle = `rgba(255,170,60,${.8*f})`; c.beginPath(); c.moveTo(310, 985); c.quadraticCurveTo(330, 940 - 10*f, 350, 985); c.fill();
  snowfall(c, lt, 40, 7, .5);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1200, ease((lt - (p.tag2At || .5)*d)/.3), p.tag2Col || '#ff5a3a');
};
SC.melt = (c, p, lt, d) => {
  snowSky(c, false);
  pines(c, 780, '#2c3a34', 61, 18); pines(c, 820, '#1d2823', 62, 14);
  c.fillStyle = '#dfe5ea'; c.fillRect(0, 810, W, 490);
  const k0 = ease(lt/(d*.7)), r = R(71);
  for (let i=0;i<14;i++){ const x = r()*W, y = 860 + r()*400, w = 40 + r()*120; c.fillStyle = '#4a3f33'; c.beginPath(); c.ellipse(x, y, w*k0, w*.35*k0, 0, 0, 7); c.fill(); }
  c.strokeStyle = '#5f7581'; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.moveTo(560, 820); c.bezierCurveTo(420, 950, 700, 1100, 480, 1300); c.stroke();
  c.strokeStyle = 'rgba(230,240,250,.6)'; c.lineWidth = 3; c.setLineDash([18, 30]); c.lineDashOffset = -lt*60; c.stroke(); c.setLineDash([]);
  c.fillStyle = '#2d3640'; c.fillRect(0, 1290, W, 630);
  // melting calendar
  const k = ease(lt/(d*.6)), mo = ['FEB','MAR','APR','MAY'][Math.min(3, Math.floor(k*4))];
  c.fillStyle = '#f1efe8'; c.beginPath(); c.roundRect(760, 420, 220, 220, 14); c.fill(); c.fillStyle = '#c4161c'; c.fillRect(760, 420, 220, 60);
  text(c, '1959', 870, 452, 40, 'Anton', '#fff'); text(c, mo, 870, 570, 96, 'Anton', '#1b1f24');
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1200, ease((lt - (p.tag2At || .5)*d)/.3), p.tag2Col || '#ff5a3a');
};
function radSym(c, x, y, r, col){ c.fillStyle = col; for (let k=0;k<3;k++){ const a0 = -Math.PI/2 + k*2*Math.PI/3 - Math.PI/6; c.beginPath(); c.moveTo(x, y); c.arc(x, y, r, a0, a0 + Math.PI/3); c.closePath(); c.fill(); }
  c.fillStyle = '#ece6d6'; c.beginPath(); c.arc(x, y, r*.28, 0, 7); c.fill(); c.fillStyle = col; c.beginPath(); c.arc(x, y, r*.18, 0, 7); c.fill(); }
SC.medfile = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(-.02); const k = .95 + .05*lt/d; c.scale(k, k);
  paper(c, 0, 0, 800, 880, 0, '#ece6d6');
  text(c, 'FORENSIC REPORT', 0, -370, 56, 'Type', '#111'); text(c, 'THE LAST FOUR · 1959', 0, -312, 34, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-340, -282, 680, 4);
  const rows = [['SKULL FRACTURE', '× 1', p.r1 || .02], ['CRUSHED CHEST', '× 2', p.r2 || .28], ['RADIATION · CLOTHING', 'TRACES', p.r3 || .6]];
  rows.forEach(([a, b, at], i) => { const y = -180 + i*130, s = ease((lt - at*d)/.25);
    c.globalAlpha = s; text(c, a, -330, y, 44, 'Type', '#222', 'left'); text(c, b, 330, y, 54, 'Anton', '#a01010', 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-330, y + 40, 660, 2); });
  const ra = ease((lt - (p.r3 || .6)*d)/.3); if (ra > 0){ c.save(); c.globalAlpha = ra; c.translate(0, 250); c.rotate(lt*.6); radSym(c, 0, 0, 110, '#c49a12'); c.restore(); }
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.sovfile = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 760); c.rotate(.03);
  c.fillStyle = '#b89a62'; c.fillRect(-420, -470, 840, 940);       // folder
  paper(c, 0, 10, 760, 860, -.01, '#ece6d6');
  text(c, 'CRIMINAL CASE · 1959', 0, -350, 50, 'Type', '#111'); text(c, 'NINE DEAD · NORTHERN URALS', 0, -295, 32, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-320, -265, 640, 4);
  text(c, 'CAUSE OF DEATH:', 0, -170, 44, 'Type', '#222');
  const a = ease((lt - .15*d)/.3); c.globalAlpha = a; text(c, '"A COMPELLING', 0, -60, 70, 'Anton', '#a01010'); text(c, 'NATURAL FORCE"', 0, 30, 70, 'Anton', '#a01010'); c.globalAlpha = 1;
  const r = R(14); for (let i = 0; i < 5; i++){ c.fillStyle = 'rgba(30,30,30,.5)'; c.fillRect(-300, 140 + i*36, 400 + r()*200, 10); }
  c.restore();
  stamp(c, p.stampText || 'CASE CLOSED', 600, 1080, ease((lt - (p.stamp || .6)*d)/.2), 76, -.14);
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.avalanche = (c, p, lt, d) => {
  snowSky(c, true);
  ridge(c, 700, 160, '#2a3446', 77, '#cdd6e4');
  slope(c, true);
  longTent(c, 560, 1000, .8, {lt, snow: ease((lt - .55*d)/.4)*.8});
  // a slab of snow breaking off upslope and sliding down onto the tent
  const k = ease((lt - .2*d)/(d*.45));
  c.save(); c.translate(860 - 260*k, 700 + 200*k); c.rotate(-.3);
  c.fillStyle = '#e6ecf3'; c.beginPath(); c.moveTo(-170, -40); c.lineTo(170, -60); c.lineTo(190, 30); c.lineTo(-180, 50); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,40,60,.6)'; c.lineWidth = 5; c.stroke(); c.restore();
  if (k > 0){ c.strokeStyle = 'rgba(30,40,60,.7)'; c.lineWidth = 6; c.beginPath(); c.moveTo(700, 690); c.lineTo(760, 670); c.lineTo(820, 690); c.lineTo(900, 660); c.lineTo(1000, 640); c.stroke(); } // crack line
  snowfall(c, lt, 60, 5, .5);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1200, ease((lt - (p.tag2At || .5)*d)/.3), p.tag2Col || '#ff5a3a');
};
