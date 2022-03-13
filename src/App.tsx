import React from 'react';
import Playground from './components/playground';
import Results from './components/results';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container flex">
        <Playground/>
        <Results/>
      </div>
    </div>
  );
}

export default App;
