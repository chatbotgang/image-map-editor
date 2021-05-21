import "./MappingArea.css";
import { Mapping, Base64Image, ImageDimensions } from '../types';
type MappingAreaProps = {
  mappings: Mapping[];
  image: Base64Image;
  originalImageDimensions?: ImageDimensions;
};

export default function MappingArea({ mappings, image, originalImageDimensions }: MappingAreaProps) {
  return (
    <div className="mapping-area">
      <img
        draggable={false}
        className="mapping-area"
        src={image}
        alt="you uploaded this"
      />
      { 
        originalImageDimensions && mappings.map((mapping, index) => {
        return (
          <div data-testid={`mappings-${index}`} key={mapping.toString()} 
            style={{
              position: 'absolute',
              top: `${mapping.y / originalImageDimensions.height * 100}%`,
              left: `${mapping.x / originalImageDimensions.width * 100}%`,
              width: `${mapping.width / originalImageDimensions.width * 355}px`,
              height: `${mapping.height / originalImageDimensions.height * 355 * originalImageDimensions.height / originalImageDimensions.width}px`,
            }}
          />
        )
      })}
    </div>
  );
}
