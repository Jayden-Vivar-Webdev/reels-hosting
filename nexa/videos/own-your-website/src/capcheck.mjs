// node capcheck.mjs reel.html : checks caption centring + safe zone at every chunk's fully-shown moment
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import { resolve } from 'node:path';
const req = createRequire('/home/claude/.npm-global/lib/node_modules/'); const { chromium } = req('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + resolve(process.argv[2])); await p.evaluate(() => document.fonts.ready);
const res = await p.evaluate(() => DATA.chunks.map(c => { const t = c.words[c.words.length-1].start + 0.1; window.render(t);
  const sp=[...document.querySelectorAll('#cap span')]; if(!sp.length) return {t,err:'no caption'};
  const cr=document.getElementById('cap').getBoundingClientRect(); const r=sp.map(s=>({left:cr.left+s.offsetLeft,right:cr.left+s.offsetLeft+s.offsetWidth,top:cr.top+s.offsetTop,bottom:cr.top+s.offsetTop+s.offsetHeight})); const L=Math.min(...r.map(x=>x.left)),R=Math.max(...r.map(x=>x.right)),T=Math.min(...r.map(x=>x.top)),B=Math.max(...r.map(x=>x.bottom));
  // centre of each visual line
  const rows={}; r.forEach(x=>{const k=Math.round(x.top);(rows[k]=rows[k]||[]).push(x)});
  const off=Object.values(rows).map(a=>Math.round((Math.min(...a.map(x=>x.left))+Math.max(...a.map(x=>x.right)))/2-540));
  return {t:+t.toFixed(2),text:c.words.map(w=>w.w).join(' '),off,L:Math.round(L),R:Math.round(R),T:Math.round(T),B:Math.round(B)} }));
let bad=0; for (const r of res) { const e=[]; if(r.err) e.push(r.err); else { if(r.off.some(o=>Math.abs(o)>12)) e.push('off-centre '+r.off); if(r.R>930&&r.B>940) e.push('into icon column R='+r.R); if(r.B>1620) e.push('into bottom UI B='+r.B); if(r.T<230) e.push('top T='+r.T);} if(e.length){bad++;console.log('FAIL',r.t,r.text,e.join('; '))} }
console.log(`${res.length} caption chunks checked, ${bad} problems`); await b.close(); process.exit(bad?1:0);
