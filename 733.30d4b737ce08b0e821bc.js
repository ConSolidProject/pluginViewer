(self.webpackChunkviewer=self.webpackChunkviewer||[]).push([[733,739],{35733:(t,e,n)=>{"use strict";n.r(e),n.d(e,{executeQuery:()=>d,getAuthorisedFilesInRepository:()=>x,getStakeholdersFromProject:()=>b,getProjectsFromAggregator:()=>h,getProjectDataFromStakeholder:()=>v,getLBDlocation:()=>E,getAccessRights:()=>m,update:()=>A,findObjectAliases:()=>R,getLocalContexts:()=>j,loadProjectMetadata:()=>f,getProjectId:()=>y,createLBDLocation:()=>P,createProject:()=>C});const r=n(4501),{DataFactory:a}=r,{namedNode:o,literal:s,defaultGraph:i,quad:c}=a,l=n(7265).newEngine,{v4:w}=n(55877);async function d(t,e,n){const a=new r.Store;for(const t of e)try{const e=await n.fetch(t),o=await e.text(),s=new r.Parser;await g(o,a,s,t)}catch(t){console.log(t)}const o="\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n "+t,s=l();return await s.query(o,{sources:[a]})}async function p(t,e){const n={};for(const r of e)try{const e=await t.bindings();n[r]=e.map((t=>t.get("?"+r).id)).filter((t=>null!=t))}catch(t){console.log("error",t)}return n}async function f(t,e,n){try{const a=await y(t),o=await b(t,n);for(const t of o){const o=await E(t,n)+a+"/artefactRegistry.ttl",s=await n.fetch(o);if(s){const t=await s.text();if(t){const n=new r.Parser;await g(t,e,n,o+"#")}}else console.log(t,"has no artefact registry")}}catch(t){console.log("error",t)}}function u(t,e){if(t.id.startsWith("http"))return o(t.id);if(t.id.startsWith('"')){const e=t.id.replaceAll('"',"");return s(e)}return o(e+t.id)}function g(t,e,n,r){return new Promise(((a,o)=>{t&&n.parse(t,((t,n,o)=>{if(t&&console.log(t),n){const t=u(n.subject,r),a=u(n.predicate,r),o=u(n.object,r),s=c(t,a,o,i());e.addQuad(s)}else a()}))}))}async function h(t,e){let n=t;n.endsWith("/")||(n+="/");const r=await d("\n  SELECT ?project WHERE {\n    ?s a lbd:Aggregator ;\n      ldp:contains ?project .\n  }",[n],e),{project:a}=await p(r,["project"]);return a}async function y(t,e){return t.split("/")[t.split("/").length-2]}async function b(t,e){let n=t;n.endsWith("/")||(n+="/");const r=`\n  SELECT ?st WHERE {\n    <${t}> a lbd:PartialProject ;\n      lbd:hasMember ?st .\n  }`,a=await d(r,[t],e),{st:o}=await p(a,["st"]);return o}async function v(t,e,n){const r=await E(t,n);e.endsWith("/")||(e+="/");const a=r+e;return{stakeholder:t,data:await x(a,n)}}async function x(t,e){const n=`\n    SELECT ?dataset WHERE {\n      <${t}> ldp:contains ?dataset .\n    }\n  `,r=await d(n,[t],e),{dataset:a}=await p(r,["dataset"]),o=a.filter((t=>t.endsWith("props.ttl"))),s=[];for(const n of o){const r=await m(n,e),a="\n    SELECT ?uri WHERE {\n      ?meta a dcat:Dataset ;\n      dcat:distribution ?dist .\n      ?dist dcat:downloadURL ?uri .\n    }",o=await d(a,[n],e),{uri:i}=await p(o,["uri"]);s.push({artefactRegistry:t+"artefactRegistry.ttl",accessRights:r,metadata:n,main:i[0]})}return s}async function m(t,e){return(await e.fetch(t,{method:"HEAD"})).headers.get("WAC-Allow").split(",")[0].replace("user=","").replaceAll('"',"").split(" ")}async function E(t,e){const n=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n select ?index where {<${t}> lbd:hasProjectRegistry ?index}`,r=await d(n,[t.replace("#me","")],e);let{index:a}=await p(r,["index"]);return a.length>0?(a[0].endsWith("/")||(a+="/"),a[0]):null}async function A(t,e,n){try{var r={method:"PATCH",headers:{"Content-Type":"application/sparql-update"},body:t,redirect:"follow"};let a;return void(a=await n.fetch(e,r))}catch(t){throw console.log("error",t),t}}async function R(t,e,n){const r=`\n  SELECT ?alias WHERE {\n  <${t}> owl:sameAs ?alias .\n  }\n  `,a=await d(r,e,n),{alias:o}=await p(a,["alias"]);return o}async function j(t,e,n){}async function P(t){if(t.info.isLoggedIn){let e=await E(t.info.webId,t);e||(e=t.info.webId.replace("/profile/card#me","/lbd/"));const n=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n      <${t.info.webId}> lbd:hasProjectRegistry <${e}> .\n    }`;await A(n,t.info.webId,t);const r=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n      <${e}> a lbd:Aggregator .\n    }`;return await A(r,e,t),e}}async function C(t,e,n){if(n.info.isLoggedIn){t||(t=w()),e||(e=[n.info.webId]);let r=await E(n.info.webId,n);r||(r=await P(n));const a=r+t+"/",o=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n      <${a}> a lbd:PartialProject ;\n      lbd:hasProjectUri <${a}>;\n      lbd:hasProjectId "${t}";\n      lbd:hasLocalArtefactRegistry <${a}artefactRegistry.ttl> .\n    }`;await A(o,a,n);for(const t of e){const e=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n        <${a}> lbd:hasMember <${t}> .\n      }`;await A(e,a,n)}}}},55877:(t,e,n)=>{var r=n(23570),a=n(71171),o=a;o.v1=r,o.v4=a,t.exports=o},45327:t=>{for(var e=[],n=0;n<256;++n)e[n]=(n+256).toString(16).substr(1);t.exports=function(t,n){var r=n||0,a=e;return[a[t[r++]],a[t[r++]],a[t[r++]],a[t[r++]],"-",a[t[r++]],a[t[r++]],"-",a[t[r++]],a[t[r++]],"-",a[t[r++]],a[t[r++]],"-",a[t[r++]],a[t[r++]],a[t[r++]],a[t[r++]],a[t[r++]],a[t[r++]]].join("")}},85217:t=>{var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var n=new Uint8Array(16);t.exports=function(){return e(n),n}}else{var r=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),r[e]=t>>>((3&e)<<3)&255;return r}}},23570:(t,e,n)=>{var r,a,o=n(85217),s=n(45327),i=0,c=0;t.exports=function(t,e,n){var l=e&&n||0,w=e||[],d=(t=t||{}).node||r,p=void 0!==t.clockseq?t.clockseq:a;if(null==d||null==p){var f=o();null==d&&(d=r=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==p&&(p=a=16383&(f[6]<<8|f[7]))}var u=void 0!==t.msecs?t.msecs:(new Date).getTime(),g=void 0!==t.nsecs?t.nsecs:c+1,h=u-i+(g-c)/1e4;if(h<0&&void 0===t.clockseq&&(p=p+1&16383),(h<0||u>i)&&void 0===t.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");i=u,c=g,a=p;var y=(1e4*(268435455&(u+=122192928e5))+g)%4294967296;w[l++]=y>>>24&255,w[l++]=y>>>16&255,w[l++]=y>>>8&255,w[l++]=255&y;var b=u/4294967296*1e4&268435455;w[l++]=b>>>8&255,w[l++]=255&b,w[l++]=b>>>24&15|16,w[l++]=b>>>16&255,w[l++]=p>>>8|128,w[l++]=255&p;for(var v=0;v<6;++v)w[l+v]=d[v];return e||s(w)}},71171:(t,e,n)=>{var r=n(85217),a=n(45327);t.exports=function(t,e,n){var o=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var s=(t=t||{}).random||(t.rng||r)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e)for(var i=0;i<16;++i)e[o+i]=s[i];return e||a(s)}}}]);