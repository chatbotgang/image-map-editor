import React, { useCallback, useState } from "react";
import { Container } from "./styles";
import { Area, Position } from "../../Hooks/useUploadFile/types";
import Select from "../Select";

export interface Props {
  isPress: boolean;
  url: string;
  areas: Area[] | null;
  addArea: (area: Area) => void;
  deleteArea: (area: Area) => void;
}

const Image = (props: Props) => {
  const containerRef = React.useRef<HTMLImageElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [mouseIndex, setMouseIndex] = useState(new Position(0, 0));
  const [area, setArea] = useState<Area>(new Area(0, 0, 0, 0));
  const { url, areas, isPress, addArea, deleteArea } = props;

  const getClientLeft = useCallback(
    (x: number): number => {
      let result = x;
      if (containerRef.current) {
        result = x - containerRef.current.offsetLeft + window.scrollX;
      }
      return result;
    },
    [containerRef]
  );

  const getClientTop = useCallback(
    (y: number): number => {
      let result = y;
      if (containerRef.current) {
        result = y - containerRef.current.offsetTop + window.scrollY;
      }
      return result;
    },
    [containerRef]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent): void => {
      let x = getClientLeft(e.clientX);
      let y = getClientTop(e.clientY);
      setMouseIndex(new Position(x, y));
      let newArea = new Area(x, y, 0, 0);
      setArea(newArea);
    },
    [setArea, getClientLeft, getClientTop]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent): void => {
      if (isPress) {
        let temp = new Area(
          area.position.X,
          area.position.Y,
          area.size.width,
          area.size.height
        );
        let index = new Position(mouseIndex.X, mouseIndex.Y);

        let clientX = getClientLeft(e.clientX);
        let clientY = getClientTop(e.clientY);

        let offsetX = mouseIndex.X - clientX;
        let offsetY = mouseIndex.Y - clientY;

        if (offsetX >= 0) {
          temp.position.X = clientX;
          temp.size.width = offsetX;
          index.X = clientX;
        } else {
          temp.size.width = offsetX * -1;
        }

        if (offsetY >= 0) {
          temp.position.Y = clientY;
          temp.size.height = offsetY;
          index.Y = clientY;
        } else {
          temp.size.height = offsetY * -1;
        }

        setArea(temp);
      }
    },
    [setArea, mouseIndex, isPress, area, getClientLeft, getClientTop]
  );

  const addNewArea = useCallback(() => {
    if (area.size.width > 10 && area.size.height > 10) {
      addArea(
        new Area(
          area.position.X,
          area.position.Y,
          area.size.width,
          area.size.height
        )
      );
      setArea(new Area(0, 0, 0, 0));
    }
  }, [area, setArea, addArea]);

  if (!url) {
    return null;
  }

  return (
    <Container
      draggable={false}
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={addNewArea}
    >
      <img ref={imgRef} src={url} width="355" draggable={false} alt="" />
      {areas &&
        areas.map((i) => {
          return <Select key={i.key} area={i} deleteArea={deleteArea} />;
        })}
      <Select area={area} />
    </Container>
  );
};

export default React.memo(Image);
