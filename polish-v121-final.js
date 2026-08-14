(()=>{
const lang=()=>document.documentElement.lang==='uk'?'uk':(['pl','ru'].includes(document.documentElement.lang)?document.documentElement.lang:'en');
const C={
 en:{profile:'Product & Operations Leader · Software Builder',brand:'NORVEXA / PORTFOLIO',email:'Email ↗',githubSnapshot:'GitHub snapshot',loading:'Loading GitHub…'},
 pl:{profile:'Lider produktu i operacji · Twórca oprogramowania',brand:'NORVEXA / PORTFOLIO',email:'E-mail ↗',githubSnapshot:'Snapshot GitHub',loading:'Ładowanie GitHub…'},
 ru:{profile:'Руководитель продукта и операций · Разработчик',brand:'NORVEXA / ПОРТФОЛИО',email:'Почта ↗',githubSnapshot:'Снимок GitHub',loading:'Загрузка GitHub…'},
 uk:{profile:'Керівник продукту й операцій · Розробник',brand:'NORVEXA / ПОРТФОЛІО',email:'Пошта ↗',githubSnapshot:'Знімок GitHub',loading:'Завантаження GitHub…'}
};
function patch(){const d=C[lang()]||C.en;const profile=document.querySelector('.mp-id-copy p');if(profile)profile.textContent=d.profile;const brand=document.querySelector('.mp-brand small');if(brand)brand.textContent=d.brand;document.querySelectorAll('.mp-footer-map a[href^="mailto:"]').forEach(a=>a.textContent=d.email);const snap=document.getElementById('githubSnapshot');if(snap){const small=snap.querySelector('small'),span=snap.querySelector('span');if(small)small.textContent=d.githubSnapshot;if(span&&/Loading GitHub|Ładowanie GitHub|Загрузка GitHub|Завантаження GitHub/.test(span.textContent))span.textContent=d.loading}}
function schedule(){[80,520,1100,1750].forEach(ms=>setTimeout(patch,ms))}
document.addEventListener('click',e=>{if(e.target.closest('[data-lang]')){setTimeout(patch,240);setTimeout(patch,720)}},true);
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',schedule,{once:true}):schedule();
})();