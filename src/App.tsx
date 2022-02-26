import "./App.css";
import Image from "./Components/Image";
import Info from "./Components/Info";
import UploadFile from "./Components/UploadFile";
import { useUploadFile } from "./Hooks/useUploadFile";

function App() {
  const { url, width, height, setUrl, setWH, areas } = useUploadFile();
  return (
    <div className="App">
      <div className="LeftSide">
        <div className="Bar">
          <div className="Circle"></div>
        </div>
        <div className="Content">
          <Image url={url} width={width} areas={areas} />
          <UploadFile url={url} setUrl={setUrl} setWH={setWH} />
        </div>
      </div>
      <div className="RightSide">
        <Info height={height} width={width} />
      </div>
    </div>
  );
}

export default App;
