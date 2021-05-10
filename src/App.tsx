import React from 'react';
import Main from './Main';
import useAppReducer from './useAppReducer';
import ImageUploader from './ImageUploader';
import RecordableImage from './RecordableImage';
import Console from './Console';
import { Outer, Inner } from './App.style';

const App: React.FC = () => {
  const [
    { id, src, info, mouseDownData, records },
    { setImage, setInfo, setMouseDown, setMouseUp, pullRecord },
  ] = useAppReducer();
  const filteredRecords = records.filter(({ removed }) => !removed);
  return (
    <Outer>
      <Inner>
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
      </Inner>
    </Outer>
  );
};

export default App;
