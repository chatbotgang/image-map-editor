import React from 'react';

import Preview from './components/preview/preview';
import Uploader from './components/uploader/uploader';

import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Uploader />
      <Preview />
    </div>
  );
}

export default App;
