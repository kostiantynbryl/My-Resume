import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173';
const out='artifacts/localization-qa';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

const checks={
 ru:{home:['Чем я полезен бизнесу','Создаю продукты','Ключевой кейс','БЕЗОПАСНО.','Доказательства и результат','ПУТИ ПРИВИЛЕГИРОВАННОГО ВЫПОЛНЕНИЯ'],forbid:['What I actually do','Build products','Featured case','SAFE.','Proof & outcomes','PRIVILEGED EXECUTION PATHS'],project:['КЕЙС / ДОКАЗАТЕЛЬСТВА','Основатель / Продукт / Разработка','ТАЙМАУТ ЗАПРОСА СЛУЖБЫ ДОСТУПНОСТИ']},
 uk:{home:['Чим я корисний бізнесу','Створюю продукти','Ключовий кейс','БЕЗПЕЧНО.','Докази та результат','ШЛЯХИ ПРИВІЛЕЙОВАНОГО ВИКОНАННЯ'],forbid:['What I actually do','Build products','Featured case','SAFE.','Proof & outcomes','PRIVILEGED EXECUTION PATHS'],project:['КЕЙС / ДОКАЗИ','Засновник / Продукт / Розробка','ТАЙМАУТ ЗАПИТУ СЛУЖБИ ДОСТУПНОСТІ']},
 pl:{home:['Jaką wartość daję biznesowi','Tworzę produkty','Kluczowy case','BEZPIECZNIE.','Dowody i rezultat','ŚCIEŻKI WYKONANIA UPRZYWILEJOWANEGO'],forbid:['What I actually do','Build products','Featured case','SAFE.','Proof & outcomes','PRIVILEGED EXECUTION PATHS'],project:['CASE / DOWODY','Założyciel / Produkt / Inżynieria','LIMIT CZASU ŻĄDANIA DOSTĘPNOŚCI']}
};

for(const [lang,c] of Object.entries(checks)){
  const ctx=await browser.newContext({viewport:{width:1365,height:768}});
  const page=await ctx.newPage();
  await page.addInitScript(l=>localStorage.setItem('resume-lang',l),lang);
  await page.goto(base+'/',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1300);
  const body=await page.locator('body').innerText();
  for(const s of c.home)if(!body.includes(s))throw new Error(`${lang} home missing: ${s}`);
  for(const s of c.forbid)if(body.includes(s))throw new Error(`${lang} home leaked English: ${s}`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  if(overflow>2)throw new Error(`${lang} home horizontal overflow: ${overflow}px`);
  await page.screenshot({path:`${out}/home-${lang}-1365.png`,fullPage:true});
  await page.goto(base+'/work/clearup/',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1400);
  const project=await page.locator('body').innerText();
  for(const s of c.project)if(!project.includes(s))throw new Error(`${lang} ClearUp missing: ${s}`);
  for(const s of ['CASE / EVIDENCE','PRIVILEGED EXECUTION PATHS','Founder / Product / Engineering'])if(project.includes(s))throw new Error(`${lang} ClearUp leaked English: ${s}`);
  await page.screenshot({path:`${out}/clearup-${lang}-1365.png`,fullPage:true});
  await ctx.close();
}
await browser.close();
console.log('Multilingual visual/localization QA passed.');
