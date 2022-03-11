import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import styles from '../uploader.module.css';
import { UploaderEnum, useUploader } from '../../../reducers';

function UploaderUploadAreaInput() {
  const { dispatch } = useUploader();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image')) {
      window.alert('Unsupported file type! Please upload an image.');
      event.target.value = '';
      return;
    }
    dispatch({
      type: UploaderEnum.SetOriginalImageSrc,
      payload: URL.createObjectURL(file),
    });
    dispatch({ type: UploaderEnum.SetOriginalImageName, payload: file.name });
  };
  return (
    <>
      <div className={styles.uploaderUploadAreaInput__text}>
        <p>Image upload</p>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.uploaderUploadAreaInput__action}
      />
    </>
  );
}

export default UploaderUploadAreaInput;
