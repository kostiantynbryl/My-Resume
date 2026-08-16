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

  function render(){
    if(A.page!=='home')return;
    const card=document.querySelector('.kb-profile-card');
    if(!card)return;
    const t=copy[I.lang]||copy.en;
    const projects=Array.isArray(D?.projects)?D.projects.length:9;
    const values=['10+','20','5',String(projects||9)];

    const summary=card.querySelector('.kb-profile-summary');
    if(summary&&summary.textContent!==t.summary)summary.textContent=t.summary;

    const metricItems=[...card.querySelectorAll('.kb-profile-metrics>div')];
    metricItems.forEach((item,i)=>{
      const b=item.querySelector('b'),span=item.querySelector('span');
      if(b&&b.textContent!==values[i])b.textContent=values[i];
      if(span&&span.textContent!==t.metrics[i])span.textContent=t.metrics[i];
    });

    const tagItems=[...card.querySelectorAll('.kb-profile-tags span')];
    tagItems.forEach((tag,i)=>{if(t.tags[i]&&tag.textContent!==t.tags[i])tag.textContent=t.tags[i]});

    const cv=card.querySelector('[data-kb-profile-cv]');
    const email=card.querySelector('.kb-profile-actions a[href^="mailto:"]');
    if(cv&&cv.textContent!==t.cv)cv.textContent=t.cv;
    if(email&&email.textContent!==t.email)email.textContent=t.email;
    if(cv&&!cv.dataset.bound){cv.dataset.bound='1';cv.addEventListener('click',()=>document.getElementById('homeCv')?.click())}
  }

  window.KB_PROFILE={render};
})();
