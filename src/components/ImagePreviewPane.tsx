import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ImageUploader = styled.div`
    width: 353px;
    height: 154px;

    border: solid 1px grey;
`;

const HiddenInput = styled.input`
    display: none;
`;

const ImagePreviewer = styled.div`
    position: relative;
    width: 355px;

    > img {
        width: 100%;
        height: auto;
        pointer-events: none;
    }
`;

const ImagePreviewPane = () => {
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const [imageData, setImageData] = useState("");

    // revoke the url
    useEffect(() => {
        return () => {
            if (imageData) {
                URL.revokeObjectURL(imageData);
            }
        };
    }, [imageData]);

    const handleImageUpload = () => {
        if (!inputFieldRef.current) {
            return alert("image uploader is not ready");
        }
        inputFieldRef.current.click();
    };
    const handleImageDataChange = () => {
        if (!inputFieldRef.current) {
            return alert("image uploader is not ready");
        }
        const fileList = inputFieldRef.current.files;
        if (!fileList || fileList.length < 1) {
            return console.error("failed to get the fileList");
        }
        const file = fileList.item(0);

        setImageData(URL.createObjectURL(file));
    };

    return (
        <div>
            <div>
                <div>icon</div>
            </div>
            <div>
                {imageData ? (
                    <ImagePreviewer>
                        <img src={imageData} alt="preview" />
                    </ImagePreviewer>
                ) : (
                    <ImageUploader onClick={handleImageUpload}>
                        <div>icon</div>
                        <div>Upload Image</div>
                        <HiddenInput
                            type="file"
                            onChange={handleImageDataChange}
                            ref={inputFieldRef}
                        ></HiddenInput>
                    </ImageUploader>
                )}
            </div>
        </div>
    );
};

export default ImagePreviewPane;
