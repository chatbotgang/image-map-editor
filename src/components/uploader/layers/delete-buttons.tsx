import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { UploaderEnum, useUploader } from '../../../reducers';
import { Coordinate } from '../../../types';

import styles from '../uploader.module.css';

const UploaderLayerDeleteButton = ({
  coordinate,
}: {
  coordinate: Coordinate;
}) => {
  const { dispatch } = useUploader();
  const { x, y, width, height } = coordinate;
  return (
    <button
      className={styles.uploaderLayerDeleteButton}
      style={{
        position: 'absolute',
        top: `${y - height / 2 - 2}px`,
        left: `${x + width / 2 + 6}px`,
      }}
      onClick={() =>
        dispatch({ type: UploaderEnum.DeleteCoordinate, payload: coordinate })
      }
    >
      <FontAwesomeIcon icon={faTrashAlt} color="#c7c7d0" size="lg" />
    </button>
  );
};

export const UploaderLayerDeleteButtons = () => {
  const { uploader } = useUploader();
  return (
    <div className={styles.uploaderLayerDeleteButtons}>
      {uploader.coordinates.map((c) => (
        <UploaderLayerDeleteButton key={c.id} coordinate={c} />
      ))}
    </div>
  );
};
