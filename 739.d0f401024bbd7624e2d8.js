(self.webpackChunkviewer=self.webpackChunkviewer||[]).push([[739],{35733:(t,e,a)=>{"use strict";a.r(e),a.d(e,{executeQuery:()=>d,getAuthorisedFilesInRepository:()=>E,getStakeholdersFromProject:()=>y,getProjectsFromAggregator:()=>u,getProjectDataFromStakeholder:()=>x,getLBDlocation:()=>R,getAccessRights:()=>A,update:()=>j,findObjectAliases:()=>P,getLocalContexts:()=>v,loadProjectMetadata:()=>f,getProjectId:()=>b,createLBDLocation:()=>m,createProject:()=>I});const n=a(4501),{DataFactory:r}=n,{namedNode:o,literal:i,defaultGraph:s,quad:c}=r,w=a(7265).newEngine,{v4:l}=a(55877);async function d(t,e,a){const r=new n.Store;for(const t of e)try{const e=await a.fetch(t),o=await e.text(),i=new n.Parser;await h(o,r,i,t)}catch(t){console.log(t)}const o="\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n "+t,i=w();return await i.query(o,{sources:[r]})}async function p(t,e){const a={};for(const n of e)try{const e=await t.bindings();a[n]=e.map((t=>t.get("?"+n).id)).filter((t=>null!=t))}catch(t){console.log("error",t)}return a}async function f(t,e,a){try{const r=await b(t),o=await y(t,a);for(const t of o){const o=await R(t,a)+r+"/artefactRegistry.ttl",i=await a.fetch(o);if(i){const t=await i.text();if(t){const a=new n.Parser;await h(t,e,a,o+"#")}}else console.log(t,"has no artefact registry")}}catch(t){console.log("error",t)}}function g(t,e){if(t.id.startsWith("http"))return o(t.id);if(t.id.startsWith('"')){const e=t.id.replaceAll('"',"");return i(e)}return o(e+t.id)}function h(t,e,a,n){return new Promise(((r,o)=>{t&&a.parse(t,((t,a,o)=>{if(t&&console.log(t),a){const t=g(a.subject,n),r=g(a.predicate,n),o=g(a.object,n),i=c(t,r,o,s());e.addQuad(i)}else r()}))}))}async function u(t,e){let a=t;a.endsWith("/")||(a+="/");const n=await d("\n  SELECT ?project WHERE {\n    ?s a lbd:Aggregator ;\n      ldp:contains ?project .\n  }",[a],e),{project:r}=await p(n,["project"]);return r}async function b(t,e){return t.split("/")[t.split("/").length-2]}async function y(t,e){let a=t;a.endsWith("/")||(a+="/");const n=`\n  SELECT ?st WHERE {\n    <${t}> a lbd:PartialProject ;\n      lbd:hasMember ?st .\n  }`,r=await d(n,[t],e),{st:o}=await p(r,["st"]);return o}async function x(t,e,a){const n=await R(t,a);e.endsWith("/")||(e+="/");const r=n+e;return{stakeholder:t,data:await E(r,a)}}async function E(t,e){const a=`\n    SELECT ?dataset WHERE {\n      <${t}> ldp:contains ?dataset .\n    }\n  `,n=await d(a,[t],e),{dataset:r}=await p(n,["dataset"]),o=r.filter((t=>t.endsWith("props.ttl"))),i=[];for(const a of o){const n=await A(a,e),r="\n    SELECT ?uri WHERE {\n      ?meta a dcat:Dataset ;\n      dcat:distribution ?dist .\n      ?dist dcat:downloadURL ?uri .\n    }",o=await d(r,[a],e),{uri:s}=await p(o,["uri"]);i.push({artefactRegistry:t+"artefactRegistry.ttl",accessRights:n,metadata:a,main:s[0]})}return i}async function A(t,e){return(await e.fetch(t,{method:"HEAD"})).headers.get("WAC-Allow").split(",")[0].replace("user=","").replaceAll('"',"").split(" ")}async function R(t,e){const a=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n select ?index where {<${t}> lbd:hasProjectRegistry ?index}`,n=await d(a,[t.replace("#me","")],e);let{index:r}=await p(n,["index"]);return r.length>0?(r[0].endsWith("/")||(r+="/"),r[0]):null}async function j(t,e,a){try{var n={method:"PATCH",headers:{"Content-Type":"application/sparql-update"},body:t,redirect:"follow"};let r;return void(r=await a.fetch(e,n))}catch(t){throw console.log("error",t),t}}async function P(t,e,a){const n=`\n  SELECT ?alias WHERE {\n  <${t}> owl:sameAs ?alias .\n  }\n  `,r=await d(n,e,a),{alias:o}=await p(r,["alias"]);return o}async function v(t,e,a){}async function m(t){if(t.info.isLoggedIn){let e=await R(t.info.webId,t);e||(e=t.info.webId.replace("/profile/card#me","/lbd/"));const a=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n      <${t.info.webId}> lbd:hasProjectRegistry <${e}> .\n    }`;await j(a,t.info.webId,t);const n=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n      <${e}> a lbd:Aggregator .\n    }`;return await j(n,e,t),e}}async function I(t,e,a){if(a.info.isLoggedIn){t||(t=l()),e||(e=[a.info.webId]);let n=await R(a.info.webId,a);n||(n=await m(a));const r=n+t+"/",o=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n      <${r}> a lbd:PartialProject ;\n      lbd:hasProjectUri <${r}>;\n      lbd:hasProjectId "${t}";\n      lbd:hasLocalArtefactRegistry <${r}artefactRegistry.ttl> .\n    }`;await j(o,r,a);for(const t of e){const e=`\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#> \n INSERT DATA {\n        <${r}> lbd:hasMember <${t}> .\n      }`;await j(e,r,a)}}}}}]);