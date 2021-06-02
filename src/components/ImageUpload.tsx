import './ImageUpload.css';

// interface ImageFile {
//   name: string,
//   size: number,
//   type: string,
// }

// interface Files {
//   [index: number]: ImageFile,
// }

interface Props {
  label?: string,
  onSelectFile?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FileUpload = ({
  label = 'Upload image',
  onSelectFile,
  ...otherProps
}: Props) => {
  // const [files, setFiles] = useState<ImageFile[]>([]);

  const handleNewFileUpload = (e: any) => {
    // const { files } = e.target;
    // if (files && files.length) {
    //   setFiles(files);
    // }
    onSelectFile && onSelectFile(e);
  };

  return (    
    <div className="image-upload"> 
      <div className="image-upload__input">
        <i className="ico-image far fa-image"></i>
        <div>{label}</div>
        <input type="file"
          onChange={handleNewFileUpload}
          accept="image/*"
          {...otherProps} />
      </div>
    </div>
  );
};

export default FileUpload;
