import { createRequire } from 'node:module';
import { spawn, execSync } from 'node:child_process';
import { renameSync } from 'node:fs';
import { resolve } from 'node:path';
const req = createRequire(execSync('npm root -g').toString().trim() + '/');
const { chromium } = req('playwright');
const [html, out, secs, fpsArg] = process.argv.slice(2);
const fps = Number(fpsArg || 30), n = Math.round(Number(secs) * fps);
const tmp = out.replace(/\.mp4$/, '.part.mp4');
const exe = execSync('which google-chrome || which chromium').toString().trim();
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto('file://' + resolve(html));
await page.evaluate(() => window.fontsReady || document.fonts.ready);
const ff = spawn('ffmpeg', ['-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-',
  '-c:v','libx264','-crf','18','-preset','veryfast','-pix_fmt','yuv420p','-movflags','+faststart', tmp],
  { stdio: ['pipe','ignore','inherit'] });
for (let i = 0; i < n; i++) {
  await page.evaluate(t => window.render(t), i / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end();
const code = await new Promise(r => ff.on('close', r));
await browser.close();
if (code === 0) { renameSync(tmp, out); console.log('wrote', out); } else process.exit(code);
