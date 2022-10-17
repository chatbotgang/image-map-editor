import React, { useRef } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    width: 353px;
    height: 154px;

    border: solid 1px grey;
    cursor: pointer;
`;

const HiddenInput = styled.input`
    display: none;
`;

interface ImageUploaderProps {
    setImageData: (data: string) => void;
}

const ImageUploader = (props: ImageUploaderProps) => {
    const inputFieldRef = useRef<HTMLInputElement>(null);

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

        props.setImageData(URL.createObjectURL(file));
    };
    return (
        <StyledWrapper onClick={handleImageUpload}>
            <div>icon</div>
            <div>Upload Image</div>
            <HiddenInput
                type="file"
                onChange={handleImageDataChange}
                ref={inputFieldRef}
            ></HiddenInput>
        </StyledWrapper>
    );
};

export default ImageUploader;
