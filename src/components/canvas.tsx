import React, {FunctionComponent} from 'react';

interface props {
    image: string;
}

const  Canvas: FunctionComponent<props> = ({image}) => {
  return (
   <img src={image} alt="image" className="canvas" width="355" height="auto" draggable="false" />
  );
}

export default Canvas;