import React, { useRef } from "react";
import styled from "styled-components";

import imageIcon from "../assets/icons/image.svg";

const StyledWrapper = styled.div`
    width: 355px;
    height: 156px;

    color: #b3b5b7;

    background: #ffffff;
    border: solid 1px #d7d8da;
    border-radius: 5px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

const ImageIcon = styled.img`
    width: 36px;
    height: 36px;
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
            <div>
                <ImageIcon src={imageIcon} />
            </div>
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