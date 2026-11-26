let _pid=0;
// coffee pot on a filter machine. lv = coffee level 0..1, g = greyscale camera look
const POT=(lv,w=300,g=false)=>{const id='c'+(_pid++);const body=g?'#4A4A4A':'#150C2B',cof=g?'#2E2E2E':'#6B4226',gl=g?'#D8D8D8':'#EAF1FB',st=g?'#777':'#9FB4D6';
 const y=214-110*clamp(lv);
 return `<svg width="${w}" height="${w*1.2}" viewBox="0 0 200 240"><defs><clipPath id="${id}"><path d="M40 92 L120 92 L132 205 Q132 214 122 214 L38 214 Q28 214 28 205 Z"/></clipPath></defs>
 <rect x="132" y="10" width="58" height="215" rx="10" fill="${body}"/><rect x="18" y="10" width="172" height="44" rx="10" fill="${body}"/>
 <rect x="48" y="54" width="64" height="12" rx="3" fill="${g?'#666':'#2A2148'}"/><rect x="10" y="214" width="182" height="18" rx="6" fill="${body}"/>
 <circle cx="161" cy="90" r="7" fill="${lv>0.05?(g?'#bbb':'#E5484D'):(g?'#888':'#5A5375')}"/>
 <rect x="50" y="72" width="60" height="22" rx="4" fill="${gl}" stroke="${st}" stroke-width="3"/>
 <path d="M40 92 L120 92 L132 205 Q132 214 122 214 L38 214 Q28 214 28 205 Z" fill="${gl}"/>
 <rect x="0" y="${y}" width="200" height="240" fill="${cof}" clip-path="url(#${id})"/>
 <path d="M40 92 L120 92 L132 205 Q132 214 122 214 L38 214 Q28 214 28 205 Z" fill="none" stroke="${st}" stroke-width="4"/>
 <path d="M46 110 L52 190" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
 <path d="M121 112 Q152 118 141 178" fill="none" stroke="${body}" stroke-width="10" stroke-linecap="round"/></svg>`};
const camView=(lv,w,label='')=>`<div style="position:relative;width:${w}px;height:${Math.round(w*.82)}px;background:#BDBDBD;border-radius:14px;overflow:hidden;display:flex;align-items:flex-end;justify-content:center">
 <div style="filter:grayscale(1) contrast(1.15) blur(1.2px);margin-bottom:-8px">${POT(lv,w*.62,true)}</div>
 <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.10) 0 6px,transparent 6px 12px),repeating-linear-gradient(90deg,rgba(0,0,0,.08) 0 6px,transparent 6px 12px)"></div>${label}</div>`;
const LIVE=t=>`<div style="position:absolute;left:22px;top:20px;display:flex;align-items:center;gap:10px;background:rgba(21,12,43,.85);color:#fff;font-weight:800;font-size:26px;letter-spacing:3px;padding:8px 16px;border-radius:10px"><span style="width:16px;height:16px;border-radius:50%;background:#E5484D;opacity:${Math.floor(t*2)%2?1:.35}"></span>LIVE</div>`;
const winM=(title,w,inner)=>`<div class="card" style="width:${w}px;overflow:hidden"><div style="height:70px;display:flex;align-items:center;gap:12px;padding:0 26px;background:#F4F2FA;border-bottom:2px solid #ECE8F6"><s style="width:16px;height:16px;border-radius:50%;background:#FF5F57;display:inline-block"></s><s style="width:16px;height:16px;border-radius:50%;background:#FEBC2E;display:inline-block"></s><s style="width:16px;height:16px;border-radius:50%;background:#28C840;display:inline-block"></s><div style="margin-left:16px;font-size:26px;color:#6E6790;font-weight:700">${title}</div></div>${inner}</div>`;
const SC=[
 // 0 hook: live camera window looking at a pot
 (p,t)=>at(p,0,winM('webcam #1',860,`<div style="padding:26px">${camView(.7,808,LIVE(t))}</div>`),540,330)
  +at(p,.35,'<div class="pill" style="background:#150C2B;color:#B9A6FF">the world\'s first webcam</div>',540,1130,{r:-2})
  +at(p,.6,'<div style="font-size:110px">☕</div>',880,900,{r:12}),
 // 1 Cambridge 1991, one lab one pot
 (p,t)=>{const row=(n,txt,d)=>`<div style="display:flex;align-items:center;gap:30px;margin:18px 0;opacity:${clamp((p-d)*5)}"><div class="h" style="font-size:150px;color:#6557E8;width:110px;text-align:center">${n}</div><div class="h" style="font-size:66px;color:#150C2B">${txt}</div></div>`;
  return at(p,0,'<div class="pill" style="background:#150C2B;color:#B9A6FF">CAMBRIDGE · 1991</div>',540,320,{r:2})
  +at(p,.35,`<div class="card" style="width:860px;padding:40px 60px">${row('1','computer lab 🏛️',.35)}${row('1','<span class="hl">shared</span> coffee pot',.6)}</div>`,540,470)
  +at(p,.65,`<div>${POT(.8,230)}</div>`,540,900)},
 // 2 stairs: a person climbing flights
 (p,t)=>{const k=eio((p-.15)/.75);const steps=Array(7).fill(0).map((_,i)=>`<rect x="${60+i*100}" y="${560-i*70}" width="${760-i*100}" height="70" fill="${i%2?'#ECE8FF':'#E0DAFA'}"/>`).join('');
  const px=80+k*600,py=470-k*420;
  return at(p,0,`<div class="card" style="width:900px;height:720px;overflow:hidden"><svg width="900" height="720" viewBox="0 0 900 720" style="position:absolute;left:0;top:60px">${steps}</svg>
   <div style="position:absolute;left:${px}px;top:${py+40}px;font-size:110px;transform:scaleX(-1)">🚶</div>
   <div style="position:absolute;right:50px;top:40px">${POT(.6,120)}</div>
   <div style="position:absolute;left:46px;top:40px;font-weight:700;font-size:30px;letter-spacing:6px;color:#8A82A8">THE COFFEE RUN</div></div>`,540,330)
  +at(p,.45,'<div class="h" style="font-size:84px;color:#150C2B;white-space:nowrap">several <span class="hl">flights</span> of stairs 😮‍💨</div>',540,1110,{r:-2})},
 // 3 empty pot
 (p,t)=>{const lv=.55*(1-eio((p-.1)/.35));
  return at(p,0,`<div class="card" style="width:640px;padding:40px;display:flex;justify-content:center">${POT(lv,400)}</div>`,540,330)
  +at(p,.5,stampM('EMPTY',110),540,700,{r:-8})
  +at(p,.68,'<div style="font-size:140px">😩</div>',830,940,{r:10})},
 // 4 camera + program typed in a day
 (p,t)=>{const code=['$ xcoffee','grab image of pot...','send to screens','done ✓'];const n=Math.floor(clamp((p-.4)/.45)*code.length*12);let left=n;
  const lines=code.map(c=>{const s=c.slice(0,Math.max(0,Math.min(c.length,left)));left-=c.length;return s}).filter((s,i)=>s.length||i==0);
  return at(p,0,`<div style="display:flex;align-items:center;gap:30px"><div style="font-size:170px;transform:scaleX(-1)">📹</div><svg width="120" height="60"><path d="M0 30 H100 M80 10 L105 30 L80 50" stroke="#6557E8" stroke-width="10" fill="none" stroke-linecap="round"/></svg><div class="card" style="padding:24px">${POT(.7,190)}</div></div>`,540,330)
  +at(p,.35,`<div style="width:880px;border-radius:28px;background:#150C2B;padding:34px 40px;box-shadow:0 30px 70px rgba(21,12,43,.25);font-family:monospace;font-size:44px;line-height:1.5;color:#B9A6FF;min-height:340px">${lines.map(l=>`<div>${l}</div>`).join('')}<span style="opacity:${Math.floor(t*3)%2}">▋</span></div>`,540,700)
  +at(p,.75,'<div class="pill" style="background:#6557E8;color:#fff">built in about a day</div>',540,1120,{r:2})},
 // 5 tiny greyscale picture, updates 3x a minute
 (p,t)=>{const c=Math.floor(clamp((p-.45)/.5)*3.99);
  return at(p,0,`<div style="width:820px;border-radius:26px;background:#150C2B;padding:30px 30px 70px;box-shadow:0 30px 70px rgba(21,12,43,.25);position:relative">${camView(.45,760)}<div style="position:absolute;left:50%;bottom:-60px;transform:translateX(-50%);width:200px;height:60px;background:#2A2148;border-radius:0 0 18px 18px"></div></div>`,540,330)
  +at(p,.2,'<div class="pill">tiny · black &amp; white</div>',300,330,{r:-5})
  +at(p,.45,`<div class="card" style="padding:26px 44px;display:flex;align-items:center;gap:26px">${[0,1,2].map(k=>`<div style="width:70px;height:70px;border-radius:50%;background:${k<c?'#6557E8':'#ECE8FF'};color:#fff;font-weight:800;font-size:36px;display:flex;align-items:center;justify-content:center">${k<c?'📷':''}</div>`).join('')}<div class="h" style="font-size:54px;color:#150C2B;white-space:nowrap">a minute</div></div>`,540,1080,{r:1})},
 // 6 empty -> stay at desk
 (p,t)=>at(p,0,`<div style="display:flex;gap:36px"><div class="card" style="width:400px;padding:30px;text-align:center">${camView(0,340)}<div class="h" style="font-size:56px;color:#E5484D;margin-top:20px">empty ✗</div></div>
   <div class="card" style="width:400px;padding:30px;text-align:center;opacity:${.35+.65*clamp((p-.45)*4)}"><div style="font-size:200px;line-height:280px">🧑‍💻</div><div class="h" style="font-size:56px;color:#12A150;margin-top:20px">stay put ✓</div></div></div>`,540,360)
  +at(p,.5,'<div class="h" style="font-size:96px;color:#150C2B;white-space:nowrap">no <span class="hl">wasted trip</span></div>',540,1000,{r:-2}),
 // 7 world wide web 1993
 (p,t)=>{const r=(t*25)%360;
  return at(p,0,'<div class="pill" style="background:#150C2B;color:#B9A6FF">NOVEMBER 1993</div>',540,310,{r:-2})
  +at(p,.12,winM('🌐 world wide web',760,`<div style="padding:26px">${camView(.6,708,LIVE(t))}</div>`),540,410)
  +at(p,.55,`<div style="font-size:130px">🌍</div>`,250,1120,{r:-10})
  +at(p,.6,'<div class="pill" style="background:#6557E8;color:#fff">anyone online 👀</div>',620,1170,{r:3})},
 // 8 hundreds of thousands
 (p,t)=>{const n=Math.floor(clamp((p-.05)/.7)*96);
  return at(p,0,`<div class="card" style="width:880px;padding:40px 44px"><div style="font-weight:700;font-size:30px;letter-spacing:8px;color:#8A82A8">WATCHING A COFFEE POT</div><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:12px;margin-top:30px">${Array(96).fill(0).map((_,k)=>`<div style="aspect-ratio:1;border-radius:50%;background:${k<n?(k%5==0?'#6557E8':'#B9A6FF'):'#F1EEF9'}"></div>`).join('')}</div></div>`,540,330)
  +at(p,.45,'<div class="h" style="font-size:90px;color:#150C2B;text-align:center;line-height:1.05;white-space:nowrap"><span class="hl">hundreds of</span><br><span class="hl">thousands</span> 👀</div>',540,1040,{r:-2})},
 // 9 2001: camera off, pot sold
 (p,t)=>{const off=clamp((p-.25)*5);
  return at(p,0,'<div class="pill" style="background:#150C2B;color:#B9A6FF">2001 · the lab moves 📦</div>',540,310,{r:2})
  +at(p,.1,`<div class="card" style="width:600px;padding:22px;position:relative">${camView(.3,556)}<div style="position:absolute;inset:22px;border-radius:14px;background:#111;opacity:${off*.92};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:44px;letter-spacing:6px">${off>.8?'CAMERA OFF':''}</div></div>`,540,420)
  +at(p,.55,`<div class="card" style="width:820px;padding:30px 40px;display:flex;align-items:center;gap:30px"><div style="width:150px;height:150px;border-radius:20px;background:#F4F2FA;display:flex;align-items:center;justify-content:center">${POT(.0,110)}</div><div><div style="font-weight:700;font-size:30px;letter-spacing:5px;color:#8A82A8">ONLINE AUCTION · eBay</div><div class="h" style="font-size:96px;color:#150C2B;margin-top:8px">£3,350</div></div></div>`,540,970,{r:-1})
  +at(p,.75,stampM('SOLD',64),790,1110,{r:-6})},
 // 10 the question
 (p,t)=>at(p,0,'<div style="font-weight:700;font-size:34px;letter-spacing:8px;color:#8A82A8;text-align:center;width:900px">ONE QUESTION</div>',540,380)
  +at(p,.35,'<div class="h" style="font-size:130px;color:#150C2B;text-align:center;width:960px;line-height:1.02">Is it worth<br>the <span class="hl">trip?</span></div>',540,480)
  +at(p,.55,`<div>${POT(.7,200)}</div>`,540,860),
 // 11 made-up business site on a phone
 (p,t)=>{const row=(ic,a,b,d)=>`<div style="display:flex;align-items:center;gap:18px;padding:26px 0;border-bottom:2px solid #F1EEF9;opacity:${clamp((p-d)*5)};transform:translateX(${(1-ease((p-d)*4))*40}px)"><div style="width:64px;height:64px;border-radius:16px;background:#ECE8FF;display:flex;align-items:center;justify-content:center;font-size:36px">${ic}</div><div><div style="font-weight:800;font-size:42px;color:#150C2B">${a}</div><div style="font-weight:600;font-size:32px;color:#12A150">${b}</div></div></div>`;
  const inner=`<div style="background:#2F5D50;color:#fff;padding:60px 36px 30px"><div style="font-family:Georgia,serif;font-size:52px;font-weight:700">Fernhill Hardware</div><div style="font-size:28px;opacity:.8;margin-top:6px">Est. 1998 · Katoomba</div></div><div style="padding:10px 32px">${row('🕘','Open now','closes 5:30 pm',.3)}${row('🏷️','Prices on the site','paint from $39',.45)}${row('📦','In stock today','12 left',.6)}</div>`;
  return at(p,0,phone(inner,640,860),540,320)
  +at(p,.75,'<div class="pill" style="background:#6557E8;color:#fff">before they get in the car 🚗</div>',540,1215,{r:-2})},
 // 12 CTA
 (p,t)=>at(p,0,'<div class="h" style="font-size:110px;color:#150C2B;text-align:center;width:980px;line-height:1.05">Would you have <span class="hl">watched?</span></div>',540,360)
  +at(p,.2,`<div class="card" style="padding:24px">${camView(.6,440,LIVE(t))}</div>`,540,640)
  +at(p,.5,'<div style="border-radius:999px;padding:26px 56px;font-size:52px;font-weight:800;white-space:nowrap;background:#6557E8;color:#fff;box-shadow:0 18px 40px rgba(101,87,232,.45)">+ Follow @nexaweb_dev</div>',540,1080),
];
