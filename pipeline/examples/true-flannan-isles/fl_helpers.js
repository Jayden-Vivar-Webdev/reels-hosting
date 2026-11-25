function notebook(c, x, y, s, open){
  c.save(); c.translate(x, y); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 24;
  if (!open){ c.fillStyle = '#5a2c22'; c.fillRect(-120, -160, 240, 320); c.shadowBlur = 0; c.fillStyle = '#3e1d16'; c.fillRect(-120, -160, 22, 320); c.fillStyle = 'rgba(240,230,200,.8)'; c.fillRect(-50, -100, 130, 40); }
  else { c.fillStyle = '#efe8d4'; c.fillRect(-380, -440, 760, 880); c.shadowBlur = 0; c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-4, -440, 8, 880);
    c.strokeStyle = 'rgba(90,120,170,.35)'; c.lineWidth = 2; for (let yy = -360; yy < 430; yy += 62){ c.beginPath(); c.moveTo(-360, yy); c.lineTo(360, yy); c.stroke(); }
    c.strokeStyle = 'rgba(200,60,60,.4)'; c.beginPath(); c.moveTo(-300, -440); c.lineTo(-300, 440); c.stroke(); }
  c.restore();
}
