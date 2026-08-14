(()=>{
  const A=window.KB_APP,I=window.KB_I18N;if(!A||!I)return;
  function render(){
    const f=document.getElementById('mpFooter');if(!f)return;f.className='mp-footer';
    f.innerHTML=`<div class="shell mp-footer-grid">
      <div class="mp-footer-brand">
        <img src="${A.path('assets/kb.svg')}" alt="" width="34" height="34">
        <div><strong>KOSTIANTYN BRYL</strong><span>${I.t('brand')} · ${I.t('footer')}</span></div>
      </div>
      <div class="mp-footer-map">
        <div><b>${I.t('footerPortfolio')}</b><a href="${A.path('work/')}">${I.t('work')}</a><a href="${A.path('case-studies/')}">${I.t('cases')}</a><a href="${A.path('now/')}">${I.t('now')}</a><a href="${A.path('ecosystem/')}">${I.t('ecosystem')}</a></div>
        <div><b>${I.t('footerProfile')}</b><a href="${A.path('experience/')}">${I.t('experience')}</a><a href="${A.path('about/')}">${I.t('about')}</a><a href="${A.path('contact/')}">${I.t('contact')}</a></div>
        <div><b>${I.t('footerLinks')}</b><a href="https://github.com/kostiantynbryl" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/kostiantyn-bryl97/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://t.me/kostiantynbryl" target="_blank" rel="noreferrer">Telegram ↗</a><a href="mailto:kostiantynbryl@gmail.com">${I.t('email')} ↗</a></div>
      </div>
      <span class="kb-footer-copy">© 2026 KOSTIANTYN BRYL</span>
    </div>`;
  }
  window.KB_FOOTER={render};
})();
