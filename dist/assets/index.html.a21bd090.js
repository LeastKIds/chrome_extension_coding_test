const c=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};c();const s=document.querySelector('button[type="submit"]');s==null||s.addEventListener("click",l=>{l.preventDefault();const o=document.getElementById("token").value;chrome.runtime.sendMessage({type:"login",data:{TOKEN:o}},function(n){if(console.log("Response from background:",n),n.status){alert("Login Success");const r=document.getElementById("github_token");r&&(r.style.display="none");const e=document.getElementById("github_repo");e&&(e.style.display="block")}else alert(n.data.errMessage)})});