import React from 'react';
import ImagePane from './components/ImagePane'
import DataPane from './components/DataPane'

import styled from 'styled-components'

type AppProps = {
  className?: string
}

const AppJSX = ({className}: AppProps) => {
  return (
    <div className={`App ${className}`}>
     <ImagePane/>
     <DataPane/>
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
