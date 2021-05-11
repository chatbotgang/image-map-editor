import React, { useState, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import {
  ImageInfo,
  MouseEventData,
  RectItem,
  enhanceRecord,
  Actions,
} from '../useAppReducer';
import RecordItem from './RecordItem';
import { Image, Container } from './RecordableImage.style';

export interface Props {
  id: number;
  src: string;
  info: ImageInfo | null;
  mouseDownData: MouseEventData | null;
  records: RectItem[];
  onLoad: Actions['setInfo'];
  onRecordStart: Actions['setMouseDown'];
  onRecordEnd: Actions['setMouseUp'];
  onRecordDelete: Actions['pullRecord'];
}

const emptyFunc = () => {};

const RecordableImage = ({
  id,
  src,
  info,
  mouseDownData,
  records,
  onLoad,
  onRecordStart,
  onRecordEnd,
  onRecordDelete,
}: Props): JSX.Element => {
  const [tempMouseData, setTempMouseData] = useState<MouseEventData | null>(
    null,
  );
  const handleLoadImage = useCallback(
    ({ target }) => {
      if (target) {
        onLoad({
          offsetLeft: target.offsetParent.offsetLeft + 2,
          offsetTop: target.offsetParent.offsetTop + 2,
          offsetWidth: target.offsetWidth,
          offsetHeight: target.offsetHeight,
          naturalWidth: target.naturalWidth,
          naturalHeight: target.naturalHeight,
        });
      }
    },
    [onLoad],
  );
  const handleMouseDown = useCallback(
    ({ pageX, pageY }) => {
      onRecordStart({ pageX, pageY });
    },
    [onRecordStart],
  );
  const handleMouseUp = useCallback(
    ({ pageX, pageY }) => {
      setTempMouseData(null);
      onRecordEnd({ pageX, pageY });
    },
    [onRecordEnd],
  );
  const handleMouseMove = useMemo(
    () =>
      debounce(event => {
        if (mouseDownData === null) {
          return;
        }
        if (event.buttons === 0) {
          onRecordEnd(mouseDownData);
        } else {
          setTempMouseData({ pageX: event.pageX, pageY: event.pageY });
        }
      }, 5),
    [onRecordEnd, mouseDownData],
  );
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);
  return (
    <Container onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <Image onLoad={handleLoadImage} src={src} alt="selected" />
      {records.map((record, index) => (
        <RecordItem
          key={record.id}
          position={index + 1}
          readonly={false}
          record={record}
          onDelete={onRecordDelete}
        />
      ))}
      {info !== null && mouseDownData !== null && tempMouseData !== null && (
        <RecordItem
          position={records.length + 1}
          readonly
          record={enhanceRecord({
            info,
            record: {
              id: id + 1,
              left: Math.min(mouseDownData.pageX, tempMouseData.pageX),
              right: Math.max(mouseDownData.pageX, tempMouseData.pageX),
              top: Math.min(mouseDownData.pageY, tempMouseData.pageY),
              bottom: Math.max(mouseDownData.pageY, tempMouseData.pageY),
              removed: false,
            },
          })}
          onDelete={emptyFunc}
        />
      )}
    </Container>
  );
};

export default RecordableImage;
