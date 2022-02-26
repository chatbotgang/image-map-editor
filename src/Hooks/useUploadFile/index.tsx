import { useState, useCallback } from "react";
import { Area } from "./types";

export const useUploadFile = () => {
  const [url, setUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [areas, setAreas] = useState<Area[]>([]);

  const setWH = useCallback(
    (width: number, height: number): void => {
      setWidth(width);
      setHeight(height);
    },
    [setWidth]
  );

  const add = useCallback(
    (newArea: Area) => {
      let newArr = [...areas];
      newArr.push(newArea);
      setAreas(newArr);
      console.log("add");
    },
    [setAreas, areas]
  );

  return {
    areas,
    height,
    width,
    url,
    setUrl,
    setWH,
    add,
  };
};
