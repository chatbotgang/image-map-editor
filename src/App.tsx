import React, { useState } from "react";
import styled from "styled-components";

import ImagePreviewPane, { Rect } from "./components/ImagePreviewPane";
import DataPreviewPane from "./components/DataPreviewPane";

const StyledWrapper = styled.div`
    width: 100vw;
    min-width: 1280px;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledItem = styled.div`
    background-color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    gap: 135px;
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
                <DataPreviewPane
                    selectedRects={selectedRects.filter((v) => v.isCompleted)}
                ></DataPreviewPane>
            </StyledItem>
        </StyledWrapper>
    );
}

export default App;
