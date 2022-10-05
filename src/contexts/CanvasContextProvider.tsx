import { createContext, useState } from "react";

type Object = {
  [key: string]: any;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ContextValue = {
  CANVAS_WIDTH: number;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  rects: Rectangle[];
  updateImage: (image: Object) => void;
};

const CanvasContext = createContext<ContextValue>({
  CANVAS_WIDTH: 355,
  imageSrc: "",
  imageWidth: 0,
  imageHeight: 0,
  rects: [],
  updateImage: (image) => {},
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

  const updateImage = (image: Object) => {
    setUploadedImage({
      src: image.src,
      width: image.width,
      height: image.height,
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        CANVAS_WIDTH: 355,
        imageSrc: uploadedImage.src,
        imageWidth: uploadedImage.width,
        imageHeight: uploadedImage.height,
        rects: [],
        updateImage,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext };
export default CanvasContextProvider;
