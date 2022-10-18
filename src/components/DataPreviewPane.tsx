import React from "react";
import styled from "styled-components";

import { Rect } from "./ImagePreviewer";

const StyledWrapper = styled.div`
    width: 548px;
    background: #2e3c4a;
    height: 703px;
    overflow: scroll;
    color: white;
    font-size: 16px;
    padding: 12px 24px;
    border-radius: 5px;
`;

interface DataPreviewPaneProps {
    selectedRects: Rect[];
}

const DataPreviewPane = (props: DataPreviewPaneProps) => (
    <StyledWrapper>
        <pre>
            {JSON.stringify(
                props.selectedRects.map((v) => {
                    const { x, y, width, height } = v;
                    return {
                        x,
                        y,
                        width,
                        height,
                    };
                }),
                null,
                4
            )}
        </pre>
    </StyledWrapper>
);

export default DataPreviewPane;
