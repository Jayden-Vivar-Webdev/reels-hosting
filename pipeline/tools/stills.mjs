// node stills.mjs page.html outdir t1 t2 ...
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process'; import { resolve } from 'node:path';
const req = createRequire(execSync('npm root -g').toString().trim() + '/'); const { chromium } = req('playwright');
const [html, out, ...ts] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: execSync('which google-chrome').toString().trim() });
const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
pg.on('pageerror', e => console.log('ERR', e.message));
await pg.goto('file://' + resolve(html)); await pg.evaluate(() => window.fontsReady);
for (const t of ts){ await pg.evaluate(t => window.render(t), Number(t)); await pg.screenshot({ path: `${out}/s_${t}.jpg`, type: 'jpeg', quality: 80 }); }
await b.close(); console.log('ok');
