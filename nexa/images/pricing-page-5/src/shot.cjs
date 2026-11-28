const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+__dirname+'/slides.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const only=process.argv[2];
for(let i=1;i<=7;i++){if(only&&String(i)!==only)continue;await p.locator('#s'+i).screenshot({path:`png/${String(i).padStart(2,'0')}.png`});}await b.close()})();
