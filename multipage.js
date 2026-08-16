(()=>{
  const base=new URL('.',document.currentScript.src);
  const rev='1.5.3';

  // Apply the preferred locale before the first render to prevent language flashes.
  try{
    const q=new URLSearchParams(location.search).get('lang');
    const ext=localStorage.getItem('resume-lang-ext');
    const saved=q||(ext==='zh'?'zh':localStorage.getItem('resume-lang'))||'';
    const l=String(saved).toLowerCase();
    if(l.startsWith('zh'))document.documentElement.lang='zh-CN';
    else if(['en','pl','ru','uk'].includes(l))document.documentElement.lang=l;
  }catch{}

  // Short desktop composition: preserve the portrait feel, align the actual image
  // with the headline and avoid duplicating metrics already shown below the hero.
  const lowHeight=document.createElement('style');
  lowHeight.dataset.kbLowHeight='v153';
  lowHeight.textContent=`@media (min-width:981px) and (max-height:800px){
    .mp-hero{min-height:auto!important;padding-top:14px!important;padding-bottom:28px!important;gap:clamp(42px,6.5vw,86px)!important}
    .mp-hero-copy{padding-top:0!important}
    .mp-hero h1{font-size:clamp(60px,6vw,82px)!important;line-height:.91!important;margin:10px 0 14px!important;max-width:820px!important}
    .mp-lead{font-size:16px!important;line-height:1.42!important;max-width:690px!important}
    .mp-hero-actions{margin-top:15px!important}
    .mp-hero-links{margin-top:11px!important;gap:15px!important}
    .mp-btn{min-height:42px!important}
    .mp-identity{position:relative!important;justify-self:end!important;width:min(100%,370px)!important;margin-top:17px!important;height:388px!important;padding:14px!important;grid-template-rows:288px 72px!important;border-radius:28px!important}
    .mp-identity-top{position:absolute!important;z-index:3!important;top:20px!important;left:22px!important;right:22px!important;height:auto!important;margin:0!important;pointer-events:none!important}
    .mp-serial,.mp-available{background:rgba(7,9,13,.68)!important;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    .mp-serial{padding:5px 7px!important;border-radius:999px!important}
    .mp-photo-wrap{grid-row:1!important;height:288px!important;min-height:288px!important;max-height:288px!important;border-radius:20px!important}
    .mp-photo{height:288px!important;object-position:center 29%!important}
    .mp-id-copy{grid-row:2!important;height:72px!important;min-height:72px!important;max-height:72px!important;padding:12px 3px 7px!important}
    .mp-id-copy h2{font-size:22px!important;margin-bottom:3px!important}
    .mp-id-copy p{height:30px!important;min-height:30px!important;max-height:30px!important;font-size:10px!important;line-height:1.4!important}
    .mp-id-facts{display:none!important}
    .v12-recruiter-dock{display:none!important}
  }`;
  document.head.appendChild(lowHeight);

  const addCss=name=>{
    if(document.querySelector(`link[data-kb-css="${name}"]`))return;
    const l=document.createElement('link');l.rel='stylesheet';l.dataset.kbCss=name;l.href=new URL(`${name}?v=${rev}`,base).href;document.head.appendChild(l);
  };
  ['pro-v11.css','proof-v12.css','polish-v121.css','app/app.css'].forEach(addCss);

  const scripts=[
    'pro-v11-data.js',
    'proof-v12-data.js',
    'zh-v13-data.js',
    'app/core.js',
    'app/i18n.js',
    'app/header.js',
    'app/main.js',
    'app/footer.js',
    'app/utilities.js',
    'app/bootstrap.js'
  ];
  const load=i=>{
    if(i>=scripts.length)return;
    const s=document.createElement('script');s.src=new URL(`${scripts[i]}?v=${rev}`,base).href;s.onload=()=>load(i+1);s.onerror=()=>console.error('Portfolio module failed:',scripts[i]);document.head.appendChild(s);
  };
  load(0);
})();
