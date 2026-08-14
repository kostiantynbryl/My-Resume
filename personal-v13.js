(()=>{
const ROOT=document.documentElement.dataset.root||'.';
const PAGE=document.body?.dataset.page||'home';
const path=p=>ROOT==='.'?`./${p}`:`${ROOT.replace(/\/$/,'')}/${p}`;
const ext=()=>{try{return localStorage.getItem('resume-lang-ext')}catch{return null}};
const lang=()=>ext()==='zh'?'zh':(document.documentElement.lang==='uk'?'uk':(['pl','ru'].includes(document.documentElement.lang)?document.documentElement.lang:'en'));
const C={
 en:{small:'PERSONAL PORTFOLIO',footer:'Personal portfolio · Creating Tomorrow',ecosystem:'Project ecosystem',metric:'PROJECT DIRECTIONS',system:'KB SYSTEM'},
 pl:{small:'PORTFOLIO OSOBISTE',footer:'Portfolio osobiste · Creating Tomorrow',ecosystem:'Ekosystem projektów',metric:'KIERUNKI PROJEKTÓW',system:'SYSTEM KB'},
 ru:{small:'ЛИЧНОЕ ПОРТФОЛИО',footer:'Личное портфолио · Creating Tomorrow',ecosystem:'Экосистема проектов',metric:'НАПРАВЛЕНИЯ ПРОЕКТОВ',system:'СИСТЕМА KB'},
 uk:{small:'ОСОБИСТЕ ПОРТФОЛІО',footer:'Особисте портфоліо · Creating Tomorrow',ecosystem:'Екосистема проєктів',metric:'НАПРЯМИ ПРОЄКТІВ',system:'СИСТЕМА KB'},
 zh:{small:'个人作品集',footer:'个人作品集 · Creating Tomorrow',ecosystem:'项目生态',metric:'项目方向',system:'KB 系统'}
};
const text=(e,v)=>{if(e&&v!=null&&e.textContent!==v)e.textContent=v};
function patchBrand(){const c=C[lang()]||C.en;
 const brand=document.querySelector('.mp-brand');if(brand){const img=brand.querySelector('img');if(img){img.src=path('assets/kb.svg');img.alt='KB'}text(brand.querySelector('b'),'KOSTIANTYN BRYL');text(brand.querySelector('small'),c.small);brand.setAttribute('aria-label','Kostiantyn Bryl home')}
 const fb=document.querySelector('.mp-footer-brand');if(fb){const img=fb.querySelector('img');if(img){img.src=path('assets/kb.svg');img.alt='KB'}text(fb.querySelector('strong'),'KOSTIANTYN BRYL');text(fb.querySelector('span'),c.footer)}
 document.querySelectorAll('.v11-ecosystem').forEach(a=>{const span=a.querySelector('span');if(span)a.innerHTML=c.ecosystem+'<span>↗</span>';else text(a,c.ecosystem)});
 const metric=[...document.querySelectorAll('.mp-metric span')][2];if(metric)text(metric,c.metric);
 if(PAGE==='ecosystem'){const hero=document.querySelector('#ecosystemRoot .mp-page-hero');if(hero){text(hero.querySelector('.mp-eyebrow'),lang()==='zh'?'项目 / 生态':lang()==='ru'?'ПРОЕКТЫ / ЭКОСИСТЕМА':lang()==='uk'?'ПРОЄКТИ / ЕКОСИСТЕМА':lang()==='pl'?'PROJEKTY / EKOSYSTEM':'PROJECTS / ECOSYSTEM');text(hero.querySelector('h1'),c.ecosystem)}}
 if(PAGE==='experience'){document.querySelectorAll('.mp-timeline-row').forEach(row=>{if(row.querySelector('h3')?.textContent.trim()==='DataGroup')text(row.querySelector('time'),'2016—2018')})}
 document.title=document.title.replace(/NORVEXA\s*[×—-]?\s*/gi,'').replace(/\s+\|\s+NORVEXA/gi,'');
 const toast=document.getElementById('mpToast');if(toast&&/NORVEXA SYSTEM/i.test(toast.textContent))toast.textContent=toast.textContent.replace(/NORVEXA SYSTEM/i,c.system);
 const terminal=document.querySelector('.v11-terminal-head span:first-child');if(terminal&&/^NORVEXA/i.test(terminal.textContent))terminal.textContent=terminal.textContent.replace(/^NORVEXA/,'KB');
 const sys=document.querySelector('.v11-terminal-body');if(sys&&lang()==='zh'&&/NORVEXA/.test(sys.innerHTML))sys.innerHTML=sys.innerHTML.replaceAll('NORVEXA','KB');
}
function start(){patchBrand();[120,420,900,1600,2400].forEach(ms=>setTimeout(patchBrand,ms));const t=document.getElementById('mpToast');if(t)new MutationObserver(patchBrand).observe(t,{childList:true,subtree:true,characterData:true})}
document.addEventListener('click',e=>{if(e.target.closest('[data-lang],[data-zh-language]'))[80,240,700].forEach(ms=>setTimeout(patchBrand,ms))},true);
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start,{once:true}):start();
})();
