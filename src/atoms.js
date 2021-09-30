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
    default: ["http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/"]
})

const activeResources = atom({
    key: "activeResources",
    default: [{main: "http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/architectural_duplex.gltf", meta: "http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/architectural_duplex.gltf.props.ttl"}]
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

export {session, projects, activeResources, selectedElements, selectionId, trigger, store}