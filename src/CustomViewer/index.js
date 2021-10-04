import React, { useState, useEffect } from "react";
import Viewer from "./Viewer";
import {getAliases, getMyArtefactRegistry} from 'consolid'
const newEngine = require("@comunica/actor-init-sparql").newEngine;
const v4 = require("uuid");

const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

// async function setSelection({ store, engine, trigger }, items) {
//   // remove previous selection
//   const stream = await store.removeMatches(
//     null,
//     null,
//     null,
//     namedNode("http://lbdserver.org/state/selection")
//   );

//   stream.on("end", async () => {
//     items.forEach((item) => {
//       engine.query(item, { sources: [store] });
//       // const artefact = store.createBlankNode()
//       // store.addQuad(
//       //   namedNode("http://lbdserver.org/state/selection#"),
//       //   namedNode("http://lbdserver.org/voc#containsArtefact"),
//       //   artefact,
//       //   namedNode("http://lbdserver.org/state/selection"),
//       // )
//       // store.addQuad(
//       //   artefact,
//       //   namedNode("https://w3id.org/fog#hasGltfId-meshName"),
//       //   namedNode(item.guid),
//       //   namedNode("http://lbdserver.org/state/selection"),
//       // )
//     });
//   });

//   trigger(v4());
// }

// async function filterMimeType(item) {
//   const queryEngine = newEngine();

//   const q = `
//   prefix ldp: <http://www.w3.org/ns/ldp#>
//   prefix dcat: <http://www.w3.org/ns/dcat#>
//   select ?mediatype
//   where
//   {<${item.resource}> dcat:mediaType ?mediatype .}`;
//   const results = await queryEngine.query(q, { sources: [item.metadata] });
//   if (
//     results.results.bindings[0].mediatype.value ===
//     "https://www.iana.org/assignments/media-types/model/gltf+json"
//   ) {
//     return item.resource;
//   } else {
//     return;
//   }
// }

const LBDviewer = (props) => {
  const {
    session,
    activeResources,
    projects,
    selectedElements,
    setSelectedElements,
    selectionId,
    setSelectionId,
    store
  } = props.sharedProps;
  const project = projects[0]
  const { width, height } = props.dimensions;
  const [gltf, setGltf] = useState([]);
  const [selection, setSelection] = useState([]);
  const [queryId, setQueryId] = useState(selectionId);

  async function getLocalIdentifier(element, store) {
    for (const model of gltf) {
      const se_qe = newEngine();
      const queryLE = `
          PREFIX lbd: <https://lbdserver.org/vocabulary#>
          PREFIX dcat: <http://www.w3.org/ns/dcat#>
          SELECT DISTINCT ?elementId WHERE {
            <${element}> lbd:hasLinkElement ?le . ?le lbd:hasDocument <${model.main}> ; lbd:hasIdentifier ?identifier . ?identifier lbd:identifier ?elementId . 
          }`;

      const le_results = await se_qe.query(queryLE, {
        sources: [model.artefactRegistry],
      });
      const bindings = await le_results.bindings();
      return bindings.map((b) => {
        return {
          local: b.get("?elementId").id.replaceAll('"', ""),
          global: element,
        };
      });
    }
  }

  async function setViewerSelection(arr) {
    const promisified = arr.filter((el) => !selection.map(i => i.global).includes(el.global)).map((el) => el.global.map(art => getLocalIdentifier(art, store)));
    const selectionArray = await Promise.all(promisified.flat());
    setSelection(selectionArray.flat());
  }

  useEffect(() => {
    if (selectedElements.length > 0) {
      setViewerSelection(selectedElements);
    } else {
      setViewerSelection([])
    }
  }, [selectedElements]);

  useEffect(() => {
    console.log("reset selection id");
    setSelection((sel) => []);
  }, [selectionId]);

  useEffect(() => {
    const gltfModels = activeResources.filter((el) =>
      el.main.endsWith(".gltf")
    );  
    setGltf(gltfModels)
  }, [activeResources]);

  async function getGltfMetadata() {
    // SHORTCUT: only gltf models with a LinkElementRegistry will be displayed! FIX
    const gltfModels = activeResources.filter((el) =>
      el.main.endsWith(".gltf")
    );
    
    // if (gltfModels.length === 0) setGltf([]);
    // const currentModels = {};
    // for (const model of gltfModels) {
    //   console.log(`model`, model)
    //   if (!gltf.map((e) => e.main).includes(model.main)) {
//         const gltf_qe = newEngine();
//         const q = `
// PREFIX lbd: <https://lbdserver.org/vocabulary#>
// PREFIX dcat: <http://www.w3.org/ns/dcat#>
// SELECT ?leReg WHERE {
//   ?source dcat:downloadURL <${model.resource}>; lbd:hasLinkElementRegistry ?leReg . 
// }`;
//         const reg_results = await gltf_qe.query(q, {
//           sources: [model.metadata],
//         });

//         reg_results.bindingsStream.on("data", (item) => {
//           if (!Object.keys(currentModels).includes(model.main)) {
//             currentModels[model.main] = [item.get("?leReg").id ]
//           } else {
//             currentModels[model.main].push(item.get("?leReg").id)
//           }
//         });

//         reg_results.bindingsStream.on("end", () => {
//           const modelList = Object.keys(currentModels).map((ler) => {
//             return {...model, linkElementRegistry: currentModels[ler]}
//           })
        
          // setGltf(modelList);
        // });
      // }
    // }
  }

  async function onSelect(items) {
    const myArtReg = await getMyArtefactRegistry(session, project)
    console.log(`myArtReg`, myArtReg)
    const qid = v4();
    setQueryId(qid);
    setSelection([]);
    setSelectedElements([]);
    setSelectionId(qid);

    // for (const i of items) {
    //   await getAliases(i, gltf[0], activeResources, {project: true, artefactRegistry: project.global.replace("/profile/card#me", "/data/artefactRegistry.ttl")}, session)
    // }

    const queryEngine = newEngine();
    // find global sameAs graph
    for (const item of items) {
      // find link element in gltf.props.ttl
      const linkElementQuery = `
    PREFIX lbd: <https://lbdserver.org/vocabulary#>
    SELECT ?art WHERE {
      ?art lbd:hasLinkElement ?le .
      ?le lbd:hasIdentifier ?id . 
      ?id lbd:identifier "${item}" .
    }`;

      const le_results = await queryEngine.query(linkElementQuery, {sources: [...gltf.map(e => e.artefactRegistry), myArtReg]});

      le_results.bindingsStream.on("data", async (binding) => {
        const art = binding.get("?art").id;
        console.log(`art`, art)
        setSelection((sel) => [
          ...sel,
          {
            local: item,
            global: art,
          },
        ]);

      // find link element in gltf.props.ttl
      const sameAsQuery = `
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      SELECT ?alias WHERE {
        ?alias owl:sameAs <${art}>.
      }`;

      const sameResults = await queryEngine.query(sameAsQuery, {sources: [...activeResources.map(e => e.artefactRegistry), myArtReg]});
      const sameBindings = await sameResults.bindings()
      const aliases = sameBindings.map(element => {
        return {global: [element.get('?alias').id], selectionId: qid}        
      });

      // const sameAsQuery2 = `
      // PREFIX owl: <http://www.w3.org/2002/07/owl#>
      // SELECT ?alias WHERE {
      //   <${art}> owl:sameAs ?alias
      // }`;


      // const sameResults2 = await queryEngine.query(sameAsQuery2, {sources: [...activeResources.map(e => e.artefactRegistry), myArtReg]});
      // const sameBindings2 = await sameResults2.bindings()
      // const aliases2 = sameBindings2.map(element => {
      //   return {global: [element.get('?alias').id], selectionId: qid}        
      // });

      // const allAlias = [...new Set([...aliases2, aliases])]
      // console.log(`allAlias`, allAlias)
      setSelectedElements((sel) => [
          ...sel,
          ...aliases,
          { global: [art], selectionId: qid }, // you need to find the owl:sameAs aliases as well when no global artefactregistry is present
        ]);
      });
    }

    //   const query = `
    //   PREFIX lbd: <https://lbdserver.org/vocabulary#>
    //   PREFIX owl: <http://www.w3.org/2002/07/owl#>
    //   PREFIX omg: <https://w3id.org/omg#>
    //   PREFIX fog: <https://w3id/fog#>
    //   PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    //   SELECT ?local ?global WHERE {

    //     ?local lbd:globalReference ?global ;
    //       omg:hasGeometry ?geom1 .
    //     ?geom1 fog:hasGltfId-meshName "${item}" ;
    //       omg:partOfGeometry ?geom2 .
    //     ?geom2 fog:asGltf_v2.0-gltf "${gltf[0]}"^^xsd:anyURI .
    //   }`

    //   const results = await queryEngine.query(query, { sources: [project.local + "artefactRegistry.ttl"] });
    //   const global = results.results.bindings[0].global.value
    //   const local = results.results.bindings[0].local.value
    //   console.log(`global, local`, global, local)
    //   const q2 = `
    //   PREFIX lbd: <https://lbdserver.org/vocabulary#>
    //   PREFIX owl: <http://www.w3.org/2002/07/owl#>
    //   PREFIX dct: <http://purl.org/dc/terms/>
    //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    //   SELECT ?item ?ref ?source WHERE {
    //     <${global}> owl:sameAs ?item .
    //     ?item dct:isReferencedBy ?source .
    //     OPTIONAL {?item rdfs:seeAlso ?ref . } .
    //   }
    //   `
    //   const queryEngine2 = new QueryEngineComunicaSolid()

    //   const graph = await queryEngine2.query(q2, { sources: [global.split("#")[0]] });
  }

  return (
    <div style={{ textAlign: "center", width, height }}>
      {gltf.length > 0 ? (
        <Viewer
          height={"100%"}
          width={"100%"}
          // width={(context.plugin ? `${100 - parseInt(drawerWidth.substring(0, drawerWidth.length - 1)+80)}%` : "100%")}
          models={gltf.map((e) => e.main)}
          projection={"perspective"}
          onSelect={onSelect}
          selection={selection.map((e) => e.local)}
        />
      ) : (
        <div>
          <p style={{ paddingTop: "10%" }}>No glTF models selected </p>
        </div>
      )}
    </div>
  );
};

export default LBDviewer;
