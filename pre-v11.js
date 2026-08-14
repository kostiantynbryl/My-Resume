(()=>{
  const root=document.documentElement.dataset.root||'.';
  const local=p=>root==='.'?`./${p}`:`${root.replace(/\/$/,'')}/${p}`;
  const q=new URLSearchParams(location.search);const qLang=q.get('lang');
  if(['en','pl','ru','uk'].includes(qLang)){localStorage.setItem('resume-lang',qLang);document.documentElement.lang=qLang}
  const nativeFetch=window.fetch.bind(window);let snap;
  const snapshot=()=>snap||(snap=nativeFetch(local('data/github.json'),{cache:'no-cache'}).then(r=>r.ok?r.json():Promise.reject()).catch(()=>({user:{public_repos:0},repos:[]})));
  window.fetch=(input,init)=>{const url=typeof input==='string'?input:input?.url||'';if(url==='https://api.github.com/users/kostiantynbryl')return snapshot().then(x=>new Response(JSON.stringify(x.user),{status:200,headers:{'Content-Type':'application/json'}}));if(url.startsWith('https://api.github.com/users/kostiantynbryl/repos'))return snapshot().then(x=>new Response(JSON.stringify(x.repos),{status:200,headers:{'Content-Type':'application/json'}}));return nativeFetch(input,init)};
})();
