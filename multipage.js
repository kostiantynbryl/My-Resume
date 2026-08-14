(()=>{
  const base=new URL('.',document.currentScript.src);
  const load=(name,done)=>{const s=document.createElement('script');s.src=new URL(name,base).href;s.defer=true;if(done)s.onload=done;document.head.appendChild(s)};
  const home=document.body?.dataset.page==='home';
  const core=()=>load('pre-v11.js',()=>load('multipage-core.js',()=>load('final-v1.js',()=>load('a11y-v1.js',()=>load('easter-v1.js',()=>load('pro-v11.js',()=>home?load('proof-v12-home.js'):load('proof-v12.js',()=>load('analytics-v12.js'))))))));
  if(home)load('pro-v11-data.js',core);else load('proof-v12-data.js',()=>load('pro-v11-data.js',core));
})();
