import React, { useState, useEffect } from "react";

import ImageUploader from "./ImageUploader";
import ImagePreviewer, { Rect } from "./ImagePreviewer";

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
        <div>
            <div>
                <div>icon</div>
            </div>
            <div>
                {imageData ? (
                    <ImagePreviewer
                        selectedRects={selectedRects}
                        imageData={imageData}
                        setSelectedRects={setSelectedRects}
                    ></ImagePreviewer>
                ) : (
                    <ImageUploader setImageData={setImageData}></ImageUploader>
                )}
            </div>
        </div>
    );
};

export default ImagePreviewPane;
