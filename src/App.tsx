import GlobalStyles from "./components/styles/Global";
import WorkSpace from "./components/WorkSpace";
import DataPanel from "./components/DataPanel";
import { StyledApp } from "./components/styles/App.styled";
import { ImageMapProvider } from "./context/ImageMapContext";

function App() {
  return (
    <ImageMapProvider>
      <GlobalStyles />
      <StyledApp>
        <WorkSpace />
        <DataPanel />
      </StyledApp>
    </ImageMapProvider>
  );
}

export default App;
