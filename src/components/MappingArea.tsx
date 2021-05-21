import "./MappingArea.css";
type MappingAreaProps = {
  mappings: Mapping[];
  image: Base64Image;
};

export default function MappingArea({ mappings, image }: MappingAreaProps) {
  return (
    <div>
      <img
        draggable={false}
        className="mapping-area"
        src={image}
        alt="you uploaded"
      />
    </div>
  );
}
