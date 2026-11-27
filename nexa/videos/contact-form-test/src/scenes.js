// made-up business: Harbourline Decks (Wollongong). Brand: teal #0E5E6F, sand #F2C14E
const TEAL='#0E5E6F',SAND='#F2C14E';
const field=(lab,val,n,h=74)=>`<div style="margin-top:18px"><div style="font-weight:700;font-size:24px;color:#5B7A80;margin-bottom:8px">${lab}</div><div style="height:${h}px;border:3px solid #D5E2E4;border-radius:14px;padding:16px 20px;font-weight:600;font-size:28px;color:#16343A;line-height:1.25;overflow:hidden">${val.slice(0,n)}</div></div>`;
const form=(o={})=>{const q=o.q??1;const nm='Mia',ms='Hi, need a quote for a deck out the back.';
 return `<div style="padding:84px 34px 0"><div style="font-weight:800;font-size:32px;color:${TEAL};letter-spacing:-.02em">▦ Harbourline<span style="color:#C99A1E"> Decks</span></div>
 <div class="h" style="font-size:50px;color:${TEAL};margin-top:34px">Get a free quote</div>
 ${field('Name',nm,Math.round(nm.length*clamp(q*3)))}${field('Phone','0491 570 156',Math.round(12*clamp(q*3-1)))}${field('Message',ms,Math.round(ms.length*clamp(q*3-2)),130)}
 ${o.extra||''}
 <div style="margin-top:26px;background:${o.broken?'#D9D9D9':SAND};color:${o.broken?'#9A9A9A':'#16343A'};font-weight:800;font-size:34px;padding:22px;border-radius:16px;text-align:center;transform:scale(${o.press?0.94:1})">${o.btn||'Send enquiry'}</div></div>`};
const env=(c='#fff')=>`<div style="width:130px;height:92px;border-radius:14px;background:${c};position:relative;box-shadow:0 10px 24px rgba(0,0,0,.18);overflow:hidden"><div style="position:absolute;left:-10px;right:-10px;top:-50px;height:100px;border-bottom:5px solid #C9C3E8;transform:skewY(0)"></div><svg width="130" height="92" style="position:absolute;inset:0"><path d="M6 8 L65 52 L124 8" fill="none" stroke="#B9A6FF" stroke-width="6" stroke-linejoin="round"/></svg></div>`;
const mailRow=(from,sub,o={})=>`<div style="display:flex;gap:20px;align-items:center;padding:22px 26px;border-top:2px solid #EFEDF5;background:${o.hi?'#F1EEFF':'#fff'}"><div style="width:64px;height:64px;flex:none;border-radius:50%;background:${o.c||'#ECE8FF'};color:#3B2FA8;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center">${from[0]}</div><div style="flex:1;min-width:0"><div style="font-weight:800;font-size:30px;color:#150C2B;white-space:nowrap">${from}</div><div style="font-weight:600;font-size:25px;color:#8A82A8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sub}</div></div>${o.tag||''}</div>`;
const tick=on=>`<div style="width:64px;height:64px;flex:none;border-radius:18px;background:${on?'#12A150':'#E9F6EE'};color:#fff;font-size:42px;font-weight:800;display:flex;align-items:center;justify-content:center">${on?'✓':''}</div>`;
const SC=[
 // 0 hook: form + "BROKEN?" stamp
 (p,t)=>at(p,0,phone(form({q:clamp(p*1.6),press:p>.62&&p<.7}),500,1000),540,270,{r:-2})
  +slam(p,.7,stamp('BROKEN?','#E5484D',84),540,820,-8),
 // 1 no error, just quiet
 (p,t)=>{const g=clamp((p-.5)*4);
  return at(p,0,`<div class="card" style="width:820px;padding:36px 40px;opacity:${1-.55*g}"><div class="lab">WHAT YOU'D EXPECT</div><div style="display:flex;gap:24px;align-items:center;margin-top:24px"><div style="font-size:80px">⚠️</div><div class="h" style="font-size:54px;color:#C2272D">Error: form failed</div></div></div>`,540,300,{r:-1})
  +(g>.2?`<div style="position:absolute;left:150px;top:440px;width:780px;height:8px;background:#E5484D;border-radius:4px;transform:rotate(-4deg) scaleX(${ease(g)});transform-origin:left"></div>`:'')
  +at(p,.5,`<div class="card" style="width:740px;overflow:hidden"><div style="padding:30px 40px 10px" class="lab">WHAT ACTUALLY HAPPENS</div><div style="padding:60px 40px 90px;text-align:center"><div style="font-size:170px">📭</div><div class="h" style="font-size:60px;margin-top:20px">No new messages</div><div style="font-weight:700;font-size:34px;color:#8A82A8;margin-top:16px">silence. no warning.</div></div></div>`,540,640,{r:1})},
 // 2 customer: sent, thanks, waits days
 (p,t)=>{const d=Math.min(5,Math.max(1,1+Math.floor((p-.45)/.1)));
  return at(p,0,phone(`<div style="padding:190px 40px;text-align:center"><div style="width:150px;height:150px;border-radius:50%;background:#E9F6EE;color:#12A150;font-size:96px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto">✓</div><div class="h" style="font-size:56px;color:${TEAL};margin-top:40px">Thanks, Mia!</div><div style="font-weight:600;font-size:30px;color:#5B7A80;margin-top:20px;line-height:1.3">We'll be in touch<br>within 24 hours.</div></div>`,420,820),300,300,{r:-2})
  +at(p,.4,`<div class="card" style="width:420px;padding:34px;text-align:center"><div class="lab">WAITING</div><div class="h" style="font-size:120px;color:#6557E8;margin-top:10px">Day ${d}</div><div style="font-size:90px;margin-top:10px">${d>=4?'📵':'📱'}</div><div class="h" style="font-size:40px;margin-top:12px">${d>=4?'no call':'...'}</div></div>`,780,420,{r:3})
  +at(p,.85,'<div class="pill" style="background:#150C2B;color:#fff;font-size:44px">she calls someone else</div>',540,1170,{r:-2})},
 // 3 three usual suspects
 (p,t)=>{const c=(n,ic,txt,d,x,r)=>at(p,d,`<div class="card" style="width:262px;height:520px;padding:40px 20px;display:flex;flex-direction:column;justify-content:space-between;text-align:center"><div class="h" style="font-size:140px;color:#6557E8">${n}</div><div style="font-size:110px">${ic}</div><div style="font-weight:800;font-size:36px;line-height:1.15">${txt}</div></div>`,x,560,{r});
  return at(p,0,'<div class="h" style="font-size:96px;text-align:center;width:960px;color:#fff">3 usual <span style="background:#B9A6FF;color:#150C2B;padding:0 .12em;border-radius:.1em">suspects</span></div>',540,330)
   +`<div style="position:absolute;left:0;top:0;width:1080px">${c(1,'📧','old email',.12,262,-6)}${c(2,'🗑️','spam folder',.24,540,0)}${c(3,'🔧','an update',.36,810,6)}</div>`},
 // 4 old email address
 (p,t)=>{const fly=ease((p-.15)/.35),x=-260+520*fly,bounce=clamp((p-.55)*4);
  return at(p,0,`<div class="card" style="width:860px;padding:34px 40px"><div class="lab">FORM SENDS TO</div><div style="margin-top:20px;font-weight:800;font-size:44px;position:relative;display:inline-block">jess@harbourlinedecks.com.au${p>.5?`<div style="position:absolute;left:-6px;right:-6px;top:50%;height:7px;background:#E5484D;border-radius:4px;transform:scaleX(${ease((p-.5)*4)});transform-origin:left"></div>`:''}</div></div>`,540,290)
  +`<div style="position:absolute;left:${540+x-65}px;top:${640-120*Math.sin(Math.PI*fly)+bounce*60}px;transform:rotate(${-10+20*fly+bounce*30}deg);opacity:${1-bounce*.6}">${env()}</div>`
  +at(p,.45,`<div class="card" style="width:520px;padding:34px 40px;text-align:center"><div style="width:140px;height:140px;border-radius:50%;background:#ECE8FF;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:80px">👋</div><div class="h" style="font-size:50px;margin-top:20px">Jess left in 2023</div><div style="font-weight:700;font-size:32px;color:#8A82A8;margin-top:10px">nobody reads this inbox</div></div>`,540,820,{r:2})},
 // 5 spam folder
 (p,t)=>{const n=Math.round(14*clamp((p-.3)/.5));
  return at(p,0,`<div class="card" style="width:880px;overflow:hidden"><div style="display:flex;gap:16px;padding:26px 30px;background:#F6F4FC">${[['Inbox',0],['Spam',1]].map(([s,k])=>`<div style="padding:14px 30px;border-radius:999px;font-weight:800;font-size:32px;background:${k?'#FDE8E9':'#fff'};color:${k?'#C2272D':'#150C2B'}">${s}${k&&n?` <span style="background:#E5484D;color:#fff;border-radius:999px;padding:2px 14px;margin-left:6px">${n}</span>`:''}</div>`).join('')}</div>
  <div class="lab" style="padding:24px 30px 6px;color:#C2272D">SPAM</div>
  ${mailRow('Website form','New enquiry: Mia, deck quote',{c:'#FDE8E9',tag:'<div class="pill" style="font-size:24px;padding:8px 18px;background:#FDE8E9;color:#C2272D">spam?</div>'})}${mailRow('Website form','New enquiry: Tom, pergola',{c:'#FDE8E9'})}${mailRow('Website form','New enquiry: Priya, repairs',{c:'#FDE8E9'})}</div>`,540,290,{r:-1})
  +at(p,.6,`<div class="card" style="width:820px;padding:30px 40px;display:flex;align-items:center;gap:26px"><div style="font-size:80px">🤨</div><div class="h" style="font-size:44px;line-height:1.1">Inbox: "I don't trust<br>who sent this."</div></div>`,540,880,{r:2})},
 // 6 plugin update broke the form
 (p,t)=>{const br=p>.45;const sp=`<span style="display:inline-block;width:34px;height:34px;border:6px solid #BDBDBD;border-top-color:#777;border-radius:50%;transform:rotate(${t*400}deg);vertical-align:middle"></span>`;
  return at(p,0,`<div class="card" style="width:820px;padding:28px 34px;display:flex;align-items:center;gap:24px;background:#E9F6EE"><div style="font-size:60px">🔄</div><div><div class="h" style="font-size:40px;color:#0B6B37">Plugin updated ✓</div><div style="font-weight:600;font-size:26px;color:#4D8A66">Forms plugin v4.2 → v5.0</div></div></div>`,540,280)
  +at(p,.25,phone(form({broken:br,btn:br?sp+' Sending...':'Send enquiry'}),440,760),540,470,{r:2})
  +slam(p,.72,stamp('NOBODY CHECKED','#E5484D',52),540,1080,-5)},
 // 7 fix: monthly test from your phone
 (p,t)=>{const day=(k)=>`<div style="height:80px;border-radius:12px;background:${k===1?'#6557E8':'#F4F2FA'};color:${k===1?'#fff':'#B0AAC4'};font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">${k}</div>`;
  return at(p,0,`<div class="card" style="width:860px;padding:34px 40px;display:flex;gap:30px;align-items:center"><div style="font-size:90px">⏱️</div><div><div class="lab">THE FIX</div><div class="h" style="font-size:70px;margin-top:6px">2 minutes</div></div></div>`,540,280)
  +at(p,.3,`<div class="card" style="width:450px;padding:34px"><div class="lab" style="font-size:24px">EVERY MONTH</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:20px">${Array.from({length:15},(_,k)=>day(k+1)).join('')}</div><div style="margin-top:22px;background:#ECE8FF;color:#3B2FA8;border-radius:14px;padding:16px;font-weight:800;font-size:28px">📌 1st: test the form</div></div>`,300,560,{r:-3})
  +at(p,.55,phone(form({q:clamp((p-.55)*3)}),360,780),730,520,{r:3})},
 // 8 arrives in main inbox, not spam
 (p,t)=>{const arr=p>.25;
  return at(p,0,`<div class="card" style="width:880px;overflow:hidden"><div style="display:flex;gap:16px;padding:26px 30px;background:#F6F4FC"><div style="padding:14px 30px;border-radius:999px;font-weight:800;font-size:32px;background:#fff">Inbox ${arr?'<span style="background:#6557E8;color:#fff;border-radius:999px;padding:2px 14px">1</span>':''}</div><div style="padding:14px 30px;border-radius:999px;font-weight:800;font-size:32px;color:#8A82A8">Spam 0</div></div>
   <div style="transform:translateY(${arr?(1-ease((p-.25)*5))*-80:-80}px);opacity:${arr?1:0}">${mailRow('Website form','New enquiry: test from Jayden',{hi:1})}</div>${mailRow('Supplier','Timber order confirmed')}${mailRow('Bank','Your statement is ready')}${mailRow('Sam','Saturday footy?')}</div>`,540,300,{r:-1})
  +at(p,.45,`<div class="card" style="width:640px;padding:30px 40px">${[['Main inbox',.5],['Not spam',.68]].map(([s,d])=>`<div style="display:flex;gap:22px;align-items:center;margin:14px 0">${tick(p>d)}<div class="h" style="font-size:50px">${s}</div></div>`).join('')}</div>`,540,960,{r:2})},
 // 9 phone number next to form
 (p,t)=>{const glow=clamp((p-.3)*4);
  return at(p,0,phone(form({extra:`<div style="margin-top:24px;border:4px solid ${glow>.5?'#6557E8':'#D5E2E4'};border-radius:16px;padding:18px;text-align:center;font-weight:800;font-size:32px;color:${TEAL};box-shadow:0 0 0 ${10*glow}px rgba(101,87,232,.25)">Or call 📞 0491 570 156</div>`}),500,1000,0),540,260,{r:-1})
  +at(p,.6,'<div class="pill" style="background:#150C2B;color:#fff;font-size:44px">always a backup</div>',540,1290,{r:-2})},
 // 10 CTA
 (p,t)=>{const o=(ic,txt,d,y)=>`<div style="position:absolute;top:${y}px;left:0;width:1080px">${at(p,d,`<div class="card" style="width:760px;padding:26px 36px;display:flex;align-items:center;gap:28px"><div style="font-size:60px">${ic}</div><div class="h" style="font-size:50px">${txt}</div></div>`,540,0)}</div>`;
  return at(p,0,'<div class="h" style="font-size:84px;text-align:center;width:960px;line-height:1.05;color:#fff">When did you last<br><span style="background:#B9A6FF;color:#150C2B;padding:0 .12em;border-radius:.1em">test yours</span>?</div>',540,280)
   +o('✅','This month',.08,540)+o('🤔','Can\'t remember',.16,700)+o('😬','Never',.24,860)
   +at(p,.42,'<div style="border-radius:999px;padding:26px 56px;font-size:52px;font-weight:800;white-space:nowrap;background:#fff;color:#6557E8;box-shadow:0 18px 40px rgba(21,12,43,.35)">+ Follow @nexaweb_dev</div>',540,1060)},
];
