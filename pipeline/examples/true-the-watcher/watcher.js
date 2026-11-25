// ===== The Watcher of Westfield, NJ (true case; no real people shown, silhouettes only) =====
function wtyped(c, s, x, y, size, col, a){ if (a <= 0) return; c.save(); c.globalAlpha = a; text(c, s, x, y, size, 'Type', col || '#1c1c1c', 'left'); c.restore(); }
function wtypeLine(c, s, x, y, size, col, prog){ const n = Math.floor(clamp(prog, 0, 1)*s.length); if (n > 0) wtyped(c, s.slice(0, n), x, y, size, col, 1); }
SC.wletter = (c, p, lt, d) => {
  desk(c);
  // typewritten letter, slow push-in
  c.save(); c.translate(540, 760); c.rotate(-.025); const k = .97 + .05*lt/d; c.scale(k, k);
  paper(c, 0, 0, 800, 860, 0, '#ece6d6');
  const L = p.lines || [], n = L.length;
  L.forEach((s, i) => { const t0 = (p.at ? p.at[i] : i/(n + .5))*d; wtypeLine(c, s, -340, -330 + i*(p.gap || 74), p.size || 44, (p.red && p.red.includes(i)) ? '#9a1410' : '#1c1c1c', (lt - t0)/(d*.22)); });
  if (p.sign){ const a = ease((lt - p.signAt*d)/.25); if (a > 0){ c.save(); c.globalAlpha = a; text(c, '— THE WATCHER', 330, 330, 66, 'Type', '#111', 'right'); c.restore();
      const b = ease((lt - (p.signAt + .12)*d)/.3); if (b > 0){ c.strokeStyle = `rgba(210,20,20,${b})`; c.lineWidth = 8; c.beginPath(); c.ellipse(110, 330, 260, 70, -.04, 0, 7*b); c.stroke(); } } }
  if (p.under !== undefined){ const b = ease((lt - p.underAt*d)/.25); if (b > 0){ c.strokeStyle = '#d0201a'; c.lineWidth = 7; c.beginPath(); c.moveTo(-345, -310 + p.under*(p.gap || 74)); c.lineTo(-345 + 560*b, -310 + p.under*(p.gap || 74)); c.stroke(); } }
  c.restore();
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
function wbigHouse(c, x, y, s, night, lit){
  c.save(); c.translate(x, y); c.scale(s, s);
  const wall = night ? '#3a414c' : '#c9c3b2', roof = night ? '#14161b' : '#3a3d44', trim = night ? '#4a4f58' : '#f2efe6';
  c.fillStyle = wall; c.fillRect(-380, -260, 760, 360);                     // main block
  c.fillStyle = roof; c.beginPath(); c.moveTo(-410, -255); c.lineTo(-300, -400); c.lineTo(300, -400); c.lineTo(410, -255); c.fill();
  c.fillStyle = wall; c.beginPath(); c.moveTo(-110, -260); c.lineTo(0, -380); c.lineTo(110, -260); c.fill();   // centre gable
  c.strokeStyle = trim; c.lineWidth = 6; c.beginPath(); c.moveTo(-120, -258); c.lineTo(0, -386); c.lineTo(120, -258); c.stroke();
  c.fillStyle = roof; c.fillRect(230, -470, 60, 120);                       // chimney
  const win = (wx, wy, on) => { c.fillStyle = on ? 'rgba(255,205,120,.95)' : (night ? '#0b0d11' : '#5d7385'); c.fillRect(wx - 36, wy - 50, 72, 100); c.strokeStyle = trim; c.lineWidth = 6; c.strokeRect(wx - 36, wy - 50, 72, 100); c.beginPath(); c.moveTo(wx, wy - 50); c.lineTo(wx, wy + 50); c.moveTo(wx - 36, wy); c.lineTo(wx + 36, wy); c.stroke(); };
  [-300, -190, 190, 300].forEach((wx, i) => { win(wx, -150, lit && lit[i]); win(wx, 10, lit && lit[i + 4]); });
  win(0, -300, lit && lit[8]);
  c.fillStyle = night ? '#1d2026' : '#e4dfd2'; c.fillRect(-150, -60, 300, 30);   // porch roof
  c.fillStyle = trim; for (const px of [-140, -50, 50, 140]) c.fillRect(px - 7, -30, 14, 130);
  c.fillStyle = night ? '#120d0a' : '#5a2e22'; c.fillRect(-40, -10, 80, 110);     // door
  c.fillStyle = night ? '#0c0e10' : '#7d7a70'; c.fillRect(-160, 100, 320, 22);   // step
  c.restore();
}
function wstreet(c, night){
  if (night){ bg(c, '#121a26', '#05070b'); c.fillStyle = 'rgba(220,228,236,.85)'; c.beginPath(); c.arc(860, 420, 46, 0, 7); c.fill(); }
  else { bg(c, '#6f8396', '#2d343b'); }
  c.fillStyle = night ? '#0a0f0b' : '#2f4a2c'; c.fillRect(0, 980, W, 200);       // lawn
  c.fillStyle = night ? '#1b1f24' : '#4a4d52'; c.fillRect(0, 1180, W, 170);      // street
  c.fillStyle = night ? 'rgba(200,200,170,.25)' : 'rgba(240,230,190,.7)'; for (let x = 20; x < W; x += 150) c.fillRect(x, 1258, 80, 10);
  c.fillStyle = night ? '#9a9890' : '#bdbab2'; c.fillRect(0, 1160, W, 20);       // kerb/sidewalk
  c.fillStyle = night ? '#070a08' : '#22351f'; for (const [tx, r] of [[110, 120], [985, 110]]){ c.beginPath(); c.arc(tx, 760, r, 0, 7); c.fill(); c.beginPath(); c.arc(tx + 40, 680, r*.8, 0, 7); c.fill(); c.fillRect(tx - 12, 760, 24, 230); }
}
function wsign(c, x, y, l1, l2, a, col){
  if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(x, y);
  c.fillStyle = '#e9e5da'; c.fillRect(-8, -40, 16, 210); c.fillRect(-8, -40, 150, 14);
  c.fillStyle = col || '#b3161a'; c.fillRect(20, -20, 250, 150); c.strokeStyle = '#fff'; c.lineWidth = 6; c.strokeRect(30, -10, 230, 130);
  text(c, l1, 145, 32, 58, 'Anton', '#fff'); if (l2) text(c, l2, 145, 92, 40, 'Anton', '#fff');
  c.restore();
}
function wfigure(c, x, y, s, a){   // silhouette under a streetlamp, no face
  if (a <= 0) return; c.save(); c.globalAlpha = a;
  const g = c.createRadialGradient(x, y - 260*s, 10, x, y - 60*s, 340*s); g.addColorStop(0, 'rgba(255,214,150,.42)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(x - 400*s, y - 520*s, 800*s, 640*s);
  c.fillStyle = '#26292d'; c.fillRect(x + 90*s, y - 470*s, 12*s, 470*s); c.fillRect(x + 40*s, y - 476*s, 80*s, 12*s); c.fillStyle = '#ffe2a8'; c.beginPath(); c.arc(x + 46*s, y - 458*s, 14*s, 0, 7); c.fill();
  c.fillStyle = '#030405'; c.beginPath(); c.arc(x, y - 205*s, 30*s, 0, 7); c.fill();
  c.beginPath(); c.moveTo(x - 50*s, y - 170*s); c.lineTo(x + 50*s, y - 170*s); c.lineTo(x + 42*s, y - 40*s); c.lineTo(x + 30*s, y); c.lineTo(x - 30*s, y); c.lineTo(x - 42*s, y - 40*s); c.closePath(); c.fill();
  c.restore();
}
SC.whouse = (c, p, lt, d) => {
  const night = !!p.night; wstreet(c, night);
  wbigHouse(c, 540, 900, .98, night, p.lit);
  if (p.mail){ // mailbox with a letter
    c.fillStyle = '#20242a'; c.fillRect(196, 1000, 14, 170); c.fillStyle = '#2b3a55'; c.beginPath(); c.roundRect(140, 950, 130, 70, 30); c.fill();
    const a = ease((lt - .25*d)/.3); c.save(); c.globalAlpha = a; c.fillStyle = '#f1ead2'; c.save(); c.translate(250, 975); c.rotate(-.25); c.fillRect(0, -26, 110, 60); c.restore();
    c.strokeStyle = '#ff3b30'; c.lineWidth = 6; c.beginPath(); c.arc(260, 975, 95, 0, 7*a); c.stroke(); c.restore();
    klabel2(c, '657 BOULEVARD', 540, 1060, ease((lt - .45*d)/.3));
  }
  if (p.sold) wsign(c, 120, 1010, p.sold[0], p.sold[1], ease((lt - (p.soldAt || .15)*d)/.3), p.soldCol);
  if (p.big){ const a = ease((lt - p.bigAt*d)/.3); if (a > 0){ c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(170, 420, 740, 150); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, p.big, 540, 498, 104, 'Anton', '#ff3b30'); c.restore(); } }
  if (p.stampTxt) stamp(c, p.stampTxt, 540, 470, ease((lt - (p.stampAt || .4)*d)/.2), 92, -.1);
  if (p.fig) wfigure(c, p.figX || 860, 1300, 1.2, p.fig === 'fade' ? 1 - ease((lt - .6*d)/(d*.35)) : ease((lt - (p.figAt || 0)*d)/.5));
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
  if (p.follow) followBox(c, lt, d);
};
function klabel2(c, s, x, y, a){ if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(0,0,0,.65)'; c.font = '46px VT'; const w = c.measureText(s).width + 40; c.fillRect(x - w/2, y - 34, w, 68); text(c, s, x, y + 2, 46, 'VT', '#ffd7a0'); c.restore(); }
SC.wpile = (c, p, lt, d) => {
  desk(c);
  for (let i = 0; i < 4; i++){ const a = ease((lt - i*.12*d)/.25); if (a <= 0) continue; const x = 300 + (i%2)*480 - (i > 1 ? 0 : 0), y = 520 + Math.floor(i/2)*170 + (i%2)*30;
    c.save(); c.globalAlpha = a; paper(c, x, y, 400, 220, -.12 + i*.08, '#e6dcc2'); c.translate(x, y); c.rotate(-.12 + i*.08); text(c, '657 BOULEVARD', 0, 10, 36, 'Type', '#222'); c.fillStyle = '#7a2a22'; c.fillRect(120, -90, 46, 56); c.restore(); }
  const a = ease((lt - .45*d)/.3);
  if (a > 0){ c.save(); c.globalAlpha = a; c.translate(540, 1010); c.rotate(.02); c.fillStyle = 'rgba(0,0,0,.78)'; c.fillRect(-420, -120, 840, 250); c.strokeStyle = '#ff3b30'; c.lineWidth = 5; c.strokeRect(-420, -120, 840, 250);
    text(c, '"MY JOB, MY LIFE,', 0, -42, 72, 'Anton', '#f1efe8'); c.shadowColor = '#ff2a20'; c.shadowBlur = 40; text(c, 'MY OBSESSION."', 0, 58, 80, 'Anton', '#ff3b30'); c.restore(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
SC.wboard = (c, p, lt, d) => {
  bg(c, '#22262b', '#0a0b0d');
  c.fillStyle = '#5a4630'; c.fillRect(110, 400, 860, 800); c.fillStyle = '#7a6040'; c.fillRect(130, 420, 820, 760);   // cork board
  const F = [['POLICE', 330, 560], ['PRIVATE', 750, 560, 'INVESTIGATORS'], ['FORMER', 540, 930, 'FBI AGENTS']];
  F.forEach(([l1, x, y, l2], i) => { const a = ease((lt - i*.22*d)/.25); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate((i - 1)*.05);
    c.fillStyle = '#c9a86a'; c.fillRect(-170, -120, 340, 240); c.fillRect(-170, -145, 130, 30); c.fillStyle = '#efe7d2'; c.fillRect(-155, -70, 310, l2 ? 140 : 80);
    text(c, l1, 0, l2 ? -30 : -30, 46, 'Anton', '#2a2218'); if (l2) text(c, l2, 0, 30, 32, 'Anton', '#2a2218');
    c.fillStyle = '#d0201a'; c.beginPath(); c.arc(0, -125, 12, 0, 7); c.fill(); c.restore(); });
  const b = ease((lt - .7*d)/.3); if (b > 0){ c.strokeStyle = `rgba(208,32,26,${b})`; c.lineWidth = 5; c.beginPath(); c.moveTo(330, 435); c.lineTo(750, 435); c.lineTo(540, 805); c.closePath(); c.stroke(); }
  if (p.tag) tag(c, p.tag, 540, 330, ease((lt - (p.tagAt || 0)*d)/.3), p.tagCol || '#d7fbe9');
};
