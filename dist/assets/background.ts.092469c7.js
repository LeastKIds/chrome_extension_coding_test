chrome.runtime.onMessage.addListener(function(e,n,s){e.type==="login"&&(console.log("Login message received"),s({status:"Received the login message",data:{response:"success"}}))});
