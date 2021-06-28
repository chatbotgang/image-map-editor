import { memo } from "react";
import {
  FilePlaceHolder,
  UploadLabel,
  UploadInput,
  UploadName,
  UploadHolder,
  UploadImage,
} from "../../dump/FilePlaceHolder";
import { EditRegion } from "../Edit/EditRegion/EditRegion";
import { useUploader } from "./uploaderHooks";

export const Uploader = memo(() => {
  const { inputRef, selectedFile } = useUploader();
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
          <EditRegion>
            <UploadImage src={selectedFile} alt="uploaded" />
          </EditRegion>
        </UploadHolder>
      )}
    </FilePlaceHolder>
  );
});
