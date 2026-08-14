(()=>{
const PAGE=document.body.dataset.page||'home';
const PROJECT=document.body.dataset.project||'';
const AUDIENCE=document.body.dataset.audience||'';
const ROOT=document.documentElement.dataset.root||'.';
const lang=()=>document.documentElement.lang==='uk'?'uk':(['pl','ru'].includes(document.documentElement.lang)?document.documentElement.lang:'en');
const path=p=>ROOT==='.'?`./${p}`:`${ROOT.replace(/\/$/,'')}/${p}`;
const C={
 en:{
  skip:'Skip to content',theme:'Theme',portfolio:'PORTFOLIO',profile:'PROFILE',external:'EXTERNAL',all:'ALL',
  heroViews:['Recruiter view ↗','Engineering view ↗','Product view ↗'],
  whatCode:'PROFILE / 04',what:'How I create value',pillars:[['Build products','From idea and structure to a working product.'],['Lead operations','Build processes, ownership and control.'],['Automate systems','Remove manual repetition and operational friction.'],['Ship outcomes','Turn decisions into working, usable software.']],
  featuredCode:'FEATURED / CASE 01',featured:'Featured case',slogan:['SAFE.','LOCAL.','EXPLICIT.'],proof:'Proof & outcomes',featuredTitle:'ClearUp — safety before spectacle.',featuredLead:'An Android utility where privileged actions are explicit, local and auditable instead of hidden behind a one-tap promise.',concept:'Product visual — not a UI screenshot',open:'Open project →',repo:'Open source evidence ↗',metrics:['PRIVILEGED EXECUTION PATHS','FIXED SHIZUKU OPERATIONS','ACCESSIBILITY REQUEST TIMEOUT','ADS / ANALYTICS / ACCOUNT / CLOUD'],
  status:{'Active development':'Active development','Public':'Public','Concept / prototype':'Concept / prototype','Development':'Development','Hardware test build':'Hardware test build'},
  role:{'Founder / Product / Engineering':'Founder / Product / Engineering','Product / Engineering':'Product / Engineering'},caseStudy:'CASE STUDY',
  career:['10+ years across technology and operations','TEAM LEADERSHIP','TELECOM · OPERATIONS · RETAIL · BUSINESS'],
  infraCode:'SYSTEM / DELIVERY',infraTitle:'Portfolio infrastructure',infraLead:'Conversion without unnecessary tracking.',domain:'DOMAIN',privacy:'PRIVACY',
  evidenceFirst:'EVIDENCE-FIRST / V1.2',ecosystemStatus:'STATUS',ecosystemStates:['ACTIVE / SHIPPING','CONCEPT / PROTOTYPE','PRODUCT DEVELOPMENT','R&D / HARDWARE'],
  localSnapshot:'LOCAL SNAPSHOT',loading:'Loading…',publicActivity:'Public repository activity',repository:'GitHub repository',
  about:['I connect operations, product and technical execution — from problem framing to a working system.','I start with the system, constraints and risks, then choose tools. I prefer explicit behaviour, measurable outcomes and reversible decisions.','I remove unnecessary complexity, automate repeated steps and improve products from feedback, logs and real usage.'],
  now:{'ClearUp':['Android privacy-first system utility','ACTIVE DEVELOPMENT'],'Norvexa Reader':['Reader and document product direction','PRODUCT DEVELOPMENT'],'Luma Bay':['Mobile restoration game concept','CONCEPT / PROTOTYPE'],'BrylTab / Android R&D':['Android 16, SystemUI, Rockchip and device experiments','HARDWARE LAB']},
  dock:['CV ↓','Telegram','Email']
 },
 pl:{
  skip:'Przejdź do treści',theme:'Motyw',portfolio:'PORTFOLIO',profile:'PROFIL',external:'ZEWNĘTRZNE',all:'WSZYSTKIE',
  heroViews:['Widok dla rekrutera ↗','Widok techniczny ↗','Widok produktowy ↗'],
  whatCode:'PROFIL / 04',what:'Jaką wartość daję biznesowi',pillars:[['Tworzę produkty','Od pomysłu i struktury do działającego rozwiązania.'],['Prowadzę operacje','Buduję procesy, odpowiedzialność i kontrolę.'],['Automatyzuję systemy','Usuwam ręczną rutynę i powtarzalne kroki.'],['Dowożę rezultat','Nie kończę na projekcie — doprowadzam do działającego rozwiązania.']],
  featuredCode:'KLUCZOWY CASE / 01',featured:'Kluczowy case',slogan:['BEZPIECZNIE.','LOKALNIE.','JAWNIE.'],proof:'Dowody i rezultat',featuredTitle:'ClearUp — bezpieczeństwo ważniejsze niż efekt wow.',featuredLead:'Narzędzie Android, w którym działania uprzywilejowane są jawne, lokalne i możliwe do audytu, zamiast ukryte za obietnicą „jednego kliknięcia”.',concept:'Wizualizacja produktu — nie zrzut UI',open:'Otwórz projekt →',repo:'Otwórz dowody w repo ↗',metrics:['ŚCIEŻKI WYKONANIA UPRZYWILEJOWANEGO','STAŁE OPERACJE SHIZUKU','LIMIT CZASU ŻĄDANIA DOSTĘPNOŚCI','REKLAMY / ANALITYKA / KONTO / CHMURA'],
  status:{'Active development':'Aktywny rozwój','Public':'Publiczny','Concept / prototype':'Koncepcja / prototyp','Development':'W rozwoju','Hardware test build':'Testowa wersja sprzętowa'},
  role:{'Founder / Product / Engineering':'Założyciel / Produkt / Inżynieria','Product / Engineering':'Produkt / Inżynieria'},caseStudy:'CASE STUDY',
  career:['Ponad 10 lat w technologii i operacjach','ZARZĄDZANIE ZESPOŁAMI','TELEKOM · OPERACJE · RETAIL · BIZNES'],
  infraCode:'SYSTEM / DOSTARCZANIE',infraTitle:'Infrastruktura portfolio',infraLead:'Konwersja bez zbędnego śledzenia.',domain:'DOMENA',privacy:'PRYWATNOŚĆ',
  evidenceFirst:'DOWODY NAJPIERW / V1.2',ecosystemStatus:'STATUS',ecosystemStates:['AKTYWNE / PUBLIKOWANE','KONCEPCJA / PROTOTYP','ROZWÓJ PRODUKTU','R&D / SPRZĘT'],
  localSnapshot:'LOKALNY SNAPSHOT',loading:'Ładowanie…',publicActivity:'Aktywność publicznego repozytorium',repository:'Repozytorium GitHub',
  about:['Łączę operacje, produkt i wykonanie techniczne — od zdefiniowania problemu do działającego systemu.','Zaczynam od systemu, ograniczeń i ryzyk, potem wybieram narzędzia. Preferuję jawne działanie, mierzalne wyniki i odwracalne decyzje.','Usuwam zbędną złożoność, automatyzuję powtarzalne kroki i ulepszam produkty na podstawie feedbacku, logów i realnego użycia.'],
  now:{'ClearUp':['Privacy-first narzędzie systemowe Android','AKTYWNY ROZWÓJ'],'Norvexa Reader':['Kierunek produktu do czytania i dokumentów','ROZWÓJ PRODUKTU'],'Luma Bay':['Mobilna koncepcja gry restoration','KONCEPCJA / PROTOTYP'],'BrylTab / Android R&D':['Android 16, SystemUI, Rockchip i eksperymenty urządzeń','LAB SPRZĘTOWY']},
  dock:['CV ↓','Telegram','E-mail']
 },
 ru:{
  skip:'Перейти к содержанию',theme:'Тема',portfolio:'ПОРТФОЛИО',profile:'ПРОФИЛЬ',external:'ССЫЛКИ',all:'ВСЕ',
  heroViews:['Для рекрутера ↗','Для инженера ↗','Для продукта ↗'],
  whatCode:'ПРОФИЛЬ / 04',what:'Чем я полезен бизнесу',pillars:[['Создаю продукты','От идеи и структуры до рабочего решения.'],['Управляю операциями','Выстраиваю процессы, роли и контроль.'],['Автоматизирую системы','Убираю ручную рутину и повторяющиеся шаги.'],['Довожу до результата','Не просто проектирую — довожу до рабочего состояния.']],
  featuredCode:'КЛЮЧЕВОЙ КЕЙС / 01',featured:'Ключевой кейс',slogan:['БЕЗОПАСНО.','ЛОКАЛЬНО.','ПРОЗРАЧНО.'],proof:'Доказательства и результат',featuredTitle:'ClearUp — безопасность важнее эффектности.',featuredLead:'Android-утилита, в которой привилегированные действия сделаны явными, локальными и проверяемыми, а не скрыты за обещанием «одной кнопки».',concept:'Продуктовый визуал — не скриншот интерфейса',open:'Открыть проект →',repo:'Открыть доказательства в репозитории ↗',metrics:['ПУТИ ПРИВИЛЕГИРОВАННОГО ВЫПОЛНЕНИЯ','ФИКСИРОВАННЫЕ ОПЕРАЦИИ SHIZUKU','ТАЙМАУТ ЗАПРОСА СЛУЖБЫ ДОСТУПНОСТИ','РЕКЛАМА / АНАЛИТИКА / АККАУНТ / ОБЛАКО'],
  status:{'Active development':'Активная разработка','Public':'Публичный проект','Concept / prototype':'Концепт / прототип','Development':'В разработке','Hardware test build':'Тестовая аппаратная сборка'},
  role:{'Founder / Product / Engineering':'Основатель / Продукт / Разработка','Product / Engineering':'Продукт / Разработка'},caseStudy:'КЕЙС',
  career:['Более 10 лет в технологиях и операциях','УПРАВЛЕНИЕ КОМАНДАМИ','ТЕЛЕКОМ · ОПЕРАЦИИ · РОЗНИЦА · БИЗНЕС'],
  infraCode:'СИСТЕМА / ДОСТАВКА',infraTitle:'Инфраструктура портфолио',infraLead:'Конверсия без лишнего отслеживания.',domain:'ДОМЕН',privacy:'ПРИВАТНОСТЬ',
  evidenceFirst:'СНАЧАЛА ФАКТЫ / V1.2',ecosystemStatus:'СТАТУС',ecosystemStates:['АКТИВНО / ВЫПУСКАЕТСЯ','КОНЦЕПТ / ПРОТОТИП','РАЗРАБОТКА ПРОДУКТА','R&D / УСТРОЙСТВА'],
  localSnapshot:'ЛОКАЛЬНЫЙ СНИМОК',loading:'Загрузка…',publicActivity:'Активность публичного репозитория',repository:'Репозиторий GitHub',
  about:['Соединяю операционное управление, продуктовую работу и техническую реализацию — от формулировки проблемы до работающей системы.','Сначала разбираю систему, ограничения и риски, затем выбираю инструменты. Предпочитаю прозрачное поведение, измеримые результаты и обратимые решения.','Убираю лишнюю сложность, автоматизирую повторяющиеся шаги и улучшаю продукт по обратной связи, логам и реальному использованию.'],
  now:{'ClearUp':['Системная Android-утилита с приоритетом приватности','АКТИВНАЯ РАЗРАБОТКА'],'Norvexa Reader':['Продуктовое направление для чтения и документов','РАЗРАБОТКА ПРОДУКТА'],'Luma Bay':['Концепт мобильной игры о восстановлении','КОНЦЕПТ / ПРОТОТИП'],'BrylTab / Android R&D':['Android 16, SystemUI, Rockchip и эксперименты с устройствами','АППАРАТНАЯ ЛАБОРАТОРИЯ']},
  dock:['CV ↓','Telegram','Email']
 },
 uk:{
  skip:'Перейти до вмісту',theme:'Тема',portfolio:'ПОРТФОЛІО',profile:'ПРОФІЛЬ',external:'ПОСИЛАННЯ',all:'УСІ',
  heroViews:['Для рекрутера ↗','Для інженера ↗','Для продукту ↗'],
  whatCode:'ПРОФІЛЬ / 04',what:'Чим я корисний бізнесу',pillars:[['Створюю продукти','Від ідеї та структури до робочого рішення.'],['Керую операціями','Вибудовую процеси, ролі та контроль.'],['Автоматизую системи','Прибираю ручну рутину та повторювані кроки.'],['Доводжу до результату','Не лише проєктую — доводжу до робочого стану.']],
  featuredCode:'КЛЮЧОВИЙ КЕЙС / 01',featured:'Ключовий кейс',slogan:['БЕЗПЕЧНО.','ЛОКАЛЬНО.','ПРОЗОРО.'],proof:'Докази та результат',featuredTitle:'ClearUp — безпека важливіша за ефектність.',featuredLead:'Android-утиліта, у якій привілейовані дії зроблено явними, локальними та перевірюваними, а не приховано за обіцянкою «однієї кнопки».',concept:'Продуктовий візуал — не скриншот інтерфейсу',open:'Відкрити проєкт →',repo:'Відкрити докази в репозиторії ↗',metrics:['ШЛЯХИ ПРИВІЛЕЙОВАНОГО ВИКОНАННЯ','ФІКСОВАНІ ОПЕРАЦІЇ SHIZUKU','ТАЙМАУТ ЗАПИТУ СЛУЖБИ ДОСТУПНОСТІ','РЕКЛАМА / АНАЛІТИКА / АКАУНТ / ХМАРА'],
  status:{'Active development':'Активна розробка','Public':'Публічний проєкт','Concept / prototype':'Концепт / прототип','Development':'У розробці','Hardware test build':'Тестова апаратна збірка'},
  role:{'Founder / Product / Engineering':'Засновник / Продукт / Розробка','Product / Engineering':'Продукт / Розробка'},caseStudy:'КЕЙС',
  career:['Понад 10 років у технологіях та операціях','КЕРУВАННЯ КОМАНДАМИ','ТЕЛЕКОМ · ОПЕРАЦІЇ · РОЗДРІБ · БІЗНЕС'],
  infraCode:'СИСТЕМА / ДОСТАВКА',infraTitle:'Інфраструктура портфоліо',infraLead:'Конверсія без зайвого відстеження.',domain:'ДОМЕН',privacy:'ПРИВАТНІСТЬ',
  evidenceFirst:'СПОЧАТКУ ФАКТИ / V1.2',ecosystemStatus:'СТАТУС',ecosystemStates:['АКТИВНО / ВИПУСКАЄТЬСЯ','КОНЦЕПТ / ПРОТОТИП','РОЗРОБКА ПРОДУКТУ','R&D / ПРИСТРОЇ'],
  localSnapshot:'ЛОКАЛЬНИЙ ЗНІМОК',loading:'Завантаження…',publicActivity:'Активність публічного репозиторію',repository:'Репозиторій GitHub',
  about:['Поєдную операційне керування, продуктову роботу й технічну реалізацію — від формулювання проблеми до робочої системи.','Спочатку розбираю систему, обмеження та ризики, потім обираю інструменти. Віддаю перевагу прозорій поведінці, вимірюваним результатам і зворотним рішенням.','Прибираю зайву складність, автоматизую повторювані кроки й покращую продукт за зворотним зв’язком, логами та реальним використанням.'],
  now:{'ClearUp':['Системна Android-утиліта з пріоритетом приватності','АКТИВНА РОЗРОБКА'],'Norvexa Reader':['Продуктовий напрям для читання та документів','РОЗРОБКА ПРОДУКТУ'],'Luma Bay':['Концепт мобільної гри про відновлення','КОНЦЕПТ / ПРОТОТИП'],'BrylTab / Android R&D':['Android 16, SystemUI, Rockchip та експерименти з пристроями','АПАРАТНА ЛАБОРАТОРІЯ']},
  dock:['CV ↓','Telegram','Email']
 }
};
function c(){return C[lang()]||C.en}
function text(el,value){if(el&&value!=null)el.textContent=value}
function exactReplace(root,map){if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);for(const n of nodes){if(['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement?.tagName))continue;const raw=n.nodeValue||'',trim=raw.trim();if(!trim||!(trim in map))continue;const lead=raw.match(/^\s*/)?.[0]||'',tail=raw.match(/\s*$/)?.[0]||'';n.nodeValue=lead+map[trim]+tail}}
function applyHome(){if(PAGE!=='home')return;const d=c(),w=document.getElementById('v12What');if(w){text(w.querySelector('.v12-head small'),d.whatCode);text(w.querySelector('.v12-head h2'),d.what);w.querySelectorAll('.v12-pillar').forEach((card,i)=>{const item=d.pillars[i];if(!item)return;text(card.querySelector('b'),item[0]);let p=card.querySelector('.v121-pillar-copy');if(!p){p=document.createElement('p');p.className='v121-pillar-copy';card.appendChild(p)}text(p,item[1])})}
 const f=document.getElementById('v12Featured');if(f){const head=f.querySelector('.v12-head');text(head?.querySelector('small'),d.featuredCode);text(head?.querySelector('h2'),d.featured);const visual=f.querySelector('.v12-featured-visual strong');if(visual)visual.innerHTML=d.slogan.map(x=>x.replace(/</g,'&lt;')).join('<br>');text(f.querySelector('.v12-proof-badge'),d.concept);text(f.querySelector('.mp-eyebrow'),d.proof);text(f.querySelector('.v12-featured-copy h3'),d.featuredTitle);text(f.querySelector('.v12-featured-copy>p'),d.featuredLead);f.querySelectorAll('.v12-metric span').forEach((e,i)=>text(e,d.metrics[i]));const links=f.querySelectorAll('.mp-project-links a');text(links[0],d.open);text(links[1],d.repo)}
 document.querySelectorAll('.mp-hero-links a').forEach((e,i)=>text(e,d.heroViews[i]));
}
function applyAbout(){if(PAGE!=='about')return;document.querySelectorAll('#aboutBlocks article p').forEach((e,i)=>text(e,c().about[i]))}
function applyNow(){if(PAGE!=='now')return;document.querySelectorAll('#nowGrid article').forEach(a=>{const name=a.querySelector('h3')?.textContent.trim(),x=c().now[name];if(!x)return;text(a.querySelector('p'),x[0]);text(a.querySelector('b'),x[1])})}
function applyDynamic(){const d=c();document.querySelectorAll('.mp-project-top>span,.mp-detail-grid article h3').forEach(e=>{const v=e.textContent.trim();if(d.status[v])text(e,d.status[v]);if(d.role[v])text(e,d.role[v])});document.querySelectorAll('.v12-proof-card h3').forEach(e=>{const v=e.textContent.trim();if(d.role[v])text(e,d.role[v])});const filter=document.querySelector('[data-division="all"]');if(filter)text(filter,d.all);
 document.querySelectorAll('.v12-career-summary>div').forEach((box,i)=>{const s=box.querySelector('span');if(s&&d.career[i])text(s,d.career[i])});
 document.querySelectorAll('.v11-division').forEach((card,i)=>{text(card.querySelector('.v12-proof-badge'),d.evidenceFirst);text(card.querySelector('.v12-ecosystem-status span'),d.ecosystemStatus);text(card.querySelector('.v12-ecosystem-status b'),d.ecosystemStates[i])});
 const infra=document.getElementById('v12Infra');if(infra){const h=infra.querySelector('.v12-head');text(h?.querySelector('small'),d.infraCode);text(h?.querySelector('h2'),d.infraTitle);text(h?.querySelector('p'),d.infraLead);const cards=infra.querySelectorAll('.v12-infra article');text(cards[0]?.querySelector('small'),d.domain);text(cards[1]?.querySelector('small'),d.privacy)}
 document.querySelectorAll('.v12-ship').forEach(card=>{const h=card.querySelector('h3');if(h?.textContent.trim()==='Loading…')text(h,d.loading);const p=card.querySelector('p');if(p?.textContent.trim()==='Public repository activity')text(p,d.publicActivity)});
 document.querySelectorAll('.v12-shot figcaption span').forEach(e=>{if(e.textContent.includes('GitHub repository'))e.textContent=e.textContent.replace('GitHub repository',d.repository)});
 const dock=document.getElementById('v12Dock');if(dock)dock.querySelectorAll('a').forEach((e,i)=>{if(d.dock[i])text(e,d.dock[i])});
}
function applyCommon(){const d=c();const skip=document.querySelector('.skip-link');text(skip,d.skip);const theme=document.getElementById('mpTheme');if(theme)theme.setAttribute('aria-label',d.theme);const mtheme=document.getElementById('mpMobileTheme');if(mtheme){mtheme.setAttribute('aria-label',d.theme);if(mtheme.textContent.includes('Theme'))mtheme.textContent=d.theme+' ◐'}document.querySelectorAll('.mp-footer-map>div>b').forEach(e=>{const v=e.textContent.trim();if(v==='PORTFOLIO')text(e,d.portfolio);if(v==='PROFILE')text(e,d.profile);if(v==='EXTERNAL')text(e,d.external)});
 const map={
  'CASE STUDY':d.caseStudy,'Founder / Product / Engineering':d.role['Founder / Product / Engineering'],'Product / Engineering':d.role['Product / Engineering'],
  'Portfolio infrastructure':d.infraTitle,'Conversion without unnecessary tracking.':d.infraLead,'SYSTEM / DELIVERY':d.infraCode,'DOMAIN':d.domain,'PRIVACY':d.privacy,
  'EVIDENCE-FIRST / V1.2':d.evidenceFirst,'STATUS':d.ecosystemStatus,'ACTIVE / SHIPPING':d.ecosystemStates[0],'CONCEPT / PROTOTYPE':d.ecosystemStates[1],'PRODUCT DEVELOPMENT':d.ecosystemStates[2],'R&D / HARDWARE':d.ecosystemStates[3],
  'LOCAL SNAPSHOT':d.localSnapshot,'Loading…':d.loading,'Public repository activity':d.publicActivity,
  'Active development':d.status['Active development'],'Public':d.status.Public,'Concept / prototype':d.status['Concept / prototype'],'Development':d.status.Development,'Hardware test build':d.status['Hardware test build']
 };exactReplace(document.body,map)
}
function roleCv(){const code={en:'EN',pl:'PL',ru:'RU',uk:'UA'}[lang()]||'EN';const role={recruiter:'RECRUITER',engineering:'ENGINEERING',product:'PRODUCT'}[AUDIENCE];document.querySelectorAll('[data-v12-cv]').forEach(a=>a.href=path(role?`assets/cv/Kostiantyn_Bryl_CV_${role}_${code}.pdf`:`assets/cv/Kostiantyn_Bryl_CV_${code}.pdf`))}
function apply(){applyHome();applyAbout();applyNow();applyDynamic();applyCommon();roleCv()}
function schedule(){[40,430,900].forEach(ms=>setTimeout(apply,ms))}
document.addEventListener('click',e=>{if(e.target.closest('[data-lang]')){setTimeout(apply,220);setTimeout(apply,620)}},true);
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',schedule,{once:true}):schedule();
})();