import {
  FilePlaceHolder,
  UploadLabel,
  UploadInput,
  UploadName,
  UploadHolder,
} from "../../dump/FilePlaceHolder";

import { useUpload } from "./uploadHooks";

const Uploader = () => {
  const { inputRef, selectedFile } = useUpload();
  const isFileUploaded = !!selectedFile;
  return (
    <FilePlaceHolder className="FilePlaceHolder">
      <UploadLabel htmlFor="upload" isFile={isFileUploaded}>
        <UploadInput
          id="upload"
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <UploadName>Upload image</UploadName>
      </UploadLabel>

      {selectedFile && (
        <UploadHolder>
          <img src={selectedFile} alt="uploaded" />
        </UploadHolder>
      )}
    </FilePlaceHolder>
  );
};

export default Uploader;
