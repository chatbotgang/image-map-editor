import styled from 'styled-components'

import CanvasContextProvider from './contexts/CanvasContextProvider';
import ImagePane from './components/ImagePane'
import DataPane from './components/DataPane'


type AppProps = {
  className?: string
}

const AppJSX = ({className}: AppProps) => {
  return (
    <div className={`App ${className}`}>
      <CanvasContextProvider>
       <ImagePane/>
       <DataPane/>
      </CanvasContextProvider>
    </div>
  );
}

const App = styled(AppJSX)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 135px;
  padding: 50px 20px;
`

export default App;
