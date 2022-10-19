import React, { useRef, ChangeEvent } from "react";
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
    const handleImageDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length < 1) {
            return console.error("failed to get the fileList");
        }
        const file = fileList.item(0);

        const fileType = file?.type;

        if (!fileType?.startsWith("image/")) {
            return alert("please select an image file");
        }

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
