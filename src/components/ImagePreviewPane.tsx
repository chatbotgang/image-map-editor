import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ImageUploader from "./ImageUploader";
import ImagePreviewer, { Rect } from "./ImagePreviewer";

const StyledWrapper = styled.div`
    width: 433px;
    height: 792px;

    display: flex;
    flex-direction: column;
    border-radius: 5px;
    overflow: scroll;
`;

const Header = styled.div`
    background-color: #ebf0f3;
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 12px 24px;

    > div {
        background-color: #d3d9de;
        border-radius: 50%;
        width: 24px;
        height: 24px;
    }
`;

const Content = styled.div`
    flex-grow: 1;
    background-color: #f4f9fa;
    padding: 24px 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface ImagePreviewPaneProps {
    selectedRects: Rect[];
    setSelectedRects: (rects: Rect[]) => void;
}

const ImagePreviewPane = (props: ImagePreviewPaneProps) => {
    const [imageData, setImageData] = useState("");
    const { selectedRects, setSelectedRects } = props;

    // revoke the url
    useEffect(() => {
        return () => {
            if (imageData) {
                console.log("revoke object url");
                console.log(imageData);
                URL.revokeObjectURL(imageData);
            }
        };
    }, [imageData]);

    return (
        <StyledWrapper>
            <Header>
                <div></div>
            </Header>
            <Content>
                {imageData ? (
                    <ImagePreviewer
                        selectedRects={selectedRects}
                        imageData={imageData}
                        setSelectedRects={setSelectedRects}
                    ></ImagePreviewer>
                ) : (
                    <ImageUploader setImageData={setImageData}></ImageUploader>
                )}
            </Content>
        </StyledWrapper>
    );
};

export default ImagePreviewPane;
