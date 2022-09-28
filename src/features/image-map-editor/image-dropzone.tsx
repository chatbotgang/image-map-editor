import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEditor } from './editor.context';
import * as Styled from './image-dropzone.style';

const ImageDropzone = () => {
  const { dispatch } = useEditor();
  const handleDropAccepted = useCallback(([file]) => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      dispatch({
        type: 'add-image',
        imgData: {
          el: img,
          width: img.width,
          height: img.height,
          aspectRatio: img.height / img.width,
        },
      });
    };
  }, [dispatch]);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple: false,
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.svg'] },
    onDropAccepted: handleDropAccepted,
  });


  return (
    <Styled.Root {...getRootProps()}>
      <input {...getInputProps()} />
      <Styled.HelperMessage>
        <Styled.UploadIcon />
        <span>Upload Image</span>
      </Styled.HelperMessage>
    </Styled.Root>
  );
};

export default ImageDropzone;
