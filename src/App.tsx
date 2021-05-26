import SelectedBlock from './containers/selectedBlock'
import PictureBlock from './containers/pictureBlock'
import './App.css';
import styled from 'styled-components'

const AppFrame = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: center;
  // border: 1px solid black;
  justify-content: center;
  width: 100%
`

const ContentSpace = styled.div`
  display:flex;
  width:1116px;
  height:792px;
  justify-content: space-between;
  margin: 50px;
`

const InbetweenDiv = styled.div`
  width:135px;
`


function App() {
  return (
    <AppFrame>
      <ContentSpace>

        <PictureBlock></PictureBlock>
        <InbetweenDiv></InbetweenDiv>
        <SelectedBlock></SelectedBlock>

      </ContentSpace>
    </AppFrame>
  );
}

export default App;
