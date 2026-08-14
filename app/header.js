(()=>{
  const A=window.KB_APP,I=window.KB_I18N;if(!A||!I)return;
  const nav=()=>[
    ['home','',I.t('home')],['work','work/',I.t('work')],['experience','experience/',I.t('experience')],['cases','case-studies/',I.t('cases')],['about','about/',I.t('about')],['now','now/',I.t('now')],['ecosystem','ecosystem/',I.t('ecosystem')],['contact','contact/',I.t('contact')]
  ];
  const active=id=>A.page===id||(A.page==='project'&&id==='work')||(A.page==='audience'&&id==='home');
  const langs=()=>I.supported.map(x=>`<button type="button" data-kb-lang="${x}" class="${x===I.lang?'active':''}" aria-pressed="${x===I.lang}">${I.labels[x]}</button>`).join('');
  function render(){
    const h=document.getElementById('mpHeader');if(!h)return;h.className='mp-header';
    h.innerHTML=`<div class="shell mp-header-row">
      <a class="mp-brand" id="mpBrand" href="${A.path('')}" aria-label="Kostiantyn Bryl — ${I.t('brand')}">
        <img src="${A.path('assets/kb.svg')}" alt="" width="38" height="38">
        <span><b>KOSTIANTYN BRYL</b><small>${I.t('brand')}</small></span>
      </a>
      <nav class="mp-nav" aria-label="Primary navigation">${nav().map(([id,p,label])=>`<a href="${A.path(p)}" class="${active(id)?'active':''}">${label}</a>`).join('')}</nav>
      <div class="mp-actions">
        <button class="mp-cmd" id="mpCmd" type="button" aria-label="${I.t('command')}">⌘K</button>
        <div class="mp-lang" aria-label="Language">${langs()}</div>
        <button class="mp-icon" id="mpTheme" type="button" aria-label="${I.t('theme')}">◐</button>
        <button class="mp-menu-btn" id="mpMenuBtn" type="button" aria-label="${I.t('menu')}" aria-expanded="false">☰</button>
      </div>
    </div>
    <div class="mp-mobile-menu" id="mpMobileMenu" hidden>
      <div class="mp-mobile-top"><strong>KOSTIANTYN BRYL</strong><button id="mpMenuClose" type="button" aria-label="${I.t('close')}">×</button></div>
      <nav aria-label="Mobile navigation">${nav().map(([id,p,label])=>`<a href="${A.path(p)}" class="${active(id)?'active':''}">${label}<span>↗</span></a>`).join('')}</nav>
      <div class="kb-mobile-langs">${langs()}</div>
      <div class="mp-mobile-meta"><a href="https://github.com/kostiantynbryl" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/kostiantyn-bryl97/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://t.me/kostiantynbryl" target="_blank" rel="noreferrer">Telegram ↗</a></div>
    </div>`;
    h.querySelectorAll('[data-kb-lang]').forEach(b=>b.onclick=()=>I.set(b.dataset.kbLang));
    const menu=h.querySelector('#mpMobileMenu'),open=h.querySelector('#mpMenuBtn'),close=h.querySelector('#mpMenuClose');
    if(open&&menu)open.onclick=()=>{menu.hidden=false;open.setAttribute('aria-expanded','true');document.body.classList.add('menu-open')};
    if(close&&menu)close.onclick=()=>{menu.hidden=true;open?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')};
    window.dispatchEvent(new CustomEvent('kb:headerrendered'));
  }
  window.KB_HEADER={render};
})();
