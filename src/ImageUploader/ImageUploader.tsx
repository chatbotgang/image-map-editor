import React, { useRef, useCallback } from 'react';
import { ImageInput, StyledImageIcon, Button } from './ImageUploader.style';

export type OnChangeCallback = (url: string) => void;

export interface Props {
  onChange: OnChangeCallback;
}

const ImageUploader = ({ onChange }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickUploader = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);
  const handleSelectImage = useCallback(
    ({
      target: {
        files: [file],
      },
    }) => {
      const url = URL.createObjectURL(file);
      if (url) {
        onChange(url);
      }
    },
    [onChange],
  );
  return (
    <>
      <ImageInput ref={inputRef} value="" onChange={handleSelectImage} />
      <Button onClick={handleClickUploader}>
        <StyledImageIcon />
        Upload image
      </Button>
    </>
  );
};

export default ImageUploader;
