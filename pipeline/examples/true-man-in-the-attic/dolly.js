// ===== The man in the attic: Otto Sanhuber & Dolly Oesterreich (Milwaukee 1913 / Los Angeles 1922-1930). True case; drawn props, silhouettes only =====
function doSil(c, x, y, s, col = '#07080a', sit = false){ // featureless full-figure silhouette
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col;
  c.beginPath(); c.ellipse(0, -150, 34, 42, 0, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-70, 40); c.quadraticCurveTo(-72, -90, -24, -104); c.lineTo(24, -104); c.quadraticCurveTo(72, -90, 70, 40); c.closePath(); c.fill();
  if (sit){ c.fillRect(-60, 30, 130, 40); c.fillRect(40, 30, 34, 120); } else { c.fillRect(-50, 30, 40, 170); c.fillRect(10, 30, 40, 170); }
  c.restore();
}
function doHouse(c, x, y, s, o = {}){ // 1920s two-storey house with a small attic window in the gable
  c.save(); c.translate(x, y); c.scale(s, s);
  const wall = o.day ? '#8f8a7c' : '#2a2c30', roof = o.day ? '#4a3a32' : '#141518';
  c.fillStyle = wall; c.fillRect(-300, -260, 600, 520);
  c.fillStyle = roof; c.beginPath(); c.moveTo(-350, -250); c.lineTo(0, -560); c.lineTo(350, -250); c.closePath(); c.fill();
  c.fillStyle = o.day ? '#6e6a5e' : '#1d1f22'; c.fillRect(-340, 250, 680, 26);           // porch step
  c.fillStyle = o.day ? '#3c3028' : '#111'; c.fillRect(-50, 60, 100, 190);              // front door
  const win = (wx, wy, lit) => { c.fillStyle = lit ? 'rgba(255,214,140,' + lit + ')' : (o.day ? '#3c4850' : '#0c0e10'); c.fillRect(wx-55, wy-65, 110, 130); c.strokeStyle = o.day ? '#e8e2d2' : '#55575a'; c.lineWidth = 8; c.strokeRect(wx-55, wy-65, 110, 130); c.beginPath(); c.moveTo(wx, wy-65); c.lineTo(wx, wy+65); c.moveTo(wx-55, wy); c.lineTo(wx+55, wy); c.stroke(); };
  win(-180, -130, o.flash || 0); win(180, -130, 0); win(-180, 120, o.flash ? o.flash*.6 : 0); win(180, 120, 0);
  // attic window
  c.fillStyle = o.attic ? `rgba(255,200,120,${o.attic})` : '#0a0a0b'; c.beginPath(); c.arc(0, -360, 60, 0, 7); c.fill();
  c.strokeStyle = o.day ? '#e8e2d2' : '#55575a'; c.lineWidth = 8; c.beginPath(); c.arc(0, -360, 60, 0, 7); c.stroke(); c.beginPath(); c.moveTo(-60, -360); c.lineTo(60, -360); c.moveTo(0, -420); c.lineTo(0, -300); c.stroke();
  if (o.sil){ c.save(); c.beginPath(); c.arc(0, -360, 56, 0, 7); c.clip(); c.globalAlpha = o.sil; doSil(c, 8, -250, .62, '#0a0705'); c.restore(); }
  c.restore();
}
function doNight(c){ bg(c, '#141c24', '#06080a'); const g = c.createRadialGradient(820, 340, 10, 820, 340, 380); g.addColorStop(0, 'rgba(200,215,230,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = '#e6ecef'; c.beginPath(); c.arc(820, 340, 44, 0, 7); c.fill(); c.fillStyle = '#0d1210'; c.fillRect(0, 1180, W, 400); }
SC.dhouse = (c, p, lt, d) => {
  if (p.day){ bg(c, '#9fb3bd', '#d8d2c0'); c.fillStyle = '#6d7f55'; c.fillRect(0, 1180, W, 400); c.fillStyle = '#556b3e'; for (let i = 0; i < 6; i++){ c.beginPath(); c.arc(120 + i*170, 1180, 60, Math.PI, 0); c.fill(); } }
  else doNight(c);
  let fl = 0; if (p.flashes) for (const q of p.flashes){ const u = lt - q*d; if (u > 0 && u < .14) fl = 1 - u/.14; }
  const att = p.attic ? (p.attic === true ? .55 + .08*Math.sin(lt*3) : p.attic) : 0;
  doHouse(c, 540, 930, p.s || .95, {day: p.day, attic: att, sil: p.sil ? ease((lt - (p.silAt || .3)*d)/.5) : 0, flash: fl});
  if (fl){ c.fillStyle = `rgba(255,240,200,${fl*.18})`; c.fillRect(0, 0, W, H); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 1240, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 1180, ease((lt - (p.stampAt ?? .6)*d)/.18), 80, -.08);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
function doAtticRoom(c, lamp){
  bg(c, '#2a2118', '#0b0806');
  // sloped rafters
  c.fillStyle = '#1a130d'; c.beginPath(); c.moveTo(0, 300); c.lineTo(540, 330); c.lineTo(1080, 300); c.lineTo(1080, 560); c.lineTo(540, 380); c.lineTo(0, 560); c.closePath(); c.fill();
  c.strokeStyle = '#3a2a1c'; c.lineWidth = 22; for (let k = 0; k < 6; k++){ const x = 60 + k*96; c.beginPath(); c.moveTo(x, 320 + k*8); c.lineTo(x - 60, 1000); c.stroke(); c.beginPath(); c.moveTo(1020 - k*96, 320 + k*8); c.lineTo(1080 - k*96, 1000); c.stroke(); }
  c.fillStyle = '#3b2c1f'; c.fillRect(0, 1050, W, 300);                              // floorboards
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let y = 1070; y < 1350; y += 34){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  if (lamp){ const g = c.createRadialGradient(700, 860, 10, 700, 860, 600); g.addColorStop(0, `rgba(255,200,120,${.45*lamp})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
}
function doCot(c){ c.fillStyle = '#4a3a2a'; c.fillRect(150, 1000, 380, 22); c.fillRect(160, 1022, 16, 80); c.fillRect(505, 1022, 16, 80); c.fillStyle = '#8a8270'; c.fillRect(150, 975, 380, 30); c.fillStyle = '#c9c0aa'; c.beginPath(); c.ellipse(200, 968, 46, 18, 0, 0, 7); c.fill(); c.fillStyle = '#5a5a48'; c.fillRect(260, 965, 270, 38); }
function doDesk(c, pages, lamp){
  c.fillStyle = '#4a3420'; c.fillRect(600, 900, 330, 26); c.fillRect(615, 926, 20, 170); c.fillRect(895, 926, 20, 170);
  // oil lamp
  c.fillStyle = '#7a6a4a'; c.fillRect(840, 860, 50, 40); c.fillStyle = `rgba(255,220,150,${.4 + .5*lamp})`; c.beginPath(); c.ellipse(865, 820, 26, 42, 0, 0, 7); c.fill(); c.strokeStyle = '#999'; c.lineWidth = 3; c.beginPath(); c.ellipse(865, 820, 26, 42, 0, 0, 7); c.stroke();
  // paper stack + pen
  for (let i = 0; i < pages; i++){ c.fillStyle = i % 2 ? '#e6dcc4' : '#efe6d0'; c.fillRect(640 + (i%3)*3, 892 - i*5, 150, 8); }
  c.fillStyle = '#efe6d0'; c.save(); c.translate(740, 888 - pages*5); c.rotate(-.05); c.fillRect(-60, -6, 130, 8); c.restore();
  c.strokeStyle = '#111'; c.lineWidth = 5; c.beginPath(); c.moveTo(790, 880 - pages*5); c.lineTo(830, 850 - pages*5); c.stroke();
}
SC.dattic = (c, p, lt, d) => {
  const lamp = p.lamp ? .7 + .1*Math.sin(lt*7) : .25;
  doAtticRoom(c, lamp); doCot(c); doDesk(c, p.pages ? Math.round(3 + (p.grow ? 9*ease(lt/d) : 9)) : 2, p.lamp ? 1 : 0);
  if (p.sil) { c.save(); c.globalAlpha = ease((lt - (p.silAt || 0)*d)/.5); doSil(c, p.silX || 720, 930, 1.15, '#050403', true); c.restore(); }
  if (p.hatch){ c.fillStyle = '#0a0705'; c.fillRect(330, 1180, 260, 60); c.fillStyle = `rgba(255,230,180,${.25 + .1*Math.sin(lt*2)})`; c.fillRect(340, 1190, 240, 6); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 700, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
SC.dbed = (c, p, lt, d) => { // bedroom below: closet door with a ceiling hatch, faint light around the hatch
  bg(c, '#2b2e30', '#0c0d0e'); c.fillStyle = '#1b1c1e'; c.fillRect(0, 380, W, 40);              // ceiling line
  c.fillStyle = '#24211d'; c.fillRect(0, 1080, W, 300);
  // bed with blanket (no person)
  c.fillStyle = '#3a2a1e'; c.fillRect(120, 860, 120, 240); c.fillStyle = '#d0c9b8'; c.fillRect(140, 960, 520, 70); c.fillStyle = '#4a5560'; c.fillRect(260, 950, 400, 80); c.fillStyle = '#3a2a1e'; c.fillRect(640, 940, 30, 160);
  c.fillStyle = '#e8e2d4'; c.beginPath(); c.ellipse(205, 950, 60, 24, 0, 0, 7); c.fill();
  // closet door
  c.fillStyle = '#3d3226'; c.fillRect(740, 560, 230, 520); c.strokeStyle = '#1a140e'; c.lineWidth = 6; c.strokeRect(760, 590, 190, 200); c.strokeRect(760, 820, 190, 230); c.fillStyle = '#c2a060'; c.beginPath(); c.arc(775, 830, 10, 0, 7); c.fill();
  // hatch in the ceiling above it
  const a = .35 + .25*Math.sin(lt*2.2); c.fillStyle = '#151311'; c.fillRect(760, 410, 190, 26); c.fillStyle = `rgba(255,210,140,${a})`; c.fillRect(760, 432, 190, 5); c.fillRect(760, 410, 4, 26); c.fillRect(946, 410, 4, 26);
  if (p.arrow){ const k = ease((lt - (p.arrowAt||.3)*d)/.3); c.save(); c.globalAlpha = k; c.strokeStyle = '#ff3b30'; c.lineWidth = 10; c.beginPath(); c.arc(855, 423, 120, 0, 7); c.stroke(); c.restore(); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 700, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dcloset = (c, p, lt, d) => { // closed closet door, keyhole, light under the door
  bg(c, '#26292c', '#0b0c0d'); c.fillStyle = '#1e1c19'; c.fillRect(0, 1130, W, 300);
  c.fillStyle = '#4a3b2b'; c.fillRect(300, 420, 480, 720); c.strokeStyle = '#21180f'; c.lineWidth = 8; c.strokeRect(340, 470, 400, 280); c.strokeRect(340, 800, 400, 290);
  c.fillStyle = '#c2a060'; c.beginPath(); c.arc(720, 790, 18, 0, 7); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(720, 840, 9, 0, 7); c.fill(); c.fillRect(716, 840, 8, 22);
  const a = .5 + .3*Math.sin(lt*9)*(p.shake ? 1 : .2); c.fillStyle = `rgba(255,220,160,${a})`; c.fillRect(310, 1134, 460, 6);
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 640, ease((lt - (p.stampAt ?? .5)*d)/.18), 100, -.1);
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function doWatch(c, x, y, s, rot){ // diamond-set pocket watch with chain
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.strokeStyle = '#c8b070'; c.lineWidth = 8; c.beginPath(); for (let k = 0; k < 14; k++){ c.moveTo(0 + k*26, -200 - k*14); c.arc(k*26, -200 - k*14, 9, 0, 7); } c.stroke();
  c.fillStyle = '#c8b070'; c.fillRect(-14, -200, 28, 40); c.beginPath(); c.arc(0, 0, 170, 0, 7); c.fill();
  c.fillStyle = '#f2ecda'; c.beginPath(); c.arc(0, 0, 140, 0, 7); c.fill();
  c.fillStyle = '#222'; for (let k = 0; k < 12; k++){ const a = k*Math.PI/6; c.fillRect(Math.cos(a)*118 - 4, Math.sin(a)*118 - 4, 8, 8); }
  c.strokeStyle = '#222'; c.lineWidth = 7; c.beginPath(); c.moveTo(0, 0); c.lineTo(60, -50); c.moveTo(0, 0); c.lineTo(-10, -100); c.stroke();
  for (let k = 0; k < 24; k++){ const a = k*Math.PI/12; c.fillStyle = k % 2 ? '#ffffff' : '#bfe6ff'; c.beginPath(); c.arc(Math.cos(a)*156, Math.sin(a)*156, 7, 0, 7); c.fill(); }
  c.restore();
}
SC.dwatch = (c, p, lt, d) => {
  desk(c);
  const tw = Math.sin(lt*6); doWatch(c, 540, 820, 1.25, -.08);
  for (const [x, y, ph] of [[400, 700, 0], [700, 960, 2], [650, 640, 4]]){ const a = Math.max(0, Math.sin(lt*3 + ph)); c.save(); c.globalAlpha = a; c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.moveTo(x-26, y); c.lineTo(x+26, y); c.moveTo(x, y-26); c.lineTo(x, y+26); c.stroke(); c.restore(); }
  if (p.cross){ const k = ease((lt - (p.crossAt || .5)*d)/.25); c.save(); c.globalAlpha = k; c.strokeStyle = '#ff3b30'; c.lineWidth = 18; c.beginPath(); c.moveTo(300, 560); c.lineTo(300 + 480*k, 560 + 520*k); c.stroke(); c.restore(); }
  if (p.label) lbl(c, p.label, 540, p.labelY || 1160, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .5)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dhatch = (c, p, lt, d) => { // looking up from inside the closet: the ceiling panel slides shut
  bg(c, '#1c1a17', '#060505');
  c.fillStyle = '#2c241b'; c.fillRect(200, 300, 680, 900);                     // closet ceiling
  c.strokeStyle = '#18120c'; c.lineWidth = 6; for (let x = 200; x < 880; x += 85){ c.beginPath(); c.moveTo(x, 300); c.lineTo(x, 1200); c.stroke(); }
  const k = ease((lt - (p.closeAt ?? .45)*d)/(.3*d)); // 0 open -> 1 shut
  c.fillStyle = '#000'; c.fillRect(370, 520, 340, 340);
  c.fillStyle = 'rgba(255,200,120,.55)'; c.fillRect(370, 520, 340*(1-k), 340);
  // legs disappearing up through the hole (silhouette), pulled up before the panel closes
  const up = ease((lt - .05*d)/(.4*d)); c.save(); c.beginPath(); c.rect(370, 520, 340*(1-k), 340); c.clip(); c.fillStyle = '#050403'; c.fillRect(470, 700 - 380*up, 50, 260); c.fillRect(560, 690 - 380*up, 50, 270); c.restore();
  c.fillStyle = '#5a4630'; c.fillRect(370 + 340*(1-k), 520, 340*k, 340); c.strokeStyle = '#c2a060'; c.lineWidth = 6; c.strokeRect(370, 520, 340, 340);
  c.fillStyle = '#8a8f96'; c.fillRect(200, 960, 680, 10); const cols = ['#2a3340','#3a2a2a','#2f3a2a','#3a3328','#2a2a36']; for (let i = 0; i < 7; i++){ const x = 240 + i*92; c.strokeStyle = '#8a8f96'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 970); c.lineTo(x, 990); c.stroke(); c.fillStyle = cols[i%5]; c.beginPath(); c.moveTo(x-40, 1000); c.lineTo(x+40, 1000); c.lineTo(x+46, 1200); c.lineTo(x-46, 1200); c.closePath(); c.fill(); }
  text(c, 'CEILING PANEL', 540, 480, 40, 'VT', '#d7fbe9');
  if (p.label) lbl(c, p.label, 540, p.labelY || 1080, p.labelSize || 64, p.labelCol || '#ff3b30', ease((lt - (p.labelAt ?? .7)*d)/.25));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.dnews = (c, p, lt, d) => { // generic illustrated front page (no masthead of a real paper, no photo of a person)
  desk(c);
  const z = .9 + .08*ease(lt/d); c.save(); c.translate(540, 830); c.scale(z, z); c.rotate(-.04);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.fillStyle = '#e6dfcb'; c.fillRect(-380, -420, 760, 860); c.shadowBlur = 0;
  c.fillStyle = '#222'; c.fillRect(-350, -330, 700, 6); c.fillRect(-350, -300, 700, 3);
  text(c, p.date || '1930', 0, -370, 40, 'Type', '#333');
  text(c, p.h1 || 'THE', 0, -220, 110, 'Anton', '#111'); text(c, p.h2 || 'BAT MAN', 0, -90, 150, 'Anton', '#111');
  c.fillStyle = '#5a5245'; c.fillRect(-330, 20, 300, 340); doSil(c, -180, 290, .9, '#1a1814');   // silhouette 'photo' box
  c.fillStyle = 'rgba(40,30,20,.55)'; for (let i = 0; i < 12; i++) c.fillRect(20, 30 + i*28, 300 - (i%3)*30, 10);
  c.restore();
  if (p.ring){ const k = ease((lt - (p.ringAt || .5)*d)/.3); c.save(); c.globalAlpha = k; c.strokeStyle = '#ff3b30'; c.lineWidth = 10; c.beginPath(); c.ellipse(540, 700, 340, 110, -.04, 0, 7); c.stroke(); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
