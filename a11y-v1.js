(()=>{
  function patch(){
    const brand=document.getElementById('mpBrand');
    if(brand) brand.removeAttribute('aria-label');
    document.querySelectorAll('.mp-brand img,.mp-footer-brand img').forEach(img=>{if(!img.hasAttribute('width'))img.setAttribute('width','36');if(!img.hasAttribute('height'))img.setAttribute('height','36')});
    const input=document.getElementById('commandInput');if(input&&!input.hasAttribute('aria-label'))input.setAttribute('aria-label','Search portfolio');
    const close=document.getElementById('mpMenuClose');if(close&&!close.hasAttribute('aria-label'))close.setAttribute('aria-label','Close menu');
    const theme=document.getElementById('mpMobileTheme');if(theme&&!theme.hasAttribute('aria-label'))theme.setAttribute('aria-label','Toggle theme');
  }
  const style=document.createElement('style');style.textContent=`.mp-btn{color:var(--text)}.mp-footer-map a{display:flex;align-items:center;min-height:28px;padding:5px 0}.mp-footer-egg{min-height:28px;padding:5px 0}.mp-nav a{min-height:28px;display:flex;align-items:center}.mp-hero-links a{min-height:28px;display:flex;align-items:center}@media (pointer:coarse){.mp-lang button,.mp-icon,.mp-cmd,.mp-menu-btn{min-width:44px;min-height:44px}}`;document.head.appendChild(style);
  let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;patch()})};
  new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true});
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',patch):patch();
})();
