import { css } from "@emotion/css";
import ControlPanel from "ControlPanel";
import { SnackbarProvider } from "notistack";
import Console from "./Console";
import "./style.css";
import Workspace from "./Workspace";

const main = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 135px;
  padding: 32px 8px;
`;

function App() {
  return (
    <SnackbarProvider>
      <ControlPanel />
      <div className={main}>
        <Workspace />
        <Console />
      </div>
    </SnackbarProvider>
  );
}

export default App;
