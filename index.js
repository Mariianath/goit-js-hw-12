import{a as y,i as u}from"./assets/vendor-Cbhu4xvy.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function m(r){const o=r.map(({webformatURL:s,largeImageURL:e,tags:t})=>`<a class="gallery__item" href="${e}">
          <img class="gallery__image" src="${s}" alt="${t}" />
        </a>`).join(""),n=document.querySelector(".gallery");n&&n.insertAdjacentHTML("beforeend",o)}const p="47523471-f6b5bf2e20bc9d436dc6d8dc4",h="https://pixabay.com/api/";async function w(r,o=1,n=15){if(!r||r.trim()==="")throw new Error("Query cannot be empty. Please provide a search term.");const s={key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:n};try{return(await y.get(h,{params:s})).data}catch(e){throw console.error("Error fetching images:",e.message),new Error("Failed to fetch images. Please try again later.")}}const c=document.querySelector(".search-form"),l=document.querySelector('input[name="searchQuery"]'),b=document.querySelector(".gallery"),S=document.querySelector(".loader");let i=1,f="";c==null||c.addEventListener("submit",L);async function L(r){r.preventDefault();const o=l==null?void 0:l.value.trim();if(!o){g("Please enter a search query.");return}o!==f&&(P(),i=1),f=o;try{d(!0);const{hits:n,totalHits:s}=await w(o,i);if(n.length===0){g("No images found for your query. Try again!");return}i===1&&E(`Found ${s} images!`),m(n),i+=1}catch(n){q(n.message||"Something went wrong. Please try again later.")}finally{d(!1)}}function P(){b.innerHTML=""}function d(r){S.style.display=r?"block":"none"}function g(r){u.warning({title:"Warning",message:r,position:"topRight"})}function E(r){u.success({title:"Success",message:r,position:"topRight"})}function q(r){u.error({title:"Error",message:r,position:"topRight"})}
//# sourceMappingURL=index.js.map