import { useReducer } from 'react';
import style from 'styled-components';
import { appContext as AppContext, appState, appReducer } from './store/appContext';
import ImageViewer from './components/ImageViewer';
import DataViewer from './components/DataViewer';

const AppWrapper = style.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 135px;
`;

function App() {
  const [state, dispatch] = useReducer(appReducer, appState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppWrapper>
        <ImageViewer />
        <DataViewer blocks={state.blocks} />
      </AppWrapper>
    </AppContext.Provider>
  );
}

export default App;
