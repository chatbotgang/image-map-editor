import React, { useState } from "react";
import styled from "styled-components";

import ImagePreviewPane, { Rect } from "./components/ImagePreviewPane";
import DataPreviewPane from "./components/DataPreviewPane";

const StyledWrapper = styled.div`
    background-color: #282c34;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > * {
        flex-grow: 1;
    }
`;

const StyledItem = styled.div`
    background-color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
`;

function App() {
    const [selectedRects, setSelectedRects] = useState<Rect[]>([]);
    return (
        <StyledWrapper>
            <StyledItem>
                <ImagePreviewPane
                    selectedRects={selectedRects}
                    setSelectedRects={setSelectedRects}
                ></ImagePreviewPane>
            </StyledItem>
            <StyledItem>
                <DataPreviewPane
                    selectedRects={selectedRects.filter((v) => v.isCompleted)}
                ></DataPreviewPane>
            </StyledItem>
        </StyledWrapper>
    );
}

export default App;
