const money=n=>'$'+Math.round(n).toLocaleString('en-US');
const stamp=(txt,fs=64)=>`<div class="h" style="font-size:${fs}px;padding:14px 34px;border:7px solid #FF5C7A;color:#FF5C7A;border-radius:18px;letter-spacing:4px;white-space:nowrap;background:rgba(10,6,22,.6);box-shadow:0 0 40px rgba(255,92,122,.35)">${txt}</div>`;
// email card: from, subject, body, footer html
function mail(body,foot,p,o={}){return `<div class="glass" style="width:${o.w||900}px;padding:40px 48px 44px;text-align:left"><div style="display:flex;align-items:center;gap:20px"><div style="width:78px;height:78px;border-radius:50%;background:linear-gradient(135deg,#7C6CFF,#5845E0);display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:800">S</div><div><div style="font-size:38px;font-weight:800">Sam</div><div class="muted" style="font-size:28px;font-weight:700">to: Alex · Re: Friday?</div></div></div><div style="border-top:2px dashed rgba(185,166,255,.25);margin:26px 0"></div><div style="font-size:46px;font-weight:700;line-height:1.3">${body}</div>${foot!==undefined?`<div style="margin-top:30px;padding-top:22px;border-top:2px solid rgba(185,166,255,.18);min-height:120px;font-size:38px;font-weight:700;line-height:1.35;color:#DCD3FF">${foot}</div>`:''}${shine(p,.1)}</div>`}
const hl=(s,q)=>`<span style="background:rgba(139,123,255,${.35*q});border-radius:10px;box-shadow:0 0 ${30*q}px rgba(139,123,255,${.5*q});padding:2px 6px">${s}</span>`;
const LOGO=fs=>`<span class="h" style="font-size:${fs}px">Ho<span style="color:#B9A6FF">TM</span>ai<span style="color:#B9A6FF">L</span></span>`;
const SC=[
 // 0 hook
 (p,t)=>lab('DID YOU KNOW',p)+at(p,0,'<div class="h" style="font-size:116px;text-align:left;width:940px">One email<br>footer was worth</div>',80,370,{c:false,t})
   +at(p,.3,'<div class="h" style="font-size:170px;white-space:nowrap"><span class="box">$400M</span></div>',80,640,{c:false,r:-4,t})
   +at(p,.55,`<div class="glass" style="width:860px;padding:30px 40px;text-align:left"><div class="muted" style="font-size:30px;font-weight:700">— — — — — — — — —</div><div style="font-size:38px;font-weight:800;margin-top:12px">${hl('Get your free email at …',clamp((p-.7)*4))}</div>${shine(p,.6)}</div>`,540,950,{t}),
 // 1 1996 launch
 (p,t)=>lab('1996',p)+at(p,0,browser(900,'hotmail.com',`<div style="padding:56px 50px 60px;text-align:center">${LOGO(140)}<div class="h" style="font-size:58px;margin-top:24px">Free email.</div><div class="h grad" style="font-size:58px;margin-top:8px">${typed('Open it in any browser.',p,.45,.8)}</div></div>`,p),540,350,{t})
   +at(p,.25,'<div class="chip" style="font-size:44px">🛠 two engineers</div>',540,1010,{r:-3,t})
   +at(p,.42,'<div class="chip" style="font-size:40px">🎆 launched July 4</div>',540,1120,{r:3,t}),
 // 2 tied to provider
 (p,t)=>{const k=ease((p-.3)*3);return lab('BACK THEN',p)+at(p,0,`<div class="glass" style="width:400px;padding:40px;text-align:center"><div style="font-size:120px">✉️</div><div class="h" style="font-size:46px;margin-top:10px">your email</div></div>`,300,420,{t})
   +at(p,.15,`<div class="glass" style="width:400px;padding:40px;text-align:center"><div style="font-size:120px">🌐</div><div class="h" style="font-size:46px;margin-top:10px">internet provider</div></div>`,780,420,{t})
   +`<div style="position:absolute;left:500px;top:560px;width:${80*k}px;height:14px;border-radius:7px;background:#B9A6FF;box-shadow:0 0 20px #8B7BFF"></div><div style="position:absolute;left:540px;top:540px;transform:translate(-50%,0) scale(${k});font-size:60px">🔗</div>`
   +at(p,.5,`<div class="glass mono" style="padding:26px 44px;font-size:44px;font-weight:700">sam@<span style="color:#FF9DB0">your-provider</span>.net</div>`,540,820,{t})
   +at(p,.68,'<div class="chip" style="font-size:42px">🔒 tied to one provider</div>',540,1010,{r:-3,t})},
 // 3 billboards too expensive
 (p,t)=>lab('THE PLAN',p)+at(p,0,`<div style="width:880px;text-align:center"><div style="height:400px;border-radius:24px;background:linear-gradient(135deg,#2A1D55,#1A1238);border:6px solid rgba(185,166,255,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 40px 90px rgba(0,0,0,.55)">${LOGO(120)}<div class="h" style="font-size:56px;margin-top:16px">Free email!</div></div><div style="display:flex;justify-content:space-around;width:60%;margin:0 auto"><div style="width:26px;height:220px;background:linear-gradient(#3A2D6E,#1A1238)"></div><div style="width:26px;height:220px;background:linear-gradient(#3A2D6E,#1A1238)"></div></div></div>`,540,330,{t,float:3})
   +ring(540,620,p,.55,'255,92,122')+at(p,.55,stamp('💸 TOO EXPENSIVE',70),540,560,{r:-7,t,dy:-60})
   +at(p,.7,'<div class="chip" style="font-size:42px">🧑‍💼 says the investor</div>',540,1060,{r:3,t}),
 // 4 idea: one line at bottom
 (p,t)=>{const q=clamp((p-.45)*4);return lab('THE IDEA',p)+at(p,0,mail('See you Friday! 🍕',`<div style="border:4px dashed rgba(185,166,255,${.3+.6*q});border-radius:18px;height:90px;display:flex;align-items:center;justify-content:center;color:#B9A6FF;font-size:40px;opacity:${.3+.7*q}">＋ one line here</div>`,p),540,360,{t})
   +at(p,.6,'<div class="chip" style="font-size:42px">📨 on every email users send</div>',540,1090,{r:-3,t})},
 // 5 footer typed
 (p,t)=>{const s='PS: I love you. Get your free email at Hotmail';const n=Math.floor(s.length*clamp((p-.05)/.75));const a=s.slice(0,Math.min(n,15)),b=s.slice(15,n);
  return lab('THE FOOTER',p)+at(p,0,mail('See you Friday! 🍕',`<span style="color:#FF9DB0">${a}</span><span style="color:#fff;text-decoration:underline;text-decoration-color:#8B7BFF;text-underline-offset:8px">${b}</span>${p<.85?caret(t):''}`,p),540,360,{t})
   +at(p,.4,'<div style="font-size:120px">❤️</div>',860,960,{r:10,t})},
 // 6 founders hated it; cut I love you, kept link
 (p,t)=>{const c=ease((p-.35)*4),k=clamp((p-.6)*5);return lab('THE FOUNDERS',p)+at(p,0,mail('See you Friday! 🍕',`<span style="position:relative;color:#FF9DB0;opacity:${1-.6*c}">PS: I love you.<span style="position:absolute;left:-6px;right:-6px;top:48%;height:8px;border-radius:4px;background:#FF5C7A;transform:scaleX(${c});transform-origin:0 50%;box-shadow:0 0 16px #FF5C7A"></span></span> <span style="text-decoration:underline;text-decoration-color:#4BE39A;text-underline-offset:8px;${k?`background:rgba(75,227,154,${.15*k});border-radius:8px`:''}">Get your free email at Hotmail</span>`,p),540,360,{t})
   +at(p,.12,'<div class="h" style="font-size:80px;white-space:nowrap">😬 “We hate it.”</div>',540,950,{t})
   +at(p,.62,'<div class="chip" style="font-size:44px;background:rgba(75,227,154,.12);border-color:rgba(75,227,154,.45);color:#B8F5D6">✓ link kept</div>',540,1100,{r:-3,t})},
 // 7 every email a free ad from a friend
 (p,t)=>{let h='';const N=[[540,560,0],[260,420,1],[820,420,1],[200,720,1],[880,720,1],[380,860,2],[700,860,2],[120,560,2],[960,560,2]];
  N.forEach(([x,y,g],i)=>{const s=spring((p-.08-g*.18-i*.02)*3);if(i)h+=`<div style="position:absolute;left:540px;top:560px;width:${Math.hypot(x-540,y-560)*clamp(s)}px;height:3px;background:linear-gradient(90deg,rgba(185,166,255,.6),rgba(185,166,255,.1));transform-origin:0 50%;transform:rotate(${Math.atan2(y-560,x-540)}rad)"></div>`;
   h+=`<div style="position:absolute;left:${x}px;top:${y}px;transform:translate(-50%,-50%) scale(${(i?.7:1.1)*clamp(s,0,1.2)});font-size:90px;filter:drop-shadow(0 0 20px rgba(139,123,255,.6))">${i?'✉️':'😊'}</div>`});
  return lab('THE MAGIC',p)+h+at(p,.55,'<div class="h" style="font-size:96px;white-space:nowrap">a free ad,</div>',540,950,{t})+at(p,.72,'<div class="h" style="font-size:96px;white-space:nowrap"><span class="box">from a friend</span></div>',540,1070,{r:-3,t})},
 // 8 growth to 9M
 (p,t)=>{const g=eio((p-.15)/.6);const pts=[];for(let k=0;k<=40;k++){const x=k/40;if(x>g)break;pts.push(`${40+x*720},${440-400*Math.pow(x,3.2)}`)}
  return lab('SIGNUPS',p)+at(p,0,`<div class="glass" style="width:880px;padding:40px 50px"><div class="muted" style="font-size:30px;font-weight:700;letter-spacing:6px">USERS · END OF 1997</div><div class="h grad mono" style="font-size:110px;margin-top:10px;letter-spacing:-5px">${(9e6*g).toLocaleString('en-US',{maximumFractionDigits:0})}${g>.99?'+':''}</div><svg width="780" height="470" style="margin-top:10px;overflow:visible"><polyline points="${pts.join(' ')}" fill="none" stroke="#B9A6FF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 14px #8B7BFF)"/><line x1="40" y1="445" x2="770" y2="445" stroke="rgba(185,166,255,.3)" stroke-width="3"/><text x="40" y="490" fill="#9C92C8" font-size="30" font-weight="700" font-family="DM Sans">1996</text><text x="690" y="490" fill="#9C92C8" font-size="30" font-weight="700" font-family="DM Sans">1997</text></svg>${shine(p,.7)}</div>`,540,330,{t,float:3})
   +at(p,.08,'<div class="chip" style="font-size:44px">🚀 signups exploded</div>',540,1120,{r:-3,t})},
 // 9 Microsoft bought it ~$400M
 (p,t)=>{const v=4e8*eio((p-.3)/.45);return lab('THE SALE',p)+at(p,0,`<div class="glass" style="width:880px;padding:50px 56px;text-align:center"><div class="muted" style="font-size:30px;font-weight:700;letter-spacing:8px">BOUGHT BY MICROSOFT</div><div class="h grad mono" style="font-size:96px;margin-top:22px;letter-spacing:-5px">${money(v)}</div><div class="muted" style="font-size:36px;font-weight:700;margin-top:14px">reported price · Dec 1997</div>${shine(p,.6)}</div>`,540,420,{t})
   +ring(540,660,p,.7)+at(p,.72,stamp('SOLD',90).replace(/#FF5C7A/g,'#4BE39A').replace('255,92,122','75,227,154'),540,920,{r:-6,t,dy:-60})},
 // 10 lesson
 (p,t)=>lab('THE LESSON',p)+at(p,0,'<div class="h" style="font-size:120px;text-align:left;width:940px">Everything<br>you send is</div>',80,400,{c:false,t})
   +at(p,.35,'<div class="h" style="font-size:150px"><span class="box">marketing.</span></div>',80,700,{c:false,r:-3,t}),
 // 11 checklist
 (p,t)=>{const it=[['✍️','Email signature'],['🧾','Invoices'],['📄','Quotes']];let h='';it.forEach(([e,n],i)=>{const s=spring((p-.05-i*.16)*3.2),ck=clamp((p-.55-i*.08)*6);h+=`<div style="display:flex;align-items:center;gap:26px;padding:26px 34px;margin:18px 0;border-radius:24px;background:rgba(255,255,255,.06);border:1.5px solid rgba(185,166,255,.2);transform:translateX(${(1-s)*80}px);opacity:${clamp(s*2)}"><span style="font-size:60px">${e}</span><span class="h" style="font-size:56px;flex:1">${n}</span><span class="chip mono" style="font-size:26px;padding:10px 18px;opacity:${ck}">🔗 yoursite.com.au</span></div>`});
  return lab('DO THIS',p)+at(p,0,`<div class="glass" style="width:900px;padding:30px 40px">${h}${shine(p,.6)}</div>`,540,360,{t,float:3})
   +at(p,.7,'<div class="chip" style="font-size:44px;background:rgba(75,227,154,.12);border-color:rgba(75,227,154,.45);color:#B8F5D6">✓ free ads, every day</div>',540,1060,{r:-3,t})},
 // 12 CTA
 (p,t)=>lab('YOUR CALL',p)+at(p,0,'<div class="h" style="font-size:100px;text-align:center;width:960px">Would you have kept<br>the “I love you”? ❤️</div>',540,360,{t})
   +at(p,.2,'<div style="display:flex;gap:30px"><div class="glass" style="padding:28px 60px;font-size:60px;font-weight:800;border-color:rgba(75,227,154,.5)">✓ Yes</div><div class="glass" style="padding:28px 60px;font-size:60px;font-weight:800;border-color:rgba(255,92,122,.5)">✕ No</div></div>',540,690,{t})
   +at(p,.5,'<div class="glass" style="border-radius:999px;padding:26px 54px;font-size:50px;font-weight:800;white-space:nowrap;background:linear-gradient(135deg,#7C6CFF,#5845E0);border-color:rgba(255,255,255,.3);box-shadow:0 20px 60px rgba(101,87,232,.6)">+ Follow @nexaweb_dev</div>',540,1000,{t}),
];
