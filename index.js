import{a as y,S as g}from"./assets/vendor-DBMDmZZa.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const p=void 0,L="https://pixabay.com/api/";async function f(e,r=1,s=15){const n={key:p,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:s};return(await y.get(L,{params:n})).data}function h(e){return e.map(({webformatURL:r,largeImageURL:s,tags:n})=>`<a class="gallery__item" href="${s}">
             <img class="gallery__image" src="${r}" alt="${n}" />
           </a>`).join("")}function b(e){e.innerHTML=""}const v=document.querySelector(".search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".load-more");let a="",i=1,d=15,m;v.addEventListener("submit",P);l.addEventListener("click",S);async function P(e){if(e.preventDefault(),a=e.currentTarget.elements.searchQuery.value.trim(),!!a){i=1,b(c),l.classList.add("is-hidden");try{const r=await f(a,i,d);if(!r.hits.length){alert("No images found. Please try again.");return}c.innerHTML=h(r.hits),m=new g(".gallery a").refresh(),r.totalHits>d&&l.classList.remove("is-hidden")}catch(r){console.error(r)}}}async function S(){i+=1;try{const e=await f(a,i,d);c.insertAdjacentHTML("beforeend",h(e.hits)),m.refresh(),i*d>=e.totalHits&&(l.classList.add("is-hidden"),alert("We're sorry, but you've reached the end of search results.")),_()}catch(e){console.error(e)}}function _(){const{height:e}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
