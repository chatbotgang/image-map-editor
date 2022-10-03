import React, { createContext, useState } from "react";

export interface Rect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageMapContent {
  dump: number;
  imageResizeRatio: number;
  rects: Rect[];
  setImageResizeRatio: (ratio: number) => void;
  setDump: (dumpValue: number) => void;
  addRect: (rectInfo: any) => void;
  updateRect: (key: number, updateRectInfo: any) => void;
  removeRect: (key: number) => void;
}

export const ImageMapContext = createContext<ImageMapContent>({
  dump: 0,
  imageResizeRatio: 1,
  rects: [],
  setImageResizeRatio: () => {},
  setDump: () => {},
  addRect: () => {},
  updateRect: () => {},
  removeRect: () => {},
});

export interface ImageMapProviderProps {
  children: React.ReactNode;
}

export const ImageMapProvider = ({ children }: ImageMapProviderProps) => {
  const [imageResizeRatio, setImageResizeRatio] = useState<number>(1);
  const [dump, setDump] = useState<number>(0);
  const [rects, setRects] = useState<Rect[]>([]);

  const addRect = (rectInfo: any) => {
    // console.log(rectInfo);
    setRects((prevState) => [
      ...prevState,
      {
        ...rectInfo,
        id: dump,
      },
    ]);
    setDump((prevDump) => prevDump + 1);
  };

  const updateRect = (id: number, updateRectInfo: Rect) => {
    setRects((prevRects: any) =>
      prevRects.map((rect: Rect) =>
        rect.id === id ? { ...rect, ...updateRectInfo } : rect
      )
    );
  };

  const removeRect = (id: number) => {
    setRects((prevState) => prevState.filter((rect: Rect) => rect.id !== id));
  };

  return (
    <ImageMapContext.Provider
      value={{
        dump,
        imageResizeRatio,
        rects,
        setImageResizeRatio,
        setDump,
        addRect,
        updateRect,
        removeRect,
      }}
    >
      {children}
    </ImageMapContext.Provider>
  );
};

export default ImageMapContext;
