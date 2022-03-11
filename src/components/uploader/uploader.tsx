import React from 'react';

import classNames from 'classnames';

import {
  UploaderLayerCanvas,
  UploaderLayerDeleteButtons,
  UploaderLayerImage,
  UploaderLayerInput,
} from './layers';

import styles from './uploader.module.css';
import { useUploader } from '../../reducers';

function UploaderHeader() {
  return (
    <div className={styles.uploaderHeader}>
      <div className={styles.uploaderHeader__icon} />
    </div>
  );
}

function UploaderEditor({ hidden }: { hidden?: boolean }) {
  if (hidden) {
    return null;
  }
  return (
    <div className={styles.uploaderLayers}>
      <UploaderLayerImage />
      <UploaderLayerCanvas />
      <UploaderLayerDeleteButtons />
    </div>
  );
}

function Uploader() {
  const { uploader } = useUploader();
  const hasImg = !!uploader.originalImageSrc;
  return (
    <div className={styles.uploader}>
      <UploaderHeader />
      <div
        className={classNames({
          [styles.uploaderUploadArea]: true,
          [styles['uploaderUploadArea--transparent']]: hasImg,
        })}
      >
        {!hasImg ? <UploaderLayerInput /> : <UploaderEditor />}
      </div>
    </div>
  );
}

export default Uploader;
