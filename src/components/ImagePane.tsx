import { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { CanvasContext } from "../contexts/CanvasContextProvider";
import Canvas from "./Canvas";

type ImagePaneProps = {
  className?: string;
};

const ImagePaneJSX = ({ className }: ImagePaneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const ctx = useContext(CanvasContext);

  const fileUploadHandler = () => {
    const image = inputRef.current!.files![0]!;
    const reader = new FileReader();

    if (image) {
      reader.readAsDataURL(image);
    }

    reader.addEventListener("load", () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        console.log({ image });
        ctx.updateImage(image);
        setIsUploaded(true);
      };
    });
  };

  return (
    <main className={className}>
      <header className="header">
        <div className="circle"></div>
      </header>

      <section className="content">
        <label
          htmlFor="file-input"
          className={`label ${isUploaded ? "hidden" : ""}`}
        >
          Upload image
        </label>

        <input
          className="file-input"
          type="file"
          accept="image/*"
          id="file-input"
          onChange={fileUploadHandler}
          ref={inputRef}
        />

        {isUploaded && <Canvas />}
      </section>
    </main>
  );
};

const ImagePane = styled(ImagePaneJSX)`
  width: 433px;
  min-height: 792px;

  background-color: #f5f9fa;
  box-shadow: 5px 2px 15px 1px #dcdee7;

  .header {
    height: 56px;
    padding: 16px 39px;
    background-color: #ecf0f3;
  }

  .circle {
    width: 24px;
    height: 24px;

    border-radius: 50%;
    background-color: #d4dadf;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 56px;
    background-color: ;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 355px;
    height: 156px;
    outline: 2px solid #dcdee7;
    border-radius: 5px;
    color: #cececf;
    background-color: #fff;
    cursor: pointer;
  }

  .image {
    width: 355px;
  }

  .file-input {
    display: none;
  }

  .hidden {
    display: none;
  }
`;

export default ImagePane;
