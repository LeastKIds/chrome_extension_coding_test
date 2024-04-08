chrome.runtime.onMessage.addListener(function(o,c,a){if(o.type==="login"){console.log("Login message received");const t=o.data.TOKEN;let e=!1;return fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${t}`}}).then(s=>s.json()).then(s=>{const i=s.login;chrome.storage.sync.set({USER:i,TOKEN:t},function(){if(chrome.runtime.lastError){e||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),e=!0);return}console.log("Saved user name"),e||(a({status:!0,data:{USER:i}}),e=!0)})}).catch(s=>{e||(a({status:!1,data:{errMessage:s.toString()}}),e=!0)}),!0}else if(o.type==="repo"){let t=!1;return chrome.storage.sync.get(["USER","TOKEN"],e=>{if(e.USER){const s=e.USER,i=e.TOKEN,n=o.data.REPO;fetch(`https://api.github.com/repos/${s}/${n}`).then(r=>r.json()).then(r=>{chrome.storage.sync.set({USER:s,TOKEN:i,REPO:n},function(){if(chrome.runtime.lastError){t||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),t=!0);return}console.log("Saved repo"),t||(a({status:!0,data:{REPO:n}}),t=!0)})}).catch(r=>{t||(a({status:!1,data:{errMessage:r.toString()}}),t=!0)})}else t||(a({status:!1,data:{errMessage:e}}),t=!0)}),!0}else if(o.type==="auth"){let t=!1;return chrome.storage.sync.get(["USER","TOKEN","REPO"],e=>{e.USER&&e.TOKEN&&e.REPO?p(e.TOKEN,e.REPO).then(s=>{s?t||(a({status:!0,data:{USER:e.USER,REPO:e.REPO}}),t=!0):t||(a({status:!1,data:{errMessage:"Auth failed"}}),t=!0)}).catch(s=>{t||(a({status:!1,data:{errMessage:s.toString()}}),t=!0)}):t||(a({status:!1,data:{errMessage:e}}),t=!0)}),!0}else if(o.type==="github"){let t=!1;return chrome.storage.sync.get(["USER","TOKEN","REPO"],e=>{if(e.USER&&e.TOKEN&&e.REPO){const s=e.USER,i=e.TOKEN,n=e.REPO;w(s,i,n,o.data).then(r=>{switch(r.result){case!0:t||(a({status:!0,data:{message:r.message}}),t=!0);break;case!1:t||(a({status:!1,data:{errMessage:r.message}}),t=!0);break}}).catch(r=>{t||(a({status:!1,data:{errMessage:r.toString()}}),t=!0)})}else t||(a({status:!1,data:{errMessage:e}}),t=!0)}),!0}});async function p(o,c){const a=await fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${o}`}});if(!a.ok)return!1;const e=(await a.json()).login;return!!(await fetch(`https://api.github.com/repos/${e}/${c}`)).ok}async function w(o,c,a,t){const e=t.title,s=t.markdown,i=t.codeTxt,n=t.codeExtension,r=t.codeSpeed,E=t.codeSpeedRanking,b=t.codeMemory,y=t.codeMemoryRanking;if(!await p(c,a))return{result:!1,message:"Auth failed"};const h={Authorization:`Bearer ${c}`,Accept:"application/vnd.github.v3+json"},f=await fetch(`https://api.github.com/repos/${o}/${a}/branches/main`,{headers:h});if(!f.ok)return{result:!1,message:f};const d=(await f.json()).commit.sha,m=await fetch(`https://api.github.com/repos/${o}/${a}/git/commits/${d}`,{headers:h});if(!m.ok)return{result:!1,message:m};const S=(await m.json()).tree.sha,u=await fetch(`https://api.github.com/repos/${o}/${a}/git/trees`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({base_tree:S,tree:[{path:e+"/"+e+"."+n,mode:"100644",type:"blob",content:i},{path:e+"/"+e+".md",mode:"100644",type:"blob",content:s}]})});if(!u.ok)return{result:!1,message:u};const O=(await u.json()).sha,g=await fetch(`https://api.github.com/repos/${o}/${a}/git/commits`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({message:r+" "+E+" "+b+" "+y,tree:O,parents:[d]})});if(!g.ok)return{result:!1,message:g};const T=(await g.json()).sha,l=await fetch(`https://api.github.com/repos/${o}/${a}/git/refs/heads/main`,{method:"PATCH",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({sha:T})});return l.ok?{result:!0,message:"Success"}:{result:!1,message:l}}
