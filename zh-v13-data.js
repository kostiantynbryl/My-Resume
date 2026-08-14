(()=>{
  const D=window.PORTFOLIO_DATA;
  if(!D)return;

  // Chinese is an overlay locale. Core stays on EN internally because a few legacy renderers
  // still contain four-language local literals. The final UI layer switches all visible copy.
  try{
    const ext=localStorage.getItem('resume-lang-ext');
    const nav=(navigator.language||'').toLowerCase();
    if(!ext&&!localStorage.getItem('resume-lang')&&nav.startsWith('zh'))localStorage.setItem('resume-lang-ext','zh');
  }catch{}

  D.translations.zh={
    home:'首页',work:'项目',experience:'经历',cases:'案例',about:'关于我',now:'现在',contact:'联系方式',
    available:'开放接受合适的机会',profile:'产品与运营负责人 · 软件开发者',heroK:'产品 · 运营 · 技术',
    hero1:'将复杂工作转化',hero2:'为清晰的产品与系统。',
    heroLead:'我把运营、产品与实际软件开发结合起来，专注于实用系统、自动化、隐私与可访问性。',
    explore:'查看项目',download:'下载简历',selected:'精选项目',allWork:'查看全部项目',
    pageWork:'四个方向，一套产品方法。',pageWorkLead:'软件、游戏、媒体系统与实验性研发按目标划分，让每个项目都有合适的语境。',
    pageExp:'跨越技术与运营的职业经历。',pageExpLead:'从电信工程、国际运营与零售管理，到创业与产品开发。',
    pageCases:'在真实约束下做出的三个关键决策。',pageCasesLead:'聚焦问题、约束、方法与结果的案例。',
    pageAbout:'商业判断与构建者思维。',pageAboutLead:'我做什么、如何思考、如何工作。',
    pageNow:'我现在正在构建什么。',pageNowLead:'当前产品与实验项目的简要视图。',
    pageContact:'一次有价值的交流，可以从一个明确的问题开始。',pageContactLead:'欢迎产品、运营、自动化与软件方向的机会，尤其是远程和面向欧洲的团队。',
    problem:'问题',approach:'方法',result:'结果',role:'角色',stack:'技术栈',status:'状态',github:'GitHub',
    openProject:'查看项目',viewCase:'查看案例',brand:'NORVEXA / 作品集',backWork:'返回项目',projectOverview:'项目概览',projectGallery:'项目视觉',projectDetails:'详情',
    footer:'更新于 2026 年 8 月',cvTitle:'下载简历',cvText:'选择语言或打印当前作品集。',printPortfolio:'打印作品集',close:'关闭',menu:'菜单',
    githubSnapshot:'GitHub 快照',githubText:'公开仓库与项目活动放在首屏之外，用于补充背景，而不是与个人简介争夺注意力。',
    aboutDo:'我做什么',aboutThink:'我如何思考',aboutWork:'我如何工作',audience:'定制视图',audienceLead:'针对特定受众的精简版本。'
  };

  const projectDesc={
    clearup:'以隐私为先的 Android 存储工具，扫描规则透明、本地处理，并使用受控且安全的高权限执行路径。',
    'cutflow-batch':'Windows 批量视频裁剪工具，优先使用 stream-copy，必要时回退到 H.264/AAC 重新编码。',
    'luma-bay':'以成长、氛围和短时移动体验为核心的修复经营类游戏概念。',
    telemanage:'内容运营平台，将频道、排期、发布、权限控制和计费整合到统一工作模型中。',
    bryltab:'针对特定设备的 SystemUI 实验，在保留系统原生身份验证的同时，让 PIN 解锁层接近透明。'
  };
  D.projects?.forEach(p=>{if(p.desc&&projectDesc[p.id])p.desc.zh=projectDesc[p.id]});

  const exp={
    DataGroup:'电信工程、网络诊断与技术运营。',
    TME:'国际订单运营、流程协调与团队管理。',
    ALLO:'零售运营、销售表现与面向客户团队的管理。',
    'LLC Brillkoff':'创业、业务运营、产品决策与流程负责人。'
  };
  D.experience?.forEach(x=>{if(x.desc&&exp[x.company])x.desc.zh=exp[x.company]});

  const caseZh={
    clearup:{
      problem:'存储清理工具往往把扫描规则和删除逻辑隐藏在“一键清理”之后，而高权限操作可能带来真实的数据风险。',
      approach:'让规则透明、数据本地处理、明确风险等级，并把 Root / Shizuku / Accessibility 限制在受控路径中。',
      result:'形成以隐私为先的架构：潜在破坏性操作可解释、可验证、可审计。'
    },
    telemanage:{
      problem:'内容发布流程分散在频道、日历、凭据、审批与计费等多个工具之间。',
      approach:'统一帖子、排期、Telegram 流程、OAuth、TOTP、上传、RBAC、计费、草稿与预览。',
      result:'形成围绕内容运营而不是零散工具构建的全栈产品架构。'
    },
    bryltab:{
      problem:'系统原生 PIN 界面遮挡锁屏内容，但身份验证机制本身必须保持不变。',
      approach:'仅 Hook SystemUI 的显示路径，并在控制器后续重算后重新确保遮罩透明度。',
      result:'一个范围严格受限的模块，保留原生凭据验证，并可通过停用模块恢复系统行为。'
    }
  };
  D.cases?.forEach(c=>{const z=caseZh[c.id];if(!z)return;if(c.problem)c.problem.zh=z.problem;if(c.approach)c.approach.zh=z.approach;if(c.result)c.result.zh=z.result});

  const V11=window.NORVEXA_V11;
  if(V11){
    V11.copy.zh={
      ecosystem:'NORVEXA 生态',ecosystemLead:'四个聚焦方向，由同一套产品方法连接。',timeline:'项目时间线',metrics:'事实，而不是装饰',gallery:'图库 / 产品视觉',
      architecture:'架构',decisions:'关键决策',results:'产生的变化',system:'NORVEXA 系统',locked:'系统页面已锁定',lockedHint:'通过 NORVEXA 标志的彩蛋解锁。',
      telegram:'Telegram',roleCv:'岗位定制简历',genericCv:'通用简历',latest:'最新快照',repo:'仓库',updated:'更新',language:'语言',private:'私有 / 案例',concept:'概念视觉',real:'真实产品截图',workflow:'工作流视觉',
      contactLead:'仅提供直接联系方式，不使用联系表单追踪。',
      aboutDo:'我连接运营、产品与技术执行，把工作从问题定义推进到可用系统。',
      aboutThink:'我先理解系统及其约束，再选择工具；偏好明确的行为、可衡量的结果和可逆的决策。',
      aboutWork:'我减少不必要的复杂度，自动化重复步骤，并依据反馈、日志与真实使用持续改进。'
    };
    V11.corrections.zh={
      heroLead:D.translations.zh.heroLead,pageWorkLead:D.translations.zh.pageWorkLead,pageExpLead:D.translations.zh.pageExpLead,pageContactLead:D.translations.zh.pageContactLead
    };
    const eco={software:'面向 Android、Windows 与 Web 的实用软件。',games:'围绕系统、成长与氛围构建的游戏。',media:'内容运营、发布系统与自动化。',labs:'Android 底层、设备研发与实验性工程。'};
    V11.ecosystem?.forEach(x=>{if(x.desc&&eco[x.id])x.desc.zh=eco[x.id]});
    const pd={
      clearup:{overview:'一款以隐私为先的 Android 存储工具，以透明规则取代不透明的一键清理。',decisions:'保持扫描逻辑透明，隔离高权限执行，并避免云账户、广告与分析追踪。',results:'形成更清晰的架构，每个潜在破坏性操作都可以解释和追踪。'},
      'cutflow-batch':{overview:'Windows 桌面工具，用于快速批量裁剪视频，并在可行时尽量保留 stream-copy。',decisions:'优先使用 stream-copy 提升速度，仅在媒体限制要求时才重新编码。',results:'形成可重复的桌面工作流，替代逐个剪辑文件的重复操作。'},
      'luma-bay':{overview:'移动端修复经营游戏概念，将成长、氛围与适合短时游玩的循环结合起来。',decisions:'先设计成长系统，再选择支持“修复与重建”体验的玩法机制，而不是让机制与主题互相竞争。',results:'产品方向更清晰，商业化与成长被当作系统设计，而不是后期附加。'},
      telemanage:{overview:'内容运营平台概念，把频道、排期、发布、权限与计费整合进统一运营模型。',decisions:'先明确建模权限和发布状态，再自动化内容分发。',results:'形成把内容运营视为一个完整系统而不是零散工具集合的产品架构。'},
      bryltab:{overview:'围绕锁屏呈现、SystemUI 行为与安全修改路径开展的设备级 Android 研发。',decisions:'保留系统原生身份验证行为，并尽可能只修改展示层。',results:'透明解锁层实验稳定运行，并针对通知与锁屏行为完成验证。'}
    };
    Object.entries(pd).forEach(([id,z])=>{const d=V11.projectDetails?.[id];if(!d)return;if(d.overview)d.overview.zh=z.overview;if(d.decisions)d.decisions.zh=z.decisions;if(d.results)d.results.zh=z.results});
  }

  const V12=window.NORVEXA_V12;
  if(V12){
    V12.copy.zh={
      proof:'证据与结果',proofLead:'先看证据：范围、决策、已交付行为与可验证的项目事实。',what:'我真正做什么',
      pillars:['构建产品','管理运营','自动化系统','交付软件'],featured:'重点案例',featuredTitle:'ClearUp — 安全优先于炫技。',featuredLead:'这是一款 Android 存储工具，高权限操作明确、本地且可审计，而不是藏在“一键完成”的承诺之后。',
      problem:'问题',myRole:'我的角色',built:'我构建了什么',result:'结果',stack:'技术栈',evidence:'证据',source:'来源',realShot:'真实产品截图',conceptVisual:'产品概念视觉 — 非 UI 截图',
      shipping:'近期交付 / 活动',shippingLead:'GitHub 快照在构建时生成，访客端不请求 GitHub API。',scope:'范围',impact:'影响',careerProof:'职业范围',careerLead:'10+ 年技术与运营经验，并有管理最多 20 人团队的经历。',
      recruiterDock:'快速联系',references:'推荐',referencesEmpty:'仅在有真实、可归属的推荐内容时展示。',visualPolicy:'视觉证据规则',visualPolicyText:'真实截图会明确标注；概念视觉绝不会被包装成真实产品界面。',
      roleValue:'此视图的重点',domainReady:'已准备自定义域名',domainText:'Canonical URL 与元数据可通过一个配置切换到自定义域名。',analytics:'已准备隐私友好分析',analyticsText:'无 Cookie、无用户 ID，尊重 Global Privacy Control 与 Do Not Track；在配置 endpoint 前遥测保持关闭。',openRepo:'查看开源证据 ↗'
    };
    const z12={
      clearup:{problem:'Android 存储工具经常把扫描规则和高权限行为隐藏在一次清理动作背后。',built:'Compose 界面、明确的扫描器与风险分类、Root / Shizuku / Accessibility 后端、本地审计与历史、WorkManager 扫描，以及签名发布验证机制。',result:'破坏性操作保持可解释并由用户确认；高权限执行被严格限制，而不是暴露为任意 Shell 权限。'},
      'cutflow-batch':{problem:'对大量视频重复执行相同的开头或结尾裁剪，逐个处理既慢又容易出错。',built:'PySide6 队列、FFprobe 时长检查、FFmpeg 优先 stream-copy、自动 H.264/AAC 回退、取消操作、单文件状态与设置持久化。',result:'一个可重复的批处理工作流替代逐个视频裁剪，并在媒体条件允许时保留无需重编码的快速路径。'},
      bryltab:{problem:'锁屏 PIN 层遮挡内容，但系统原生身份验证逻辑必须保持不变。',built:'仅针对 SystemUI 的 LSPosed Hook，持续控制 bouncer/scrim 透明度，同时保持凭据验证由系统处理。',result:'范围受限且可逆的视觉修改，不改变系统认证路径。'}
    };
    Object.entries(z12).forEach(([id,z])=>{const p=V12.projects?.[id];if(!p)return;if(p.problem)p.problem.zh=z.problem;if(p.built)p.built.zh=z.built;if(p.result)p.result.zh=z.result});
  }
})();
