chrome.runtime.onMessage.addListener(function(t,o,s){if(t.type==="login"){console.log("Login message received");const n=t.data.TOKEN;return fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${n}`}}).then(e=>e.json()).then(e=>{const a=e.login;chrome.storage.sync.set({USER:a},function(){console.log("saved user name"),s({status:!0,data:{USER:a}})})}).catch(e=>{s({status:!1,data:{errMessage:e}})}),!0}});
