import "./ImageMapEditor.css";
import ImageUploader from "./ImageUploader";
import MappingArea from "./MappingArea";
import { Base64Image, Mapping, ImageDimensions } from '../types';
import { List } from "immutable";

type ImageMapEditorProps = {
  onImageUpload: (img: Base64Image) => void;
  createMapping: (value: Mapping) => void;
  editMapping: (index: number, value: Partial<Mapping>) => void;
  deleteMapping: (index: number) => void;
  uploadedImage: Base64Image;
  mappings: List<Mapping>;
  originalImageDimensions?: ImageDimensions;
};

export default function ImageMapEditor({
  createMapping,
  editMapping,
  onImageUpload,
  deleteMapping,
  uploadedImage,
  mappings,
  originalImageDimensions,
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
        originalImageDimensions && (
          <MappingArea
            image={uploadedImage}
            mappings={mappings}
            originalImageDimensions={originalImageDimensions}
            createMapping={createMapping}
            editMapping={editMapping}
            deleteMapping={deleteMapping}
          />
        )
      )}
    </div>
  );
}
