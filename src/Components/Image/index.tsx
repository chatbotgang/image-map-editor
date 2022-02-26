import React, { useCallback, useState } from "react";
import { Container, SelectWrapper } from "./styles";
import { Area } from "../../Hooks/useUploadFile/types";

export interface Props {
  url: string;
  width: number;
  areas: Area[] | null;
}

const Image = (props: Props) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [area, setArea] = useState<Area>(new Area(0, 0, 50, 50));
  const { url, width, areas } = props;

  const onMouseDown = useCallback(
    (e: React.MouseEvent): void => {
      setIsMouseDown(true);
      const area = new Area(e.clientX, e.clientY, 0, 0);
      setArea(area);
    },
    [setIsMouseDown]
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent): void => {
      setIsMouseDown(false);
      console.log(e.clientX);
      console.log(e.clientY);
    },
    [setIsMouseDown]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent): void => {
      if (isMouseDown) {
        console.log(e.clientX);
        console.log(e.clientY);
      }
    },
    [isMouseDown]
  );

  if (!url) {
    return null;
  }

  return (
    <Container draggable={false}>
      <img
        ref={imgRef}
        src={url}
        width="355"
        draggable={false}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
      {areas &&
        areas.map((i) => {
          return <SelectWrapper area={i} />;
        })}
      <SelectWrapper area={area} />
    </Container>
  );
};

export default React.memo(Image);
