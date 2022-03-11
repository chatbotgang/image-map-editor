import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

import styles from '../uploader.module.css';
import { UploaderEnum, useUploader } from '../../../reducers';

export const UploaderLayerInput = () => {
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
        <FontAwesomeIcon icon={faImage} size="lg" color="#c4c4c6" />
        <p>Upload image</p>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.uploaderUploadAreaInput__action}
      />
    </>
  );
};
