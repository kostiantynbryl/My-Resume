(()=>{
  const MESSAGE='NORVEXA SYSTEM · whoami → Kostiantyn Bryl · status → Creating Tomorrow. · /system unlocked';
  const show=()=>{
    localStorage.setItem('norvexa-system-unlocked','1');
    window.dispatchEvent(new CustomEvent('norvexa:system-unlocked'));
    const toast=document.getElementById('mpToast');
    if(toast){toast.textContent=MESSAGE;toast.classList.add('show');clearTimeout(show.timer);show.timer=setTimeout(()=>toast.classList.remove('show'),3200)}
    const brand=document.getElementById('mpBrand');
    if(brand){brand.classList.remove('mp-brand-unlocked');void brand.offsetWidth;brand.classList.add('mp-brand-unlocked');setTimeout(()=>brand.classList.remove('mp-brand-unlocked'),1800)}
  };
  const bind=()=>{
    const brand=document.getElementById('mpBrand');if(!brand||brand.dataset.logoEggBound==='1')return;const logo=brand.querySelector('img');if(!logo)return;brand.dataset.logoEggBound='1';logo.title='NORVEXA';let clicks=0,resetTimer=0;
    logo.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();clicks+=1;clearTimeout(resetTimer);resetTimer=setTimeout(()=>{clicks=0},1300);if(clicks>=5){clicks=0;clearTimeout(resetTimer);show()}})
  };
  const style=document.createElement('style');style.textContent=`#mpBrand img{user-select:none}.mp-brand-unlocked img{animation:norvexaUnlock .9s ease 2}@keyframes norvexaUnlock{0%,100%{filter:none;transform:none}50%{filter:drop-shadow(0 0 14px var(--cyan));transform:scale(1.08)}}@media(prefers-reduced-motion:reduce){.mp-brand-unlocked img{animation:none;filter:drop-shadow(0 0 10px var(--cyan))}}`;document.head.appendChild(style);
  let scheduled=false;const schedule=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;bind()})};new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true});document.readyState==='loading'?document.addEventListener('DOMContentLoaded',bind):bind()
})();
