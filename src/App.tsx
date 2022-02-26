import "./App.css";
import Image from "./Components/Image";
import Info from "./Components/Info";
import UploadFile from "./Components/UploadFile";
import { useUploadFile } from "./Hooks/useUploadFile";
import { useMouse } from "./Hooks/useMouse";

function App() {
  const { data, areas, url, setUrl, setWH, add, deleteArea } = useUploadFile();
  const { ref, isPress } = useMouse();

  return (
    <div className="App" ref={ref}>
      <div className="LeftSide">
        <div className="Bar">
          <div className="Circle"></div>
        </div>
        <div className="Content" draggable={false}>
          <Image
            url={url}
            areas={areas}
            isPress={isPress}
            addArea={add}
            deleteArea={deleteArea}
          />
          <UploadFile url={url} setUrl={setUrl} setWH={setWH} />
        </div>
      </div>
      <div className="RightSide" draggable={false}>
        <Info data={data} />
      </div>
    </div>
  );
}

export default App;
