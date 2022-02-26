import { useState, useCallback } from "react";
import { Area } from "./types";

export const useUploadFile = () => {
  const imageWidth = 355;
  const imageHeight = 156;
  const [url, setUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [areas, setAreas] = useState<Area[]>([]);
  const [data, setData] = useState<any[]>([]);

  const setWH = useCallback(
    (width: number, height: number) => {
      setWidth(width);
      setHeight(height);
    },
    [setWidth, setHeight]
  );

  const setOriginWH = useCallback(
    (newArr: Area[]): void => {
      let result: any[] = [];

      newArr.map((i): void => {
        let perW = width / imageWidth;
        let perH = height / imageHeight;
        let obj = {
          x: i.position.X * perW,
          Y: i.position.Y * perH,
          width: i.size.width * perW,
          height: i.size.height * perW,
        };

        result.push(obj);
      });
      setData(result);
    },
    [setData, width, height, imageWidth, imageHeight]
  );

  const add = useCallback(
    (newArea: Area) => {
      let newArr = [...areas];
      newArr.push(newArea);
      setAreas(newArr);
      setOriginWH(newArr);
    },
    [setAreas, setOriginWH, areas]
  );

  const deleteArea = useCallback(
    (target: Area) => {
      let newArr = areas.filter((i) => i.key !== target.key);
      setAreas(newArr);
      setOriginWH(newArr);
    },
    [setAreas, setOriginWH, areas]
  );

  return {
    data,
    areas,
    height,
    width,
    url,
    setUrl,
    setWH,
    add,
    deleteArea,
  };
};
