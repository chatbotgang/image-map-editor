import React from 'react';

import UploaderUploadArea from './upload-area/upload-area';

import styles from './uploader.module.css';

function UploaderHeader() {
  return (
    <div className={styles.uploaderHeader}>
      <div className={styles.uploaderHeader__icon} />
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
