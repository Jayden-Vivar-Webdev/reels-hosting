import { createRequire } from 'node:module'; import { resolve } from 'node:path';
const req = createRequire('/opt/npm-tools/node_modules/'); const { chromium } = req('playwright');
const [html,out,...ts]=process.argv.slice(2);
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+resolve(html)); await p.evaluate(()=>document.fonts.ready);
for(const t of ts){await p.evaluate(t=>window.render(t),+t); await p.screenshot({path:`${out}/s_${(+t).toFixed(1)}.jpg`,type:'jpeg',quality:80});}
await b.close();
