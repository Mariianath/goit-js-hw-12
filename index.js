import{a as d,i as c}from"./assets/vendor-Cbhu4xvy.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();function p(t){return t.map(({webformatURL:r,largeImageURL:n,tags:i})=>`<a class="gallery__item" href="${n}">
             <img class="gallery__image" src="${r}" alt="${i}" />
           </a>`).join("")}const y="47523471-f6b5bf2e20bc9d436dc6d8dc4",g="https://pixabay.com/api/";async function m(t,r=1,n=15){const i={key:y,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:n};return(await d.get(g,{params:i})).data}const h=document.querySelector("#search-form"),S=document.querySelector('input[name="searchQuery"]'),b=document.querySelector(".gallery"),q=document.querySelector(".loader");let s=1,l="";h.addEventListener("submit",w);async function w(t){t.preventDefault();const r=S.value.trim();if(!r){f("Please enter a search query.");return}r!==l&&(L(),s=1),l=r;try{u(!0);const{hits:n,totalHits:i}=await m(r,s);if(n.length===0){f("No images found for your query. Try again!");return}s===1&&P(`Found ${i} images!`),p(n),s+=1}catch(n){_(n.message||"Something went wrong. Please try again later.")}finally{u(!1)}}function L(){b.innerHTML=""}function u(t){q.style.display=t?"block":"none"}function f(t){c.warning({title:"Warning",message:t,position:"topRight"})}function P(t){c.success({title:"Success",message:t,position:"topRight"})}function _(t){c.error({title:"Error",message:t,position:"topRight"})}
//# sourceMappingURL=index.js.map