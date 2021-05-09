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
    { setImage, setInfo, setMouseDown, setMouseUp },
  ] = useAppReducer();
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
              records={records}
              onLoad={setInfo}
              onRecordStart={setMouseDown}
              onRecordEnd={setMouseUp}
            />
          )}
        </Main>
        <Console info={info} records={records} />
      </Inner>
    </Outer>
  );
};

export default App;
