import React, { useState } from 'react';

import classNames from 'classnames';

import UploaderUploadAreaInput from './input';
import UploaderUploadAreaPreview from './preview';

import styles from '../uploader.module.css';

function UploaderUploadArea() {
  const [imageSrc, setImageSrc] = useState('');
  const [imageName, setImageName] = useState('');
  return (
    <div
      className={classNames({
        [styles.uploaderUploadArea]: true,
        [styles['uploaderUploadArea--transparent']]: !!imageSrc,
      })}
    >
      <UploaderUploadAreaInput
        setImageSrc={setImageSrc}
        setImageName={setImageName}
      />
      <UploaderUploadAreaPreview imageSrc={imageSrc} imageName={imageName} />
    </div>
  );
}

export default UploaderUploadArea;
