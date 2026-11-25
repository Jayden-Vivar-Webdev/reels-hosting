// ===== Israel Keyes: buried 'murder kits' (true case; no victims shown or named, no faces) =====
const KUS = [[-124.7,48.4],[-122.8,49],[-95.2,49],[-94.8,49.4],[-89.6,48],[-84.8,46.5],[-82.4,45.3],[-82.5,43],[-79,43.3],[-76.8,43.6],[-75,45],[-71.5,45],[-69.2,47.4],[-67.8,47.1],[-67,44.8],[-70.7,43],[-70,41.8],[-71.9,41.3],[-74,40.6],[-74,39.6],[-75.5,38.5],[-76,37],[-75.5,35.2],[-77.9,33.9],[-81,32],[-81.4,30.4],[-80,26.8],[-80.4,25.2],[-81.7,25.9],[-82.8,28],[-82.7,29.8],[-84.3,30],[-86,30.4],[-89.4,30.2],[-89.4,29.1],[-91,29.3],[-93.8,29.7],[-95,29.2],[-97.2,27.6],[-97.4,25.9],[-99.1,26.4],[-100.3,28.2],[-101.4,29.8],[-103,29],[-104.7,29.9],[-106.5,31.8],[-108.2,31.8],[-111.1,31.3],[-114.8,32.5],[-117.1,32.5],[-118.5,34],[-120.6,34.6],[-121.9,36.6],[-122.5,37.8],[-123.8,39.8],[-124.2,41.9],[-124,46.3]];
const KAK = [[-141,69.6],[-156.8,71.3],[-166,68.9],[-163,66],[-168,65.6],[-161,64],[-165,62.5],[-164.5,60.5],[-157,58.8],[-162,55.5],[-153,57.5],[-150,59.8],[-146,60.6],[-141,60],[-136,57.5],[-131,55],[-133,58.5],[-139,60.2],[-141,60.3]];
const kus = (lo, la) => [540 + (lo + 96)*14.2, 700 - (la - 37)*19];
const kak = (lo, la) => [250 + (lo + 150)*6.2, 1110 - (la - 63)*9.5];
function kpoly(c, pts, f, fill, stroke){ c.beginPath(); pts.forEach(([lo, la], i) => { const [x, y] = f(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); c.fillStyle = fill; c.fill(); c.strokeStyle = stroke; c.lineWidth = 3; c.stroke(); }
function kpin(c, x, y, a, col='#ff3b30', r=18){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.shadowColor = col; c.shadowBlur = 30; c.fillStyle = col; c.beginPath(); c.arc(x, y - r*1.5, r, Math.PI, 0); c.lineTo(x, y); c.closePath(); c.fill(); c.fillStyle = '#200'; c.beginPath(); c.arc(x, y - r*1.5, r*.4, 0, 7); c.fill(); c.restore(); }
function klabel(c, s, x, y, a, col='rgba(215,251,233,.9)', sz=36){ if (a <= 0) return; c.save(); c.globalAlpha = a; text(c, s, x, y, sz, 'VT', col); c.restore(); }
function kbucketShape(c, x, y, s, lid){
  c.save(); c.translate(x, y); c.scale(s, s);
  const g = c.createLinearGradient(-110, 0, 110, 0); g.addColorStop(0, '#8a3a08'); g.addColorStop(.45, '#ff7a1a'); g.addColorStop(1, '#7a3006');
  c.fillStyle = g; c.beginPath(); c.moveTo(-110, -150); c.lineTo(110, -150); c.lineTo(90, 150); c.lineTo(-90, 150); c.closePath(); c.fill();
  c.fillStyle = 'rgba(0,0,0,.18)'; for (const yy of [-100, -60]) c.fillRect(-106, yy, 212, 10);
  c.strokeStyle = '#3a3a3a'; c.lineWidth = 6; c.beginPath(); c.arc(0, -150, 112, Math.PI*1.05, Math.PI*1.95, false); c.stroke();
  if (lid){ c.fillStyle = '#d9611a'; c.beginPath(); c.ellipse(0, -152, 118, 22, 0, 0, 7); c.fill(); }
  else { c.fillStyle = '#1a0f06'; c.beginPath(); c.ellipse(0, -152, 108, 20, 0, 0, 7); c.fill(); }
  c.restore();
}
function kground(c, seed){
  forestBase(c, {seed});
  // forest-floor clearing lit by a torch
  const g = c.createRadialGradient(540, 1030, 20, 540, 1030, 430); g.addColorStop(0, 'rgba(255,236,190,.42)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = '#1b140d'; c.fillRect(0, 960, W, 400); c.fillStyle = g; c.fillRect(0, 640, W, 760);
  const r = R(seed + 9); c.fillStyle = 'rgba(70,50,30,.7)'; for (let i = 0; i < 70; i++){ c.beginPath(); c.ellipse(120 + r()*840, 980 + r()*300, 6 + r()*14, 3 + r()*5, r()*3, 0, 7); c.fill(); }
}
function kshovel(c, x, y, rot){ c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = '#5a3c22'; c.fillRect(-9, -330, 18, 300); c.fillStyle = '#2b2b2b'; c.fillRect(-40, -350, 80, 22); c.fillStyle = '#8b939a'; c.beginPath(); c.moveTo(-55, -30); c.lineTo(55, -30); c.lineTo(45, 70); c.quadraticCurveTo(0, 120, -45, 70); c.closePath(); c.fill(); c.restore(); }
SC.kbucket = (c, p, lt, d) => {
  kground(c, 31);
  // hole + dirt pile; the bucket sinks as dirt fills in
  c.fillStyle = '#0a0705'; c.beginPath(); c.ellipse(540, 1040, 200, 50, 0, 0, 7); c.fill();
  const sink = p.fill ? ease((lt - .15*d)/(d*.6)) : 0;
  c.save(); c.beginPath(); c.rect(0, 0, W, 1040); c.clip(); kbucketShape(c, 540, 930 + sink*150, 1, true); c.restore();
  c.fillStyle = '#3a2a1a'; c.beginPath(); c.ellipse(800, 1080, 150, 70, 0, Math.PI, 0); c.fill();
  c.fillStyle = 'rgba(60,44,28,.95)'; c.beginPath(); c.ellipse(540, 1040, 200*sink + 1, 50*sink + 1, 0, 0, 7); c.fill();
  kshovel(c, 830, 1060, .35);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.big){ const a = ease((lt - p.bigAt*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.7)'; c.fillRect(200, 470, 680, 150); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 548, 110, 'Anton', '#ff3b30'); c.restore(); } }
};
SC.kcontents = (c, p, lt, d) => {
  bg(c, '#1c1f22', '#08090a');
  { const g = c.createRadialGradient(540, 760, 40, 540, 760, 620); g.addColorStop(0, 'rgba(230,230,215,.3)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  c.fillStyle = '#2a2d30'; c.fillRect(130, 420, 820, 760);   // evidence table
  kbucketShape(c, 330, 760, .9, false);
  const a1 = ease((lt - .1*d)/.25), a2 = ease((lt - .45*d)/.25);
  c.save(); c.globalAlpha = a1; c.fillStyle = '#0b0b0c';   // pistol silhouette
  c.translate(700, 620); c.beginPath(); c.moveTo(-150, -40); c.lineTo(120, -40); c.lineTo(120, 10); c.lineTo(-40, 10); c.lineTo(-70, 120); c.lineTo(-130, 120); c.lineTo(-110, 10); c.lineTo(-150, 10); c.closePath(); c.fill(); c.restore();
  if (a1 > 0) klabel(c, 'WEAPONS', 700, 790, a1, '#ff5a3a', 50);
  c.save(); c.globalAlpha = a2;
  c.strokeStyle = '#d8d8d0'; c.lineWidth = 6; for (let i = 0; i < 6; i++){ c.beginPath(); c.arc(640 + i*8, 960, 40 + i*2, Math.PI*.1, Math.PI*1.7); c.stroke(); }   // zip ties
  c.fillStyle = '#3a3e44'; c.fillRect(760, 930, 150, 46); c.fillStyle = '#ffe9a0'; c.beginPath(); c.arc(760, 953, 26, Math.PI*.5, Math.PI*1.5); c.fill();   // flashlight
  c.restore();
  if (a2 > 0) klabel(c, 'SUPPLIES', 760, 1090, a2, '#ff5a3a', 50);
  [[330, 1010, '1'], [700, 520, '2'], [700, 880, '3']].forEach(([x, y, n], i) => { const a = ease((lt - i*.2*d)/.2); if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = '#f2c230'; c.beginPath(); c.moveTo(x - 30, y + 25); c.lineTo(x, y - 30); c.lineTo(x + 30, y + 25); c.closePath(); c.fill(); text(c, n, x, y + 8, 34, 'Anton', '#111'); c.restore(); });
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function kmapBase(c){
  bg(c, '#0a1420', '#03060b');
  c.strokeStyle = 'rgba(120,170,210,.08)'; c.lineWidth = 2; for (let x = 120; x < 980; x += 60){ c.beginPath(); c.moveTo(x, 380); c.lineTo(x, 1200); c.stroke(); } for (let y = 380; y < 1220; y += 60){ c.beginPath(); c.moveTo(120, y); c.lineTo(960, y); c.stroke(); }
  kpoly(c, KUS, kus, '#1c2a24', 'rgba(170,220,200,.55)');
  c.save(); c.strokeStyle = 'rgba(170,220,200,.35)'; c.setLineDash([8, 8]); c.strokeRect(130, 930, 270, 250); c.restore();
  kpoly(c, KAK, kak, '#1c2a24', 'rgba(170,220,200,.55)');
}
const KP = { anc: () => kak(-149.9, 61.2), chi: () => kus(-87.6, 41.9), vt: () => kus(-73.1, 44.5), ny: () => kus(-75.2, 43.4), tx: () => kus(-94.7, 31.3) };
SC.kmap = (c, p, lt, d) => {
  kmapBase(c);
  if (p.mode === 'kits'){
    // 'hidden around the country': the two places investigators found kits, plus Vermont
    [['ALASKA', KP.anc(), .05], ['NEW YORK', KP.ny(), .3], ['VERMONT', KP.vt(), .55]].forEach(([s, [x, y], at], i) => { const a = ease((lt - at*d)/.2); kpin(c, x, y, a, i < 2 ? '#ff3b30' : '#ffb03a'); klabel(c, s, x + (i == 1 ? -40 : i == 2 ? -10 : 40), y + 34 + (i == 2 ? -95 : 0), a); });
    const a = ease((lt - .7*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(250, 1215, 580, 80); text(c, 'KITS FOUND: AK · NY', 540, 1257, 52, 'VT', '#ff3b30'); c.restore(); }
  }
  if (p.mode === 'route'){
    const [ax, ay] = KP.anc(), [cx, cy] = KP.chi(), [vx, vy] = KP.vt();
    const k1 = ease((lt - .15*d)/(d*.3)), k2 = ease((lt - .55*d)/(d*.3));
    c.save(); c.strokeStyle = '#ffb03a'; c.lineWidth = 5; c.setLineDash([14, 10]);
    if (k1 > 0){ c.beginPath(); c.moveTo(ax, ay); const mx = (ax + cx)/2, my = Math.min(ay, cy) - 260; for (let s = 0; s <= k1; s += .02){ const x = (1-s)*(1-s)*ax + 2*(1-s)*s*mx + s*s*cx, y = (1-s)*(1-s)*ay + 2*(1-s)*s*my + s*s*cy; c.lineTo(x, y); } c.stroke(); }
    c.setLineDash([]); c.strokeStyle = '#ff3b30'; c.lineWidth = 7;
    if (k2 > 0){ c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + (vx - cx)*k2, cy + (vy - cy)*k2); c.stroke(); }
    c.restore();
    kpin(c, ax, ay, ease(lt/.3), '#ffb03a'); klabel(c, 'ALASKA', ax, ay + 34, ease(lt/.3));
    kpin(c, cx, cy, k1 > .95 ? 1 : 0, '#ffb03a'); klabel(c, 'CHICAGO', cx, cy + 34, k1 > .95 ? 1 : 0);
    kpin(c, vx, vy, k2 > .95 ? 1 : 0); klabel(c, 'VERMONT', vx - 20, vy - 70, k2 > .95 ? 1 : 0, '#ff5a3a');
    klabel(c, '✈ FLEW', (ax + cx)/2, Math.min(ay, cy) - 120, k1 > .2 ? 1 : 0, '#ffb03a', 44);
    klabel(c, 'RENTED CAR', (cx + vx)/2, (cy + vy)/2 + 60, k2 > .2 ? 1 : 0, '#ff5a3a', 40);
  }
  if (p.mode === 'end'){
    const r = R(77); for (let i = 0; i < 18; i++){ const [x, y] = kus(-122 + r()*50, 30 + r()*16); const a = ease((lt - (i/18)*.6*d)/.4)*(.35 + .35*Math.sin(lt*2 + i)); klabel(c, '?', x, y, a, '#ff3b30', 60); }
    if (!p.follow){ const a = ease((lt - .55*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.75)'; c.fillRect(170, 1190, 740, 100); text(c, 'MAY NEVER BE KNOWN', 540, 1242, 74, 'VT', '#ff3b30'); c.restore(); } }
    else followBox(c, lt, d);
  }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.khouse = (c, p, lt, d) => {
  bg(c, '#18222e', '#06080b');
  { const g = c.createRadialGradient(820, 420, 10, 820, 420, 300); g.addColorStop(0, 'rgba(220,230,240,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = '#e8eef2'; c.beginPath(); c.arc(820, 420, 38, 0, 7); c.fill(); }
  const r = R(12); for (let i = 0; i < 12; i++) pine(c, r()*W, 1000 + r()*30, 420 + r()*200, '#0f171d');
  c.fillStyle = '#0c1014'; c.fillRect(0, 1000, W, 400);
  // farmhouse silhouette with two warm windows
  c.fillStyle = '#121820'; c.beginPath(); c.moveTo(260, 1010); c.lineTo(260, 760); c.lineTo(540, 560); c.lineTo(820, 760); c.lineTo(820, 1010); c.closePath(); c.fill();
  c.fillStyle = '#0e1318'; c.fillRect(640, 600, 50, 120);
  const fl = .85 + .15*Math.sin(lt*3);
  [[360, 820], [620, 820]].forEach(([x, y]) => { c.save(); c.shadowColor = '#ffb85a'; c.shadowBlur = 40; c.fillStyle = `rgba(255,196,110,${fl})`; c.fillRect(x, y, 100, 110); c.restore(); c.fillStyle = '#121820'; c.fillRect(x + 47, y, 6, 110); c.fillRect(x, y + 52, 100, 6); });
  c.fillStyle = '#1b2026'; c.fillRect(495, 880, 90, 130);
  // two silhouettes in the left window (no faces, just shapes)
  c.fillStyle = 'rgba(40,24,12,.85)'; [[392, 880], [432, 884]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 14, 0, 7); c.fill(); c.fillRect(x - 18, y + 14, 36, 36); });
  // dark car parked at the edge of the road, lights off
  c.fillStyle = '#05070a'; c.beginPath(); c.roundRect(110, 1110, 300, 80, 18); c.fill(); c.beginPath(); c.roundRect(170, 1060, 170, 70, 18); c.fill();
  c.fillStyle = '#000'; c.beginPath(); c.arc(170, 1190, 28, 0, 7); c.arc(350, 1190, 28, 0, 7); c.fill();
  const a = ease((lt - .7*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(230, 1220, 620, 90); text(c, 'CHOSEN AT RANDOM', 540, 1267, 66, 'VT', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.kdig = (c, p, lt, d) => {
  kground(c, 58);
  c.fillStyle = '#0a0705'; c.beginPath(); c.ellipse(540, 1040, 210, 54, 0, 0, 7); c.fill();
  const up = ease((lt - .1*d)/(d*.55));
  c.save(); c.beginPath(); c.rect(0, 0, W, 1040); c.clip(); kbucketShape(c, 540, 1090 - up*170, 1, true); c.restore();
  c.fillStyle = '#3a2a1a'; c.beginPath(); c.ellipse(280, 1080, 150, 70, 0, Math.PI, 0); c.fill();
  kshovel(c, 260, 1060, -.3);
  const a = ease((lt - .82*d)/.15); if (a > 0) stamp(c, 'USED', 540, 560, a, 140, -.12);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.kcard = (c, p, lt, d) => {
  kmapBase(c); c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, 0, W, H);
  // ATM trail across the south toward Texas (dots only)
  const [tx, ty] = KP.tx(); const trail = [kus(-110, 32.2), kus(-108.7, 32.4), kus(-94.4, 30.2), kus(-95.2, 30)];
  trail.forEach(([x, y], i) => { const a = ease((lt - (.1 + i*.08)*d)/.15); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = '#ffb03a'; c.beginPath(); c.arc(x, y, 10, 0, 7); c.fill(); c.restore(); } });
  kpin(c, tx, ty, ease((lt - .45*d)/.2)); klabel(c, 'TEXAS', tx, ty + 36, ease((lt - .45*d)/.2), '#ff5a3a', 44);
  // the stolen debit card (generic, no bank, no name)
  c.save(); c.translate(540, 560); c.rotate(-.06); const s = .9 + .1*ease(lt/.4); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30; const g = c.createLinearGradient(-260, -160, 260, 160); g.addColorStop(0, '#3b4a5e'); g.addColorStop(1, '#1b2330'); c.fillStyle = g; c.beginPath(); c.roundRect(-260, -160, 520, 320, 26); c.fill(); c.shadowBlur = 0;
  c.fillStyle = '#d9b44a'; c.beginPath(); c.roundRect(-200, -70, 80, 60, 8); c.fill();
  text(c, '••••  ••••  ••••  ••••', 0, 50, 40, 'VT', '#e8eef2'); text(c, 'DEBIT', 170, -110, 40, 'Anton', 'rgba(232,238,242,.7)');
  c.restore();
  const st = ease((lt - .62*d)/.18); if (st > 0) stamp(c, 'STOLEN', 540, 560, st, 110, -.14);
  const a = ease((lt - .72*d)/.2); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.75)'; c.fillRect(200, 1210, 680, 90); text(c, 'ARRESTED · MARCH 2012', 540, 1257, 62, 'VT', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.kfiles = (c, p, lt, d) => {
  desk(c);
  for (let i = 0; i < 6; i++){ const col = i % 3, row = Math.floor(i/3), x = 250 + col*290, y = 610 + row*360, a = ease((lt - i*.08*d)/.25); if (a <= 0) continue;
    c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate((i % 2 ? .04 : -.05)); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 20;
    c.fillStyle = '#c9a86a'; c.fillRect(-120, -150, 240, 300); c.fillRect(-120, -175, 100, 30); c.shadowBlur = 0;
    c.fillStyle = '#efe7d2'; c.fillRect(-90, -110, 180, 50); text(c, 'VICTIM', 0, -84, 36, 'Type', '#2a2218');
    const unk = i > 1; text(c, unk ? '?' : '—', 0, 40, unk ? 150 : 80, 'Anton', unk ? '#b01010' : '#2a2218');
    c.restore(); }
  const a = ease((lt - .55*d)/.2); if (a > 0) stamp(c, 'UNIDENTIFIED', 540, 790, a, 96, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
