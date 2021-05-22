import React from 'react';
import SelectedBlocks from './container/selectedBlocks'
import Picture from './container/picture'
import './App.css';
import styled from 'styled-components'


const AppFrame = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: center;
  // border: 1px solid black;
  justify-content: center;
`

const ContentSpace = styled.div`
  display:flex;
  width:1116px;
  height:792px;
  justify-content: space-between;
  margin: 50px;

`



function App() {
  return (
    <AppFrame>
      <ContentSpace>

        <Picture></Picture>
        <SelectedBlocks></SelectedBlocks>

      </ContentSpace>
    </AppFrame>
  );
}

export default App;
