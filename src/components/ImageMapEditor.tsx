import "./ImageMapEditor.css";
import ImageUploader from "./ImageUploader";
import MappingArea from "./MappingArea";

type ImageMapEditorProps = {
  onImageUpload: (img: Base64Image) => void;
  uploadedImage: Base64Image;
  mappings: Mapping[];
};

export default function ImageMapEditor({
  onImageUpload,
  uploadedImage,
  mappings,
}: ImageMapEditorProps) {
  return (
    <div className="image-map-editor">
      <div className="image-map-editor__top-bar">
        <div className="image-map-editor__top-bar__grey-circle"></div>
      </div>
      {uploadedImage === "" ? (
        <ImageUploader
          onUpload={(img) => {
            onImageUpload(img);
          }}
        />
      ) : (
        <MappingArea image={uploadedImage} mappings={mappings} />
      )}
    </div>
  );
}
