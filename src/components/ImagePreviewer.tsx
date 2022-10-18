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
    _id: string;
    isMoving: boolean;
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

const genId = () => Date.now().toString(16);

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

        if (ownedRects.some((rect) => rect.isMoving)) {
            return setOwnedRects(
                ownedRects.map((rect) => {
                    rect.isMoving = false;
                    return rect;
                })
            );
        }

        if (
            ownedRects.length &&
            !ownedRects[ownedRects.length - 1].isCompleted
        ) {
            return setOwnedRects(
                ownedRects.map((v, i, arr) => {
                    if (i !== arr.length - 1) {
                        return v;
                    }
                    const nextRect: Rect = {
                        ...v,
                        width: relativeX - v.x,
                        height: relativeY - v.y,
                        isCompleted: true,
                    };

                    if (nextRect.width < 0) {
                        nextRect.x = nextRect.x + nextRect.width;
                        nextRect.width = Math.abs(nextRect.width);
                    }

                    if (nextRect.height < 0) {
                        nextRect.y = nextRect.y + nextRect.height;
                        nextRect.height = Math.abs(nextRect.height);
                    }

                    return nextRect;
                })
            );
        }

        let found = false;
        const nextRects = ownedRects.map((rect) => {
            if (found) {
                return rect;
            }
            if (
                (relativeX - rect.x) * (relativeX - rect.x - rect.width) < 0 &&
                (relativeY - rect.y) * (relativeY - rect.y - rect.height) < 0
            ) {
                found = true;
                return {
                    ...rect,
                    isMoving: true,
                };
            }
            return rect;
        });

        if (found) {
            return setOwnedRects(nextRects);
        }
        return setOwnedRects([
            ...ownedRects,
            {
                x: relativeX,
                y: relativeY,
                width: 0,
                height: 0,
                isCompleted: false,
                _id: genId(),
                isMoving: false,
            },
        ]);
    };
    const handleImagePreviewerMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imagePreviewerRef.current) {
            return alert("image previewer is not ready");
        }
        const bounding = imagePreviewerRef.current.getBoundingClientRect();

        const relativeX = e.clientX - bounding.x;
        const relativeY = e.clientY - bounding.y;

        if (ownedRects.some((rect) => rect.isMoving)) {
            return setOwnedRects(
                ownedRects.map((rect) => {
                    if (!rect.isMoving) {
                        return rect;
                    }
                    const nextRect = {
                        ...rect,
                        x: relativeX - rect.width / 2,
                        y: relativeY - rect.height / 2,
                    };

                    if (nextRect.x < 0) {
                        nextRect.x = 0;
                    }

                    if (nextRect.y < 0) {
                        nextRect.y = 0;
                    }

                    let marginX = bounding.width - nextRect.x - nextRect.width;
                    if (marginX < 0) {
                        nextRect.x = nextRect.x + marginX;
                    }

                    let marginY =
                        bounding.height - nextRect.y - nextRect.height;
                    if (marginY < 0) {
                        nextRect.y = nextRect.y + marginY;
                    }

                    return nextRect;
                })
            );
        }

        if (
            !ownedRects.length ||
            ownedRects[ownedRects.length - 1].isCompleted
        ) {
            return;
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
            {ownedRects.map((rect) => (
                <StyledRectComponent
                    style={{
                        left: rect.width < 0 ? rect.x + rect.width : rect.x,
                        top: rect.height < 0 ? rect.y + rect.height : rect.y,
                        width: Math.abs(rect.width),
                        height: Math.abs(rect.height),
                        borderStyle: rect.isCompleted ? "solid" : "dashed",
                        borderColor: rect.isCompleted ? "navy" : "orange",
                        backgroundColor: rect.isMoving
                            ? "rgba(0, 0, 255, 0.3)"
                            : "transparent",
                    }}
                    key={rect._id}
                ></StyledRectComponent>
            ))}
        </StyledWrapper>
    );
};

export default ImagePreviewer;
