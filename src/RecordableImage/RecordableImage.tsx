import React, { useState, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import {
  ImageInfo,
  MouseEventData,
  Record,
  enhanceRecord,
} from '../useAppReducer';
import RecordItem from './RecordItem';
import { Image, Container } from './RecordableImage.style';

type OnLoadCallback = (info: ImageInfo) => void;
type OnRecordCallback = (data: MouseEventData) => void;

export interface Props {
  id: number;
  src: string;
  info: ImageInfo | null;
  mouseDownData: MouseEventData | null;
  records: Record[];
  onLoad: OnLoadCallback;
  onRecordStart: OnRecordCallback;
  onRecordEnd: OnRecordCallback;
}

const RecordableImage = ({
  id,
  src,
  info,
  mouseDownData,
  records,
  onLoad,
  onRecordStart,
  onRecordEnd,
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
      {records
        .filter(({ removed }) => !removed)
        .map(record => (
          <RecordItem key={record.id} record={record} />
        ))}
      {info !== null && mouseDownData !== null && tempMouseData !== null && (
        <RecordItem
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
        />
      )}
    </Container>
  );
};

export default RecordableImage;
