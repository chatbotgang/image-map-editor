import React from 'react';
import './ImageUploadBlock.css';

interface imageUploadProps {
  uploadNewImage: (text: string) => void;
}

function ImageUploadBlock(props: imageUploadProps) {

  const handleUpload = function(imgBase64: string) {
    props.uploadNewImage(imgBase64)
  }

  return (
    <div className="image-body-upload disable-select" onClick={() => {
      const imgupload = window.document.getElementById("imgupload")!
      imgupload.click();
    }}>
      <input type="file"
        id="imgupload"
        accept="image/*"
        style={{display: "none"}}
        onChange={(e) => {
          const target = e.target
          if(target) {
            let files = target.files!
            if(files[0]) {
              const reader = new FileReader();
              reader.onload = (event: Event) => {
                if(reader.result) {
                  const csv: string = reader.result as string;
                  handleUpload(csv);
                }
              };
              reader.readAsDataURL(files[0]);
            }
          }
        }}
      />
      <div><img className="icon" src="photo.svg" alt="icon of upload" /></div>
      <div>Upload image</div>
    </div>
  );
}

export default ImageUploadBlock;
