import React from 'react';
import './App.css';
import ImageMapEditor from './components/ImageMapEditor';

function App() {
  return (
    <div className="App">
      <ImageMapEditor mappings={[]} uploadedImage='' />
    </div>
  );
}

export default App;
