var viewer;(()=>{"use strict";var e,t,r,n,o,i,s,a,f,u,l,c,d,h,p,v,b,m={17187:e=>{var t,r="object"==typeof Reflect?Reflect:null,n=r&&"function"==typeof r.apply?r.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};t=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(r,n){function o(r){e.removeListener(t,i),n(r)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",o),r([].slice.call(arguments))}v(e,t,i,{once:!0}),"error"!==t&&function(e,t,r){"function"==typeof e.on&&v(e,"error",t,{once:!0})}(e,o)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var s=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function f(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function u(e,t,r,n){var o,i,s,u;if(a(r),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),i=e._events),s=i[t]),void 0===s)s=i[t]=r,++e._eventsCount;else if("function"==typeof s?s=i[t]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),(o=f(e))>0&&s.length>o&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,u=l,console&&console.warn&&console.warn(u)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function c(e,t,r){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},o=l.bind(n);return o.listener=r,n.wrapFn=o,o}function d(e,t,r){var n=e._events;if(void 0===n)return[];var o=n[t];return void 0===o?[]:"function"==typeof o?r?[o.listener||o]:[o]:r?function(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(o):p(o,o.length)}function h(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function p(e,t){for(var r=new Array(t),n=0;n<t;++n)r[n]=e[n];return r}function v(e,t,r,n){if("function"==typeof e.on)n.once?e.once(t,r):e.on(t,r);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(i){n.once&&e.removeEventListener(t,o),r(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return f(this)},i.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var o="error"===e,i=this._events;if(void 0!==i)o=o&&void 0===i.error;else if(!o)return!1;if(o){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var f=i[e];if(void 0===f)return!1;if("function"==typeof f)n(f,this,t);else{var u=f.length,l=p(f,u);for(r=0;r<u;++r)n(l[r],this,t)}return!0},i.prototype.addListener=function(e,t){return u(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return u(this,e,t,!0)},i.prototype.once=function(e,t){return a(t),this.on(e,c(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,c(this,e,t)),this},i.prototype.removeListener=function(e,t){var r,n,o,i,s;if(a(t),void 0===(n=this._events))return this;if(void 0===(r=n[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(o=-1,i=r.length-1;i>=0;i--)if(r[i]===t||r[i].listener===t){s=r[i].listener,o=i;break}if(o<0)return this;0===o?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,o),1===r.length&&(n[e]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",e,s||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){var t,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0===arguments.length){var o,i=Object.keys(r);for(n=0;n<i.length;++n)"removeListener"!==(o=i[n])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},i.prototype.listeners=function(e){return d(this,e,!0)},i.prototype.rawListeners=function(e){return d(this,e,!1)},i.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):h.call(e,t)},i.prototype.listenerCount=h,i.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},52731:(e,t,r)=>{var n={"./index":()=>Promise.all([r.e(350),r.e(792),r.e(865),r.e(704),r.e(957),r.e(467),r.e(344),r.e(265),r.e(849)]).then((()=>()=>r(849)))},o=(e,t)=>(r.R=t,t=r.o(n,e)?n[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),r.R=void 0,t),i=(e,t)=>{if(r.S){var n=r.S.default,o="default";if(n&&n!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return r.S[o]=e,r.I(o,t)}};r.d(t,{get:()=>o,init:()=>i})}},y={};function g(e){var t=y[e];if(void 0!==t)return t.exports;var r=y[e]={id:e,loaded:!1,exports:{}};return m[e].call(r.exports,r,r.exports,g),r.loaded=!0,r.exports}g.m=m,g.c=y,g.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return g.d(t,{a:t}),t},g.d=(e,t)=>{for(var r in t)g.o(t,r)&&!g.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},g.f={},g.e=e=>Promise.all(Object.keys(g.f).reduce(((t,r)=>(g.f[r](e,t),t)),[])),g.u=e=>e+"."+{42:"a9e3ea098e278e030360",151:"667ad77c324c95e344db",206:"cfb67ca2def6e7bccfaa",265:"d158f347db9c0d8d4217",274:"999fce86c473c575ccc2",294:"4b58ef275102eb0a06b3",305:"ec1e3832c906d4b88778",317:"73ae415de7325fcd4b5a",320:"3a6d441b10c786fc2104",344:"ef3b2cff971a78b33af4",350:"b957e1192882f775195a",371:"38994b2dd2c72c1c88c6",409:"0043ccfee449ff253700",412:"cce43801d7eccf7e0b7b",459:"1869b3c3bece590009a8",467:"2b23628b31db981a43c8",473:"6072ce89e324801b33ce",478:"795b30d1df9933b297e0",518:"670d0f3b097f8e3fa815",657:"202572efc7b043934ae5",670:"99b7afbf38da907d83ac",697:"899ad2d405c17d7d649a",704:"a8d953d39f8a9dce05a7",709:"3306655015ed5b25221a",726:"a6d052163a3b7bfb1dbe",733:"aea05f34a6afe4d5cf22",738:"645d9a2057823f5e31f7",764:"c6e0dba352a0ddd1681e",767:"0f19d786cf6ebcac06c2",792:"51eb8fcab208e32d0e23",804:"075c38676d0c13c73e1b",849:"4c10f2f506879f0e0b26",856:"634ce9e58952c40094af",865:"f0bf5404f5543f16c26f",874:"f133e0fbea283fd432f9",935:"297d78a6875b75758667",957:"2f8262465c2f80a1499b",985:"f55b7533e196fa301e40"}[e]+".js",g.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),g.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="viewer:",g.l=(r,n,o,i)=>{if(e[r])e[r].push(n);else{var s,a;if(void 0!==o)for(var f=document.getElementsByTagName("script"),u=0;u<f.length;u++){var l=f[u];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+o){s=l;break}}s||(a=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,g.nc&&s.setAttribute("nonce",g.nc),s.setAttribute("data-webpack",t+o),s.src=r),e[r]=[n];var c=(t,n)=>{s.onerror=s.onload=null,clearTimeout(d);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),t)return t(n)},d=setTimeout(c.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=c.bind(null,s.onerror),s.onload=c.bind(null,s.onload),a&&document.head.appendChild(s)}},g.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},g.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{g.S={};var e={},t={};g.I=(r,n)=>{n||(n=[]);var o=t[r];if(o||(o=t[r]={}),!(n.indexOf(o)>=0)){if(n.push(o),e[r])return e[r];g.o(g.S,r)||(g.S[r]={});var i=g.S[r],s="viewer",a=(e,t,r,n)=>{var o=i[e]=i[e]||{},a=o[t];(!a||!a.loaded&&(!n!=!a.eager?n:s>a.from))&&(o[t]={get:r,from:s,eager:!!n})},f=[];switch(r){case"default":a("@comunica/actor-init-sparql","1.22.3",(()=>Promise.all([g.e(473),g.e(317),g.e(151),g.e(874),g.e(42),g.e(344),g.e(856)]).then((()=>()=>g(36875))))),a("@inrupt/solid-client-authn-browser","1.11.2",(()=>Promise.all([g.e(305),g.e(874)]).then((()=>()=>g(94305))))),a("@material-ui/core","4.12.3",(()=>Promise.all([g.e(985),g.e(350),g.e(459),g.e(865),g.e(704),g.e(957)]).then((()=>()=>g(64459))))),a("buffer","6.0.3",(()=>g.e(764).then((()=>()=>g(48764))))),a("consolid-react-ui","0.0.11",(()=>Promise.all([g.e(985),g.e(350),g.e(371),g.e(865),g.e(704),g.e(957),g.e(467),g.e(518),g.e(709)]).then((()=>()=>g(36371))))),a("consolid","1.1.0",(()=>Promise.all([g.e(317),g.e(733),g.e(42),g.e(265),g.e(670)]).then((()=>()=>g(35733))))),a("events","3.3.0",(()=>()=>g(17187)),1),a("lodash.difference","4.5.0",(()=>g.e(478).then((()=>()=>g(61478))))),a("mem","9.0.1",(()=>g.e(409).then((()=>()=>g(14409))))),a("n3","1.10.0",(()=>Promise.all([g.e(473),g.e(657),g.e(874),g.e(42),g.e(726)]).then((()=>()=>g(51657))))),a("n3","1.11.1",(()=>Promise.all([g.e(473),g.e(738),g.e(874),g.e(42),g.e(320)]).then((()=>()=>g(73738))))),a("prop-types","15.7.2",(()=>g.e(697).then((()=>()=>g(45697))))),a("react-dom","17.0.2",(()=>Promise.all([g.e(935),g.e(865)]).then((()=>()=>g(73935))))),a("react-query","3.24.4",(()=>Promise.all([g.e(767),g.e(865),g.e(704),g.e(206)]).then((()=>()=>g(88767))))),a("react-router-dom","5.3.0",(()=>Promise.all([g.e(412),g.e(865),g.e(957),g.e(274)]).then((()=>()=>g(79412))))),a("react","17.0.2",(()=>g.e(294).then((()=>()=>g(67294))))),a("recoil","0.4.1",(()=>Promise.all([g.e(804),g.e(865),g.e(704)]).then((()=>()=>g(2804)))))}return e[r]=f.length?Promise.all(f).then((()=>e[r]=1)):1}}})(),g.p="https://consolidproject.github.io/pluginViewer/",r=e=>{var t=e=>e.split(".").map((e=>+e==e?+e:e)),r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=r[1]?t(r[1]):[];return r[2]&&(n.length++,n.push.apply(n,t(r[2]))),r[3]&&(n.push([]),n.push.apply(n,t(r[3]))),n},n=(e,t)=>{e=r(e),t=r(t);for(var n=0;;){if(n>=e.length)return n<t.length&&"u"!=(typeof t[n])[0];var o=e[n],i=(typeof o)[0];if(n>=t.length)return"u"==i;var s=t[n],a=(typeof s)[0];if(i!=a)return"o"==i&&"n"==a||"s"==a||"u"==i;if("o"!=i&&"u"!=i&&o!=s)return o<s;n++}},o=e=>{var t=e[0],r="";if(1===e.length)return"*";if(t+.5){r+=0==t?">=":-1==t?"<":1==t?"^":2==t?"~":t>0?"=":"!=";for(var n=1,i=1;i<e.length;i++)n--,r+="u"==(typeof(a=e[i]))[0]?"-":(n>0?".":"")+(n=2,a);return r}var s=[];for(i=1;i<e.length;i++){var a=e[i];s.push(0===a?"not("+f()+")":1===a?"("+f()+" || "+f()+")":2===a?s.pop()+" "+s.pop():o(a))}return f();function f(){return s.pop().replace(/^\((.+)\)$/,"$1")}},i=(e,t)=>{if(0 in e){t=r(t);var n=e[0],o=n<0;o&&(n=-n-1);for(var s=0,a=1,f=!0;;a++,s++){var u,l,c=a<e.length?(typeof e[a])[0]:"";if(s>=t.length||"o"==(l=(typeof(u=t[s]))[0]))return!f||("u"==c?a>n&&!o:""==c!=o);if("u"==l){if(!f||"u"!=c)return!1}else if(f)if(c==l)if(a<=n){if(u!=e[a])return!1}else{if(o?u>e[a]:u<e[a])return!1;u!=e[a]&&(f=!1)}else if("s"!=c&&"n"!=c){if(o||a<=n)return!1;f=!1,a--}else{if(a<=n||l<c!=o)return!1;f=!1}else"s"!=c&&"n"!=c&&(f=!1,a--)}}var d=[],h=d.pop.bind(d);for(s=1;s<e.length;s++){var p=e[s];d.push(1==p?h()|h():2==p?h()&h():p?i(p,t):!h())}return!!h()},s=(e,t)=>{var r=e[t];return Object.keys(r).reduce(((e,t)=>!e||!r[e].loaded&&n(e,t)?t:e),0)},a=(e,t,r)=>"Unsatisfied version "+t+" of shared singleton module "+e+" (required "+o(r)+")",f=(e,t,r,n)=>{var o=s(e,r);return i(n,o)||"undefined"!=typeof console&&console.warn&&console.warn(a(r,o,n)),l(e[r][o])},u=(e,t,r)=>{var o=e[t];return(t=Object.keys(o).reduce(((e,t)=>!i(r,t)||e&&!n(e,t)?e:t),0))&&o[t]},l=e=>(e.loaded=1,e.get()),d=(c=e=>function(t,r,n,o){var i=g.I(t);return i&&i.then?i.then(e.bind(e,t,g.S[t],r,n,o)):e(t,g.S[t],r,n,o)})(((e,t,r,n,o)=>t&&g.o(t,r)?f(t,0,r,n):o())),h=c(((e,t,r,n,o)=>{var i=t&&g.o(t,r)&&u(t,r,n);return i?l(i):o()})),p={},v={86874:()=>h("default","events",[1,3,3,0],(()=>()=>g(17187))),66042:()=>h("default","buffer",[1,6,0,3],(()=>g.e(764).then((()=>()=>g(48764))))),81344:()=>h("default","n3",[1,1,10,0],(()=>Promise.all([g.e(473),g.e(657),g.e(874),g.e(42),g.e(726)]).then((()=>()=>g(51657))))),80853:()=>h("default","n3",[1,1,10,0],(()=>g.e(738).then((()=>()=>g(73738))))),77865:()=>d("default","react",[1,17,0,1],(()=>g.e(294).then((()=>()=>g(67294))))),21704:()=>d("default","react-dom",[1,17,0,1],(()=>g.e(935).then((()=>()=>g(73935))))),9957:()=>h("default","prop-types",[1,15,7,2],(()=>g.e(697).then((()=>()=>g(45697))))),38399:()=>d("default","@material-ui/core",[1,4,12,3],(()=>Promise.all([g.e(985),g.e(459)]).then((()=>()=>g(64459))))),64103:()=>h("default","consolid",[1,1,1,0],(()=>Promise.all([g.e(317),g.e(733),g.e(42),g.e(265),g.e(670)]).then((()=>()=>g(35733))))),75073:()=>h("default","@inrupt/solid-client-authn-browser",[1,1,11,2],(()=>Promise.all([g.e(305),g.e(874)]).then((()=>()=>g(94305))))),42811:()=>h("default","mem",[1,9,0,1],(()=>g.e(409).then((()=>()=>g(14409))))),64018:()=>h("default","react-router-dom",[1,5,2,0],(()=>g.e(412).then((()=>()=>g(79412))))),7265:()=>h("default","@comunica/actor-init-sparql",[1,1,22,2],(()=>Promise.all([g.e(473),g.e(317),g.e(151),g.e(874),g.e(42),g.e(344),g.e(856)]).then((()=>()=>g(36875))))),12470:()=>h("default","lodash.difference",[1,4,5,0],(()=>g.e(478).then((()=>()=>g(61478))))),16837:()=>h("default","consolid-react-ui",[4,0,0,11],(()=>Promise.all([g.e(985),g.e(371),g.e(518)]).then((()=>()=>g(36371))))),24853:()=>h("default","recoil",[2,0,4,1],(()=>g.e(804).then((()=>()=>g(2804))))),60698:()=>h("default","react-query",[1,3,24,4],(()=>g.e(767).then((()=>()=>g(88767)))))},b={42:[66042],265:[7265],344:[81344],467:[38399,64103,75073],518:[42811,64018],704:[21704],849:[12470,16837,24853,60698],856:[80853],865:[77865],874:[86874],957:[9957]},g.f.consumes=(e,t)=>{g.o(b,e)&&b[e].forEach((e=>{if(g.o(p,e))return t.push(p[e]);var r=t=>{p[e]=0,g.m[e]=r=>{delete g.c[e],r.exports=t()}},n=t=>{delete p[e],g.m[e]=r=>{throw delete g.c[e],t}};try{var o=v[e]();o.then?t.push(p[e]=o.then(r).catch(n)):r(o)}catch(e){n(e)}}))},(()=>{var e={428:0};g.f.j=(t,r)=>{var n=g.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else if(/^([28]65|(34|70|87)4|42|467|518|957)$/.test(t))e[t]=0;else{var o=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=o);var i=g.p+g.u(t),s=new Error;g.l(i,(r=>{if(g.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,n[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,o,[i,s,a]=r,f=0;for(n in s)g.o(s,n)&&(g.m[n]=s[n]);for(a&&a(g),t&&t(r);f<i.length;f++)o=i[f],g.o(e,o)&&e[o]&&e[o][0](),e[i[f]]=0},r=self.webpackChunkviewer=self.webpackChunkviewer||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var w=g(g.s=52731);viewer=w})();