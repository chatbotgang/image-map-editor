import React from "react";
import styled from "styled-components";

import ImagePreviewPane from "./components/ImagePreviewPane";

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
    return (
        <StyledWrapper>
            <StyledItem>
                <ImagePreviewPane></ImagePreviewPane>
            </StyledItem>
            <StyledItem>Data preview pane</StyledItem>
        </StyledWrapper>
    );
}

export default App;
