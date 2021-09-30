import React from 'react';
import { xktModel } from '../models';
import { XKTViewer } from '../Viewers';

const XKTModel = () => (
  <div>
    <XKTViewer
      canvasID="canvas-xkt"
      width={600}
      height={600}
      models={[xktModel]}
    />
  </div>
);

export default XKTModel;
