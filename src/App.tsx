import React from 'react';
import ImageMapEditor from './components/ImageMapEditor';
import { Outer, Inner } from './App.style';

const App = (): JSX.Element => {
  return (
    <Outer>
      <Inner>
        <ImageMapEditor />
      </Inner>
    </Outer>
  );
};

export default App;
