import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base='http://127.0.0.1:4173';
const out='artifacts/modular-i18n-qa';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1365,height:768}});
await ctx.addInitScript(()=>{localStorage.setItem('resume-lang','zh');localStorage.removeItem('resume-lang-ext')});
const page=await ctx.newPage();

const forbidden=['multipage-core.js','final-v1.js','a11y-v1.js','easter-v1.js','pre-v11.js','pro-v11.js','proof-v12.js','proof-v12-home.js','polish-v121.js','polish-v121-lexicon.js','polish-v121-pages.js','polish-v121-final.js','zh-v13-ui.js','personal-v13.js'];

async function open(path,name,expected=[]){
  await page.goto(base+path,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.classList.contains('kb-ready'),null,{timeout:10000});
  const htmlLang=await page.locator('html').getAttribute('lang');
  if(htmlLang!=='zh-CN')throw new Error(`${path}: html lang is ${htmlLang}`);
  const body=(await page.locator('body').textContent())||'';
  for(const text of ['KOSTIANTYN BRYL','个人作品集','首页','项目','经历','案例','关于我','现在','项目生态','联系方式']){
    if(!body.includes(text))throw new Error(`${path}: shared Chinese shell missing ${text}`);
  }
  for(const text of expected)if(!body.includes(text))throw new Error(`${path}: Chinese main content missing ${text}`);
  const breadcrumb=await page.locator('#mpBreadcrumb').count()?((await page.locator('#mpBreadcrumb').textContent())||''):'';
  if(breadcrumb.includes('NORVEXA / ABOUT')||breadcrumb.startsWith('NORVEXA'))throw new Error(`${path}: legacy NORVEXA breadcrumb leaked`);
  const scripts=await page.evaluate(()=>performance.getEntriesByType('resource').map(x=>x.name.split('?')[0].split('/').pop()).filter(Boolean));
  for(const old of forbidden)if(scripts.includes(old))throw new Error(`${path}: legacy UI runtime loaded: ${old}`);
  for(const required of ['core.js','i18n.js','header.js','main.js','footer.js','utilities.js','bootstrap.js'])if(!scripts.includes(required))throw new Error(`${path}: modular runtime missing ${required}`);
  await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
}

await open('/','home',['将复杂工作转化','我能为业务做什么','重点案例','证据与结果']);
await open('/work/','work',['四个方向，一套产品方法。','围绕实用工作流程构建的 Android、Windows 与 Web 产品。','积极开发中']);
await open('/experience/','experience',['跨越技术与运营的职业经历。','电信工程师','国际订单负责人']);
await open('/case-studies/','cases',['在真实约束下做出的决策。','问题','方法','结果']);
await open('/about/','about',['商业判断与构建者思维。','我做什么','我如何思考','我如何工作','我连接运营、产品与技术执行']);
await open('/now/','now',['我现在正在构建什么。','以隐私为先的 Android 系统工具','积极开发中']);
await open('/contact/','contact',['一次有价值的交流','产品 · 运营 · 软件开发 · 自动化','简历二维码','只使用直接联系方式']);
await open('/ecosystem/','ecosystem',['项目生态','NORVEXA 是我个人作品集中的项目生态之一','面向 Android、Windows 与 Web 的实用软件']);
await open('/recruiter/','recruiter',['产品 · 运营 · 技术','拥有 10+ 年技术与运营经验']);
const recruiterCv=await page.locator('a[download]').first().getAttribute('href');
if(!recruiterCv?.includes('RECRUITER_ZH.pdf'))throw new Error(`Recruiter Chinese CV mismatch: ${recruiterCv}`);
await open('/engineering/','engineering',['具有系统思维的软件构建者。','工程 · Android · 自动化']);
await open('/product/','product',['由运营经验支撑的产品判断。','产品 · 运营']);
await open('/work/clearup/','clearup',['以隐私为先的 Android 存储工具','证据','问题','项目概览']);
await open('/work/cutflow-batch/','cutflow',['Windows 批量视频裁剪工具','项目概览']);
await open('/work/luma-bay/','luma',['以成长、氛围和短时移动体验为核心','项目概览']);
await open('/work/telemanage/','telemanage',['内容运营平台','项目概览']);
await open('/work/bryltab/','bryltab',['SystemUI','项目概览']);

await browser.close();
console.log('Modular Header/Main/Footer + five-language Chinese QA passed.');
