import React, { useRef, useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";

import ImageUploader from "./ImageUploader";

const ImagePreviewer = styled.div`
    position: relative;
    width: 355px;
    user-select: none;

    > img {
        width: 100%;
        height: auto;
        pointer-events: none;
    }
`;

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
    isCompleted: boolean;
};

const SelectedRect = styled.div.attrs((props: Rect) => ({
    style: {
        left: props.x,
        top: props.y,
        width: props.width,
        height: props.height,
        borderStyle: props.isCompleted ? "solid" : "dashed",
        borderColor: props.isCompleted ? "navy" : "orange",
    },
}))`
    position: absolute;
    border-width: 1px;
`;

interface ImagePreviewPaneProps {
    selectedRects: Rect[];
    setSelectedRects: (rects: Rect[]) => void;
}

const ImagePreviewPane = (props: ImagePreviewPaneProps) => {
    const imagePreviewerRef = useRef<HTMLDivElement>(null);
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

    const handleImagePreviewerMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!imagePreviewerRef.current) {
            return alert("image previewer is not ready");
        }

        const bounding = imagePreviewerRef.current.getBoundingClientRect();

        const relativeX = e.clientX - bounding.x;
        const relativeY = e.clientY - bounding.y;

        if (
            !selectedRects.length ||
            selectedRects[selectedRects.length - 1].isCompleted
        ) {
            return setSelectedRects([
                ...selectedRects,
                {
                    x: relativeX,
                    y: relativeY,
                    width: 0,
                    height: 0,
                    isCompleted: false,
                },
            ]);
        }

        return setSelectedRects(
            selectedRects.map((v, i, arr) => {
                if (i !== arr.length - 1) {
                    return v;
                }
                return {
                    ...v,
                    width: relativeX - v.x,
                    height: relativeY - v.y,
                    isCompleted: true,
                };
            })
        );
    };
    const handleImagePreviewerMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imagePreviewerRef.current) {
            return alert("image previewer is not ready");
        }
        if (
            !selectedRects.length ||
            selectedRects[selectedRects.length - 1].isCompleted
        ) {
            return;
        }

        const bounding = imagePreviewerRef.current.getBoundingClientRect();

        const relativeX = e.clientX - bounding.x;
        const relativeY = e.clientY - bounding.y;

        return setSelectedRects(
            selectedRects.map((v, i, arr) => {
                if (i !== arr.length - 1) {
                    return v;
                }
                return {
                    ...v,
                    width: relativeX - v.x,
                    height: relativeY - v.y,
                };
            })
        );
    };
    return (
        <div>
            <div>
                <div>icon</div>
            </div>
            <div>
                {imageData ? (
                    <ImagePreviewer
                        onMouseDown={handleImagePreviewerMouseDown}
                        onMouseMove={handleImagePreviewerMouseMove}
                        ref={imagePreviewerRef}
                    >
                        <img src={imageData} alt="preview" />
                        {selectedRects.map((rect, i) => (
                            <SelectedRect
                                x={
                                    rect.width < 0
                                        ? rect.x + rect.width
                                        : rect.x
                                }
                                y={
                                    rect.height < 0
                                        ? rect.y + rect.height
                                        : rect.y
                                }
                                width={Math.abs(rect.width)}
                                height={Math.abs(rect.height)}
                                isCompleted={rect.isCompleted}
                                key={i}
                            />
                        ))}
                    </ImagePreviewer>
                ) : (
                    <ImageUploader setImageData={setImageData}></ImageUploader>
                )}
            </div>
        </div>
    );
};

export default ImagePreviewPane;
