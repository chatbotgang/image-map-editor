import { useState } from 'react';
import { useEditor } from './editor.context';
import ImageDropzone from './image-dropzone';
import ImageCanvas from './image-canvas';
import ImageSelection from './image-selection';
import * as Styled from './image-group.style';

const width = 355;

const ImageGroup = () => {
  const {
    imgData,
    selections,
  } = useEditor();

  const [isDrawing, setIsDrawing] = useState(false);
  const handleDrawStart = () => setIsDrawing(true);
  const handleDrawStop = () => setIsDrawing(false);
  
  return (
    <Styled.Group width={width}>
      {!imgData && <ImageDropzone />}
      {imgData && (
        <Styled.ImageBoundary>
          <ImageCanvas
            width={width}
            height={width * imgData.aspectRatio}
            data-image-canvas=""
            onDrawStart={handleDrawStart}
            onDrawStop={handleDrawStop}
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
      )}
    </Styled.Group>
  );
};

export default ImageGroup;
