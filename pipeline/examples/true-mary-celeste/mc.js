// ===== The Mary Celeste (found adrift near the Azores, Dec 1872). True case; no people shown =====
function mcSky(c, night){ if (night) bg(c, '#18233a', '#05080f'); else bg(c, '#77848c', '#3a444b');
  if (night){ const r = R(7); c.fillStyle = 'rgba(220,230,255,.5)'; for (let i = 0; i < 50; i++){ c.beginPath(); c.arc(r()*W, 240 + r()*500, .8 + r()*1.6, 0, 7); c.fill(); } }
  else { c.fillStyle = 'rgba(40,48,54,.35)'; for (let i = 0; i < 5; i++){ c.beginPath(); c.ellipse(120 + i*230, 420 + (i%2)*80, 220, 46, 0, 0, 7); c.fill(); } } }
function mcSea(c, lt, night, y0 = 1000){
  const g = c.createLinearGradient(0, y0, 0, 1400); g.addColorStop(0, night ? '#14213a' : '#3b4a52'); g.addColorStop(1, night ? '#04070d' : '#161e23');
  c.fillStyle = g; c.fillRect(0, y0, W, H - y0);
  c.strokeStyle = night ? 'rgba(150,180,220,.25)' : 'rgba(215,228,232,.32)'; c.lineWidth = 3;
  for (let k = 0; k < 10; k++){ const y = y0 + 18 + k*36; c.beginPath(); for (let x = 0; x <= W; x += 20) c.lineTo(x, y + 6*Math.sin(x*.018 + lt*1.3 + k*1.7)); c.stroke(); } }
function mcBrig(c, x, y, s, rock, night){ // two-masted brigantine, side view, sails partly set and torn
  c.save(); c.translate(x, y); c.rotate(rock); c.scale(s, s);
  const hull = night ? '#0d0f13' : '#2a221c', sail = night ? 'rgba(150,160,175,.55)' : 'rgba(225,218,198,.9)', line = night ? '#0a0b0e' : '#1b1612';
  // masts + bowsprit
  c.strokeStyle = line; c.lineWidth = 12; c.beginPath(); c.moveTo(-120, 0); c.lineTo(-120, -560); c.moveTo(110, 0); c.lineTo(110, -600); c.stroke();
  c.lineWidth = 8; c.beginPath(); c.moveTo(-300, -20); c.lineTo(-470, -120); c.stroke();
  c.lineWidth = 3; c.beginPath(); c.moveTo(-470, -120); c.lineTo(-120, -540); c.moveTo(110, -590); c.lineTo(330, -30); c.moveTo(-120, -540); c.lineTo(110, -580); c.stroke();
  // foremast square sails (one torn, one furled)
  c.fillStyle = sail; c.beginPath(); c.moveTo(-210, -420); c.lineTo(-30, -420); c.lineTo(-20, -300); c.lineTo(-90, -310); c.lineTo(-120, -270); c.lineTo(-220, -300); c.closePath(); c.fill();
  c.fillStyle = sail; c.beginPath(); c.moveTo(-200, -250); c.lineTo(-40, -250); c.lineTo(-30, -130); c.lineTo(-210, -130); c.closePath(); c.fill();
  c.strokeStyle = line; c.lineWidth = 6; c.beginPath(); c.moveTo(-215, -520); c.lineTo(-25, -520); c.stroke(); c.fillStyle = sail; c.fillRect(-205, -530, 170, 16);
  // jib + mainsail (gaff)
  c.fillStyle = sail; c.beginPath(); c.moveTo(-440, -120); c.lineTo(-140, -470); c.lineTo(-150, -60); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(118, -520); c.lineTo(300, -470); c.lineTo(250, -330); c.lineTo(310, -60); c.lineTo(118, -60); c.closePath(); c.fill();
  // hull
  c.fillStyle = hull; c.beginPath(); c.moveTo(-330, -40); c.lineTo(340, -40); c.lineTo(310, 40); c.quadraticCurveTo(0, 90, -280, 40); c.closePath(); c.fill();
  c.fillStyle = night ? '#1a1d22' : '#e3ddcf'; c.fillRect(-320, -32, 650, 8);
  c.restore();
}
SC.mcsea = (c, p, lt, d) => {
  mcSky(c, p.night); const rock = .03*Math.sin(lt*.9);
  if (p.other){ const k = ease(lt/(d*.9)); c.save(); c.globalAlpha = .9; mcBrig(c, 980 - 120*k, 985, .28, .02*Math.sin(lt), p.night); c.restore(); }
  mcBrig(c, p.x || 520, 990 + 8*Math.sin(lt*1.1), p.s || .95, rock, p.night);
  mcSea(c, lt, p.night);
  if (p.boat){ const k = ease(lt/d); c.fillStyle = '#07090c'; c.save(); c.translate(860 - 60*k, 1110); c.beginPath(); c.moveTo(-60, 0); c.lineTo(60, 0); c.lineTo(45, 20); c.lineTo(-45, 20); c.closePath(); c.fill(); c.restore(); }
  if (p.qs){ const a = ease((lt - (p.qsAt ?? .4)*d)/.4); c.save(); c.globalAlpha = a; text(c, '?', 330, 560, 150, 'Anton', '#ff3b30'); text(c, '?', 790, 520, 110, 'Anton', '#ff3b30'); c.restore(); }
  if (p.name){ const a = ease((lt - (p.nameAt ?? .3)*d)/.3); lbl(c, 'THE MARY CELESTE', 540, 1150, 86, '#f1efe8', a); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 1150, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1120, ease((lt - (p.stampAt ?? .5)*d)/.18), p.stampSize || 86, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
SC.mcmap = (c, p, lt, d) => { // old sea chart: New York -> Azores -> Genoa
  desk(c);
  c.save(); c.translate(540, 780); c.rotate(-.02); const z = .96 + .05*lt/d; c.scale(z, z);
  paper(c, 0, 0, 900, 820, 0, '#e2d3ad');
  c.fillStyle = 'rgba(120,90,50,.18)'; c.fillRect(-450, -410, 900, 820);
  c.strokeStyle = 'rgba(90,70,40,.25)'; c.lineWidth = 2; for (let i = -400; i <= 400; i += 100){ c.beginPath(); c.moveTo(i, -410); c.lineTo(i, 410); c.stroke(); c.beginPath(); c.moveTo(-450, i); c.lineTo(450, i); c.stroke(); }
  c.fillStyle = '#b9a473'; // land: America (left), Europe/Africa (right)
  c.beginPath(); c.moveTo(-450, -410); c.lineTo(-330, -410); c.lineTo(-300, -250); c.lineTo(-360, -120); c.lineTo(-340, 60); c.lineTo(-450, 200); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(450, -410); c.lineTo(300, -410); c.lineTo(260, -250); c.lineTo(310, -140); c.lineTo(270, -40); c.lineTo(300, 120); c.lineTo(340, 410); c.lineTo(450, 410); c.closePath(); c.fill();
  text(c, 'ATLANTIC OCEAN', 0, 250, 46, 'Type', 'rgba(60,45,25,.55)');
  const NY = [-330, -150], AZ = [90, -30], GE = [330, -260];
  c.fillStyle = '#5a3c1c'; for (const [x, y] of [[70, -40], [95, -20], [115, -35]]){ c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill(); }
  text(c, 'AZORES', 95, 30, 36, 'Type', '#3a2a14'); text(c, 'NEW YORK', -300, -195, 34, 'Type', '#3a2a14', 'left'); text(c, 'GENOA', 330, -310, 34, 'Type', '#3a2a14');
  c.fillStyle = '#111'; for (const [x, y] of [NY, GE]){ c.beginPath(); c.arc(x, y, 12, 0, 7); c.fill(); }
  // planned route (dashed, grey) and sailed route (red)
  c.setLineDash([16, 14]); c.strokeStyle = 'rgba(40,30,20,.5)'; c.lineWidth = 5; c.beginPath(); c.moveTo(...NY); c.quadraticCurveTo(-100, -40, AZ[0], AZ[1]); c.quadraticCurveTo(260, -60, GE[0], GE[1]); c.stroke(); c.setLineDash([]);
  const k = ease((lt - (p.routeAt ?? .1)*d)/(d*.5)) * (p.routeTo || 1);
  if (k > 0){ c.strokeStyle = '#c01810'; c.lineWidth = 8; c.beginPath(); const N = 40; for (let i = 0; i <= N*k; i++){ const u = i/N; const x = (1-u)*(1-u)*NY[0] + 2*(1-u)*u*(-100) + u*u*AZ[0], y = (1-u)*(1-u)*NY[1] + 2*(1-u)*u*(-40) + u*u*AZ[1]; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  if (p.found){ const a = ease((lt - p.found*d)/.2); if (a > 0){ c.save(); c.globalAlpha = a; c.strokeStyle = '#c01810'; c.lineWidth = 10; c.beginPath(); c.moveTo(150, -10); c.lineTo(210, 50); c.moveTo(210, -10); c.lineTo(150, 50); c.stroke(); c.restore(); text(c, 'FOUND ADRIFT', 180, 100, 40, 'Anton', '#a01010'); } }
  c.restore();
  if (p.label) lbl(c, p.label, 540, p.labelY || 1240, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function mcPlanks(c){ bg(c, '#56606a', '#2b3036');
  // deck in perspective
  c.fillStyle = '#6b5a44'; c.beginPath(); c.moveTo(380, 520); c.lineTo(700, 520); c.lineTo(1080, 1320); c.lineTo(0, 1320); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,22,14,.5)'; c.lineWidth = 3; for (let i = 0; i <= 12; i++){ const u = i/12; c.beginPath(); c.moveTo(380 + 320*u, 520); c.lineTo(1080*u, 1320); c.stroke(); }
  // rails
  c.strokeStyle = '#2d241a'; c.lineWidth = 18; c.beginPath(); c.moveTo(380, 500); c.lineTo(0, 1200); c.moveTo(700, 500); c.lineTo(1080, 1200); c.stroke();
  // mast + wheel at the far end
  c.fillStyle = '#2d241a'; c.fillRect(520, 300, 36, 300);
  c.strokeStyle = '#2d241a'; c.lineWidth = 7; c.beginPath(); c.arc(640, 500, 40, 0, 7); c.stroke(); for (let i = 0; i < 8; i++){ const a = i*Math.PI/4; c.beginPath(); c.moveTo(640, 500); c.lineTo(640 + 56*Math.cos(a), 500 + 56*Math.sin(a)); c.stroke(); }
}
SC.mcdeck = (c, p, lt, d) => {
  mcPlanks(c);
  // open cargo hatch
  c.fillStyle = '#0b0805'; c.beginPath(); c.moveTo(430, 820); c.lineTo(650, 820); c.lineTo(690, 960); c.lineTo(390, 960); c.closePath(); c.fill();
  c.fillStyle = '#4e3f2e'; c.save(); c.translate(780, 900); c.rotate(.25); c.fillRect(-90, -40, 180, 80); c.restore();
  // lifeboat chocks (where the boat should sit)
  c.fillStyle = '#3a2e20'; c.fillRect(300, 1110, 60, 50); c.fillRect(720, 1110, 60, 50);
  if (p.boatGone){ const a = ease((lt - (p.boatAt ?? .3)*d)/.3); c.save(); c.globalAlpha = a; c.setLineDash([22, 16]); c.strokeStyle = '#ff3b30'; c.lineWidth = 8;
    c.beginPath(); c.moveTo(250, 1100); c.quadraticCurveTo(540, 1180, 830, 1100); c.quadraticCurveTo(540, 1010, 250, 1100); c.stroke(); c.restore(); }
  c.fillStyle = `rgba(0,0,0,${.15 + .05*Math.sin(lt*2)})`; c.fillRect(0, 0, W, H);
  if (p.label) lbl(c, p.label, 540, p.labelY || 1240, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 700, ease((lt - (p.stampAt ?? .5)*d)/.18), 90, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mccabin = (c, p, lt, d) => { // crew quarters below deck
  bg(c, '#3a2c1e', '#120c07');
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 4; for (let y = 320; y < 1300; y += 60){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  const sw = .35*Math.sin(lt*1.2); // swinging lantern
  c.save(); c.translate(540, 300); c.rotate(sw*.3); c.strokeStyle = '#111'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 120); c.stroke(); c.fillStyle = '#2a2a2a'; c.fillRect(-28, 120, 56, 70); c.fillStyle = 'rgba(255,200,120,.9)'; c.fillRect(-18, 130, 36, 48); c.restore();
  const g = c.createRadialGradient(540 + 60*sw, 470, 20, 540, 600, 700); g.addColorStop(0, 'rgba(255,200,120,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  // bunks with blankets
  for (const y of [560, 820]){ c.fillStyle = '#4a3522'; c.fillRect(80, y, 420, 30); c.fillRect(80, y - 140, 24, 170); c.fillStyle = '#6d6a5a'; c.fillRect(104, y - 36, 396, 36); c.fillStyle = '#d9d0b8'; c.beginPath(); c.ellipse(150, y - 44, 40, 16, 0, 0, 7); c.fill(); }
  // sea chest
  c.fillStyle = '#5a3a1e'; c.fillRect(620, 1000, 300, 160); c.fillStyle = '#3c2612'; c.fillRect(610, 980, 320, 40); c.fillStyle = '#b08a3a'; c.fillRect(755, 1030, 30, 36);
  // coat on peg + boots
  c.fillStyle = '#1e2a33'; c.beginPath(); c.moveTo(800, 470); c.lineTo(870, 500); c.lineTo(890, 800); c.lineTo(710, 800); c.lineTo(730, 500); c.closePath(); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(800, 462, 12, 0, 7); c.fill();
  c.fillStyle = '#17120d'; c.fillRect(160, 1080, 60, 120); c.fillRect(160, 1170, 110, 34); c.fillRect(260, 1080, 60, 120); c.fillRect(260, 1170, 110, 34);
  (p.checks || []).forEach(([s, at], i) => { const a = ease((lt - at*d)/.25); if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.75)'; c.fillRect(150, 1090, 780, 120);
    text(c, '✓ ' + s, 540, 1152, 64, 'Anton', '#7dff9a'); c.restore(); });
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function mcBarrel(c, x, y, s){ c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#6a4424'; c.beginPath(); c.ellipse(0, 0, 70, 95, 0, 0, 7); c.fill();
  c.strokeStyle = '#2b2b2b'; c.lineWidth = 9; c.beginPath(); c.ellipse(0, 0, 66, 34, 0, 0, 7); c.stroke();
  c.fillStyle = '#4a2e16'; c.beginPath(); c.ellipse(0, 0, 54, 26, 0, 0, 7); c.fill(); c.restore(); }
SC.mchold = (c, p, lt, d) => { // cargo hold full of barrels (ends facing us)
  bg(c, '#2c241b', '#0a0805');
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) mcBarrel(c, 150 + k*156 + (r%2)*40, 520 + r*170, .95);
  const g = c.createRadialGradient(540, 300, 20, 540, 600, 900); g.addColorStop(0, 'rgba(240,220,170,.25)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  if (p.water){ const k = ease((lt - .2*d)/(d*.6)); const y = 1300 - 330*k; c.fillStyle = 'rgba(30,60,80,.72)'; c.beginPath(); c.moveTo(0, 1320); for (let x = 0; x <= W; x += 20) c.lineTo(x, y + 8*Math.sin(x*.02 + lt*2)); c.lineTo(W, 1320); c.closePath(); c.fill();
    c.strokeStyle = '#ff3b30'; c.lineWidth = 6; c.beginPath(); c.moveTo(960, 1300); c.lineTo(960, y); c.moveTo(930, y); c.lineTo(990, y); c.stroke(); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 1240, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.label2) lbl(c, p.label2, 540, p.label2Y || 1100, p.labelSize || 56, '#f1efe8', ease((lt - (p.label2At ?? .2)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mcinstr = (c, p, lt, d) => { // captain's chart table: empty outlines where the instruments were
  desk(c);
  paper(c, 540, 780, 820, 600, -.03, '#d9c9a0');
  c.save(); c.translate(540, 780); c.rotate(-.03); c.strokeStyle = 'rgba(80,60,30,.35)'; c.lineWidth = 2; for (let i = -380; i < 400; i += 60){ c.beginPath(); c.moveTo(i, -300); c.lineTo(i, 300); c.stroke(); } c.restore();
  const a = ease((lt - .2*d)/.3); c.save(); c.globalAlpha = a; c.setLineDash([18, 12]); c.strokeStyle = '#ff3b30'; c.lineWidth = 7;
  // sextant outline (arc + frame)
  c.beginPath(); c.moveTo(380, 600); c.lineTo(280, 860); c.arc(380, 600, 280, Math.PI*.62, Math.PI*.38, true); c.closePath(); c.stroke();
  // box outline (instrument case)
  c.strokeRect(620, 650, 240, 220); c.beginPath(); c.arc(740, 760, 70, 0, 7); c.stroke(); c.restore();
  stamp(c, 'MISSING', 540, 1150, ease((lt - (p.stampAt ?? .45)*d)/.18), 100, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.mcslate = (c, p, lt, d) => { // the ship's log slate
  desk(c);
  c.save(); c.translate(540, 780); c.rotate(-.025); const z = .97 + .04*lt/d; c.scale(z, z);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.fillStyle = '#8a6a40'; c.fillRect(-380, -420, 760, 840); c.shadowBlur = 0;
  c.fillStyle = '#23272a'; c.fillRect(-340, -380, 680, 760);
  text(c, 'LOG', 0, -310, 54, 'Hand', 'rgba(235,235,230,.85)');
  const L = ['. . .', '. . .', 'Nov 25'];
  L.forEach((s, i) => { const a = ease((lt - (.05 + i*.08)*d)/.2); c.globalAlpha = a; text(c, s, -280, -200 + i*100, 66, 'Hand', 'rgba(240,240,235,.9)', 'left'); c.globalAlpha = 1; });
  c.restore();
  const r = ease((lt - .3*d)/.2); if (r > 0){ c.save(); c.globalAlpha = r; c.strokeStyle = '#ff3b30'; c.lineWidth = 8; c.beginPath(); c.ellipse(400, 780, 200, 70, -.03, 0, 7); c.stroke(); c.restore(); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 1000, p.labelSize || 70, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
