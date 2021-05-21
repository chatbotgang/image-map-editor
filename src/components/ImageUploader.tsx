import { useRef, useState, useEffect } from "react";
import imageIcon from "../assets/image-icon.png";
import "./ImageUploader.css";

type ImageUploaderProp = {
  onUpload: (img: Base64Image) => void;
};

export default function ImageUploader({ onUpload }: ImageUploaderProp) {
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    const fileReader = new FileReader();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        onUpload(fileReader.result as Base64Image);
      };
    }

    return () => {
      if (fileReader.readyState === FileReader.LOADING) {
        fileReader.abort();
      }
    };
  }, [fileUploaded, onUpload]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) setFileUploaded(true);
  };

  return (
    <label className="image-uploader" htmlFor="image-uploader-input">
      <img src={imageIcon} alt="" />
      <span>Upload Image</span>
      <input
        type="file"
        name="image-uploader"
        id="image-uploader-input"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </label>
  );
}
