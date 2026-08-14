(()=>{
const lang=()=>document.documentElement.lang==='uk'?'uk':(['pl','ru'].includes(document.documentElement.lang)?document.documentElement.lang:'en');
const M={
 en:{},
 pl:{
  'CASE / EVIDENCE':'CASE / DOWODY','BUILD / LOCAL SNAPSHOT':'BUILD / LOKALNY SNAPSHOT','REFERENCES / VERIFIED':'REFERENCJE / ZWERYFIKOWANE','V1.2 / PROOF':'V1.2 / DOWODY',
  'Founder / Product / Engineering':'Założyciel / Produkt / Inżynieria','Product / Engineering':'Produkt / Inżynieria','Product / Android R&D / Engineering':'Produkt / Android R&D / Inżynieria','Founder / Product / Game Design':'Założyciel / Produkt / Game Design','Founder / Product / Architecture':'Założyciel / Produkt / Architektura',
  'PRIVILEGED EXECUTION PATHS':'ŚCIEŻKI WYKONANIA UPRZYWILEJOWANEGO','FIXED SHIZUKU OPERATIONS':'STAŁE OPERACJE SHIZUKU','ACCESSIBILITY REQUEST TIMEOUT':'LIMIT CZASU ŻĄDANIA DOSTĘPNOŚCI','ADS / ANALYTICS / ACCOUNT / CLOUD':'REKLAMY / ANALITYKA / KONTO / CHMURA',
  'INPUT VIDEO EXTENSIONS':'FORMATY WEJŚCIOWE WIDEO','PROCESSING PATHS':'ŚCIEŻKI PRZETWARZANIA','TRIM VALUE PRECISION':'PRECYZJA WARTOŚCI PRZYCIĘCIA','BACKGROUND WORKER PIPELINE':'PIPELINE PRACY W TLE',
  'TARGET PLATFORM':'PLATFORMA DOCELOWA','BOUNCER TRANSPARENCY':'PRZEZROCZYSTOŚĆ EKRANU ODBLOKOWANIA','PACKAGE SCOPE: SYSTEMUI':'ZAKRES PAKIETU: SYSTEMUI','HARDWARE TEST BUILD':'WERSJA TESTOWA SPRZĘTU',
  'GAME CONCEPT':'KONCEPCJA GRY','TARGET':'PLATFORMA DOCELOWA','CORE LOOP':'GŁÓWNA PĘTLA GRY','CORE PRODUCT AREAS':'GŁÓWNE OBSZARY PRODUKTU','ACCESS MODEL':'MODEL DOSTĘPU','FULL STACK':'PEŁNY STACK',
  'PRIVILEGED PATHS':'ŚCIEŻKI UPRZYWILEJOWANE','ADS / ANALYTICS':'REKLAMY / ANALITYKA','LOCAL-FIRST POLICY':'POLITYKA LOCAL-FIRST','ENCODING PATHS':'ŚCIEŻKI KODOWANIA','REAL SCREENSHOT':'PRAWDZIWY SCREENSHOT','MANUAL CLIP LOOPS':'RĘCZNE OPERACJE KLIP PO KLIPIE'
 },
 ru:{
  'CASE / EVIDENCE':'КЕЙС / ДОКАЗАТЕЛЬСТВА','BUILD / LOCAL SNAPSHOT':'СБОРКА / ЛОКАЛЬНЫЙ СНИМОК','REFERENCES / VERIFIED':'РЕКОМЕНДАЦИИ / ПРОВЕРЕНО','V1.2 / PROOF':'V1.2 / ФАКТЫ',
  'Founder / Product / Engineering':'Основатель / Продукт / Разработка','Product / Engineering':'Продукт / Разработка','Product / Android R&D / Engineering':'Продукт / Android R&D / Разработка','Founder / Product / Game Design':'Основатель / Продукт / Геймдизайн','Founder / Product / Architecture':'Основатель / Продукт / Архитектура',
  'PRIVILEGED EXECUTION PATHS':'ПУТИ ПРИВИЛЕГИРОВАННОГО ВЫПОЛНЕНИЯ','FIXED SHIZUKU OPERATIONS':'ФИКСИРОВАННЫЕ ОПЕРАЦИИ SHIZUKU','ACCESSIBILITY REQUEST TIMEOUT':'ТАЙМАУТ ЗАПРОСА СЛУЖБЫ ДОСТУПНОСТИ','ADS / ANALYTICS / ACCOUNT / CLOUD':'РЕКЛАМА / АНАЛИТИКА / АККАУНТ / ОБЛАКО',
  'INPUT VIDEO EXTENSIONS':'ВХОДНЫЕ ФОРМАТЫ ВИДЕО','PROCESSING PATHS':'ПУТИ ОБРАБОТКИ','TRIM VALUE PRECISION':'ТОЧНОСТЬ ЗНАЧЕНИЯ ОБРЕЗКИ','BACKGROUND WORKER PIPELINE':'ФОНОВЫЙ КОНВЕЙЕР ОБРАБОТКИ',
  'TARGET PLATFORM':'ЦЕЛЕВАЯ ПЛАТФОРМА','BOUNCER TRANSPARENCY':'ПРОЗРАЧНОСТЬ ЭКРАНА РАЗБЛОКИРОВКИ','PACKAGE SCOPE: SYSTEMUI':'ОБЛАСТЬ ПАКЕТА: SYSTEMUI','HARDWARE TEST BUILD':'ТЕСТОВАЯ АППАРАТНАЯ СБОРКА',
  'GAME CONCEPT':'КОНЦЕПТ ИГРЫ','TARGET':'ЦЕЛЕВАЯ ПЛАТФОРМА','CORE LOOP':'ОСНОВНОЙ ИГРОВОЙ ЦИКЛ','CORE PRODUCT AREAS':'КЛЮЧЕВЫЕ ОБЛАСТИ ПРОДУКТА','ACCESS MODEL':'МОДЕЛЬ ДОСТУПА','FULL STACK':'ПОЛНЫЙ СТЕК',
  'PRIVILEGED PATHS':'ПРИВИЛЕГИРОВАННЫЕ ПУТИ','ADS / ANALYTICS':'РЕКЛАМА / АНАЛИТИКА','LOCAL-FIRST POLICY':'ПОЛИТИКА LOCAL-FIRST','ENCODING PATHS':'ПУТИ КОДИРОВАНИЯ','REAL SCREENSHOT':'РЕАЛЬНЫЙ СКРИНШОТ','MANUAL CLIP LOOPS':'РУЧНАЯ ОБРАБОТКА КАЖДОГО РОЛИКА'
 },
 uk:{
  'CASE / EVIDENCE':'КЕЙС / ДОКАЗИ','BUILD / LOCAL SNAPSHOT':'ЗБІРКА / ЛОКАЛЬНИЙ ЗНІМОК','REFERENCES / VERIFIED':'РЕКОМЕНДАЦІЇ / ПЕРЕВІРЕНО','V1.2 / PROOF':'V1.2 / ФАКТИ',
  'Founder / Product / Engineering':'Засновник / Продукт / Розробка','Product / Engineering':'Продукт / Розробка','Product / Android R&D / Engineering':'Продукт / Android R&D / Розробка','Founder / Product / Game Design':'Засновник / Продукт / Геймдизайн','Founder / Product / Architecture':'Засновник / Продукт / Архітектура',
  'PRIVILEGED EXECUTION PATHS':'ШЛЯХИ ПРИВІЛЕЙОВАНОГО ВИКОНАННЯ','FIXED SHIZUKU OPERATIONS':'ФІКСОВАНІ ОПЕРАЦІЇ SHIZUKU','ACCESSIBILITY REQUEST TIMEOUT':'ТАЙМАУТ ЗАПИТУ СЛУЖБИ ДОСТУПНОСТІ','ADS / ANALYTICS / ACCOUNT / CLOUD':'РЕКЛАМА / АНАЛІТИКА / АКАУНТ / ХМАРА',
  'INPUT VIDEO EXTENSIONS':'ВХІДНІ ФОРМАТИ ВІДЕО','PROCESSING PATHS':'ШЛЯХИ ОБРОБКИ','TRIM VALUE PRECISION':'ТОЧНІСТЬ ЗНАЧЕННЯ ОБРІЗАННЯ','BACKGROUND WORKER PIPELINE':'ФОНОВИЙ КОНВЕЄР ОБРОБКИ',
  'TARGET PLATFORM':'ЦІЛЬОВА ПЛАТФОРМА','BOUNCER TRANSPARENCY':'ПРОЗОРІСТЬ ЕКРАНА РОЗБЛОКУВАННЯ','PACKAGE SCOPE: SYSTEMUI':'ОБЛАСТЬ ПАКЕТА: SYSTEMUI','HARDWARE TEST BUILD':'ТЕСТОВА АПАРАТНА ЗБІРКА',
  'GAME CONCEPT':'КОНЦЕПТ ГРИ','TARGET':'ЦІЛЬОВА ПЛАТФОРМА','CORE LOOP':'ОСНОВНИЙ ІГРОВИЙ ЦИКЛ','CORE PRODUCT AREAS':'КЛЮЧОВІ ОБЛАСТІ ПРОДУКТУ','ACCESS MODEL':'МОДЕЛЬ ДОСТУПУ','FULL STACK':'ПОВНИЙ СТЕК',
  'PRIVILEGED PATHS':'ПРИВІЛЕЙОВАНІ ШЛЯХИ','ADS / ANALYTICS':'РЕКЛАМА / АНАЛІТИКА','LOCAL-FIRST POLICY':'ПОЛІТИКА LOCAL-FIRST','ENCODING PATHS':'ШЛЯХИ КОДУВАННЯ','REAL SCREENSHOT':'РЕАЛЬНИЙ СКРИНШОТ','MANUAL CLIP LOOPS':'РУЧНА ОБРОБКА КОЖНОГО РОЛИКА'
 }
};
function apply(){const map=M[lang()]||M.en;if(!Object.keys(map).length)return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);for(const n of nodes){if(['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement?.tagName))continue;const raw=n.nodeValue||'',v=raw.trim();if(!(v in map))continue;const a=raw.match(/^\s*/)?.[0]||'',b=raw.match(/\s*$/)?.[0]||'';n.nodeValue=a+map[v]+b}}
function schedule(){[520,1050].forEach(ms=>setTimeout(apply,ms))}
document.addEventListener('click',e=>{if(e.target.closest('[data-lang]')){setTimeout(apply,360);setTimeout(apply,760)}},true);
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',schedule,{once:true}):schedule();
})();