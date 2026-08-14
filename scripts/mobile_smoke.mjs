import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const base=process.env.VISUAL_BASE||'http://127.0.0.1:4173/';
const cases=[
  {name:'home',path:''},
  {name:'work',path:'work/'},
  {name:'clearup',path:'work/clearup/'}
];
const viewports=[
  {name:'375',width:375,height:812},
  {name:'430',width:430,height:932},
  {name:'768',width:768,height:1024},
  {name:'1024',width:1024,height:900}
];
await fs.mkdir('artifacts/visual-qa',{recursive:true});
const browser=await chromium.launch({headless:true});
let failed=false;
for(const vp of viewports){
  const ctx=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
  for(const c of cases){
    const page=await ctx.newPage();
    await page.goto(new URL(c.path,base).href,{waitUntil:'domcontentloaded',timeout:15000});
    await page.waitForSelector('main',{state:'attached',timeout:5000});
    await page.waitForTimeout(900);
    const check=await page.evaluate(()=>({
      width:document.documentElement.scrollWidth,
      inner:window.innerWidth,
      header:!!document.querySelector('#mpHeader'),
      main:!!document.querySelector('main'),
      headerHeight:document.querySelector('#mpHeader')?.getBoundingClientRect().height||0
    }));
    if(check.width>check.inner+1||!check.header||!check.main||check.headerHeight<40){
      console.error('Responsive smoke failed',c.name,vp.name,check);failed=true;
    }
    await page.screenshot({path:`artifacts/visual-qa/${c.name}-${vp.name}.png`,fullPage:true});
    await page.close();
  }
  await ctx.close();
}
await browser.close();
if(failed)process.exit(1);
console.log('Responsive smoke checks passed.');
