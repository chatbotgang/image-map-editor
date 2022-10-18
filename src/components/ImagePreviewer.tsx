import React, { useRef, MouseEvent } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    position: relative;
    width: 355px;
    user-select: none;

    > img {
        width: 100%;
        height: auto;
        pointer-events: none;
    }
`;

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    isCompleted: boolean;
}

const StyledRectComponent = styled.div`
    position: absolute;
    border-width: 1px;
`;

interface ImagePreviewerProps {
    selectedRects: Rect[];
    setSelectedRects: (rects: Rect[]) => void;
    imageData: string;
}

const ImagePreviewer = (props: ImagePreviewerProps) => {
    const imagePreviewerRef = useRef<HTMLDivElement>(null);
    const { selectedRects, setSelectedRects, imageData } = props;

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
        <StyledWrapper
            onMouseDown={handleImagePreviewerMouseDown}
            onMouseMove={handleImagePreviewerMouseMove}
            ref={imagePreviewerRef}
        >
            <img src={imageData} alt="preview" />
            {selectedRects.map((rect, i) => (
                <StyledRectComponent
                    style={{
                        left: rect.width < 0 ? rect.x + rect.width : rect.x,
                        top: rect.height < 0 ? rect.y + rect.height : rect.y,
                        width: Math.abs(rect.width),
                        height: Math.abs(rect.height),
                        borderStyle: rect.isCompleted ? "solid" : "dashed",
                        borderColor: rect.isCompleted ? "navy" : "orange",
                    }}
                    key={i}
                ></StyledRectComponent>
            ))}
        </StyledWrapper>
    );
};

export default ImagePreviewer;
