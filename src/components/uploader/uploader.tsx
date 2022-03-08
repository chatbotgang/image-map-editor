import React from 'react';

import styles from './uploader.module.css';

function UploaderHeader() {
  return (
    <div className={styles.uploaderHeader}>
      <div className={styles.uploaderHeader__icon} />
    </div>
  );
}

function UploaderUploadArea() {
  return (
    <div className={styles.uploaderUploadArea}>
      <p>Upload image</p>
    </div>
  );
}

function Uploader() {
  return (
    <div className={styles.uploader}>
      <UploaderHeader />
      <UploaderUploadArea />
    </div>
  );
}

export default Uploader;
