import { Mapping, ImageDimensions } from "../types";
import "./MappingBlock.css";
import deleteIcon from "../assets/delete-icon.png";

export type MappingBlockProps = {
  onDelete?: () => void;
  mapping: Mapping;
  index: number;
  originalImageDimensions: ImageDimensions;
};

export default function MappingBlock({
  onDelete,
  mapping,
  index,
  originalImageDimensions,
}: MappingBlockProps) {
  return (
    <div
      className="mapping-block"
      data-testid={`mappings-${index}`}
      style={{
        top: `${(mapping.y / originalImageDimensions.height) * 100}%`,
        left: `${(mapping.x / originalImageDimensions.width) * 100}%`,
        width: `${(mapping.width / originalImageDimensions.width) * 355}px`,
        height: `${
          ((mapping.height / originalImageDimensions.height) *
            355 *
            originalImageDimensions.height) /
          originalImageDimensions.width
        }px`,
      }}
    >
      <p className="mapping-block__number">{index + 1}</p>
      {onDelete && (
        <button
          className="mapping-block__delete-button"
          onClick={onDelete}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={deleteIcon} alt={`delete mapping block ${index + 1}`} />
        </button>
      )}
    </div>
  );
}
