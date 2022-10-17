import React from "react";

import { Rect } from "./ImagePreviewPane";

interface DataPreviewPaneProps {
    selectedRects: Rect[];
}
const DataPreviewPane = (props: DataPreviewPaneProps) => (
    <div>
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
    </div>
);

export default DataPreviewPane;
