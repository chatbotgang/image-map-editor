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
    ownedRects: Rect[];
    setOwnedRects: (rects: Rect[]) => void;
    imageData: string;
}

const ImagePreviewer = (props: ImagePreviewerProps) => {
    const imagePreviewerRef = useRef<HTMLDivElement>(null);
    const { ownedRects, setOwnedRects, imageData } = props;

    const handleImagePreviewerMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!imagePreviewerRef.current) {
            return alert("image previewer is not ready");
        }

        const bounding = imagePreviewerRef.current.getBoundingClientRect();

        const relativeX = e.clientX - bounding.x;
        const relativeY = e.clientY - bounding.y;

        if (
            !ownedRects.length ||
            ownedRects[ownedRects.length - 1].isCompleted
        ) {
            return setOwnedRects([
                ...ownedRects,
                {
                    x: relativeX,
                    y: relativeY,
                    width: 0,
                    height: 0,
                    isCompleted: false,
                },
            ]);
        }

        return setOwnedRects(
            ownedRects.map((v, i, arr) => {
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
            !ownedRects.length ||
            ownedRects[ownedRects.length - 1].isCompleted
        ) {
            return;
        }

        const bounding = imagePreviewerRef.current.getBoundingClientRect();

        const relativeX = e.clientX - bounding.x;
        const relativeY = e.clientY - bounding.y;

        return setOwnedRects(
            ownedRects.map((v, i, arr) => {
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
            {ownedRects.map((rect, i) => (
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
