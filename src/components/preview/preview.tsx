import React, { useEffect, useState } from 'react';

import styles from './preview.module.css';
import { useUploader } from '../../reducers';
import { Dimension, Point } from '../../types';

interface FormattedCoordinate extends Point, Dimension {}

function Preview() {
  const { uploader } = useUploader();
  const [data, setData] = useState([] as FormattedCoordinate[]);
  const { ratio, coordinates } = uploader;
  useEffect(() => {
    setData(
      coordinates.map(({ x, y, width, height }) => ({
        x: x / ratio,
        y: y / ratio,
        width: width / ratio,
        height: height / ratio,
      }))
    );
  }, [coordinates, ratio]);
  return <pre className={styles.preview}>{JSON.stringify(data, null, 2)}</pre>;
}

export default Preview;
