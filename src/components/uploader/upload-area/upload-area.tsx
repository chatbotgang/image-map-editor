import React from 'react';

import classNames from 'classnames';

import UploaderUploadAreaInput from './input';
import UploaderUploadAreaPreview from './preview';
import { useUploader } from '../../../reducers';

import styles from '../uploader.module.css';

function UploaderUploadArea() {
  const { uploader } = useUploader();
  return (
    <div
      className={classNames({
        [styles.uploaderUploadArea]: true,
        [styles['uploaderUploadArea--transparent']]:
          !!uploader.originalImageSrc,
      })}
    >
      <UploaderUploadAreaInput />
      <UploaderUploadAreaPreview />
    </div>
  );
}

export default UploaderUploadArea;
