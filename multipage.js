(()=>{
  const base=new URL('.',document.currentScript.src);
  const rev='1.6.0';

  // Apply the preferred locale before the first render to prevent language flashes.
  try{
    const q=new URLSearchParams(location.search).get('lang');
    const ext=localStorage.getItem('resume-lang-ext');
    const saved=q||(ext==='zh'?'zh':localStorage.getItem('resume-lang'))||'';
    const l=String(saved).toLowerCase();
    if(l.startsWith('zh'))document.documentElement.lang='zh-CN';
    else if(['en','pl','ru','uk'].includes(l))document.documentElement.lang=l;
  }catch{}

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
    'app/profile-card.js',
    'app/utilities.js',
    'app/bootstrap.js'
  ];
  const load=i=>{
    if(i>=scripts.length)return;
    const s=document.createElement('script');s.src=new URL(`${scripts[i]}?v=${rev}`,base).href;s.onload=()=>load(i+1);s.onerror=()=>console.error('Portfolio module failed:',scripts[i]);document.head.appendChild(s);
  };
  load(0);
})();
