import { css } from "@emotion/css";
import { canvasWidth } from "constant";
import useStore from "useStore";
import Canvas from "./Canvas";
import Header from "./Header";
import ImageSelector from "./ImgSelector";

const cssWorkspace = css`
  --workspaceWidth: 433px;
  --contentWidth: ${canvasWidth}px;
  width: var(--workspaceWidth);
  height: 792px;
  background: rgb(245, 249, 250);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  border-radius: 2px;
  box-shadow: 0px 8px 8px 4px rgba(0, 0, 0, 0.1);
`;

const cssContent = css`
  padding: 32px 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: stretch;
`;

export default function Workspace() {
  const img = useStore((state) => state.img);
  return (
    <div className={cssWorkspace}>
      <Header />
      <div className={cssContent}>{img ? <Canvas /> : <ImageSelector />}</div>
    </div>
  );
}
