import styled from "styled-components";

export const ImageMapEditorContainer = styled.div`
  width: 433px;
  height: 792px;
  border-radius: 4px;
  background-color: #f5f9fa;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const ImageMapEditorHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  background-color: #ebf0f3;
`;

export const ImageMapEditorHeaderCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d4dadf;
`;

export const ImageMapEditorBody = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
`;

export const ImageMapEditorInput = styled.input`
  opacity: 0;
  width: 355px;
  height: 156px;
  cursor: pointer;
  position: absolute;
`;

export const ImageMapEditorInputPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: #a3a4a7;
`;

export const ImageMapEditorUploader = styled.div`
  width: 355px;
  height: 156px;
  border: 2px solid #d7dadd;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
`;

export const ImageMapEditorImagePreview = styled.img`
  width: 355px;
  height: auto;
  border: 4px solid #6683b8;
  border-radius: 10px;
`;

export const ImageMapEditorNumberTag = styled.div`
  color: #000000;
  background-color: #eeeeee;
  font-weight: 500;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageMapEditorUploaderDeleteButton = styled.button`
  position: absolute;
  right: -40px;
  top: 0px;
  padding: 2px;
  color: #a3a4a7;
  background-color: #ffffff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
