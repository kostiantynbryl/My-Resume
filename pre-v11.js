(()=>{
  const root=document.documentElement.dataset.root||'.';
  const local=p=>root==='.'?`./${p}`:`${root.replace(/\/$/,'')}/${p}`;
  const q=new URLSearchParams(location.search);const qLang=q.get('lang');
  if(['en','pl','ru','uk'].includes(qLang)){localStorage.setItem('resume-lang',qLang);document.documentElement.lang=qLang}
  const D=window.PORTFOLIO_DATA,V=window.NORVEXA_V11;
  if(D&&V){for(const [l,patch] of Object.entries(V.corrections||{}))if(D.translations[l])Object.assign(D.translations[l],patch);
    const p=id=>D.projects?.find(x=>x.id===id);
    if(p('clearup')){p('clearup').desc.ru='Android-утилита с приоритетом приватности, прозрачными правилами сканирования, локальной обработкой и безопасными привилегированными режимами.';p('clearup').desc.uk='Android-утиліта з пріоритетом приватності, прозорими правилами сканування, локальною обробкою та безпечними привілейованими режимами.'}
    if(p('luma-bay')){p('luma-bay').desc.ru='Концепт мобильной игры о восстановлении, построенный вокруг прогрессии, атмосферы и коротких доступных игровых циклов.';p('luma-bay').desc.uk='Концепт мобільної гри про відновлення, побудований навколо прогресії, атмосфери та коротких доступних ігрових циклів.'}
  }
  const nativeFetch=window.fetch.bind(window);let snap;
  const snapshot=()=>snap||(snap=nativeFetch(local('data/github.json'),{cache:'no-cache'}).then(r=>r.ok?r.json():Promise.reject()).catch(()=>({user:{public_repos:0},repos:[]})));
  window.fetch=(input,init)=>{const url=typeof input==='string'?input:input?.url||'';if(url==='https://api.github.com/users/kostiantynbryl')return snapshot().then(x=>new Response(JSON.stringify(x.user),{status:200,headers:{'Content-Type':'application/json'}}));if(url.startsWith('https://api.github.com/users/kostiantynbryl/repos'))return snapshot().then(x=>new Response(JSON.stringify(x.repos),{status:200,headers:{'Content-Type':'application/json'}}));return nativeFetch(input,init)};
})();
