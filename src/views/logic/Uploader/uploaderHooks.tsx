import { useState, useEffect, useRef, ChangeEvent } from "react";

export const useUploader = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));
  const handleSelectedFile: any = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const fileList = ev.target.files;
    if (fileList) {
      setSelectedFile(URL.createObjectURL(fileList[0]));
    }
  };
  useEffect(() => {
    let refValue = inputRef.current;
    refValue.addEventListener("change", handleSelectedFile);
    return () => {
      refValue.removeEventListener("change", handleSelectedFile);
    };
  }, [selectedFile, inputRef]);
  return {
    selectedFile,
    inputRef,
  };
};
