import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173';
const out='artifacts/localization-qa';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

const checks={
 ru:{home:['Чем я полезен бизнесу','Создаю продукты','Ключевой кейс','БЕЗОПАСНО.','Доказательства и результат','ПУТИ ПРИВИЛЕГИРОВАННОГО ВЫПОЛНЕНИЯ'],forbid:['What I actually do','Build products','Featured case','SAFE.','Proof & outcomes','PRIVILEGED EXECUTION PATHS'],project:['КЕЙС / ДОКАЗАТЕЛЬСТВА','Основатель / Продукт / Разработка','ТАЙМАУТ ЗАПРОСА СЛУЖБЫ ДОСТУПНОСТИ'],work:['NORVEXA / ПРОЕКТЫ','ОТКРЫТЬ →'],contact:['КОНТАКТЫ / НАПРЯМУЮ','Продукт · Операции · Разработка · Автоматизация','Только прямые каналы. Без контактной формы и лишнего отслеживания.','QR ПОРТФОЛИО']},
 uk:{home:['Чим я корисний бізнесу','Створюю продукти','Ключовий кейс','БЕЗПЕЧНО.','Докази та результат','ШЛЯХИ ПРИВІЛЕЙОВАНОГО ВИКОНАННЯ'],forbid:['What I actually do','Build products','Featured case','SAFE.','Proof & outcomes','PRIVILEGED EXECUTION PATHS'],project:['КЕЙС / ДОКАЗИ','Засновник / Продукт / Розробка','ТАЙМАУТ ЗАПИТУ СЛУЖБИ ДОСТУПНОСТІ'],work:['NORVEXA / ПРОЄКТИ','ВІДКРИТИ →'],contact:['КОНТАКТИ / НАПРЯМУ','Продукт · Операції · Розробка · Автоматизація','Лише прямі канали. Без контактної форми та зайвого відстеження.','QR ПОРТФОЛІО']},
 pl:{home:['Jaką wartość daję biznesowi','Tworzę produkty','Kluczowy case','BEZPIECZNIE.','Dowody i rezultat','ŚCIEŻKI WYKONANIA UPRZYWILEJOWANEGO'],forbid:['What I actually do','Build products','Featured case','SAFE.','Proof & outcomes','PRIVILEGED EXECUTION PATHS'],project:['CASE / DOWODY','Założyciel / Produkt / Inżynieria','LIMIT CZASU ŻĄDANIA DOSTĘPNOŚCI'],work:['NORVEXA / PROJEKTY','OTWÓRZ →'],contact:['KONTAKT / BEZPOŚREDNIO','Produkt · Operacje · Oprogramowanie · Automatyzacja','Tylko bezpośrednie kanały. Bez formularza i warstwy śledzącej.','QR PORTFOLIO']}
};

async function bodyFor(page,url,wait=1450){await page.goto(base+url,{waitUntil:'domcontentloaded'});await page.waitForTimeout(wait);return page.locator('body').innerText()}
function requireAll(lang,label,body,items){for(const s of items)if(!body.includes(s))throw new Error(`${lang} ${label} missing: ${s}`)}

for(const [lang,c] of Object.entries(checks)){
  const ctx=await browser.newContext({viewport:{width:1365,height:768}});
  const page=await ctx.newPage();
  await page.addInitScript(l=>localStorage.setItem('resume-lang',l),lang);

  const home=await bodyFor(page,'/',1500);
  requireAll(lang,'home',home,c.home);
  for(const s of c.forbid)if(home.includes(s))throw new Error(`${lang} home leaked English: ${s}`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  if(overflow>2)throw new Error(`${lang} home horizontal overflow: ${overflow}px`);
  await page.screenshot({path:`${out}/home-${lang}-1365.png`,fullPage:true});

  const project=await bodyFor(page,'/work/clearup/',1600);
  requireAll(lang,'ClearUp',project,c.project);
  for(const s of ['CASE / EVIDENCE','PRIVILEGED EXECUTION PATHS','Founder / Product / Engineering'])if(project.includes(s))throw new Error(`${lang} ClearUp leaked English: ${s}`);
  await page.screenshot({path:`${out}/clearup-${lang}-1365.png`,fullPage:true});

  const work=await bodyFor(page,'/work/',1500);
  requireAll(lang,'work',work,c.work);
  if(work.includes('EXPLORE →'))throw new Error(`${lang} work leaked English EXPLORE`);

  const contact=await bodyFor(page,'/contact/',1450);
  requireAll(lang,'contact',contact,c.contact);
  for(const s of ['CONNECT / DIRECT','Direct channels only. No contact-form tracking layer.','Resume QR','Scan to open the latest published version of this portfolio.'])if(contact.includes(s))throw new Error(`${lang} contact leaked English: ${s}`);
  await page.screenshot({path:`${out}/contact-${lang}-1365.png`,fullPage:true});
  await ctx.close();
}
await browser.close();
console.log('Multilingual visual/localization QA passed.');
