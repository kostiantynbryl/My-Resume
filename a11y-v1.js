(()=>{
  function patch(){
    const brand=document.getElementById('mpBrand');
    if(brand) brand.removeAttribute('aria-label');
    document.querySelectorAll('.mp-brand img,.mp-footer-brand img').forEach(img=>{if(!img.hasAttribute('width'))img.setAttribute('width','36');if(!img.hasAttribute('height'))img.setAttribute('height','36')});
    const input=document.getElementById('commandInput');if(input&&!input.hasAttribute('aria-label'))input.setAttribute('aria-label','Search portfolio');
    const close=document.getElementById('mpMenuClose');if(close&&!close.hasAttribute('aria-label'))close.setAttribute('aria-label','Close menu');
    const theme=document.getElementById('mpMobileTheme');if(theme&&!theme.hasAttribute('aria-label'))theme.setAttribute('aria-label','Toggle theme');

    if(document.documentElement.lang==='ru'&&document.body.dataset.page==='home'){
      const h1=document.querySelector('[data-i18n="hero1"]');
      const h2=document.querySelector('[data-i18n="hero2"]');
      const lead=document.querySelector('[data-i18n="heroLead"]');
      if(h1)h1.textContent='Превращаю сложное';
      if(h2)h2.textContent='в понятные продукты и системы.';
      if(lead)lead.textContent='Объединяю операционное управление, продуктовую работу и практическую разработку — с фокусом на полезные системы, автоматизацию, приватность и доступность.';
    }
  }
  const style=document.createElement('style');style.textContent=`.mp-btn{color:var(--text)}.mp-footer-map a{display:flex;align-items:center;min-height:28px;padding:5px 0}.mp-footer-egg{min-height:28px;padding:5px 0}.mp-nav a{min-height:28px;display:flex;align-items:center}.mp-hero-links a{min-height:28px;display:flex;align-items:center}html[lang="ru"] .mp-hero h1{font-size:clamp(52px,6.15vw,88px);letter-spacing:-.058em;max-width:840px}@media (max-width:1080px){html[lang="ru"] .mp-hero h1{font-size:clamp(46px,7.2vw,72px)}}@media (pointer:coarse){.mp-lang button,.mp-icon,.mp-cmd,.mp-menu-btn{min-width:44px;min-height:44px}}`;document.head.appendChild(style);
  let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;patch()})};
  new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true,characterData:true});
  document.addEventListener('click',e=>{if(e.target.closest('[data-lang]'))setTimeout(patch,30)},true);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',patch):patch();
})();
