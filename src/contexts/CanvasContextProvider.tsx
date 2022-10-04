import React, { createContext, useState } from "react";

type Object = {
  [key: string]: any
}

type Rect = {
  x: number,
  y: number,
  width: number,
  height: number
}

type CtxValue = {
  imageSrc: string,
  imageSize: [number, number];
  rects: Rect[],
  updateImage: (image: Object) => void
}

const CanvasContext = createContext<CtxValue>({
  imageSrc: '',
  imageSize: [0, 0],
  rects: [],
  updateImage: (image) => {}
})

type CanvasCtxProviderProps = {
  children: React.ReactNode
}
const CanvasContextProvider = ({children}: CanvasCtxProviderProps) => {
  const [uploadedImage, setUploadedImage] = useState({
    src: '',
    width: 0,
    height: 0
  })

  const updateImage = (image:Object) => {
    setUploadedImage({
      src: image.src,
      width: image.width,
      height: image.height
    })
  }

  return (
  <CanvasContext.Provider value={{
    imageSrc: uploadedImage.src,
    imageSize: [uploadedImage.width, uploadedImage.height],
    rects: [],
    updateImage
  }}>
    {children}
  </CanvasContext.Provider>
  )
}

export {CanvasContext}
export default CanvasContextProvider