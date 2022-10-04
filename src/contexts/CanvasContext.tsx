import React, { createContext, useState } from "react";

type Rect = {
  x: number,
  y: number,
  width: number,
  height: number
}

type CtxValue = {
  imageWidth: number,
  imageHeight: number,
  rects: Rect[]
}

const initialValue = {
  imageWidth: 0,
  imageHeight: 0,
  rects: [],
}

const CanvasContext = createContext<CtxValue>(initialValue)

type CanvasCtxProviderProps = {
  children: React.ReactNode
}
const CanvasContextProvider = ({children}: CanvasCtxProviderProps) => {
  return (
  <CanvasContext.Provider value={initialValue}>
    {children}
  </CanvasContext.Provider>
  )
}

export {CanvasContext}
export default CanvasContextProvider