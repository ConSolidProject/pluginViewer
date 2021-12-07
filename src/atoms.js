import {atom} from 'recoil'
import {Session} from "@inrupt/solid-client-authn-browser"
const N3 = require("n3");

const session = atom({
    key: "session",
    default: new Session()
})


const store = atom({
    key: "store", 
    default: new N3.Store()
})


const projects = atom({
    key: "projects",
    default: ["https://pod.lbdserver.org/jeroen/lbd/f65db6eb-fc13-4ee7-955a-cf93fdf29d5b/"]
})

const datasets = atom({
    key: "datasets",
    default: [{main: "https://pod.lbdserver.org/pieter/lbd/f65db6eb-fc13-4ee7-955a-cf93fdf29d5b/architectural_duplex.gltf", meta: "https://pod.lbdserver.org/pieter/lbd/f65db6eb-fc13-4ee7-955a-cf93fdf29d5b/architectural_duplex.gltf.props.ttl", artefactRegistry: "https://pod.lbdserver.org/pieter/lbd/f65db6eb-fc13-4ee7-955a-cf93fdf29d5b/artefactRegistry.ttl"}]
})

const selectedElements = atom({
    key: "selectedElements",
    default: []
})

const selectionId = atom({
    key: "selectionId",
    default: ""
})

const trigger = atom({
    key: "trigger",
    default: '0'
})

export {session, projects, datasets, selectedElements, selectionId, trigger, store}