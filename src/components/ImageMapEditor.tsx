import "./ImageMapEditor.css";

type ImageMapEditorProps = {
  uploadedImage: Base64Image;
  mappings: Mapping[];
};

export default function ImageMapEditor({
  uploadedImage,
  mappings,
}: ImageMapEditorProps) {
  return (
    <div className="image-map-editor">
      <div className="image-map-editor__top-bar">
        <div className="image-map-editor__top-bar__grey-circle"></div>
      </div>
    </div>
  );
}
