import { FilePlaceHolder } from "../../dump/FilePlaceHolder";

import { useUpload } from "./uploadHooks";

const Uploader = () => {
  const { selectedFile, inputRef } = useUpload();
  return (
    <FilePlaceHolder className="FilePlaceHolder">
      <input type="file" ref={inputRef} />
      <img src={selectedFile} alt="uploade" />
      Upload File Here
    </FilePlaceHolder>
  );
};

export default Uploader;
