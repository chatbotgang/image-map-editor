import { useContext } from "react";
import styled from "styled-components";
import { CanvasContext } from "../contexts/CanvasContextProvider";
import { parseRectsJSON } from "../utils/parseRectsJSON";

type DataPaneProps = {
  className?: string;
};

const DataPaneJSX = ({ className }: DataPaneProps) => {
  const { rects } = useContext(CanvasContext);
  const hasRectsData = !!rects.length;
  const parsedData = hasRectsData ? parseRectsJSON(rects) : "";

  return (
    <aside className={className}>
      <code
        dangerouslySetInnerHTML={{
          __html: `${parsedData}`,
        }}
      ></code>
    </aside>
  );
};

const DataPane = styled(DataPaneJSX)`
  width: 548px;
  height: 703px;
  border-radius: 5px;
  background-color: #2b3948;

  code {
    color: white;
    font-size: 1.2rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;

export default DataPane;
