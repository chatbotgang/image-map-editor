import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="image-block">
        <div className="image-header">
          <div className="image-header-circle">
          </div>
        </div>
        <div className="image-body">
          <div className="image-body-upload disable-select">
            <div><img className="icon" src="photo.svg" /></div>
            <div>Upload image</div>
          </div>
        </div>
      </div>
      <div className="console-block">
      </div>
    </div>
  );
}

export default App;
