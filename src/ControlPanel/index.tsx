import { css } from "@emotion/css";
import Eraser from "icon/phosphor/Eraser";
import useStore from "useStore";
import Button from "./Button";

const cssControlPanel = css`
  height: 32px;
  padding: 8px 32px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

export default function ControlPanel() {
  const { img, reset } = useStore(({ img, reset }) => ({
    img,
    reset,
  }));
  return (
    <div className={cssControlPanel}>
      <Button onClick={reset} disabled={!img}>
        <Eraser />
        {"Erase"}
      </Button>
      <div>
        {"by "}
        <a
          href="https://github.com/VdustR/homework-image-map-editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"ViPro"}
        </a>
      </div>
    </div>
  );
}
