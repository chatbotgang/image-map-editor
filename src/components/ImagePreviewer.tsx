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
    id: string;
    isMoving: boolean;
}

const StyledRectComponent = styled.div`
    position: absolute;
    border-width: 1px;
`;

const DeleteButton = styled.div`
    position: absolute;
    padding: 4px;
    background: rgba(255, 0, 0, 0.3);
    cursor: pointer;
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

        // select the lastest created rectangle if multiple rectangles are overlapping
        let found = false;
        const nextRects: Rect[] = [];

        for (let i = ownedRects.length - 1; i > -1; i--) {
            let rect = ownedRects[i];
            /**
             * determine if the point is inside the rectangle
             *
             * if a coordinate (x, y) is inside the rectangle with the diagonal (x1, y1) and (x2, y2),
             * the following two conditions should be satisfied
             * 1. x is between x1 and x2
             * 2. y is between y1 and y2
             *
             * if v is between a and b, the product of (v - a) and (v - b) should be negative
             */
            if (
                !found &&
                (relativeX - rect.x) * (relativeX - rect.x - rect.width) < 0 &&
                (relativeY - rect.y) * (relativeY - rect.y - rect.height) < 0
            ) {
                found = true;
                nextRects[i] = {
                    ...rect,
                    isMoving: true,
                };
                continue;
            }
            nextRects[i] = rect;
        }
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
                id: genId(),
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
    const handleDelete = (e: MouseEvent<HTMLDivElement>, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        return setOwnedRects(ownedRects.filter((rect) => rect.id !== id));
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
                    key={rect.id}
                ></StyledRectComponent>
            ))}
            {ownedRects.map((rect) => (
                <DeleteButton
                    style={{
                        left:
                            rect.width < 0
                                ? rect.x + 2
                                : rect.x + rect.width + 2,
                        top: rect.height < 0 ? rect.y + rect.height : rect.y,
                    }}
                    onMouseDown={(e: MouseEvent<HTMLDivElement>) =>
                        handleDelete(e, rect.id)
                    }
                    key={rect.id}
                >
                    X
                </DeleteButton>
            ))}
        </StyledWrapper>
    );
};

export default ImagePreviewer;
