const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/js/HomePage-C4GH6JZd.js","static/js/_plugin-vue_export-helper-DlAUqK2U.js","static/css/HomePage-CMVglDlu.css","static/js/Login-CQ_wxQTb.js","static/js/pinia-De32WpSU.js","static/js/@vue-D5C02RJA.js","static/css/Login-BoPr8smG.css","static/js/Datail-CDjEIw_B.js","static/css/Datail-BvTVh8U7.css","static/js/Dashboard-3kEHNh6s.js","static/css/Dashboard-BnPT12Ni.css","static/js/Article-C0F-y9cB.js","static/js/@wangeditor-Df5DrFoU.js","static/css/@wangeditor-ClYh1QsV.css"])))=>i.map(i=>d[i]);
import{d as h,c as v}from"./pinia-De32WpSU.js";import"./@vue-D5C02RJA.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function d(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}})();const E={__name:"App",setup(r){return(a,c)=>(Vue.openBlock(),Vue.createBlock(Vue.unref(naive.NMessageProvider),null,{default:Vue.withCtx(()=>[Vue.createVNode(Vue.unref(VueRouter.RouterView))]),_:1}))}},y="modulepreload",g=function(r){return"/"+r},p={},u=function(a,c,d){let t=Promise.resolve();if(c&&c.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),o=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));t=Promise.all(c.map(n=>{if(n=g(n),n in p)return;p[n]=!0;const l=n.endsWith(".css"),m=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${m}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":y,l||(i.as="script"),i.crossOrigin="",i.href=n,o&&i.setAttribute("nonce",o),document.head.appendChild(i),l)return new Promise((f,_)=>{i.addEventListener("load",f),i.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${n}`)))})}))}return t.then(()=>a()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})};let V=[{path:"/",component:()=>u(()=>import("./HomePage-C4GH6JZd.js"),__vite__mapDeps([0,1,2]))},{path:"/login",component:()=>u(()=>import("./Login-CQ_wxQTb.js"),__vite__mapDeps([3,1,4,5,6]))},{path:"/datail",component:()=>u(()=>import("./Datail-CDjEIw_B.js"),__vite__mapDeps([7,1,8]))},{path:"/dashboard",component:()=>u(()=>import("./Dashboard-3kEHNh6s.js"),__vite__mapDeps([9,1,10])),children:[{path:"/dashboard/category",component:()=>u(()=>import("./Category-ABYkFsg0.js"),[])},{path:"/dashboard/article",component:()=>u(()=>import("./Article-C0F-y9cB.js"),__vite__mapDeps([11,12,13]))}]}];const P=VueRouter.createRouter({history:VueRouter.createWebHashHistory(),routes:V}),L=h("admin",{state:()=>({token:"",id:"",account:"",rember:""}),getters:{},actions:{}}),{message:R,notification:b,dialog:A}=naive.createDiscreteApi(["message","dialog","notification"]),s=Vue.createApp(E);axios.defaults.baseURL="/api/";s.provide("axios",axios);s.provide("message",R);s.provide("notification",b);s.provide("dialog",A);s.provide("server_url",axios.defaults.baseURL);const O=v();s.use(O);s.use(P);s.mount("#app");const w=L();axios.interceptors.request.use(r=>(r.url.startsWith("/")&&(r.url=r.url.slice(1)),console.log("请求路径:",r.url),r.headers.token=w.token,r));export{L as A};
