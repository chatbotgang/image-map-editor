import React, { useCallback } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface Props {
  url: string;
  setUrl: (value: string) => void;
  setWH: (width: number, height: number) => void;
}

const UploadFile = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClick = useCallback((): void => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const onChange = useCallback(
    (e: React.ChangeEvent): void => {
      let reader: FileReader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          props.setUrl(e.target.result.toString());
        }
      };
      if (inputRef && inputRef.current && inputRef.current.files) {
        let file = inputRef.current.files[0];
        reader.readAsDataURL(file);
        let image = new Image();
        image.onload = () => {
          let width = image.naturalWidth | image.width;
          let height = image.naturalHeight | image.height;
          props.setWH(width, height);
        };
        image.src = window.URL.createObjectURL(inputRef.current.files[0]);
      }
    },
    [inputRef, props]
  );

  if (props.url) {
    return null;
  }

  return (
    <div className="UploadFile" onClick={onClick}>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.svg,.png"
          className="Input"
          onChange={onChange}
        />
        <div>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div>Uplaod Image</div>
      </div>
    </div>
  );
};

export default React.memo(UploadFile);
