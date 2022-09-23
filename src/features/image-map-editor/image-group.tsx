import { useState } from 'react';
import { useEditor } from './editor.context';
import ImageDropzone from './image-dropzone';
import ImageCanvas from './image-canvas';
import ImageSelection from './image-selection';
import * as Styled from './image-group.style';

const ImageGroup = () => {
  const { imgData, selections } = useEditor();
  const [isDrawing, setIsDrawing] = useState(false);
  
  if (!imgData) return (
    <ImageDropzone />
  );
  
  return (
    <Styled.ImageBoundary>
      <ImageCanvas
        onDrawStart={() => setIsDrawing(true)}
        onDrawEnd={() => setIsDrawing(false)}
      />
      {selections.map((selection, index) => (
        <ImageSelection
          key={selection.id}
          order={index + 1}
          selection={selection}
          isDrawing={isDrawing}
        />
      ))}
    </Styled.ImageBoundary>
  )
};

export default ImageGroup;
