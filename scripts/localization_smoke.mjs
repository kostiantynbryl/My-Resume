import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173';
const out='artifacts/localization-qa';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});

const checks={
  ru:{
    html:'ru',brand:'ЛИЧНОЕ ПОРТФОЛИО',
    home:['Чем я полезен бизнесу','Создаю продукты','Ключевой кейс','БЕЗОПАСНО.','Доказательства и результат'],
    work:['ПОРТФОЛИО / ПРОЕКТЫ','Четыре направления. Один продуктовый подход.','Открыть →'],
    about:['Бизнес-мышление с инстинктом создателя.','Что я делаю','Как я думаю','Как я работаю'],
    contact:['КОНТАКТ / НАПРЯМУЮ','Продукт · Операции · Разработка ПО · Автоматизация','Только прямые каналы связи.','QR резюме']
  },
  uk:{
    html:'uk',brand:'ОСОБИСТЕ ПОРТФОЛІО',
    home:['Чим я корисний бізнесу','Створюю продукти','Ключовий кейс','БЕЗПЕЧНО.','Докази та результат'],
    work:['ПОРТФОЛІО / ПРОЄКТИ','Чотири напрями. Один продуктовий підхід.','Відкрити →'],
    about:['Бізнес-мислення з інстинктом творця.','Що я роблю','Як я думаю','Як я працюю'],
    contact:['КОНТАКТ / НАПРЯМУ','Продукт · Операції · Розробка ПЗ · Автоматизація','Тільки прямі канали зв’язку.','QR резюме']
  },
  pl:{
    html:'pl',brand:'PORTFOLIO OSOBISTE',
    home:['Co robię w praktyce','Tworzę produkty','Kluczowy case','BEZPIECZNIE.','Dowody i rezultat'],
    work:['PORTFOLIO / PROJEKTY','Cztery kierunki. Jedna dyscyplina produktowa.','Otwórz →'],
    about:['Osąd biznesowy z instynktem twórcy.','Co robię','Jak myślę','Jak pracuję'],
    contact:['KONTAKT / BEZPOŚREDNIO','Produkt · Operacje · Software · Automatyzacja','Tylko bezpośrednie kanały.','QR do CV']
  }
};

async function open(page,url){
  await page.goto(base+url,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.classList.contains('kb-ready'),null,{timeout:10000});
  return (await page.locator('body').textContent())||'';
}
function must(lang,label,body,items){for(const x of items)if(!body.includes(x))throw new Error(`${lang} ${label} missing: ${x}`)}

for(const [lang,c] of Object.entries(checks)){
  const ctx=await browser.newContext({viewport:{width:1365,height:768}});
  await ctx.addInitScript(l=>{localStorage.setItem('resume-lang',l);localStorage.removeItem('resume-lang-ext')},lang);
  const page=await ctx.newPage();
  let body=await open(page,'/');
  must(lang,'home',body,[c.brand,...c.home]);
  if((await page.locator('html').getAttribute('lang'))!==c.html)throw new Error(`${lang}: wrong html lang`);
  await page.screenshot({path:`${out}/home-${lang}-1365.png`,fullPage:true});

  body=await open(page,'/work/');must(lang,'work',body,c.work);
  body=await open(page,'/about/');must(lang,'about',body,c.about);
  const crumb=(await page.locator('#mpBreadcrumb').textContent())||'';
  if(crumb.startsWith('NORVEXA'))throw new Error(`${lang}: legacy breadcrumb leaked`);
  body=await open(page,'/contact/');must(lang,'contact',body,c.contact);
  await page.screenshot({path:`${out}/contact-${lang}-1365.png`,fullPage:true});
  await ctx.close();
}
await browser.close();
console.log('EN-independent RU / UA / PL modular localization QA passed.');
