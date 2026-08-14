(()=>{
const ROOT=document.documentElement.dataset.root||'.';
const path=p=>ROOT==='.'?`./${p}`:`${ROOT.replace(/\/$/,'')}/${p}`;
const lang=()=>document.documentElement.lang==='uk'?'uk':(['pl','ru'].includes(document.documentElement.lang)?document.documentElement.lang:'en');
const C={
 en:{whatCode:'PROFILE / 04',what:'How I create value',pillars:[['Build products','From idea and structure to a working product.'],['Lead operations','Build processes, ownership and control.'],['Automate systems','Remove manual repetition and operational friction.'],['Ship outcomes','Turn decisions into working, usable software.']],featuredCode:'FEATURED / CASE 01',featuredHead:'Featured case',slogan:['SAFE.','LOCAL.','EXPLICIT.'],proof:'Proof & outcomes',featured:'ClearUp — safety before spectacle.',lead:'An Android utility where privileged actions are explicit, local and auditable instead of hidden behind a one-tap promise.',concept:'Product visual — not a UI screenshot',open:'Open project →',repo:'Open source evidence ↗',metrics:['PRIVILEGED EXECUTION PATHS','FIXED SHIZUKU OPERATIONS','ACCESSIBILITY REQUEST TIMEOUT','ADS / ANALYTICS / ACCOUNT / CLOUD']},
 pl:{whatCode:'PROFIL / 04',what:'Jaką wartość daję biznesowi',pillars:[['Tworzę produkty','Od pomysłu i struktury do działającego rozwiązania.'],['Prowadzę operacje','Buduję procesy, odpowiedzialność i kontrolę.'],['Automatyzuję systemy','Usuwam ręczną rutynę i powtarzalne kroki.'],['Dowożę rezultat','Nie kończę na projekcie — doprowadzam do działającego rozwiązania.']],featuredCode:'KLUCZOWY CASE / 01',featuredHead:'Kluczowy case',slogan:['BEZPIECZNIE.','LOKALNIE.','JAWNIE.'],proof:'Dowody i rezultat',featured:'ClearUp — bezpieczeństwo ważniejsze niż efekt wow.',lead:'Narzędzie Android, w którym działania uprzywilejowane są jawne, lokalne i możliwe do audytu, zamiast ukryte za obietnicą „jednego kliknięcia”.',concept:'Wizualizacja produktu — nie zrzut UI',open:'Otwórz projekt →',repo:'Otwórz dowody w repo ↗',metrics:['ŚCIEŻKI WYKONANIA UPRZYWILEJOWANEGO','STAŁE OPERACJE SHIZUKU','LIMIT CZASU ŻĄDANIA DOSTĘPNOŚCI','REKLAMY / ANALITYKA / KONTO / CHMURA']},
 ru:{whatCode:'ПРОФИЛЬ / 04',what:'Чем я полезен бизнесу',pillars:[['Создаю продукты','От идеи и структуры до рабочего решения.'],['Управляю операциями','Выстраиваю процессы, роли и контроль.'],['Автоматизирую системы','Убираю ручную рутину и повторяющиеся шаги.'],['Довожу до результата','Не просто проектирую — довожу до рабочего состояния.']],featuredCode:'КЛЮЧЕВОЙ КЕЙС / 01',featuredHead:'Ключевой кейс',slogan:['БЕЗОПАСНО.','ЛОКАЛЬНО.','ПРОЗРАЧНО.'],proof:'Доказательства и результат',featured:'ClearUp — безопасность важнее эффектности.',lead:'Android-утилита, в которой привилегированные действия сделаны явными, локальными и проверяемыми, а не скрыты за обещанием «одной кнопки».',concept:'Продуктовый визуал — не скриншот интерфейса',open:'Открыть проект →',repo:'Открыть доказательства в репозитории ↗',metrics:['ПУТИ ПРИВИЛЕГИРОВАННОГО ВЫПОЛНЕНИЯ','ФИКСИРОВАННЫЕ ОПЕРАЦИИ SHIZUKU','ТАЙМАУТ ЗАПРОСА СЛУЖБЫ ДОСТУПНОСТИ','РЕКЛАМА / АНАЛИТИКА / АККАУНТ / ОБЛАКО']},
 uk:{whatCode:'ПРОФІЛЬ / 04',what:'Чим я корисний бізнесу',pillars:[['Створюю продукти','Від ідеї та структури до робочого рішення.'],['Керую операціями','Вибудовую процеси, ролі та контроль.'],['Автоматизую системи','Прибираю ручну рутину та повторювані кроки.'],['Доводжу до результату','Не лише проєктую — доводжу до робочого стану.']],featuredCode:'КЛЮЧОВИЙ КЕЙС / 01',featuredHead:'Ключовий кейс',slogan:['БЕЗПЕЧНО.','ЛОКАЛЬНО.','ПРОЗОРО.'],proof:'Докази та результат',featured:'ClearUp — безпека важливіша за ефектність.',lead:'Android-утиліта, у якій привілейовані дії зроблено явними, локальними та перевірюваними, а не приховано за обіцянкою «однієї кнопки».',concept:'Продуктовий візуал — не скриншот інтерфейсу',open:'Відкрити проєкт →',repo:'Відкрити докази в репозиторії ↗',metrics:['ШЛЯХИ ПРИВІЛЕЙОВАНОГО ВИКОНАННЯ','ФІКСОВАНІ ОПЕРАЦІЇ SHIZUKU','ТАЙМАУТ ЗАПИТУ СЛУЖБИ ДОСТУПНОСТІ','РЕКЛАМА / АНАЛІТИКА / АКАУНТ / ХМАРА']}
};
function patch(){
 const c=C[lang()]||C.en;
 const w=document.getElementById('v12What');
 if(w){
   const head=w.querySelector('.v12-head');
   if(head?.querySelector('small'))head.querySelector('small').textContent=c.whatCode;
   if(head?.querySelector('h2'))head.querySelector('h2').textContent=c.what;
   w.querySelectorAll('.v12-pillar').forEach((card,i)=>{
     const item=c.pillars[i];if(!item)return;
     const title=card.querySelector('b');if(title)title.textContent=item[0];
     let p=card.querySelector('.v121-pillar-copy');
     if(!p){p=document.createElement('p');p.className='v121-pillar-copy';card.appendChild(p)}
     p.textContent=item[1];
   });
 }
 const f=document.getElementById('v12Featured');
 if(f){
   const head=f.querySelector('.v12-head');
   if(head?.querySelector('small'))head.querySelector('small').textContent=c.featuredCode;
   if(head?.querySelector('h2'))head.querySelector('h2').textContent=c.featuredHead;
   const slogan=f.querySelector('.v12-featured-visual strong');if(slogan)slogan.innerHTML=c.slogan.map(x=>x.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))).join('<br>');
   const proof=f.querySelector('.mp-eyebrow'),title=f.querySelector('h3'),lead=f.querySelector('.v12-featured-copy>p'),badge=f.querySelector('.v12-proof-badge'),links=f.querySelectorAll('.mp-project-links a');
   if(proof)proof.textContent=c.proof;if(title)title.textContent=c.featured;if(lead)lead.textContent=c.lead;if(badge)badge.textContent=c.concept;
   if(links[0])links[0].textContent=c.open;if(links[1])links[1].textContent=c.repo;
   f.querySelectorAll('.v12-metric span').forEach((e,i)=>{if(c.metrics[i])e.textContent=c.metrics[i]});
 }
 const dock=document.getElementById('v12Dock');if(dock){const code={en:'EN',pl:'PL',ru:'RU',uk:'UA'}[lang()]||'EN';const cv=dock.querySelector('[data-v12-cv]');if(cv)cv.href=path(`assets/cv/Kostiantyn_Bryl_CV_${code}.pdf`)}
}
document.addEventListener('click',e=>{if(e.target.closest('[data-lang]'))setTimeout(patch,160)},true);
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',patch,{once:true}):patch();
})();
