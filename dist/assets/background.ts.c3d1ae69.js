chrome.runtime.onMessage.addListener(async(r,n,t)=>{if(r.type==="login"){const e=r.data.TOKEN;try{const a=await fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${e}`}});if(!a.ok){t({status:"false",data:{errorCode:"loginError"}});return}const o=(await a.json()).login;t({status:"true",data:{login:o}});return}catch{t({status:"false",data:{errorCode:"networkError"}});return}}return!0});