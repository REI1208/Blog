/**
* @vue/shared v3.5.4
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function ue(t){const e=Object.create(null);for(const s of t.split(","))e[s]=1;return s=>s in e}const mt={},ot=()=>{},he=Object.assign,pe=(t,e)=>{const s=t.indexOf(e);s>-1&&t.splice(s,1)},de=Object.prototype.hasOwnProperty,ct=(t,e)=>de.call(t,e),S=Array.isArray,B=t=>ht(t)==="[object Map]",_e=t=>ht(t)==="[object Set]",M=t=>typeof t=="function",ge=t=>typeof t=="string",X=t=>typeof t=="symbol",z=t=>t!==null&&typeof t=="object",ve=t=>(z(t)||M(t))&&M(t.then)&&M(t.catch),be=Object.prototype.toString,ht=t=>be.call(t),we=t=>ht(t).slice(8,-1),Se=t=>ht(t)==="[object Object]",xt=t=>ge(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,j=(t,e)=>!Object.is(t,e),ye=(t,e,s,n=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:n,value:s})};let Lt;const me=()=>Lt||(Lt=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});/**
* @vue/reactivity v3.5.4
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let g;class xe{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=g,!e&&g&&(this.index=(g.scopes||(g.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,s;if(this.scopes)for(e=0,s=this.scopes.length;e<s;e++)this.scopes[e].pause();for(e=0,s=this.effects.length;e<s;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,s;if(this.scopes)for(e=0,s=this.scopes.length;e<s;e++)this.scopes[e].resume();for(e=0,s=this.effects.length;e<s;e++)this.effects[e].resume()}}run(e){if(this._active){const s=g;try{return g=this,e()}finally{g=s}}}on(){g=this}off(){g=this.parent}stop(e){if(this._active){let s,n;for(s=0,n=this.effects.length;s<n;s++)this.effects[s].stop();for(s=0,n=this.cleanups.length;s<n;s++)this.cleanups[s]();if(this.scopes)for(s=0,n=this.scopes.length;s<n;s++)this.scopes[s].stop(!0);if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this._active=!1}}}function ps(t){return new xe(t)}function Re(){return g}function ds(t,e=!1){g&&g.cleanups.push(t)}let d;const gt=new WeakSet;class Ie{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.nextEffect=void 0,this.cleanup=void 0,this.scheduler=void 0,g&&g.active&&g.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,gt.has(this)&&(gt.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||(this.flags|=8,this.nextEffect=G,G=this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ht(this),Yt(this);const e=d,s=y;d=this,y=!0;try{return this.fn()}finally{Bt(this),d=e,y=s,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Et(e);this.deps=this.depsTail=void 0,Ht(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?gt.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){wt(this)&&this.run()}get dirty(){return wt(this)}}let qt=0,G;function Rt(){qt++}function It(){if(--qt>0)return;let t;for(;G;){let e=G;for(G=void 0;e;){const s=e.nextEffect;if(e.nextEffect=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(n){t||(t=n)}e=s}}if(t)throw t}function Yt(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Bt(t){let e,s=t.depsTail;for(let n=s;n;n=n.prevDep)n.version===-1?(n===s&&(s=n.prevDep),Et(n),Ee(n)):e=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0;t.deps=e,t.depsTail=s}function wt(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&Gt(e.dep.computed)||e.dep.version!==e.version)return!0;return!!t._dirty}function Gt(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===U))return;t.globalVersion=U;const e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&!wt(t)){t.flags&=-3;return}const s=d,n=y;d=t,y=!0;try{Yt(t);const i=t.fn(t._value);(e.version===0||j(i,t._value))&&(t._value=i,e.version++)}catch(i){throw e.version++,i}finally{d=s,y=n,Bt(t),t.flags&=-3}}function Et(t){const{dep:e,prevSub:s,nextSub:n}=t;if(s&&(s.nextSub=n,t.prevSub=void 0),n&&(n.prevSub=s,t.nextSub=void 0),e.subs===t&&(e.subs=s),!e.subs&&e.computed){e.computed.flags&=-5;for(let i=e.computed.deps;i;i=i.nextDep)Et(i)}}function Ee(t){const{prevDep:e,nextDep:s}=t;e&&(e.nextDep=s,t.prevDep=void 0),s&&(s.prevDep=e,t.nextDep=void 0)}let y=!0;const Ut=[];function Tt(){Ut.push(y),y=!1}function Pt(){const t=Ut.pop();y=t===void 0?!0:t}function Ht(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const s=d;d=void 0;try{e()}finally{d=s}}}let U=0;class Dt{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0}track(e){if(!d||!y||d===this.computed)return;let s=this.activeLink;if(s===void 0||s.sub!==d)s=this.activeLink={dep:this,sub:d,version:this.version,nextDep:void 0,prevDep:void 0,nextSub:void 0,prevSub:void 0,prevActiveLink:void 0},d.deps?(s.prevDep=d.depsTail,d.depsTail.nextDep=s,d.depsTail=s):d.deps=d.depsTail=s,d.flags&4&&$t(s);else if(s.version===-1&&(s.version=this.version,s.nextDep)){const n=s.nextDep;n.prevDep=s.prevDep,s.prevDep&&(s.prevDep.nextDep=n),s.prevDep=d.depsTail,s.nextDep=void 0,d.depsTail.nextDep=s,d.depsTail=s,d.deps===s&&(d.deps=n)}return s}trigger(e){this.version++,U++,this.notify(e)}notify(e){Rt();try{for(let s=this.subs;s;s=s.prevSub)s.sub.notify()}finally{It()}}}function $t(t){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let n=e.deps;n;n=n.nextDep)$t(n)}const s=t.dep.subs;s!==t&&(t.prevSub=s,s&&(s.nextSub=t)),t.dep.subs=t}const ft=new WeakMap,L=Symbol(""),St=Symbol(""),$=Symbol("");function b(t,e,s){if(y&&d){let n=ft.get(t);n||ft.set(t,n=new Map);let i=n.get(s);i||n.set(s,i=new Dt),i.track()}}function A(t,e,s,n,i,r){const l=ft.get(t);if(!l){U++;return}const o=c=>{c&&c.trigger()};if(Rt(),e==="clear")l.forEach(o);else{const c=S(t),_=c&&xt(s);if(c&&s==="length"){const f=Number(n);l.forEach((u,a)=>{(a==="length"||a===$||!X(a)&&a>=f)&&o(u)})}else switch(s!==void 0&&o(l.get(s)),_&&o(l.get($)),e){case"add":c?_&&o(l.get("length")):(o(l.get(L)),B(t)&&o(l.get(St)));break;case"delete":c||(o(l.get(L)),B(t)&&o(l.get(St)));break;case"set":B(t)&&o(l.get(L));break}}It()}function Te(t,e){var s;return(s=ft.get(t))==null?void 0:s.get(e)}function N(t){const e=p(t);return e===t?e:(b(e,"iterate",$),m(t)?e:e.map(v))}function Ot(t){return b(t=p(t),"iterate",$),t}const Pe={__proto__:null,[Symbol.iterator](){return vt(this,Symbol.iterator,v)},concat(...t){return N(this).concat(...t.map(e=>S(e)?N(e):e))},entries(){return vt(this,"entries",t=>(t[1]=v(t[1]),t))},every(t,e){return I(this,"every",t,e,void 0,arguments)},filter(t,e){return I(this,"filter",t,e,s=>s.map(v),arguments)},find(t,e){return I(this,"find",t,e,v,arguments)},findIndex(t,e){return I(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return I(this,"findLast",t,e,v,arguments)},findLastIndex(t,e){return I(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return I(this,"forEach",t,e,void 0,arguments)},includes(...t){return bt(this,"includes",t)},indexOf(...t){return bt(this,"indexOf",t)},join(t){return N(this).join(t)},lastIndexOf(...t){return bt(this,"lastIndexOf",t)},map(t,e){return I(this,"map",t,e,void 0,arguments)},pop(){return Y(this,"pop")},push(...t){return Y(this,"push",t)},reduce(t,...e){return Ft(this,"reduce",t,e)},reduceRight(t,...e){return Ft(this,"reduceRight",t,e)},shift(){return Y(this,"shift")},some(t,e){return I(this,"some",t,e,void 0,arguments)},splice(...t){return Y(this,"splice",t)},toReversed(){return N(this).toReversed()},toSorted(t){return N(this).toSorted(t)},toSpliced(...t){return N(this).toSpliced(...t)},unshift(...t){return Y(this,"unshift",t)},values(){return vt(this,"values",v)}};function vt(t,e,s){const n=Ot(t),i=n[e]();return n!==t&&!m(t)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.value&&(r.value=s(r.value)),r}),i}const De=Array.prototype;function I(t,e,s,n,i,r){const l=Ot(t),o=l!==t&&!m(t),c=l[e];if(c!==De[e]){const u=c.apply(t,r);return o?v(u):u}let _=s;l!==t&&(o?_=function(u,a){return s.call(this,v(u),a,t)}:s.length>2&&(_=function(u,a){return s.call(this,u,a,t)}));const f=c.call(l,_,n);return o&&i?i(f):f}function Ft(t,e,s,n){const i=Ot(t);let r=s;return i!==t&&(m(t)?s.length>3&&(r=function(l,o,c){return s.call(this,l,o,c,t)}):r=function(l,o,c){return s.call(this,l,v(o),c,t)}),i[e](r,...n)}function bt(t,e,s){const n=p(t);b(n,"iterate",$);const i=n[e](...s);return(i===-1||i===!1)&&Ge(s[0])?(s[0]=p(s[0]),n[e](...s)):i}function Y(t,e,s=[]){Tt(),Rt();const n=p(t)[e].apply(t,s);return It(),Pt(),n}const Oe=ue("__proto__,__v_isRef,__isVue"),Qt=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(X));function Me(t){X(t)||(t=String(t));const e=p(this);return b(e,"has",t),e.hasOwnProperty(t)}class Xt{constructor(e=!1,s=!1){this._isReadonly=e,this._isShallow=s}get(e,s,n){const i=this._isReadonly,r=this._isShallow;if(s==="__v_isReactive")return!i;if(s==="__v_isReadonly")return i;if(s==="__v_isShallow")return r;if(s==="__v_raw")return n===(i?r?qe:te:r?ze:kt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const l=S(e);if(!i){let c;if(l&&(c=Pe[s]))return c;if(s==="hasOwnProperty")return Me}const o=Reflect.get(e,s,R(e)?e:n);return(X(s)?Qt.has(s):Oe(s))||(i||b(e,"get",s),r)?o:R(o)?l&&xt(s)?o:o.value:z(o)?i?se(o):ee(o):o}}class Ae extends Xt{constructor(e=!1){super(!1,e)}set(e,s,n,i){let r=e[s];if(!this._isShallow){const c=H(r);if(!m(n)&&!H(n)&&(r=p(r),n=p(n)),!S(e)&&R(r)&&!R(n))return c?!1:(r.value=n,!0)}const l=S(e)&&xt(s)?Number(s)<e.length:ct(e,s),o=Reflect.set(e,s,n,R(e)?e:i);return e===p(i)&&(l?j(n,r)&&A(e,"set",s,n):A(e,"add",s,n)),o}deleteProperty(e,s){const n=ct(e,s);e[s];const i=Reflect.deleteProperty(e,s);return i&&n&&A(e,"delete",s,void 0),i}has(e,s){const n=Reflect.has(e,s);return(!X(s)||!Qt.has(s))&&b(e,"has",s),n}ownKeys(e){return b(e,"iterate",S(e)?"length":L),Reflect.ownKeys(e)}}class je extends Xt{constructor(e=!1){super(!0,e)}set(e,s){return!0}deleteProperty(e,s){return!0}}const Ce=new Ae,We=new je,Mt=t=>t,pt=t=>Reflect.getPrototypeOf(t);function tt(t,e,s=!1,n=!1){t=t.__v_raw;const i=p(t),r=p(e);s||(j(e,r)&&b(i,"get",e),b(i,"get",r));const{has:l}=pt(i),o=n?Mt:s?At:v;if(l.call(i,e))return o(t.get(e));if(l.call(i,r))return o(t.get(r));t!==i&&t.get(e)}function et(t,e=!1){const s=this.__v_raw,n=p(s),i=p(t);return e||(j(t,i)&&b(n,"has",t),b(n,"has",i)),t===i?s.has(t):s.has(t)||s.has(i)}function st(t,e=!1){return t=t.__v_raw,!e&&b(p(t),"iterate",L),Reflect.get(t,"size",t)}function Nt(t,e=!1){!e&&!m(t)&&!H(t)&&(t=p(t));const s=p(this);return pt(s).has.call(s,t)||(s.add(t),A(s,"add",t,t)),this}function Vt(t,e,s=!1){!s&&!m(e)&&!H(e)&&(e=p(e));const n=p(this),{has:i,get:r}=pt(n);let l=i.call(n,t);l||(t=p(t),l=i.call(n,t));const o=r.call(n,t);return n.set(t,e),l?j(e,o)&&A(n,"set",t,e):A(n,"add",t,e),this}function Jt(t){const e=p(this),{has:s,get:n}=pt(e);let i=s.call(e,t);i||(t=p(t),i=s.call(e,t)),n&&n.call(e,t);const r=e.delete(t);return i&&A(e,"delete",t,void 0),r}function zt(){const t=p(this),e=t.size!==0,s=t.clear();return e&&A(t,"clear",void 0,void 0),s}function nt(t,e){return function(n,i){const r=this,l=r.__v_raw,o=p(l),c=e?Mt:t?At:v;return!t&&b(o,"iterate",L),l.forEach((_,f)=>n.call(i,c(_),c(f),r))}}function it(t,e,s){return function(...n){const i=this.__v_raw,r=p(i),l=B(r),o=t==="entries"||t===Symbol.iterator&&l,c=t==="keys"&&l,_=i[t](...n),f=s?Mt:e?At:v;return!e&&b(r,"iterate",c?St:L),{next(){const{value:u,done:a}=_.next();return a?{value:u,done:a}:{value:o?[f(u[0]),f(u[1])]:f(u),done:a}},[Symbol.iterator](){return this}}}}function P(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Ke(){const t={get(r){return tt(this,r)},get size(){return st(this)},has:et,add:Nt,set:Vt,delete:Jt,clear:zt,forEach:nt(!1,!1)},e={get(r){return tt(this,r,!1,!0)},get size(){return st(this)},has:et,add(r){return Nt.call(this,r,!0)},set(r,l){return Vt.call(this,r,l,!0)},delete:Jt,clear:zt,forEach:nt(!1,!0)},s={get(r){return tt(this,r,!0)},get size(){return st(this,!0)},has(r){return et.call(this,r,!0)},add:P("add"),set:P("set"),delete:P("delete"),clear:P("clear"),forEach:nt(!0,!1)},n={get(r){return tt(this,r,!0,!0)},get size(){return st(this,!0)},has(r){return et.call(this,r,!0)},add:P("add"),set:P("set"),delete:P("delete"),clear:P("clear"),forEach:nt(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=it(r,!1,!1),s[r]=it(r,!0,!1),e[r]=it(r,!1,!0),n[r]=it(r,!0,!0)}),[t,s,e,n]}const[Le,He,Fe,Ne]=Ke();function Zt(t,e){const s=e?t?Ne:Fe:t?He:Le;return(n,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?n:Reflect.get(ct(s,i)&&i in n?s:n,i,r)}const Ve={get:Zt(!1,!1)},Je={get:Zt(!0,!1)},kt=new WeakMap,ze=new WeakMap,te=new WeakMap,qe=new WeakMap;function Ye(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Be(t){return t.__v_skip||!Object.isExtensible(t)?0:Ye(we(t))}function ee(t){return H(t)?t:ne(t,!1,Ce,Ve,kt)}function se(t){return ne(t,!0,We,Je,te)}function ne(t,e,s,n,i){if(!z(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=i.get(t);if(r)return r;const l=Be(t);if(l===0)return t;const o=new Proxy(t,l===2?n:s);return i.set(t,o),o}function lt(t){return H(t)?lt(t.__v_raw):!!(t&&t.__v_isReactive)}function H(t){return!!(t&&t.__v_isReadonly)}function m(t){return!!(t&&t.__v_isShallow)}function Ge(t){return t?!!t.__v_raw:!1}function p(t){const e=t&&t.__v_raw;return e?p(e):t}function _s(t){return!ct(t,"__v_skip")&&Object.isExtensible(t)&&ye(t,"__v_skip",!0),t}const v=t=>z(t)?ee(t):t,At=t=>z(t)?se(t):t;function R(t){return t?t.__v_isRef===!0:!1}function gs(t){return Ue(t,!1)}function Ue(t,e){return R(t)?t:new $e(t,e)}class $e{constructor(e,s){this.dep=new Dt,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=s?e:p(e),this._value=s?e:v(e),this.__v_isShallow=s}get value(){return this.dep.track(),this._value}set value(e){const s=this._rawValue,n=this.__v_isShallow||m(e)||H(e);e=n?e:p(e),j(e,s)&&(this._rawValue=e,this._value=n?e:v(e),this.dep.trigger())}}function vs(t){const e=S(t)?new Array(t.length):{};for(const s in t)e[s]=Xe(t,s);return e}class Qe{constructor(e,s,n){this._object=e,this._key=s,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Te(p(this._object),this._key)}}function Xe(t,e,s){const n=t[e];return R(n)?n:new Qe(t,e,s)}class Ze{constructor(e,s,n){this.fn=e,this.setter=s,this._value=void 0,this.dep=new Dt(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=U-1,this.effect=this,this.__v_isReadonly=!s,this.isSSR=n}notify(){this.flags|=16,d!==this&&this.dep.notify()}get value(){const e=this.dep.track();return Gt(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ke(t,e,s=!1){let n,i;return M(t)?n=t:(n=t.get,i=t.set),new Ze(n,i,s)}const rt={},at=new WeakMap;let K;function ts(t,e=!1,s=K){if(s){let n=at.get(s);n||at.set(s,n=[]),n.push(t)}}function es(t,e,s=mt){const{immediate:n,deep:i,once:r,scheduler:l,augmentJob:o,call:c}=s,_=h=>i?h:m(h)||i===!1||i===0?O(h,1):O(h);let f,u,a,T,F=!1,Z=!1;if(R(t)?(u=()=>t.value,F=m(t)):lt(t)?(u=()=>_(t),F=!0):S(t)?(Z=!0,F=t.some(h=>lt(h)||m(h)),u=()=>t.map(h=>{if(R(h))return h.value;if(lt(h))return _(h);if(M(h))return c?c(h,2):h()})):M(t)?e?u=c?()=>c(t,2):t:u=()=>{if(a){Tt();try{a()}finally{Pt()}}const h=K;K=f;try{return c?c(t,3,[T]):t(T)}finally{K=h}}:u=ot,e&&i){const h=u,x=i===!0?1/0:i;u=()=>O(h(),x)}const Kt=Re(),C=()=>{f.stop(),Kt&&pe(Kt.effects,f)};if(r)if(e){const h=e;e=(...x)=>{h(...x),C()}}else{const h=u;u=()=>{h(),C()}}let W=Z?new Array(t.length).fill(rt):rt;const q=h=>{if(!(!(f.flags&1)||!f.dirty&&!h))if(e){const x=f.run();if(i||F||(Z?x.some((_t,k)=>j(_t,W[k])):j(x,W))){a&&a();const _t=K;K=f;try{const k=[x,W===rt?void 0:Z&&W[0]===rt?[]:W,T];c?c(e,3,k):e(...k),W=x}finally{K=_t}}}else f.run()};return o&&o(q),f=new Ie(u),f.scheduler=l?()=>l(q,!1):q,T=h=>ts(h,!1,f),a=f.onStop=()=>{const h=at.get(f);if(h){if(c)c(h,4);else for(const x of h)x();at.delete(f)}},e?n?q(!0):W=f.run():l?l(q.bind(null,!0),!0):f.run(),C.pause=f.pause.bind(f),C.resume=f.resume.bind(f),C.stop=C,C}function O(t,e=1/0,s){if(e<=0||!z(t)||t.__v_skip||(s=s||new Set,s.has(t)))return t;if(s.add(t),e--,R(t))O(t.value,e,s);else if(S(t))for(let n=0;n<t.length;n++)O(t[n],e,s);else if(_e(t)||B(t))t.forEach(n=>{O(n,e,s)});else if(Se(t)){for(const n in t)O(t[n],e,s);for(const n of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,n)&&O(t[n],e,s)}return t}/**
* @vue/runtime-core v3.5.4
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function jt(t,e,s,n){try{return n?t(...n):t()}catch(i){re(i,e,s)}}function ie(t,e,s,n){if(M(t)){const i=jt(t,e,s,n);return i&&ve(i)&&i.catch(r=>{re(r,e,s)}),i}if(S(t)){const i=[];for(let r=0;r<t.length;r++)i.push(ie(t[r],e,s,n));return i}}function re(t,e,s,n=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:l}=e&&e.appContext.config||mt;if(e){let o=e.parent;const c=e.proxy,_=`https://vuejs.org/error-reference/#runtime-${s}`;for(;o;){const f=o.ec;if(f){for(let u=0;u<f.length;u++)if(f[u](t,c,_)===!1)return}o=o.parent}if(r){Tt(),jt(r,null,10,[t,c,_]),Pt();return}}ss(t,s,i,n,l)}function ss(t,e,s,n=!0,i=!1){if(i)throw t;console.error(t)}let ut=!1,yt=!1;const w=[];let E=0;const J=[];let D=null,V=0;const oe=Promise.resolve();let Ct=null;function bs(t){const e=Ct||oe;return t?e.then(this?t.bind(this):t):e}function ns(t){let e=ut?E+1:0,s=w.length;for(;e<s;){const n=e+s>>>1,i=w[n],r=Q(i);r<t||r===t&&i.flags&2?e=n+1:s=n}return e}function is(t){if(!(t.flags&1)){const e=Q(t),s=w[w.length-1];!s||!(t.flags&2)&&e>=Q(s)?w.push(t):w.splice(ns(e),0,t),t.flags|=1,le()}}function le(){!ut&&!yt&&(yt=!0,Ct=oe.then(ce))}function rs(t){S(t)?J.push(...t):D&&t.id===-1?D.splice(V+1,0,t):t.flags&1||(J.push(t),t.flags|=1),le()}function os(t){if(J.length){const e=[...new Set(J)].sort((s,n)=>Q(s)-Q(n));if(J.length=0,D){D.push(...e);return}for(D=e,V=0;V<D.length;V++){const s=D[V];s.flags&4&&(s.flags&=-2),s.flags&8||s(),s.flags&=-2}D=null,V=0}}const Q=t=>t.id==null?t.flags&2?-1:1/0:t.id;function ce(t){yt=!1,ut=!0;try{for(E=0;E<w.length;E++){const e=w[E];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),jt(e,e.i,e.i?15:14),e.flags&=-2)}}finally{for(;E<w.length;E++){const e=w[E];e&&(e.flags&=-2)}E=0,w.length=0,os(),ut=!1,Ct=null,(w.length||J.length)&&ce()}}let fe=null,ae=null;function ls(t,e,s=!1){const n=dt||fe;if(n||ae){const i=n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return s&&M(e)?e.call(n&&n.proxy):e}}function ws(){return!!(dt||fe||ae)}const cs=hs,fs=Symbol.for("v-scx"),as=()=>ls(fs);function Ss(t,e,s){return us(t,e,s)}function us(t,e,s=mt){const{immediate:n,deep:i,flush:r,once:l}=s,o=he({},s);let c;if(Wt)if(r==="sync"){const a=as();c=a.__watcherHandles||(a.__watcherHandles=[])}else if(!e||n)o.once=!0;else return{stop:ot,resume:ot,pause:ot};const _=dt;o.call=(a,T,F)=>ie(a,_,T,F);let f=!1;r==="post"?o.scheduler=a=>{cs(a,_&&_.suspense)}:r!=="sync"&&(f=!0,o.scheduler=(a,T)=>{T?a():is(a)}),o.augmentJob=a=>{e&&(a.flags|=4),f&&(a.flags|=2,_&&(a.id=_.uid,a.i=_))};const u=es(t,e,o);return c&&c.push(u),u}function hs(t,e){e&&e.pendingBranch?S(t)?e.effects.push(...t):e.effects.push(t):rs(t)}let dt=null;{const t=me(),e=(s,n)=>{let i;return(i=t[s])||(i=t[s]=[]),i.push(n),r=>{i.length>1?i.forEach(l=>l(r)):i[0](r)}};e("__VUE_INSTANCE_SETTERS__",s=>dt=s),e("__VUE_SSR_SETTERS__",s=>Wt=s)}let Wt=!1;const ys=(t,e)=>ke(t,e,Wt);export{ee as a,lt as b,vs as c,ys as d,ps as e,ls as f,Re as g,ws as h,R as i,_s as m,bs as n,ds as o,gs as r,p as t,Ss as w};
