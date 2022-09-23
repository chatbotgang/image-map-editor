import {
  useEffect,
  useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useEditor } from './editor.context';
import * as Styled from './image-dropzone.style';

const dropzoneOptions = {
  multiple: false,
  accept: {'image/*': ['.png', '.jpeg', '.jpg', '.svg']}
};

const ImageDropzone = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone(dropzoneOptions);
  const { dispatch } = useEditor();

  const addImg = useCallback((file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const imgData = {
        el: img,
        width: img.width,
        height: img.height,
        aspectRatio: img.height / img.width,
      };
      dispatch({ type: 'add-image', imgData })
    };
  }, [dispatch]);

  useEffect(() => {
    if (!acceptedFiles.length) return;
    const [file] = acceptedFiles;
    if (!file) return;
    addImg(file);
  }, [acceptedFiles, addImg]);

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
