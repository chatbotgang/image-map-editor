import React from 'react';

import styles from '../uploader.module.css';
import { useUploader } from '../../../reducers';

function UploaderUploadAreaPreview() {
  const { uploader } = useUploader();
  if (!uploader.originalImageSrc) {
    return null;
  }
  return (
    <div className={styles.uploaderUploadAreaPreview}>
      <img
        src={uploader.originalImageSrc}
        alt={uploader.originalImageName}
        draggable={false}
        className={styles.uploaderUploadAreaPreview__image}
      />
    </div>
  );
}

export default UploaderUploadAreaPreview;
