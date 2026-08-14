(()=>{
const D=window.PORTFOLIO_DATA||{};
const PAGE=document.body?.dataset.page||'home';
const PROJECT=document.body?.dataset.project||'';
const AUDIENCE=document.body?.dataset.audience||'';
const ROOT=document.documentElement.dataset.root||'.';
const path=p=>ROOT==='.'?`./${p}`:`${ROOT.replace(/\/$/,'')}/${p}`;
const isZh=()=>{try{return localStorage.getItem('resume-lang-ext')==='zh'}catch{return false}};
const text=(el,v)=>{if(el&&v!=null&&el.textContent!==v)el.textContent=v};
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const projectZh={clearup:'以隐私为先的 Android 存储工具，扫描规则透明、本地处理，并使用受控且安全的高权限执行路径。','cutflow-batch':'Windows 批量视频裁剪工具，优先使用 stream-copy，必要时回退到 H.264/AAC 重新编码。','luma-bay':'以成长、氛围和短时移动体验为核心的修复经营类游戏概念。',telemanage:'内容运营平台，将频道、排期、发布、权限控制和计费整合到统一工作模型中。',bryltab:'针对特定设备的 SystemUI 实验，在保留系统原生身份验证的同时，让 PIN 解锁层接近透明。'};
const statusZh={'Active development':'积极开发中','Public':'公开项目','Concept / prototype':'概念 / 原型','Development':'开发中','Hardware test build':'硬件测试版本','ACTIVE DEVELOPMENT':'积极开发中','PRODUCT DEVELOPMENT':'产品开发中','CONCEPT / PROTOTYPE':'概念 / 原型','HARDWARE LAB':'硬件实验室'};
const metricZh={
 'PRIVILEGED EXECUTION PATHS':'高权限执行路径','FIXED SHIZUKU OPERATIONS':'固定 Shizuku 操作','ACCESSIBILITY REQUEST TIMEOUT':'无障碍服务请求超时','ADS / ANALYTICS / ACCOUNT / CLOUD':'广告 / 分析 / 账户 / 云端',
 'PRIVILEGED PATHS':'高权限路径','ADS / ANALYTICS':'广告 / 分析','LOCAL-FIRST POLICY':'本地优先策略','ENCODING PATHS':'编码路径','REAL SCREENSHOT':'真实截图','MANUAL CLIP LOOPS':'手动逐片处理',
 'CORE LOOP':'核心循环','PROGRESSION LAYERS':'成长层级','PAY-TO-WIN TARGET':'付费获胜目标','CORE DOMAINS':'核心领域','OPERATING MODEL':'运营模型','PUBLIC DATA EXPOSURE':'公开数据暴露',
 'ANDROID VERSION':'Android 版本','TARGET DEVICE':'目标设备','SYSTEMUI ITERATIONS':'SystemUI 迭代','INPUT VIDEO EXTENSIONS':'输入视频格式','PROCESSING PATHS':'处理路径','TRIM VALUE PRECISION':'裁剪精度','BACKGROUND WORKER PIPELINE':'后台工作管线',
 'YEARS':'年经验','TEAM SIZE':'团队规模','LANGUAGES':'语言','PLATFORM':'平台','DESKTOP':'桌面端','SYSTEMS':'系统','PRODUCT':'产品','OPERATIONS':'运营','AUTOMATION':'自动化'
};
const expZh={
 DataGroup:['电信工程师','电信工程、网络诊断与技术运营。'],
 TME:['国际订单负责人','国际订单运营、流程协调与团队管理。'],
 ALLO:['零售经理','零售运营、销售表现与面向客户团队的管理。'],
 'LLC Brillkoff':['企业负责人','创业、业务运营、产品决策与流程负责人。']
};
const caseZh={
 clearup:{problem:'存储清理工具往往把扫描规则和删除逻辑隐藏在“一键清理”之后，而高权限操作可能带来真实的数据风险。',approach:'让规则透明、数据本地处理、明确风险等级，并把 Root / Shizuku / Accessibility 限制在受控路径中。',result:'形成以隐私为先的架构：潜在破坏性操作可解释、可验证、可审计。'},
 telemanage:{problem:'内容发布流程分散在频道、日历、凭据、审批与计费等多个工具之间。',approach:'统一帖子、排期、Telegram 流程、OAuth、TOTP、上传、RBAC、计费、草稿与预览。',result:'形成围绕内容运营而不是零散工具构建的全栈产品架构。'},
 bryltab:{problem:'系统原生 PIN 界面遮挡锁屏内容，但身份验证机制本身必须保持不变。',approach:'仅 Hook SystemUI 的显示路径，并在控制器后续重算后重新确保遮罩透明度。',result:'一个范围严格受限的模块，保留原生凭据验证，并可通过停用模块恢复系统行为。'}
};
const deepZh={
 clearup:{overview:'一款以隐私为先的 Android 存储工具，以透明规则取代不透明的一键清理。',decision:'保持扫描逻辑透明，隔离高权限执行，并避免云账户、广告与分析追踪。',result:'形成更清晰的架构，每个潜在破坏性操作都可以解释和追踪。'},
 'cutflow-batch':{overview:'Windows 桌面工具，用于快速批量裁剪视频，并在可行时尽量保留 stream-copy。',decision:'优先使用 stream-copy 提升速度，仅在媒体限制要求时才重新编码。',result:'形成可重复的桌面工作流，替代逐个剪辑文件的重复操作。'},
 'luma-bay':{overview:'移动端修复经营游戏概念，将成长、氛围与适合短时游玩的循环结合起来。',decision:'先设计成长系统，再选择支持修复与重建体验的玩法机制。',result:'产品方向更清晰，商业化与成长被当作系统设计，而不是后期附加。'},
 telemanage:{overview:'内容运营平台概念，把频道、排期、发布、权限与计费整合进统一运营模型。',decision:'先明确建模权限和发布状态，再自动化内容分发。',result:'形成把内容运营视为一个完整系统而不是零散工具集合的产品架构。'},
 bryltab:{overview:'围绕锁屏呈现、SystemUI 行为与安全修改路径开展的设备级 Android 研发。',decision:'保留系统原生身份验证行为，并尽可能只修改展示层。',result:'透明解锁层实验稳定运行，并针对通知与锁屏行为完成验证。'}
};
const v12ProjectZh={
 clearup:{problem:'Android 存储工具经常把扫描规则和高权限行为隐藏在一次清理动作背后。',built:'Compose 界面、明确的扫描器与风险分类、Root / Shizuku / Accessibility 后端、本地审计与历史、WorkManager 扫描，以及签名发布验证机制。',result:'破坏性操作保持可解释并由用户确认；高权限执行被严格限制，而不是暴露为任意 Shell 权限。'},
 'cutflow-batch':{problem:'对大量视频重复执行相同的开头或结尾裁剪，逐个处理既慢又容易出错。',built:'PySide6 队列、FFprobe 时长检查、FFmpeg 优先 stream-copy、自动 H.264/AAC 回退、取消操作、单文件状态与设置持久化。',result:'一个可重复的批处理工作流替代逐个视频裁剪，并在媒体条件允许时保留无需重编码的快速路径。'},
 bryltab:{problem:'锁屏 PIN 层遮挡内容，但系统原生身份验证逻辑必须保持不变。',built:'仅针对 SystemUI 的 LSPosed Hook，持续控制 bouncer / scrim 透明度，同时保持凭据验证由系统处理。',result:'范围受限且可逆的视觉修改，不改变系统认证路径。'}
};

function setZh(){try{localStorage.setItem('resume-lang-ext','zh');localStorage.setItem('resume-lang','en')}catch{}location.reload()}
function leaveZh(){try{localStorage.removeItem('resume-lang-ext')}catch{}}
function ensureButtons(){
  const desktop=q('.mp-lang');
  if(desktop&&!desktop.querySelector('[data-zh-language]')){const b=document.createElement('button');b.type='button';b.dataset.zhLanguage='1';b.textContent='中文';b.onclick=setZh;desktop.appendChild(b)}
  const mobile=qa('.mp-mobile-menu [data-lang]').map(x=>x.parentElement).find(Boolean);
  if(mobile&&!mobile.querySelector('[data-zh-language]')){const b=document.createElement('button');b.type='button';b.dataset.zhLanguage='1';b.textContent='中文';b.style.cssText='border:1px solid var(--line);background:var(--surface);color:var(--muted);border-radius:10px;padding:9px 12px;font-size:9px;font-weight:800';b.onclick=setZh;mobile.appendChild(b)}
  if(isZh()){
    qa('[data-lang]').forEach(b=>b.classList.remove('active'));
    qa('[data-zh-language]').forEach(b=>{b.classList.add('active');b.style.background='var(--text)';b.style.color='var(--bg)'})
  }
}
function patchCore(){
  if(!isZh())return;
  document.documentElement.lang='zh-CN';
  const T=D.translations?.zh||{};
  qa('[data-i18n]').forEach(el=>{const v=T[el.dataset.i18n];if(v!=null)text(el,v)});
  const titles={home:'Kostiantyn Bryl — NORVEXA 作品集',work:'项目 — Kostiantyn Bryl',experience:'经历 — Kostiantyn Bryl',cases:'案例 — Kostiantyn Bryl',about:'关于我 — Kostiantyn Bryl',now:'现在 — Kostiantyn Bryl',contact:'联系方式 — Kostiantyn Bryl',ecosystem:'NORVEXA 生态 — Kostiantyn Bryl',project:`${q('.mp-project-hero h1')?.textContent||'项目'} — Kostiantyn Bryl`,audience:'Kostiantyn Bryl — 定制视图',system:'NORVEXA 系统'};document.title=titles[PAGE]||document.title;
  text(q('.skip-link'),'跳到主要内容');text(q('.mp-brand small'),'NORVEXA / 作品集');text(q('.mp-id-copy p'),'产品与运营负责人 · 软件开发者');
  const navMap={'./':'首页','../':'首页','work/':'项目','experience/':'经历','case-studies/':'案例','about/':'关于我','now/':'现在','contact/':'联系方式','ecosystem/':'生态'};
  qa('.mp-nav a,.mp-mobile-menu nav a').forEach(a=>{const href=a.getAttribute('href')||'';const key=Object.keys(navMap).find(k=>href===k||href.endsWith('/'+k));if(key){const span=a.querySelector('span');const label=navMap[key];if(span)a.innerHTML=label+'<span>↗</span>';else text(a,label)}});
  const theme=q('#mpMobileTheme');if(theme)text(theme,'主题 ◐');
  qa('.mp-footer-map>div').forEach((d,i)=>{text(d.querySelector('b'),['作品集','个人','链接'][i]);qa('a',d).forEach(a=>{const h=a.getAttribute('href')||'';if(h.includes('/work/'))text(a,'项目');else if(h.includes('/case-studies/'))text(a,'案例');else if(h.includes('/now/'))text(a,'现在');else if(h.includes('/experience/'))text(a,'经历');else if(h.includes('/about/'))text(a,'关于我');else if(h.includes('/contact/'))text(a,'联系方式');else if(h.startsWith('mailto:'))text(a,'邮箱 ↗')})});
  const foot=q('.mp-footer-brand span');if(foot)text(foot,'更新于 2026 年 8 月');
  qa('.mp-breadcrumb b,.mp-breadcrumb a').forEach(e=>{const s=e.textContent.trim();const m={'WORK':'项目','EXPERIENCE':'经历','CASE STUDIES':'案例','ABOUT':'关于我','NOW':'现在','CONTACT':'联系方式'};if(m[s])text(e,m[s])});
}
function patchHome(){if(PAGE!=='home'||!isZh())return;
  const facts=['年经验','团队人数','语言'];qa('.mp-id-facts span').forEach((e,i)=>text(e,facts[i]));
  const metrics=['年 / 技术与运营','人 / 管理团队','NORVEXA 方向','精选产品'];qa('.mp-metric span').forEach((e,i)=>text(e,metrics[i]));
  const views=['招聘视图 ↗','工程视图 ↗','产品视图 ↗'];qa('.mp-hero-links a').forEach((e,i)=>text(e,views[i]));
  const w=q('#v12What');if(w){text(q('.v12-head small',w),'能力 / 04');text(q('.v12-head h2',w),'我如何创造价值');const p=[['构建产品','从想法与结构推进到可工作的产品。'],['管理运营','建立流程、责任边界与控制机制。'],['自动化系统','减少人工重复和运营摩擦。'],['交付结果','把决策变成真正可用的软件。']];qa('.v12-pillar',w).forEach((c,i)=>{text(q('b',c),p[i]?.[0]);let d=q('.v121-pillar-copy',c);if(d)text(d,p[i]?.[1])})}
  const f=q('#v12Featured');if(f){text(q('.v12-head small',f),'重点案例 / 01');text(q('.v12-head h2',f),'重点案例');const slogan=q('.v12-featured-visual strong',f);if(slogan)slogan.innerHTML='安全。<br>本地。<br>透明。';text(q('.mp-eyebrow',f),'证据与结果');text(q('h3',f),'ClearUp — 安全优先于炫技。');text(q('.v12-featured-copy>p',f),'这是一款 Android 工具，高权限操作明确、本地且可审计，而不是藏在“一键完成”的承诺之后。');text(q('.v12-proof-badge',f),'产品概念视觉 — 非 UI 截图');const links=qa('.mp-project-links a',f);text(links[0],'查看项目 →');text(links[1],'查看开源证据 ↗');const mm=['高权限执行路径','固定 Shizuku 操作','无障碍服务请求超时','广告 / 分析 / 账户 / 云端'];qa('.v12-metric span',f).forEach((e,i)=>text(e,mm[i]))}
  const cv=q('#v12Dock [data-v12-cv]');if(cv)cv.href=path('assets/cv/Kostiantyn_Bryl_CV_ZH.pdf');qa('#v12Dock a,#v12Dock button').forEach((e,i)=>{if(i===0)text(e,'简历 ↓');else if(/Email/i.test(e.textContent))text(e,'邮箱')});
}
function patchProjectCards(){if(!isZh())return;qa('.mp-project-card').forEach(card=>{const name=q('h3',card)?.textContent.trim(),p=D.projects?.find(x=>x.name===name);if(!p)return;text(q('.mp-project-body>p',card),projectZh[p.id]);const st=q('.mp-project-top>span',card);if(st&&statusZh[st.dataset.original||st.textContent.trim()])text(st,statusZh[st.dataset.original||st.textContent.trim()]);const links=qa('.mp-project-links a',card);if(links[0]&&!links[0].href.includes('github.com'))text(links[0],'查看项目 →')})}
function patchWork(){if(PAGE!=='work'||!isZh())return;
  const hero=q('.mp-page-hero>.mp-eyebrow');text(hero,'NORVEXA / 项目');
  const divDesc=['面向 Android、Windows 与 Web 的实用软件。','围绕成长、系统与氛围构建的游戏。','内容运营、发布系统与自动化。','Android 底层、设备研发与实验性工程。'];qa('.mp-division-showcase button').forEach((c,i)=>{text(q('p',c),divDesc[i]);text(q('b',c),'查看 →')});
  qa('[data-division]').forEach(b=>{if(b.tagName==='BUTTON'){const m={all:'全部',software:'软件',games:'游戏',media:'媒体',labs:'实验室'};text(b,m[b.dataset.division])}});patchProjectCards();
  qa('.v11-head small').forEach(e=>{if(e.textContent.includes('HISTORY'))text(e,'NORVEXA / 历史')});qa('.v11-head h2').forEach(e=>{if(/Project timeline|Oś czasu|Хронолог/.test(e.textContent))text(e,'项目时间线')});patchTimeline();
}
function patchTimeline(){if(!isZh())return;const rows=[['电信','DataGroup / 网络与技术运营'],['运营','TME / 国际订单与团队管理'],['创业','LLC Brillkoff / 企业负责人及运营体系'],['NORVEXA SOFTWARE','ClearUp · Reader · OneStep · CutFlow Batch'],['NORVEXA GAMES','Luma Bay · Shadow Merge Defense'],['NORVEXA LABS','Android 16 · SystemUI · Rockchip 研发']];qa('.v11-time').forEach((r,i)=>{if(rows[i]){text(q('h3',r),rows[i][0]);text(q('p',r),rows[i][1])}})}
function patchExperience(){if(PAGE!=='experience'||!isZh())return;text(q('.mp-page-hero>.mp-eyebrow'),'职业 / 经历');qa('.mp-timeline-row').forEach(r=>{const company=q('h3',r)?.textContent.trim(),z=expZh[company];if(!z)return;text(q('strong',r),z[0]);text(q('p',r),z[1]);const time=q('time',r);if(time&&/PRESENT/i.test(time.textContent))text(time,'2022—至今')});qa('.v12-head h2').forEach(e=>{if(/Career scope|Skala kariery|Масштаб/.test(e.textContent))text(e,'职业范围')});qa('.v12-head+p,.v12-section>p').forEach(e=>{if(/10\+/.test(e.textContent))text(e,'10+ 年技术与运营经验，并有管理最多 20 人团队的经历。')})}
function patchCases(){if(PAGE!=='cases'||!isZh())return;text(q('.mp-page-hero>.mp-eyebrow'),'产品 / 案例');qa('.mp-case').forEach((c,i)=>{const name=q('h2',c)?.textContent.trim(),base=D.cases?.find(x=>x.title===name),z=base?caseZh[base.id]:null;text(q('small',c),`案例 / 0${i+1}`);const parts=qa('div',c);parts.forEach(part=>{const b=q('b',part),p=q('p',part);if(!b||!p||!z)return;const k=b.textContent.trim();if(/Problem|Проблем|Problem/.test(k)){text(b,'问题');text(p,z.problem)}else if(/Approach|Подход|Підхід|Podejście/.test(k)){text(b,'方法');text(p,z.approach)}else if(/Result|Результ|Rezultat/.test(k)){text(b,'结果');text(p,z.result)}});const a=q('a',c);if(a)text(a,'查看项目 →')})}
function patchAbout(){if(PAGE!=='about'||!isZh())return;text(q('.mp-page-hero>.mp-eyebrow'),'个人 / 关于我');const cards=qa('#aboutBlocks article');const data=[['我做什么','我连接运营、产品与技术执行，把工作从问题定义推进到可用系统。'],['我如何思考','我先理解系统、约束与风险，再选择工具；偏好明确行为、可衡量结果和可逆决策。'],['我如何工作','我减少不必要的复杂度，自动化重复步骤，并依据反馈、日志与真实使用持续改进。']];cards.forEach((c,i)=>{text(q('h3',c),data[i]?.[0]);text(q('p',c),data[i]?.[1])});const skills={'Operations & Leadership':'运营与领导力','Product Development':'产品开发','Process Automation':'流程自动化','Software Development':'软件开发','Data & Business Systems':'数据与业务系统','Networks & Technical Ops':'网络与技术运维','AI / Prompt Engineering':'AI / 提示词工程','Accessibility':'可访问性'};qa('#skillGrid span').forEach(e=>{if(skills[e.textContent.trim()])text(e,skills[e.textContent.trim()])})}
function patchNow(){if(PAGE!=='now'||!isZh())return;text(q('.mp-page-hero>.mp-eyebrow'),'现在 / 2026年8月');const rows={ClearUp:['以隐私为先的 Android 系统工具','积极开发中'],'Norvexa Reader':['阅读与文档产品方向','产品开发中'],'Luma Bay':['移动端修复经营游戏概念','概念 / 原型'],'BrylTab / Android R&D':['Android 16、SystemUI、Rockchip 与设备实验','硬件实验室']};qa('#nowGrid article').forEach(a=>{const n=q('h3',a)?.textContent.trim(),z=rows[n];if(z){text(q('p',a),z[0]);text(q('b',a),z[1])}})}
function patchContact(){if(PAGE!=='contact'||!isZh())return;text(q('.mp-page-hero>.mp-eyebrow'),'联系 / 直接');const p=q('.mp-contact-primary'),s=q('.mp-contact-secondary');if(p){text(q('.mp-eyebrow',p),'KOSTIANTYN BRYL / 联系方式');text(q('h2',p),'产品 · 运营 · 软件开发 · 自动化');text(q('h2+p',p),'仅提供直接联系方式，不使用联系表单或额外追踪。');const mail=q('.mp-contact-list a[href^="mailto:"]',p);if(mail){const node=[...mail.childNodes].find(n=>n.nodeType===3);if(node)node.nodeValue='邮箱 ';}}if(s){text(q('h3',s),'作品集二维码');text(q('p',s),'扫描二维码，打开此作品集的最新发布版本。');const img=q('img',s);if(img)img.alt='作品集二维码'}}
function patchEcosystem(){if(PAGE!=='ecosystem'||!isZh())return;text(q('#ecosystemRoot .mp-page-hero .mp-eyebrow'),'NORVEXA / 生态');text(q('#ecosystemRoot .mp-page-hero h1'),'NORVEXA 生态');text(q('#ecosystemRoot .mp-page-hero p:not(.mp-eyebrow)'),'四个聚焦方向，由同一套产品方法连接。');const desc=['面向 Android、Windows 与 Web 的实用软件。','围绕系统、成长与氛围构建的游戏。','内容运营、发布系统与自动化。','Android 底层、设备研发与实验性工程。'];qa('.v11-division').forEach((a,i)=>text(q('p',a),desc[i]));qa('#ecosystemRoot .v11-head small').forEach(e=>text(e,'地图 / 2026'));qa('#ecosystemRoot .v11-head h2').forEach(e=>text(e,'项目时间线'));patchTimeline()}
function patchProject(){if(PAGE!=='project'||!isZh())return;const p=D.projects?.find(x=>x.id===PROJECT);if(!p)return;text(q('.mp-project-lead'),projectZh[PROJECT]);qa('.mp-project-links a').forEach(a=>{if(!a.href.includes('github.com'))text(a,'返回项目')});const dg=qa('.mp-detail-grid article');if(dg[0]){text(q('small',dg[0]),'角色');text(q('h3',dg[0]),PROJECT==='cutflow-batch'?'产品 / 工程':'创始人 / 产品 / 工程')}if(dg[1]){text(q('small',dg[1]),'状态');const h=q('h3',dg[1]);if(h)text(h,statusZh[h.dataset.original||h.textContent.trim()]||h.textContent)}if(dg[2])text(q('small',dg[2]),'技术栈');
  const c=caseZh[PROJECT];const cs=q('.mp-project-case');if(cs){text(q('.mp-eyebrow',cs),'案例研究');text(q('h2',cs),'项目概览');qa('article',cs).forEach(a=>{const b=q('b',a),pp=q('p',a);if(!b||!pp||!c)return;const v=b.textContent;if(/Problem|Проблем/.test(v)){text(b,'问题');text(pp,c.problem)}else if(/Approach|Подход|Підхід|Podejście/.test(v)){text(b,'方法');text(pp,c.approach)}else if(/Result|Результ|Rezultat/.test(v)){text(b,'结果');text(pp,c.result)}})}
  const d=deepZh[PROJECT],deep=q('#v11ProjectDeep');if(deep&&d){const heads=qa('.v11-head',deep);if(heads[0]){text(q('small',heads[0]),'深入了解');text(q('h2',heads[0]),d.overview)}const arts=qa('.v11-project-deep article',deep);if(arts[0]){text(q('small',arts[0]),'架构');text(q('h3',arts[0]),'架构')}if(arts[1]){text(q('small',arts[1]),'关键决策');text(q('h3',arts[1]),'关键决策');text(q('p',arts[1]),d.decision)}if(arts[2]){text(q('small',arts[2]),'产生的变化');text(q('h3',arts[2]),'产生的变化');text(q('p',arts[2]),d.result)}if(heads[1]){text(q('small',heads[1]),'视觉');text(q('h2',heads[1]),'图库 / 产品视觉')}qa('figcaption',deep).forEach(e=>text(e,PROJECT==='cutflow-batch'?'真实产品截图':'概念视觉'));qa('.v11-visual span',deep).forEach((e,i)=>text(e,i===0?'工作流视觉':'事实，而不是装饰'))}
  const v12=q('#v12ProjectProof');const z=v12ProjectZh[PROJECT];if(v12&&z){qa('.mp-eyebrow,.v12-head small',v12).forEach(e=>{if(/CASE|EVIDENCE|DOWODY|ДОКАЗ/.test(e.textContent))text(e,'案例 / 证据')});qa('article',v12).forEach(a=>{const b=q('b,small,h3',a),pp=q('p',a);if(!b)return;const s=b.textContent;if(/MY ROLE|Моя роль|Moja rola|Моя/.test(s)){text(b,'我的角色')}else if(/WHAT I BUILT|Что я|Що я|Co zbud/.test(s)){text(b,'我构建了什么');if(pp)text(pp,z.built)}else if(/PROBLEM|ПРОБЛЕМ|Problem/.test(s)){text(b,'问题');if(pp)text(pp,z.problem)}else if(/RESULT|РЕЗУЛ|Rezultat/.test(s)){text(b,'结果');if(pp)text(pp,z.result)}else if(/EVIDENCE|ДОКАЗ|Dowod/.test(s)){text(b,'证据')}})}qa('.v11-metrics span,.v12-metric span,.mp-proof-metric span').forEach(e=>{const k=e.textContent.trim();if(metricZh[k])text(e,metricZh[k])})}
function patchAudience(){if(PAGE!=='audience'||!isZh())return;const hero=q('#audienceHero');const cfg={recruiter:['Kostiantyn Bryl','产品 · 运营 · 技术','10+ 年技术与运营经验，管理过最多 20 人的团队，同时具备实际产品与软件开发能力。',['经历','精选项目','下载简历']],engineering:['具备系统思维的软件开发者。','工程 · Android · 自动化','实际参与 Android、Windows 工具、API、自动化、Linux 与设备级研发，并以真实运营场景支撑技术决策。',['项目','案例','GitHub']],product:['由运营经验支撑的产品判断。','产品与运营','拥有运营与团队管理经验，能够把约束转化为真正可用的产品、工作流与自动化系统。',['经历','案例','关于我']]}[AUDIENCE];if(hero&&cfg){text(q('h1',hero),cfg[0]);text(q('strong',hero),cfg[1]);text(q('p:not(.mp-eyebrow)',hero),cfg[2]);qa('.mp-audience-links>*',hero).forEach((e,i)=>{const arrow=e.tagName==='A'?' →':'';text(e,(cfg[3][i]||'')+arrow)})}
  const role=q('#v11Role');if(role){qa('.v11-head small,.v11-head h2',role).forEach(e=>text(e,'岗位定制简历'));const acts=qa('.v11-role-actions a',role);if(acts[0]){acts[0].href=path(`assets/cv/Kostiantyn_Bryl_CV_${({recruiter:'RECRUITER',engineering:'ENGINEERING',product:'PRODUCT'})[AUDIENCE]}_ZH.pdf`);text(acts[0],'岗位定制简历 · ZH ↓')}if(acts[1]){acts[1].href=path('assets/cv/Kostiantyn_Bryl_CV_ZH.pdf');text(acts[1],'通用简历 · ZH ↓')}qa('.v11-role-projects article').forEach(a=>{const n=q('h3',a)?.textContent.trim(),p=D.projects?.find(x=>x.name===n);if(p){text(q('p',a),projectZh[p.id]);text(q('a',a),'查看项目 →')}});qa('.v11-metrics span',role).forEach(e=>{const k=e.textContent.trim();if(metricZh[k])text(e,metricZh[k])})}}
function patchModalAndCommand(){if(!isZh())return;const m=q('#cvModal');if(m){text(q('h2',m),'下载简历');const ps=qa('form>p',m);if(ps[1])text(ps[1],'选择语言下载 PDF，或打印当前作品集。');const box=q('.mp-cv-options',m);if(box&&!box.querySelector('[data-zh-cv]')){const a=document.createElement('a');a.dataset.zhCv='1';a.href=path('assets/cv/Kostiantyn_Bryl_CV_ZH.pdf');a.setAttribute('download','');a.textContent='简体中文 · PDF';box.insertBefore(a,box.lastElementChild)}const print=q('[data-final-print],[data-print-current]',m);if(print)text(print,'打印作品集')}
  const input=q('#commandInput');if(input)input.placeholder='项目、经历、ClearUp、matrix…';const map={'Work':'项目','Ecosystem':'生态','Experience':'经历','Case studies':'案例','About':'关于我','Now':'现在','Contact':'联系方式','Theme':'主题','System':'系统','CV':'简历'};qa('#commandResults a').forEach(a=>{const n=[...a.childNodes].find(x=>x.nodeType===3),raw=n?.nodeValue?.trim();if(raw&&map[raw])n.nodeValue=map[raw]})}
function patchSystem(){if(PAGE!=='system'||!isZh())return;const t=q('.v11-terminal-body');if(!t)return;if(/locked|заблок|zablok|denied/i.test(t.textContent))t.innerHTML='<b>系统页面已锁定</b><br>通过 NORVEXA 标志的彩蛋解锁。<br><br>&gt; status <span style="color:#ff9ea8">拒绝访问</span>'}
function patchAll(){ensureButtons();if(!isZh())return;patchCore();patchHome();patchProjectCards();patchWork();patchExperience();patchCases();patchAbout();patchNow();patchContact();patchEcosystem();patchProject();patchAudience();patchModalAndCommand();patchSystem()}

document.addEventListener('click',e=>{
  const langBtn=e.target.closest('[data-lang]');if(langBtn){leaveZh();}
  if(e.target.closest('[data-open-cv],#homeCv,#mpCmd,[data-v12-cv]'))[40,140,360].forEach(ms=>setTimeout(patchAll,ms));
},true);
document.addEventListener('input',e=>{if(e.target.id==='commandInput')setTimeout(patchModalAndCommand,30)},true);
function start(){ensureButtons();if(isZh()){document.documentElement.lang='zh-CN';[0,80,220,520,900,1350,1850,2350].forEach(ms=>setTimeout(patchAll,ms))}}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start,{once:true}):start();
})();
