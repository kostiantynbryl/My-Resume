(()=>{
  const A=window.KB_APP;
  if(!A)return;

  let observer=null;
  let fallback=null;

  const setVisible=(dock,visible)=>{
    dock.classList.toggle('is-visible',visible);
    dock.setAttribute('aria-hidden',visible?'false':'true');
  };

  function cleanup(){
    observer?.disconnect();
    observer=null;
    if(fallback){window.removeEventListener('scroll',fallback);fallback=null}
  }

  function init(){
    document.getElementById('v12Dock')?.remove();
    const dock=document.getElementById('kbContactDock');
    if(!dock)return;
    cleanup();
    dock.classList.add('kb-action-dock');
    dock.setAttribute('aria-label','Portfolio actions');

    if(A.page!=='home'){
      setVisible(dock,true);
      return;
    }

    const card=document.querySelector('.kb-profile-card');
    if(!card){
      setVisible(dock,window.scrollY>180);
      return;
    }

    setVisible(dock,false);
    const update=visible=>setVisible(dock,visible);

    if('IntersectionObserver' in window){
      observer=new IntersectionObserver(entries=>{
        const entry=entries[0];
        update(!entry.isIntersecting&&window.scrollY>120);
      },{threshold:.06,rootMargin:'-76px 0px 0px 0px'});
      observer.observe(card);
    }else{
      fallback=()=>{
        const r=card.getBoundingClientRect();
        update(r.bottom<76&&window.scrollY>120);
      };
      window.addEventListener('scroll',fallback,{passive:true});
      fallback();
    }
  }

  window.addEventListener('kb:ready',()=>requestAnimationFrame(init),{once:true});
  window.addEventListener('pageshow',()=>{if(document.body.classList.contains('kb-ready'))requestAnimationFrame(init)});
})();
