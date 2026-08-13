/* NORVEXA final portfolio layer — Creating Tomorrow. */
const manifest=document.createElement('link');manifest.rel='manifest';manifest.href='manifest.webmanifest';document.head.appendChild(manifest);
const v3css=document.createElement('link');v3css.rel='stylesheet';v3css.href='v3/layout.css';document.head.appendChild(v3css);
['v3/data.js','v3/render.js','v3/interactions.js'].forEach(src=>{const s=document.createElement('script');s.src=src;s.async=false;document.head.appendChild(s)});
