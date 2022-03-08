import React from 'react';

import styles from '../uploader.module.css';

function UploaderUploadAreaPreview({
  imageSrc,
  imageName,
}: {
  imageSrc?: string;
  imageName?: string;
}) {
  if (!imageSrc) {
    return null;
  }
  return (
    <div className={styles.uploaderUploadAreaPreview}>
      <img
        src={imageSrc}
        alt={imageName}
        draggable={false}
        className={styles.uploaderUploadAreaPreview__image}
      />
    </div>
  );
}

export default UploaderUploadAreaPreview;
