(()=>{
  const A=window.KB_APP,I=window.KB_I18N,H=window.KB_HEADER,M=window.KB_MAIN,F=window.KB_FOOTER,P=window.KB_PROFILE,U=window.KB_UTILS;if(!A||!I||!H||!M||!F)return;
  function title(){const suffix='Kostiantyn Bryl',map={home:suffix+' — '+I.t('brand'),work:I.t('work')+' — '+suffix,experience:I.t('experience')+' — '+suffix,cases:I.t('cases')+' — '+suffix,about:I.t('about')+' — '+suffix,now:I.t('now')+' — '+suffix,ecosystem:I.t('ecosystem')+' — '+suffix,contact:I.t('contact')+' — '+suffix,audience:I.t('audience')+' — '+suffix,system:'System — '+suffix};if(A.page==='project'){const p=window.PORTFOLIO_DATA?.projects?.find(x=>x.id===A.project);document.title=(p?.name||'Project')+' — '+suffix}else document.title=map[A.page]||suffix}
  function render(){H.render();M.render();F.render();P?.render();U?.render();title();document.body.classList.add('kb-ready')}
  render();
  window.addEventListener('kb:languagechange',render);
  window.dispatchEvent(new CustomEvent('kb:ready',{detail:{version:A.version}}));
})();
