import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173';
const out='artifacts/chinese-personal-qa';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1365,height:768}});
const page=await ctx.newPage();
await page.addInitScript(()=>{localStorage.setItem('resume-lang-ext','zh');localStorage.setItem('resume-lang','en')});

async function open(url){await page.goto(base+url,{waitUntil:'domcontentloaded'});await page.waitForTimeout(2750);return (await page.locator('body').textContent())||''}
function must(body,...items){for(const x of items)if(!body.includes(x))throw new Error(`missing Chinese copy: ${x}`)}
async function personal(){
 const brand=(await page.locator('.mp-brand b').textContent())?.trim();
 if(brand!=='KOSTIANTYN BRYL')throw new Error(`header is not personal: ${brand}`);
 const footer=(await page.locator('.mp-footer-brand strong').textContent())?.trim();
 if(footer!=='KOSTIANTYN BRYL')throw new Error(`footer is not personal: ${footer}`);
 const small=(await page.locator('.mp-brand small').textContent())?.trim();
 if(small!=='个人作品集')throw new Error(`Chinese personal label missing: ${small}`);
 if((await page.locator('.mp-brand img').getAttribute('src'))?.includes('norvexa.svg'))throw new Error('NORVEXA logo leaked into personal header');
}

let body=await open('/');
must(body,'将复杂工作转化','为清晰的产品与系统。','我如何创造价值','重点案例','证据与结果','项目方向');
await personal();
await page.screenshot({path:`${out}/home-zh-1365.png`,fullPage:true});

body=await open('/work/');
must(body,'项目','四个方向，一套产品方法。','查看项目');
await personal();

body=await open('/about/');
must(body,'关于我','我做什么','我如何思考','我如何工作');
await personal();

body=await open('/contact/');
must(body,'联系方式','产品 · 运营 · 软件开发 · 自动化','邮箱','作品集二维码');
await personal();
await page.screenshot({path:`${out}/contact-zh-1365.png`,fullPage:true});

body=await open('/work/clearup/');
must(body,'以隐私为先','案例研究','项目概览','技术栈');
await personal();

await ctx.close();await browser.close();console.log('Chinese + personal branding QA passed.');
