(()=>{
  const root=document.documentElement.dataset.root||'.';
  const page=document.body?.dataset.page||'home';
  const project=document.body?.dataset.project||'';
  const audience=document.body?.dataset.audience||'';
  const path=(p='')=>{
    if(/^(?:https?:|mailto:|tel:|#)/.test(p))return p;
    const prefix=root==='.'?'./':root.replace(/\/$/,'')+'/';
    return (prefix+p).replace(/\/\.\//g,'/');
  };
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const app={root,page,project,audience,path,esc,version:'1.4.0'};
  window.KB_APP=app;
})();
