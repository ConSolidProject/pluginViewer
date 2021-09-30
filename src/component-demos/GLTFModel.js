import React from "react";
import { sampleModel1 } from "../models";
import { GLTFViewer } from "../Viewers";

const GLTFModel = (props) => {
  console.log(`props.models`, props.models)
  return (
    <div>
      <GLTFViewer
        canvasID="canvas-gltf"
        width={600}
        height={600}
        models={props.models.map((model) =>{return { src: model.main}})}
      />
    </div>
  );
};

export default GLTFModel;
