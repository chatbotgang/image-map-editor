import React from 'react';

import { useUploader } from '../../../reducers';
import { Coordinate } from '../../../types';

import styles from '../uploader.module.css';

const UploaderLayerIndicator = ({
  serial,
  coordinate,
}: {
  serial: number;
  coordinate: Coordinate;
}) => {
  const { x, y, width, height } = coordinate;
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y - height / 2 + 8}px`,
        left: `${x - width / 2 + 8}px`,
      }}
      className={styles.uploaderLayerIndicator}
    >
      {serial}
    </div>
  );
};

export const UploaderLayerIndicators = () => {
  const { uploader } = useUploader();
  return (
    <div className={styles.uploaderLayerIndicators}>
      {uploader.coordinates.map((c, i) => (
        <UploaderLayerIndicator key={c.id} serial={i + 1} coordinate={c} />
      ))}
    </div>
  );
};
