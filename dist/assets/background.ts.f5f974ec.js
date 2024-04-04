chrome.runtime.onMessage.addListener(function(s,n,a){if(s.type==="login"){console.log("Login message received");const e=s.data.TOKEN;let t=!1;return fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${e}`}}).then(r=>r.json()).then(r=>{const o=r.login;chrome.storage.sync.set({USER:o,TOKEN:e},function(){if(chrome.runtime.lastError){t||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),t=!0);return}console.log("Saved user name"),t||(a({status:!0,data:{USER:o}}),t=!0)})}).catch(r=>{t||(a({status:!1,data:{errMessage:r.toString()}}),t=!0)}),!0}else if(s.type==="repo"){let e=!1;return chrome.storage.sync.get(["USER","TOKEN"],t=>{if(t.USER){const r=t.USER,o=t.TOKEN,c=s.data.REPO;fetch(`https://api.github.com/repos/${r}/${c}`).then(i=>i.json()).then(i=>{chrome.storage.sync.set({USER:r,TOKEN:o,REPO:c},function(){if(chrome.runtime.lastError){e||(a({status:!1,data:{errMessage:chrome.runtime.lastError.message}}),e=!0);return}console.log("Saved repo"),e||(a({status:!0,data:{REPO:c}}),e=!0)})}).catch(i=>{e||(a({status:!1,data:{errMessage:i.toString()}}),e=!0)})}else e||(a({status:!1,data:{errMessage:t}}),e=!0)}),!0}else if(s.type==="auth"){let e=!1;return chrome.storage.sync.get(["USER","TOKEN","REPO"],t=>{t.USER&&t.TOKEN&&t.REPO?u(t.TOKEN,t.REPO).then(r=>{r?e||(a({status:!0,data:{USER:t.USER,REPO:t.REPO}}),e=!0):e||(a({status:!1,data:{errMessage:"Auth failed"}}),e=!0)}).catch(r=>{e||(a({status:!1,data:{errMessage:r.toString()}}),e=!0)}):e||(a({status:!1,data:{errMessage:t}}),e=!0)}),!0}});async function u(s,n){const a=await fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${s}`}});if(!a.ok)return!1;const t=(await a.json()).login;return!!(await fetch(`https://api.github.com/repos/${t}/${n}`)).ok}
