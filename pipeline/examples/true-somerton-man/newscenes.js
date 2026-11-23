// ===== Somerton Man (Tamam Shud) scenes =====
function seawall(c, night){
  // sky
  const g = c.createLinearGradient(0, 0, 0, 640);
  if (night){ g.addColorStop(0,'#05070f'); g.addColorStop(1,'#141b2c'); } else { g.addColorStop(0,'#1d2433'); g.addColorStop(.6,'#5a4a55'); g.addColorStop(1,'#d58a5a'); }
  c.fillStyle = g; c.fillRect(0, 0, W, 640);
  if (night){ const r = R(4); for (let i=0;i<50;i++){ c.fillStyle = `rgba(230,235,255,${.2+.5*r()})`; c.fillRect(r()*W, 260 + r()*320, 2, 2); } }
  // esplanade railing on top of the wall
  c.fillStyle = night ? '#0c0f16' : '#2a2626'; c.fillRect(0, 600, W, 14);
  for (let x = 10; x < W; x += 70) c.fillRect(x, 560, 8, 50);
  c.fillRect(0, 556, W, 8);
  // stone wall
  c.fillStyle = night ? '#1a1d24' : '#4d4741'; c.fillRect(0, 614, W, 330);
  c.strokeStyle = night ? 'rgba(0,0,0,.45)' : 'rgba(0,0,0,.3)'; c.lineWidth = 4;
  for (let r = 0; r < 6; r++){ const y = 614 + r*55; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
    for (let x = (r%2)*70; x < W; x += 140){ c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 55); c.stroke(); } }
  // steps down to the sand on the right
  for (let k = 0; k < 6; k++){ c.fillStyle = night ? '#232733' : '#625a52'; c.fillRect(880 + k*0, 614 + k*55, 200, 12); }
  // sand
  const s = c.createLinearGradient(0, 940, 0, 1300); s.addColorStop(0, night ? '#2a2a2c' : '#9b8467'); s.addColorStop(1, night ? '#0e0e10' : '#4a3b2b');
  c.fillStyle = s; c.fillRect(0, 940, W, 980);
  if (!night){ const h = c.createRadialGradient(540, 640, 20, 540, 640, 700); h.addColorStop(0,'rgba(255,170,100,.25)'); h.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle = h; c.fillRect(0, 0, W, 1300); }
  if (night){ // street lamp glow on the esplanade
    c.fillStyle = '#0c0f16'; c.fillRect(196, 330, 10, 230); c.fillRect(190, 324, 60, 10);
    const l = c.createRadialGradient(245, 345, 5, 245, 345, 260); l.addColorStop(0,'rgba(255,214,140,.6)'); l.addColorStop(1,'rgba(255,214,140,0)'); c.fillStyle = l; c.fillRect(0, 100, 600, 700);
    c.fillStyle = '#ffe3a8'; c.beginPath(); c.arc(245, 345, 12, 0, 7); c.fill(); }
}
function lyingMan(c, x, y, s, arm=0, col='#060607'){
  // featureless silhouette, back against the wall, legs out, feet crossed (no face)
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.strokeStyle = col; c.lineCap = 'round';
  c.beginPath(); c.ellipse(0, -150, 42, 50, -.25, 0, 7); c.fill();                       // head against the wall
  c.beginPath(); c.moveTo(-40, -105); c.quadraticCurveTo(-70, -20, -40, 40); c.lineTo(110, 70); c.lineTo(120, -10); c.quadraticCurveTo(60, -100, 30, -110); c.closePath(); c.fill(); // torso (suit)
  c.lineWidth = 58; c.beginPath(); c.moveTo(40, 45); c.lineTo(330, 70); c.stroke();     // thighs/legs
  c.lineWidth = 50; c.beginPath(); c.moveTo(320, 68); c.lineTo(470, 80); c.stroke();
  c.beginPath(); c.ellipse(495, 70, 34, 18, -.3, 0, 7); c.ellipse(505, 92, 34, 18, .3, 0, 7); c.fill(); // crossed feet
  // right arm: rests on the sand; arm (0..1) lifts it
  c.save(); c.translate(20, -60); c.rotate(-1.9*arm + 0.35); c.lineWidth = 34; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 150); c.stroke(); c.restore();
  c.restore();
}
SC.beach = (c, p, lt, d) => {
  seawall(c, p.night);
  let arm = 0;
  if (p.armAt != null){ const a = lt/d; arm = a < p.armAt ? 0 : a < p.armAt + .12 ? ease((a - p.armAt)/.12) : a < p.armAt + .22 ? 1 : Math.max(0, 1 - (a - p.armAt - .22)/.06); }
  lyingMan(c, 300, 1000, 1.05, arm);
  if (p.couple){ // a couple watching from the esplanade
    const a = ease((lt - .1)/.4); c.save(); c.globalAlpha = a; c.fillStyle = '#05060a';
    for (const [x, h] of [[700, 1], [760, .92]]){ c.beginPath(); c.arc(x, 445 + (1-h)*60, 22*h, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - 26*h, 470 + (1-h)*60, 52*h, 90*h, 12); c.fill(); }
    c.restore(); }
  if (p.marker){ const a = ease((lt - .3)/.3); c.save(); c.globalAlpha = a; c.fillStyle = '#ffcf3a'; c.beginPath(); c.moveTo(860, 1120); c.lineTo(820, 1180); c.lineTo(900, 1180); c.closePath(); c.fill(); text(c, '1', 860, 1160, 40, 'Anton', '#111'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, p.tagY || 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, p.tag2Y || 1240, ease((lt - (p.tag2At || .3)*d)/.3), p.tag2Col || '#ff5a3a');
  if (p.follow) followBox(c, lt, d);
};
function fabric(c, col1, col2){
  const g = c.createLinearGradient(0, 200, 0, 1300); g.addColorStop(0, col1); g.addColorStop(1, col2); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 2; for (let x = -800; x < W; x += 14){ c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 800, 1400); c.stroke(); }
}
SC.pocket = (c, p, lt, d) => {
  fabric(c, '#6a4e36', '#2c1f14');
  // trouser waistband + main pocket opening
  c.fillStyle = '#3c2a1b'; c.fillRect(0, 300, W, 90); c.strokeStyle = 'rgba(230,200,150,.35)'; c.setLineDash([14, 10]); c.lineWidth = 4;
  c.beginPath(); c.moveTo(0, 395); c.lineTo(W, 395); c.stroke(); c.setLineDash([]);
  c.fillStyle = '#120c07'; c.beginPath(); c.moveTo(120, 400); c.quadraticCurveTo(300, 720, 620, 760); c.lineTo(640, 740); c.quadraticCurveTo(320, 690, 150, 400); c.fill();
  // the small hidden fob pocket, stitched
  const fx = 640, fy = 560;
  c.strokeStyle = 'rgba(240,210,160,.7)'; c.lineWidth = 5; c.setLineDash([12, 9]); c.strokeRect(fx, fy, 260, 230); c.setLineDash([]);
  c.fillStyle = '#0d0905'; c.fillRect(fx + 20, fy + 10, 220, 22);
  const hl = ease((lt - .05*d)/.35); if (hl > 0){ c.strokeStyle = `rgba(255,59,48,${hl})`; c.lineWidth = 7; c.beginPath(); c.ellipse(fx + 130, fy + 115, 190, 165, 0, 0, 7*hl); c.stroke(); }
  // rolled-up scrap slides out, then unrolls
  const out = ease((lt - (p.outAt ?? .25)*d)/.5), un = ease((lt - (p.unAt ?? .45)*d)/.5);
  if (out > 0){
    const cx = fx + 130 - 330*un*0 , cy = fy + 20 - 200*out;
    c.save(); c.translate(540*un + cx*(1-un), (cy)*(1-un) + 560*un);
    const w = 90 + 560*un, h = 46 + 90*un; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30;
    c.fillStyle = '#efe7cf'; c.fillRect(-w/2, -h/2, w, h); c.shadowBlur = 0;
    if (un < .6){ c.fillStyle = 'rgba(0,0,0,.18)'; for (let k=0;k<4;k++) c.fillRect(-w/2 + k*w/4, -h/2, 3, h); }
    if (un > .5){ c.globalAlpha = (un - .5)*2; c.font = 'italic 84px Georgia'; c.fillStyle = '#1a1a1a'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Tamám Shud', 0, 6); }
    c.restore();
  }
  if (p.mean){ const a = ease((lt - p.mean*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, '"IT IS ENDED"', 540, 760, 100, 'Anton', '#ff3b30'); c.restore(); } }
  if (p.tag) tag(c, p.tag, 540, p.tagY || 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, p.tag2Y || 1180, ease((lt - (p.tag2At || .3)*d)/.3), p.tag2Col || '#ff5a3a');
};
SC.noid = (c, p, lt, d) => {
  desk(c);
  // jacket inside lining with the maker's label cut out
  c.save(); c.translate(540, 700); c.rotate(-.04);
  c.fillStyle = '#3d3a3e'; c.beginPath(); c.moveTo(-420, -340); c.lineTo(420, -340); c.lineTo(380, 380); c.lineTo(-380, 380); c.closePath(); c.fill();
  c.fillStyle = '#5b4a5c'; c.fillRect(-330, -300, 660, 640);                   // satin lining
  c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 3; for (let x = -320; x < 330; x += 30){ c.beginPath(); c.moveTo(x, -300); c.lineTo(x, 340); c.stroke(); }
  c.fillStyle = '#2a242b'; c.beginPath(); c.moveTo(-200, -300); c.quadraticCurveTo(0, -200, 200, -300); c.lineTo(200, -330); c.lineTo(-200, -330); c.fill(); // collar
  // empty label spot with frayed stitches
  c.strokeStyle = '#e8e2cf'; c.setLineDash([10, 8]); c.lineWidth = 4; c.strokeRect(-150, -190, 300, 110); c.setLineDash([]);
  c.strokeStyle = '#e8e2cf'; c.lineWidth = 3; for (let k = 0; k < 9; k++){ const x = -140 + k*35; c.beginPath(); c.moveTo(x, -190); c.lineTo(x + 6, -205); c.stroke(); }
  const cut = ease((lt - (p.cutAt ?? .62)*d)/.3);
  if (cut > 0){ c.globalAlpha = cut; text(c, 'LABEL', 0, -150, 44, 'Anton', '#ff8a7a'); text(c, 'CUT OUT', 0, -105, 34, 'Anton', '#ff8a7a'); c.globalAlpha = 1; }
  c.restore();
  // wallet / ID crossed out
  [['WALLET', 300, .05], ['ID', 780, .3]].forEach(([s, x, at]) => { const a = ease((lt - at*d)/.25); if (a <= 0) return;
    c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(x - 190, 930, 380, 140); text(c, s, x, 1002, 80, 'Anton', '#f1efe8');
    c.strokeStyle = '#ff3b30'; c.lineWidth = 14; c.beginPath(); c.moveTo(x - 150, 950); c.lineTo(x + 150, 1050); c.moveTo(x + 150, 950); c.lineTo(x - 150, 1050); c.stroke(); c.restore(); });
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
SC.report = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 720); c.rotate(.03); const k = .95 + .05*lt/d; c.scale(k, k);
  paper(c, 0, 0, 780, 900, 0, '#ece6d6');
  text(c, 'POST-MORTEM REPORT', 0, -370, 54, 'Type', '#111'); text(c, 'ADELAIDE · DECEMBER 1948', 0, -315, 34, 'Type', '#444');
  c.fillStyle = '#111'; c.fillRect(-330, -285, 660, 4);
  const rows = [['NAME:', 'UNKNOWN', '#111', .0], ['NATURAL CAUSES:', 'NO', '#a01010', .25], ['POISON FOUND:', 'NONE', '#a01010', .6]];
  rows.forEach(([a, b, col, at], i) => { const y = -190 + i*120, s = ease((lt - at*d)/.25);
    text(c, a, -320, y, 40, 'Type', '#222', 'left'); c.globalAlpha = s; text(c, b, 330, y, 48, 'Type', col, 'right'); c.globalAlpha = 1;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-320, y + 34, 650, 2); });
  const r = R(12); for (let i = 0; i < 6; i++){ c.fillStyle = 'rgba(30,30,30,.55)'; c.fillRect(-320, 200 + i*36, 420 + r()*200, 10); }
  c.restore();
  if (p.stamp){ const a = ease((lt - p.stamp*d)/.2); if (a > 0){ c.save(); c.globalAlpha = a; c.translate(560, 1060); c.rotate(-.14); c.scale(1.4 - .4*a, 1.4 - .4*a); c.strokeStyle = '#c0281e'; c.lineWidth = 10; c.strokeRect(-280, -70, 560, 140); text(c, 'CAUSE: UNKNOWN', 0, 6, 70, 'Anton', '#c0281e'); c.restore(); } }
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), '#d7fbe9');
};
const CODE = ['WRGOABABD', 'MLIAOI', 'WTBIMPANETP', 'MLIABOAIAQC', 'ITTMTSAMSTGAB'];
SC.book = (c, p, lt, d) => {
  desk(c);
  c.save(); c.translate(540, 730);
  // open book: two pages
  c.fillStyle = '#4a1f18'; c.beginPath(); c.roundRect(-440, -400, 880, 800, 18); c.fill();
  paper(c, -212, 0, 410, 760, 0, '#e8dfc4'); paper(c, 212, 0, 410, 760, 0, '#e8dfc4');
  c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-6, -380, 12, 760);
  if (p.mode !== 'code'){
    text(c, 'RUBAIYAT', -212, -300, 52, 'Type', '#3a1a10'); text(c, 'OF OMAR KHAYYAM', -212, -250, 30, 'Type', '#3a1a10');
    const r = R(21); for (let i = 0; i < 12; i++){ c.fillStyle = 'rgba(40,30,20,.5)'; c.fillRect(-380, -180 + i*36, 260 + r()*70, 8); }
    for (let i = 0; i < 9; i++){ c.fillStyle = 'rgba(40,30,20,.5)'; c.fillRect(45, -320 + i*36, 260 + r()*70, 8); }
    // torn-out hole at the bottom of the last page
    c.fillStyle = '#4a1f18'; c.beginPath(); c.moveTo(60, 150); c.lineTo(370, 140); c.lineTo(375, 255); c.lineTo(250, 262); c.lineTo(180, 250); c.lineTo(70, 262); c.closePath(); c.fill();
    const hl = ease((lt - (p.hlAt ?? .3)*d)/.3); if (hl > 0){ c.strokeStyle = `rgba(255,59,48,${hl})`; c.lineWidth = 6; c.setLineDash([16, 10]); c.strokeRect(40, 120, 355, 160); c.setLineDash([]); }
    if (p.match){ const m = ease((lt - p.match*d)/.5); c.save(); c.translate(217, 200 + 380*(1 - m)); c.rotate(.2*(1 - m)); c.fillStyle = '#efe7cf'; c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 20; c.fillRect(-150, -55, 300, 110); c.shadowBlur = 0;
      c.font = 'italic 46px Georgia'; c.fillStyle = '#1a1a1a'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Tamám Shud', 0, 4); c.restore();
      if (m >= 1){ text(c, '✓ MATCH', 217, 330, 50, 'Anton', '#ff3b30'); } }
  } else {
    // back of the book under UV light, with the pencil code
    const uv = c.createRadialGradient(212, 0, 30, 212, 0, 420); uv.addColorStop(0, 'rgba(150,90,255,.45)'); uv.addColorStop(1, 'rgba(60,20,120,.15)'); c.fillStyle = uv; c.fillRect(7, -380, 410, 760);
    c.fillStyle = 'rgba(40,10,80,.35)'; c.fillRect(-417, -380, 410, 760);
    const shown = Math.floor(clamp((lt - (p.codeAt ?? .1)*d)/(d*.45), 0, 1)*5.99);
    CODE.forEach((l, i) => { if (i >= shown) return; const y = -230 + i*95; text(c, l, 212, y, l.length > 11 ? 40 : 46, 'Type', '#f4ecff');
      if (i === 1){ c.strokeStyle = '#f4ecff'; c.lineWidth = 4; c.beginPath(); c.moveTo(212 - 110, y); c.lineTo(212 + 110, y); c.stroke(); } });
    if (shown > 2){ c.strokeStyle = '#f4ecff'; c.lineWidth = 3; c.beginPath(); c.moveTo(80, 33); c.lineTo(345, 33); c.moveTo(80, 43); c.lineTo(345, 43); c.stroke(); }
    c.fillStyle = 'rgba(244,236,255,.35)'; c.fillRect(-380, 250, 300, 6); text(c, 'PHONE NO. (HIDDEN)', -230, 220, 28, 'Type', 'rgba(244,236,255,.6)');
  }
  c.restore();
  if (p.stamp){ const a = ease((lt - p.stamp*d)/.2); if (a > 0){ c.save(); c.globalAlpha = a; c.translate(540, 1170); c.rotate(-.1); c.scale(1.4 - .4*a, 1.4 - .4*a); c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(-290, -70, 580, 140); c.strokeStyle = '#c0281e'; c.lineWidth = 10; c.strokeRect(-290, -70, 580, 140); text(c, p.stampText || 'NEVER DECODED', 0, 6, 74, 'Anton', '#ff3b30'); c.restore(); } }
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.oldcar = (c, p, lt, d) => {
  // 1940s open-top car parked by the beach at night; a small book on the rear floor
  bg(c, '#0b111c', '#04060a');
  c.fillStyle = '#16202e'; c.fillRect(0, 560, W, 120);                                 // sea
  c.strokeStyle = 'rgba(180,200,230,.15)'; c.lineWidth = 3; for (let i = 0; i < 6; i++){ c.beginPath(); c.moveTo(0, 580 + i*18); c.lineTo(W, 580 + i*18 + Math.sin(lt + i)*3); c.stroke(); }
  c.fillStyle = '#121418'; c.fillRect(0, 680, W, 600);                                 // road
  { const l = c.createRadialGradient(880, 400, 5, 880, 400, 420); l.addColorStop(0,'rgba(255,214,140,.5)'); l.addColorStop(1,'rgba(255,214,140,0)'); c.fillStyle = l; c.fillRect(300, 0, 780, 1100); }
  c.fillStyle = '#0a0c10'; c.fillRect(880, 390, 10, 520); c.fillStyle = '#ffe3a8'; c.beginPath(); c.arc(885, 390, 13, 0, 7); c.fill();
  c.save(); c.translate(540, 900);
  c.fillStyle = '#23262d';
  c.beginPath(); c.moveTo(-430, 40); c.quadraticCurveTo(-440, -60, -330, -80); c.lineTo(-150, -90); c.lineTo(-60, -150); c.lineTo(60, -150); c.lineTo(110, -90); c.lineTo(330, -80); c.quadraticCurveTo(440, -60, 430, 40); c.lineTo(430, 90); c.lineTo(-430, 90); c.closePath(); c.fill();
  c.strokeStyle = '#8a8f99'; c.lineWidth = 6; c.beginPath(); c.moveTo(-60, -150); c.lineTo(60, -150); c.stroke();  // windscreen frame top
  c.fillStyle = '#0f1013'; c.fillRect(-320, -80, 160, 60);                              // rear foot well (open top)
  c.fillStyle = '#0c0d10'; for (const x of [-280, 280]){ c.beginPath(); c.arc(x, 90, 78, 0, 7); c.fill(); c.fillStyle = '#6d717a'; c.beginPath(); c.arc(x, 90, 30, 0, 7); c.fill(); c.fillStyle = '#0c0d10'; }
  c.fillStyle = '#ffe9b0'; c.beginPath(); c.ellipse(420, -20, 16, 22, 0, 0, 7); c.fill();
  // the book
  c.fillStyle = '#7a2a1e'; c.fillRect(-275, -70, 70, 44); c.fillStyle = '#e8dfc4'; c.fillRect(-275, -30, 70, 6);
  const hl = ease((lt - .35*d)/.35); if (hl > 0){ c.strokeStyle = `rgba(255,59,48,${hl})`; c.lineWidth = 7; c.beginPath(); c.ellipse(-240, -48, 110, 80, 0, 0, 7*hl); c.stroke(); }
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1220, ease((lt - (p.tag2At || .3)*d)/.3), p.tag2Col || '#ff5a3a');
};
SC.dna2 = (c, p, lt, d) => {
  bg(c, '#0e141c', '#04060a');
  c.save(); c.translate(540, 760);
  c.fillStyle = '#1b1f26'; c.beginPath(); c.roundRect(-430, -330, 860, 560, 26); c.fill();
  c.fillStyle = '#eef2f5'; c.beginPath(); c.roundRect(-400, -300, 800, 500, 12); c.fill();
  c.fillStyle = '#2d6a4f'; c.fillRect(-400, -300, 800, 70); text(c, 'DNA · FAMILY TREE MATCH', 0, -262, 40, 'Anton', '#fff');
  for (let i=0;i<22;i++){ const y = -200 + i*16, ph = i*.55 + lt*2.5, a = Math.sin(ph)*90;
    c.strokeStyle = 'rgba(40,60,80,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-200 - a, y); c.lineTo(-200 + a, y); c.stroke();
    c.fillStyle = '#2d6a4f'; c.beginPath(); c.arc(-200 - a, y, 7, 0, 7); c.fill(); c.fillStyle = '#c0392b'; c.beginPath(); c.arc(-200 + a, y, 7, 0, 7); c.fill(); }
  text(c, 'SAMPLE: HAIR', 150, -170, 34, 'Anton', '#333'); text(c, 'FROM PLASTER CAST', 150, -128, 26, 'Type', '#666');
  const pr = clamp(lt/(d*.7), 0, 1); c.fillStyle = '#d0d6dc'; c.fillRect(-20, -60, 340, 34); c.fillStyle = '#2d6a4f'; c.fillRect(-20, -60, 340*pr, 34);
  text(c, pr < 1 ? `MATCHING ${Math.round(pr*100)}%` : 'NAME FOUND', 150, 10, 32, 'Anton', pr < 1 ? '#333' : '#c0392b');
  if (pr >= 1){ text(c, 'CARL WEBB', 150, 100, 64, 'Anton', '#c0392b'); }
  c.fillStyle = '#2a2e35'; c.beginPath(); c.moveTo(-500, 230); c.lineTo(500, 230); c.lineTo(560, 300); c.lineTo(-560, 300); c.fill();
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 300, ease((lt - (p.tagAt||0)*d)/.3), '#d7fbe9');
  if (p.tag2) tag(c, p.tag2, 540, 1180, ease((lt - (p.tag2At || .5)*d)/.3), p.tag2Col || '#ff5a3a');
};
