(()=>{
const cfg=window.NORVEXA_V12?.analytics;if(!cfg?.endpoint)return;
if(navigator.globalPrivacyControl===true||navigator.doNotTrack==='1'||window.doNotTrack==='1')return;
const endpoint=String(cfg.endpoint||'').trim();if(!/^https:\/\//.test(endpoint))return;
const send=(event,data={})=>{const payload=JSON.stringify({site:cfg.site||'portfolio',event,path:location.pathname,referrer:document.referrer?new URL(document.referrer,location.href).hostname:'',ts:new Date().toISOString(),...data});try{navigator.sendBeacon(endpoint,new Blob([payload],{type:'application/json'}))}catch{fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:payload,keepalive:true,credentials:'omit'}).catch(()=>{})}};
send('pageview');document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;try{const u=new URL(a.href,location.href);if(u.origin!==location.origin)send('outbound',{host:u.hostname})}catch{}},{passive:true});
})();
