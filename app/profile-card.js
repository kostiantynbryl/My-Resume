(()=>{
  const A=window.KB_APP,I=window.KB_I18N,D=window.PORTFOLIO_DATA;
  if(!A||!I)return;

  const copy={
    en:{summary:'I build practical digital products, improve operations and turn complex work into clear, working systems.',metrics:['Years','Team','Languages','Projects'],tags:['Product','Operations','Automation','Software','AI','Accessibility'],cv:'Download CV',email:'Email'},
    pl:{summary:'Tworzę praktyczne produkty cyfrowe, usprawniam operacje i zamieniam złożoną pracę w jasne, działające systemy.',metrics:['Lat','Zespół','Języków','Projektów'],tags:['Produkt','Operacje','Automatyzacja','Software','AI','Dostępność'],cv:'Pobierz CV',email:'E-mail'},
    ru:{summary:'Создаю практичные цифровые продукты, улучшаю операции и превращаю сложную работу в понятные рабочие системы.',metrics:['Лет','Команда','Языков','Проектов'],tags:['Продукт','Операции','Автоматизация','Разработка','AI','Доступность'],cv:'Скачать CV',email:'Почта'},
    uk:{summary:'Створюю практичні цифрові продукти, покращую операції та перетворюю складну роботу на зрозумілі робочі системи.',metrics:['Років','Команда','Мов','Проєктів'],tags:['Продукт','Операції','Автоматизація','Розробка','AI','Доступність'],cv:'Завантажити CV',email:'Пошта'},
    zh:{summary:'我构建实用的数字产品、优化运营，并把复杂工作转化为清晰可用的系统。',metrics:['年经验','团队规模','语言','项目'],tags:['产品','运营','自动化','软件','AI','可访问性'],cv:'下载简历',email:'邮件'}
  };

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function render(){
    if(A.page!=='home')return;
    const card=document.querySelector('.mp-identity');
    if(!card)return;
    const lang=I.lang, t=copy[lang]||copy.en;
    const projects=Array.isArray(D?.projects)?D.projects.length:0;
    const metricValues=['10+','20','5',String(projects||'9')];
    card.classList.add('kb-profile-card');
    card.innerHTML=`
      <div class="kb-profile-photo">
        <img src="${A.path('assets/profile.webp')}" alt="Kostiantyn Bryl" width="520" height="360" fetchpriority="high" decoding="async">
        <div class="kb-profile-top"><span>KB / 2026</span><b>${esc(I.t('available'))}</b></div>
      </div>
      <div class="kb-profile-body">
        <div class="kb-profile-title"><h2>Kostiantyn Bryl</h2><p>${esc(I.t('profile'))}</p></div>
        <p class="kb-profile-summary">${esc(t.summary)}</p>
        <div class="kb-profile-metrics">${metricValues.map((v,i)=>`<div><b>${esc(v)}</b><span>${esc(t.metrics[i])}</span></div>`).join('')}</div>
        <div class="kb-profile-tags" aria-label="Capabilities">${t.tags.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
        <div class="kb-profile-actions">
          <button type="button" data-kb-profile-cv>${esc(t.cv)}</button>
          <a href="https://t.me/kostiantynbryl" target="_blank" rel="noreferrer">Telegram</a>
          <a href="mailto:kostiantynbryl@gmail.com">${esc(t.email)}</a>
        </div>
      </div>`;
    card.querySelector('[data-kb-profile-cv]')?.addEventListener('click',()=>document.getElementById('homeCv')?.click());
  }

  window.KB_PROFILE={render};
})();
