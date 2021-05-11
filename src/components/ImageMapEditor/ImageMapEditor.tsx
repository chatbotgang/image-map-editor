import React from 'react';
import useAppReducer from './useAppReducer';
import Main from './Main';
import ImageUploader from './ImageUploader';
import RecordableImage from './RecordableImage';
import Console from './Console';

const ImageMapEditor = (): JSX.Element => {
  const [
    { id, src, info, mouseDownData, records },
    { setImage, setInfo, setMouseDown, setMouseUp, pullRecord },
  ] = useAppReducer();
  const filteredRecords = records.filter(({ removed }) => !removed);
  return (
    <>
      <Main>
        {src === '' ? (
          <ImageUploader onChange={setImage} />
        ) : (
          <RecordableImage
            id={id}
            src={src}
            info={info}
            mouseDownData={mouseDownData}
            records={filteredRecords}
            onLoad={setInfo}
            onRecordStart={setMouseDown}
            onRecordEnd={setMouseUp}
            onRecordDelete={pullRecord}
          />
        )}
      </Main>
      <Console info={info} records={filteredRecords} />
    </>
  );
};

export default ImageMapEditor;
