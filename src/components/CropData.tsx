import { Cropper } from '../interfaces/ImageCrop';

interface Props {
  coordinates: Cropper[] | undefined,
}

const CropData = ({
  coordinates,
}: Props) => {
  if (!coordinates || coordinates.length === 0) return (<pre></pre>);
  const data = coordinates.map((item: Cropper, index: number) =>
    JSON.stringify(item, ['x', 'y', 'width', 'height'], 2) + (coordinates.length !== index + 1 ? ',' : ''));
  return (
    <pre>{coordinates.length > 0 && '['}{data}{coordinates.length > 0 && ']'}</pre>
  );
};

export default CropData;
