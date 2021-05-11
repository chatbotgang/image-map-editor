import React from 'react';
import { ImageInfo, RectItem } from '../useImageMapEditorReducer';
import { Container } from './Console.style';

interface ConsoleProps {
  info: ImageInfo | null;
  records: RectItem[];
}

interface DataProps {
  info: ImageInfo;
  records: RectItem[];
}

type MappedRecord = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const NoData = () => <>No Data</>;

const memoizedRecordMapper = ((map: Map<string, MappedRecord>) => {
  const getKey = (
    { left, right, top, bottom }: RectItem,
    ratio: number,
  ): string => `${left}-${right}-${top}-${bottom}-${ratio}`;
  return (record: RectItem, ratio: number): MappedRecord => {
    const key = getKey(record, ratio);
    const cached = map.get(key);
    if (cached) {
      return cached;
    }
    const { left, right, top, bottom } = record;
    const result = {
      x: Math.round(left * ratio),
      y: Math.round(top * ratio),
      width: Math.round((right - left) * ratio),
      height: Math.round((bottom - top) * ratio),
    };
    map.set(key, result);
    return result;
  };
})(new Map());

const Data = ({ info, records }: DataProps): JSX.Element => {
  const ratio = info.naturalWidth / info.offsetWidth;
  return (
    <>
      {JSON.stringify(
        records.map(record => memoizedRecordMapper(record, ratio)),
        null,
        2,
      )}
    </>
  );
};

const Console = ({ info, records }: ConsoleProps): JSX.Element => (
  <Container>
    {info === null ? <NoData /> : <Data info={info} records={records} />}
  </Container>
);

export default Console;
