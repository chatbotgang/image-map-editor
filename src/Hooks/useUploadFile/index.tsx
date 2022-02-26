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
    (area: Area) => {
      console.log(area);
      let perW = width / imageWidth;
      let perH = height / imageHeight;
      let obj = {
        x: area.position.X * perW,
        Y: area.position.Y * perH,
        width: area.size.width * perW,
        height: area.size.height * perW,
      };

      let newData = [...data];
      newData.push(obj);

      setData(newData);
    },
    [setData, data, width, height]
  );
  const add = useCallback(
    (newArea: Area) => {
      let newArr = [...areas];
      newArr.push(newArea);
      setAreas(newArr);
      setOriginWH(newArea);
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
  };
};
