import { createContext, useState } from "react";
import { Object, Rectangle } from "../types";

type ContextValue = {
  CANVAS_WIDTH: number;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  rects: Rectangle[];
  updateImage: (image: Object) => void;
  addRectangle: (rectangle: Rectangle) => void;
  deleteRectangleById: (id: string) => void;
  toggleIsHoveredById: (id: string) => void;
  updateRectangleList: (rects: Rectangle[]) => void;
};

const CanvasContext = createContext<ContextValue>({
  CANVAS_WIDTH: 355,
  imageSrc: "",
  imageWidth: 0,
  imageHeight: 0,
  rects: [],
  updateImage: () => {},
  addRectangle: () => {},
  deleteRectangleById: () => {},
  toggleIsHoveredById: () => {},
  updateRectangleList: () => {},
});

type CanvasCtxProviderProps = {
  children: React.ReactNode;
};

const CanvasContextProvider = ({ children }: CanvasCtxProviderProps) => {
  const [uploadedImage, setUploadedImage] = useState({
    src: "",
    width: 0,
    height: 0,
  });
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  const updateImage = (image: Object) => {
    setUploadedImage({
      src: image.src,
      width: image.width,
      height: image.height,
    });
  };

  const addRectangle = (rectangle: Rectangle) => {
    setRectangles((prev) => [...prev, rectangle]);
  };

  const deleteRectangleById = (id: string) => {
    setRectangles((prev) => prev.filter((rectangle) => rectangle.id !== id));
  };

  const toggleIsHoveredById = (id: string) => {
    setRectangles((prev) =>
      prev.map((rectangle) => {
        if (rectangle.id === id) {
          return {
            ...rectangle,
            isHovered: !rectangle.isHovered,
          };
        }
        return rectangle;
      })
    );
  };

  const updateRectangleList = (updatedRects: Rectangle[]) => {
    setRectangles((prev) => updatedRects);
  };

  return (
    <CanvasContext.Provider
      value={{
        CANVAS_WIDTH: 355,
        imageSrc: uploadedImage.src,
        imageWidth: uploadedImage.width,
        imageHeight: uploadedImage.height,
        rects: rectangles,
        updateImage,
        addRectangle,
        deleteRectangleById,
        toggleIsHoveredById,
        updateRectangleList,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext };
export default CanvasContextProvider;
