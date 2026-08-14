(()=>{
  const base=new URL('.',document.currentScript.src);
  const rev='1.2.2';

  // Apply the saved language as early as possible so the browser sees the correct page language.
  try{
    const saved=localStorage.getItem('resume-lang');
    if(['en','pl','ru','uk'].includes(saved))document.documentElement.lang=saved;
  }catch{}

  // Internal proof/build widgets are not part of the public resume.
  const internalSelectors=['#v12Infra','#v12Shipping','.v11-build','.v11-build-dialog'];
  const guard=document.createElement('style');
  guard.id='public-resume-guard';
  guard.textContent=internalSelectors.join(',')+'{display:none!important}';
  document.head.appendChild(guard);
  const stripInternal=()=>internalSelectors.forEach(sel=>document.querySelectorAll(sel).forEach(node=>node.remove()));
  const observer=new MutationObserver(stripInternal);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  stripInternal();

  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href=new URL(`polish-v121.css?v=${rev}`,base).href;
  document.head.appendChild(css);

  const load=(name,done)=>{
    const s=document.createElement('script');
    s.src=new URL(`${name}?v=${rev}`,base).href;
    s.defer=true;
    if(done)s.onload=done;
    document.head.appendChild(s);
  };
  const home=document.body?.dataset.page==='home';
  const finish=()=>load('polish-v121.js',()=>load('polish-v121-lexicon.js',()=>load('polish-v121-pages.js',()=>load('polish-v121-final.js',()=>{stripInternal();if(!home)load('analytics-v12.js')}))));
  const core=()=>load('pre-v11.js',()=>load('multipage-core.js',()=>load('final-v1.js',()=>load('a11y-v1.js',()=>load('easter-v1.js',()=>load('pro-v11.js',()=>home?load('proof-v12-home.js',finish):load('proof-v12.js',finish)))))));
  if(home)load('pro-v11-data.js',core);else load('proof-v12-data.js',()=>load('pro-v11-data.js',core));
})();
