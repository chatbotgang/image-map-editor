import React, { SyntheticEvent } from 'react';

import styles from '../uploader.module.css';
import { UploaderEnum, useUploader } from '../../../reducers';

export const UploaderLayerImage = () => {
  const { uploader, dispatch } = useUploader();
  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight, width, height } =
      event.target as HTMLImageElement;
    dispatch({
      type: UploaderEnum.SetOriginalImageWidth,
      payload: naturalWidth,
    });
    dispatch({
      type: UploaderEnum.SetOriginalImageHeight,
      payload: naturalHeight,
    });
    dispatch({ type: UploaderEnum.SetStageWidth, payload: width });
    dispatch({ type: UploaderEnum.SetStageHeight, payload: height });
    dispatch({ type: UploaderEnum.SetRatio, payload: width / naturalWidth });
  };
  if (!uploader.originalImageSrc) {
    return null;
  }
  return (
    <img
      src={uploader.originalImageSrc}
      alt={uploader.originalImageName}
      draggable={false}
      onLoad={handleImageLoad}
      className={styles.uploaderLayerImage}
    />
  );
};
