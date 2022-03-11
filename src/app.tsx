import React, { ReactNode, useReducer } from 'react';

import Preview from './components/preview/preview';
import Uploader from './components/uploader/uploader';

import styles from './app.module.css';
import { appReducer, appState, AppContext } from './reducers/app';

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, appState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

function App() {
  return (
    <div className={styles.app}>
      <AppContextProvider>
        <Uploader />
        <Preview />
      </AppContextProvider>
    </div>
  );
}

export default App;
