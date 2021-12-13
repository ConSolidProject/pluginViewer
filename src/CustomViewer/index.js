import React, { useState, useEffect } from "react";
import Viewer from "./Viewer";
import {getAliases, getMyArtefactRegistry, findReferenceEndpoints, getLdpMembers} from 'consolid'
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
  const models = props.models
  const {
    session,
    datasets,
    projects,
    selectedElements,
    setSelectedElements,
    selectionId,
    setSelectionId,
    store
  } = props.sharedProps;

  const project = projects[Object.keys(projects)[0]]

  const references = []
  // Object.keys(project).map((p) => {
  //   return project[p].ref.accessURL
  // })

  const { width, height } = props.dimensions;
  const [gltf, setGltf] = useState([]);
  const [selection, setSelection] = useState([]);
  const [queryId, setQueryId] = useState(selectionId);
  const [localId, setLocalId] = useState(null)

  async function getLocalIdentifier(element, store) {
    try {
      for (const model of models) {

        const queryLE = `
            PREFIX lbd: <https://lbdserver.org/vocabulary#>
            PREFIX dcat: <http://www.w3.org/ns/dcat#>
            SELECT ?elementId WHERE {
              <${element}> lbd:hasReference ?le . ?le lbd:hasIdentifier ?identifier . ?identifier lbd:identifier ?elementId ; lbd:hasDistribution <${model.distribution}> . 
            }`;
          
        const answer = []
        for (const ref of references) {
          const url = encodeURI(ref + queryLE).replaceAll("#", "%23")
          const data = await session.fetch(url)
          const bindings = await data.json()
          bindings.results.bindings.forEach(b => {
            answer.push({
              local: b.elementId.value,
              global: element,
            });
        })}


        return answer
        // const le_results = await se_qe.query(queryLE, {
        //   sources: references,
        // });
        // const bindings = await le_results.bindings(le_results)
        // return bindings.map((b) => {
        //   return {
        //     local: b.get("?elementId").id.replaceAll('"', ""),
        //     global: element,
        //   };
        // });
      }
    } catch (error) {
      console.log(`error in viewer`, error)
    }
  }


  async function getLocalIdentifierMongo(items, dataset) {
    const raw = JSON.stringify({items, dataset})
    var requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: raw,
    };
    const res = await session.fetch("http://localhost:5001/selection", requestOptions).then((r) => r.json())
    return res
  }

  async function setViewerSelection(arr) {
    // const all = arr.map(el => el.global).flat()
    // const promisified = all.filter((el) => !selection.map(i => i.global).includes(el))
    //                         .map((art) => getLocalIdentifier(art, store));
    // const selectionArray = await Promise.all(promisified.flat());
    const selectionArray = []
    for (const model of models) {
      let selection = arr.map(thing => thing.references).flat().filter(t => t.datasets.includes(model.dataset)).map(i => i.id)
      console.log(`selection`, selection)
      selectionArray.push(selection)
    }
    if (selectionArray.length > 0) {
      console.log(`selectionArray.flat()`, selectionArray.flat())
      setSelection(selectionArray.flat());
    }
  }

  useEffect(() => {
    console.log(`selectedElements`, selectedElements)
    if (selectedElements.length > 0) {
      setViewerSelection(selectedElements);
    }
  }, [selectedElements]);


  async function onSelect(items) {
    const part = await getLdpMembers(project, session)
    const references = await findReferenceEndpoints(part, session)
    const sel = []
    for (const model of models) {
      for (const ref of references) {
        const options = {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({"selection": [{dataset: model.dataset, identifiers: items}]})
        }
        const viewerSelection = await session.fetch(ref + '/storage/query', options).then(r => r.json())
        
        if (viewerSelection.length > 0 && viewerSelection[0].alias) {
          for (const a of viewerSelection[0].alias) {
            console.log(`a`, a)
            const alias = await session.fetch(a).then(i => i.json())
            console.log(`alias`, alias)
            sel.push(alias)
          }
        }
        sel.push(viewerSelection)
      }
    }
    console.log(`sel`, sel.flat())
    setSelectedElements(sel.flat())
  }

  return (
    <div style={{ textAlign: "center", width, height }}>
      {models.length > 0 ? (
        <Viewer
          height={"100%"}
          width={"100%"}
          // width={(context.plugin ? `${100 - parseInt(drawerWidth.substring(0, drawerWidth.length - 1)+80)}%` : "100%")}
          models={models.map(m => m.url)}
          projection={"perspective"}
          onSelect={onSelect}
          selection={selection}
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
