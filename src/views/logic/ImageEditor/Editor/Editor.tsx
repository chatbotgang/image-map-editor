import { CreateChopSelection } from "../Chop/Chop";
import { useEditor } from "./editorHooks";

export const Editor = () => {
  const chopSelection = CreateChopSelection();
  const { handleComponentPointerDown } = useEditor();
  return (
    <div onPointerDown={handleComponentPointerDown}>
      <div
        style={{ width: "300px", height: "200px", backgroundColor: "#ebf0f3" }}
      ></div>
      {chopSelection}
    </div>
  );
};
