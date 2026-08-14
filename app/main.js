(()=>{
  const A=window.KB_APP,I=window.KB_I18N,D=window.PORTFOLIO_DATA,V11=window.NORVEXA_V11,V12=window.NORVEXA_V12;
  if(!A||!I||!D)return;
  const e=A.esc,p=A.path,loc=x=>I.local(x),L=()=>I.lang;
  const set=(sel,text,root=document)=>{const el=typeof sel==="string"?root.querySelector(sel):sel;if(el&&text!=null)el.textContent=text};
  const pageWord={
    en:{project:"PROJECT",case:"CASE STUDY",proof:"EVIDENCE",deep:"DEEP DIVE",visual:"VISUAL",architecture:"Architecture",decisions:"Key decisions",outcomes:"Outcomes"},
    pl:{project:"PROJEKT",case:"CASE STUDY",proof:"DOWODY",deep:"SZCZEGÓŁY",visual:"MATERIAŁY",architecture:"Architektura",decisions:"Kluczowe decyzje",outcomes:"Rezultaty"},
    ru:{project:"ПРОЕКТ",case:"КЕЙС",proof:"ДОКАЗАТЕЛЬСТВА",deep:"ПОДРОБНЕЕ",visual:"МАТЕРИАЛЫ",architecture:"Архитектура",decisions:"Ключевые решения",outcomes:"Результаты"},
    uk:{project:"ПРОЄКТ",case:"КЕЙС",proof:"ДОКАЗИ",deep:"ДЕТАЛЬНІШЕ",visual:"МАТЕРІАЛИ",architecture:"Архітектура",decisions:"Ключові рішення",outcomes:"Результати"},
    zh:{project:"项目",case:"案例",proof:"证据",deep:"深入了解",visual:"项目材料",architecture:"架构",decisions:"关键决策",outcomes:"结果"}
  };
  const roles={
    en:{DataGroup:"Telecom Engineer",TME:"Head of International Orders",ALLO:"Retail Manager","LLC Brillkoff":"Owner"},
    pl:{DataGroup:"Inżynier telekomunikacji",TME:"Kierownik zamówień międzynarodowych",ALLO:"Kierownik sprzedaży detalicznej","LLC Brillkoff":"Właściciel"},
    ru:{DataGroup:"Инженер телекоммуникаций",TME:"Руководитель международных заказов",ALLO:"Руководитель розничного направления","LLC Brillkoff":"Владелец"},
    uk:{DataGroup:"Інженер телекомунікацій",TME:"Керівник міжнародних замовлень",ALLO:"Керівник роздрібного напряму","LLC Brillkoff":"Власник"},
    zh:{DataGroup:"电信工程师",TME:"国际订单负责人",ALLO:"零售经理","LLC Brillkoff":"负责人 / 创业者"}
  };
  const proofRoles={
    en:{Founder:"Founder",Product:"Product",Engineering:"Engineering"},
    pl:{Founder:"Założyciel",Product:"Produkt",Engineering:"Inżynieria"},
    ru:{Founder:"Основатель",Product:"Продукт",Engineering:"Разработка"},
    uk:{Founder:"Засновник",Product:"Продукт",Engineering:"Розробка"},
    zh:{Founder:"创始人",Product:"产品",Engineering:"工程"}
  };
  const metricLabels={
    clearup:{
      en:["privileged execution paths","fixed Shizuku operations","accessibility request timeout","ads / analytics / account / cloud"],
      pl:["ścieżki uprzywilejowanego wykonania","stałe operacje Shizuku","timeout żądania accessibility","reklamy / analityka / konto / chmura"],
      ru:["пути привилегированного выполнения","фиксированные операции Shizuku","таймаут запроса accessibility","реклама / аналитика / аккаунт / облако"],
      uk:["шляхи привілейованого виконання","фіксовані операції Shizuku","таймаут запиту accessibility","реклама / аналітика / акаунт / хмара"],
      zh:["高权限执行路径","固定 Shizuku 操作","Accessibility 请求超时","广告 / 分析 / 账户 / 云端"]
    },
    "cutflow-batch":{
      en:["input video extensions","processing paths","trim value precision","background worker pipeline"],
      pl:["obsługiwane rozszerzenia wideo","ścieżki przetwarzania","precyzja wartości cięcia","potok pracy w tle"],
      ru:["поддерживаемые расширения видео","пути обработки","точность значения обрезки","фоновый рабочий конвейер"],
      uk:["підтримувані розширення відео","шляхи обробки","точність значення обрізання","фоновий робочий конвеєр"],
      zh:["支持的视频扩展名","处理路径","裁剪数值精度","后台工作流程"]
    },
    bryltab:{
      en:["target platform","bouncer transparency","package scope","release line"],
      pl:["platforma docelowa","przezroczystość ekranu PIN","zakres pakietu","linia wydań"],
      ru:["целевая платформа","прозрачность PIN-экрана","область пакета","линейка релиза"],
      uk:["цільова платформа","прозорість PIN-екрана","область пакета","лінійка релізу"],
      zh:["目标平台","PIN 层透明度","包作用域","版本线"]
    }
  };
  const nowCopy={
    en:{"ClearUp":["Android privacy-first system utility","ACTIVE DEVELOPMENT"],"Norvexa Reader":["Reader and document product direction","PRODUCT DEVELOPMENT"],"Luma Bay":["Mobile restoration game concept","CONCEPT / PROTOTYPE"],"BrylTab / Android R&D":["Android 16, SystemUI, Rockchip and device experiments","HARDWARE LAB"]},
    pl:{"ClearUp":["Narzędzie systemowe Android z naciskiem na prywatność","AKTYWNY ROZWÓJ"],"Norvexa Reader":["Kierunek produktu do czytania i dokumentów","ROZWÓJ PRODUKTU"],"Luma Bay":["Mobilna koncepcja gry restoration","KONCEPCJA / PROTOTYP"],"BrylTab / Android R&D":["Android 16, SystemUI, Rockchip i eksperymenty urządzeń","LABORATORIUM SPRZĘTOWE"]},
    ru:{"ClearUp":["Системная Android-утилита с фокусом на приватность","АКТИВНАЯ РАЗРАБОТКА"],"Norvexa Reader":["Продуктовое направление для чтения и документов","РАЗРАБОТКА ПРОДУКТА"],"Luma Bay":["Мобильный концепт restoration-game","КОНЦЕПТ / ПРОТОТИП"],"BrylTab / Android R&D":["Android 16, SystemUI, Rockchip и эксперименты с устройствами","АППАРАТНАЯ ЛАБОРАТОРИЯ"]},
    uk:{"ClearUp":["Системна Android-утиліта з фокусом на приватність","АКТИВНА РОЗРОБКА"],"Norvexa Reader":["Продуктовий напрям для читання та документів","РОЗРОБКА ПРОДУКТУ"],"Luma Bay":["Мобільний концепт restoration-game","КОНЦЕПТ / ПРОТОТИП"],"BrylTab / Android R&D":["Android 16, SystemUI, Rockchip та експерименти з пристроями","АПАРАТНА ЛАБОРАТОРІЯ"]},
    zh:{"ClearUp":["以隐私为先的 Android 系统工具","积极开发中"],"Norvexa Reader":["阅读与文档产品方向","产品开发中"],"Luma Bay":["移动端修复经营游戏概念","概念 / 原型"],"BrylTab / Android R&D":["Android 16、SystemUI、Rockchip 与设备实验","硬件实验室"]}
  };
  const period=x=>{
    const r={en:"Present",pl:"obecnie",ru:"н.в.",uk:"дотепер",zh:"至今"}[L()];
    return String(x||"").replace(/Now|Present|Current|obecnie|н\.в\.|дотепер/gi,r);
  };
  const proofRole=s=>String(s||"").split("/").map(x=>proofRoles[L()][x.trim()]||x.trim()).join(" / ");
  const division=id=>I.t(`divisions.${id}.0`,String(id||"").toUpperCase());
  const imageSrc=pr=>pr?.visual?.startsWith("http")?pr.visual:p(pr?.visual||"assets/og-cover.svg");

  function translateAttrs(){
    document.querySelectorAll("[data-i18n]").forEach(el=>{const v=I.t(el.dataset.i18n);if(v)el.textContent=v});
    const skip=document.querySelector(".skip-link");
    if(skip)skip.textContent={en:"Skip to content",pl:"Przejdź do treści",ru:"Перейти к содержимому",uk:"Перейти до вмісту",zh:"跳到主要内容"}[L()];
  }
  function breadcrumb(){
    const b=document.getElementById("mpBreadcrumb");if(!b)return;
    const labels={work:I.t("work"),experience:I.t("experience"),cases:I.t("cases"),about:I.t("about"),now:I.t("now"),ecosystem:I.t("ecosystem"),contact:I.t("contact")};
    const home=`<a href="${p("")}">KOSTIANTYN BRYL</a><span>/</span>`;
    if(A.page==="project"){
      const pr=D.projects?.find(x=>x.id===A.project);
      b.innerHTML=home+`<a href="${p("work/")}">${e(I.t("work").toUpperCase())}</a><span>/</span><b>${e((pr?.name||pageWord[L()].project).toUpperCase())}</b>`;
    }else b.innerHTML=home+`<b>${e((labels[A.page]||A.page).toUpperCase())}</b>`;
  }
  function pageHero(){
    const hero=document.querySelector(".mp-page-hero");if(!hero)return;
    const eye=hero.querySelector(".mp-eyebrow"),copy=I.t(`pageEyebrow.${A.page}`);
    if(eye&&copy)eye.textContent=copy;
  }
  function projectCard(pr){
    return `<article class="mp-project-card">
      <a class="mp-project-visual" href="${p(`work/${pr.id}/`)}"><img src="${imageSrc(pr)}" alt="${e(pr.name)}" loading="lazy"></a>
      <div class="mp-project-body"><div class="mp-project-top"><small>${e(pageWord[L()].project)} / ${e(division(pr.division).toUpperCase())} / ${e(pr.index)}</small><span>${e(I.status(pr.status))}</span></div>
      <h3>${e(pr.name)}</h3><p>${e(loc(pr.desc))}</p><div class="mp-tags">${(pr.stack||[]).map(x=>`<span>${e(x)}</span>`).join("")}</div>
      <div class="mp-project-links"><a href="${p(`work/${pr.id}/`)}">${I.t("openProject")} →</a>${pr.repo?`<a href="${pr.repo}" target="_blank" rel="noreferrer">GitHub ↗</a>`:""}</div></div>
    </article>`;
  }
  function home(){
    const facts={en:["Years","People","Languages"],pl:["Lata","Osoby","Języków"],ru:["Лет","Человек","Языков"],uk:["Років","Людей","Мов"],zh:["年经验","团队人数","语言"]}[L()];
    const metrics={
      en:["YEARS / TECHNOLOGY & OPERATIONS","PEOPLE / MANAGED TEAMS","PROJECT DIRECTIONS","FEATURED PRODUCTS"],
      pl:["LATA / TECHNOLOGIA I OPERACJE","OSÓB / ZARZĄDZANE ZESPOŁY","KIERUNKI PROJEKTÓW","WYBRANE PRODUKTY"],
      ru:["ЛЕТ / ТЕХНОЛОГИИ И ОПЕРАЦИИ","ЧЕЛОВЕК / УПРАВЛЯЕМЫЕ КОМАНДЫ","НАПРАВЛЕНИЯ ПРОЕКТОВ","ИЗБРАННЫЕ ПРОДУКТЫ"],
      uk:["РОКІВ / ТЕХНОЛОГІЇ ТА ОПЕРАЦІЇ","ЛЮДЕЙ / КЕРОВАНІ КОМАНДИ","НАПРЯМИ ПРОЄКТІВ","ВИБРАНІ ПРОДУКТИ"],
      zh:["年 / 技术与运营","人 / 管理团队规模","项目方向","精选产品"]
    }[L()];
    document.querySelectorAll(".mp-id-facts span").forEach((x,i)=>x.textContent=facts[i]||"");
    const factNums=document.querySelectorAll(".mp-id-facts b");if(factNums[2])factNums[2].textContent="5";
    document.querySelectorAll(".mp-metric span").forEach((x,i)=>x.textContent=metrics[i]||"");
    const roleLinks={en:["Recruiter view","Engineering view","Product view"],pl:["Widok rekrutera","Widok techniczny","Widok produktowy"],ru:["Для рекрутера","Техническая версия","Продуктовая версия"],uk:["Для рекрутера","Технічна версія","Продуктова версія"],zh:["招聘视图","工程视图","产品视图"]}[L()];
    document.querySelectorAll(".mp-hero-links a").forEach((a,i)=>a.textContent=(roleLinks[i]||"")+" ↗");
    const what=document.getElementById("v12What");
    if(what){
      set(".v12-head small",{en:"PROFILE / 04",pl:"PROFIL / 04",ru:"ПРОФИЛЬ / 04",uk:"ПРОФІЛЬ / 04",zh:"个人 / 04"}[L()],what);
      set(".v12-head h2",I.t("homeWhat"),what);
      const cards=what.querySelectorAll(".v12-pillar");
      I.t("pillars",[]).forEach((item,i)=>{if(!cards[i])return;set("b",item[0],cards[i]);let q=cards[i].querySelector("p");if(!q){q=document.createElement("p");cards[i].appendChild(q)}q.textContent=item[1]});
    }
    const feat=document.getElementById("v12Featured");
    if(feat){
      set(".v12-head small",{en:"FEATURED / CASE 01",pl:"WYRÓŻNIONY / CASE 01",ru:"КЛЮЧЕВОЙ / КЕЙС 01",uk:"КЛЮЧОВИЙ / КЕЙС 01",zh:"重点 / 案例 01"}[L()],feat);
      set(".v12-head h2",I.t("featured"),feat);
      set(".v12-featured-visual small",`${division("software").toUpperCase()} / CLEARUP`,feat);
      const strong=feat.querySelector(".v12-featured-visual strong");if(strong)strong.innerHTML=e(I.t("safe")).replace(/\n/g,"<br>");
      set(".v12-proof-badge",I.t("visualNote"),feat);set(".v12-featured-copy .mp-eyebrow",I.t("featuredProof"),feat);
      set(".v12-featured-copy h3",I.t("featuredTitle"),feat);set(".v12-featured-copy>p",I.t("featuredLead"),feat);
      feat.querySelectorAll(".v12-metric span").forEach((x,i)=>x.textContent=I.t("metrics",[])[i]||x.textContent);
      const links=feat.querySelectorAll(".mp-project-links a");if(links[0])links[0].textContent=I.t("openProject")+" →";if(links[1])links[1].textContent=I.t("openEvidence");
    }
    document.getElementById("v12Dock")?.remove();
  }
  function work(){
    const show=document.querySelectorAll(".mp-division-showcase button");
    ["software","games","media","labs"].forEach((id,i)=>{
      const c=show[i];if(!c)return;
      set("small",`0${i+1} / ${pageWord[L()].project.toUpperCase()}`,c);
      set("h3",I.t(`divisions.${id}.0`),c);set("p",I.t(`divisions.${id}.1`),c);set("b",I.t("exploreShort"),c);
    });
    const filters=document.getElementById("divisionFilters"),grid=document.getElementById("workGrid");if(!grid)return;
    const ids=["all","software","games","media","labs"];
    if(filters){
      filters.innerHTML=ids.map(id=>`<button type="button" data-division="${id}" class="${id==="all"?"active":""}">${id==="all"?I.t("all"):I.t(`divisions.${id}.0`)}</button>`).join("");
      filters.onclick=ev=>{const b=ev.target.closest("[data-division]");if(!b)return;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));grid.querySelectorAll(":scope>div").forEach(w=>w.hidden=b.dataset.division!=="all"&&w.dataset.division!==b.dataset.division)};
    }
    grid.innerHTML=(D.projects||[]).map(pr=>`<div data-division="${e(pr.division)}">${projectCard(pr)}</div>`).join("");
  }
  function experience(){
    const box=document.getElementById("experienceTimeline");if(!box)return;
    box.innerHTML=(D.experience||[]).map(x=>`<article class="mp-timeline-row"><time>${e(period(x.period))}</time><div><h3>${e(x.company)}</h3><strong>${e(roles[L()]?.[x.company]||x.role)}</strong><div class="mp-tags">${(x.tools||[]).map(v=>`<span>${e(v)}</span>`).join("")}</div></div><p>${e(loc(x.desc))}</p></article>`).join("");
  }
  function cases(){
    const box=document.getElementById("caseGrid");if(!box)return;
    box.innerHTML=(D.cases||[]).map((c,i)=>`<article class="mp-case"><small>${e(I.t("cases").toUpperCase())} / 0${i+1}</small><h2>${e(c.title)}</h2><div><b>${I.t("problem")}</b><p>${e(loc(c.problem))}</p></div><div><b>${I.t("approach")}</b><p>${e(loc(c.approach))}</p></div><div><b>${I.t("result")}</b><p>${e(loc(c.result))}</p></div><span>${e(c.stack)}</span><a href="${p(`work/${c.id}/`)}">${I.t("openProject")} →</a></article>`).join("");
  }
  function about(){
    const box=document.getElementById("aboutBlocks"),skills=document.getElementById("skillGrid"),tools=document.getElementById("toolCloud");
    const heads=[I.t("aboutDo"),I.t("aboutThink"),I.t("aboutWork")],copy=I.t("aboutCopy",[]);
    if(box)box.innerHTML=heads.map((h,i)=>`<article><small>0${i+1}</small><h3>${e(h)}</h3><p>${e(copy[i]||"")}</p></article>`).join("");
    if(skills)skills.innerHTML=(D.skills||[]).map(x=>`<span>${e(x)}</span>`).join("");
    if(tools)tools.innerHTML=(D.tools||[]).map(x=>`<span>${e(x)}</span>`).join("");
  }
  function now(){
    const box=document.getElementById("nowGrid");if(!box)return;
    const c=nowCopy[L()];
    box.innerHTML=(D.now||[]).map((x,i)=>{const z=c[x.name]||[loc(x.text)||x.text,I.status(x.status)];return`<article><small>0${i+1} / ${e(division(x.division||"labs").toUpperCase())}</small><h3>${e(x.name)}</h3><p>${e(z[0])}</p><b>${e(z[1])}</b></article>`}).join("");
  }
  function contact(){
    const primary=document.querySelector(".mp-contact-primary"),secondary=document.querySelector(".mp-contact-secondary");
    if(primary){set(".mp-eyebrow","KOSTIANTYN BRYL / "+I.t("contact").toUpperCase(),primary);set("h2",I.t("contactRole"),primary);set("p:not(.mp-eyebrow)",I.t("contactDirect"),primary);const mail=primary.querySelector('a[href^="mailto:"]');if(mail)mail.innerHTML=`${I.t("email")} <span>↗</span>`;const cv=primary.querySelector("[data-open-cv]");if(cv)cv.innerHTML=`CV / PDF <span>↓</span>`}
    if(secondary){set("h3",I.t("qrTitle"),secondary);set("p",I.t("qrText"),secondary);const img=secondary.querySelector("img");if(img)img.alt=I.t("qrTitle")}
  }
  function ecosystem(){
    const root=document.getElementById("ecosystemRoot");if(!root)return;
    const eco=V11?.ecosystem||[];
    const title={en:"Project ecosystem",pl:"Ekosystem projektów",ru:"Экосистема проектов",uk:"Екосистема проєктів",zh:"项目生态"}[L()];
    const lead={en:"NORVEXA is a project ecosystem inside my personal portfolio — software, games, media and labs.",pl:"NORVEXA to ekosystem projektów w moim osobistym portfolio — software, gry, media i labs.",ru:"NORVEXA — экосистема моих проектов внутри личного портфолио: ПО, игры, медиа и лабораторные разработки.",uk:"NORVEXA — екосистема моїх проєктів усередині особистого портфоліо: ПЗ, ігри, медіа та лабораторні розробки.",zh:"NORVEXA 是我个人作品集中的项目生态之一，包含软件、游戏、媒体与实验室方向。"}[L()];
    root.innerHTML=`<section class="shell mp-page-hero"><p class="mp-eyebrow">KOSTIANTYN BRYL / ${e(I.t("ecosystem").toUpperCase())}</p><h1>${e(title)}</h1><p>${e(lead)}</p></section><section class="shell v11-section"><div class="v11-ecosystem-grid">${eco.map(x=>`<article class="v11-division"><small>${e(x.code||"")} / NORVEXA</small><h2>${e((x.title||"").replace("NORVEXA ",""))}</h2><p>${e(x.desc?.[L()]||x.desc?.en||I.t(`divisions.${x.id}.1`))}</p><div class="v11-project-list">${(x.projects||[]).map(q=>`<span>${e(q)}</span>`).join("")}</div></article>`).join("")}</div></section>`;
  }
  function project(){
    const pr=D.projects?.find(x=>x.id===A.project),root=document.getElementById("projectDetail");if(!pr||!root)return;
    const c=D.cases?.find(x=>x.id===pr.id),detail=V11?.projectDetails?.[pr.id],proof=V12?.projects?.[pr.id],w=pageWord[L()];
    const metricText=metricLabels[pr.id]?.[L()]||[];
    const metrics=proof?.metrics?.map((m,i)=>[m[0],metricText[i]||m[1]])||[];
    root.innerHTML=`<section class="mp-project-hero"><div><p class="mp-eyebrow">${e(w.project)} / ${e(division(pr.division).toUpperCase())} / ${e(pr.index)}</p><h1>${e(pr.name)}</h1><p class="mp-project-lead">${e(loc(pr.desc))}</p><div class="mp-tags">${(pr.stack||[]).map(x=>`<span>${e(x)}</span>`).join("")}</div><div class="mp-project-links">${pr.repo?`<a class="mp-btn primary" href="${pr.repo}" target="_blank" rel="noreferrer">GitHub ↗</a>`:""}<a class="mp-btn" href="${p("work/")}">${I.t("backWork")}</a></div></div><figure><img src="${imageSrc(pr)}" alt="${e(pr.name)}" loading="eager"></figure></section>
    <section class="mp-detail-grid"><article><small>${I.t("role")}</small><h3>${e(proofRole(proof?.role||"Founder / Product / Engineering"))}</h3></article><article><small>${I.t("status")}</small><h3>${e(I.status(pr.status))}</h3></article><article><small>${I.t("stack")}</small><h3>${e((pr.stack||[]).join(" · "))}</h3></article></section>
    ${proof?`<section class="v12-project-proof"><div class="v12-proof-head"><small>${e(w.proof)} / ${e(pr.index)}</small><h2>${e(w.proof)}</h2></div><div class="v12-proof-grid"><article><small>${I.t("problem")}</small><p>${e(loc(proof.problem))}</p></article><article><small>${I.t("role")}</small><p>${e(proofRole(proof.role))}</p></article><article><small>${{en:"What I built",pl:"Co zbudowałem",ru:"Что я построил",uk:"Що я побудував",zh:"我构建了什么"}[L()]}</small><p>${e(loc(proof.built))}</p></article><article><small>${I.t("result")}</small><p>${e(loc(proof.result))}</p></article></div>${metrics.length?`<div class="v12-metrics">${metrics.map(m=>`<div><b>${e(m[0])}</b><span>${e(m[1])}</span></div>`).join("")}</div>`:""}</section>`:""}
    ${c?`<section class="mp-project-case"><div><p class="mp-eyebrow">${e(w.case)}</p><h2>${I.t("projectOverview")}</h2></div><article><b>${I.t("problem")}</b><p>${e(loc(c.problem))}</p></article><article><b>${I.t("approach")}</b><p>${e(loc(c.approach))}</p></article><article><b>${I.t("result")}</b><p>${e(loc(c.result))}</p></article></section>`:""}
    ${detail?`<section class="v11-section" id="v11ProjectDeep"><div class="v11-head"><small>${e(w.deep)} / ${e(pr.index)}</small><h2>${e(loc(detail.overview))}</h2></div><div class="v11-project-deep"><article><small>${e(w.architecture.toUpperCase())}</small><h3>${e(w.architecture)}</h3><div class="v11-architecture">${(detail.architecture||[]).map(x=>`<span>${e(x)}</span>`).join("")}</div></article><article><small>${e(w.decisions.toUpperCase())}</small><h3>${e(w.decisions)}</h3><p>${e(loc(detail.decisions))}</p></article><article class="wide"><small>${e(w.outcomes.toUpperCase())}</small><h3>${e(w.outcomes)}</h3><p>${e(loc(detail.results))}</p></article></div><div class="v11-head" style="margin-top:54px"><small>${e(w.visual)} / 03</small><h2>${I.t("projectGallery")}</h2></div><div class="v11-gallery"><figure><img src="${proof?.shot?p(proof.shot):imageSrc(pr)}" alt="${e(pr.name)}"><figcaption>${e(proof?.visual==="real"?{en:"Real product screenshot",pl:"Prawdziwy screenshot produktu",ru:"Реальный скриншот продукта",uk:"Реальний скриншот продукту",zh:"真实产品截图"}[L()]:I.t("visualNote"))}</figcaption></figure><div class="v11-visual"><i></i><b>${e((detail.architecture||[]).slice(0,2).join(" → "))}</b><span>${e(w.architecture)}</span></div><div class="v11-visual"><i></i><b>${e((detail.metrics||[]).map(x=>x[0]).join(" / "))}</b><span>${I.t("result")}</span></div></div></section>`:""}`;
  }
  const audienceData={
    recruiter:{
      en:["Kostiantyn Bryl","Product · Operations · Technology","10+ years across technology and operations, teams up to 20 people, plus hands-on product and software building."],
      pl:["Kostiantyn Bryl","Produkt · Operacje · Technologia","Ponad 10 lat w technologii i operacjach, zespoły do 20 osób oraz praktyczne tworzenie produktów i oprogramowania."],
      ru:["Kostiantyn Bryl","Продукт · Операции · Технологии","Более 10 лет в технологиях и операциях, управление командами до 20 человек и практическая разработка продуктов и ПО."],
      uk:["Kostiantyn Bryl","Продукт · Операції · Технології","Понад 10 років у технологіях та операціях, керування командами до 20 людей і практична розробка продуктів та ПЗ."],
      zh:["Kostiantyn Bryl","产品 · 运营 · 技术","拥有 10+ 年技术与运营经验，管理过最多 20 人团队，并持续亲自参与产品与软件开发。"]
    },
    engineering:{
      en:["Software builder with systems thinking.","Engineering · Android · Automation","Hands-on work across Android, Windows tooling, APIs, automation, Linux and device-level R&D — grounded in operational reality."],
      pl:["Software builder z myśleniem systemowym.","Engineering · Android · Automatyzacja","Praktyczna praca z Androidem, narzędziami Windows, API, automatyzacją, Linuxem i R&D urządzeń — osadzona w realnych procesach operacyjnych."],
      ru:["Разработчик с системным мышлением.","Engineering · Android · Автоматизация","Практическая работа с Android, Windows tooling, API, автоматизацией, Linux и device-level R&D — с пониманием реальных операционных процессов."],
      uk:["Розробник із системним мисленням.","Engineering · Android · Автоматизація","Практична робота з Android, Windows tooling, API, автоматизацією, Linux та device-level R&D — з розумінням реальних операційних процесів."],
      zh:["具有系统思维的软件构建者。","工程 · Android · 自动化","亲自参与 Android、Windows 工具、API、自动化、Linux 与设备级研发，并把技术工作建立在真实运营场景之上。"]
    },
    product:{
      en:["Product judgement backed by operations.","Product · Operations","Experience leading operations and teams, translating constraints into products, workflows and automation that people can actually use."],
      pl:["Decyzje produktowe wsparte doświadczeniem operacyjnym.","Produkt · Operacje","Doświadczenie w prowadzeniu operacji i zespołów oraz przekładaniu ograniczeń na produkty, workflow i automatyzację."],
      ru:["Продуктовое мышление, подкреплённое операционным опытом.","Продукт · Операции","Опыт управления операциями и командами, превращения ограничений в продукты, рабочие процессы и автоматизацию, которыми реально пользуются."],
      uk:["Продуктове мислення, підкріплене операційним досвідом.","Продукт · Операції","Досвід керування операціями й командами та перетворення обмежень на продукти, робочі процеси й автоматизацію."],
      zh:["由运营经验支撑的产品判断。","产品 · 运营","拥有运营与团队管理经验，能够把约束转化为真正可用的产品、工作流程与自动化系统。"]
    }
  };
  function audience(){
    const root=document.getElementById("audienceHero");if(!root)return;
    const d=audienceData[A.audience]?.[L()]||[],code={en:"EN",pl:"PL",ru:"RU",uk:"UA",zh:"ZH"}[L()],role={recruiter:"RECRUITER",engineering:"ENGINEERING",product:"PRODUCT"}[A.audience]||"RECRUITER";
    root.innerHTML=`<p class="mp-eyebrow">${e(I.t("audience").toUpperCase())}</p><h1>${e(d[0]||"Kostiantyn Bryl")}</h1><strong>${e(d[1]||"")}</strong><p>${e(d[2]||"")}</p><div class="mp-audience-links"><a class="mp-btn primary" href="${p(`assets/cv/Kostiantyn_Bryl_CV_${role}_${code}.pdf`)}" download>${I.t("download")} · ${code} ↓</a><a class="mp-btn" href="${p("experience/")}">${I.t("experience")} →</a><a class="mp-btn" href="${p("work/")}">${I.t("work")} →</a></div>`;
    const cfg=V11?.roles?.[A.audience];if(cfg){const panel=document.createElement("section");panel.className="v11-section";panel.innerHTML=`<div class="v11-role-projects">${(cfg.projects||[]).map(id=>{const pr=D.projects.find(x=>x.id===id);return pr?`<article><small>${e(pageWord[L()].project)} / ${e(division(pr.division).toUpperCase())}</small><h3>${e(pr.name)}</h3><p>${e(loc(pr.desc))}</p><a href="${p(`work/${pr.id}/`)}">${I.t("openProject")} →</a></article>`:""}).join("")}</div>`;root.insertAdjacentElement("afterend",panel)}
  }
  function system(){
    const root=document.getElementById("systemRoot");if(!root)return;
    const unlocked=localStorage.getItem("norvexa-system-unlocked")==="1",txt={en:["Private console","This hidden page is unlocked through the logo easter egg."],pl:["Prywatna konsola","Ta ukryta strona jest odblokowywana przez easter egg w logo."],ru:["Скрытая консоль","Эта скрытая страница открывается пасхалкой в логотипе."],uk:["Прихована консоль","Ця прихована сторінка відкривається пасхалкою в логотипі."],zh:["隐藏控制台","此隐藏页面通过标志彩蛋解锁。"]}[L()];
    root.innerHTML=`<section class="shell v11-system"><div class="v11-terminal"><div class="v11-terminal-head"><span>KB / SYSTEM</span><span class="${unlocked?"ok":""}">${unlocked?"UNLOCKED":"LOCKED"}</span></div><div class="v11-terminal-body"><b>${e(txt[0])}</b><br>${e(txt[1])}${unlocked?'<br><br>&gt; whoami<br>Kostiantyn Bryl<br>&gt; status<br><span class="ok">Creating Tomorrow.</span>':""}</div></div></section>`;
  }
  function render(){
    translateAttrs();breadcrumb();pageHero();
    ({home,work,experience,cases,about,now,contact,ecosystem,project,audience,system}[A.page]||(()=>{}))();
  }
  window.KB_MAIN={render};
})();
