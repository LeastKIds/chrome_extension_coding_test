alert("start!!");function o(t){return document.evaluate(t,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}const c=function(t,e){const d=o("/html/body/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[3]/div/button");d&&(d.addEventListener("click",()=>{console.log("\uD2B9\uC815 \uBC84\uD2BC\uC774 \uD074\uB9AD\uB418\uC5C8\uC2B5\uB2C8\uB2E4."),s()}),e.disconnect())},v=new MutationObserver(c);v.observe(document.body,{childList:!0,subtree:!0});function s(){const t=function(i,d){const n=o("/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[7]/div[2]/div/div/div[2]/div/div[1]/div[1]/div[1]/span");n&&(n.textContent==="Accepted"&&(console.log("\uC131\uACF5\uC801\uC73C\uB85C \uCC98\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4."),a()),d.disconnect())};new MutationObserver(t).observe(document.body,{childList:!0,subtree:!0})}function l(t){return document.evaluate(t,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}function r(t){const e=l(t);let i=[];return e&&(i=Array.from(e.children)),i}function a(){const e=r("/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[8]/div/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div[5]");let i="";e.forEach(d=>{const u=d.firstElementChild;if(u)for(const n of Array.from(u.children))i+=n.textContent}),console.log(i)}
