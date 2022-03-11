import React, { useEffect, useRef, useState } from 'react';

import styles from '../uploader.module.css';
import { UploaderEnum, useUploader } from '../../../reducers';

export const UploaderLayerImage = () => {
  const { uploader, dispatch } = useUploader();
  const [configured, setConfigured] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!imageRef?.current || configured) {
      return;
    }
    const { naturalWidth, naturalHeight, width, height } = imageRef.current;
    dispatch({
      type: UploaderEnum.SetOriginalImageWidth,
      payload: naturalWidth,
    });
    dispatch({
      type: UploaderEnum.SetOriginalImageHeight,
      payload: naturalHeight,
    });
    dispatch({
      type: UploaderEnum.SetStageWidth,
      payload: width,
    });
    dispatch({
      type: UploaderEnum.SetStageHeight,
      payload: height,
    });
    dispatch({
      type: UploaderEnum.SetRatio,
      payload: width / naturalWidth,
    });
    console.log({ naturalWidth, naturalHeight, width, height });
    setConfigured(!!naturalWidth);
  });
  if (!uploader.originalImageSrc) {
    return null;
  }
  return (
    <img
      ref={imageRef}
      src={uploader.originalImageSrc}
      alt={uploader.originalImageName}
      draggable={false}
      className={styles.uploaderLayerImage}
    />
  );
};
