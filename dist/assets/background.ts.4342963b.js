chrome.runtime.onMessage.addListener(function(r,c,a){if(r.type==="login"){console.log("Login message received");const t=r.data.TOKEN;let e=!1;return fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${t}`}}).then(s=>s.json()).then(s=>{const i=s.login;chrome.storage.sync.set({USER:i,TOKEN:t},function(){if(chrome.runtime.lastError){e||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),e=!0);return}console.log("Saved user name"),e||(a({status:!0,data:{USER:i}}),e=!0)})}).catch(s=>{e||(a({status:!1,data:{errMessage:s.toString()}}),e=!0)}),!0}else if(r.type==="repo"){let t=!1;return chrome.storage.sync.get(["USER","TOKEN"],e=>{if(e.USER){const s=e.USER,i=e.TOKEN,n=r.data.REPO;fetch(`https://api.github.com/repos/${s}/${n}`).then(o=>o.json()).then(o=>{chrome.storage.sync.set({USER:s,TOKEN:i,REPO:n},function(){if(chrome.runtime.lastError){t||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),t=!0);return}t||(a({status:!0,data:{TOKEN:i,REPO:n}}),t=!0)})}).catch(o=>{t||(a({status:!1,data:{errMessage:o.toString()}}),t=!0)})}else t||(a({status:!1,data:{errMessage:e}}),t=!0)}),!0}else if(r.type==="auth"){let t=!1;return chrome.storage.sync.get(["USER","TOKEN","REPO"],e=>{e.USER&&e.TOKEN&&e.REPO?b(e.TOKEN,e.REPO).then(s=>{s?t||(a({status:!0,data:{USER:e.USER,REPO:e.REPO}}),t=!0):t||(a({status:!1,data:{errMessage:"Auth failed"}}),t=!0)}).catch(s=>{t||(a({status:!1,data:{errMessage:s.toString()}}),t=!0)}):t||(a({status:!1,data:{errMessage:e}}),t=!0)}),!0}else if(r.type==="github"){let t=!1;return chrome.storage.sync.get(["USER","TOKEN","REPO"],e=>{if(e.USER&&e.TOKEN&&e.REPO){const s=e.USER,i=e.TOKEN,n=e.REPO;k(s,i,n,r.data).then(o=>{switch(o.result){case!0:t||(a({status:!0,data:{message:o.message}}),t=!0);break;case!1:t||(a({status:!1,data:{errMessage:o.message}}),t=!0);break}}).catch(o=>{t||(a({status:!1,data:{errMessage:o.toString()}}),t=!0)})}else t||(a({status:!1,data:{errMessage:e}}),t=!0)}),!0}else if(r.type==="logout"){let t=!1;return chrome.storage.sync.set({USER:"",TOKEN:"",REPO:""},function(){if(chrome.runtime.lastError){t||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),t=!0);return}t||(a({status:!0}),t=!0)}),!0}});async function b(r,c){const a=await fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${r}`}});if(!a.ok)return!1;const e=(await a.json()).login;return!!(await fetch(`https://api.github.com/repos/${e}/${c}`)).ok}async function k(r,c,a,t){const e=t.title,s=t.content,i=t.codeTxt,n=t.codeExtension,o=t.codeSpeed,S=t.codeSpeedRanking,O=t.codeMemory,T=t.codeMemoryRanking;if(!await b(c,a))return{result:!1,message:"Auth failed"};const h={Authorization:`Bearer ${c}`,Accept:"application/vnd.github.v3+json"},u=await fetch(`https://api.github.com/repos/${r}/${a}/branches/main`,{headers:h});if(!u.ok)return{result:!1,message:u};const f=(await u.json()).commit.sha,m=await fetch(`https://api.github.com/repos/${r}/${a}/git/commits/${f}`,{headers:h}),g=await m.json();if(!m.ok)return{result:!1,message:g};const l=g.tree.sha,d=await fetch(`https://api.github.com/repos/${r}/${a}/git/trees`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({base_tree:l,tree:[{path:e+"/"+e+"."+n,mode:"100644",type:"blob",content:i},{path:e+"/"+e+".md",mode:"100644",type:"blob",content:s}]})}),$=await d.json();if(!d.ok)return{result:!1,message:l};const w=$.sha,p=await fetch(`https://api.github.com/repos/${r}/${a}/git/commits`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({message:`speed: ${o} [${S}] / memory: ${O} [${T}]`,tree:w,parents:[f]})}),E=await p.json();if(!p.ok)return{result:!1,message:E};const M=E.sha,y=await fetch(`https://api.github.com/repos/${r}/${a}/git/refs/heads/main`,{method:"PATCH",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({sha:M})}),N=await y.json();return y.ok?{result:!0,message:"Success"}:{result:!1,message:N}}
