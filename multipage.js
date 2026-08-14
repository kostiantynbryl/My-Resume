(()=>{
  const base=new URL('.',document.currentScript.src);
  const load=(name,done)=>{const s=document.createElement('script');s.src=new URL(name,base).href;s.defer=true;if(done)s.onload=done;document.head.appendChild(s)};
  load('multipage-core.js',()=>load('final-v1.js'));
})();
