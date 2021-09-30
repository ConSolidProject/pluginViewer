import React, {useEffect, useState} from "react";
import { GLTFViewer } from "./Viewers";
import { sampleModel1 } from "./models";
import { sampleNavCubeSettings } from "./navcube_settings";
import LBDviewer from "./CustomViewer"
import GLTFModel from "./component-demos/GLTFModel"
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import {Select, MenuItem, Button, InputLabel, FormControl, FormHelperText} from "@material-ui/core"

const packageJSON = require('../package.json')

const generateClassname = createGenerateClassName({
  productionPrefix: packageJSON.name,
  seed: packageJSON.name,
});

const App = (props) => {
  const {sharedProps, inactive} = props
  const {
    session,
    activeResources,
    projects,
    selectedElements,
    setSelectedElements,
    selectionId,
    setSelectionId,
  } = sharedProps;
  const project = projects[0]
  
  const { width, height } = props.module.dimensions;

  const [gltf, setGltf] = useState([]);
  const [selection, setSelection] = useState([]);
  const [queryId, setQueryId] = useState(selectionId);


  useEffect(() => {
    const gltfModels = activeResources.filter((el) =>
      el.main.endsWith(".gltf")
    );  
    setGltf(gltfModels)
  }, [activeResources]);


  if (inactive) return <></>

  return (
    <StylesProvider generateClassName={generateClassname}>

    <div>
      <LBDviewer {...props} dimensions={{width: props.module.dimensions.w, height: props.module.dimensions.h}}/>
    </div>
    </StylesProvider>
      // <GLTFViewer
      //   canvasID={props.canvasId || "canvas-4"}
      //   width={width || 600}
      //   height={height || 600}
      //   models={[sampleModel1]}
      //   navCubeSettings={{ ...sampleNavCubeSettings, canvasId: props.navId }}
      //   eventToPickOn={"mouseclicked"}
      //   onSelect={props.onSelect || console.log}
      // />
  );
};

export default App;
